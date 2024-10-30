import DefaultLayout from '@/layout/DefaultLayout';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const PageWrapper = styled.div`
  padding: 20px 40px;
`;

const Title = styled.div`
  margin-bottom: 40px;
`;

const WelcomeText = styled.div`
  font-size: 32px;
  color: #8c8c8c;
  font-weight: 400;
`;

const ExploreText = styled.div`
  font-size: 48px;
  font-weight: 500;
  color: #0073E6;
`;

const SlideCard = styled.div`
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  height: 340px;
  display: flex;
  flex-direction: column;
  background: ${props => props.background || '#e6f3ff'};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  position: relative;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const CardTitle = styled.div`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 500;
  color: #262626;
`;

const CardDescription = styled.div`
  padding: 0 20px;
  font-size: 14px;
  color: #595959;
  flex-grow: 1;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const StatsContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  gap: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.3);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatLabel = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  font-weight: 500;
`;

const StatValue = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const SliderWrapper = styled.div`
  .slick-track {
    display: flex;
    .slick-slide {
      height: inherit;
      > div {
        height: 100%;
      }
    }
  }

  .slick-prev, .slick-next {
    z-index: 1;
    &:before {
      color: #0073E6;
      font-size: 24px;
    }
  }
`;

// Hàm lấy màu nền dựa vào index
const getBackgroundColor = (index) => {
  const colors = [
    '#e6f3ff',
    '#e6f0ff',
    '#f9ecff',
    '#e6f3ff',
    '#f3e6ff'
  ];
  return colors[index % colors.length];
};


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Explore = () => {
  const [slidesData, setSlidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const fetchAllCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/courses`);
      const { data } = response.data;
      setSlidesData(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Group data by type for categorized display
  const groupedData = slidesData.reduce((acc, item) => {
    (acc[item.type] = acc[item.type] || []).push(item);
    return acc;
  }, {});

  return (
    <DefaultLayout>
      <PageWrapper>
        <Title>
          <WelcomeText>Welcome to</WelcomeText>
          <ExploreText>Master Coding Explore</ExploreText>
        </Title>

        {/* Render each category of courses */}
        {Object.entries(groupedData).map(([type, courses]) => (
          <div key={type}>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <SliderWrapper>
              <Slider {...settings}>
                {courses.map((course, index) => (
                  <div key={course.id}>
                    <SlideCard background={getBackgroundColor(index)}>
                      <ImageContainer>
                        <SlideImage src={course.imageUrl || "/api/placeholder/400/225"} alt={course.title} />
                      </ImageContainer>
                      <ContentContainer>
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                        <StatsContainer>
                          <StatItem>
                            <StatLabel>Chapters</StatLabel>
                            <StatValue>{course.chapters || '0'}</StatValue>
                          </StatItem>
                          <StatItem>
                            <StatLabel>Items</StatLabel>
                            <StatValue>{course.items || '0'}</StatValue>
                          </StatItem>
                        </StatsContainer>
                      </ContentContainer>
                    </SlideCard>
                  </div>
                ))}
              </Slider>
            </SliderWrapper>
          </div>
        ))}

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading data...
          </div>
        )}
      </PageWrapper>
    </DefaultLayout>
  );
};

export default Explore;
