import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { signUp, getCurrentUser, confirmSignUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const { Title } = Typography;

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [step, setStep] = useState(1);
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

    const handleSignUp = async () => {
        try {
            await signUp({ username, password });
            setStep(2);
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up. Please check your credentials.');
        }
    };

    const handleConfirmSignup = async () => {
        try {
            console.log('username:', username);
            await confirmSignUp({username, confirmationCode});
            navigate('/dashboard');
        } catch (error) {
            console.error('Error confirming sign up:', error);
            setError('Failed to confirm sign up. Please check the confirmation code.');
        }
    };

    const [loading, setLoading] = useState(true);
    
    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', height:'100vh', width:'500', background: '#001529'}}>
        <h1 style={{ color: 'white'}}>Purrfect Match</h1>
        <Card style={{ display: 'flex', marginBottom: 25 }}>
                {step === 1 ? (
                    <>
                        <Title level={2} style={{ margin: '0px 0 15px', textAlign: 'center' }}>Sign Up</Title>
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
                                <Button type="primary" onClick={handleSignUp}>
                                    Sign Up
                                </Button>
                            </Form.Item>
                            {error && <Alert message={error} type="error" />}
                        </Form>
                    </>
                ) : (
                    <>
                        <Title level={2} style={{ margin: '0px 0 15px', textAlign: 'center' }}>Confirm Sign Up</Title>
                        <Form layout='vertical'>
                            <Form.Item
                                label="Confirmation Code"
                                name="confirmationCode"
                                rules={[{ required: true, message: 'Please enter the confirmation code' }]}
                            >
                                <Input value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={handleConfirmSignup}>
                                    Confirm
                                </Button>
                            </Form.Item>
                            {error && <Alert message={error} type="error" />}
                        </Form>
                    </>
                )}
            </Card>
    </div>
    );
};

export default Signup;
