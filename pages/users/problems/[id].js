import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Tooltip } from 'antd'; // Sử dụng Tooltip từ Ant Design
import 'react-resizable/css/styles.css';  // Đảm bảo import CSS cho react-resizable
import Header from "./header"; // Import Header component
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: hidden; /* Ẩn thanh cuộn dọc của body */
  }

  #__next {
    height: 100%;
  }
`;

const ProblemHeader = styled.div`
  display: flex;
  width: auto;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-hover-color);
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  position: sticky;
  top: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  z-index: 100;
`;

const ProblemSection = styled.div`
  background-color: var(--background-color);
  padding: 5px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid #ddd;
`;

const IconButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CodeSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 100%;
  overflow: auto;
  border-bottom: 1px solid #ddd;
`;

const TestCaseSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 100%;
  overflow: auto;
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
  overflow: auto;
`;

const StyledHandle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "handleAxis",
})`
  width: 5px;
  background-color: transparent;
  cursor: col-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: orange;
    width: 4px;
    transition: background-color 0.3s ease, width 0.3s ease;
  }
`;

const StyledHandleHorizontal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'handleAxis',
})`
  height: 5px;
  background-color: transparent;
  cursor: row-resize;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: orange;
    height: 4px;
    transition: background-color 0.3s ease, height 0.3s ease;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const ProblemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [problem, setProblem] = useState({
    title: "Số của Ghế Trống Nhỏ Nhất",
    description: `Có một bữa tiệc nơi có n người bạn tham dự. Có vô số ghế được đánh số từ 0 đến vô hạn. Khi một người bạn đến, họ sẽ ngồi lên chiếc ghế trống có số nhỏ nhất. Hãy trả lại số ghế mà người bạn đó sẽ ngồi.

    Mỗi khi một người bạn rời khỏi bữa tiệc, chiếc ghế họ đã ngồi sẽ trở thành ghế trống. Các bạn bè đến bữa tiệc theo một lịch trình cụ thể, được mô tả bởi một danh sách các thời điểm đến và rời đi của mỗi người bạn. Danh sách này bao gồm nhiều mảng con, trong đó mỗi mảng con đại diện cho một người bạn, với thời gian đến và rời đi tương ứng.

    Giả sử có 3 người bạn với các thời gian đến và rời đi như sau:
    - Bạn 1: đến vào thời điểm 1 và rời đi vào thời điểm 4
    - Bạn 2: đến vào thời điểm 2 và rời đi vào thời điểm 3
    - Bạn 3: đến vào thời điểm 4 và rời đi vào thời điểm 6

    Danh sách thời gian đến và rời đi sẽ được biểu diễn như sau:
    [[1, 4], [2, 3], [4, 6]]
    `,
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

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Header />

      <PageWrapper>
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <ResizableBox
            width={400}
            height={Infinity}
            minConstraints={[200, Infinity]}
            maxConstraints={[800, Infinity]}
            axis="x"
            handle={
              <StyledHandle>
                <Tooltip title="Resize horizontally">
                  <HorizontalRuleIcon style={{ transform: 'rotate(90deg)', color: "orange" }} />
                </Tooltip>
              </StyledHandle>
            }
          >
            <ProblemSection>
              <ProblemHeader />
              <ProblemTitle>
                <span>{problem.title}</span>
              </ProblemTitle>
              <ProblemDescription>{problem.description}</ProblemDescription>
            </ProblemSection>
          </ResizableBox>

          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <ResizableBox
              width={Infinity}
              height={400}
              minConstraints={[Infinity, 200]}
              maxConstraints={[Infinity, 600]}
              axis="y"
              handle={
                <StyledHandleHorizontal>
                  <Tooltip title="Resize vertically">
                    <HorizontalRuleIcon style={{ color: "orange" }} />
                  </Tooltip>
                </StyledHandleHorizontal>
              }
            >
              <CodeSection>
                <SectionTitle>Trình soạn thảo mã</SectionTitle>
                <CodeEditor placeholder="Viết mã của bạn ở đây..." />
              </CodeSection>
            </ResizableBox>

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
    </>
  );
};

export default ProblemDetail;
