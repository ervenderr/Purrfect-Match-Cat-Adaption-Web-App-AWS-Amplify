import React from 'react';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const LandingPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Title level={2}>Welcome to Purrfect Match Cat Adoption Web App</Title>
            <Button type="primary" size="large">Get Started</Button>
        </div>
    );
};

export default LandingPage;
