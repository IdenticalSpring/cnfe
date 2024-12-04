import styled from "styled-components";
import Sidebar from "../component/sidebar/AdminSidebar.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { useState } from "react";

const Main = styled.div`
  min-height: 100vh;
  margin-left: ${({ collapsed }) => (collapsed ? "80px" : "200px")};
  padding-bottom: 10px;
  transition: margin-left 0.3s;
  background-color: #fcfcfc;
`;

const DefaultLayoutadmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} collapsed={collapsed} />
      <Sidebar collapsed={collapsed} />
      <Main collapsed={collapsed}>{children}</Main>
      <Footer collapsed={collapsed}/>
    </>
  );
};

export default DefaultLayoutadmin;
