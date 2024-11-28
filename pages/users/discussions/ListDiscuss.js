import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Pagination, Skeleton, Button, Input } from "antd";
import { userAPI } from "service/user";
import {
  ThumbUpAltOutlined,
  VisibilityOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const DiscussionItem = styled.div`
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  transition: transform 0.2s ease;
  border-bottom: 2px solid var(--background-hover-color);
`;

const DiscussionTitle = styled.h2`
  font-size: 16px;
  color: var(--primary-color);
  margin-bottom: 10px;
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
  justify-content: space-between;
  align-items: center;
  gap: 40px;
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

const ListDiscuss = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchDiscussions = async (currentPage) => {
    try {
      setLoading(true);
      const response = await userAPI.getAllDiscussionsByPage(currentPage);
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

  const handlePageChange = (page) => {
    setPage(page);
  };

  const filteredDiscussions = discussions.filter((discussion) =>
    discussion.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div>
      {/* Nút "New" */}
      <NavWrapper>
        <Button
          icon={<AddIcon />}
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
            backgroundColor: "#FC8F54",
          }}
        >
          New
        </Button>

        <Input
          placeholder="Search for discussions..."
          suffix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ borderRadius: "8px", width: "25%" }}
        />
      </NavWrapper>

      {/* Thanh tìm kiếm */}

      {/* Danh sách các cuộc thảo luận */}
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
            <StyledLink href={`discussions/${discussion.id}`} passHref>
              <DiscussionItem>
                <div>
                  <DiscussionTitle>{discussion.title}</DiscussionTitle>
                </div>

                <StatsWrapper>
                  <StatItem>
                    <ThumbUpAltOutlined fontSize="small" />
                    {discussion.voteUp}
                  </StatItem>
                  <StatItem>
                    <VisibilityOutlined fontSize="small" />
                    {discussion.views}
                  </StatItem>
                </StatsWrapper>
              </DiscussionItem>
            </StyledLink>
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
    </div>
  );
};

export default ListDiscuss;
