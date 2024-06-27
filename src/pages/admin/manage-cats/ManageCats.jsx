import React from 'react'
import { Layout, Typography, Divider } from 'antd'
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
      <Typography.Text
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        level={2}
      >
        List of Cats
      </Typography.Text>

      <Divider orientation="left"></Divider>
      <Lists />
    </Content>
  );
};

export default ManageCats