import React, { useState } from 'react';
import { Modal } from 'antd';
import UpdateForm from './UpdateForm';

const UpdateModal = ({ isModalOpen, setIsModalOpen }) => {


    return (
        <Modal
        title="Update cat"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        >
        {/* <UpdateForm setOpen={setIsModalOpen} fetchCats={fetchCats} /> */}
        </Modal>
    );
};

export default UpdateModal;
