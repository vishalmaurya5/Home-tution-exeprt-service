import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getAuthHeaders } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
  const [tutorToken, setTutorToken] = useState(localStorage.getItem("tutorToken") || "");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loadingAdminCheck, setLoadingAdminCheck] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!adminToken) {
        setIsAdminLoggedIn(false);
        setLoadingAdminCheck(false);
        return;
      }
      try {
        await api.post("/auth/admin/check", {}, { headers: getAuthHeaders(adminToken) });
        setIsAdminLoggedIn(true);
      } catch {
        setIsAdminLoggedIn(false);
        setAdminToken("");
        localStorage.removeItem("adminToken");
      } finally {
        setLoadingAdminCheck(false);
      }
    };
    checkAdmin();
  }, [adminToken]);

  const loginAdmin = (token) => {
    setAdminToken(token);
    setIsAdminLoggedIn(true);
    localStorage.setItem("adminToken", token);
  };

  const logoutAdmin = () => {
    setAdminToken("");
    setIsAdminLoggedIn(false);
    localStorage.removeItem("adminToken");
  };

  const loginTutor = (token) => {
    setTutorToken(token);
    localStorage.setItem("tutorToken", token);
  };

  const logoutTutor = () => {
    setTutorToken("");
    localStorage.removeItem("tutorToken");
  };

  const value = useMemo(
    () => ({
      adminToken,
      tutorToken,
      isAdminLoggedIn,
      loadingAdminCheck,
      loginAdmin,
      logoutAdmin,
      loginTutor,
      logoutTutor
    }),
    [adminToken, tutorToken, isAdminLoggedIn, loadingAdminCheck]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
