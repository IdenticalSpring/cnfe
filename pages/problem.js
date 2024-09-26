import DefaultLayout from '@/layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
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
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const pageSize = 30;

    useEffect(() => {
        const allProblems = generateFakeData();
        setFilteredProblems(allProblems);
        setLoading(false);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filterByDifficulty = (difficulty) => {
        setLoading(true);
        const allProblems = generateFakeData();
        setTimeout(() => {
            if (difficulty === 'All') {
                setFilteredProblems(allProblems);
            } else {
                setFilteredProblems(allProblems.filter(problem => problem.difficulty === difficulty));
            }
            setCurrentPage(1);
            setLoading(false);
        }, 1000);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        const allProblems = generateFakeData();
        const filtered = allProblems.filter(problem => problem.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredProblems(filtered);
        setCurrentPage(1);
    };

    const menu = (
        <Menu>
            <Menu.Item key="all" onClick={() => filterByDifficulty('All')}>
                <span style={{ color: 'inherit' }}>All</span>
            </Menu.Item>
            <Menu.Item key="easy" onClick={() => filterByDifficulty('Easy')}>
                <span style={{ color: 'green' }}>Easy</span>
            </Menu.Item>
            <Menu.Item key="medium" onClick={() => filterByDifficulty('Medium')}>
                <span style={{ color: 'orange' }}>Medium</span>
            </Menu.Item>
            <Menu.Item key="hard" onClick={() => filterByDifficulty('Hard')}>
                <span style={{ color: 'red' }}>Hard</span>
            </Menu.Item>
        </Menu>
    );

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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Dropdown overlay={menu} placement="bottomLeft">
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
