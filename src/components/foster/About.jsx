import React from 'react'
import { Layout, Row, Col, Typography, Button, Image, Space, Flex } from 'antd'

const { Content } = Layout
const { Title, Paragraph } = Typography

const About = () => {
    
  return (
    <Flex style={{
        width: '100%',
        height: '100vh',
        // minHeight: '80vh',
        padding: '24px',
        margin: '0 auto',
    }}>
    
        <Row style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            margin: '0 auto',
            maxWidth: '1200px',
        }}>
            <Col xs={24}sm={24}md={12}lg={12} style={{ padding: '12px'}}>
                <Title level={1} style={{color: '#00152a', fontSize: '46px', fontWeight: 'semibold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'}}>
                    Discover Your <span style={{color: '#00b96c'}}>Feline</span> Friend
                </Title>

                <Paragraph 
                style={{color: '#555555', fontSize: '18px', marginBottom: '24px'}}>
                Our shelter is home to a wonderful variety of cats, each with their unique personality and story. 
                From playful kittens to gentle seniors, every cat here is looking for a loving home. 
                Explore their profiles, learn about their quirks and preferences, and find your perfect furry companion. 
                Whether you're seeking an energetic playmate or a calm snuggle buddy, 
                we're confident you'll find a cat that tugs at your heartstrings.
                </Paragraph>
            </Col>

            <Col xs={24}sm={24}md={12}lg={12} style={{padding: '12px'}}>
                <Image src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg"
                    alt="Cats" width={''} style={{borderRadius: '8px'}} preview={false} />
            </Col>
        </Row>
    </Flex>
  )
}

export default About
