import React, { useState, useEffect } from 'react';
import { signIn, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Form, Alert, Card } from 'antd';
import useAuthCheck from '../../../components/admin/utils/useAuthCheck';

const { Title } = Typography;

const Signin = ({ isloggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useAuthCheck();

    const handleSignin = async () => {

        try {
            await signIn({ username, password });
            isloggedIn();
            navigate('/dashboard');
        } catch (error) {
            console.error('Error signing in:', error);
            setError(error.message);
        }
    };

    

    return (
        <div style={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', height:'100vh', width:'500', background: '#001529'}}>
            <h1 style={{ color: 'white'}}>Purrfect Match</h1>
            <Card style={{ display: 'flex', marginBottom: 25}}>
            <Title level={2} style={{margin: '0px 0 15px', textAlign:'center'}}>Sign In</Title>
            <Form layout='vertical'>
                <Form.Item
                    label="Admin username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSignin}>
                        Sign In
                    </Button>
                </Form.Item>
                {error && <Alert message={error} type="error" />}
            </Form>
            </Card>
        </div>
    );
};

export default Signin;