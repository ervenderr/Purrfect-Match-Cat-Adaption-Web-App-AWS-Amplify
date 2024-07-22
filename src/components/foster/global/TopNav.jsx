
import {useState} from 'react';
import { Image, Layout, Menu, Drawer, Button } from 'antd';
import Logo from '../../../assets/logo-icon.png';
import { useMediaQuery } from 'react-responsive';
import { MenuOutlined } from '@ant-design/icons';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link } from 'react-router-dom';




const { Header } = Layout;


const TopNav = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };



    return (
      <Header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
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

        <nav className={isMobile ? 'mobile-nav' : 'desktop-nav'}>
        {!isMobile ? (
          <>
            <ScrollLink to="home" spy={true} smooth={true} duration={500} activeClass="active">
              Home
            </ScrollLink>
            <ScrollLink to="about" spy={true} smooth={true} duration={500} activeClass="active">
              About
            </ScrollLink>
            <ScrollLink to="cats" spy={true} smooth={true} duration={500} activeClass="active">
              Cats
            </ScrollLink>
          </>
        ) : (
          <>
            <MenuOutlined
              onClick={showDrawer}
              style={{
                fontSize: '24px',
                color: 'white',
                cursor: 'pointer',
              }}
            />
            <Drawer title="Menu" onClose={onClose} open={open} >
              <ScrollLink to="home" spy={true} smooth={true} duration={500} activeClass="active" onClick={onClose}>
                Home
              </ScrollLink>
              <ScrollLink to="about" spy={true} smooth={true} duration={500} activeClass="active" onClick={onClose}>
                About
              </ScrollLink>
              <ScrollLink to="cats" spy={true} smooth={true} duration={500} activeClass="active" onClick={onClose}>
                Cats
              </ScrollLink>
            </Drawer>
          </>
        )}
      </nav>

        
        
      </Header>
    );
  }

export default TopNav
