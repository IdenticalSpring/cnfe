import React, { useEffect, useState, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";
import Description from "../components/problems-details/description";
import CodeEditorComponent from "../components/problems-details/code";
import TestCaseComponent from "../components/problems-details/test-case";
import { userAPI } from "service/user";
import { notification } from "antd";
import ChatBox from "../components/problems-details/chatbox";

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
notification.config({
  placement: "topRight",
  top: 80, 
  duration: 4, 
});

const DetailProblem = ({ problemId }) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      setLoading(true);
      try {
        const problemResponse = await userAPI.getProblemByID(problemId);
        const testCases = await userAPI.getTestCasesByProblemId(problemId);
        setProblem({ ...problemResponse.data, testCases });
      } catch (error) {
        console.error("Error fetching problem details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [problemId]);

  const handleRunCode = useCallback(async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        notification.error({
          message: "User ID Not Found",
          description: "Your User ID is not available. Please log in again.",
        });
        return;
      }

      if (!code) {
        notification.warning({
          message: "Code Missing",
          description: "Please enter your code before running.",
        });
        return;
      }

      if (!problem?.testCases || !Array.isArray(problem.testCases)) {
        notification.error({
          message: "No Test Cases",
          description: "No test cases were found for this problem.",
        });
        return;
      }

      const results = await Promise.all(
        problem.testCases.map(async (testCase) => {
          if (!testCase.input) {
            console.error("Test Case Input Missing:", testCase);
            return {
              input: testCase.input,
              expectedOutput: testCase.output,
              actualOutput: null,
              status: "error",
              isCorrect: false,
            };
          }
    
          const result = await userAPI.executeCode(userId, code, language, testCase.input);
          console.log("API Response:", result.data);
          const actualOutput = result.data?.output?.trim();
          const expectedOutput = testCase.output?.trim();
          const isCorrect = actualOutput === expectedOutput;

          return {
            input: testCase.input,
            expectedOutput,
            actualOutput,
            status: result.data?.status || "error",
            isCorrect,
            ...result.data,
          };
        })
      );

      console.log("Test Case Results (Before setTestResult):", results);
      setTestResult(results);
      console.log("Test Result State Updated:", results);

      notification.success({
        message: "Code Execution Successful",
        description: "Your code ran successfully. Check the test case results below.",
      });
    } catch (error) {
      console.error("Error running code:", error);
      notification.error({
        message: "Code Execution Failed",
        description: "An error occurred while running your code. Please try again later.",
      });
    }
  }, [code, language, problem?.testCases]);

  const handleSubmitCode = async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      if (!userId || !code || !language) {
        notification.warning({
          message: "Missing Information",
          description: "Please fill in all required information before submitting.",
        });
        return;
      }

      if (!testResult || !testResult.length) {
        notification.warning({
          message: "Code Not Executed",
          description: "Please run the code and check the test cases before submitting.",
        });
        return;
      }

      const allPassed = testResult.every(
        (result) =>
          result.status === "completed" &&
          result.actualOutput === result.expectedOutput
      );

      if (!allPassed) {
        notification.error({
          message: "Cannot Submit",
          description: "Your code did not pass all test cases. Please fix the errors and try again.",
        });
        return;
      }

      const response = await userAPI.submitCode(
        userId,
        code,
        language,
        problemId,
        problem?.testCases[0]?.input
      );

      console.log("API Response:", response);

      const submissionStatus = response?.data.acceptanceSubmission?.status;

      if (response.status === 200) {
        notification.warning({
          message: "Duplicate Submission",
          description: response?.message || "Your submission has already been completed and accepted.",
        });
      } else if (response.status === 201) {
        notification.success({
          message: "New Submission Created",
          description: response?.message || "Your new submission was created successfully.",
        });
      } else if (submissionStatus === "rejected") {
        notification.error({
          message: "Submission Failed!",
          description: "Your submission was rejected.",
        });
      } else if (submissionStatus === "pending") {
        notification.info({
          message: "Processing",
          description: "Your submission is being processed. Please wait.",
        });
      } else {
        notification.warning({
          message: "Unknown Status",
          description: "Unable to determine submission status. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during Submit Code:", error);
      notification.error({
        message: "System Error",
        description: "An error occurred during submission. Please try again later.",
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header onRunCode={handleRunCode} onSubmitCode={handleSubmitCode} />
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
      <ChatBox />
    </>
  );
};

export default DetailProblem;
