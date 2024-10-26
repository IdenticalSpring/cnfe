import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { Divider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Styled component cho Table
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--orange-color);
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

  .ant-table-tbody > tr {
    &:nth-child(odd) {
      background-color: #f0f0f0;
    }
    
    &:nth-child(even) {
      background-color: #ffffff;
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
      role: "User",
      isActive: false,
    },
    {
      id: 4,
      name: "Phạm Thị D",
      username: "userD",
      email: "userD@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      username: "userE",
      email: "userE@example.com",
      role: "Admin",
      isActive: false,
    },
    {
      id: 6,
      name: "Ngô Thị F",
      username: "userF",
      email: "userF@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 7,
      name: "Đỗ Văn G",
      username: "userG",
      email: "userG@example.com",
      role: "User",
      isActive: false,
    },
    {
      id: 8,
      name: "Trịnh Thị H",
      username: "userH",
      email: "userH@example.com",
      role: "Admin",
      isActive: true,
    },
    {
      id: 9,
      name: "Vũ Văn I",
      username: "userI",
      email: "userI@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 10,
      name: "Nguyễn Thị J",
      username: "userJ",
      email: "userJ@example.com",
      role: "User",
      isActive: false,
    },
    {
      id: 11,
      name: "Lê Văn K",
      username: "userK",
      email: "userK@example.com",
      role: "Admin",
      isActive: true,
    },
    {
      id: 12,
      name: "Trần Thị L",
      username: "userL",
      email: "userL@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 13,
      name: "Nguyễn Văn M",
      username: "userM",
      email: "userM@example.com",
      role: "User",
      isActive: false,
    },
    {
      id: 14,
      name: "Phạm Thị N",
      username: "userN",
      email: "userN@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 15,
      name: "Hoàng Văn O",
      username: "userO",
      email: "userO@example.com",
      role: "Admin",
      isActive: false,
    },
    {
      id: 16,
      name: "Ngô Thị P",
      username: "userP",
      email: "userP@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 17,
      name: "Đỗ Văn Q",
      username: "userQ",
      email: "userQ@example.com",
      role: "User",
      isActive: false,
    },
    {
      id: 18,
      name: "Trịnh Thị R",
      username: "userR",
      email: "userR@example.com",
      role: "Admin",
      isActive: true,
    },
    {
      id: 19,
      name: "Vũ Văn S",
      username: "userS",
      email: "userS@example.com",
      role: "User",
      isActive: true,
    },
    {
      id: 20,
      name: "Nguyễn Thị T",
      username: "userT",
      email: "userT@example.com",
      role: "User",
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150, // Đặt chiều rộng cố định cho cột
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: 100,
      render: (active) => (
        <span>{active ? 'Đang hoạt động' : 'Vô hiệu'}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
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

  const handleEdit = (id) => {
    console.log('Edit record:', id);
  };

  const handleDelete = () => {
    setData(data.filter(user => user.id !== selectedUserId));
    setIsModalVisible(false);

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
      <StyledTable
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
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
