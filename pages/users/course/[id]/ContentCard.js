import React from 'react';
import styled from 'styled-components';

const ContentCard = ({ activeTab, courseDescription, selectedLesson }) => {
    return (
        <StyledContentCard>
            {activeTab === 'overview' ? (
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
