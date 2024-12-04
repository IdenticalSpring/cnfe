// pages/discussions/[id].js

import DefaultLayout from "@/layout/DefaultLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userAPI } from "service/user";
import styled from "styled-components";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Tooltip,
  notification,
  message,
  Pagination,
  Input,
  Skeleton,
} from "antd";
const { TextArea } = Input;
import { ArrowBack } from "@mui/icons-material"; // Import icon

const DiscussionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kiểm tra đăng nhập từ sessionStorage
  const [upvoted, setUpvoted] = useState(false); // Trạng thái cho upvote
  const [downvoted, setDownvoted] = useState(false); // Trạng thái cho downvote

  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  const getUserIdFromSession = () => {
    const userId = sessionStorage.getItem("userId");
    return userId || null;
  };
  const handleBackClick = () => {
    router.push("/users/discussions"); // Điều hướng về trang ListDiscuss
  };
  useEffect(() => {
    const userId = getUserIdFromSession();
    setUserId(userId);
    setIsLoggedIn(!!userId); // Kiểm tra người dùng đã đăng nhập hay chưa
  }, []);

  // Kiểm tra xem người dùng đã đăng nhập chưa
  const checkIfLoggedIn = () => {
    if (!userId || !isLoggedIn) {
      notification.warning({
        message: "You are not logged in", // Tiêu đề thông báo
        description: "Please log in to perform this action.", // Mô tả thông báo
        placement: "bottomRight", // Vị trí thông báo
        duration: 3, // Thời gian hiển thị thông báo
      });
      return false; // Nếu chưa đăng nhập, trả về false
    }
    return true; // Nếu đã đăng nhập, trả về true
  };

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

  // Hàm fetch các comment
  const fetchComments = async (page = 1) => {
    try {
      const commentsData = await userAPI.getCommentsByDiscussionID(id, page);
      const enrichedComments = await Promise.all(
        commentsData.data.map(async (comment) => {
          const commentDetail = await userAPI.getCommentsByCommentID(
            comment.commentId
          );
          return { ...comment, userName: commentDetail[0]?.user.name };
        })
      );

      setComments(enrichedComments);
      setCurrentPage(page); // Cập nhật trang hiện tại
      setTotalPages(Math.ceil(commentsData.total / commentsData.limit)); // Tính tổng số trang
    } catch (err) {
      console.error("Error loading comments:", err);
      setError("Error loading comments");
    }
  };

  // Hàm submit comment
  const handleSubmitComment = async () => {
    if (!checkIfLoggedIn()) return; // Kiểm tra đăng nhập

    if (newComment.trim() === "") return;

    const discussionId = parseInt(id, 10);

    try {
      const data = await userAPI.submitComment(discussionId, userId, {
        content: newComment,
      });

      // Thêm comment mới vào đầu danh sách comments
      setComments((prevComments) => [data.data, ...prevComments]);

      // Reset input comment
      setNewComment("");

      // Hiển thị thông báo thành công
      notification.success({
        message: "Comment Posted",
        description: "Your comment has been posted successfully.",
        placement: "bottomRight",
      });

      // Gọi lại fetchComments để cập nhật danh sách comment mới nhất
      fetchComments(); // Thực hiện lại fetch để lấy danh sách comments mới nhất
    } catch (err) {
      console.error("Error submitting comment:", err);
      // Hiển thị thông báo lỗi
      notification.error({
        message: "Error Occurred",
        description: "Unable to post your comment. Please try again.",
        placement: "bottomRight",
      });
    }
  };

  // Lấy thông tin discussion và comments khi id thay đổi
  useEffect(() => {
    if (id) {
      fetchDiscussion();
      fetchComments(currentPage); // Lấy comments cho trang hiện tại
    }
  }, [id, currentPage]);

  const handleUpvote = async () => {
    if (!checkIfLoggedIn()) return;

    try {
      await userAPI.upVoteDiscussion(userId, id);
      setDiscussion((prevDiscussion) => ({
        ...prevDiscussion,
        voteUp: prevDiscussion.voteUp + 1,
      }));
      setUpvoted(true); // Đánh dấu đã upvote
      setDownvoted(false); // Đảm bảo downvote được reset

      message.success("You have successfully upvoted this discussion.");
    } catch (err) {
      console.error("Error upvoting the discussion:", err);
      message.error("Unable to upvote the discussion. Please try again.");
    }
  };

  const handleDownvote = async () => {
    if (!checkIfLoggedIn()) return;

    try {
      await userAPI.downVoteDiscussion(userId, id);
      setDiscussion((prevDiscussion) => ({
        ...prevDiscussion,
        voteUp: prevDiscussion.voteUp - 1,
      }));
      setDownvoted(true); // Đánh dấu đã downvote
      setUpvoted(false); // Đảm bảo upvote được reset

      message.success("You have successfully downvoted this discussion.");
    } catch (err) {
      console.error("Error downvoting the discussion:", err);
      message.error("Unable to downvote the discussion. Please try again.");
    }
  };
  const handlePageChange = (page) => {
    fetchComments(page); // Gọi lại fetchComments với trang mới
  };
  return (
    <DefaultLayout title={discussion?.title}>
      <ContainerDis>
        {loading ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : (
          <TitleSection>
            <Tooltip title="Back to Discuss" placement="bottom">
              <BackButton onClick={handleBackClick}>
                <ArrowBack />
              </BackButton>
            </Tooltip>
            <Title>{discussion?.title}</Title>
          </TitleSection>
        )}

        {loading ? (
          <Skeleton paragraph={{ rows: 2 }} />
        ) : (
          <Content>{discussion?.content}</Content>
        )}

        {loading ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : (
          <VoteButtons>
            <Tooltip title="Upvote" placement="bottom">
              <VoteButton
                onClick={handleUpvote}
                disabled={upvoted}
                style={{
                  backgroundColor: upvoted ? "var(--grey-color)" : "white",
                  cursor: upvoted ? "not-allowed" : "pointer",
                }}
              >
                <ArrowDropUpIcon />
              </VoteButton>
            </Tooltip>
            <VoteCount>{discussion?.voteUp}</VoteCount>
            <Tooltip title="Downvote" placement="bottom">
              <VoteButton
                onClick={handleDownvote}
                disabled={downvoted}
                style={{
                  backgroundColor: downvoted ? "var(--grey-color)" : "white",
                  cursor: downvoted ? "not-allowed" : "pointer",
                }}
              >
                <ArrowDropDownIcon />
              </VoteButton>
            </Tooltip>
          </VoteButtons>
        )}

        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : (
          <CommentsSection>
            <TextArea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              rows={4}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
            <CommentButton onClick={handleSubmitComment}>Submit</CommentButton>
          </CommentsSection>
        )}

        {loading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <CommentsList>
            <hr />
            {comments.length === 0 ? (
              <p style={{ textAlign: "center", color: "gray" }}>
                No comments yet
              </p>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentUser>{comment.userName}</CommentUser>
                  <CommentContent>{comment.comments?.content}</CommentContent>
                  <CommentDate>
                    {new Date(comment.createdAt).toLocaleString()}
                  </CommentDate>
                </CommentItem>
              ))
            )}
          </CommentsList>
        )}

        {loading ? (
          <Skeleton active paragraph={{ rows: 1 }} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Pagination
              current={currentPage}
              total={totalPages * 10} // totalPages * limit (10 items per page)
              pageSize={10}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </ContainerDis>
    </DefaultLayout>
  );
};

export default DiscussionDetail;

const ContainerDis = styled.div`
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;

const Content = styled.p`
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.6;
`;

const VoteButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
`;

const VoteButton = styled.button`
  padding: 5px;
  cursor: pointer;
  border: 1px solid #555;

  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const VoteCount = styled.span`
  font-size: 14;
  color: #555;
`;

const CommentsSection = styled.div`
  margin-top: 20px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Giữa icon và tiêu đề */
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: var(--grey-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  transition: background-color 0.3s;
  align-items: center;
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
  margin-bottom: 10px;
  color: #333;
`;

const CommentContent = styled.p`
  margin-top: 5px;
  font-size: 1rem;
  color: #555;
`;

const CommentDate = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #777;
  text-align: right;
`;
const BackButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 8px;
  border: none;
  background: none;
  cursor: pointer;
  color: #555;
  transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
`;
