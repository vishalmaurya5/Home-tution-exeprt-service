import React from "react";
import "./VishalTutorProfilePage.css";

const whatsappGroupUrl = "https://chat.whatsapp.com/DgFAeD75fArDqqJIG1rIB4?mode=gi_t";

const subjects = [
  { icon: "fa-brands fa-java", title: "Java & OOP", text: "Deep dive into Object-Oriented Programming, exception handling, and core Java concepts." },
  { icon: "fa-solid fa-brain", title: "Machine Learning", text: "Practical implementation of ML models like SVM and Random Forest with detailed notes." },
  { icon: "fa-solid fa-network-wired", title: "Core CS Subjects", text: "Simplified learning for Compiler Design, Network Security, and Algorithms." },
  { icon: "fa-solid fa-atom", title: "Board & Competitive Prep", text: "Systematic diagrams and targeted study materials for BSEB Physics, SSC, and Railway exams." },
  { icon: "fa-solid fa-microchip", title: "Project Mentoring", text: "Guidance on technical B.Tech projects, including Arduino and circuit-based systems." }
];

const highlights = [
  { icon: "fa-laptop-code", text: "Advanced Technical Stack Mentoring" },
  { icon: "fa-file-lines", text: "Comprehensive Study Materials & Notes" },
  { icon: "fa-microscope", text: "Hands-on B.Tech Project Guidance" },
  { icon: "fa-chart-line", text: "Strategic Competitive Exam Prep" }
];

const projects = [
  {
    title: "Footstep Energy Generation System",
    description: "Mentorship on creating piezoelectric-based hardware projects, including system architecture and Arduino integrations."
  },
  {
    title: "System Maintenance & Troubleshooting",
    description: "Assistance with Windows OS security, boot configuration data recovery, and system update resolutions."
  }
];

const VishalTutorProfilePage = () => (
  <div className="expert-profile-page">
    {/* Hero Section */}
    <section className="expert-hero">
      <div className="container expert-hero-grid">
        <div className="expert-photo-wrapper">
          <div className="expert-photo-card">
            <img src="/vishal-kumar-profile.jpg" alt="Vishal Kumar - Technical Mentor" className="profile-img" />
            <div className="availability-pill">
              <span className="pulse-dot"></span>

            </div>
          </div>
        </div>

        <div className="expert-hero-copy">
          <span className="profile-kicker">MCA | Technical Mentor & Tutor</span>
          <h1>Vishal</h1>
          <p className="expert-status">Bridging the gap between theory and practical engineering.</p>
          <p className="expert-bio">
            Dedicated engineering mentor with a strong foundation in Computer Science. I specialize in breaking down complex technical concepts—from Java OOP etc. to core subjects like Compiler Design. Whether you need structured preparation for BSEB,CBSE,ISC,ICSE 10th, 12th,Graduation and competitive exams, or hands-on guidance for your next hardware/software project, I provide systematic, results-driven coaching.
          </p>

          <div className="expert-contact-grid">
            <a href="tel:7004394874" className="contact-link">
              <i className="fa-solid fa-phone" /> +91 7004394874
            </a>
            <a href="mailto:vishuofficial2021@gmail.com" className="contact-link">
              <i className="fa-solid fa-envelope" /> vishuofficial2021@gmail.com
            </a>
            <span className="contact-link static">
              <i className="fa-solid fa-location-dot" /> Gaya, Bihar
            </span>
          </div>

          <div className="expert-actions">
            <button className="btn btn-primary" type="button">
              <i className="fa-solid fa-calendar-check" /> Book a Demo Session
            </button>
            <a className="btn btn-outline" href={whatsappGroupUrl} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp" /> Join Batch Updates
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Highlights Banner */}
    <section className="expert-highlights-band">
      <div className="container">
        <div className="highlight-grid">
          {highlights.map((item, index) => (
            <div className="highlight-card" key={index}>
              <i className={`fa-solid ${item.icon}`} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Subjects Section */}
    <section className="expert-section bg-light">
      <div className="container">
        <div className="section-header">
          <span className="profile-kicker">Areas of Expertise</span>
          <h2>Academic & Technical Support</h2>
          <p>From foundational programming to advanced college-level examinations.</p>
        </div>
        <div className="subject-grid">
          {subjects.map((subject, index) => (
            <article className="subject-card" key={index}>
              <div className="subject-icon">
                <i className={subject.icon} />
              </div>
              <h3>{subject.title}</h3>
              <p>{subject.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Project Mentoring Section */}
    <section className="expert-section">
      <div className="container">
        <div className="section-header">
          <span className="profile-kicker">Applied Engineering</span>
          <h2>Project & Troubleshooting Guidance</h2>
        </div>
        <div className="project-grid">
          {projects.map((proj, index) => (
            <div className="project-card" key={index}>
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer / CTA */}
    <footer className="profile-contact-footer">
      <div className="container profile-contact-inner">
        <div className="footer-content">
          <h2>Ready to elevate your technical skills?</h2>
          <p>Reach out to discuss syllabus planning, detailed notes, or exam strategies.</p>
        </div>
        <div className="profile-footer-actions">
          <a href="tel:7004394874" className="btn btn-light">
            <i className="fa-solid fa-phone" /> Call Now
          </a>
          <a href="mailto:vishuofficial2021@gmail.com" className="btn btn-outline-light">
            <i className="fa-solid fa-envelope" /> Send Email
          </a>
        </div>
      </div>
      <div className="copyright">
        <p>© 2026 Vishal Kumar. Professional Technical Mentor & Tutor.</p>
      </div>
    </footer>
  </div>
);

export default VishalTutorProfilePage;