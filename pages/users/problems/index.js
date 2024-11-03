import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  width: 100%; /* Đảm bảo container chiếm toàn bộ chiều rộng */

  @media (max-width: 1024px) {
    margin: 0 20px; /* Giảm margin ở màn hình nhỏ hơn */
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

const TagSearchContainer = styled.div`
  margin-bottom: 10px;
`;

const CustomTag = styled(Tag)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  font-size: 14px;
  text-align: center;
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

  const handleSearch = debounce((value) => {
    setSearchText(value);
    setCurrentPage(1);
  }, 300);

  const filteredProblems = useMemo(() => {
    return allProblems.filter((problem) => {
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty === selectedDifficulty;
      const matchesSearchText = problem.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesDifficulty && matchesSearchText;
    });
  }, [allProblems, selectedDifficulty, searchText]);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size || pageSize);
  };
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  const tagData = [
    { text: "Array", count: 1750 },
    { text: "String", count: 726 },
    { text: "Hash Table", count: 629 },
    { text: "Dynamic Programming", count: 533 },
    { text: "Math", count: 523 },
    { text: "Sorting", count: 415 },
    { text: "Greedy", count: 383 },
  ];

  const filteredTags = tagData.filter((tag) =>
    tag.text.toLowerCase().includes(tagSearchText.toLowerCase())
  );

  const tagMenu = (
    <TagDropdownContainer>
      <TagSearchContainer>
        <Input
          placeholder="Filter topics"
          suffix={<SearchIcon />}
          value={tagSearchText}
          onChange={(e) => setTagSearchText(e.target.value)}
        />
      </TagSearchContainer>
      <TagList>
        {filteredTags.map((tag, index) => (
          <CustomTag key={index}>
            <span>{tag.text}</span>
            <span
              style={{ marginLeft: "5px", fontWeight: "bold", color: "orange" }}
            >
              {tag.count}
            </span>
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
          <span
            style={{
              cursor: "pointer",
              color: "blue",
            }}
          >
            {text}
          </span>
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const difficultyResponse = await userAPI.getDifficulties();
        const difficulties = difficultyResponse?.data?.reduce((acc, item) => {
          acc[item.id] = item.name;
          return acc;
        }, {});

        setDifficultyLabels(difficulties);

        const response = await userAPI.getAllProblemsByPage(
          currentPage,
          pageSize
        );
        const problemsData = response?.data?.data || [];
        const totalItems = response?.data?.totalItems || 0;

        const formattedData = problemsData.map((problem) => ({
          key: problem?.id,
          title: problem?.title,
          acceptance: problem?.acceptance_rate || "none",
          difficulty: difficulties[problem?.difficultyId] || "Unknown",
        }));

        setAllProblems(formattedData);
        setTotalProblems(totalItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  return (
    <DefaultLayout>
      <PageContainer>
        <ProblemListContainer>
          <SearchContainer>
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
                Tags <ArrowDropDownIcon />
              </CustomButton>
            </Dropdown>

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
              dataSource={filteredProblems}
              columns={columns}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalProblems,
                onChange: handlePageChange,
                showSizeChanger: false,
                pageSizeOptions: [10, 20, 50, 100],
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
