import React, { useState, useEffect } from "react";
import { request } from "@/config/request";
import { Card, Tag, Typography, Space, Alert, Spin } from "antd";
import styled from "styled-components";
import { CodeOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SubmissionCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
`;

const CodeBlock = styled.pre`
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
  font-family: 'Courier New', Courier, monospace;
`;

const ErrorBlock = styled(CodeBlock)`
  background-color: #fff1f0;
  border-color: #ffa39e;
  color: #cf1322;
`;

const Submissions = ({ problemId }) => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const userId = sessionStorage.getItem("userId");

        if (userId && problemId) {
          const response = await request.get(`/submissions/${userId}/${problemId}`);

          if (response.status === 200) {
            setSubmission(response.data.data);
          } else {
            console.error("Error fetching submission:", response.data.message);
          }
        } else {
          console.error("User ID or Problem ID không tồn tại.");
        }
      } catch (error) {
        console.error("Error fetching submission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [problemId]);

  if (loading) {
    return (
      <SubmissionCard>
        <Card.Meta
          title="Loading Submission"
          description={<Spin size="large" />}
        />
      </SubmissionCard>
    );
  }

  if (!submission) {
    return (
      <SubmissionCard>
        <Alert
          message="No Submission Data"
          description="No submission details are available for this problem."
          type="warning"
        />
      </SubmissionCard>
    );
  }

  const getStatusTag = () => {
    switch (submission.status) {
      case "completed":
        return (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Completed
          </Tag>
        );
      case "pending":
        return (
          <Tag color="warning" icon={<CloseCircleOutlined />}>
            Pending
          </Tag>
        );
      default:
        return <Tag color="default">Unknown Status</Tag>;
    }
  };

  const shouldShowError = () => {
    // Chỉ hiển thị lỗi nếu submission.error không phải là "Unknown error occurred" hoặc chuỗi trống
    return submission.error && submission.error.trim() !== "" && submission.error !== "Unknown error occurred";
  };

  return (
    <SubmissionCard
      title={
        <Space>
          <CodeOutlined />
          <Title level={4} style={{ margin: 0 }}>
            Submission Details
          </Title>
        </Space>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <DetailRow>
          <Text strong>Language</Text>
          <Tag color="processing">{submission.language}</Tag>
        </DetailRow>

        <DetailRow>
          <Text strong>Status</Text>
          {getStatusTag()}
        </DetailRow>

        <div>
          <Text strong>Output</Text>
          <CodeBlock>
            {submission.output || "No output generated"}
          </CodeBlock>
        </div>

        {/* Only render error block if there's a real error */}
        {shouldShowError() && (
          <div>
            <Text strong type="danger">
              Error
            </Text>
            <ErrorBlock>{submission.error}</ErrorBlock>
          </div>
        )}
      </Space>
    </SubmissionCard>
  );
};

export default Submissions;
