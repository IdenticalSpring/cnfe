import React from 'react';
import styled from 'styled-components';

const CodeSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  max-width: 100%;
  min-height: 300px;  /* Minimum height for the container */
  max-height: 1000px; /* Maximum height for the container */
  overflow: hidden; 
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
   border: 1px solid #ddd;
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CodeEditorWrapper = styled.div`
  flex-grow: 1;
  overflow: auto; /* Enable scrolling if content overflows */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  min-height: 300px;  /* Minimum height for the editor wrapper */
  max-height: 1000px; /* Maximum height for the editor wrapper */
  width: 100%;  /* Ensure the editor takes the full width of the container */
  max-width: 100%; /* Limit the width within the container */
  box-sizing: border-box; /* Ensure padding and borders are included in the element's width/height */
`;

const CodeEditor = styled.textarea`
  width: 100%;
  height: 100%;  
  font-family: monospace;
  font-size: 16px;
  padding: 10px;
  border: solid 1px;
  background-color: #f9f9f9;

  overflow: auto;
  box-sizing: border-box; 
`;

const CodeEditorComponent = () => (
    <CodeSection>
        <SectionTitle>Trình soạn thảo mã</SectionTitle>
        <CodeEditorWrapper>
            <CodeEditor placeholder="Viết mã của bạn ở đây..." />
        </CodeEditorWrapper>
    </CodeSection>
);

export default CodeEditorComponent;
