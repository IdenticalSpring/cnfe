import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Menu, Tag, Skeleton } from "antd";
import {
  FileTextOutlined,
  ReloadOutlined,
  BookOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { userAPI } from "service/user"; // Import API

const DescriptionContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ProblemHeader = styled.div`
  position: sticky;
  top: 0;
  border-bottom: 1px solid #ddd;
  z-index: 100;
  .ant-menu-item-selected {
    font-weight: 500;
  }
`;

const ProblemContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

const ProblemDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-top: 8px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const Description = ({ id, title, description }) => {
  const [difficulty, setDifficulty] = useState("Unknown");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const difficultiesResponse = await userAPI.getDifficulties();
        const difficulties = difficultiesResponse?.data?.reduce(
          (acc, item) => ({ ...acc, [item.id]: item.name }),
          {}
        );

        const problemResponse = await userAPI.getProblemByID(id);
        setDifficulty(
          difficulties[problemResponse.data.difficultyId] || "Unknown"
        );
      } catch (error) {
        console.error("Error fetching problem details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProblemDetails();
  }, [id]);

  // Tạo items cho Menu thay vì sử dụng Menu.Item trực tiếp
  const menuItems = [
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
    {
      key: "editorial",
      icon: <BookOutlined />,
      label: "Editorial",
    },
    {
      key: "solutions",
      icon: <ExperimentOutlined />,
      label: "Solutions",
    },
  ];

  return (
    <DescriptionContainer>
      <ProblemHeader>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["description"]}
          style={{ borderBottom: "none" }}
          items={menuItems} // Sử dụng items thay cho children
        />
      </ProblemHeader>
      <ProblemContent>
        <h2>
          {loading ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : (
            `${id}. ${title}`
          )}
        </h2>

        <TagContainer>
          {loading ? (
            <Skeleton.Button active size="small" style={{ width: 60 }} />
          ) : (
            <Tag
              color={
                difficulty === "Easy"
                  ? "green"
                  : difficulty === "Medium"
                  ? "orange"
                  : difficulty === "Hard"
                  ? "red"
                  : "default"
              }
            >
              {difficulty}
            </Tag>
          )}
          <Tag icon={<FileTextOutlined />} color="default">
            Topics
          </Tag>
          <Tag icon={<ReloadOutlined />} color="default">
            Companies
          </Tag>
          <Tag icon={<ExperimentOutlined />} color="default">
            Hint
          </Tag>
        </TagContainer>
        <ProblemDescription>{description}</ProblemDescription>
      </ProblemContent>
    </DescriptionContainer>
  );
};

export default Description;
