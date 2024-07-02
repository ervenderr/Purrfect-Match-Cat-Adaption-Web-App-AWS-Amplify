import { useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Already logged in:', user);
      } catch (error) {
        console.log('No current user:', error);
        navigate('/signin');
      }
    };

    checkCurrentUser();
  }, [navigate]);
};

export default useAuthCheck;
