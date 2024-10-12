// pages/problems/[id].js
import DefaultLayout from "@/layout/DefaultLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import styled from "styled-components";
import { Button } from "antd"; // Import Button từ Ant Design
import 'react-resizable/css/styles.css';  // Đảm bảo import CSS cho react-resizable

// Styled components cho layout
const ProblemSection = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #ddd;
`;

const CodeSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  border-bottom: 1px solid #ddd;
`;

const TestCaseSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const ProblemTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ProblemDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const CodeEditor = styled.textarea`
  width: 100%;
  height: 100%;
  font-family: monospace;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const TestCase = styled.pre`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
`;

// Thêm style cho thanh kéo
// Thay đổi trong styled của thanh kéo dọc
const StyledHandle = styled.div`
  width: 5px; /* Đặt chiều rộng nhỏ hơn */
  background-color: transparent;
  cursor: col-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  &:hover {
    background-color: #007bff; /* Màu xanh khi hover */
    width: 2px; /* Đường kẻ mỏng khi hover */
    transition: background-color 0.3s ease, width 0.3s ease;
  }
`;

// Thay đổi trong styled của thanh kéo ngang
const StyledHandleHorizontal = styled.div`
  height: 5px; /* Đặt chiều cao nhỏ hơn */
  background-color: transparent;
  cursor: row-resize;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  &:hover {
    background-color: #007bff; /* Màu xanh khi hover */
    height: 2px; /* Đường kẻ mỏng khi hover */
    transition: background-color 0.3s ease, height 0.3s ease;
  }
`;

// Thêm thẻ div để bọc toàn bộ trang
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f1f1f1;
`;

const ProblemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [problem, setProblem] = useState({
    title: "Số của Ghế Trống Nhỏ Nhất",
    description: `Có một bữa tiệc nơi có n người bạn tham dự. Có vô số ghế được đánh số từ 0 đến vô hạn. Khi một người bạn đến, họ sẽ ngồi lên chiếc ghế trống có số nhỏ nhất. Hãy trả lại số ghế mà người bạn đó sẽ ngồi.`,
    testCases: [
      {
        input: "times = [[1,4],[2,3],[4,6]], targetFriend = 1",
        output: "Kết quả: 1",
      },
      {
        input: "times = [[3,10],[1,5],[2,6]], targetFriend = 0",
        output: "Kết quả: 0",
      },
    ],
  });

  return (
    <DefaultLayout>
      {/* Thẻ div bọc toàn bộ trang */}
      <PageWrapper>
        {/* Toolbar với các nút Submit và Run */}
        <Toolbar>
          <Button type="primary" style={{ marginRight: '10px' }}>Run</Button>
          <Button type="default">Submit</Button>
        </Toolbar>

        {/* Nội dung của trang */}
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          {/* Phần mô tả bài toán */}
          <ResizableBox
            width={400}
            height={Infinity}
            minConstraints={[200, Infinity]} // Giới hạn chiều rộng nhỏ nhất
            maxConstraints={[800, Infinity]} // Giới hạn chiều rộng lớn nhất
            axis="x" // Chỉ cho phép kéo giãn theo chiều ngang
            handle={<StyledHandle />} // Thêm handle với hiệu ứng hover
          >
            <ProblemSection>
              <ProblemTitle>{problem.title}</ProblemTitle>
              <SectionTitle>Mô tả</SectionTitle>
              <ProblemDescription>{problem.description}</ProblemDescription>
            </ProblemSection>
          </ResizableBox>

          {/* Phần trình soạn thảo mã và test cases */}
          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            {/* Phần trình soạn thảo mã */}
            <ResizableBox
              width={Infinity}
              height={400}
              minConstraints={[Infinity, 200]}
              maxConstraints={[Infinity, 600]}
              axis="y"
              handle={<StyledHandleHorizontal />} // Thêm handle với hiệu ứng hover cho chiều dọc
            >
              <CodeSection>
                <SectionTitle>Trình soạn thảo mã</SectionTitle>
                <CodeEditor placeholder="Viết mã của bạn ở đây..." />
              </CodeSection>
            </ResizableBox>

            {/* Phần test cases */}
            <TestCaseSection>
              <SectionTitle>Test Cases</SectionTitle>
              {problem.testCases.map((testCase, index) => (
                <div key={index}>
                  <h3>Test Case {index + 1}</h3>
                  <TestCase>
                    <strong>Đầu vào:</strong> {testCase.input} <br />
                    <strong>{testCase.output}</strong>
                  </TestCase>
                </div>
              ))}
            </TestCaseSection>
          </div>
        </div>
      </PageWrapper>
    </DefaultLayout>
  );
};

export default ProblemDetail;
