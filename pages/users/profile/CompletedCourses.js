import React, { useState, useEffect } from 'react';
import { Card, Skeleton, Table, Typography, Empty } from 'antd';
import { BookOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userAPI } from '@/service/user';

const { Text } = Typography;

const CoursesCard = styled(Card)`
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const CompletedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');

        const getCourses = async () => {
            try {
                const completedCourses = await userAPI.fetchCompletedCoursesByUserId(userId);
                setCourses(completedCourses);
            } catch (error) {
                console.error("Failed to fetch completed courses", error);
            } finally {
                setLoading(false);
            }
        };

        getCourses();
    }, []);

    if (loading) {
        return (
            <CoursesCard
                title={
                    <div>
                        <BookOutlined style={{ marginRight: 8 }} />
                        Completed Courses
                    </div>
                }
            >
                <Skeleton active paragraph={{ rows: 4 }} />
            </CoursesCard>
        );
    }

    const columns = [
        {
            title: 'Course Title',
            dataIndex: 'course',
            key: 'course',
            render: (text) => <Text strong>{text.title}</Text>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (
                <div>
                    <DollarOutlined style={{ marginRight: 8 }} />
                    {price}
                </div>
            ),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status) => (
                <Text type={status === 'Paid' ? 'success' : 'default'}>
                    <CheckCircleOutlined style={{ marginRight: 8 }} />
                    {status}
                </Text>
            ),
        },
    ];

    return (
        <CoursesCard
            title={
                <div>
                    <BookOutlined style={{ marginRight: 8 }} />
                    Completed Courses
                </div>
            }
        >
            {courses.length > 0 ? (
                <Table
                    dataSource={courses}
                    columns={columns}
                    rowKey="id"
                />
            ) : (
                <Empty description="No courses completed yet" />
            )}
        </CoursesCard>
    );
};

export default CompletedCourses;
