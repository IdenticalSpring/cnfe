// Description.js
import React, { useState } from "react";
import styled from "styled-components";
import { Menu } from "antd";
import {
  FileTextOutlined,
  ReloadOutlined,
  BookOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import DescriptionContent from "./DescriptionContent"; // Import DescriptionContent mới
import Submissions from "./Submissions";
import Editorial from "./Editorial";
import Solutions from "./Solutions";

const DescriptionContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProblemHeader = styled.div`
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

const ProblemContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Description = ({ id, title, description }) => {
  const [activeTab, setActiveTab] = useState("description");

  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };

  return (
    <DescriptionContainer>
      <ProblemHeader>
        <Menu
          mode="horizontal"
          selectedKeys={[activeTab]}
          onClick={handleMenuClick}
          defaultSelectedKeys={["description"]}
          items={[
            {
              key: "description",
              icon: <FileTextOutlined />,
              label: "Description",
            },
            {
              key: "submissions",
              icon: <ReloadOutlined />,
              label: "Submissions",
            },
            { key: "editorial", icon: <BookOutlined />, label: "Editorial" },
            {
              key: "solutions",
              icon: <ExperimentOutlined />,
              label: "Solutions",
            },
          ]}
        />
      </ProblemHeader>
      <ProblemContent>
        {activeTab === "description" && (
          <DescriptionContent id={id} title={title} description={description} /> // Gọi component mới
        )}
        {activeTab === "submissions" && <Submissions />}
        {activeTab === "editorial" && <Editorial />}
        {activeTab === "solutions" && <Solutions />}
      </ProblemContent>
    </DescriptionContainer>
  );
};

export default Description;
