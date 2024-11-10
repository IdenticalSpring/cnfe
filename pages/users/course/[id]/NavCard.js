import React from 'react';
import styled from 'styled-components';
import { BookOutlined, PlayCircleOutlined, ChevronRight } from '@mui/icons-material'; // Import thêm icon

const NavCard = ({ activeTab, setActiveTab, chapters, toggleChapter, openChapters, fetchLessonDetails }) => (
    <StyledNavCard>
        <NavItem $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            <BookOutlined style={{ fontSize: '20px' }} />
            Overview
        </NavItem>
        <NavItem $active={activeTab === 'content'} onClick={() => setActiveTab('content')}>
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
                        <LessonItem
                            key={lesson.id}
                            onClick={() => {
                                setActiveTab('content'); // Chuyển sang tab "content"
                                fetchLessonDetails(chapter.id, lesson.id); // Lấy chi tiết bài học
                            }}
                        >
                            <ChevronRight style={{ fontSize: '12px', color: '#999', marginRight: '8px' }} /> {/* Icon từ MUI */}
                            {lesson.title}
                        </LessonItem>
                    ))}
                </LessonList>
            </div>
        ))}
    </StyledNavCard>
);

export default NavCard;

// Styled Components
const StyledNavCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 16px;
  height: 100%; 
  flex-shrink: 0; 
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
  word-wrap: break-word; /* Cho phép văn bản xuống dòng khi cần thiết */
  max-width: 25ch; /* Giới hạn chiều rộng văn bản khoảng 25 ký tự */
`;

const LessonItem = styled.div`
  padding: 12px 16px;
  padding-left: 24px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  word-wrap: break-word; /* Cho phép văn bản xuống dòng khi cần thiết */
  max-width: 25ch; /* Giới hạn chiều rộng văn bản khoảng 25 ký tự */

  &:hover {
    background: #f0f7ff;
    color: #0070f3;
  }
`;

const LessonList = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
`;

