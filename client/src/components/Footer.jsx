import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <Link className="footer-brand" to="/">
          Home Tuition Hub
        </Link>
        <p>Trusted tutor connections for students, parents, and educators.</p>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/post-tuition">Post Tuition</Link>
        <Link to="/tutor/register">Become Tutor</Link>
        <Link to="/admin/login">Admin</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
