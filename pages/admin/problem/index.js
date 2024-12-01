import DefaultLayout from "pages/admin/layout/DefaultLayout";
import styled from "styled-components";
import {
  ArrowRightOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import ButtonCustom from "components/button/Button";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Skeleton, Dropdown, Menu, Input } from "antd";
import { adminAPI } from "service/admin";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const TableContainer = styled.div`
  margin: 0 20px;
`;

const StyledSearch = styled(Input)`
  max-width: 300px;
  border-radius: 8px;
  .ant-input-suffix {
    color: var(--primary-color);
    font-size: 18px;
  }
  .ant-input {
    border-radius: 8px;
    height: 30px;
  }
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
            Problem management <ArrowRightOutlined className="icon" />
          </Title_Head>
          <ButtonContainer>
            <ButtonCustom
              bgColor="var(--success-color)"
              color="#fff"
              type="button"
              onClick={handleCreateProblem}
            >
              Create problem
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
