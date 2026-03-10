import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar';              
import AdminNavbar from './navbars/AdminNavbar';      
import CompanyNavbar from './navbars/CompanyNavbar';  
import EngineerNavbar from './navbars/EngineerNavbar';
import ClientNavbar from './navbars/ClientNavbar';    
import Footer from './components/Footer';

import Home from './components/Home';
import Companies from './components/Companies';
import Services from './components/Services'; 
import About from './components/About';
import Contact from './components/Contact';  
import Login from './components/Login';
import Signup from './components/Signup';
import Companysign from './components/Companysign';
import Userregister from './components/Userregister';
import AdminDash from './page/AdminDash';
import CompanyHome from "./homepages/CompanyHome";   
import CompanyCart from "./page/CompanyCart";        
import ClientHome from './homepages/ClientHome';
import EngHome from './homepages/EngHome';
import Project from './page/Project';
import ProjectCart from "./page/ProjectCart"; 
import EngDash from './page/EngDash';
import CompanyDash from './page/CompanyDash';
import Employee from './page/Employee';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarSwitch /> 
        <Routes>
          <Route 
            path="/" 
            element={<RootRedirect />}   
          />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/companysign" element={<Companysign />} />
          <Route path="/userregister" element={<Userregister />} />

          <Route 
            path="/admin/dash" 
            element={<RequireRole role="admin"><AdminDash /></RequireRole>} 
          />

          <Route 
            path="/company/home" 
            element={<RequireRole role="company"><CompanyHome /></RequireRole>} 
          />
          <Route 
            path="/company/dash" 
            element={<RequireRole role="company"><CompanyDash /></RequireRole>} 
          />
          <Route 
            path="/companycart" 
            element={<RequireRole role="company"><CompanyCart /></RequireRole>} 
          />
          <Route 
            path="/company/employee" 
            element={<RequireRole role="company"><Employee /></RequireRole>} 
          />
          {/* <Route 
            path="/company/projects" 
            element={<RequireRole role="company"><CompanyProject /></RequireRole>} 
          /> */}

          <Route 
            path="/eng/home" 
            element={<RequireRole role="engineer"><EngHome /></RequireRole>} 
          />
          <Route 
            path="/eng/dash" 
            element={<RequireRole role="engineer"><EngDash /></RequireRole>} 
          />

          {/* Client Routes */}
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={5000} />
      </Router>
    </AuthProvider>
  );
}

function RootRedirect() {
  const { auth } = React.useContext(AuthContext);

  if (auth.isLoggedIn && auth.role === "admin") {
    return <Navigate to="/admin/dash" replace />;
  }
  if (auth.isLoggedIn && auth.role === "company") {
    return <Navigate to="/company/home" replace />;
  }
  if (auth.isLoggedIn && auth.role === "engineer") {
    return <Navigate to="/eng/home" replace />;
  }
  if (auth.isLoggedIn && auth.role === "client") {
    return <Navigate to="/client/home" replace />;
  }

  return <Home />; 
}

function NavbarSwitch() {
  const { auth } = React.useContext(AuthContext);

  console.log("Current auth role:", auth.role); 

  if (auth.isLoggedIn && auth.role === "admin") return <AdminNavbar />;
  if (auth.isLoggedIn && auth.role === "company") return <CompanyNavbar />;
  if (auth.isLoggedIn && auth.role === "engineer") return <EngineerNavbar />;
  if (auth.isLoggedIn && auth.role === "client") return <ClientNavbar />;

  return <Navbar />; 
}

function RequireRole({ children, role }) {
  const { auth } = React.useContext(AuthContext);
  if (!auth.isLoggedIn || auth.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
