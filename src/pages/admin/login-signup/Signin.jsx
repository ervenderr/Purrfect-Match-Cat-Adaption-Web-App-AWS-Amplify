import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const Signin = ({ isloggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            await signIn({username, password});
            isloggedIn(true);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in:', error);
            console.log('username, password:', username, password);
        }
    };

    return (
        <div>
            <input
                id="username"
                label="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                id="password"
                label="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignin}>Sign In</button>
        </div>
    );
};

export default Signin;
