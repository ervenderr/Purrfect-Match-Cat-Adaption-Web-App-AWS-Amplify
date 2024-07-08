import { useEffect, useState } from "react";
import originData from "./sampleData";
import {
  Form,
  Popconfirm,
  Table,
  Typography,
  Button,
  ConfigProvider,
} from "antd";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { generateClient } from 'aws-amplify/api';
import { listCats } from "../../../graphql/queries";
import { createCat, deleteCat } from '../../../graphql/mutations';


const Lists = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const client = generateClient();

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    try {
      const catsData = await client.graphql({ query: listCats });
      const cats = catsData.data.listCats.items;
      console.log("Cats data:", cats);
      setData(cats);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  }


  const edit = (record) => {
    console.log("Editing record:", record);
  };


  const handleDelete = async (id) => {
    console.log("Deleting key:", id);

    const result = await client.graphql({
      query: deleteCat,
      variables: {
        input: {
          id: id
        }
      }
    });
    
  }


  const createCats = async () => {
    try {
      const result = await client.graphql({
        query: createCat,
        variables: {
          input: {
            name: 'Mittens',
            age: 5,
            breed: 'Siamese',
            description: 'A very playful cat',
            image: 'https://images.unsplash.com/photo-1573497019702-3d9b3e2d4f4b',
          }
        }
      });
      
    } catch (error) {
      console.error("Error creating cat:", error)
    }
  }
  
  

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
            onClick={() => edit(record)}
          >
            <Button primary style={{ marginRight: "5px" }} icon={<EditOutlined />} />
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
      <Button onClick={createCats}>Create Cat</Button>
      <Form form={form} component={false}>
        <Table
        size="small"
          scroll={{
            y: "100%",
          }}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          // pagination={{
          //   onChange:,
          // }}
        />
      </Form>
    </ConfigProvider>
  );
};


export default Lists;
