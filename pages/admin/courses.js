import styled from "styled-components";
import DefaultLayout from "./layout/DefaultLayout";
import { Suspense, lazy } from "react";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import { ArrowRightOutlined } from "@ant-design/icons";

const TableCourses = lazy(() => import("./component/table/TableCourse"));
const ButtonCustom = lazy(() => import("components/button/Button"));

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
  margin: 20px 0;
`;

const Courses = () => {
  const router = useRouter();
  const handleCreateCourse = () => {
    router.push("/admin/course/CreateCourse");
  };

  return (
    <DefaultLayout>
      <TableContainer>
        <Suspense fallback={<Skeleton active paragraph={{ rows: 5 }} />}>
          <ContentWrapper>
            <Title_Head>
              Course management <ArrowRightOutlined className="icon" />{" "}
            </Title_Head>
            <ButtonContainer>
              <ButtonCustom
                bgColor="var(--success-color)"
                color="#fff"
                type="button"
                onClick={handleCreateCourse}
              >
                Create new Course
              </ButtonCustom>
            </ButtonContainer>

            <TableCourses />
          </ContentWrapper>
        </Suspense>
      </TableContainer>
    </DefaultLayout>
  );
};

export default Courses;