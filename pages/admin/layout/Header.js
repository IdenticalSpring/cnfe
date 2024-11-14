import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, Modal } from "antd";
import { DownOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/router";
import { logoutUser } from "service/auth-api";

const HeaderContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "collapsed",
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f0f2f5;
  width: ${(props) =>
    props.$collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)"};
  margin-left: ${(props) => (props.$collapsed ? "80px" : "200px")};
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  z-index: 1;
  transition: width 0.3s ease, margin-left 0.3s ease;
`;

const AccountName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-right: 20px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #ff9900;
  }
`;

const ToggleSidebarButton = styled.div`
  cursor: pointer;
  font-size: 20px;
  color: #333;

  &:hover {
    color: #ff9900;
  }
`;

const Header = ({ toggleSidebar, collapsed }) => {
  const [displayName, setDisplayName] = useState("Người Dùng");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDisplayName(decoded.username || "Người Dùng");
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser(router);
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userRole");
    if (!result.success) {

      Modal.error({
        title: "Lỗi",
        content: result.message || "Có lỗi xảy ra khi đăng xuất.",
      });
    }
  };
  const menuItems = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Đăng Xuất</div>,
    },
  ];

  return (
    <HeaderContainer $collapsed={collapsed !== undefined ? collapsed : false}>
      <ToggleSidebarButton onClick={toggleSidebar}>
        <MenuUnfoldOutlined />
      </ToggleSidebarButton>
      <Dropdown menu={{ items: menuItems }}>
        <AccountName>
          {displayName} <DownOutlined />
        </AccountName>
      </Dropdown>
    </HeaderContainer>
  );
};

export default Header;