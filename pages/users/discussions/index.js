import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userAPI } from "service/user";
import styled from "styled-components";
import Categories from "../components/categories/tabs";
import Tags from "../components/categories/tags";
import DefaultLayout from "@/layout/DefaultLayout";
import Modal from "react-modal";
import DiscussionCreatePage from "../components/button_new_discussion/button-create";

// Styled components
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
`;

const LeftPanel = styled.div`
  flex: 0 0 70%;
`;

const RightPanel = styled.div`
  flex: 0 0 28%;
  padding-left: 20px;
`;

const DiscussionList = styled.ul`
  flex: 8;
  margin-left: 100px;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-primary-color);
  min-height: 100vh;
  width: 100%;

  @media (max-width: 1024px) {
    margin: 0 20px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    margin: 0 10px;
  }
`;

const DiscussionItem = styled.li`
  background-color: #fff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const DiscussionTitle = styled.h2`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 10px;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
  }
`;

const DiscussionContent = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const Stats = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
`;

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchDiscussions = async (page) => {
    try {
      const data = await userAPI.getAllDiscussions(page);
      console.log("Fetched Discussions:", data); // Check the structure of the returned data
      setDiscussions(data.data || []);
      setLoading(false);
    } catch (err) {
      setError("Error fetching discussions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <DefaultLayout>
      <Container>
        <LeftPanel>
          <Categories />
          <DiscussionCreatePage />
          {discussions.length === 0 ? (
            <p>No discussions found</p>
          ) : (
            <DiscussionList>
              {Array.isArray(discussions) &&
                discussions.map((discussion) => (
                  <li key={discussion.id}>
                    <Link href={`discussions/${discussion.id}`} passHref>
                      <DiscussionItem>
                        <DiscussionTitle>{discussion.title}</DiscussionTitle>
                        <DiscussionContent>
                          {discussion.content}
                        </DiscussionContent>
                        <Stats>
                          Votes: {discussion.voteUp} | Views: {discussion.views}
                        </Stats>
                      </DiscussionItem>
                    </Link>
                  </li>
                ))}
            </DiscussionList>
          )}
          <PaginationControls>
            <Button onClick={handlePrevPage} disabled={page === 1}>
              Previous
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
          </PaginationControls>
        </LeftPanel>

        <RightPanel>
          <Tags />
        </RightPanel>
      </Container>
    </DefaultLayout>
  );
};

export default Discussions;
