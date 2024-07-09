import { useState, useEffect, useMemo } from "react";
import { Modal } from "antd";
import UpdateForm from "./UpdateForm";

const UpdateModal = ({ isModalOpen, setIsModalOpen, catData, fetchCats }) => {
  return (
    <Modal
      title={"Update cat"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <UpdateForm setOpen={setIsModalOpen} catData={catData} fetchCats={fetchCats} />
    </Modal>
  );
};

export default UpdateModal;
