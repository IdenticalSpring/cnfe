import React, { useEffect, useState } from "react";
import {
  Table,
  notification,
  Skeleton,
  Pagination,
  Divider,
  Button,
  Modal,
} from "antd";
import { adminAPI } from "service/admin";
import styled from "styled-components";
import { useRouter } from "next/router";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonCustom from "components/button/Button";

const TableContainer = styled.div`
  margin: 0 20px;
`;

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

const TableProblem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteProblemId, setDeleteProblemId] = useState(null);

  const router = useRouter();

  const truncateDescription = (description) => {
    if (description.length <= 50) return description;

    let truncated = description.substring(0, 50);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return lastSpaceIndex !== -1
      ? truncated.substring(0, lastSpaceIndex) + " ..."
      : truncated + " ...";
  };

  useEffect(() => {
    const fetchAllProblems = async (page) => {
      setLoading(true);
      try {
        const [response, result] =
          await Promise.all([
            adminAPI.getAllProblemsByPage(page),
            adminAPI.getAllDifficulties(),
          ]);

        if (
          (response?.statusCode === 200 || response?.statusCode === 201) &&
          (result?.statusCode === 200 || result?.statusCode === 201)
        ) {
          const difficulties = result?.data;
          const difficultiesMap = difficulties?.reduce((acc, difficulty) => {
            acc[difficulty.id] = difficulty.name;
            return acc;
          }, {});

          const formattedData = response?.data?.data?.map((problem) => ({
            key: problem?.id,
            title: problem?.title,
            description: problem?.description,
            truncatedDescription: truncateDescription(problem?.description),
            difficulty:
              difficultiesMap[problem?.difficultyId] || "Không xác định",
            courseId: problem?.courseId || "Không xác định",
            topic: problem?.topics?.map(t => t.name).join(", ") || "Không xác định",
            company: problem?.companies?.map(c => c.name).join(", ") || "Không xác định",
            likes: problem?.likes || 0,
            dislikes: problem?.dislikes || 0,
            rating: problem?.rating || 0,
            acceptanceRate: problem?.acceptance_rate || "Không xác định",
          }));
          setData(formattedData);
          setTotal(response?.data?.totalItems);
          setTotalPages(response?.data?.totalPages);
        } else {
          throw new Error("Không thể lấy dữ liệu bài toán.");
        }
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: "Không thể lấy dữ liệu bài toán.",
          placement: "bottomRight",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAllProblems(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDescriptionClick = (key) => {
    const newExpandedKeys = expandedRowKeys.includes(key)
      ? expandedRowKeys.filter((k) => k !== key)
      : [...expandedRowKeys, key];
    setExpandedRowKeys(newExpandedKeys);
  };

  const handleEdit = (key) => {
    const problemToEdit = data.find((item) => item.key === key);
    if (problemToEdit) {
      router.push(`/admin/problem/${problemToEdit.key}`);
    } else {
      notification.error({
        message: "Lỗi",
        description: "Bài toán không tồn tại.",
        placement: "bottomRight",
      });
    }
  };

  const handleDelete = (id) => {
    setDeleteProblemId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await adminAPI.deleteProblem(deleteProblemId);
      if (response?.statusCode === 200) {
        notification.success({
          message: "Xóa thành công",
          description: `Xóa thành công problem`,
          placement: "bottomRight",
          duration: 2,
        });
        setData(data.filter((item) => item.key !== deleteProblemId));
      } else {
        notification.error({
          message: "Lỗi",
          description: "Không thể xóa problem",
          placement: "bottomRight",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã có lỗi xảy ra khi xóa bài toán.",
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
      width: "150px",
    },
    {
      title: "Description",
      dataIndex: "truncatedDescription",
      key: "description",
      render: (text, record) => (
        <span
          onClick={() => handleDescriptionClick(record.key)}
          style={{ cursor: "pointer" }}
        >
          {expandedRowKeys.includes(record.key) ? record.description : text}
        </span>
      ),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: "100px",
    },
    {
      title: "Course ID",
      dataIndex: "courseId",
      key: "courseId",
      width: "150px",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      width: "150px",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: "150px",
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      width: "100px",
    },
    {
      title: "Dislikes",
      dataIndex: "dislikes",
      key: "dislikes",
      width: "100px",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "100px",
    },
    {
      title: "Acceptance Rate",
      dataIndex: "acceptanceRate",
      key: "acceptanceRate",
      width: "100px",
    },
    {
      title: "Action",
      key: "action",
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
      width: "150px",
    },
  ];

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <StyledTable columns={columns} dataSource={data} pagination={false} />
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
        title={<ModalTitle>Xóa thông tin</ModalTitle>}
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={null}
      >
        <ModalContent>
          <ConfirmText>Chắc chưa?</ConfirmText>
          <WarningText>
            Sau khi xóa đi, bạn sẽ không thể khôi phục lại. Chắc chưa?
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

export default TableProblem;