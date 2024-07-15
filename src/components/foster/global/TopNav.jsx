
import React from 'react';
import { Image, Layout, Menu } from 'antd';
import Logo from '../../../assets/logo-icon.png';

const { Header } = Layout;


const TopNav = () => {

  const menuItems = [
    {
      key: '1',
      label: 'Home',
    },
    {
      key: '2',
      label: 'About',
    },
    {
      key: '3',
      label: 'Contact',
    },
  ];

    return (
      <Header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      >
        <div className="demo-logo" style={{ color: "white", display: 'flex', gap: '5px' }}>
          <Image src={Logo} alt="Logo" width={30}/>
            <span style={{fontSize: '20px'}} >PurrfectMatch</span>
        </div>

        <Menu 
        theme="dark" 
        mode="horizontal"  
        defaultSelectedKeys={["1"]} 
        style={{ lineHeight: '34px' }} 
        breakpoint="lg" 
        items={menuItems}
        collapsedWidth="0">
        </Menu>
        
      </Header>
    );
  }

export default TopNav
