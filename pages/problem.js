import DefaultLayout from '@/layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Table, Button, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search'; // Nhập biểu tượng tìm kiếm

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

const allProblems = generateFakeData();

const Problem = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(''); // Trạng thái để lưu tìm kiếm
    const pageSize = 30;

    useEffect(() => {
        setTimeout(() => {
            setFilteredProblems(allProblems);
            setLoading(false);
        }, 2000);
    }, []);

    // Handle pagination change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Filter by difficulty
    const filterByDifficulty = (difficulty) => {
        setLoading(true);

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

    // Handle search
    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = allProblems.filter(problem => problem.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredProblems(filtered);
        setCurrentPage(1); // Đặt lại trang về 1 sau khi tìm kiếm
    };


    const menu = (
        <Menu>
            <Menu.Item onClick={() => filterByDifficulty('All')} style={{ color: 'inherit' }}>All</Menu.Item>
            <Menu.Item onClick={() => filterByDifficulty('Easy')} style={{ color: 'green' }}>Easy</Menu.Item>
            <Menu.Item onClick={() => filterByDifficulty('Medium')} style={{ color: 'orange' }}>Medium</Menu.Item>
            <Menu.Item onClick={() => filterByDifficulty('Hard')} style={{ color: 'red' }}>Hard</Menu.Item>
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

    // Calculate paginated data
    const paginatedProblems = filteredProblems.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <DefaultLayout>
            <ProblemListContainer>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Button>Difficulty <ArrowDropDownIcon /></Button>
                    </Dropdown>
                    <Input
                        placeholder="Search problems"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ marginLeft: '20px', width: '200px' }}
                        suffix={<SearchIcon />} // Thêm biểu tượng tìm kiếm
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
