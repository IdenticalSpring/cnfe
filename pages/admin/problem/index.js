import DefaultLayout from "pages/admin/layout/DefaultLayout";
import styled from "styled-components";
import {
  ArrowRightOutlined,
  DownOutlined,
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
  const [topics, setTopics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicResponse = await adminAPI.getAllTopics();
        const companyResponse = await adminAPI.getAllCompanies();
        const courseResponse = await adminAPI.getAllCourse();

        setTopics(topicResponse.data);
        setCompanies(companyResponse.data);
        setCourses(courseResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateProblem = () => {
    router.push("/admin/problem/CreateProblem");
  };

  const onSearch = (value) => {
    console.log("Search text:", value);
  };

  const createTopicMenu = () => (
    <Menu>
      {topics.map((item, index) => (
        <Menu.Item key={index}>{item?.name}</Menu.Item>
      ))}
    </Menu>
  );

  const createCompanyMenu = () => (
    <Menu>
      {companies.map((item, index) => (
        <Menu.Item key={index}>{item?.name}</Menu.Item>
      ))}
    </Menu>
  );

  const createCourseMenu = () => (
    <Menu>
      {courses?.map((item, index) => (
        <Menu.Item key={index}>{item?.title}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <DefaultLayout>
      <TableContainer>
        <ContentWrapper>
          <Title_Head>
            Trang quản lí Problem <ArrowRightOutlined className="icon" />
          </Title_Head>
          <ButtonContainer>
            <FilterGroup>
              <Dropdown overlay={createTopicMenu()}>
                <ButtonCustom
                  bgColor="var(--table-header-color)"
                  color="#fff"
                  type="button"
                >
                  Topics <DownOutlined />
                </ButtonCustom>
              </Dropdown>

              <Dropdown overlay={createCompanyMenu()}>
                <ButtonCustom
                  bgColor="var(--table-header-color)"
                  color="#fff"
                  type="button"
                >
                  Companies <DownOutlined />
                </ButtonCustom>
              </Dropdown>

              <Dropdown overlay={createCourseMenu()}>
                <ButtonCustom
                  bgColor="var(--table-header-color)"
                  color="#fff"
                  type="button"
                >
                  Course <DownOutlined />
                </ButtonCustom>
              </Dropdown>

              <StyledSearch
                placeholder="Tìm kiếm problem"
                suffix={<SearchOutlined />}
                onPressEnter={(e) => onSearch(e.target.value)}
                allowClear
              />
            </FilterGroup>

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