import DefaultLayout from '@/layout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SlickExplore from './components/slider/SlickExplore';
// import { userAPI } from 'service/user';

// Styled Component cho tiêu đề
const Title = styled.div`
  font-size: 48px;
  font-weight: 300;
  color: #262626;
  margin-bottom: 20px;
`;

const WelcomeText = styled.span`
  font-size: 32px;
  color: #999;
`;

const ExploreText = styled.span`
  font-weight: 600;
  color: #0070f3;
`;

// Styled Component cho Wrapper chính
const PageWrapper = styled.div`
  margin-left: 20px;
`;

const Explore = () => {
  const [slidesData, setSlidesData] = useState([]);

  useEffect(() => {
    // Tạo data giả thay vì gọi API
    const fakeData = [
      { id: 1, title: "LeetCode's Interview Crash Course", subtitle: "Data Structures and Algorithms", chapters: 13, items: 149 },
      { id: 2, title: "System Design Fundamentals", subtitle: "Design Large Scale Systems", chapters: 10, items: 120 },
      { id: 3, title: "JavaScript Algorithms", subtitle: "Learn Algorithms in JavaScript", chapters: 15, items: 180 },
      { id: 4, title: "Python for Data Science", subtitle: "Data Science with Python", chapters: 12, items: 135 },
      { id: 5, title: "ReactJS Essentials", subtitle: "Build Interactive UIs", chapters: 8, items: 90 },
      { id: 6, title: "Java Programming Basics", subtitle: "Learn the Basics of Java", chapters: 10, items: 110 },
      { id: 7, title: "Introduction to Machine Learning", subtitle: "Foundations of ML", chapters: 9, items: 150 },
      { id: 8, title: "Web Development Bootcamp", subtitle: "Full Stack Web Development", chapters: 20, items: 200 },
      { id: 9, title: "Mobile App Development", subtitle: "Create Apps for iOS and Android", chapters: 16, items: 175 },
      { id: 10, title: "Cloud Computing Essentials", subtitle: "Understanding Cloud Services", chapters: 14, items: 160 },
    ];
    

    setSlidesData(fakeData); // Gán data giả vào state

    // Comment lại phần API call
    /*
    const fetchData = async () => {
      try {
        const response = await userAPI.getAllEx();
        setSlidesData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    */
  }, []);

  return (
    <DefaultLayout>
      <PageWrapper>
        <Title>
          <WelcomeText>Welcome to</WelcomeText> <br /> <ExploreText>LeetCode Explore</ExploreText>
        </Title>
        <SlickExplore title="First Slider" slidesData={slidesData} />
      </PageWrapper>
    </DefaultLayout>
  );
};

export default Explore;
