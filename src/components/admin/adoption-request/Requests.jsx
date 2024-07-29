import { useState, useCallback, useEffect } from "react";
import {
  Form,
  Popconfirm,
  Table,
  Typography,
  Button,
  Tag,
  ConfigProvider,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined} from "@ant-design/icons";
import EditableCell from "./EditableCell";
import { listRequests } from "../../../graphql/queries";
import { generateClient } from 'aws-amplify/api';
import { updateCat, updateRequest } from '../../../graphql/mutations';
import DOMPurify from 'dompurify';


const Lists = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState([]);
  const client = generateClient();

  const sanitizeData = (data) => {
    const sanitizedData = {};
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'string') {
        sanitizedData[key] = DOMPurify.sanitize(data[key]);
      } else {
        sanitizedData[key] = data[key];
      }
    });
    return sanitizedData;
  };


  const fetchRequests = useCallback(async () => {
    try {
      const catsData = await client.graphql({ 
        query: listRequests,  
        authMode: 'userPool'
      });
      const requestData = catsData.data.listRequests.items.map(item => ({
        ...sanitizeData(item),
        key: item.id,
      }));
      setData(requestData);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);


  

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {

    const catstatus = record.cat.status;
    const requestStatus = record.status;

    if(catstatus === 'Adopted' || requestStatus === 'Closed') {
      message.error('The cat has already been adopted')
    }
    else {
      form.setFieldsValue({
        status: '',
        ...record,
      });
      setEditingKey(record.id);
    }
  };


  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id, catid, catstatus) => {
    const requestStatus = form.getFieldValue('status');
    try {
      const newData = [...data];

      await client.graphql({
        query: updateRequest,
        variables: {
          input: {
            id: id,
            status: requestStatus,
          }},
          authMode: 'userPool'
      });

    if (requestStatus == 'Approved') {

      const requestsData = await client.graphql({
        query: listRequests,
        variables: {
          filter: { catID: { eq: catid } }
        },
        authMode: 'userPool'
      });

      const catRequests = requestsData.data.listRequests.items;

      await client.graphql({
        query: updateCat,
        variables: {
          input: {
            id: catid,
            status: 'Adopted',
          }},
        authMode: 'userPool'
      });

      const updateRequestsPromises = catRequests.map(req => {
        if (req.id !== id && req.status !== 'Approved') {
          return client.graphql({
            query: updateRequest,
            variables: {
              input: {
                id: req.id,
                status: 'Closed',
              }
            },
            authMode: 'userPool'
          });
        }
        return null;
      });
      await Promise.all(updateRequestsPromises);
    }

    fetchRequests();
    setEditingKey('');
    setTimeout(() => {
      message.success('Cat updated successfully');
    }, 0);

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const handleDelete = useCallback((key) => {
    setData(data.filter((item) => item.key !== key));
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "15%",
    },
    {
      title: "Selected Cat",
      dataIndex: ["cat", "name"],
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      editable: true,
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
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id, record.cat.id, record.cat.status)}
              style={{
                marginRight: 8,
              }}
            >
              <Button>Save</Button>
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''} onClick={() => edit(record)}
            >
              <Button style={{ marginRight: "5px" }} icon={<EditOutlined />}></Button>
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'select',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
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
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{display: 'flex'}}><div>
                  <p style={{ margin: 0 }}>Message:</p>
                  <p style={{ margin: 0 }}>{record.message}</p>
                </div></div>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </ConfigProvider>
  );
};


export default Lists;
