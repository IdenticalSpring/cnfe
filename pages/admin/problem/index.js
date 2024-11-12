import DefaultLayout from "pages/admin/layout/DefaultLayout";
import styled from "styled-components";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import ButtonCustom from "components/button/Button";
import React, { Suspense, lazy } from "react";
import { Skeleton } from "antd";

const TableProblem = lazy(() => import("../component/table/TableProblem"));

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
  margin: 20px 0;
`;

const TableContainer = styled.div`
  margin: 0 20px;
`;

const Index = () => {
  const router = useRouter();
  const handleCreateProblem = () => {
    router.push("/admin/problem/CreateProblem");
  };

  return (
    <DefaultLayout>
      <TableContainer>
        <ContentWrapper>
          <Title_Head>
            Trang quản lí Problem <ArrowRightOutlined className="icon" />
          </Title_Head>
          <ButtonContainer>
            <ButtonCustom
              bgColor="var(--success-color)"
              color="#fff"
              type="button"
              onClick={handleCreateProblem}
            >
              Tạo mới problem
            </ButtonCustom>
          </ButtonContainer>
          <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} />}>
            <TableProblem />
          </Suspense>
        </ContentWrapper>
      </TableContainer>
    </DefaultLayout>
  );
};

export default Index;
