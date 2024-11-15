import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";
import Description from "../components/problems-details/description";
import CodeEditorComponent from "../components/problems-details/code";
import TestCaseComponent from "../components/problems-details/test-case";
import { userAPI } from "service/user";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100vh;
    overflow: hidden;
  }

  #__next {
    min-height: 100vh;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f0f0f0;
`;

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 50px); /* Điều chỉnh chiều cao */
`;

const DescriptionContainer = styled.div`
  // display: flex;
  width: 45%;
  height: 100vh;
`;

const EditorContainer = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  margin: 4px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
      <Header
        style={{
          width: "100%",
          zIndex: 3,
        }}
      />
      <PageWrapper>
        <LayoutContainer>
          <DescriptionContainer>
            <ContentContainer>
              <Description
                id={problem?.id}
                title={problem?.title}
                description={problem?.description}
              />
            </ContentContainer>
          </DescriptionContainer>
          <EditorContainer>
            <ContentContainer>
              <CodeEditorComponent />
            </ContentContainer>
            <ContentContainer>
              <TestCaseComponent testCases={problem?.testCases} />
            </ContentContainer>
          </EditorContainer>
        </LayoutContainer>
      </PageWrapper>
    </>
  );
};

export default DetailProblem;
