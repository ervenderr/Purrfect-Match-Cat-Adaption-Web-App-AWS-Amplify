import { useEffect } from 'react';
import { fetchAuthSession  } from 'aws-amplify/auth';

const CheckRole = async () => {
      try {
        const session = (await fetchAuthSession()).tokens.idToken.payload["cognito:groups"][0];
        console.log('AccessToken:', session);
        return session;

      } catch (error) {
        console.error('No current user:', error);
      }
}

export default CheckRole
