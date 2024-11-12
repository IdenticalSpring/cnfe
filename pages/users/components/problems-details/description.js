import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Menu, Tag as AntTag, Skeleton, Collapse } from "antd";
import {
  FileTextOutlined,
  ReloadOutlined,
  BookOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { userAPI } from "service/user";

const DescriptionContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ProblemHeader = styled.div`
  background-color: #f0f0f0;
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

const ProblemDescription = styled.div`
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

const StyledTag = styled(({ clickable, ...props }) => <AntTag {...props} />)`
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.clickable ? "var(--background-hover-color)" : "inherit"};
  }
`;

const CollapseContainer = styled(Collapse)`
  margin-top: 10px;

  .ant-collapse-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ant-collapse-arrow {
    margin-left: auto;
  }
`;

const Description = ({ id, title, description }) => {
  const [difficulty, setDifficulty] = useState("Unknown");
  const [loading, setLoading] = useState(true);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [topics, setTopics] = useState([]); // Khởi tạo state cho topics

  const topicsRef = useRef(null);
  const companiesRef = useRef(null);
  const hintRef = useRef(null);

  const companies = ["Google", "Amazon", "Facebook"];
  const hints = ["Think about edge cases", "Use a hash map"];

  const toggleTopicCollapse = () => setIsTopicOpen((prev) => !prev);
  const toggleCompaniesCollapse = () => setIsCompaniesOpen((prev) => !prev);
  const toggleHintCollapse = () => setIsHintOpen((prev) => !prev);

  useEffect(() => {
    if (isTopicOpen) {
      setTimeout(() => {
        topicsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [isTopicOpen]);

  useEffect(() => {
    if (isCompaniesOpen) {
      setTimeout(() => {
        companiesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [isCompaniesOpen]);

  useEffect(() => {
    if (isHintOpen) {
      setTimeout(() => {
        hintRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [isHintOpen]);

  useEffect(() => {
    const fetchProblemTopics = async () => {
      try {
        const response = await userAPI.getTopicProblem(id);
        setTopics(response.data || []);
        console.log(response);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
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

    if (id) {
      fetchProblemDetails();
      fetchProblemTopics();
    }
  }, [id]);

  const menuItems = [
    { key: "description", icon: <FileTextOutlined />, label: "Description" },
    { key: "submissions", icon: <ReloadOutlined />, label: "Submissions" },
    { key: "editorial", icon: <BookOutlined />, label: "Editorial" },
    { key: "solutions", icon: <ExperimentOutlined />, label: "Solutions" },
  ];

  const topicItems = [
    {
      key: "1",
      label: "Topics",
      children: (
        <div>
          {topics.map((topic, index) => (
            <StyledTag key={index} color="default">
              Topic ID: {topic.topicId}
            </StyledTag>
          ))}
        </div>
      ),
    },
  ];

  const companiesItems = [
    {
      key: "2",
      label: "Companies",
      children: (
        <div>
          {companies.map((company, index) => (
            <StyledTag
              style={{
                cursor: "default",
                transition: "none",
                backgroundColor: "inherit",
              }}
              key={index}
              color="default"
            >
              {company}
            </StyledTag>
          ))}
        </div>
      ),
    },
  ];

  const hintItems = [
    {
      key: "3",
      label: "Hint",
      children: (
        <div>
          {hints.map((hint, index) => (
            <p key={index}>{hint}</p>
          ))}
        </div>
      ),
    },
  ];

  return (
    <DescriptionContainer>
      <ProblemHeader>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["description"]}
          style={{ borderBottom: "none" }}
          items={menuItems}
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
            <StyledTag
              style={{
                cursor: "default",
                transition: "none",
                backgroundColor: "inherit",
              }}
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
            </StyledTag>
          )}
          <StyledTag onClick={toggleTopicCollapse} clickable color="default">
            Topics
          </StyledTag>
          <StyledTag
            onClick={toggleCompaniesCollapse}
            clickable
            color="default"
          >
            Companies
          </StyledTag>
          <StyledTag onClick={toggleHintCollapse} clickable color="default">
            Hint
          </StyledTag>
        </TagContainer>
        <ProblemDescription dangerouslySetInnerHTML={{ __html: description }} />

        <div ref={topicsRef}>
          <CollapseContainer
            activeKey={isTopicOpen ? ["1"] : []}
            onChange={(keys) => setIsTopicOpen(keys.includes("1"))}
            items={topicItems}
          />
        </div>

        <div ref={companiesRef}>
          <CollapseContainer
            activeKey={isCompaniesOpen ? ["2"] : []}
            onChange={(keys) => setIsCompaniesOpen(keys.includes("2"))}
            items={companiesItems}
          />
        </div>

        <div ref={hintRef}>
          <CollapseContainer
            activeKey={isHintOpen ? ["3"] : []}
            onChange={(keys) => setIsHintOpen(keys.includes("3"))}
            items={hintItems}
          />
        </div>
      </ProblemContent>
    </DescriptionContainer>
  );
};

export default Description;
