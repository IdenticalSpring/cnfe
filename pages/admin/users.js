import React, { Suspense, lazy, useState } from "react";
import styled from "styled-components";
import DefaultLayout from "./layout/DefaultLayout";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import Search from "./component/search/index";

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
    font-size: 20px;
    vertical-align: middle;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 70px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const TableAccount = lazy(() => import("./component/table/TableAccount"));

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <DefaultLayout>
      <TableContainer>
        <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} />}>
          <ContentWrapper>
            <Title_Head>
              User management <ArrowRightOutlined className="icon" />
            </Title_Head>
            <ButtonContainer>
              <Search onSearch={handleSearch} />
            </ButtonContainer>
            <TableAccount searchTerm={searchTerm} />
          </ContentWrapper>
        </Suspense>
      </TableContainer>
    </DefaultLayout>
  );
};

export default Users;
