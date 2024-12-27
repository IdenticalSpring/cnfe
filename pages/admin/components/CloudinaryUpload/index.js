import React, { useState } from "react";
import styled from "styled-components";
import { Upload, Button, message, Tooltip } from "antd";
import { UploadOutlined, CopyOutlined } from "@ant-design/icons";
import { adminAPI } from "service/admin";

const UploadContainer = styled.div`
  margin-top: 10px;
`;

const FileInfo = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FileListContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const FileName = styled.span`
  color: var(--link-hover-color);
`;

const UploadButton = styled(Button)`
  background-color: var(--grey-color) !important;
  color: var(--orange-color) !important;
  border: none;
  color: white;

  &:hover {
    opacity: 0.9;
    color: var(--link-hover-color) !important;
  }
`;

const CloudinaryUpload = () => {
  const [uploadedFileName, setUploadedFileName] = useState([]);
  const [uploadedFileUrl, setUploadedFileUrl] = useState([]);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("upload_preset", "upload_codmaster");
    formData.append("folder", "Home/MasterCoding");

    try {
      const response = await adminAPI.uploadImage(formData);
      if (response?.statusCode === 200 || response?.statusCode === 201) {
        const fileName = response?.data?.url.split("/").pop();
        setUploadedFileName((prev) => [...prev, fileName]);
        setUploadedFileUrl((prev) => [...prev, response?.data?.url]);
        message.success(response?.data?.message);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      message.error("Error occurs when uploading image!");
    }
  };

  const handleCopyUrl = (url) => {
    if (url) {
        navigator.clipboard.writeText(url);
        message.success("Successfully copied");
      }
  };

  return (
    <UploadContainer>
      <Upload
        accept="image/*"
        customRequest={handleUpload}
        showUploadList={false}
        multiple
      >
        <UploadButton icon={<UploadOutlined />}>Upload image</UploadButton>
      </Upload>
      <FileListContainer>
        {uploadedFileName.map((fileName, index) => (
          <FileInfo key={index}>
            <FileName>{fileName}</FileName>
            <Tooltip title="Copy URL">
              <Button
                icon={<CopyOutlined />}
                onClick={() => handleCopyUrl(uploadedFileUrl[index])}
                shape="circle"
              />
            </Tooltip>
          </FileInfo>
        ))}
      </FileListContainer>
    </UploadContainer>
  );
};

export default CloudinaryUpload;