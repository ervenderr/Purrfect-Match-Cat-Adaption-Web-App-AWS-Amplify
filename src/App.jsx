import { useState } from 'react';

import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/admin/global/Sidebar';
import Topbar from './components/admin/global/Topbar';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ManageCats from './pages/admin/manage-cats/ManageCats';
import AdoptionRequest from './pages/admin/adoption-request/AdoptionRequest';
import Users from './pages/admin/users/Users';

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

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage-cats" element={<ManageCats />} />
          <Route path="/adoption-requests" element={<AdoptionRequest />} />
          <Route path="/user" element={<Users />} />
        </Routes>

        {/* <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content> */}
      </Layout>
    </Layout>
  )
}

export default App
