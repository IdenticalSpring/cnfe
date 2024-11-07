import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layout/DefaultLayout';
import axios from 'axios';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  padding: 32px;
  color: white;
  display: flex;
  align-items: center;
  gap: 32px;
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'linear-gradient(135deg, #6d37b0 0%, #8754d5 100%)')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0 0 24px 24px;
`;

const BackButton = styled.button`
  background: rgba(0, 0, 0, 0.4); /* Lớp phủ đen mờ */
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 18px; /* Tăng kích thước font */
  padding: 8px 12px; /* Thêm khoảng đệm cho nút */
  border-radius: 8px; /* Bo góc cho nút */
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6); /* Hiệu ứng khi hover */
  }

  &::before {
    content: "←";
    margin-right: 8px;
  }
`;


const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CourseTitle = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8); /* Thêm viền đen cho chữ */
`;

const CoursePrice = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8); /* Thêm viền đen cho chữ */
`;

const FavoriteButton = styled.button`
  background-color: #ffd700;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;

  &:hover {
    background-color: #ffed4a;
  }

  &::before {
    content: "⭐";
  }
`;

const OverviewText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8); /* Thêm viền đen cho chữ */
`;

const MainContent = styled.div`
  background: white;
  border-radius: 24px 24px 0 0;
  min-height: 100vh;
  padding: 32px;
  margin-top: -24px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 32px;
`;

const Sidebar = styled.div`
  width: 256px;
  flex-shrink: 0;
`;

const MainContentArea = styled.div`
  flex: 1;
`;

const ContentTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

const ContentText = styled.div`
  color: #666;
  line-height: 1.6;

  p {
    margin-bottom: 24px;
  }
`;

const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`)
                .then((response) => setCourse(response.data.data))
                .catch((error) => console.error('Error fetching course details:', error));
        }
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <DefaultLayout>
            <PageWrapper>
                <HeaderSection imageUrl={course.imageUrl}>
                    <BackButton onClick={() => router.push('/users/course')}>
                        Back to Explore
                    </BackButton>

                    <HeaderContent>
                        <CourseTitle>{course.title}</CourseTitle>
                        <CoursePrice>$89.99</CoursePrice> {/* Cập nhật giá động nếu cần */}
                        {course.description && <OverviewText>{course.description}</OverviewText>}
                        <FavoriteButton>Favorite</FavoriteButton>
                    </HeaderContent>
                </HeaderSection>

                <MainContent>
                    <ContentWrapper>
                        <Sidebar>
                          
                        </Sidebar>

                        <MainContentArea>
                            <ContentTitle>Introduction</ContentTitle>
                            <ContentText>
                        
                            </ContentText>
                        </MainContentArea>
                    </ContentWrapper>
                </MainContent>
            </PageWrapper>
        </DefaultLayout>
    );
};

export default CourseDetail;
