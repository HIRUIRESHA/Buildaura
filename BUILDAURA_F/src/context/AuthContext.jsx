import React, { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null,
    user: null,
  });

  // Track if logged-in company has a cart
  const [hasCart, setHasCart] = useState(false);

  // Load auth & hasCart from localStorage on mount → persistent login
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedCart = localStorage.getItem("hasCart");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      if (parsed?.isLoggedIn && parsed?.user) setAuth(parsed);
    }
    if (storedCart) setHasCart(JSON.parse(storedCart));
  }, []);

  // Save auth & hasCart to localStorage whenever they change
  useEffect(() => {
    if (auth.isLoggedIn) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
    localStorage.setItem("hasCart", JSON.stringify(hasCart));
  }, [auth, hasCart]);

  // Login function
  const login = (userData) => {
    if (!userData?.role) return console.error("Login error: role missing in userData");

    // normalize role (avoid mismatch casing)
    const normalizedRole = userData.role.toLowerCase();

    setAuth({
      isLoggedIn: true,
      role: normalizedRole,
      user: { ...userData, role: normalizedRole },
    });
  };

  // Logout function
  const logout = () => {
    setAuth({ isLoggedIn: false, role: null, user: null });
    // keep hasCart for persistent view cart
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, setAuth, hasCart, setHasCart }}>
      {children}
    </AuthContext.Provider>
  );
};
