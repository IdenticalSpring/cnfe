import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "antd";
import { DownOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Kiểm tra thuộc tính collapsed khi truyền vào styled-components
const HeaderContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "collapsed" // Chỉ cho phép props khác ngoài 'collapsed'
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f0f2f5;
  width: ${(props) => (props.$collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)")};
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

  const menuItems = [
    {
      key: "1",
      label: <a href="/logout">Đăng Xuất</a>,
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