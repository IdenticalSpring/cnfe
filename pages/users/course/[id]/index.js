import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layout/DefaultLayout';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
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
  background: rgba(0, 0, 0, 0.4);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;

const CoursePrice = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
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
  width: 280px;
  background-color: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ContentTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const ChapterItem = styled.div`
  margin-bottom: 12px;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #e6f7ff;
  }
`;

const ChapterTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #0070f3;
  margin: 0;
`;

const LessonList = styled.ul`
  list-style: none;
  padding-left: 16px;
  margin-top: 8px;
`;

const LessonItem = styled.li`
  color: #555;
  cursor: pointer;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: #0070f3;
  }
`;

const MainContentArea = styled.div`
  flex: 1;
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
  const [chapters, setChapters] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  // Lấy thông tin khóa học
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`)
        .then((response) => setCourse(response.data.data))
        .catch((error) => console.error('Error fetching course details:', error));
    }
  }, [id]);

  // Lấy danh sách chương và bài học trong mỗi chương
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chapters/course/${id}`, {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Thay bằng token của bạn nếu cần
          },
        })
        .then((response) => {
          const { data } = response.data;
          if (Array.isArray(data)) {
            const fetchLessonsForChapters = data.map((chapter) =>
              axios
                .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/chapter/${chapter.id}`)
                .then((res) => ({
                  ...chapter,
                  lessons: res.data.data,
                }))
            );
            Promise.all(fetchLessonsForChapters).then((chaptersWithLessons) => {
              setChapters(chaptersWithLessons);
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching chapters and lessons:', error);
          setChapters([]);
        });
    }
  }, [id]);

  const fetchLessonDetails = (lessonId) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${lessonId}`)
      .then((response) => {
        setSelectedLesson(response.data.data);
      })
      .catch((error) => console.error('Error fetching lesson details:', error));
  };

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
            <CoursePrice>${course.price || 89.99}</CoursePrice>
            {course.description && <OverviewText>{course.description}</OverviewText>}
            <FavoriteButton>Favorite</FavoriteButton>
          </HeaderContent>
        </HeaderSection>

        <MainContent>
          <ContentWrapper>
            <Sidebar>
              <ContentTitle>Course Contents</ContentTitle>
              {Array.isArray(chapters) && chapters.map((chapter) => (
                <ChapterItem key={chapter.id}>
                  <ChapterTitle>{chapter.title}</ChapterTitle>
                  <LessonList>
                    {Array.isArray(chapter.lessons) && chapter.lessons.map((lesson) => (
                      <LessonItem key={lesson.id} onClick={() => fetchLessonDetails(lesson.id)}>
                        {lesson.title}
                      </LessonItem>
                    ))}
                  </LessonList>
                </ChapterItem>
              ))}
            </Sidebar>

            <MainContentArea>
              {selectedLesson ? (
                <div>
                  <ContentTitle>{selectedLesson.title}</ContentTitle>
                  <ContentText>
                    <p>{selectedLesson.content.replace(/\\n/g, '\n')}</p>
                  </ContentText>
                </div>
              ) : (
                <ContentText>
                  <p>Welcome to the course! Here you will find a range of lessons and challenges to improve your skills.</p>
                </ContentText>
              )}
            </MainContentArea>
          </ContentWrapper>
        </MainContent>
      </PageWrapper>
    </DefaultLayout>
  );
};

export default CourseDetail;
