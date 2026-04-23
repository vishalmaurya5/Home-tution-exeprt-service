import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, getApiErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../utils/validation";

const AdminLoginPage = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "admin@tutionhub.com", password: "admin123" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/admin/login", formData);
      loginAdmin(data.token);
      toast.success("Admin logged in securely");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-shell bg-light"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}
    >
      <div className="container" style={{ maxWidth: "500px", margin: "0" }}>
        <div className="shadow-box bg-white">
          <div className="text-center mb-4" style={{ textAlign: "center", marginBottom: "30px" }}>
            <span className="eyebrow">Restricted Access</span>
            <h2>Admin Portal</h2>
            <p className="subtitle" style={{ marginBottom: "0", fontSize: "0.95rem" }}>
              Sign in to manage tutors, students, and system settings.
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="admin@tutionhub.com"
                value={formData.email}
                onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))}
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your admin password"
                value={formData.password}
                onChange={(e) => setFormData((s) => ({ ...s, password: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary full-width mt-4"
              disabled={loading}
              style={{ marginTop: "25px" }}
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;