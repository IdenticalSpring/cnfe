import styled from "styled-components";
import DefaultLayout from "./layout/DefaultLayout";

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

const assignments = () => {
  return (
    <>
      <DefaultLayout>
        <ContentWrapper>
          <Title_Head>Assignments management</Title_Head>
        </ContentWrapper>
      </DefaultLayout>
    </>
  );
};

export default assignments;