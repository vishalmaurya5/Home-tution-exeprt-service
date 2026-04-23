import { useState } from "react";
import { toast } from "react-toastify";
import { api, getApiErrorMessage } from "../api/client";
import { isValidIndianPhone } from "../utils/validation";
import "./PostTutionPage.css";

const BUDGET_OPTIONS = [
  "Under ₹1000/mo",
  "₹1000 – ₹1500/mo",
  "₹1500 – ₹2000/mo",
  "₹2000 – ₹3000/mo",
  "₹3000+/mo",
];

const TIMING_OPTIONS = [
  "Morning (6am – 10am)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 8pm)",
  "Flexible",
];

const EMPTY_FORM = {
  parentName: "",
  contactNumber: "",
  subjectClass: "",
  location: "",
  budget: "",
  timing: "",
  additionalDetails: "",
};

const PostTuitionPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) =>
    setFormData((s) => ({ ...s, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!formData.parentName.trim()) errs.parentName = "Please enter your name";
    if (!isValidIndianPhone(formData.contactNumber))
      errs.contactNumber = "Enter a valid 10-digit number";
    if (!formData.subjectClass.trim())
      errs.subjectClass = "Please enter subject and class";
    if (!formData.location.trim()) errs.location = "Please enter your location";
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await api.post("/tuitions", formData);
      setSubmitted(true);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to post requirement"));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="ptp-page">
        <div className="ptp-layout">
          <Sidebar />
          <div className="ptp-card">
            <div className="ptp-success">
              <div className="ptp-success-circle">✓</div>
              <h3>Requirement posted!</h3>
              <p>
                Your tuition requirement has been submitted. Verified tutors
                near you will contact you on your number shortly.
              </p>
              <button className="ptp-btn-outline" onClick={resetForm}>
                Post Another Requirement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ptp-page">
      <div className="ptp-layout">
        <Sidebar />

        <div className="ptp-card">
          <div className="ptp-card-head">
            <h2>Post Home Tuition Requirement</h2>
            <p>
              All fields marked <span className="ptp-req">*</span> are
              required. Takes less than 2 minutes.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate>
            <div className="ptp-card-body">
              <div className="ptp-section-label">Parent &amp; Contact Details</div>
              <div className="ptp-grid2">
                <Field
                  label="Parent Name"
                  required
                  error={errors.parentName}
                >
                  <input
                    type="text"
                    placeholder="e.g. Sunita Kapoor"
                    value={formData.parentName}
                    onChange={set("parentName")}
                    className={errors.parentName ? "ptp-input-err" : ""}
                  />
                </Field>
                <Field
                  label="Contact Number"
                  required
                  error={errors.contactNumber}
                >
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={formData.contactNumber}
                    onChange={set("contactNumber")}
                    className={errors.contactNumber ? "ptp-input-err" : ""}
                  />
                </Field>
              </div>

              <div className="ptp-section-label ptp-section-label--spaced">
                Tuition Details
              </div>
              <div className="ptp-grid2">
                <Field
                  label="Subject / Class"
                  required
                  error={errors.subjectClass}
                >
                  <input
                    type="text"
                    placeholder="e.g. Maths, Class 10"
                    value={formData.subjectClass}
                    onChange={set("subjectClass")}
                    className={errors.subjectClass ? "ptp-input-err" : ""}
                  />
                </Field>
                <Field label="Location / Area" required error={errors.location}>
                  <input
                    type="text"
                    placeholder="e.g. Rajpur Road, Dehradun"
                    value={formData.location}
                    onChange={set("location")}
                    className={errors.location ? "ptp-input-err" : ""}
                  />
                </Field>
              </div>

              <div className="ptp-grid2">
                <Field label="Expected Budget">
                  <select value={formData.budget} onChange={set("budget")}>
                    <option value="">Select budget range</option>
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred Timing">
                  <select value={formData.timing} onChange={set("timing")}>
                    <option value="">Select timing</option>
                    {TIMING_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Additional Details">
                <textarea
                  rows={3}
                  placeholder="Any special requirements — e.g. female tutor preferred, board exam prep, CBSE/ICSE syllabus..."
                  value={formData.additionalDetails}
                  onChange={set("additionalDetails")}
                />
                <p className="ptp-hint">
                  Optional — helps tutors understand your needs better.
                </p>
              </Field>
            </div>

            <div className="ptp-card-footer">
              <div className="ptp-free-note">
                <span>✓ Free</span> to post · No brokerage charged
              </div>
              <button
                type="submit"
                className="ptp-submit-btn"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Requirement →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="ptp-sidebar">
    <div className="ptp-sb-icon">📋</div>
    <h3 className="ptp-sb-title">Find the perfect tutor fast</h3>
    <p className="ptp-sb-desc">
      Post your requirement once — verified tutors in your area will reach out
      to you directly.
    </p>
    <div className="ptp-steps">
      {[
        ["Fill the form", "Subject, class, location & budget"],
        ["Tutors contact you", "Verified tutors reach out on your number"],
        ["Start learning", "Pick the best fit, begin sessions"],
      ].map(([title, desc], i) => (
        <div className="ptp-step" key={i}>
          <div className="ptp-step-num">{i + 1}</div>
          <div>
            <strong>{title}</strong>
            <span>{desc}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="ptp-sb-divider" />
    <div className="ptp-sb-badge">
      <span className="ptp-sb-dot" />
      <span>Free to post · Zero brokerage · No hidden fees</span>
    </div>
  </div>
);

const Field = ({ label, required, error, hint, children }) => (
  <div className="ptp-field">
    <label className="ptp-label">
      {label}
      {required && <span className="ptp-req"> *</span>}
    </label>
    {children}
    {error && <p className="ptp-error">{error}</p>}
    {hint && <p className="ptp-hint">{hint}</p>}
  </div>
);

export default PostTuitionPage;