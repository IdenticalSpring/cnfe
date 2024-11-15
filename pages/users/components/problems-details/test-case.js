import React from "react";
import styled from "styled-components";

const TestCaseSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: calc(100vh - 67.5vh);
  overflow-y: auto;
  border-radius: 8px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
  }
  &::-webkit-scrollbar-thumb {
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8;
  }

  @media (max-width: 1024px) {
    height: calc(100vh - 67.5vh);
  }

  @media (max-width: 768px) {
    height: calc(100vh - 70vh);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 67vh);
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const TestCase = styled.pre`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  overflow: auto;
`;

const TestCaseComponent = ({ testCases, result }) => {
  return (
    <TestCaseSection>
      <SectionTitle>Test Cases</SectionTitle>
      {testCases && testCases.length > 0 ? (
        testCases.map((testCase, index) => {
          // Kiểm tra nếu có kết quả thực tế cho test case hiện tại
          const actualResult = result && result[index] ? result[index] : null;
          const isCorrect =
            actualResult?.stdout?.trim() === testCase.output?.trim();

          return (
            <div key={index}>
              <h3>Test Case {index + 1}</h3>
              <TestCase>
                <strong>Đầu vào:</strong> {testCase.input} <br />
                <strong>Kết quả mong đợi:</strong> {testCase.output} <br />
                <strong>Kết quả thực tế:</strong>
                {actualResult ? (
                  <div>
                    <p>
                      <strong>Status:</strong>{" "}
                      {actualResult.status?.description || "Unknown"}
                    </p>
                    <p>
                      <strong>Output (stdout):</strong>{" "}
                      {actualResult.stdout || "No output"}
                    </p>
                    <p>
                      <strong>Đánh giá:</strong> {isCorrect ? "Đúng" : "Sai"}
                    </p>
                    <p>
                      <strong>Time:</strong> {actualResult.time || "N/A"}{" "}
                      seconds
                    </p>
                    <p>
                      <strong>Memory:</strong> {actualResult.memory || "N/A"} KB
                    </p>
                    <p>
                      <strong>Compile Output:</strong>{" "}
                      {actualResult.compile_output || "No compile output"}
                    </p>
                    <p>
                      <strong>Error (stderr):</strong>{" "}
                      {actualResult.stderr || "No error"}
                    </p>
                  </div>
                ) : (
                  <p>Đang xử lý...</p>
                )}
              </TestCase>
            </div>
          );
        })
      ) : (
        <p>No test cases available.</p>
      )}
    </TestCaseSection>
  );
};

export default TestCaseComponent;
