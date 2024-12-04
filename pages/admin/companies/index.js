import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import styled from "styled-components";
import ButtonCustom from "components/button/Button";
import { useRouter } from "next/router";
import TableCompany from "../component/table/TableCompany";
import { ArrowRightOutlined } from "@ant-design/icons";
import Search from "pages/admin/component/search/index";

const TableContainer = styled.div`
  margin: 0 20px;
`;

const Title_Head = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ff9900;
  margin-top: 0;
  display: block;
  visibility: visible;

  .icon {
    font-size: 24px;
    vertical-align: middle;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 60px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleCreateCompany = () => {
    router.push("/admin/companies/CreateCompany");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <DefaultLayout>
        <TableContainer>
          <ContentWrapper>
            <Title_Head>
              Company management <ArrowRightOutlined className="icon" />{" "}
            </Title_Head>
            <ButtonContainer>
              <Search onSearch={handleSearch} />
              <ButtonCustom
                bgColor="var(--success-color)"
                color="#fff"
                type="button"
                onClick={handleCreateCompany}
              >
                Create new company
              </ButtonCustom>
            </ButtonContainer>
          </ContentWrapper>
          <TableCompany searchTerm={searchTerm}/>
        </TableContainer>
      </DefaultLayout>
    </>
  );
};

export default Index;
