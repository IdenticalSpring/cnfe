import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Dropdown, Table, Button, Skeleton, Input, Tag } from "antd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import DefaultLayout from "@/layout/DefaultLayout";
import Link from "next/link";
import { userAPI } from "service/user";
import debounce from "lodash.debounce";
import SidebarProblem from "../components/sidebar-problem/SidebarProblem";

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
`;

const ProblemListContainer = styled.div`
  flex: 8;
  margin-left: 100px;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-primary-color);
  min-height: 100vh;
  width: 100%;

  @media (max-width: 1024px) {
    margin: 0 20px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  justify-content: space-between;
`;
const DropdownGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #f6f8fa;
  border-radius: 8px;
  font-size: 14px;
  width: 100px;
  height: 35px;
  padding: 0 12px;

  &:hover {
    background-color: #ebedf0;
  }
`;

const TagDropdownContainer = styled.div`
  width: 400px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const CustomTag = styled(Tag)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: var(--link-hover-color);
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--background-hover-color);
  }
  .ant-table-tbody > tr {
    &:nth-child(odd) {
      background-color: #ffffff;
    }

    &:nth-child(even) {
      background-color: #f0f0f0;
    }
  }
`;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [tagSearchText, setTagSearchText] = useState("");
  const [difficultyLabels, setDifficultyLabels] = useState({});
  const [pageSize, setPageSize] = useState(20);
  const [totalProblems, setTotalProblems] = useState(0);
  const [topics, setTopics] = useState([]);
  const [isDifficultyLoaded, setIsDifficultyLoaded] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null); // Track the selected topic

  const tagMenu = (
    <TagDropdownContainer>
      <Input
        placeholder="Search topics"
        suffix={<SearchIcon />}
        value={tagSearchText}
        onChange={(e) => setTagSearchText(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <TagList>
        {topics
          .filter((topic) =>
            topic.name.toLowerCase().includes(tagSearchText.toLowerCase())
          )
          .map((topic) => (
            <CustomTag
              key={topic.id}
              onClick={() => handleTopicChange(topic.id)}
              style={{
                borderColor: selectedTopic === topic.id ? "orange" : "default",
                borderWidth: selectedTopic === topic.id ? "2px" : "1px",
                borderStyle: selectedTopic === topic.id ? "solid" : "none",
              }}
            >
              <span>{topic.name}</span>
            </CustomTag>
          ))}
      </TagList>
    </TagDropdownContainer>
  );

  const menuItems = [
    { key: "all", label: "All", onClick: () => handleDifficultyChange("All") },
    {
      key: "easy",
      label: <span style={{ color: "green" }}>Easy</span>,
      onClick: () => handleDifficultyChange("Easy"),
    },
    {
      key: "medium",
      label: <span style={{ color: "orange" }}>Medium</span>,
      onClick: () => handleDifficultyChange("Medium"),
    },
    {
      key: "hard",
      label: <span style={{ color: "red" }}>Hard</span>,
      onClick: () => handleDifficultyChange("Hard"),
    },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: 700,
      key: "title",
      render: (text, record) => (
        <Link href={`/users/problems/${record.key}`} passHref>
          <span style={{ cursor: "pointer", color: "blue" }}>{text}</span>
        </Link>
      ),
    },
    {
      title: "Acceptance",
      dataIndex: "acceptance",
      width: 700,
      key: "acceptance",
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      width: 200,
      key: "difficulty",
      render: (text) => (
        <span
          style={{
            color:
              text === "Easy" ? "green" : text === "Medium" ? "orange" : "red",
          }}
        >
          {text}
        </span>
      ),
    },
  ];

  const fetchProblems = async (
    page = 1,
    size = pageSize,
    difficultyId = null,
    title = "",
    topicId = null
  ) => {
    setLoading(true);

    try {
      let response;

      if (!difficultyId && !topicId && !title) {
        response = await userAPI.getAllProblemsByPage(page, size);
      } else if (difficultyId || topicId) {
        response = await userAPI.getSearchProblemByDifficultyAndTopic(
          difficultyId,
          topicId
        );
      } else if (title) {
        response = await userAPI.getSearchProblemByTitle(title);
      }

      const problemsData = response?.data?.data || [];
      const totalItems = response?.data?.totalItems || 0;

      const formattedData = problemsData.map((problem) => ({
        key: problem.id,
        title: problem.title,
        acceptance: problem.acceptance_rate || "none",
        difficulty: difficultyLabels[problem.difficultyId] || "Unknown",
      }));

      setAllProblems(formattedData);
      setTotalProblems(totalItems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDifficulties = async () => {
      try {
        const response = await userAPI.getDifficulties();
        const difficulties = response?.data?.reduce((acc, item) => {
          acc[item.id] = item.name;
          return acc;
        }, {});
        setDifficultyLabels(difficulties);
        setIsDifficultyLoaded(true);
      } catch (error) {
        console.error("Error fetching difficulties:", error);
      }
    };

    const fetchTopics = async () => {
      try {
        const response = await userAPI.getAllTopics();
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchDifficulties();
    fetchTopics();
  }, []);

  // useEffect này để tải danh sách vấn đề khi có tìm kiếm hoặc lọc
  useEffect(() => {
    if (isDifficultyLoaded) {
      const difficultyId = Object.keys(difficultyLabels).find(
        (key) => difficultyLabels[key] === selectedDifficulty
      );
      fetchProblems(
        currentPage,
        pageSize,
        difficultyId,
        searchText,
        selectedTopic
      );
    }
  }, [
    isDifficultyLoaded,
    currentPage,
    pageSize,
    selectedDifficulty,
    searchText,
    selectedTopic,
  ]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size || pageSize);
  };

  const handleSearch = debounce((value) => {
    setSearchText(value);
    setCurrentPage(1);
  }, 300);

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  const handleTopicChange = (topicId) => {
    setSelectedTopic(topicId === selectedTopic ? null : topicId);
    setCurrentPage(1);
  };

  return (
    <DefaultLayout>
      <PageContainer>
        <ProblemListContainer>
          <SearchContainer>
            <DropdownGroup>
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <CustomButton>
                  Difficulty <ArrowDropDownIcon />
                </CustomButton>
              </Dropdown>

              <Dropdown
                trigger={["click"]}
                placement="bottomLeft"
                dropdownRender={() => tagMenu}
              >
                <CustomButton>
                  Topics <ArrowDropDownIcon />
                </CustomButton>
              </Dropdown>
            </DropdownGroup>

            <Input
              placeholder="Search problems"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ height: 35, width: "200px", borderRadius: "8px" }}
              suffix={<SearchIcon />}
            />
          </SearchContainer>

          {loading ? (
            <Skeleton active paragraph={{ rows: 10 }} />
          ) : (
            <StyledTable
              dataSource={allProblems}
              columns={columns}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalProblems,
                onChange: handlePageChange,
                showSizeChanger: false,
              }}
            />
          )}
        </ProblemListContainer>
        <SidebarProblem />
      </PageContainer>
    </DefaultLayout>
  );
};

export default Index;
