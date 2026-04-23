import axios from "axios";

// Reads VITE_API_BASE_URL from your .env file.
// Falls back to /api so the Vite proxy handles it in dev.
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor: attach auth token automatically ─────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // adjust key if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: normalise error messages ───────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message;

    if (error.code === "ECONNABORTED") {
      message = "The request timed out. Please try again.";
    } else if (!error.response && error.request) {
      // Network error — most likely wrong baseURL or backend not running
      message =
        import.meta.env.DEV
          ? `Unable to reach the server at "${baseURL}". ` +
            "Make sure your backend is running and VITE_API_TARGET is correct in .env.development."
          : "Unable to reach the server. Please try again later.";
    } else if (error.response) {
      // Server responded with a non-2xx status
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Server error ${error.response.status}.`;
    } else {
      message = "Something went wrong. Please try again.";
    }

    return Promise.reject(Object.assign(error, { userMessage: message }));
  }
);

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns an Authorization header object if a token is supplied. */
export const getAuthHeaders = (token) =>
  token ? { Authorization: `Bearer ${token}` } : {};

/** Extracts a user-friendly message from an axios error. */
export const getApiErrorMessage = (error, fallback = "Request failed") =>
  error?.userMessage || fallback;
