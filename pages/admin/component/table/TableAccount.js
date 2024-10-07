import React, { useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { Divider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Delete, DeleteOutline } from '@mui/icons-material';

// Styled component cho Table
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--background-hover-color);
    color: #fff;
    font-weight: bold;
    text-align: center;
  }

  .ant-table-tbody > tr > td {
    text-align: center;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f6f6f6;
  }

  .ant-pagination-item-active {
    background-color: var(--background-hover-color);
    border-color: var(--background-hover-color);
  }

  .ant-pagination-item-active a {
    color: white;
  }

  .ant-table-tbody > tr {
    &:nth-child(odd) {
      background-color: #f0f0f0; /* Màu xám cho hàng lẻ */
    }
    
    &:nth-child(even) {
      background-color: #ffffff; /* Màu trắng cho hàng chẵn */
    }
  }
    
  .ant-menu-item:hover {
    background-color: transparent !important;
    color: inherit !important;
  }

  .custom-iconEdit {
    color: green;
  }

  .custom-iconDelete {
    color: red;
  }
`;

const TableContainer = styled.div`
  margin-right: 20px;
`;

const initialData = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', phone: '0112233445' },
];

const TableAccount = () => {
  const [dataSource, setDataSource] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button 
            type="link" 
            icon={<EditOutlined className='custom-iconEdit' />}
            onClick={() => handleEdit(record.id)}
          />

          <Divider type="vertical" />

          <Button 
            type="link" 
            icon={<DeleteOutlined className='custom-iconDelete'/>}
            onClick={() => showDeleteModal(record.id)}
          />
        </span>
      ),
    },
  ];

  const showDeleteModal = (id) => {
    setSelectedUserId(id);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setDataSource(dataSource.filter(user => user.id !== selectedUserId));
    setIsModalVisible(false);

    // Hiển thị toast thành công
    notification.success({
      message: 'Xóa thành công',
      description: 'Tài khoản đã được xóa thành công!',
      placement: 'bottomRight',
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (id) => {
    // Logic để chỉnh sửa tài khoản có id = id
    console.log(`Chỉnh sửa tài khoản với ID: ${id}`);
  };

  return (
    <TableContainer>
      <StyledTable
        dataSource={dataSource}
        columns={columns}
        pagination={true}
        rowKey="id"
      />

      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
      </Modal>
    </TableContainer>
  );
};

export default TableAccount;
