import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentSession = await fetchAuthSession();
        setSession(currentSession);
      } catch (error) {
        console.error('No current user:', error);
      }
    };

    checkCurrentUser();
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};


