
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import PostTuitionPage from "./pages/PostTuitionPage";
import TutorRegisterPage from "./pages/TutorRegisterPage";
import TutorLoginPage from "./pages/TutorLoginPage";
import TutorProfilePage from "./pages/TutorProfilePage";
import VishalTutorProfilePage from "./pages/VishalTutorProfilePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ContactPage from "./pages/ContactPage";

const AppRoutes = () => {
  const location = useLocation();
  const isFullBleedPage = ["/", "/vishal-kumar"].includes(location.pathname);

  return (
    <>
      <Navbar />
      <main className={isFullBleedPage ? "" : "container py-4"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/vishal-kumar" element={<VishalTutorProfilePage />} />
          <Route path="/post-tuition" element={<PostTuitionPage />} />
          <Route path="/tutor/register" element={<TutorRegisterPage />} />
          <Route path="/tutor/login" element={<TutorLoginPage />} />
          <Route path="/tutor/profile" element={<TutorProfilePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
