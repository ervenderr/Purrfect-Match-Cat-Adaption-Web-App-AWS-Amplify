import React from 'react'
import { Form, Input, Modal, Select, Button, Checkbox, message } from 'antd';
import * as yup from 'yup';
import DOMPurify from 'dompurify';
import { createRequest } from '../../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';

const { Option } = Select;

const ModalReqestForm = ({setOpen, open, catId}) => {
    const client = generateClient();
    const [form] = Form.useForm();
    const [loadings, setLoadings] = React.useState(false);

    const onFinish = async (values) => {
        setLoadings(true);
        console.log(values);

        try {
            const schema = yup.object().shape({
                firstname: yup.string().required().min(2).max(50),
                lastname: yup.string().required().min(2).max(50),
                email: yup.string().email().required(),
                phone: yup.string().required().length(10, 'Phone number must be exactly 10 digits'),
                message: yup.string().required().min(10).max(200),
                agreement: yup.boolean().oneOf([true], 'Please accept the agreement'),
            });

            await schema.validate(values, { abortEarly: false });

            const sanitizedValues = {
                ...values,
                firstname: DOMPurify.sanitize(values.firstname),
                lastname: DOMPurify.sanitize(values.lastname),
                email: DOMPurify.sanitize(values.email),
                phone: DOMPurify.sanitize(values.phone),
                message: DOMPurify.sanitize(values.message),
            };

            const fullname = `${sanitizedValues.firstname} ${sanitizedValues.lastname}`;

            console.log('catId:', sanitizedValues);

            await client.graphql({
                query: createRequest,
                variables: {
                    input: {
                        catID: catId.id,
                        name: fullname,
                        email: sanitizedValues.email,
                        phone: sanitizedValues.phone,
                        message: sanitizedValues.message,
                        status: 'Pending',
                    },
                },
            })
            message.success('Request submitted successfully');
            setLoadings(false);
            setOpen(false);
            form.resetFields()
            
        } catch (error) {
            console.error("Error submitting request:", error);
            message.error('Error submitting request');
            setLoadings(false);
            setOpen(false);
            form.resetFields()
        }
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="63">+63</Option>
          </Select>
        </Form.Item>
      );
    

  return (
    
    <Modal
      title="Adoption Request Form"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null} 
    >
    
    <div>
      <Form form={form} onFinish={onFinish} layout='vertical'
      initialValues={{
        prefix: '63',
        firstname: 'Bin',
        lastname: 'Baz',
        email: 'bin@email.com',
        phone: '9123123231',
        message: 'I would like to adopt this cat because'
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[
            { required: true, message: 'Please enter your first name' },
            { min: 3, message: 'Cat name must be at least 2 characters' },
            { max: 15, message: 'Cat name cannot exceed 50 characters' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Cat name must contain only letters' },
          ]}
          style={{ width: '100%' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            { required: true, message: 'Please enter your last name' },
            { min: 3, message: 'Last name must be at least 2 characters' },
            { max: 15, message: 'Last name cannot exceed 50 characters' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Last name must contain only letters' },
          ]}
          style={{ width: '100%' }}
        >
            <Input />
        </Form.Item>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
          style={{ width: '100%' }}
        >
          <Input />
        </Form.Item>
        <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          
            {required: true},
            {message: 'Please input your phone number!'},
            { min: 10, message: 'Please enter a valid phone number' },
            { max: 10, message: 'Please enter a valid phone number' },
          
        ]}
        style={{
            width: '100%',
          }}
      >
        <Input
          addonBefore={prefixSelector}
        />
      </Form.Item>
        </div>
        <Form.Item
            tooltip="Why do you want to adopt this cat?"
          label="Message"
          name="message"
          rules={[
            { required: true, message: 'Please enter a message.' },
            { min: 10, message: 'Description must be at least 10 characters' },
            { max: 200, message: 'Description cannot exceed 200 characters' },
            { pattern: /^[A-Za-z\s]+$/, message: 'Description must contain only letters' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="/">agreement</a>
        </Checkbox>
      </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" loading={loadings} >
            Submit
          </Button>
        </Form.Item>

        </Form>
        </div>
    </Modal>
  )
}

export default ModalReqestForm
