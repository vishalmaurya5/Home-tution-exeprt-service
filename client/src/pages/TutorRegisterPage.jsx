import { useState } from "react";
import { toast } from "react-toastify";
import { api, getApiErrorMessage } from "../api/client";
import {
  isStrongEnoughPassword,
  isValidEmail,
  isValidIndianPhone,
} from "../utils/validation";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  phone: "",
  qualification: "",
  subjects: "",
  experience: "",
  address: "",
};

const TutorRegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const file = e.target.aadharCard.files[0];

    if (!file) return toast.error("Document file is required");
    if (!isValidEmail(formData.email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!isStrongEnoughPassword(formData.password)) {
      return toast.error("Password must be at least 6 characters long");
    }
    if (!isValidIndianPhone(formData.phone)) {
      return toast.error("Please enter a valid 10-digit contact number");
    }
    if (!formData.experience.trim().match(/^\d+(\.\d+)?(\s*(year|years))?$/i)) {
      return toast.error("Experience should be like 2 or 2 years");
    }

    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      payload.append("aadharCard", file);

      await api.post("/auth/tutor/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration submitted. Pending admin approval.");
      setFormData(initialFormData);
      setFileName("");
      e.target.reset();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Registration failed"));
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
                {/* Left Info Panel */}
                <div
                  className="col-lg-5 d-none d-lg-flex flex-column justify-content-center text-white p-5"
                  style={{
                    background: "linear-gradient(135deg, #0d6efd 0%, #4f8cff 100%)",
                    minHeight: "100%",
                  }}
                >
                  <h2 className="fw-bold mb-3">Become a Professional Tutor</h2>
                  <p className="mb-4 text-white-50">
                    Join our platform and start helping students grow with your
                    knowledge and teaching skills.
                  </p>

                  <div className="mb-3">
                    <h6 className="fw-semibold mb-1">Why join us?</h6>
                    <p className="mb-0 text-white-50 small">
                      Build your profile, reach more students, and grow your
                      teaching career.
                    </p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-semibold mb-1">Simple process</h6>
                    <p className="mb-0 text-white-50 small">
                      Fill out your details, upload your verification document,
                      and submit for approval.
                    </p>
                  </div>

                  <div>
                    <h6 className="fw-semibold mb-1">Trusted platform</h6>
                    <p className="mb-0 text-white-50 small">
                      We verify tutor details before approval to maintain
                      quality and trust.
                    </p>
                  </div>
                </div>

                {/* Right Form Panel */}
                <div className="col-lg-7 bg-white">
                  <div className="p-4 p-md-5">
                    <div className="mb-4">
                      <h3 className="fw-bold text-dark mb-2">Tutor Registration</h3>
                      <p className="text-muted mb-0">
                        Fill in your details carefully to complete your tutor
                        application.
                      </p>
                    </div>

                    <form onSubmit={onSubmit} className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleChange("password", e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Contact Number</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter 10-digit phone number"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Qualification</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="e.g. B.Sc, M.A, B.Tech"
                          value={formData.qualification}
                          onChange={(e) =>
                            handleChange("qualification", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Subjects Expertise</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="e.g. Maths, Science, English"
                          value={formData.subjects}
                          onChange={(e) => handleChange("subjects", e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Experience</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="e.g. 2 years"
                          value={formData.experience}
                          onChange={(e) => handleChange("experience", e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Verification Document
                        </label>
                        <input
                          className="form-control form-control-lg"
                          name="aadharCard"
                          type="file"
                          required
                          onChange={(e) =>
                            setFileName(e.target.files?.[0]?.name || "")
                          }
                        />
                        {fileName && (
                          <div className="mt-2">
                            <small className="text-muted">
                              Selected file: <span className="fw-semibold">{fileName}</span>
                            </small>
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Address <span className="text-muted">(Optional)</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Enter your address"
                          value={formData.address}
                          onChange={(e) => handleChange("address", e.target.value)}
                        />
                      </div>

                      <div className="col-12 pt-2">
                        <button
                          className="btn btn-primary btn-lg w-100 fw-semibold"
                          type="submit"
                          disabled={loading}
                          style={{
                            borderRadius: "14px",
                            padding: "14px 20px",
                          }}
                        >
                          {loading ? "Submitting..." : "Register as Tutor"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* End Form Panel */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorRegisterPage;