import React from 'react'
import { Layout, Row, Col, Typography, Button, Image, Card } from 'antd'

const { Content } = Layout
const { Title, Paragraph } = Typography
const { Meta } = Card;

const Cats = () => {
  return (
    <Content style={{
        padding: "0 50px",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
    }}>
        <Title level={1} style={{color: '#00152a', fontSize: '36px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'}}>
            Our Cats
        </Title>
        <Row>
            <Col span={6}>
            <Card
                size='small'
                hoverable
                style={{ minWidth: 220 ,  padding: '14px'}}
                cover={<Image height={220} alt="example" src="https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />}
            >
                <div>
                    <Meta description="Name: Erven" />
                    <Meta description="Breed:" />
                    <Meta description="Age:" />
                    <Meta description="Gender:" />
                </div>
            </Card>
            </Col>
  

        </Row>

    </Content>
  )
}

export default Cats
