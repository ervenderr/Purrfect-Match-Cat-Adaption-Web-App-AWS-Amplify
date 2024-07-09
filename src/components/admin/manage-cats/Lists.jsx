import {
  Form,
  Popconfirm,
  Table,
  Typography,
  Button,
  ConfigProvider,
} from "antd";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import UpdateModal from "./UpdateModal";
import { useState } from "react";
import { getCat } from "../../../graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useEffect } from "react";



const Lists = ({ cat, handleDelete, fetchCats }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCatData, setCurrentCatData] = useState({});
  const client = generateClient();


  const showModal = (id, name, age, breed, status, description) => {
    setIsModalOpen(true);
    setCurrentCatData({"id": id, "name": name, 'age': age, 'breed': breed, 'status': status, 'description': description});
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
      title: "Status",
      dataIndex: "status",
      width: "15%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "20%",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      width: "15%",
      editable: true,
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
            onClick={() => showModal(record.id, record.name, record.age, record.breed, record.status, record.description)} 
            style={{ marginRight: "5px" }} icon={<EditOutlined 
            />} />
            <UpdateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} catData={currentCatData} fetchCats={fetchCats} />
          </Typography.Link>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
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
          dataSource={cat}
          columns={columns}
          rowClassName="editable-row"
          rowKey="id"
          // pagination={{
          //   onChange:,
          // }}
        />
      </Form>
    </ConfigProvider>
  );
};


export default Lists;
