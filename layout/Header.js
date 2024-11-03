import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Menu, Dropdown } from "antd";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1000;
  background-color: var(--background-color);
  overflow-x: auto; /* Cho phép cuộn ngang */
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(10px + 1vw) calc(20px + 2vw);
  width: 100%;
  height: 20px;
  max-height: 30px;
  box-sizing: border-box;
  z-index: 1000;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

export const Title = styled.span`
  font-family: cursive;
  font-size: calc(0.9rem + 0.3vw);
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: var(--text-secondary-color);
  cursor: pointer;

  &:active {
    color: red;
    transform: translateY(1px);
  }

  @media (max-width: 900px) {
    /* Thay đổi kích thước chữ khi nhỏ hơn 900px */
    font-size: 0.9rem;
  }
`;

export const Logo = styled.img`
  height: auto;
  width: 100%;
  max-height: 30px;
  cursor: pointer;

  @media (max-width: 900px) {
    /* Giảm kích thước logo khi nhỏ hơn 900px */
    max-height: 20px;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  flex-wrap: wrap; /* Cho phép các link đổ xuống dòng khi cần */

  @media (max-width: 749px) {
    gap: ${({ theme }) => theme.spacing.small};
  }
`;

const StyledLink = styled.a`
  color: ${({ $isActive }) =>
    $isActive ? "#DD0000" : "var(--text-secondary-color)"};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 100px;
  transition: color 1s, background-color 0.3s;

  &:hover {
    color: var(--text-primary-color);
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 900px) {
    padding: 5px 10px; /* Giảm khoảng đệm trên màn hình nhỏ */
    font-size: 0.9rem; /* Giảm kích thước chữ */
  }
`;

export const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setUsername(null);
    router.push("/auth/login");
  };

  const menuItems = [
    {
      key: "profile",
      label: (
        <Link href="/users/profile" passHref legacyBehavior>
          <span>Profile</span>
        </Link>
      ),
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Log out</span>,
    },
  ];

  return (
    <Container>
      <Nav>
        <Link href="/" passHref legacyBehavior>
          <LogoWrapper>
            <Logo src="/assets/img/iconLogo.png" alt="Logo" />
            <Title>MasterCoding</Title>
          </LogoWrapper>
        </Link>
        <LinkWrapper>
          <Link href="/" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/"}>Home</StyledLink>
          </Link>
          <Link href="/users/explore" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/users/explore"}>
              Explore
            </StyledLink>
          </Link>
          <Link href="/users/problems" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/users/problems"}>
              Problem
            </StyledLink>
          </Link>
          <Link href="/users/developer" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/users/developer"}>
              Developer
            </StyledLink>
          </Link>
          {username ? (
            <Dropdown menu={{ items: menuItems }}>
              <StyledLink as="span">{username}</StyledLink>
            </Dropdown>
          ) : (
            <Link href="/auth/login" passHref legacyBehavior>
              <StyledLink $isActive={router.pathname === "/auth/login"}>
                Sign in
              </StyledLink>
            </Link>
          )}
        </LinkWrapper>
      </Nav>
    </Container>
  );
};
