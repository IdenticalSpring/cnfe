import React, { useState, useEffect } from "react";
import { userAPI } from "service/user";
import { Card, Tag, Typography, Space, Alert, Spin, Button } from "antd";
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

const Submissions = ({ problemId, onLoadSubmissionCode }) => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const userId = sessionStorage.getItem("userId");

        if (userId && problemId) {
          const response = await userAPI.getSubmissionByUserAndProblem(userId, problemId);
          const submissionData = response.data;

          if (submissionData) {
            setSubmission(submissionData);
            onLoadSubmissionCode?.({
              code: submissionData.code,
              language: submissionData.language
            });
          } else {
            setFetchError("No submission data found for this problem.");
          }
        } else {
          setFetchError("User ID or Problem ID is missing.");
        }
      } catch (error) {
        setFetchError("Error fetching submission.");
        console.error("Error fetching submission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [problemId, onLoadSubmissionCode]);

  const handleLoadCode = () => {
    if (onLoadSubmissionCode && submission) {
      onLoadSubmissionCode({ code: submission.code, language: submission.language });
    }
  };
  const getStatusTag = () => {
    switch (submission?.status) {
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

  if (fetchError) {
    return (
      <SubmissionCard>
        <Alert
          message="Error"
          description={fetchError}
          type="error"
        />
      </SubmissionCard>
    );
  }

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
        {submission?.error && submission.error !== "Unknown error occurred" && (
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
