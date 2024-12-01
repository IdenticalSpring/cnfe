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
import { useRouter } from "next/router";

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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowKey, setExpandedRowKey] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  const getAllLesson = async (page) => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllLesson(page);
      setData(
        response?.data?.data?.map((item, index) => ({ ...item, key: index }))
      );
      setTotal(response?.data?.totalItems);
      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Unable to get lesson data!",
        placement: "bottomRight",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const getCourses = async () => {
    try {
      const response = await adminAPI.getAllCourse();
      setCourses(response?.data?.map((course) => ({
        id: course?.id,
        name: course?.title,
      })));
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Courses data cannot be taken!",
        placement: "bottomRight",
        duration: 2,
      });
    }
  };

  useEffect(() => {
    getAllLesson(currentPage);
    getCourses();
  }, [currentPage]);

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
          message: "Deleted successfully",
          description: `Successfully delete Lesson`,
          placement: "bottomRight",
          duration: 2,
        });
        setData(data.filter((item) => item.key !== deleteLessonId));
      } else {
        notification.error({
          message: "Deleted failed",
          description: "Can not delete lesson!",
          placement: "bottomRight",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error occurs when deleting the lesson!",
        placement: "bottomRight",
        duration: 2,
      });
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  const getCourseName = (id) => {
    const course = courses.find((course) => course.id === id);
    return course ? course.name : "N/A";
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
      title: "Course Name",
      dataIndex: "courseId",
      key: "courseId",
      width: 150,
      render: (courseId) => getCourseName(courseId),
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

  const handleEdit = async (key) => {
    const lessonToEdit = data?.find((item) => item.key === key);
  
    if (!lessonToEdit) {
      notification.error({
        message: "Error",
        description: "Lesson does not exist!",
        placement: "bottomRight",
      });
      return;
    }
    router.push(`/admin/lessons/${lessonToEdit?.courseId}/${lessonToEdit?.id}`);
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
              total={total}
              current={currentPage}
              pageSize={20}
              showSizeChanger={false}
              onChange={(page) => setCurrentPage(page)}
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
    </>
  );
};

export default TableLesson;
