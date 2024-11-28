import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userAPI } from "service/user";
import { Skeleton, Empty } from "antd";

const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 10px 0px;
  background-color: var(--background-hover-color);
  justify-content: space-between;
  flex-wrap: wrap;
`;

// Từng tab
const TabItem = styled.div`
  padding: 0px 15px;
  width: 150px;
  height: 120px;
  min-height: 50px;
  background-color: ${({ $isActive }) => ($isActive ? "#FDE7BB" : "#ffffff")};
  border: 2px solid ${({ $isActive }) => ($isActive ? "#FC8F54" : "default")};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.1s ease, color 0.1s ease,
    border-color 0.1s ease;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getCategories();
        setActiveCategory(data[0].id);
        setCategories(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Skeleton active paragraph={{ rows: 1 }} />;
  }

  if (error) {
    return <div>Error fetching categories. Please try again later.</div>;
  }

  if (categories.length === 0) {
    return <Empty description="No categories available" />;
  }

  return (
    <Container>
      {categories.map((category) => (
        <TabItem
          key={category.id}
          $isActive={activeCategory === category.id}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </TabItem>
      ))}
    </Container>
  );
};

export default Categories;
