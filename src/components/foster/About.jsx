import React from 'react'
import { Layout, Row, Col, Typography, Button, Image } from 'antd'

const { Content } = Layout
const { Title, Paragraph } = Typography

const About = () => {
  return (
    <Content style={{
        padding: "0 50px",
        minHeight: "100svh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Row>
            <Col xs={24}sm={24}md={12}lg={12} style={{padding: '12px'}}>
                <Image src="https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg"
                    alt="Cats" width={''} style={{borderRadius: '8px'}} preview={false} />
            </Col>


            <Col xs={24}sm={24}md={12}lg={12} style={{alignContent: 'center', padding: '12px'}}>
                <Title level={1} style={{color: '#00152a', fontSize: '36px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'}}>
                    Discover Your <span style={{color: '#00b96c'}}>Feline</span> Friend
                </Title>

                <Paragraph 
                style={{color: '#00152a', fontSize: '16px', marginBottom: '24px'}}>
                Our shelter is home to a wonderful variety of cats, each with their unique personality and story. 
                From playful kittens to gentle seniors, every cat here is looking for a loving home. 
                Explore their profiles, learn about their quirks and preferences, and find your perfect furry companion. 
                Whether you're seeking an energetic playmate or a calm snuggle buddy, 
                we're confident you'll find a cat that tugs at your heartstrings.
                </Paragraph>
            </Col>
        </Row>

    </Content>
  )
}

export default About
