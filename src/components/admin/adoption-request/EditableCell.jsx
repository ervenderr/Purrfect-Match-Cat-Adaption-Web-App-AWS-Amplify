import React from 'react'
import PropTypes from 'prop-types';
import { Input, InputNumber, Form, Select } from 'antd';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
  }) => {
    let inputNode;
    if (dataIndex === "number") {
      inputNode = <InputNumber />;
    } else if (dataIndex === "status") {
      inputNode = (
        <Select
          placeholder={`Select ${title}`}
          allowClear
          rules={[
            {
              required: true,
              message: `Please select ${title}!`,
            },
          ]}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      );
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
