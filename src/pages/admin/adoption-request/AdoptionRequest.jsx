import React from 'react'
import { Layout, Typography, Button, Card } from 'antd'
import Requests from '../../../components/admin/adoption-request/Requests'

const { Content } = Layout;

const AdoptionRequest = () => {
  return (
    <Content
      style={{
        padding: 24,
        background: "#f5f5f5",
        minHeight: '100%',
        minWidth: 0,
        overflow: "hidden",
      }}>
        <Content style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        
      <Typography.Text
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        level={2} >
        Adoption Requests
      </Typography.Text>

      <Typography>
        <Button onClick={() => console.log("Hi")}>Add New Cat</Button>
        {/* <CreateModal open={open} setOpen={setOpen} /> */}
    </Typography>
      </Content>

      <Card>
        <Requests />
      </Card>
    </Content>
  )
}

export default AdoptionRequest