import { Form, Input, InputNumber, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { createCat } from '../../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useState, useEffect } from 'react';
import { onCreateCat } from '../../../graphql/subscriptions';
import { uploadData } from 'aws-amplify/storage';
import DOMPurify from 'dompurify';


const CreateForm = ({ setOpen, fetchCats }) => {
  const [form] = Form.useForm();
  const client = generateClient();
  const [loadings, setLoadings] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const props = {
    beforeUpload: (file) => {
      const isJPEG = file.type === 'image/jpeg';
      if (!isJPEG) {
        message.error(`${file.name} is not a JPEG file`);
      } else {
        setSelectedFile(file);
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }

      return isJPEG || Upload.LIST_IGNORE && isLt2M ;
    },
    
    onChange: (info) => {
      console.log(info.fileList);
    },
  };


  const onFinish = async (values) => {
    setLoadings(true);
    try {
      // Perform validation using yup
      const schema = yup.object().shape({
        catname: yup.string().required().min(2).max(50),
        age: yup.number().required().min(1).max(99),
        gender: yup.string().required(),
        breed: yup.string().required(),
        status: yup.string().required(),
        description: yup.string().required().min(10).max(200),
        image: yup
          .mixed()
          .required('An image is required')
      });

      await schema.validate(values, { abortEarly: false });

      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
      
      const sanitizedValues = {
        ...values,
        catname: capitalizeFirstLetter(DOMPurify.sanitize(values.catname)),
        description: capitalizeFirstLetter(DOMPurify.sanitize(values.description)),
      };
      

      // submit the cat image to S3
      const catImage = selectedFile;
      const result = await uploadData({
        path: `public/cats/${catImage.uid}.jpeg`, 
        // path: ({identityId}) => `protected/${identityId}/cats/${catImage.uid}.jpeg`,
        data: catImage,
      }).result;
      console.log('Uploaded file: ', result);

      // Submit the form to the backend
      await client.graphql({
        query: createCat,
        variables: {
          input: {
            name: values.catname,
            age: values.age,
            gender: values.gender,
            breed: values.breed,
            status: values.status,
            description: values.description,
            image: values.image.file.uid,
          }},
        authMode: 'userPool'
      });
      fetchCats();

      setTimeout(() => {
        setLoadings(false);
        setOpen(false);
        form.resetFields()
        console.log('Valid form data:', values.image.file.uid);
        message.success('Cat created successfully');
      }, 2000);

    } catch (errors) {
      // Handle validation errors
      console.log('Validation errors:', errors.errors);
    }
  };
  
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout='vertical'
      initialValues={{
        ["status"]: "Available",
      }}
      >
        <Form.Item
          label="Cat Name"
          name="catname"
          rules={[
            { required: true, message: 'Please enter the cat name' },
            { min: 2, message: 'Cat name must be at least 2 characters' },
            { max: 50, message: 'Cat name cannot exceed 50 characters' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Cat name must contain only letters' },
          ]}
        >
          <Input />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: 'Please enter the age' },
              { type: 'number', min: 1, max: 99, message: 'Age must be between 1 and 99' },
            ]}
            style={{ width: '100%' }}
          >
            <InputNumber type="number" style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              { required: true, message: 'Please enter a gender' },
            ]}
            style={{ width: '100%' }}
          >
            <Select
              showSearch
              placeholder="Select gender"
              optionFilterProp="label"
              options={[
                {
                  value: 'Male',
                  label: 'Male',
                },
                {
                  value: 'Female',
                  label: 'Female',
                },
              ]}
            />
          </Form.Item>
          
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
          
          <Form.Item
            label="Breed"
            name="breed"
            rules={[
              { required: true, message: 'Please enter the breed' },
            ]}
            style={{ width: '100%' }}
          >
            <Select
              showSearch
              placeholder="Select breed"
              optionFilterProp="label"
              options={[
                {
                  value: 'British Shorthair',
                  label: 'British Shorthair',
                },
                {
                  value: 'Persian',
                  label: 'Persian',
                },
                {
                  value: 'American Bobtail',
                  label: 'American Bobtail',
                },
                {
                  value: 'American Shorthair',
                  label: 'American Shorthair',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            placeholder="Select status"
            rules={[
              { required: true, message: 'Please enter the status' },
            ]}
            style={{ width: '100%' }}
          >
            <Select
              style={{
                width: '100%',
              }}
              options={[
                {
                  value: 'Coming Soon',
                  label: 'Coming Soon',
                },
                {
                  value: 'Available',
                  label: 'Available',
                },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please enter the description' },
            { min: 10, message: 'Description must be at least 10 characters' },
            { max: 200, message: 'Description cannot exceed 200 characters' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Description must contain only letters' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          valuePropName="image"
          label="Image"
          name="image"
          rules={[
            { required: true, message: 'Please upload an image' },
            {
              validator: (_, value) => {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject('File size is too large');
              },
            },
          ]}
        >
          <Upload {...props} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={loadings} >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
