import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { userAPI } from "service/user";
import { Input, Tag, Skeleton } from "antd";
import SearchIcon from "@mui/icons-material/Search";

const ContentBox = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 10px;
  color: var(--orange-color);
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 15px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;

  @media (max-width: 768px) {
    gap: 8px;
    max-height: 300px;
  }
`;

const CustomTag = styled(Tag)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  padding: 4px 10px;
  background-color: #f0f0f0;
  border-radius: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const Tags = () => {
  const [searchText, setSearchText] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getAllTags();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const filteredTags = Array.isArray(tags)
    ? tags.filter((tag) =>
        tag.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <ContentBox>
      <Title>Tags</Title>
      <SearchContainer>
        <Input
          placeholder="Search for a tags..."
          suffix={<SearchIcon />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </SearchContainer>
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <TagList>
          {filteredTags.map((tag) => (
            <CustomTag key={tag.id}>{tag.name}</CustomTag>
          ))}
        </TagList>
      )}
    </ContentBox>
  );
};

export default Tags;
