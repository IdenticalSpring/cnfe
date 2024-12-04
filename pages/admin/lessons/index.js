import styled from "styled-components";
import DefaultLayout from "../layout/DefaultLayout";
import TableLesson from "../component/table/TableLesson";
import ButtonCustom from "components/button/Button";
import { useRouter } from "next/router";
import { ArrowRightOutlined } from "@ant-design/icons";
import Search from "pages/admin/component/search/index";
import { useState } from "react";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ContentWrapper = styled.div`
  padding-top: 70px;
`;

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const router = useRouter();

  const handleCreateLesson = () => {
    router.push("/admin/lessons/CreateLesson");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <DefaultLayout>
      <TableContainer>
        <ContentWrapper>
          <Title_Head>
            Lesson management <ArrowRightOutlined className="icon" />
          </Title_Head>
        </ContentWrapper>
        <ButtonContainer>
        <Search onSearch={handleSearch} />
          <ButtonCustom
            bgColor="var(--success-color)"
            color="#fff"
            type="button"
            onClick={handleCreateLesson}
          >
            Create Lesson
          </ButtonCustom>
        </ButtonContainer>
        <TableLesson searchTerm={searchTerm}/>
      </TableContainer>
    </DefaultLayout>
  );
};

export default Index;
