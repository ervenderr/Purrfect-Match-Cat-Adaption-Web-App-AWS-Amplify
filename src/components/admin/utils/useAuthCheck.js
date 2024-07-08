import { useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens.accessToken.toString();
        // console.log('AccessToken:', token);
        // navigate('/dashboard');
      } catch (error) {
        console.error('No current user:', error);
          navigate('/dashboard');
      }
    };

    checkCurrentUser();
  }, [navigate, location.pathname]);
};

export default useAuthCheck;