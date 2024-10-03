import DefaultLayout from '@/layout/DefaultLayout';
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Skeleton from 'antd/lib/skeleton';
import Input from 'antd/lib/input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const ProblemListContainer = styled.div`
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-primary-color);
  min-height: 100vh;
`;

// Fake Data Generation
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
    const [selectedDifficulty, setSelectedDifficulty] = useState('All'); // Track selected difficulty
    const pageSize = 30;

    useEffect(() => {
        const data = generateFakeData();
        setAllProblems(data);
        setLoading(false);
    }, []);

    // Memoized filtered problems
    const filteredProblems = useMemo(() => {
        let filtered = allProblems;

        if (selectedDifficulty !== 'All') {
            filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty);
        }

        // Update filtered problems based on search text
        if (searchText) {
            filtered = filtered.filter(problem =>
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
        setCurrentPage(1); // Reset to the first page when changing difficulty
    };

    const handleSearch = (value) => {
        setSearchText(value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Updated Menu Items
    // Updated Menu Items with onClick directly in the item structure
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


    // Create a menu from items
    const menu = <Menu items={menuItems} />;

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
            {/* Wrap content in a single parent element */}
            <ProblemListContainer>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomLeft">

                        <Button>
                            Difficulty <ArrowDropDownIcon />
                        </Button>
                    </Dropdown>
                    <Input
                        placeholder="Search problems"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ marginLeft: '20px', width: '200px' }}
                        suffix={<SearchIcon />}
                    />
                </div>

                {loading ? (
                    <Skeleton active paragraph={{ rows: 10 }} />
                ) : (
                    <Table
                        dataSource={paginatedProblems}
                        columns={columns}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: filteredProblems.length,
                            onChange: handlePageChange,
                        }}
                    />
                )}
            </ProblemListContainer>
        </DefaultLayout>
    );
};

export default Problem;
