import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, getApiErrorMessage, getAuthHeaders } from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import "./TutorProfilePage.css";

const TutorProfilePage = () => {
  const { tutorToken, logoutTutor } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/tutors/me", {
          headers: getAuthHeaders(tutorToken),
        });
        setProfile(data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Please log in again"));
        logoutTutor();
      } finally {
        setLoading(false);
      }
    };
    if (tutorToken) fetchProfile();
  }, [tutorToken]);

  if (!tutorToken) return <Navigate to="/tutor/login" replace />;
  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isApproved = profile.status === "approved";

  return (
    <div className="tpp-page">
      <div className="tpp-layout">

        {/* ── Left: identity card ── */}
        <div className="tpp-profile-card">
          <div className="tpp-profile-top">
            <div className="tpp-avatar">{initials}</div>
            <div className="tpp-name">{profile.name}</div>
            <div className="tpp-email">{profile.email}</div>
            <div className={`tpp-status ${isApproved ? "tpp-status--approved" : "tpp-status--pending"}`}>
              <span className={`tpp-status-dot ${isApproved ? "tpp-dot--approved" : "tpp-dot--pending"}`} />
              {isApproved ? "Approved" : "Pending Approval"}
            </div>
          </div>

          <div className="tpp-meta">
            {profile.address && (
              <MetaRow icon="📍" label="Location" value={profile.address} />
            )}
            {profile.phone && (
              <MetaRow icon="📞" label="Contact" value={profile.phone} />
            )}
            {profile.experience && (
              <MetaRow icon="🎓" label="Experience" value={profile.experience} />
            )}
          </div>

          <button className="tpp-logout-btn" onClick={logoutTutor}>
            Log Out
          </button>
        </div>

        {/* ── Right: details ── */}
        <div className="tpp-right">

          {/* Pending banner */}
          {!isApproved && (
            <div className="tpp-pending-banner">
              <span className="tpp-pending-icon">⏳</span>
              <div>
                <div className="tpp-pending-title">Approval Pending</div>
                <div className="tpp-pending-desc">
                  Your profile is under review by the admin. You will be
                  notified once approved. This usually takes 24–48 hours.
                </div>
              </div>
            </div>
          )}

          {/* Academic details */}
          <div className="tpp-info-card">
            <div className="tpp-card-title">Academic Details</div>
            <div className="tpp-detail-grid">
              {profile.qualification && (
                <DetailItem label="Qualification" value={profile.qualification} />
              )}
              {profile.experience && (
                <DetailItem label="Experience" value={profile.experience} />
              )}
              {profile.subjects && (
                <div className="tpp-detail-item tpp-full">
                  <div className="tpp-detail-label">Subjects Taught</div>
                  <div className="tpp-subjects">
                    {profile.subjects.split(",").map((s) => (
                      <span className="tpp-subject-tag" key={s.trim()}>
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.address && (
                <div className="tpp-detail-item tpp-full">
                  <div className="tpp-detail-label">Address</div>
                  <div className="tpp-detail-value">{profile.address}</div>
                </div>
              )}
            </div>
          </div>

          {/* Aadhar document */}
          {profile.aadharCardUrl && (
            <div className="tpp-info-card">
              <div className="tpp-card-title">Verification Document</div>
              <div className="tpp-aadhar-row">
                <div className="tpp-aadhar-left">
                  <div className="tpp-aadhar-icon">🪪</div>
                  <div>
                    <div className="tpp-aadhar-name">ID / Verification Document</div>
                    <div className="tpp-aadhar-sub">
                      Uploaded during registration
                    </div>
                  </div>
                </div>
                <a
                  href={profile.aadharCardUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="tpp-aadhar-btn"
                >
                  View →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetaRow = ({ icon, label, value }) => (
  <div className="tpp-meta-row">
    <div className="tpp-meta-icon">{icon}</div>
    <div>
      <div className="tpp-meta-label">{label}</div>
      <div className="tpp-meta-value">{value}</div>
    </div>
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="tpp-detail-item">
    <div className="tpp-detail-label">{label}</div>
    <div className="tpp-detail-value">{value}</div>
  </div>
);

export default TutorProfilePage;