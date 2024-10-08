import DefaultLayout from '@/layout/DefaultLayout';
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Dropdown, Table, Button, Skeleton, Input, Tag } from 'antd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

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
`;

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #f6f8fa;
  border-radius: 8px;
  font-size: 14px;
  height: 40px;
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

// Custom styles for alternating rows
const TableStyles = styled.div`
  .custom-table-row-odd {
    background-color: #f7f7f7; /* Light gray for odd rows */
  }

  .custom-table-row-even {
    background-color: #ffffff; /* White for even rows */
  }
`;

// Function to generate fake problems data
const generateFakeData = () => {
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const problems = [];

    for (let i = 1; i <= 100; i++) {
        problems.push({
            key: i,
            title: `Problem ${i}`,
            difficulty: difficulties[Math.floor(Math.random() * 3)],
            acceptance: `${Math.floor(Math.random() * 50 + 20)}%`,
        });
    }

    return problems;
};

const Problem = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allProblems, setAllProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [tagSearchText, setTagSearchText] = useState(''); // For searching tags
    const pageSize = 30;

    useEffect(() => {
        const data = generateFakeData();
        setAllProblems(data);
        setLoading(false);
    }, []);

    const filteredProblems = useMemo(() => {
        let filtered = allProblems;

        if (selectedDifficulty !== 'All') {
            filtered = filtered.filter((problem) => problem.difficulty === selectedDifficulty);
        }

        if (searchText) {
            filtered = filtered.filter((problem) =>
                problem.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        return filtered;
    }, [allProblems, selectedDifficulty, searchText]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDifficultyChange = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setCurrentPage(1);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    // Fake tag data
    const tagData = [
        { text: 'Array', count: 1750 },
        { text: 'String', count: 726 },
        { text: 'Hash Table', count: 629 },
        { text: 'Dynamic Programming', count: 533 },
        { text: 'Math', count: 523 },
        { text: 'Sorting', count: 415 },
        { text: 'Greedy', count: 383 },
    ];

    // Filtered tags based on search input
    const filteredTags = tagData.filter((tag) =>
        tag.text.toLowerCase().includes(tagSearchText.toLowerCase())
    );

    // Custom Dropdown for Tags with search bar
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
                        <span style={{ marginLeft: '5px', fontWeight: 'bold', color: 'orange' }}>{tag.count}</span>
                    </CustomTag>
                ))}
            </TagList>
        </TagDropdownContainer>
    );

    const menuItems = [
        {
            key: 'all',
            label: 'All',
            onClick: () => handleDifficultyChange('All'),
        },
        {
            key: 'easy',
            label: <span style={{ color: 'green' }}>Easy</span>,
            onClick: () => handleDifficultyChange('Easy'),
        },
        {
            key: 'medium',
            label: <span style={{ color: 'orange' }}>Medium</span>,
            onClick: () => handleDifficultyChange('Medium'),
        },
        {
            key: 'hard',
            label: <span style={{ color: 'red' }}>Hard</span>,
            onClick: () => handleDifficultyChange('Hard'),
        },
    ];

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Acceptance',
            dataIndex: 'acceptance',
            key: 'acceptance',
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty',
            render: (text) => (
                <span style={{ color: text === 'Easy' ? 'green' : text === 'Medium' ? 'orange' : 'red' }}>
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
                    {/* Dropdown for Difficulty */}
                    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomLeft">
                        <CustomButton>
                            Difficulty <ArrowDropDownIcon />
                        </CustomButton>
                    </Dropdown>

                    {/* Dropdown for Tags using custom tagMenu */}
                    <Dropdown trigger={['click']} placement="bottomLeft" dropdownRender={() => tagMenu}>
                        <CustomButton style={{ marginLeft: '10px' }}>
                            Tags <ArrowDropDownIcon />
                        </CustomButton>
                    </Dropdown>

                    <Input
                        placeholder="Search problems"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ marginLeft: '20px', width: '200px', borderRadius: '8px' }}
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
                                index % 2 === 0 ? 'custom-table-row-even' : 'custom-table-row-odd'
                            }
                        />
                    </TableStyles>
                )}
            </ProblemListContainer>
        </DefaultLayout>
    );
};

export default Problem;
