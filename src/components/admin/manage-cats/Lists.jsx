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



const Lists = ({ cat, handleDelete, handleUpdate }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const edit = (record) => {
    console.log("Editing record:", record);
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
            // onClick={() => edit(record)}
          >
            <Button primary="true" onClick={showModal} style={{ marginRight: "5px" }} icon={<EditOutlined />} />
            <UpdateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Button warning icon={<DeleteOutlined />} onClick={() => handleUpdate(record.id)} />
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
          scroll={{
            y: "100%",
          }}
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
