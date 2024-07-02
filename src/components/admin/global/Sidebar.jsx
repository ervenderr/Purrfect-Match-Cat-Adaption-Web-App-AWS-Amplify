import { Layout, Menu, Typography } from 'antd';
import Logo from '../../../assets/logo-icon.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, BaiduOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider } = Layout;
const { Title } = Typography;

const Sidebar = ({ collapsed }) => {

    const navigate = useNavigate();

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} theme='dark' style={{ height: '100%' }}>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img src={Logo} alt="logo" width={"28px"} />
                    <Title level={5} style={{ color: 'white', margin: 0, fontWeight: 'semiBold' }}>
                        {collapsed ? '' : 'Purrfect Match'}
                    </Title>
                </Header>
            </Layout>
            <Menu
                theme="dark"
                mode="inline"
                onClick={({ key }) => {
                    navigate(key);
                }}
                defaultSelectedKeys={[window.location.pathname]}

                items={[
                    {
                      key: '/dashboard',
                      icon: <HomeOutlined />,
                      label: 'Dashboard',
                    },
                    {
                      key: '/manage-cats',
                      icon: <BaiduOutlined />,
                      label: 'Manage Cats',
                    },
                    {
                      key: '/adoption-requests',
                      icon: <SnippetsOutlined />,
                      label: 'Adoption Requests',
                    },
                    {
                        key: '/user',
                        icon: <UserOutlined />,
                        label: 'Users',
                      },
                  ]}
            >
            </Menu>
        </Sider>
    );
};

Sidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;
