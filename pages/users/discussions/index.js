import React from "react";
import styled from "styled-components";
import Categories from "../components/categories/tabs";
import Tags from "../components/categories/tags";
import DefaultLayout from "@/layout/DefaultLayout";
import ListDiscuss from "./ListDiscuss";
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
  padding: 0 80px;
  background-color: var(--background-hover-color);
`;

const MainContentContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const LeftPanel = styled.div`
  flex: 8;
  max-width: 100%;
  padding-right: 10px;
`;

const RightPanel = styled.div`
  flex: 2;
  max-width: 100%;
`;

const Discussions = () => {
  return (
    <DefaultLayout>
      <Container>
        <MainContentContainer>
          <LeftPanel>
            <Categories />

            <ListDiscuss />
          </LeftPanel>
          <RightPanel>
            <Tags />
          </RightPanel>
        </MainContentContainer>
      </Container>
    </DefaultLayout>
  );
};

export default Discussions;
