import React from 'react'
import PropTypes from 'prop-types';
import { Input, InputNumber, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EditableCell = ({
     editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
    ...restProps
  }) => {
    let inputNode;
    if (dataIndex === "number") {
      inputNode = <InputNumber />;
    } else if (dataIndex === "photo") {
      inputNode = <Upload accept="image/*"><Button icon={<UploadOutlined />}>Upload</Button></Upload>;
    } else if (dataIndex === "description") {
      inputNode = <Form.Item
      label="Description"
      name="description"
      rules={[
        { required: true, message: 'Please enter the description' },
        { min: 10, message: 'Description must be at least 10 characters' },
        { max: 200, message: 'Description cannot exceed 200 characters' },
      ]}
    >
      <Input.TextArea />
    </Form.Item>;
    } else {
      inputNode = <Input />;
    }
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  

  EditableCell.propTypes = {
    editing: PropTypes.bool,
    dataIndex: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

export default EditableCell
