import React, { useEffect, useState, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";
import Description from "../components/problems-details/description";
import CodeEditorComponent from "../components/problems-details/code";
import TestCaseComponent from "../components/problems-details/test-case";
import { userAPI } from "service/user";
import axios from "axios";
import Cookies from 'js-cookie';

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
  height: calc(100vh - 50px);
`;

const DescriptionContainer = styled.div`
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
  const [problem, setProblem] = useState({
    id: problemId || 1,
    title: "Sample Problem",
    description: "Calculate the sum of two numbers.",
    testCases: [
      { input: "2\n3", output: "5\n" },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState(null);
  const [code, setCode] = useState(null);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      setLoading(true);
      try {
        const response = await userAPI.getProblemByID(problemId);
        setProblem(prevProblem => ({
          ...prevProblem,
          ...response.data,
          testCases: response.data.testCases || prevProblem.testCases,
        }));
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

  const handleRunCode = useCallback(async () => {
    try {
      const userId = sessionStorage.getItem('userId'); 

      if (!userId) {
        console.warn("User ID is not available in session storage.");
        return;
      }

      if (!code) {
        console.warn("Code is empty or null.");
        return;
      }

      const result = await userAPI.executeCode(userId, code, language, problem?.testCases[0]?.input || "");
      setTestResult(result);
    } catch (error) {
      console.error("Error running code:", error);
    }
  }, [code, language, problem?.testCases]);





  return (
    <>
      <GlobalStyle />
      <Header onRunCode={handleRunCode} />
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
              <CodeEditorComponent
                code={code}
                setCode={setCode} 
                language={language}
                setLanguage={setLanguage}
              />
            </ContentContainer>
            <ContentContainer>
              <TestCaseComponent testCases={problem?.testCases} result={testResult} />
            </ContentContainer>
          </EditorContainer>
        </LayoutContainer>
      </PageWrapper>
    </>
  );
};

export default DetailProblem;