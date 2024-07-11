import { Form, Input, InputNumber, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { createCat } from '../../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { useState, useEffect } from 'react';
import { onCreateCat } from '../../../graphql/subscriptions';
import { uploadData } from 'aws-amplify/storage';


const CreateForm = ({ setOpen, fetchCats }) => {
  const [form] = Form.useForm();
  const client = generateClient();
  const [loadings, setLoadings] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    const createSub = client.graphql({ query: onCreateCat }).subscribe({
      next: ({ data }) => {
        console.log('Create Subscription data:', data);
        fetchCats();
      },
      error: (error) => console.warn('Create Subscription error:', error),
    });
    return () => {
      createSub.unsubscribe();
    };
  }, [client, fetchCats]);
  

  const props = {
    beforeUpload: (file) => {
      const isJPEG = file.type === 'image/jpeg';
      if (!isJPEG) {
        message.error(`${file.name} is not a JPEG file`);
      } else {
        setSelectedFile(file);
      }
      return isJPEG || Upload.LIST_IGNORE;
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
        breed: yup.string().required(),
        status: yup.string().required(),
        description: yup.string().required().min(10).max(200),
        image: yup
          .mixed()
          .required('An image is required')
      });

      await schema.validate(values, { abortEarly: false });

      // submit the cat image to S3
      const catImage = selectedFile;
      const result = await uploadData({
        path: `public/cats/${catImage.uid}.jpeg`, 
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
            breed: values.breed,
            status: values.status,
            description: values.description,
            image: values.image.file.uid,
          }
        }
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
          ]}
        >
          <Input />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              { required: true, message: 'Please enter the age' },
              { type: 'number', min: 1, max: 99, message: 'Age must be between 1 and 99' },
            ]}
          >
            <InputNumber type="number" />
          </Form.Item>
          <Form.Item
            label="Breed"
            name="breed"
            rules={[
              { required: true, message: 'Please enter the breed' },
            ]}
            style={{ width: '40%' }}
          >
            <Select
              showSearch
              placeholder="Select breed"
              optionFilterProp="label"
              options={[
                {
                  value: 'Orens',
                  label: 'Orens',
                },
                {
                  value: 'Persian',
                  label: 'Persian',
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
            style={{ width: '30%' }}
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
