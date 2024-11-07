import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layout/DefaultLayout';
import styled from 'styled-components';
import { BookOutlined, PlayCircleOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import { userAPI } from '@/service/user';
import { Skeleton } from 'antd';

const CoursePrice = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;

const NavItem = styled.div`
  padding: 12px; 
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $active }) => ($active ? '#0070f3' : '#666')};
  background: ${({ $active }) => ($active ? '#f0f7ff' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f7ff;
    color: #0070f3;
  }
`;

const HeaderSection = styled.div`
  padding: 32px;
  color: white;
  display: flex;
  align-items: center;
  gap: 32px;
  background-image: ${({ $bgImage }) =>
    $bgImage ? `url(${$bgImage})` : 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 280px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const LessonList = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
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

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-4px);
  }

  &::before {
    content: "←";
    margin-right: 8px;
  }
`;

const HeaderContent = styled.div`
  margin-top: 24px;
`;

const CourseTitle = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 16px 0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
`;

const CourseStats = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const PrimaryButton = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0061d5;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: -60px auto 0;
  padding: 0 32px;
  position: relative;
  z-index: 2;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  margin-top: 40px; 
  margin-bottom: 32px;
`;

const NavCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 16px;
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-top: 16px;
`;

const TabContent = styled.div`
  display: ${({ $active }) => ($active ? 'block' : 'none')};
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChapterItem = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const ChapterHeader = styled.div`
  padding: 16px;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f0f7ff;
  }
`;

const ChapterTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const LessonItem = styled.div`
  padding: 12px 16px;
  padding-left: 40px;
  cursor: pointer;
  color: #666;
  position: relative;

  &:hover {
    background: #f0f7ff;
    color: #0070f3;
  }

  &::before {
    content: "▶";
    position: absolute;
    left: 16px;
    color: #999;
    font-size: 12px;
  }
`;

const DiscussionSection = styled.div`
  margin-top: 24px;
`;

const DiscussionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [openChapters, setOpenChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        userAPI.getCourseById(id).then(setCourse),
        userAPI.getChaptersAndLessonsByCourseId(id).then(setChapters)
      ]).catch((error) => {
        console.error('Error fetching data:', error);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [id]);

  const fetchLessonDetails = (lessonId) => {
    userAPI.getLessonById(lessonId)
      .then((lesson) => {
        setSelectedLesson(lesson);
        setActiveTab('content');
      })
      .catch((error) => console.error('Error fetching lesson details:', error));
  };

  return (
    <DefaultLayout>
      <PageWrapper>
        {loading ? (
          <Skeleton active paragraph={{ rows: 10 }} />
        ) : (
          <>
            <HeaderSection $bgImage={course.imageUrl}>
              <HeaderContainer>
                <BackButton onClick={() => router.push('/users/course')}>Back to Explore</BackButton>
                <HeaderContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseStats>
                    <StatItem>
                      <BookOutlined style={{ fontSize: '16px' }} />
                      {chapters.length} Chapters
                    </StatItem>
                    <StatItem>
                      <PlayCircleOutlined style={{ fontSize: '16px' }} />
                      {chapters.reduce((acc, chapter) => acc + (chapter.lessons?.length || 0), 0)} Lessons
                    </StatItem>
                    <StatItem>
                      <MessageOutlined style={{ fontSize: '16px' }} />
                      24 Discussions
                    </StatItem>
                  </CourseStats>
                  <ActionButtons>
                    <PrimaryButton>Start Learning</PrimaryButton>
                    <SecondaryButton>
                      <ShareAltOutlined style={{ fontSize: '16px' }} />
                      Share
                    </SecondaryButton>
                  </ActionButtons>
                </HeaderContent>
              </HeaderContainer>
            </HeaderSection>

            <MainContent>
              <ContentGrid>
                <NavCard>
                  <NavItem $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                    <BookOutlined style={{ fontSize: '20px' }} />
                    Overview
                  </NavItem>

                  <NavItem $active={activeTab === 'content'}>
                    <PlayCircleOutlined style={{ fontSize: '20px' }} />
                    Course Content
                  </NavItem>

                  {chapters.map((chapter) => (
                    <div key={chapter.id}>
                      <ChapterHeader onClick={() => toggleChapter(chapter.id)}>
                        <ChapterTitle>{chapter.title}</ChapterTitle>
                        <span>{openChapters[chapter.id] ? '−' : '+'}</span>
                      </ChapterHeader>
                      <LessonList $open={openChapters[chapter.id]}>
                        {chapter.lessons?.map((lesson) => (
                          <LessonItem key={lesson.id} onClick={() => fetchLessonDetails(lesson.id)}>
                            {lesson.title}
                          </LessonItem>
                        ))}
                      </LessonList>
                    </div>
                  ))}

                  <NavItem
                    $active={activeTab === 'discussion'}
                    onClick={() => setActiveTab('discussion')}
                    style={{ marginTop: '20px' }}
                  >
                    <MessageOutlined style={{ fontSize: '20px' }} />
                    Discussion
                  </NavItem>
                </NavCard>

                <ContentCard>
                  <TabContent $active={activeTab === 'overview'}>
                    <h2>Course Overview</h2>
                    <p>{course.description}</p>
                  </TabContent>

                  <TabContent $active={activeTab === 'content'}>
                    {selectedLesson ? (
                      <div>
                        <h3>{selectedLesson.title}</h3>
                        <p>{selectedLesson.content}</p>
                      </div>
                    ) : (
                      <p>Select a lesson to view its content.</p>
                    )}
                  </TabContent>

                  <TabContent $active={activeTab === 'discussion'}>
                    <DiscussionHeader>
                      <h2>Discussion Forum</h2>
                      <PrimaryButton>New Discussion</PrimaryButton>
                    </DiscussionHeader>
                  </TabContent>
                </ContentCard>
              </ContentGrid>
            </MainContent>
          </>
        )}
      </PageWrapper>
    </DefaultLayout>
  );
};

export default CourseDetail;
