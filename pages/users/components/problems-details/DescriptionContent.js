// DescriptionContent.js
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Skeleton, Tag as AntTag, Collapse } from "antd";
import { userAPI } from "service/user";

const ProblemContent = styled.div`
  flex-grow: 1;
  padding: 0;
  padding-right: 10px; /* Tạo khoảng cách giữa thanh cuộn và nội dung */
  overflow-y: auto;
  height: calc(100vh - 125px);

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 5px; /* Độ rộng thanh cuộn */
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* Màu nền track */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b0b0b0; /* Màu thanh cuộn */
    border-radius: 4px; /* Bo tròn thanh cuộn */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #8a8a8a; /* Màu thanh cuộn khi hover */
  }
`;

const ProblemDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  margin-top: 8px;
  padding: 0;
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

const DescriptionContent = ({ id, title, description }) => {
  const [difficulty, setDifficulty] = useState("Unknown");
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);

  const topicsRef = useRef(null);
  const companiesRef = useRef(null);
  const hintRef = useRef(null);

  const toggleTopicCollapse = () => setIsTopicOpen((prev) => !prev);
  const toggleCompaniesCollapse = () => setIsCompaniesOpen((prev) => !prev);
  const toggleHintCollapse = () => setIsHintOpen((prev) => !prev);

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

    const fetchProblemTopics = async () => {
      try {
        const response = await userAPI.getTopicProblem(id);
        setTopics(response.data || []);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    const fetchProblemCompanies = async () => {
      try {
        const response = await userAPI.getCompaniesProblem(id);
        setCompanies(response.data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    if (id) {
      fetchProblemDetails();
      fetchProblemTopics();
      fetchProblemCompanies();
    }
  }, [id]);

  const topicItems = [
    {
      key: "1",
      label: "Topics",
      children: (
        <div>
          {topics.map((topicData, index) => (
            <StyledTag key={index} color="default">
              {topicData.topic.name}
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
          {companies.map((companyData, index) => (
            <StyledTag
              key={index}
              color="default"
              style={{
                cursor: "default",
                transition: "none",
                backgroundColor: "inherit",
              }}
            >
              {companyData.company.name}
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
      children: <p>Think about edge cases.</p>, // Thêm nội dung hint nếu cần
    },
  ];

  return (
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
        <StyledTag onClick={toggleCompaniesCollapse} clickable color="default">
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
  );
};

export default DescriptionContent;
