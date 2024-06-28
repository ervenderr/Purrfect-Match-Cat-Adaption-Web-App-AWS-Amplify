import { useState } from 'react';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/admin/global/Sidebar';
import Topbar from './components/admin/global/Topbar';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ManageCats from './pages/admin/manage-cats/ManageCats';
import AdoptionRequest from './pages/admin/adoption-request/AdoptionRequest';
import Users from './pages/admin/users/Users';

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Topbar setCollapsed={setCollapsed} collapsed={collapsed} colorBgContainer={colorBgContainer} />
        <Content style={{ overflow: 'auto', backgroundColor: colorBgContainer }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manage-cats" element={<ManageCats />} />
            <Route path="/adoption-requests" element={<AdoptionRequest />} />
            <Route path="/user" element={<Users />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
