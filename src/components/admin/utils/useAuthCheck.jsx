import { useEffect } from 'react';
import { fetchAuthSession, getCurrentUser  } from 'aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const session = await fetchAuthSession();
        // const user = await getCurrentUser();
        console.log('AccessToken:', session);
        // console.log('user:', user);
        // // navigate('/dashboard');
      } catch (error) {
        console.error('No current user:', error);
          navigate('/dashboard');
      }
    };

    checkCurrentUser();
  }, [navigate, location.pathname]);
};

export default useAuthCheck;