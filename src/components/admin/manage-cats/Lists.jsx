import {
  Form,
  Popconfirm,
  Table,
  Typography,
  Button,
  ConfigProvider,
  Image,
  Tag,
} from "antd";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import UpdateModal from "./UpdateModal";
import { useState } from "react";
import { getCat } from "../../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useEffect, useCallback } from "react";
import { getUrl } from "aws-amplify/storage";



const Lists = ({ updatedCatData, handleDelete, fetchCats }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCatData, setCurrentCatData] = useState({});
  const client = generateClient();


  const showModal = async(id, name, age, gender, breed, status, description, image) => {
    setIsModalOpen(true);
    
    setCurrentCatData(
      {"id": id, "name": name, 'age': age, 'gender': gender, 'breed': breed, 'status': status, 
        'description': description, 'image': image}
    );
    const path = new URL(image).pathname;
    const slicedPath = path.slice(1);

    const segments = path.split('/');
    const fileName = segments[segments.length - 1];
    const uid = fileName.split('.').slice(0, -1).join('.');

    const url = await getUrl({
      path: slicedPath,
      options: {
        validateObjectExistence: true
      },
    });
  
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "5%",
      editable: true,
    },
    {
      title: "Breed",
      dataIndex: "breed",
      width: "15%",
      editable: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "15%",
      editable: true,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (_, record) => {
        let color = 'green';
        if (record.status === 'Coming Soon') {
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
      title: "Image",
      dataIndex: "image",
      width: "10%",
      editable: true,
      render: (image) => <Image src={image} alt="Cat" style={{ width: "50px", height: "auto" }} />,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <>
          <Typography.Link
            // onClick={() => getCatRecord(record.id)}
          >
            <Button 
            primary="true" 
            onClick={() => showModal(record.id, record.name, record.age, record.gender, record.breed, record.status, record.description, record.image)} 
            style={{ marginRight: "5px" }} icon={<EditOutlined 
            />} />
            <UpdateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} catData={currentCatData} fetchCats={fetchCats} />
          </Typography.Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id, record.image)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];
  
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#001529",
            headerColor: "#fff",
          },
        },
      }}
    >
      <Form form={form} component={false}>
        <Table
        size="small"
          bordered
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
      
          dataSource={updatedCatData || []}
          
          rowClassName="editable-row"
          rowKey="id"
        />
      </Form>
    </ConfigProvider>
  );
};


export default Lists;
