import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userStatus, setUserStatus] = useState({
    isAuthenticated: false,
    user: null
  });

  return (
    <AuthContext.Provider value={{ userStatus, setUserStatus }}>
      {children}
    </AuthContext.Provider>
  );
}