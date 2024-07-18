import { Image, Layout, Menu, Typography } from 'antd';
import Logo from '../../../assets/logo-icon.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, BaiduOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import CheckRole from '../utils/CheckRole';
import { Content } from 'antd/es/layout/layout';
import adminImg from '../../../assets/admin-user.svg';
import EditorsImg from '../../../assets/office-man.png';

const { Header, Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = ({ collapsed }) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchRole = async () => {
          const sessionRole = await CheckRole();
          setRole(sessionRole);
        };
    
        fetchRole();
      }, []);


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
                    {collapsed ? '' :
                    <Title level={5} style={{ color: 'white', margin: '0 0 0 10px', fontWeight: 'semiBold' }}>
                        PurrfectMatch
                    </Title>
                    }
                </Header>

            </Layout>
                <Content style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '5px auto 25px auto',
                }}>
                    { role === 'Admins' ? 
                    <Image src={adminImg} alt="logo" width={50} 
                    style={{ 
                        margin: '0px auto 10px auto', 
                        display: 'block',
                        borderRadius: '50%',
                        border: '2px solid white',
                        padding: '5px',
                        backgroundColor: 'white'
                        }} />
                    :
                    <Image src={EditorsImg} alt="logo" width={50}
                    style={{ 
                        margin: '0px auto 10px auto', 
                        display: 'block',
                        borderRadius: '50%',
                        border: '2px solid white',
                        padding: '5px',
                        backgroundColor: 'white'
                        }} />
                    }
                     { collapsed ? '' : 
                     <>
                     <Title level={5} style={{ color: 'white', margin: '0 0 5px 0', fontWeight: 'semiBold' }}>Erven Idjad</Title>
                     <Text mark>{role}</Text>
                     </>
                     }
                </Content>
            <Menu
            style={{
                padding: '0px 10px',
            }}
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
                    role === 'Admins' &&
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
