import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/admin/global/Sidebar';
import Topbar from './components/admin/global/Topbar';
import LandingPage from './pages/foster/LandingPage';
import Signin from './pages/admin/login-signup/Signin';
import Signup from './pages/admin/login-signup/Signup';
import { ProtectedDashboard, ProtectedManageCats, ProtectedAdoptionRequest, ProtectedUsers } from './components/admin/ProtectedComponents';
import { components } from './components/admin/login-signup/Authenticator';


import { Amplify } from 'aws-amplify';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import awsExports from './aws-exports';
import { Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

const { Content } = Layout;


const ProtectedLayout = ({ collapsed, setCollapsed, colorBgContainer, adminSignOut }) => (
    <><Sidebar collapsed={collapsed} />
    <Layout>
    <Topbar
      setCollapsed={setCollapsed}
      collapsed={collapsed}
      colorBgContainer={colorBgContainer}
      adminSignOut={adminSignOut} />
    <Content style={{ overflow: 'auto', backgroundColor: colorBgContainer }}>
      <Routes>
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/adoption-requests" element={<ProtectedAdoptionRequest />} />
        <Route path="/manage-cats" element={<ProtectedManageCats />} />
        <Route path="/user" element={<ProtectedUsers />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Content>
  </Layout></>
);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        await fetchAuthSession();
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      }
      setLoading(false);
    };

    checkLoggedInStatus();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const adminSignOut = async () => {
    try {
      await signOut();
      setLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <View>
        <Layout style={{ height: '100vh' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
              <Route
                path="*"
                element={
                <Authenticator components={components} socialProviders={['google']}>
                  <ProtectedLayout
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    colorBgContainer={colorBgContainer}
                    adminSignOut={adminSignOut}
                  />
                  </Authenticator>
                }
              />
          </Routes>
        </Layout>
        </View>
  );
}

export default App;
