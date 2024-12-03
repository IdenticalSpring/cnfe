import React from "react";
import styled from "styled-components";

const ContentCard = ({
  activeTab,
  courseDescription,
  selectedLesson,
  onCompleteLesson,
}) => {
  return (
    <StyledContentCard>
      {activeTab === "overview" ? (
        <TabContent>
          <h2>Course Overview</h2>
          <p>{courseDescription}</p>
        </TabContent>
      ) : (
        <TabContent>
          {selectedLesson ? (
            <div>
              {console.log("Displaying selected lesson:", selectedLesson)}
              <h3>{selectedLesson.title}</h3>
              <p>{selectedLesson.content}</p>
              <CompleteButton
                onClick={() => onCompleteLesson(selectedLesson.id)}
              >
                Mark as Completed
              </CompleteButton>
            </div>
          ) : (
            <p>Select a lesson to view its content.</p>
          )}
        </TabContent>
      )}
    </StyledContentCard>
  );
};

export default ContentCard;

// Styled Components
const StyledContentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
  height: 100%;
  flex: 1;
`;

const TabContent = styled.div`
  display: block;
`;

const CompleteButton = styled.button`
  background-color: #4caf50; /* Màu xanh lá */
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #45a049; /* Màu xanh lá đậm khi hover */
    transform: translateY(-3px); /* Hiệu ứng đẩy lên khi hover */
  }

  &:active {
    background-color: #397d3b; /* Màu khi click */
    transform: translateY(0); /* Trở lại vị trí ban đầu */
  }
`;
