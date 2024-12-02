import React, { useState, useEffect } from 'react';
import { Card, Skeleton, Table, Typography, Empty, Tag } from 'antd';
import { CodeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userAPI } from '@/service/user';

const { Text } = Typography;

const AssignmentsCard = styled(Card)`
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const CompletedAssignments = () => {
  const [submissionData, setSubmissionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await userAPI.fetchSubmissionData(userId);

        if (response && response.data && Array.isArray(response.data)) {
          const acceptedSubmissions = response.data.filter(
            submission => submission.acceptanceSubmission?.status === 'accepted'
          );
          setSubmissionData(acceptedSubmissions);
        }
      } catch (error) {
        console.error('Error fetching submission data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AssignmentsCard
        title={
          <div>
            <CodeOutlined style={{ marginRight: 8 }} />
            Completed Problems
          </div>
        }
      >
        <Skeleton active paragraph={{ rows: 4 }} />
      </AssignmentsCard>
    );
  }

  const columns = [
    {
      title: 'Problem',
      dataIndex: 'problem',
      key: 'problem',
      render: (text, record, index) => (
        <div>
          <Text strong>Problem {index + 1}: </Text>
          <Text>{record.problem.title}</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color="green">
          <CheckCircleOutlined style={{ marginRight: 8 }} />
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <AssignmentsCard
      title={
        <div>
          <CodeOutlined style={{ marginRight: 8 }} />
          Completed Problems
        </div>
      }
    >
      {submissionData.length > 0 ? (
        <Table
          dataSource={submissionData}
          columns={columns}
          rowKey="id"
        />
      ) : (
        <Empty description="No accepted problems solved yet" />
      )}
    </AssignmentsCard>
  );
};

export default CompletedAssignments;
