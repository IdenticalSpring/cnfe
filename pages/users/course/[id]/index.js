import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layout/DefaultLayout';
import styled from 'styled-components';
import {
  MenuBook as BookOutlined,
  PlayCircle as PlayCircleOutlined,
  Message as MessageOutlined,
  Share as ShareAltOutlined
} from '@mui/icons-material';
import { userAPI } from '@/service/user';
import { Modal, Skeleton, notification, message } from 'antd';
import PurchaseCourse from './purchase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';

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
  background: rgba(0, 0, 0, 0.6); /* Màu nền đậm hơn */
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateX(-4px);
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
  padding: 8px 20px; 
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; 
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
  min-height: calc(100vh - 400px); 
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
const PurchaseMessageContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 400px); // Chiều cao bằng với ContentGrid
`;
const PurchaseMessage = styled.div`
  padding: 50px;
  background-color: #ffe6e6;
  color: #d9534f;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
`;

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [openChapters, setOpenChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  const router = useRouter();
  const { id, status, message: statusMessage } = router.query;

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    if (id && userId) {
      setLoading(true);
      Promise.all([
        userAPI.getCourseById(id).then(setCourse),
        userAPI.getChaptersAndLessonsByCourseId(id).then(setChapters),
        userAPI.getPurchaseStatus(userId, id).then((response) => {
          const purchaseStatus = response?.data?.hasPurchased;
          setHasPurchased(purchaseStatus);
        })
      ])
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (status && statusMessage) {
      notification[status === 'completed' ? 'success' : 'warning']({
        message: 'Payment Status',
        description: statusMessage,
      });
    }
  }, [status, statusMessage]);

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const showPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const fetchLessonDetails = (courseId, lessonId) => {
    userAPI.getLessonById(courseId, lessonId)
      .then((lesson) => {
        setSelectedLesson(lesson);
        setActiveTab('content');
      })
      .catch((error) => console.error('Error fetching lesson details:', error));
  };

  const handleShare = () => {
    const courseUrl = `${window.location.origin}/users/course/${id}`;
    navigator.clipboard.writeText(courseUrl).then(() => {
      message.success("Course URL copied to clipboard!");
    }).catch(() => {
      message.error("Failed to copy URL. Please try again.");
    });
  };

  return (
    <DefaultLayout>
      <PageWrapper>
        {loading ? (
          <Skeleton active paragraph={{ rows: 10 }} />
        ) : (
          <>
            <HeaderSection $bgImage={course?.imageUrl}>
              <HeaderContainer>
                  <BackButton onClick={() => router.push('/users/course')}>
                    <ArrowBackIcon style={{ marginRight: '8px' }} />
                    Back to Explore
                  </BackButton>
                <HeaderContent>
                  <CourseTitle>{course?.title}</CourseTitle>
                  <CourseStats>
                    <StatItem>
                      <BookOutlined style={{ fontSize: '16px' }} />
                      {chapters.length} Chapters
                    </StatItem>
                    <StatItem>
                      <PlayCircleOutlined style={{ fontSize: '16px' }} />
                      {chapters.reduce((acc, chapter) => acc + (chapter.lessons?.length || 0), 0)} Lessons
                    </StatItem>
                  </CourseStats>
                  <ActionButtons>
                    {!hasPurchased && (
                      <PrimaryButton onClick={showPurchaseModal}>
                        Start Learning
                      </PrimaryButton>
                    )}
                    <SecondaryButton onClick={handleShare}>
                        <ShareIcon style={{ fontSize: '16px' }} />
                      Share
                    </SecondaryButton>
                  </ActionButtons>
                </HeaderContent>
              </HeaderContainer>
            </HeaderSection>

            <MainContent>
              <ContentGrid>
                {!hasPurchased ? (
                  <PurchaseMessageContainer>
                    <PurchaseMessage>
                      Please purchase the course to access all content.
                    </PurchaseMessage>
                  </PurchaseMessageContainer>
                ) : (
                  <>
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
                              <LessonItem key={lesson.id} onClick={() => fetchLessonDetails(id, lesson.id)}>
                                {lesson.title}
                              </LessonItem>
                            ))}
                          </LessonList>
                        </div>
                      ))}
                    </NavCard>

                    <ContentCard>
                      <TabContent $active={activeTab === 'overview'}>
                        <h2>Course Overview</h2>
                        <p>{course?.description}</p>
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
                    </ContentCard>
                  </>
                )}
              </ContentGrid>
            </MainContent>

            <Modal
              title="Purchase Course"
              open={isPurchaseModalOpen}
              onCancel={closePurchaseModal}
              footer={null}
            >
              <PurchaseCourse onClose={closePurchaseModal} />
            </Modal>
          </>
        )}
      </PageWrapper>
    </DefaultLayout>
  );
};

export default CourseDetail;