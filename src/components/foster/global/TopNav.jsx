
import React from 'react';
import { Image, Layout, Menu } from 'antd';
import Logo from '../../../assets/logo-icon.png';

const { Header } = Layout;


const TopNav = () => {

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

        <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={["1"]} style={{ lineHeight: '34px' }} breakpoint="lg" collapsedWidth="0"
>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
        
      </Header>
    );
  }

export default TopNav
