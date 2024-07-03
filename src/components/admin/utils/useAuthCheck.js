import { useEffect } from 'react';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Already logged in:', user);

        const session = await fetchAuthSession();
        const accessToken = session.tokens;

        console.log('accessToken:', accessToken);

      } catch (error) {
        console.log('No current user:', error);
        navigate('/signin');
      }
    };

    checkCurrentUser();
  }, [navigate]);
};

export default useAuthCheck;
