import React, { useState } from 'react';
import { Table, Button, Divider, Modal, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-right: 20px;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  img {
    border-radius: 5px;
  }

  /* Đổi màu xen kẽ cho các hàng */
  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f9f9f9; /* Màu cho hàng lẻ */
  }
  
  .ant-table-tbody > tr:nth-child(even) {
    background-color: #ffffff; /* Màu cho hàng chẵn */
  }
  
  .custom-iconEdit {
    color: green;
  }

  .custom-iconDelete {
    color: red;
  }
`;

const TableCourse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [data, setData] = useState([
    {
      key: '1',
      title: 'Title 1',
      description: 'This is the description for item 1',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-10-05',
      updateAt: '2024-10-06',
    },
    {
      key: '2',
      title: 'Title 2',
      description: 'This is the description for item 2',
      img: 'https://via.placeholder.com/50',
      createAt: '2024-09-25',
      updateAt: '2024-09-26',
    },
  ]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) => <img src={record.img} alt={record.title} width="50" />,
    },
    {
      title: 'Created At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined className='custom-iconEdit' />}
            onClick={() => handleEdit(record.key)}
          />
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined className='custom-iconDelete' />}
            onClick={() => showDeleteModal(record.key)}
          />
        </span>
      ),
    },
  ];
  
  const handleEdit = (key) => {
    console.log('Edit record:', key);
  };
  
  const showDeleteModal = (key) => {
    setSelectedKey(key);  // Lưu key của hàng muốn xóa
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setData((prevData) => prevData.filter((item) => item.key !== selectedKey)); // Lọc theo key
    setIsModalVisible(false);

    // Hiển thị thông báo sau khi xóa
    notification.success({
      message: 'Xóa thành công',
      description: 'Tài khoản đã được xóa thành công.',
      placement: 'bottomRight',
      duration: 2, 
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TableContainer>
      <StyledTable columns={columns} dataSource={data} />
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

export default TableCourse;
