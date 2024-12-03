import React from "react";
import styled from "styled-components";
import TestIcon from "@mui/icons-material/CheckCircle";

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
const TestCaseIndex = styled.pre`
  color: var(--orange-color);
  font-size: 16px;
  font-family: Roboto, sans-serif;
  margin-bottom: 5px;
`;
const TestCaseComponent = ({ testCases, result }) => {
  return (
    <TestCaseSection>
      {testCases && testCases.length > 0 ? (
        testCases.map((testCase, index) => {
          const actualResult = result && result[index] ? result[index] : null;
          const isCorrect = actualResult?.isCorrect;

          return (
            <div key={index}>
              <TestCaseIndex>Test Case {index + 1}</TestCaseIndex>
              <TestCase>
                <strong>Input:</strong> {testCase.input} <br />
                <strong>Expected Output:</strong> {testCase.output} <br />
                <strong>Actual Output:</strong>{" "}
                {actualResult?.actualOutput || "No Output"} <br />
                <strong>Status:</strong> {actualResult?.status || "Unknown"}{" "}
                <br />
                <strong>CPU Time:</strong> {actualResult?.cpu_time || "N/A"} ms{" "}
                <br />
                <strong>Memory:</strong> {actualResult?.memory || "N/A"} KB{" "}
                <br />
                <strong>Wall Time:</strong> {actualResult?.wall_time || "N/A"}{" "}
                ms <br />
                <strong>Error:</strong>{" "}
                {actualResult?.error ? (
                  <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
                    {actualResult.error}
                  </pre>
                ) : (
                  "No Errors"
                )}
                <br />
                <strong>Result:</strong>{" "}
                {isCorrect ? (
                  <span style={{ color: "green" }}>Passed</span>
                ) : (
                  <span style={{ color: "red" }}>Failed</span>
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
