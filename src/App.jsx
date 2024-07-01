import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/admin/global/Sidebar';
import Topbar from './components/admin/global/Topbar';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ManageCats from './pages/admin/manage-cats/ManageCats';
import AdoptionRequest from './pages/admin/adoption-request/AdoptionRequest';
import Users from './pages/admin/users/Users';
import LandingPage from './pages/foster/LandingPage';
import Signin from './pages/admin/login-signup/Signin';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { signOut, getCurrentUser } from 'aws-amplify/auth';

Amplify.configure(awsExports);

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    AssesLoggedInStat();
  }, []);

const AssesLoggedInStat = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
}

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const adminSignOut = async () => {
    try {
      await signOut();
      setLoggedIn(false);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  const isloggedIn = () => {
    setLoggedIn(true);
  }

  return (
    <Layout style={{ height: '100vh' }}>
      {loggedIn ? (
        <>
          <Sidebar collapsed={collapsed} />
          <Layout>
            <Topbar
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              colorBgContainer={colorBgContainer}
              adminSignOut={adminSignOut}
            />
            <Content style={{ overflow: 'auto', backgroundColor: colorBgContainer }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/adoption-requests" element={<AdoptionRequest />} />
                <Route path="/manage-cats" element={<ManageCats />} />
                <Route path="/user" element={<Users />} />
              </Routes>
            </Content>
          </Layout>
        </>
      ) : (
        <>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin isloggedIn={isloggedIn} />} />
                {/* <Route path="/adoption-requests" element={<AdoptionRequest />} /> */}
          </Routes>
          </>
      )}
    </Layout>
  );
}

export default App;
