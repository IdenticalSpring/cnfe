import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Tag, Skeleton } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { userAPI } from "service/user";
import CustomCalendar from "./CustomCalendar"; // Import CustomCalendar

const SidebarContainer = styled.div`
  flex: 2;
  margin-right: 100px;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-primary-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* Responsive styles */
  @media (max-width: 768px) {
    padding: 15px;
    margin: 0;
  }
`;

const ContentBox = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  /* Responsive styles */
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--orange-color);
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 15px;
`;

const CompanyTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;

  /* Responsive styles */
  @media (max-width: 768px) {
    gap: 8px;
    max-height: 300px;
  }
`;

const CompanyTag = styled(Tag)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 4px 10px;
  background-color: #f0f0f0;
  border-radius: 8px;

  /* Responsive font size and padding */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const Sidebar = () => {
  const [searchText, setSearchText] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await userAPI.getAllCompanies();
        console.log("API response:", response);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter((company) =>
        company.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <SidebarContainer>
      <CustomCalendar />

      <ContentBox>
        <Title>Trending Companies</Title>
        <SearchContainer>
          <Input
            placeholder="Search for a company..."
            suffix={<SearchIcon />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </SearchContainer>

        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <CompanyTagList>
            {filteredCompanies.map((company) => (
              <CompanyTag key={company.id}>{company.name}</CompanyTag>
            ))}
          </CompanyTagList>
        )}
      </ContentBox>
    </SidebarContainer>
  );
};

export default Sidebar;
