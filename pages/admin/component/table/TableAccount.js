import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { Divider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
// import {adminAPI} from 'service/admin'; // Cmt lại hàm gọi API

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
      background-color: #ffffff; /* Màu xám cho hàng lẻ */
    }
    
    &:nth-child(even) {
      background-color: #f0f0f0; /* Màu trắng cho hàng chẵn */
    }
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

const TableAccount = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  // const getAllData = async () => {
  //   try {
  //     const rq = await adminAPI.getAllUsers();
      
  //     if (rq && rq.statusCode === 200) {
  //       const users = rq.data.map(user => ({
  //         id: user.id,
  //         name: user.name,
  //         username: user.username,
  //         email: user.email,
  //         role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
  //         active: user.isActive ? 'Đang hoạt động' : 'Vô hiệu',
  //       }));
  //       setData(users);
  //     } else {
  //       console.error("Lỗi trong quá trình lấy dữ liệu");
  //     }
  //   } catch (error) {
  //     console.error("Không thể gọi API:", error);
  //   }
  // };
  
  // Dữ liệu giả (fake data)
  const fakeData = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      username: 'nguyenvana',
      email: 'nguyenvana@example.com',
      role: 'Admin',
      active: 'Đang hoạt động',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      username: 'tranthib',
      email: 'tranthib@example.com',
      role: 'User',
      active: 'Vô hiệu',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      username: 'levanc',
      email: 'levanc@example.com',
      role: 'Admin',
      active: 'Đang hoạt động',
    },
  ];

  useEffect(() => {
    // getAllData(); // Gọi API bị comment lại
    setData(fakeData); // Dùng data giả
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <span>{active ? 'Đang hoạt động' : 'Vô hiệu'}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined className='custom-iconEdit' />}
            // onClick={() => handleEdit(record.id)}
          />
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined className='custom-iconDelete' />}
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
    setData(data.filter(user => user.id !== selectedUserId));
    setIsModalVisible(false);

    api.open({
      message: 'Xóa thành công',
      description: 'Tài khoản đã được xóa thành công!',
      placement: 'bottomRight',
      duration: 3,
      pauseOnHover: true,
      style: {
        position: 'relative',
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TableContainer>
      {contextHolder}
      <StyledTable
        dataSource={data}
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