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
      cat: 32,
      address: 'New York No. 1 Lake Park',
      status: 'Pending',
    },
    {
      key: '2',
      name: 'Jim Green',
      cat: 42,
      address: 'London No. 1 Lake Park',
      status: 'Pending',
    },
    {
      key: '3',
      name: 'Joe Black',
      cat: 32,
      address: 'Sydney No. 1 Lake Park',
      status: 'Approved',
    },
  ];

const RecentTables = () => {
  return <Table columns={columns} dataSource={data}  />;
}

export default RecentTables