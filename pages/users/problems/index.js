import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { Dropdown, Table, Button, Skeleton, Input, Tag } from "antd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import DefaultLayout from "@/layout/DefaultLayout";
import Link from "next/link";

// Styled components
const ProblemListContainer = styled.div`
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-primary-color);
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const CustomButton = React.memo(styled(Button)`
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
`);


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

const TableStyles = styled.div`
  .custom-table-row-odd {
    background-color: #f7f7f7;
  }

  .custom-table-row-even {
    background-color: #ffffff;
  }
`;

// Generate fake data
const generateFakeData = (count = 30) => {
  const difficulties = ["Easy", "Medium", "Hard"];
  return Array.from({ length: count }, (_, index) => ({
    key: index + 1,
    title: `Problem ${index + 1}`,
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    acceptance: `${Math.floor(Math.random() * 50 + 20)}%`,
  }));
};

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [tagSearchText, setTagSearchText] = useState("");
  const pageSize = 20;

  // Debounce search
  const debounceSearch = useCallback((callback, delay) => {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(value), delay);
    };
  }, []);

  const handleSearch = debounceSearch((value) => {
    setSearchText(value);
    setCurrentPage(1);
  }, 300);

  useEffect(() => {
    const data = generateFakeData(30);
    setAllProblems(data);
    setLoading(false);
  }, []);

  const filteredProblems = useMemo(() => {
    let filtered = allProblems;

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (problem) => problem.difficulty === selectedDifficulty
      );
    }

    if (searchText) {
      filtered = filtered.filter((problem) =>
        problem.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  }, [allProblems, selectedDifficulty, searchText]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1);
  };

  // Fake tag data
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
      key: "title",
      render: (text, record) => (
        <Link href={`/users/problems/${record.key} `}>{text}</Link>
      ),
    },
    { title: "Acceptance", dataIndex: "acceptance", key: "acceptance" }, // Corrected here
    {
      title: "Difficulty",
      dataIndex: "difficulty",
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

  const paginatedProblems = filteredProblems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <DefaultLayout>
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
            <CustomButton >
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
          <TableStyles>
            <Table
              dataSource={paginatedProblems}
              columns={columns}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: filteredProblems.length,
                onChange: handlePageChange,
              }}
              rowClassName={(record, index) =>
                index % 2 === 0
                  ? "custom-table-row-even"
                  : "custom-table-row-odd"
              }
            />
          </TableStyles>
        )}
      </ProblemListContainer>
    </DefaultLayout>
  );
};

export default index;
