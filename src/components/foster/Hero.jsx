import React from 'react'
import { Layout, Row, Col, Typography, Button } from 'antd'
import HeroBg from '../../assets/hero-bg.jpg'

const { Content } = Layout
const { Title, Paragraph } = Typography

const Hero = () => {
  return (
    <Content
        style={{
          padding: "0 8px",
          minHeight: "80svh",
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            maxWidth: "1200px",
            width: "100%",
            padding: "24px",
            borderRadius: "8px",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col
            xs={24}
            sm={18}
            md={14}
            style={{
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
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
                color: "#00152a",
                marginBottom: "24px",
                fontSize: "16px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                
              }}
            >
              Find your perfect feline companion and give a cat a loving home.
              Browse through our list of adorable cats ready for adoption.
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
              Adopt Now
            </Button>
          </Col>
        </Row>
      </Content>
  )
}

export default Hero
