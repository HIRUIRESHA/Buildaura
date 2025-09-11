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

    const normalizedRole = userData.role.toLowerCase();

    const newAuth = {
      isLoggedIn: true,
      role: normalizedRole,
      user: { ...userData, role: normalizedRole },
    };

    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  // Logout function
  const logout = () => {
    setAuth({ isLoggedIn: false, role: null, user: null });
    localStorage.removeItem("auth");
  };

  // Expose `user` directly for easier access in components
  return (
    <AuthContext.Provider value={{ auth, user: auth.user, login, logout, setAuth, hasCart, setHasCart }}>
      {children}
    </AuthContext.Provider>
  );
};
