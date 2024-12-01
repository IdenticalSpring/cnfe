import React from "react";
import styled from "styled-components";

const DiscussionItemContainer = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const DiscussionContent = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const DiscussionTitle = styled.h3`
  font-weight: bold;
`;

const DiscussionMeta = styled.div`
  font-size: 0.9em;
  color: #888;
`;

const DiscussionStats = styled.div`
  font-size: 0.9em;
  color: #888;
`;

const DiscussionItem = ({ discussion }) => {
  if (!discussion) return null;

  return (
    <DiscussionItemContainer>
      <DiscussionContent>
        <DiscussionTitle>{discussion.title}</DiscussionTitle>
        <DiscussionMeta>{discussion.content}</DiscussionMeta>
        <DiscussionStats>
          <span>Upvotes: {discussion.voteUp}</span> |
          <span> Views: {discussion.views}</span>
        </DiscussionStats>
      </DiscussionContent>
    </DiscussionItemContainer>
  );
};

export default DiscussionItem;
