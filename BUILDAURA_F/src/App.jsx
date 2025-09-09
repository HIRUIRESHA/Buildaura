// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Navbar imports
import Navbar from './components/Navbar';              
import AdminNavbar from './navbars/AdminNavbar';      
import CompanyNavbar from './navbars/CompanyNavbar';  
import EngineerNavbar from './navbars/EngineerNavbar';
import ClientNavbar from './navbars/ClientNavbar';    
import Footer from './components/Footer';

// Page imports
import Home from './components/Home';
import Companies from './components/Companies';
import Services from './components/Services'; 
import About from './components/About';
import Contact from './components/Contact';  
import Login from './components/Login';
import Signup from './components/Signup';
import Companysign from './components/Companysign';
import Userregister from './components/Userregister';
import AdminDashboard from './page/AdminDashboard';
import AdminDash from './page/AdminDash';
import AdminCompanyDashboard from "./page/AdminCompanyDashboard";
import CompanyHome from "./homepages/CompanyHome";   // ✅ Import CompanyHome
import CompanyCart from "./page/CompanyCart";        // ✅ Import CompanyCart
import ClientHome from './homepages/ClientHome';
import EngHome from './homepages/EngHome';
import Project from './page/Project';
import ProjectCart from "./page/ProjectCart"; 
import CompanyProject from './page/CompanyProject';


function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarSwitch />  {/* Role-based Navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/companysign" element={<Companysign />} />
          <Route path="/userregister" element={<Userregister />} />



          {/* Admin Routes */}
          <Route 
            path="/admin/users" 
            element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} 
          />
          <Route 
            path="/admin/companies" 
            element={<RequireRole role="admin"><AdminCompanyDashboard /></RequireRole>} 
          />
          <Route 
            path="/admin/dash" 
            element={<RequireRole role="admin"><AdminDash /></RequireRole>} 
          />

          {/* Company Routes */}
          <Route 
            path="/company/home" 
            element={<RequireRole role="company"><CompanyHome /></RequireRole>} 
          />
          <Route 
            path="/companycart" 
            element={<RequireRole role="company"><CompanyCart /></RequireRole>} 
          />
          <Route 
            path="/company/projects" 
            element={<RequireRole role="company"><CompanyProject /></RequireRole>} 
          />

          {/* Eng Routes */}
          <Route 
            path="/eng/home" 
            element={<RequireRole role="engineer"><EngHome /></RequireRole>} 
          />


          {/* client Routes */}
          <Route 
            path="/client/home" 
            element={<RequireRole role="client"><ClientHome /></RequireRole>} 
          />
          <Route 
            path="/companies" 
            element={<RequireRole role="client"><Companies /></RequireRole>} 
          />

          <Route 
            path="/project" 
            element={<RequireRole role="client"><Project /></RequireRole>} 
          />

          <Route 
            path="/projectcart" 
            element={<RequireRole role="client"><ProjectCart /></RequireRole>} 
          />


          {/* Example: engineer & client routes in future */}
          {/* <Route path="/engineer/dashboard" element={<RequireRole role="engineer"><EngineerDashboard /></RequireRole>} /> */}
          {/* <Route path="/client/dashboard" element={<RequireRole role="client"><ClientDashboard /></RequireRole>} /> */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={5000} />
      </Router>
    </AuthProvider>
  );
}

// Role-based Navbar switch
function NavbarSwitch() {
  const { auth } = React.useContext(AuthContext);

  console.log("Current auth role:", auth.role); // Debugging

  if (auth.isLoggedIn && auth.role === "admin") return <AdminNavbar />;
  if (auth.isLoggedIn && auth.role === "company") return <CompanyNavbar />;
  if (auth.isLoggedIn && auth.role === "engineer") return <EngineerNavbar />;
  if (auth.isLoggedIn && auth.role === "client") return <ClientNavbar />;

  return <Navbar />; // Public Navbar
}

// Protect routes based on role
function RequireRole({ children, role }) {
  const { auth } = React.useContext(AuthContext);
  if (!auth.isLoggedIn || auth.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
