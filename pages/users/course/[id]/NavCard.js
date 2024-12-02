import React from "react";
import styled from "styled-components";
import BookOutlined from "@mui/icons-material/BookOutlined";
import PlayCircleOutlined from "@mui/icons-material/PlayCircleOutlined";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline"; // Dấu tích


const NavCard = ({
  activeTab,
  setActiveTab,
  chapters,
  toggleChapter,
  openChapters,
  fetchLessonDetails,
}) => (
  <StyledNavCard>
    <NavItem
      $active={activeTab === "overview"}
      onClick={() => setActiveTab("overview")}
    >
      <BookOutlined style={{ fontSize: "20px" }} />
      Overview
    </NavItem>
    <NavItem
      $active={activeTab === "content"}
      onClick={() => setActiveTab("content")}
    >
      <PlayCircleOutlined style={{ fontSize: "20px" }} />
      Course Content
    </NavItem>

    {chapters &&
      chapters.map((chapter) => (
        <div key={chapter.id}>
          <ChapterHeader onClick={() => toggleChapter(chapter.id)}>
            <ChapterTitle>{chapter.title}</ChapterTitle>
            <span>{openChapters[chapter.id] ? "−" : "+"}</span>
          </ChapterHeader>
          <LessonList $open={openChapters[chapter.id]}>
            {chapter.lessons?.map((lesson) => (
              <LessonItem
                key={lesson.id}
                onClick={() => {
                  setActiveTab("content");
                  fetchLessonDetails(chapter.id, lesson.id);
                }}
                $completed={lesson.progresses?.some(progress => progress.status === "completed")} // Kiểm tra trạng thái bài học
              >
                {lesson.progresses?.some(progress => progress.status === "completed") && (
                  <CheckCircleOutline
                    style={{
                      fontSize: "16px",
                      color: "#4CAF50", // Màu xanh cho dấu tích
                      marginRight: "8px",
                    }}
                  />
                )}
                <ChevronRight
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    marginRight: "8px",
                  }}
                />
                {lesson.title}
              </LessonItem>
            ))}
          </LessonList>
        </div>
      ))}
  </StyledNavCard>
);

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
  color: ${({ $active }) => ($active ? "#0070f3" : "#666")};
  background: ${({ $active }) => ($active ? "#f0f7ff" : "transparent")};
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
  word-wrap: break-word;
  max-width: 25ch;
`;

const LessonList = styled.div`
  padding-left: 24px;
  display: ${({ $open }) => ($open ? "block" : "none")};
`;

const LessonItem = styled.div`
  padding: 12px 16px;
  padding-left: 24px;
  cursor: pointer;
  color: ${({ $completed }) => ($completed ? "#4CAF50" : "#666")};  // Màu xanh cho bài đã hoàn thành
  background-color: ${({ $completed }) => ($completed ? "#e8f5e9" : "transparent")}; // Màu nền xanh nhạt cho bài đã hoàn thành
  display: flex;
  align-items: center;
  word-wrap: break-word;
  max-width: 100%;

  &:hover {
    background-color: ${({ $completed }) => ($completed ? "#e8f5e9" : "#f0f7ff")};  // Hover hiệu ứng
  }
`;

export default NavCard;
