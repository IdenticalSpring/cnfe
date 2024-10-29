import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import DefaultLayout from "./layout/DefaultLayout";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

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
  padding-top: 60px;
`;

const TableAccount = lazy(() => import("./component/table/TableAccount"));

const Users = () => {

  return (
    <DefaultLayout>
      <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} />}>
        <ContentWrapper>
          <Title_Head>
            Quản lí tài khoản <ArrowRightOutlined className="icon"/>
          </Title_Head>

          <TableAccount />
        </ContentWrapper>
      </Suspense>
    </DefaultLayout>
  );
};

export default Users;