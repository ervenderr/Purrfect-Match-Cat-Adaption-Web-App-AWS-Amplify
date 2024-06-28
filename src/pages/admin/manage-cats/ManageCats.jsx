import React from 'react'
import { Layout, Typography, Button, Card } from 'antd'
import Lists from './Lists';

const { Content } = Layout;

const ManageCats = () => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#f5f5f5",
        minHeight: 280,
      }}
    >
      <Content style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
      <Typography.Text
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        level={2}
      >
        List of Cats
      </Typography.Text>

      <Typography>
        <Button>Add New Cat</Button>
    </Typography>
      </Content>
    
    <Card>
      <Lists />
      </Card>
    </Content>
  );
};

export default ManageCats