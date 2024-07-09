import React, { useState } from 'react';
import { Modal } from 'antd';
import CreateForm from './CreateForm';
import { generateClient } from 'aws-amplify/api';

const CreateModal = ({ setOpen, open, fetchCats }) => {

  return (
    <Modal
      title="Create a new cat"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null} 
    >
      <CreateForm setOpen={setOpen} fetchCats={fetchCats} />
    </Modal>
  );
};

export default CreateModal;
