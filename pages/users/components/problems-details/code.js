import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

const EditorContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  max-width: 100%;
  min-height: 300px;
  max-height: 1000px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const CodeEditorComponent = () => (
  <EditorContainer>
    <h2>Trình soạn thảo mã</h2>
    <CKEditor
      editor={ClassicEditor}
      data="<p>Viết mã của bạn ở đây...</p>"
      onReady={(editor) => {
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  </EditorContainer>
);

export default CodeEditorComponent;
