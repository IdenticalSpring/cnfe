import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import DefaultLayout from "./layout/DefaultLayout";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

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

const TableAccount = lazy(() => import("./component/table/TableAccount"));

const Users = () => {
  return (
    <DefaultLayout>
      <TableContainer>
        <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} />}>
          <ContentWrapper>
            <Title_Head>
              Quản lí tài khoản <ArrowRightOutlined className="icon" />
            </Title_Head>

            <TableAccount />
          </ContentWrapper>
        </Suspense>
      </TableContainer>
    </DefaultLayout>
  );
};

export default Users;