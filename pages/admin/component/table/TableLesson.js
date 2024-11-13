import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Modal,
  Skeleton,
  Table,
  Pagination,
  notification,
} from "antd";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { adminAPI } from "service/admin";
import ButtonCustom from "components/button/Button";

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const TableLesson = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState(null);

  const getAllLesson = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllLesson();
      setData(response?.data?.map((item, index) => ({ ...item, key: index })));
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy dữ liệu lesson",
        placement: "bottomRight",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLesson();
  }, []);

  const toggleExpandRow = (record) => {
    setExpandedRowKey((prevKey) =>
      prevKey === record.key ? null : record.key
    );
  };

  const truncateDescription = (description, isExpanded) => {
    if (isExpanded || description.length <= 100) return description;

    let truncated = description.substring(0, 100);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return lastSpaceIndex !== -1
      ? truncated.substring(0, lastSpaceIndex) + " ..."
      : truncated + " ...";
  };

  const handleDelete = (id) => {
    setDeleteLessonId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await adminAPI.deleteLesson(deleteLessonId);
      if (response?.statusCode === 200) {
        notification.success({
          message: "Xóa thành công",
          description: `Xóa thành công lesson`,
          placement: "bottomRight",
          duration: 2,
        });
        setData(data.filter((item) => item.key !== deleteLessonId));
      } else {
        notification.error({
          message: "Lỗi",
          description: "Không thể xóa lesson",
          placement: "bottomRight",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã có lỗi xảy ra khi xóa bài học.",
        placement: "bottomRight",
        duration: 2,
      });
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "Chapter ID",
      dataIndex: "chapterId",
      key: "chapterId",
      width: 100,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: 300,
      render: (text, record) => (
        <span
          onClick={() => toggleExpandRow(record)}
          style={{ cursor: "pointer" }}
        >
          {truncateDescription(text, expandedRowKey === record.key)}
        </span>
      ),
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      width: 50,
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined className="custom-iconEdit" />}
            onClick={() => handleEdit(record?.key)}
          />
          <Divider type="vertical" />
          <Button
            type="link"
            icon={<DeleteOutlined className="custom-iconDelete" />}
            onClick={() => handleDelete(record?.key)}
          />
        </span>
      ),
    },
  ];

  const handleEdit = (key) => {
    console.log("Edit", key);
  };

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <StyledTable columns={columns} dataSource={data} pagination={false} />
          <PaginationContainer>
            <Pagination
              current={1}
              total={data.length}
              pageSize={10}
              showSizeChanger={false}
            />
          </PaginationContainer>
        </>
      )}
      <Modal
        title={<ModalTitle>Xóa bài học</ModalTitle>}
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <ModalContent>
          <ConfirmText>
            Bạn có chắc chắn muốn xóa bài học này không?
          </ConfirmText>
          <WarningText>
            Sau khi xóa, bạn sẽ không thể khôi phục lại bài học này.
          </WarningText>
        </ModalContent>
        <ButtonContainer>
          <ButtonCustom
            onClick={confirmDelete}
            bgColor="#FF4D4F"
            hoverColor="#FF7875"
          >
            Đồng ý
          </ButtonCustom>
          <ButtonCustom
            onClick={() => setIsDeleteModalVisible(false)}
            bgColor="#4CAF50"
            hoverColor="#66BB6A"
          >
            Hủy
          </ButtonCustom>
        </ButtonContainer>
      </Modal>
    </>
  );
};

export default TableLesson;
