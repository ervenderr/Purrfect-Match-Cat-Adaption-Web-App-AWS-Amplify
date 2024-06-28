import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as yup from 'yup'; // Importing yup for input validation

const CreateForm = ({setOpen}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const onFinish = (values) => {
    // Perform frontend validation using yup
    const schema = yup.object().shape({
      catname: yup.string().required().min(2).max(50),
      age: yup.number().required().min(0).max(99),
      breed: yup.string().required().min(2).max(50),
      status: yup.string().required().min(2).max(50),
      description: yup.string().required().min(10).max(200),
      image: yup
        .mixed()
        .required('An image is required')
        .test(
          'fileSize',
          'File size is too large',
          (value) => value && value.size <= 5242880 // 5MB file size limit
        ),
    });

    schema
      .validate(values, { abortEarly: false })
      .then((validData) => {
        // Perform backend validation and submit the form
        console.log('Valid form data:', validData);
        // Submit the form to the backend
        setOpen(false)
      })
      .catch((errors) => {
        // Handle validation errors
        console.log('Validation errors:', errors.errors);
      });
  };

  const handleFileChange = (file) => {
    setImageFile(file);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Form.Item
          label="Cat Name"
          name="catname"
          rules={[
            { required: true, message: 'Please enter the cat name' },
            { min: 2, message: 'Cat name must be at least 2 characters' },
            { max: 50, message: 'Cat name cannot exceed 50 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            { required: true, message: 'Please enter the age' },
            { type: 'number', min: 0, max: 99, message: 'Age must be between 0 and 99' },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Breed"
          name="breed"
          rules={[
            { required: true, message: 'Please enter the breed' },
            { min: 2, message: 'Breed must be at least 2 characters' },
            { max: 50, message: 'Breed cannot exceed 50 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            { required: true, message: 'Please enter the status' },
            { min: 2, message: 'Status must be at least 2 characters' },
            { max: 50, message: 'Status cannot exceed 50 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please enter the description' },
            { min: 10, message: 'Description must be at least 10 characters' },
            { max: 200, message: 'Description cannot exceed 200 characters' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            { required: true, message: 'Please upload an image' },
            {
              validator: (_, value) => {
                if (value && value.size <= 5242880) {
                  return Promise.resolve();
                }
                return Promise.reject('File size is too large');
              },
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={(info) => handleFileChange(info.file)}
            accept="image/*"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
