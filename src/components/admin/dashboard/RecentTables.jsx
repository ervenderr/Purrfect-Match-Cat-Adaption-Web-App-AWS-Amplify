import React from 'react';
import { Space, Table, Tag, Button, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: "Selected Cat",
      dataIndex: ["cat", "name"],
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        fixed: 'right',
        render: (_, record) => {
          let color = 'green';
          if (record.status === 'Closed') {
            color = 'volcano';
          }
          if (record.status === 'Pending') {
            color = 'geekblue';
          }
          return (
            <Tag color={color} key={record.status}>
              {record.status.toUpperCase()}
            </Tag>
          );
        },
      },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Typography.Link>
            <Link to={`/adoption-requests`}>
              <Button style={{ marginRight: "5px" }} icon={<EyeOutlined />}></Button>
            </Link>
          </Typography.Link>
        );
      }
    },
  ];
  

const RecentTables = ({data}) => {
  return <Table columns={columns} dataSource={data}  />;
}

export default RecentTables