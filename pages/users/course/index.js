import DefaultLayout from '@/layout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { userAPI } from '@/service/user';
import { Skeleton } from 'antd';

const PageWrapper = styled.div`
  padding: 40px 60px;
  background: #f9fbfc;
  min-height: 100vh;
`;

const Title = styled.div`
  margin-bottom: 60px;
  text-align: center;
`;

const WelcomeText = styled.div`
  font-size: 36px;
  color: #8c8c8c;
  font-weight: 400;
`;

const ExploreText = styled.div`
  font-size: 52px;
  font-weight: 700;
  color: #0073E6;
  position: relative;
  display: inline-block;
  margin-top: 10px;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #0073E6;
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin: 50px 0 30px;
  font-weight: 600;
  position: relative;

  &:before {
    content: '';
    width: 6px;
    height: 100%;
    background: #0073E6;
    position: absolute;
    left: -20px;
    top: 0;
    border-radius: 3px;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 20px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for better design */
  }
`;

const SlideCard = styled.div`
  min-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;
  background: ${props => props.background || '#e6f3ff'};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 115, 230, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;

  ${SlideCard}:hover & {
    transform: scale(1.05);
  }
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const CardDescription = styled.div`
  font-size: 15px;
  color: #595959;
  flex-grow: 1;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #f8f9fb;
  border-top: 1px solid #e0e0e0;
  font-size: 14px;
  color: #666;
`;

const StatItem = styled.div`
  font-weight: 500;
`;

const PlaceholderText = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  text-align: center;
  padding: 20px;
`;

const Explore = () => {
  const [learnCourses, setLearnCourses] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [interviewCourses, setInterviewCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const learn = await userAPI.fetchCoursesByType('learn');
        const featured = await userAPI.fetchCoursesByType('featured');
        const interview = await userAPI.fetchCoursesByType('interview');

        setLearnCourses(learn);
        setFeaturedCourses(featured);
        setInterviewCourses(interview);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const renderSkeletons = () => (
    <SlideContainer>
      {[...Array(4)].map((_, index) => (
        <Skeleton active key={index} paragraph={{ rows: 4 }} />
      ))}
    </SlideContainer>
  );

  const renderCourses = (courses, type) => {
    if (loading) return renderSkeletons();
    if (!Array.isArray(courses) || courses.length === 0) {
      return <PlaceholderText>No {type} courses available.</PlaceholderText>;
    }

    return (
      <SlideContainer>
        {courses.map((course, index) => (
          <Link key={course.id} href={`/users/course/${course.id}`} passHref>
            <SlideCard background={index % 2 === 0 ? '#e6f3ff' : '#f9f0ff'}>
              <ImageContainer>
                <SlideImage src={course.imageUrl || "/api/placeholder/400/225"} alt={course.title} />
              </ImageContainer>
              <ContentContainer>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description || "No description available"}</CardDescription>
              </ContentContainer>
              <StatsContainer>
                <StatItem>Chapters: {course.chapterCount || '0'}</StatItem>
                <StatItem>Items: {course.itemCount || '0'}</StatItem>
              </StatsContainer>
            </SlideCard>
          </Link>
        ))}
      </SlideContainer>
    );
  };

  return (
    <DefaultLayout>
      <PageWrapper>
        <Title>
          <WelcomeText>Welcome to</WelcomeText>
          <ExploreText>Master Coding Explore</ExploreText>
        </Title>

        <SectionTitle>Learn Courses</SectionTitle>
        {renderCourses(learnCourses, "learn")}

        <SectionTitle>Featured Courses</SectionTitle>
        {renderCourses(featuredCourses, "featured")}

        <SectionTitle>Interview Courses</SectionTitle>
        {renderCourses(interviewCourses, "interview")}
      </PageWrapper>
    </DefaultLayout>
  );
};

export default Explore;
