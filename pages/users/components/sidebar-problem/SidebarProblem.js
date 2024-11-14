import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Tag, Skeleton } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { userAPI } from "service/user";
import CustomCalendar from "./CustomCalendar";

const SidebarContainer = styled.div`
  flex: 2;
  margin-right: 100px;
  padding: 5px 20px 20px 20px;
  background-color: var(--background-color);
  color: var(--text-primary-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

  @media (max-width: 768px) {
    gap: 8px;
    max-height: 300px;
  }
`;

const CompanyTag = styled(Tag)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  padding: 4px 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  width: fit-content;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--link-hover-color);
  }
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 8px;
  }
`;

const ProblemCount = styled.div`
  background-color: var(--orange-color);
  color: #ffffff;
  font-size: 10px;
  padding: 0px 6px;
  border-radius: 6px;
  margin-left: 4px;
`;

const Sidebar = ({ onCompanyFilter }) => {
  const [searchText, setSearchText] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await userAPI.getCompanyProblemCounts();
        const data = response?.data;

        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCompanySelect = (companyId) => {
    const newSelectedCompany = selectedCompany === companyId ? null : companyId;
    setSelectedCompany(newSelectedCompany);
    onCompanyFilter(newSelectedCompany);
  };

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
              <CompanyTag
                key={company.id}
                onClick={() => handleCompanySelect(company.id)}
                style={{
                  borderColor:
                    selectedCompany === company.id ? "orange" : "default",
                  borderStyle:
                    selectedCompany === company.id ? "solid" : "none",
                }}
              >
                {company.name}
                <ProblemCount>{company.problemCount}</ProblemCount>
              </CompanyTag>
            ))}
          </CompanyTagList>
        )}
      </ContentBox>
    </SidebarContainer>
  );
};

export default Sidebar;
