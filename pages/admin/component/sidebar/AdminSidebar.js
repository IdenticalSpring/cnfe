import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, LogoutOutlined, TeamOutlined, ReadOutlined, SolutionOutlined, FormOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from 'next/router';

const { Sider } = Layout;

// Styled Components
const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed;
  left: 0;
  width: 200px;
  background-color: #cd5c5c;
  border-radius: 0 20px 0 0;
  overflow: hidden;
`;

export const Title = styled.span`
  font-family: cursive;
  font-size: calc(0.7rem + 0.5vw);
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: #fff;
  cursor: pointer;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

export const Logo = styled.img`
  height: 30px;
  width: auto;
  margin-right: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  margin: 16px;
`;

const StyledMenu = styled(Menu)`
  background-color: inherit;
  border-right: none;
`;

const StyledMenuItem = styled(Menu.Item)`
  background-color: ${(props) => (props.$isSelected ? "#A05252" : "inherit")} !important;
  color: ${(props) => (props.$isSelected ? "#fff" : "#000")} !important;
`;

const AdminSidebar = () => {
  const router = useRouter();

  const getSelectedKey = (pathname) => {
    if (pathname.includes('/admin/dashboard')) return '/admin/dashboard';
    if (pathname.includes('/admin/users')) return '/admin/users';
    if (pathname.includes('/admin/courses')) return '/admin/courses';
    if (pathname.includes('/admin/lessons')) return '/admin/lessons';
    if (pathname.includes('/admin/assignments')) return '/admin/assignments';
    if (pathname.includes('/logout')) return '/logout';
    return '/admin/dashboard'; // Default to dashboard
  };

  const selectedKey = getSelectedKey(router.pathname);

  const handleMenuClick = ({ key }) => {
    router.push(key);
  };

  return (
    <StyledSider>
      <LogoContainer>
        <Logo src="/assets/img/logo-nobg.png" alt="Logo" />
        <Title>admin panel</Title>
      </LogoContainer>
      <StyledMenu mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick}>
        <StyledMenuItem key="/admin/dashboard" icon={<DashboardOutlined />} $isSelected={selectedKey === "/admin/dashboard"}>
          Dashboard
        </StyledMenuItem>
        <StyledMenuItem key="/admin/users" icon={<TeamOutlined />} $isSelected={selectedKey === "/admin/users"}>
          Người dùng
        </StyledMenuItem>
        <StyledMenuItem key="/admin/courses" icon={<ReadOutlined />} $isSelected={selectedKey === "/admin/courses"}>
          Khóa học
        </StyledMenuItem>
        <StyledMenuItem key="/admin/lessons" icon={<SolutionOutlined />} $isSelected={selectedKey === "/admin/lessons"}>
          Bài học
        </StyledMenuItem>
        <StyledMenuItem key="/admin/assignments" icon={<FormOutlined />} $isSelected={selectedKey === "/admin/assignments"}>
          Bài tập
        </StyledMenuItem>
      </StyledMenu>
    </StyledSider>
  );
};

export default AdminSidebar;