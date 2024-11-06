import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Select } from "antd";
import styled from "styled-components";
import languageContent from "./languageContent"; // Import the languageContent file

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

// Styled components for layout
const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CodeEditor = styled.div`
  flex-grow: 1;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const LanguageSelect = styled(Select)`
  min-width: 150px;
  margin-right: 16px;
`;

const Code = () => {
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState(languageContent["typescript"]); // Set initial content for TypeScript

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setCode(languageContent[value] || "// Write your code here..."); // Set default content based on language
  };

  return (
    <EditorContainer>
      <Header>
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
      </Header>
      <CodeEditor>
        <MonacoEditor
          width="flex-grow"
          height="100%"
          language={language}
          theme="vs-light"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            scrollBeyondLastLine: false,
          }}
        />
      </CodeEditor>
    </EditorContainer>
  );
};

export default Code;
