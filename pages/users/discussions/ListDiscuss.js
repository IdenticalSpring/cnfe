import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Pagination, Skeleton, Button, Input, Divider } from "antd";
import { userAPI } from "service/user";
import {
  ThumbUpAltOutlined,
  VisibilityOutlined,
  SearchOutlined,
  Cookie,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import EjectIcon from "@mui/icons-material/Eject";
import PostDiscussion from "./create_discussion";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { formatDate } from "@/utils/dateUtils";
import { useRouter } from "next/router";

const DiscussionItem = styled.div`
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s ease;
  border-bottom: 2px solid var(--background-hover-color);
`;

const DiscussionTitle = styled.h2`
  font-size: 16px;
  color: var(--primary-color);
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
  padding: 0;
  width: fit-content;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--link-hover-color);
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 10%;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #888;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 20px 0;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid var(--background-hover-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const NewButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: var(--orange-color) !important;
  border: none;
  color: white !important;
`;
const StyledDivider = styled(Divider)`
  border-color: var(--grey-color) !important;
  border-width: 2px !important;
`;
const DateText = styled.span`
  font-size: 12px;
  color: #666;
  display: inline-block;
  cursor: text;
`;
const ListDiscuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  const router = useRouter();

  const handleTitleClick = (discussionId) => {
    router.push(`/users/discussions/${discussionId}`);
  };
  // Hàm giải mã token
  const getUserIdFromToken = () => {
    try {
      const token = Cookies.get("token");
      const decodedToken = jwtDecode(token);
      return decodedToken?.sub || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Fetch danh sách thảo luận
  const fetchDiscussions = async (currentPage) => {
    try {
      setLoading(true);
      const response = await userAPI.getAllDiscussionsByPage(currentPage);
      console.log("API response:", response);

      const {
        data,
        currentPage: serverPage,
        totalPages,
        totalItems,
      } = response;

      setDiscussions(data || []);
      setPage(serverPage || 1);
      setTotalPages(totalPages || 0);
      setTotalItems(totalItems || 0);
      setLoading(false);
    } catch (err) {
      setError("Error fetching discussions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions(page);
  }, [page]);

  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    fetchDiscussions(page);
  };

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div>
      <NavWrapper>
        {loading ? (
          <Skeleton.Button
            active={true}
            size="large"
            style={{ width: 100, height: 36 }}
          />
        ) : (
          <NewButton icon={<AddIcon />} onClick={showModal}>
            New
          </NewButton>
        )}

        {loading ? (
          <Skeleton.Input
            active={true}
            style={{ width: "25%", borderRadius: "8px" }}
          />
        ) : (
          <Input
            placeholder="Search for discussions..."
            suffix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: "8px", width: "25%" }}
          />
        )}
      </NavWrapper>
      {loading ? (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              active
              paragraph={{ rows: 2 }}
              style={{ marginBottom: "20px" }}
            />
          ))}
        </>
      ) : filteredDiscussions.length === 0 ? (
        <p>No discussions found</p>
      ) : (
        filteredDiscussions.map((discussion) => (
          <div key={discussion.id}>
            <DiscussionItem>
              <div>
                <DiscussionTitle
                  onClick={() => handleTitleClick(discussion.id)}
                >
                  {discussion.title}
                </DiscussionTitle>
                <DateText>Create by: {discussion.username} </DateText>
                <StyledDivider type="vertical" />
                <DateText>
                  Created at: {formatDate(discussion.createdAt)}{" "}
                </DateText>
              </div>

              <StatsWrapper>
                <StatItem>
                  <EjectIcon fontSize="small" />
                  {discussion.voteUp}
                </StatItem>
                <StatItem>
                  <VisibilityOutlined fontSize="small" />
                  {discussion.views}
                </StatItem>
              </StatsWrapper>
            </DiscussionItem>
          </div>
        ))
      )}
      <PaginationWrapper>
        <Pagination
          current={page}
          total={totalItems}
          pageSize={20}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </PaginationWrapper>
      {/* Modal PostDiscussion */}
      <PostDiscussion
        visible={isModalVisible}
        onClose={handleModalClose}
        userId={userId}
      />
    </div>
  );
};

export default ListDiscuss;
