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
          const actualResult = result && result[index] ? result[index].data : null;
          const isCorrect =
            actualResult?.status === "completed" &&
            actualResult?.output?.trim() === testCase.output?.trim();

          return (
            <div key={index}>
              <h3>Test Case {index + 1}</h3>
              <TestCase>
                <strong>Đầu vào:</strong> {testCase.input} <br />
                <strong>Kết quả mong đợi:</strong> {testCase.output} <br />
                <strong>Kết quả thực tế:</strong>
                {actualResult ? (
                  <div>
                    {/* Hiển thị trạng thái */}
                    <p>
                      <strong>Status:</strong>{" "}
                      {actualResult.status === "completed"
                        ? "Hoàn thành"
                        : actualResult.status === "failed"
                          ? "Thất bại"
                          : actualResult.status === "killed"
                            ? "Bị giết"
                            : "Không xác định"}
                    </p>

                    {/* Hiển thị Output */}
                    <p>
                      <strong>Output (stdout):</strong>{" "}
                      {actualResult.output || "Không có kết quả"}
                    </p>

                    {/* Hiển thị lỗi */}
                    <p>
                      <strong>Error (stderr):</strong>{" "}
                      {actualResult.error ? (
                        <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
                          {actualResult.error}
                        </pre>
                      ) : (
                        "Không có lỗi"
                      )}
                    </p>

                    {/* Hiển thị thêm thông tin */}
                    <p>
                      <strong>CPU Time:</strong> {actualResult.cpu_time || "N/A"} ms
                    </p>
                    <p>
                      <strong>Memory:</strong> {actualResult.memory || "N/A"} KB
                    </p>
                    <p>
                      <strong>Wall Time:</strong> {actualResult.wall_time || "N/A"} ms
                    </p>

                    {/* Đánh giá kết quả */}
                    <p>
                      <strong>Đánh giá:</strong> {isCorrect ? "Đúng" : "Sai"}
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
        <p>Không có test cases.</p>
      )}
    </TestCaseSection>
  );
};


export default TestCaseComponent;
