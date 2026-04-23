import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api, getApiErrorMessage } from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";

// Realistic dummy data to attract parents and tutors immediately
const featuredTuitions = [
  {
    _id: "feat1",
    subjectClass: "Mathematics & Science - Class 10 (CBSE)",
    location: "Dehradun, Clement Town",
    budget: "₹5000 - ₹7000/month",
    additionalDetails: "Looking for an experienced tutor for board exam preparation. 4 days a week. Focus on past papers.",
    parentName: "Rajesh Sharma",
  },
  {
    _id: "feat2",
    subjectClass: "Physics - Class 12 (JEE Focused)",
    location: "Delhi, Vasant Kunj",
    budget: "₹8000/month",
    additionalDetails: "Need strict focus on JEE Mains numericals and concept building. Weekends only.",
    parentName: "Anita Desai",
  },
  {
    _id: "feat3",
    subjectClass: "All Subjects - Class 5 (ICSE)",
    location: "Mumbai, Andheri West",
    budget: "₹4500/month",
    additionalDetails: "Need a patient tutor to help with daily homework, spoken English, and foundational concepts.",
    parentName: "Vikram Mehta",
  },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Feedback form state
  const [feedback, setFeedback] = useState({
    name: "",
    role: "Parent",
    email: "",
    message: "",
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const { data } = await api.get("/tuitions");
        setTuitions(data);
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Failed to load recent tuition posts"));
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  const filteredTuitions = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();
    if (!value) return tuitions;

    return tuitions.filter((item) =>
      [item.subjectClass, item.location, item.budget, item.additionalDetails]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(value))
    );
  }, [searchTerm, tuitions]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.name || !feedback.email || !feedback.message) {
      return toast.warning("Please fill out all required fields.");
    }

    setIsSubmittingFeedback(true);
    // Simulate API call for feedback submission
    setTimeout(() => {
      toast.success("Thank you for your feedback! We will get back to you soon.");
      setFeedback({ name: "", role: "Parent", email: "", message: "" });
      setIsSubmittingFeedback(false);
    }, 1000);
  };

  const renderTuitionCard = (item, isFeatured = false) => (
    <article className={`tuition-card ${isFeatured ? "featured-card" : ""}`} key={item._id}>
      {isFeatured && <div className="featured-badge">Highly Requested</div>}
      <div className="card-topline">
        <span className="badge-soft">{item.subjectClass.split("-")[0]}</span>
        <span className="location-text">📍 {item.location}</span>
      </div>
      <h3>{item.subjectClass}</h3>
      <p className="details-text">"{item.additionalDetails || "Parent is looking for a suitable tutor."}"</p>
      <div className="card-footer">
        <div className="footer-item">
          <span className="label">Budget</span>
          <span className="value">💰 {item.budget || "Flexible"}</span>
        </div>
        <div className="footer-item">
          <span className="label">Posted By</span>
          <span className="value">👤 {item.parentName}</span>
        </div>
      </div>
      <a href="tel:7004394874" className="btn btn-outline-primary full-width mt-3">Contact Us</a>
    </article>
  );

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Verified learning opportunities</span>
            <h1>Find the perfect home tutor without the back-and-forth.</h1>
            <p>
              Join thousands of parents and tutors. Post your tuition needs, browse verified requirements, and start learning faster.
            </p>
            <div className="hero-actions">
              <Link to="/post-tuition" className="btn btn-primary btn-lg">
                Post a Tuition Need
              </Link>
              <Link to="/tutor/register" className="btn btn-outline-dark btn-lg">
                Become a Tutor
              </Link>
            </div>
          </div>

          <div className="search-panel shadow-box">
            <h2>Search open tuitions</h2>
            <p>Filter by subject, class, city, or budget.</p>
            <input
              type="search"
              className="form-control form-control-lg search-input"
              placeholder="e.g. Mathematics, Dehradun, Class 10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Tuitions (Dummy Data) */}
      {!searchTerm && (
        <section className="section-band bg-light">
          <div className="container">
            <div className="section-heading text-center">
              <span className="eyebrow">Trending Now</span>
              <h2>Featured Tuition Requirements</h2>
              <p className="subtitle">High-demand opportunities looking for immediate tutors.</p>
            </div>
            <div className="tuition-grid">
              {featuredTuitions.map((item) => renderTuitionCard(item, true))}
            </div>
          </div>
        </section>
      )}

      {/* Live Tuitions (API Data) */}
      <section className="section-band">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Live Updates</span>
              <h2>{searchTerm ? "Search Results" : "Latest Requirements"}</h2>
            </div>
            <Link to="/post-tuition" className="btn btn-primary">
              Post Yours Now
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : filteredTuitions.length > 0 ? (
            <div className="tuition-grid">
              {filteredTuitions.map((item) => renderTuitionCard(item))}
            </div>
          ) : (
            <div className="empty-state shadow-box">
              <h3>No exact matches found.</h3>
              <p>Try adjusting your search terms or be the first to post a requirement in this category!</p>
            </div>
          )}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section section-band bg-primary-light">
        <div className="container feedback-grid">
          <div className="feedback-copy">
            <h2>We value your experience</h2>
            <p>
              Whether you are a parent who found the perfect tutor, or a teacher who wants to suggest a new feature, we want to hear from you.
            </p>
            <ul className="trust-list mt-4">
              <li>✅ Direct line to our admin team</li>
              <li>✅ Help us improve the platform</li>
              <li>✅ Fast response times</li>
            </ul>
          </div>
          <div className="feedback-form-container shadow-box bg-white">
            <form onSubmit={handleFeedbackSubmit} className="feedback-form">
              <h3>Send us Feedback</h3>
              <div className="form-group">
                <label>I am a</label>
                <select
                  className="form-control"
                  value={feedback.role}
                  onChange={(e) => setFeedback({ ...feedback, role: e.target.value })}
                >
                  <option value="Parent">Parent / Student</option>
                  <option value="Tutor">Tutor / Teacher</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="your@email.com"
                  value={feedback.email}
                  onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Tell us what you think..."
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary full-width"
                disabled={isSubmittingFeedback}
              >
                {isSubmittingFeedback ? "Sending..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;