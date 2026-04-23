import React from "react";
import "./ContactPage.css";
const ContactPage = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm border-0" style={{ borderRadius: "16px" }}>
        <div className="card-header bg-primary text-white text-center py-4" style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
          <h2 className="mb-0 fw-bold">Contact Us</h2>
          <p className="mb-0 text-white-50 mt-2">Get in touch with us directly</p>
        </div>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <h4 className="fw-semibold text-dark mb-3">Reach Out to the Administrator</h4>
            <p className="text-muted">
              Whether you are a parent looking for a tutor or a tutor wanting to join our platform, feel free to contact me directly using the details below.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4" style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}>
                  <i className="fa-solid fa-user"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Name</h6>
                  <h5 className="mb-0 fw-bold text-dark">Vishal Kumar</h5>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-4" style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Phone Number</h6>
                  <h5 className="mb-0 fw-bold">
                    <a href="tel:7004394874" className="text-decoration-none text-dark">7004394874</a>
                  </h5>
                </div>
              </div>

              <div className="d-flex align-items-center p-3 bg-light rounded-3">
                <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-4" style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h6 className="text-muted mb-1">Email Address</h6>
                  <h5 className="mb-0 fw-bold">
                    <a href="mailto:vishuofficial2021@gmail.com" className="text-decoration-none text-dark">vishuofficial2021@gmail.com</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a className="btn btn-outline-success btn-lg px-4 rounded-pill" href="https://wa.me/917004394874" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp me-2"></i> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
