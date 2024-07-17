import React from 'react'
import { Layout, Row, Col, Typography, Button, Space, Flex } from 'antd'
import HeroBg from '../../assets/hero-bg.jpg'

const { Content } = Layout
const { Title, Paragraph } = Typography

const Hero = () => {
  return (
    
      <div style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${HeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '24px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        }}>
            <Title
              style={{
                color: "#00152a",
                marginBottom: "24px",
                fontSize: "36px",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              level={1}
            >
              Welcome to <span style={{color: '#00b96c'}}>PurrfectMatch</span> Cat Adoption!
            </Title>
            <Paragraph
              style={{
                maxWidth: "830px",
                color: "#00152a",
                marginBottom: "24px",
                fontSize: "18px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                
              }}
            >
              Find your perfect feline companion and give a cat a loving home. 
              Browse through our comprehensive list of adorable cats ready for adoption, 
              each with their unique personalities and stories.
            </Paragraph>
            <Button
              type="primary"
              style={{
                color: "#fff",
                borderRadius: "8px",
                padding: "22px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              Explore Now
            </Button>
            </div>
          </div>
 
  )
}

export default Hero
