import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Companies from './components/Companies'; 
import About from './components/About';
import Contact from './components/Contact';  
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Companysign from './components/Companysign';
import Userregister from './components/Userregister';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/companysign" element={<Companysign />} />
        <Route path="/userregister" element={<Userregister />} />
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
