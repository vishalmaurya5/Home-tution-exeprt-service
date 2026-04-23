import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, getApiErrorMessage, getAuthHeaders } from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";
import PhoneText from "../components/PhoneText";
import { useAuth } from "../context/AuthContext";

const AdminDashboardPage = () => {
  const { adminToken, isAdminLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [approvedTutors, setApprovedTutors] = useState([]);
  const [tuitions, setTuitions] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState("");

  const headers = getAuthHeaders(adminToken);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes, tuitionRes] = await Promise.all([
        api.get("/tutors/pending", { headers }),
        api.get("/tutors", { headers }),
        api.get("/tuitions", { headers })
      ]);
      setPendingTutors(pendingRes.data);
      setApprovedTutors(approvedRes.data);
      setTuitions(tuitionRes.data);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) fetchData();
  }, [isAdminLoggedIn]);

  const approveTutor = async (id) => {
    setActionLoadingId(id);
    try {
      await api.put(`/tutors/${id}/approve`, {}, { headers });
      toast.success("Tutor approved");
      fetchData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to approve tutor"));
    } finally {
      setActionLoadingId("");
    }
  };

  const deleteTutor = async (id) => {
    setActionLoadingId(id);
    try {
      await api.delete(`/tutors/${id}`, { headers });
      toast.success("Tutor removed");
      fetchData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to remove tutor"));
    } finally {
      setActionLoadingId("");
    }
  };

  const deleteTuition = async (id) => {
    setActionLoadingId(id);
    try {
      await api.delete(`/tuitions/${id}`, { headers });
      toast.success("Tuition post removed");
      fetchData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to remove tuition post"));
    } finally {
      setActionLoadingId("");
    }
  };

  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="d-flex flex-column gap-4">
      <h3>Admin Dashboard</h3>
      <section>
        <h5>Pending Tutor Registrations</h5>
        <div className="row g-3">
          {pendingTutors.map((tutor) => (
            <div className="col-md-6" key={tutor._id}>
              <div className="card">
                <div className="card-body">
                  <p className="mb-1">
                    <strong>{tutor.name}</strong> ({tutor.email})
                  </p>
                  <p className="mb-1">{tutor.subjects}</p>
                  <p className="mb-1">
                    Document:{" "}
                    <a href={tutor.aadharCardUrl} target="_blank" rel="noreferrer" download>
                      View / Download
                    </a>
                  </p>
                  <button
                    className="btn btn-success btn-sm me-2"
                    disabled={actionLoadingId === tutor._id}
                    onClick={() => approveTutor(tutor._id)}
                  >
                    {actionLoadingId === tutor._id ? "Working..." : "Approve"}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={actionLoadingId === tutor._id}
                    onClick={() => deleteTutor(tutor._id)}
                  >
                    Reject/Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h5>Approved Tutors</h5>
        <div className="row g-3">
          {approvedTutors.map((tutor) => (
            <div className="col-md-6" key={tutor._id}>
              <div className="card">
                <div className="card-body">
                  <p className="mb-1">
                    <strong>{tutor.name}</strong> | {tutor.qualification}
                  </p>
                  <p className="mb-1">Contact: <PhoneText value={tutor.phone} /></p>
                  <p className="mb-1">
                    Document:{" "}
                    <a href={tutor.aadharCardUrl} target="_blank" rel="noreferrer" download>
                      View / Download
                    </a>
                  </p>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={actionLoadingId === tutor._id}
                    onClick={() => deleteTutor(tutor._id)}
                  >
                    {actionLoadingId === tutor._id ? "Working..." : "Delete Tutor"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h5>All Tuition Posts</h5>
        <div className="row g-3">
          {tuitions.map((post) => (
            <div className="col-md-6" key={post._id}>
              <div className="card">
                <div className="card-body">
                  <p className="mb-1">
                    <strong>{post.subjectClass}</strong> - {post.location}
                  </p>
                  <p className="mb-1">Parent: {post.parentName}</p>
                  <p className="mb-1">Contact: <PhoneText value={post.contactNumber} /></p>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    disabled={actionLoadingId === post._id}
                    onClick={() => deleteTuition(post._id)}
                  >
                    {actionLoadingId === post._id ? "Working..." : "Delete Post"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
