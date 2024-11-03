import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import styled, { createGlobalStyle } from "styled-components";
import { Tooltip } from "antd";
import "react-resizable/css/styles.css";
import Header from "./header";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Description from "../components/problems-details/description";
import CodeEditorComponent from "../components/problems-details/code";
import TestCaseComponent from "../components/problems-details/test-case";
import { userAPI } from "service/user"; // Import the API function here
import Loading from "../components/Loading"; // Import Loading component

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
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
  z-index: 2;
  &:hover {
    background-color: orange;
    width: 4px;
    transition: background-color 0.3s ease, width 0.3s ease;
  }
`;

const StyledHandleHorizontal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "handleAxis",
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

const DetailProblem = ({ problemId }) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      setLoading(true);
      try {
        const response = await userAPI.getProblemByID(problemId);
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchProblemDetails();
    }
  }, [problemId]);

  return (
    <>
      <GlobalStyle />
      <Header style={{ zIndex: 3 }} />
      <PageWrapper>
        {loading && <Loading />}{" "}
        {/* Hiển thị component Loading khi loading là true */}
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <ResizableBox
            width={400}
            height={Infinity}
            minConstraints={[200, Infinity]}
            maxConstraints={[800, Infinity]}
            axis="x"
            handle={
              <StyledHandle>
                <HorizontalRuleIcon
                  style={{ transform: "rotate(90deg)", color: "orange" }}
                />
              </StyledHandle>
            }
          >
            <ContentContainer>
              <Description
                title={problem?.title}
                description={problem?.description}
              />
            </ContentContainer>
          </ResizableBox>
          <div
            style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <ResizableBox
              width={Infinity}
              height={400}
              minConstraints={[Infinity, 200]}
              maxConstraints={[Infinity, 600]}
              axis="y"
              handle={
                <StyledHandleHorizontal>
                  <HorizontalRuleIcon style={{ color: "orange" }} />
                </StyledHandleHorizontal>
              }
            >
              <ContentContainer>
                <CodeEditorComponent />
              </ContentContainer>
            </ResizableBox>
            <ContentContainer>
              <TestCaseComponent testCases={problem?.testCases} />
            </ContentContainer>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DetailProblem;
