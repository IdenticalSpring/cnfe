import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Skeleton,
  Modal,
  notification,
  Pagination,
  Divider,
} from "antd";
import styled from "styled-components";
import ButtonCustom from "components/button/Button";
import { adminAPI } from "service/admin";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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

const TableChapter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const getAllChapter = async (page) => {
      setLoading(true);
      try {
        const response = await adminAPI.getAllChapter(page);
        if (response.statusCode === 200 || response.statusCode === 201) {
          const formattedData = response?.data?.data?.map((chapter) => ({
            id: chapter?.id,
            title: chapter?.title,
            description: chapter?.description || "Không xác định",
            truncatedDescription: truncateDescription(
              chapter?.description || ""
            ),
            courseId: chapter?.courseId || 0,
            order: chapter?.order || 0,
          }));
          setData(formattedData);

          setTotal(response?.data?.totalItems);
          if (response?.data?.totalPages) {
            setTotalPages(response?.data?.totalPages);
          }
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to load chapter. Please try again later.",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    getAllChapter(currentPage);
  }, [currentPage]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Course ID",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
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
    },
  ];

  const truncateDescription = (description) => {
    if (description.length <= 50) return description;

    let truncated = description.substring(0, 50);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return lastSpaceIndex !== -1
      ? truncated.substring(0, lastSpaceIndex) + " ..."
      : truncated + " ...";
  };

  const handleEdit = (record) => {
    router.push(`/admin/chapters/${record.id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (record) => {
      setDeleteRecord(record);
      console.log("Delete:", record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    console.log(deleteRecord?.id);
    if (!deleteRecord?.id) {
      notification.error({
        message: "Error",
        description: "Record ID is missing. Cannot delete.",
        placement: "bottomRight",
        duration: 2,
      });
      setIsDeleteModalVisible(false);
      return;
    }
    try {
      const response = await adminAPI.deleteChapter(deleteRecord.id);
      if (response?.statusCode == 200 || response?.statusCode === 201) {
        notification.success({
          message: "Success",
          description: `The chapter has been deleted successfully.`,
          placement: "bottomRight",
          duration: 2,
        });
        setData((prevData) =>
          prevData.filter((item) => item.id !== deleteRecord.id)
        );
      }
    } catch (error) {
      console.log("🚀 ~ confirmDelete ~ error:", error);
      notification.error({
        message: "Error",
        description: `Failed to delete the chapter. Please try again later.`,
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
        <>
          <StyledTable
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
          />
          <PaginationContainer>
            <Pagination
              current={currentPage}
              total={total}
              pageSize={20}
              onChange={handlePageChange}
              showSizeChanger={false}
              pageSizeOptions={["20"]}
              totalPages={totalPages}
            />
          </PaginationContainer>
        </>
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

export default TableChapter;
