import styled from "styled-components";
import Sidebar from "../component/sidebar/AdminSidebar.js";
import Header from "./Header.js"
import Footer from "./Footer.js"

const Main = styled.div`
  min-height: 100vh;
  margin-left: 220px;
  padding-bottom: 10px;
`;

const DefaultLayoutadmin = ({ children }) => {

  return (
    <>
     <Header />
      <Sidebar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default DefaultLayoutadmin;
