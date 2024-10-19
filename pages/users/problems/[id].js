import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import styled, { createGlobalStyle } from "styled-components";
import { Tooltip } from 'antd';
import 'react-resizable/css/styles.css';
import Header from "./header";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

// Import các component đã tách ra
import Description from '../components/problems-details/description';
import CodeEditorComponent from '../components/problems-details/code';
import TestCaseComponent from '../components/problems-details/test-case';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Đặt màu nền toàn trang */
  html, body {
    height: 100%;
    background-color: #f0f0f0; /* Màu xám nhạt */
    overflow: hidden;
  }

  #__next {
    height: 100%;
  }
`;

const StyledHandle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'handleAxis',
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
  z-index: 2;
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
  z-index: 2;
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
  background-color: #f0f0f0;
  overflow: hidden;
  z-index: 1;
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  flex-grow: 1;
`;

const ProblemDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [problem, setProblem] = useState({
    title: "Số của Ghế Trống Nhỏ Nhất",
    description: `You are given a 2D integer array intervals where intervals[i] = [lefti, righti] represents the inclusive interval [lefti, righti].

You have to divide the intervals into one or more groups such that each interval is in exactly one group, and no two intervals that are in the same group intersect each other.

Return the minimum number of groups you need to make.

Two intervals intersect if there is at least one common number between them. For example, the intervals [1, 5] and [5, 8] intersect.

 

Example 1:

Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8].
- Group 2: [2, 3], [5, 10].
- Group 3: [1, 10].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.
Example 2:

Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
Output: 1
Explanation: None of the intervals overlap, so we can put all of them in one group.
 

Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
1 <= lefti <= righti <= 106.`,
    testCases: [
      { input: "times = [[1,4],[2,3],[4,6]], targetFriend = 1", output: "Kết quả: 1" },
      { input: "times = [[3,10],[1,5],[2,6]], targetFriend = 0", output: "Kết quả: 0" },
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
      <Header style={{ zIndex: 3 }} />

      <PageWrapper>
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <ResizableBox
            width={400}
            height={Infinity}
            minConstraints={[200, Infinity]}
            maxConstraints={[800, Infinity]}
            axis="x"
            handle={(
              <StyledHandle>
                <HorizontalRuleIcon style={{ transform: 'rotate(90deg)', color: "orange" }} />
              </StyledHandle>
            )}
          >
            <ContentContainer>
              <Description title={problem.title} description={problem.description} />
            </ContentContainer>
          </ResizableBox>

          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            <ResizableBox
              width={Infinity}
              height={400}
              minConstraints={[Infinity, 200]}
              maxConstraints={[Infinity, 600]}
              axis="y"
              handle={(
                <StyledHandleHorizontal>
                  <HorizontalRuleIcon style={{ color: "orange" }} />
                </StyledHandleHorizontal>
              )}
            >
              <ContentContainer>
                <CodeEditorComponent />
              </ContentContainer>
            </ResizableBox>

            <ContentContainer>
              <TestCaseComponent testCases={problem.testCases} />
            </ContentContainer>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default ProblemDetail;
