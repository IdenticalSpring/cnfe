// pages/discussions/[id].js

import DefaultLayout from "@/layout/DefaultLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userAPI } from "service/user";
import styled from "styled-components";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const DiscussionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      const fetchDiscussion = async () => {
        try {
          const discussionData = await userAPI.getDiscussionByID(id);
          setDiscussion(discussionData.data);
          setLoading(false);
        } catch (err) {
          setError("Error loading discussion details");
          setLoading(false);
        }
      };

      const fetchComments = async () => {
        try {
          const commentsData = await userAPI.getCommentsByDiscussionID(id);
          const enrichedComments = await Promise.all(
            commentsData.data.map(async (comment) => {
              const commentDetail = await userAPI.getCommentsByCommentID(
                comment.commentId
              );
              return { ...comment, userName: commentDetail[0]?.user.name };
            })
          );
          setComments(enrichedComments);
        } catch (err) {
          console.error("Error loading comments:", err);
          setError("Error loading comments");
        }
      };

      fetchDiscussion();
      fetchComments();
    }
  }, [id]);

  // Hàm xử lý upvote
  const handleUpvote = async () => {
    try {
      await userAPI.upvoteDiscussion(id);
      setDiscussion((prevDiscussion) => ({
        ...prevDiscussion,
        voteUp: prevDiscussion.voteUp + 1,
      }));
    } catch (err) {
      console.error("Error upvoting the discussion:", err);
      setError("Unable to upvote the discussion");
    }
  };
  const handleDownvote = async () => {
    try {
      await userAPI.downvoteDiscussion(id); // Cần thêm hàm downvote trong API của bạn
      setDiscussion((prevDiscussion) => ({
        ...prevDiscussion,
        voteUp: prevDiscussion.voteUp - 1,
      }));
    } catch (err) {
      console.error("Error downvoting the discussion:", err);
      setError("Unable to downvote the discussion");
    }
  };
  // Submit new comment
  const handleSubmitComment = async () => {
    if (newComment.trim() === "") return;

    const discussionId = parseInt(id, 10);
    const userId = 123;

    try {
      const data = await userAPI.submitComment(discussionId, userId, {
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, data.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <DefaultLayout title={discussion?.title}>
      <DiscussionContainer>
        <Title>{discussion?.title}</Title>
        <Content>{discussion?.content}</Content>

        <Footer>
          <VoteButtons>
            {/* Nút Upvote */}
            <VoteButton onClick={handleUpvote}>
              <ArrowDropUpIcon fontSize="small" />
            </VoteButton>
            <VoteCount>{discussion?.voteUp} Votes</VoteCount>

            {/* Nút Downvote */}
            <VoteButton onClick={handleDownvote}>
              <ArrowDropDownIcon fontSize="small" />
            </VoteButton>
          </VoteButtons>

          <CommentsSection>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <CommentButton onClick={handleSubmitComment}>Submit</CommentButton>
          </CommentsSection>

          <CommentsList>
            {comments.map((comments) => (
              <CommentItem key={comments.id}>
                <CommentUser>{comments.userName}</CommentUser>
                <CommentContent>{comments.comments.content}</CommentContent>
                <CommentDate>
                  {new Date(comments.createdAt).toLocaleString()}
                </CommentDate>
              </CommentItem>
            ))}
          </CommentsList>
        </Footer>
      </DiscussionContainer>
    </DefaultLayout>
  );
};

export default DiscussionDetail;

const DiscussionContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

const Content = styled.p`
  margin-top: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const VoteButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const VoteButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const VoteCount = styled.span`
  margin-left: 10px;
  font-size: 1rem;
  color: #555;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: vertical;
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const CommentsList = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const CommentUser = styled.div`
  font-weight: bold;
  color: #333;
`;

const CommentContent = styled.p`
  margin-top: 5px;
  font-size: 1rem;
  color: #555;
`;

const CommentDate = styled.div`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #777;
`;
