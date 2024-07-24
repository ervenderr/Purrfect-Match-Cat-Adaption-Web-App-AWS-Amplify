import React from 'react'
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';

const { Option } = Select;


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
  const inputNode = inputType === 'select' ? (
    <Select>
      <Option value="Pending">Pending</Option>
      <Option value="Approved">Approved</Option>
      <Option value="Rejected">Closed</Option>
    </Select>
  ) : (
    children
  );

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
              message: `Please select ${title}!`,
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

export default EditableCell
