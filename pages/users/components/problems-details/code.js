import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Select } from "antd";
import styled from "styled-components";
import { Code as CodeIcon } from "@mui/icons-material";
import languageContent from "@/utils/languageContent";
import { LightMode, DarkMode } from "@mui/icons-material";

const languages = [
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "Dart", value: "dart" },
  { label: "PHP", value: "php" },
  { label: "Ruby", value: "ruby" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Lua", value: "lua" },
  { label: "Assembly", value: "assembly" },
];

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  padding: 12px 16px 16px 16px;
`;

const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: var(--background-color);
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  font-size: 16px;
  line-height: 30px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const CodeEditor = styled.div`
  flex-grow: 1;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const LanguageSelect = styled(Select)`
  min-width: 150px;
  margin-bottom: 12px;
`;

// Container for the switch-like buttons
const ButtonContainer = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 16px;
  overflow: hidden;
  height: px;
  width: fit-content;
`;

const StyledButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  border: none;
  background-color: ${(props) =>
    props.selected ? "var(--orange-color)" : "transparent"};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 28px;
  height: 24px;

  svg {
    width: 16px;
    height: 16px;
    opacity: ${(props) => (props.selected ? 1 : 0.6)};
  }

  &:hover {
    background-color: ${(props) =>
      props.selected ? "var(--orange-color)" : "rgba(0,0,0,0.05)"};
  }
`;

const CodeEditorComponent = ({ code, setCode, language, setLanguage }) => {
  const [theme, setTheme] = useState("vs-dark");

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setCode(languageContent[value] || "// Write your code here...");
  };

  const setDarkTheme = () => setTheme("vs-dark");
  const setLightTheme = () => setTheme("vs-light");

  return (
    <>
      <ProblemHeader>
        <HeaderContent>
          <CodeIcon style={{ marginRight: 8 }} />
          Code
        </HeaderContent>
        <ButtonContainer>
          <StyledButton selected={theme === "vs-light"} onClick={setLightTheme}>
            <LightMode />
          </StyledButton>
          <StyledButton selected={theme === "vs-dark"} onClick={setDarkTheme}>
            <DarkMode />
          </StyledButton>
        </ButtonContainer>
      </ProblemHeader>
      <EditorContainer>
        <LanguageSelect
          defaultValue="typescript"
          value={language}
          onChange={handleLanguageChange}
          options={languages.map((lang) => ({
            label: lang.label,
            value: lang.value,
          }))}
          style={{ width: 200 }}
        />
        <CodeEditor>
          <MonacoEditor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              scrollBeyondLastLine: false,
              formatOnType: true,
              formatOnPaste: true,
            }}
          />
        </CodeEditor>
      </EditorContainer>
    </>
  );
};

export default CodeEditorComponent;
