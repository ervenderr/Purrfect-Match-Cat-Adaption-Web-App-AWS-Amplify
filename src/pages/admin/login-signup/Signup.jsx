import { Form, Input, Button, Card, Typography } from 'antd';
import { signUp, getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { Title } = Typography;

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkCurrentUser();
    }, []);

    const checkCurrentUser = async () => {
        try {
            const user = await getCurrentUser();
            console.log('Already logged in:', user);
            // isloggedIn(true);
            navigate('/dashboard');
        } catch (error) {
            console.log('No current user:', error);
        }
        setLoading(false);
    };

    const handleSignin = async () => {

        try {
            await signUp({ username, password });
            // navigate('/dashboard');
            // console.log('Sign up: ', { username, password });
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up. Please check your credentials.');
        }
    };

    const [loading, setLoading] = useState(true);
    
    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', height:'100vh', width:'500', background: '#001529'}}>
        <h1 style={{ color: 'white'}}>Purrfect Match</h1>
        <Card style={{ display: 'flex', marginBottom: 25}}>
        <Title level={2} style={{margin: '0px 0 15px', textAlign:'center'}}>Sign Up</Title>
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

export default Signup;
