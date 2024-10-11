import React from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';

// Styled component cho nội dung của modal
const ModalContent = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  color: #FF9900;
  margin-bottom: 16px;
`;

const ModalDeleteAcc = ({ visible, onOk, onCancel, title, content, okText, cancelText }) => {
  return (
    <Modal
      title={<ModalTitle>{title}</ModalTitle>}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText || 'OK'}
      cancelText={cancelText || 'Cancel'}
    >
      <ModalContent>
        {content}
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteAcc;
