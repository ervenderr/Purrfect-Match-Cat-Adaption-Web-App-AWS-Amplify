import React from 'react';
import { Space, Table, Tag } from 'antd';


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Cat Name',
      key: 'cat',
      dataIndex: 'cat',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
          let color = 'green';
          if (record.status === 'Rejected') {
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
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      cat: 'Patchie',
      address: 'New York No. 1 Lake Park',
      status: 'Pending',
    },
    {
      key: '2',
      name: 'Jim Green',
      cat: 'Patchie',
      address: 'London No. 1 Lake Park',
      status: 'Pending',
    },
    {
      key: '3',
      name: 'Joe Black',
      cat: 'Patchie',
      address: 'Sydney No. 1 Lake Park',
      status: 'Approved',
    },
  ];

const RecentTables = () => {
  return <Table columns={columns} dataSource={data}  />;
}

export default RecentTables