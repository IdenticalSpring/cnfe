import { userAPI } from '@/service/user';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled component for the completed Problem
const ProblemContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AssignmentItem = styled.div`
  margin-bottom: 10px;
`;

const CompletedProblem = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await userAPI.fetchSubmissionData(userId);
        console.log('API Response:', response);
        if (response && response.data && Array.isArray(response.data)) {
          setSubmissionData(response.data);
        } else {
          setError('No submission data found');
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Chạy một lần khi component được mount

  if (loading) {
    return <div>Loading...</div>; // Hiển thị Loading khi đang fetch dữ liệu
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  // Lọc các bài tập có acceptance submission với trạng thái "accepted"
  const acceptedSubmissions = submissionData.filter(submission =>
    submission.acceptanceSubmission?.status === 'accepted'
  );

  return (
    <ProblemContainer>
      <h2>Completed Problem</h2>
      {acceptedSubmissions.length > 0 ? (
        acceptedSubmissions.map((submission, index) => (
          <AssignmentItem key={index}>
            <strong>{index + 1}. </strong>
            <span>{submission.problem.title}</span>
            <span> - Status: {submission.acceptanceSubmission.status}</span>
          </AssignmentItem>
        ))
      ) : (
        <div>No accepted submission found</div>
      )}
    </ProblemContainer>
  );
};

export default CompletedProblem;
