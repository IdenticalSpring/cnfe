import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { Divider } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { adminAPI } from 'service/admin';

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

  // Khởi tạo notification component
  const [api, contextHolder] = notification.useNotification();

  const getAllData = async () => {
    try {
      const response = await adminAPI.getAllUsers();
      console.log("API response:", response);

      // Kiểm tra xem response.data.data có phải là mảng không
      if (response && response.data && Array.isArray(response.data.data)) {
        const users = response.data.data.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
          active: user.isActive ? 'Đang hoạt động' : 'Vô hiệu',
        }));
        setData(users);
      } else {
        console.error("Invalid data structure:", response);
        api.error({
          message: 'Lỗi dữ liệu',
          description: 'Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      console.error("API call failed:", error);
      api.error({
        message: 'Lỗi kết nối',
        description: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
      });
    }
  };


  // Gọi API lấy dữ liệu khi component mount
  useEffect(() => {
    getAllData();
  }, []);

  // Log dữ liệu khi dữ liệu được cập nhật
  useEffect(() => {
    console.log("Data to render:", data);
  }, [data]);

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
        <span>{active}</span>
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
