import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { Divider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { adminAPI } from 'services/admin';

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

  // Khởi tạo notification component
  const [api, contextHolder] = notification.useNotification();

  // Dữ liệu giả để hiển thị trong bảng
  const fakeData = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      username: "userA",
      email: "userA@example.com",
      role: "Admin",
      isActive: true,
    },
    {
      id: 2,
      name: "Trần Thị B",
      username: "userB",
      email: "userB@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 3,
      name: "Lê Văn C",
      username: "userC",
      email: "userC@example.com",
      role: "Moderator",
      isActive: false,
    },
  ];

  useEffect(() => {    
    const users = fakeData.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      active: user.isActive,
    }));
    setData(users);
  }, []);

  // const getAllData = async () => {
  //   try {
  //     const rq = await adminAPI.getAllUsers();
  //     console.log(rq);
      
  //     if (rq.statusCode === 200) {
  //       const users = rq.data.map(user => ({
  //         id: user.id,
  //         name: user.name,
  //         username: user.username,
  //         email: user.email,
  //         role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
  //         active: user.isActive,
  //       }));
  //       setData(users);
  //     }
  //     else {
  //       console.error("lỗi");
  //     }
  //   }
  //   catch {
  //     console.error("không thể call api");
  //   }
  // }

  // useEffect(() => {
  //   getAllData();
  // }, []);

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

    // Hiển thị notification sau khi xóa thành công
    api.open({
      message: 'Xóa thành công',
      description: 'Tài khoản đã được xóa thành công!',
      placement: 'bottomRight',
      duration: 3, // Hiển thị trong 3 giây
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
