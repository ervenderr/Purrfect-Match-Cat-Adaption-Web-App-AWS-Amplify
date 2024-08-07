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
import Dashboard from './pages/admin/dashboard/Dashboard';
import ManageCats from './pages/admin/manage-cats/ManageCats';
import AdoptionRequest from './pages/admin/adoption-request/AdoptionRequest';
import Users from './pages/admin/users/Users';
import CatDetails from './pages/foster/CatDetails';


import { Amplify } from 'aws-amplify';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import awsExports from './aws-exports';
import { Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import AccessDenied from './pages/foster/AccessDenied';

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
        <Route path="/signin" element={<Navigate to="/" />} />
        <Route path="/signup" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Content>
  </Layout></>
);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const session = await fetchAuthSession();
        setUserRole(session.tokens.idToken.payload["cognito:groups"][0]);

        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      }
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


  return (
    <View>
        <Layout style={{ height: '100vh' }}>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cats/:id" element={<CatDetails />} />
              <Route
                path="*"
                element={
                <Authenticator loginMechanisms={['email']} components={components} socialProviders={['google']} >
                  <ProtectedLayout
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    colorBgContainer={colorBgContainer}
                    adminSignOut={adminSignOut}
                  />
                  </Authenticator>
                }>
              </Route>
          </Routes>
        </Layout>
        </View>
  );
}

export default App;
