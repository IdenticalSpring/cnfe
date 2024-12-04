import React, { useEffect, useState } from "react";
import { Table, Button, Divider, Modal, notification, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { adminAPI } from "service/admin";
import { useRouter } from "next/router";
import ButtonCustom from "components/button/Button";
import Image from "next/image";

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

const TableCourse = ({ searchTerm }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState(new Set());
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAllCourses = async () => {
      setLoading(true);
      try {
        let allCourses = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const response = await adminAPI.getAllCourseByPage(currentPage);

          if (response?.statusCode === 200 || response?.statusCode === 201) {
            totalPages = response?.data?.totalPages || 1;
            const formattedData = response?.data?.data?.map(
              (course, index) => ({
                key: `${currentPage}-${index + 1}`,
                id: course?.id,
                title: course?.title,
                description: course?.description,
                img: course?.imageUrl,
                price: formatCurrencyVND(course?.price) || 0,
                status: course?.status,
              })
            );
            allCourses = [...allCourses, ...formattedData];
          } else {
            throw new Error("Failed to get all courses");
          }
          currentPage += 1;
        }
        setData(allCourses);
        setFilteredData(allCourses);
      } catch (error) {
        notification.error({
          message: "Error getting all courses",
          description: "Failed to load courses!",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  const formatCurrencyVND = (amount) => {
    const formattedAmount = new Intl.NumberFormat("vi-VN").format(amount);
    return `${formattedAmount} VND`;
  };

  useEffect(() => {
    const filtered = data.filter((course) =>
      course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const truncateDescription = (description) => {
    if (description.length <= 50) return description;

    let truncated = description.substring(0, 50);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return lastSpaceIndex !== -1
      ? truncated.substring(0, lastSpaceIndex) + " ..."
      : truncated + " ...";
  };

  const toggleExpand = (key) => {
    const newExpandedKeys = new Set(expandedKeys);
    if (newExpandedKeys.has(key)) {
      newExpandedKeys.delete(key);
    } else {
      newExpandedKeys.add(key);
    }
    setExpandedKeys(newExpandedKeys);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => {
        const isExpanded = expandedKeys.has(record.key);
        const displayText = isExpanded ? text : truncateDescription(text);

        return (
          <span
            onClick={() => toggleExpand(record.key)}
            style={{ cursor: "pointer", color: isExpanded ? "blue" : "black" }}
          >
            {displayText}
          </span>
        );
      },
      width: 500,
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (text, record) => (
        <img src={record.img} alt={record.title} width="50" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
    },
    {
      title: "Actions",
      key: "action",
      width: 150,
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
            onClick={() => showDeleteModal(record?.key)}
          />
        </span>
      ),
    },
  ];

  const handleEdit = (key) => {
    const courseToEdit = data.find((item) => item.key === key);
    if (courseToEdit) {
      router.push(`/admin/course/${courseToEdit.id}`);
    } else {
      notification.error({
        message: "Error",
        description: "The course does not exist!",
        placement: "bottomRight",
      });
    }
  };

  const showDeleteModal = (key) => {
    setSelectedKey(key);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const courseToDelete = data.find((item) => item.key === selectedKey);

      if (!courseToDelete) {
        notification.error({
          message: "Delete failed",
          description: "No course found to delete.",
          placement: "bottomRight",
          duration: 2,
        });
        return;
      }

      const response = await adminAPI.deleteCourse(courseToDelete?.id);

      if (response?.statusCode) {
        setData((prevData) => {
          const updatedData = prevData.filter(
            (item) => item.key !== selectedKey
          );
          return updatedData;
        });
        notification.success({
          message: "Delete successful",
          description: "The course has been successfully erased.",
          placement: "bottomRight",
          duration: 2,
        });
      } else {
        notification.error({
          message: "Delete failed",
          description: "Cannot delete the course.",
          placement: "bottomRight",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error deleting the course",
        description: "An error occurred when calling the API.",
        placement: "bottomRight",
        duration: 2,
      });
      console.error(error);
    } finally {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <StyledTable columns={columns} dataSource={filteredData} />
      )}
      <Modal
        title={<ModalTitle>Delete Confirmation</ModalTitle>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <ModalContent>
          <ConfirmText>Are you sure you want to delete this course?</ConfirmText>
          <WarningText>
            Once deleted, you will not be able to recover this course. Are you
            certain?
          </WarningText>
        </ModalContent>
        <ButtonContainer>
          <ButtonCustom
            onClick={handleDelete}
            bgColor="#FF4D4F"
            hoverColor="#FF7875"
          >
            Yes, Delete
          </ButtonCustom>
          <ButtonCustom
            onClick={() => setIsModalVisible(false)}
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

export default TableCourse;
