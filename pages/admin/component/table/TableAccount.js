import React, { useEffect, useState } from "react";
import { Table, Button, Modal, notification, Divider, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { adminAPI } from "service/admin";

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

const TableAccount = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await adminAPI.gelAllAccount();
        if (users?.statusCode === 200 || users?.statusCode === 201) {
          const formattedUsers = users?.data?.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
            active: user.isActive,
          }));
          setData(formattedUsers);
        }
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: "Không thể tải danh sách người dùng.",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 150,
      render: (active) => <span>{active ? "Đang hoạt động" : "Vô hiệu"}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined className="custom-iconEdit" />}
            onClick={() => handleEdit(record.id)}
          />
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined className="custom-iconDelete" />}
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
    console.log("Edit record:", id);
  };

  const handleDelete = () => {
    setData(data.filter((user) => user.id !== selectedUserId));
    setIsModalVisible(false);

    notification.success({
      message: "Xóa thành công",
      description: "Tài khoản đã được xóa thành công.",
      placement: "bottomRight",
      duration: 2,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <StyledTable
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      )}
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
    </>
  );
};

export default TableAccount;