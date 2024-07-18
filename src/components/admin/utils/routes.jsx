import { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';

const RoleBasedRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const sessionRoles = (await fetchAuthSession()).tokens.idToken.payload["cognito:groups"][0];
        setUserRole(sessionRoles);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchRole();
  }, []);

  return (
    <Route
      {...rest}
      element={allowedRoles.includes(userRole) ? Element : <Navigate to="/access-denied" />}
    />
  );
};

export default RoleBasedRoute;