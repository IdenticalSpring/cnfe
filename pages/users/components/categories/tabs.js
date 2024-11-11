import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userAPI } from "service/user";

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f0;
`;

const Tab = styled.div`
  padding: 15px 20px;
  background-color: ${(props) => (props.active ? "#5a7996" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#808080")};
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await userAPI.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Tabs>
      {categories.map((category) => (
        <Tab
          key={category.id}
          active={activeCategory === category.id}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </Tab>
      ))}
    </Tabs>
  );
};
export default Categories;
