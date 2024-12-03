import React, { useEffect, useState } from "react";
import { Table, Button, Divider, Skeleton, Modal, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { adminAPI } from "service/admin";
import ButtonCustom from "components/button/Button";
import { useRouter } from "next/router";

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--orange-color);
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  img {
    border-radius: 5px;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
  }
  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f0f0f0;
  }
  .ant-table-tbody > tr:nth-child(even) {
    background-color: #ffffff;
  }
  .custom-iconEdit {
    color: green;
  }
  .custom-iconDelete {
    color: red;
  }
`;

const ModalTitle = styled.div`
  text-align: center;
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const ConfirmText = styled.p`
  font-size: 16px;
  color: var(--text-secondary-color);
  margin-bottom: 8px;
`;

const WarningText = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const TableCompany = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const getAllTopic = async () => {
      try {
        const response = await adminAPI.getAllCompany();
        setData(response?.data);
        setLoading(false);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load company. Please try again later.",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    getAllTopic();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined className="custom-iconEdit" />}
            onClick={() => handleEdit(record)}
          />
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined className="custom-iconDelete" />}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
      width: 150,
    },
  ];

  const handleEdit = (record) => {
    router.push(`/admin/companies/${record.id}`);
  };

  const handleDelete = (record) => {
    setDeleteRecord(record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await adminAPI.deleteCompany(deleteRecord.id);
      if (response?.statusCode == 200 || response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: `The company has been deleted successfully.`,
          placement: "bottomRight",
          duration: 2,
        });
        setData((prevData) =>
          prevData.filter((item) => item.id !== deleteRecord.id)
        );
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Failed to delete the company. Please try again later.`,
        placement: "bottomRight",
        duration: 2,
      });
    } finally {
      setIsDeleteModalVisible(false);
      setDeleteRecord(null);
    }
  };

  return (
    <div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <StyledTable columns={columns} dataSource={data} rowKey="id" />
      )}
      <Modal
        title={<ModalTitle>Delete information</ModalTitle>}
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <ModalContent>
          <ConfirmText>Are you sure?</ConfirmText>
          <WarningText>
            Once deleted, you will not be able to recover. Are you sure?
          </WarningText>
        </ModalContent>
        <ButtonContainer>
          <ButtonCustom
            onClick={confirmDelete}
            bgColor="#FF4D4F"
            hoverColor="#FF7875"
          >
            Yes, Delete
          </ButtonCustom>
          <ButtonCustom
            onClick={() => setIsDeleteModalVisible(false)}
            bgColor="#4CAF50"
            hoverColor="#66BB6A"
          >
            Cancel
          </ButtonCustom>
        </ButtonContainer>
      </Modal>
    </div>
  );
};

export default TableCompany;
