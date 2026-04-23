import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api, getApiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/validation";

const TutorLoginPage = () => {
  const { loginTutor } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/auth/tutor/login", formData);
      loginTutor(data.token);
      toast.success("Tutor login successful");
      navigate("/tutor/profile");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center py-5"
      style={{
        background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div
              className="card border-0 shadow-lg overflow-hidden"
              style={{ borderRadius: "24px" }}
            >
              <div className="row g-0">
                {/* Left Panel */}
                <div
                  className="col-lg-5 d-none d-lg-flex flex-column justify-content-center text-white p-5"
                  style={{
                    background: "linear-gradient(135deg, #0d6efd 0%, #4f8cff 100%)",
                    minHeight: "100%",
                  }}
                >
                  <h2 className="fw-bold mb-3">Welcome Back, Tutor</h2>
                  <p className="text-white-50 mb-4">
                    Login to access your tutor dashboard, manage your profile,
                    and continue helping students achieve success.
                  </p>

                  <div className="mb-3">
                    <h6 className="fw-semibold mb-1">Manage your profile</h6>
                    <p className="small text-white-50 mb-0">
                      Update your qualification, subjects, and personal details
                      anytime.
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-semibold mb-1">Track your activity</h6>
                    <p className="small text-white-50 mb-0">
                      Stay connected with your account and keep your teaching
                      profile active.
                    </p>
                  </div>

                  <div>
                    <h6 className="fw-semibold mb-1">Secure access</h6>
                    <p className="small text-white-50 mb-0">
                      Your tutor account stays protected with your login
                      credentials.
                    </p>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="col-lg-7 bg-white">
                  <div className="p-4 p-md-5">
                    <div className="mb-4">
                      <h3 className="fw-bold text-dark mb-2">Tutor Login</h3>
                      <p className="text-muted mb-0">
                        Enter your registered email and password to continue.
                      </p>
                    </div>

                    <form onSubmit={onSubmit} className="row g-4">
                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Password
                        </label>
                        <div className="input-group input-group-lg">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) =>
                              handleChange("password", e.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>

                      <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label text-muted"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>

                        <Link
                          to="/tutor/forgot-password"
                          className="text-decoration-none fw-medium"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary btn-lg w-100 fw-semibold"
                          type="submit"
                          disabled={loading}
                          style={{
                            borderRadius: "14px",
                            padding: "14px 20px",
                          }}
                        >
                          {loading ? "Logging in..." : "Login as Tutor"}
                        </button>
                      </div>

                      <div className="col-12 text-center">
                        <p className="text-muted mb-0">
                          Don&apos;t have a tutor account?{" "}
                          <Link
                            to="/tutor/register"
                            className="text-decoration-none fw-semibold"
                          >
                            Register here
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                {/* End Right Panel */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorLoginPage;