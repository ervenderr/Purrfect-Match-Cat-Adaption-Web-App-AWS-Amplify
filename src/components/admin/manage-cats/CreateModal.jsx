import React, { useState } from 'react';
import { Modal } from 'antd';
import CreateForm from './CreateForm';

const CreateModal = ({ setOpen, open }) => {
  return (
    <Modal
      title="Create a new cat"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null} 
    >
      <CreateForm />
    </Modal>
  );
};

export default CreateModal;
