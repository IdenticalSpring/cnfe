import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
import { logoutUser } from "service/auth-api";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  box-sizing: border-box;
  z-index: 100;
  background-color: var(--background-color);
  margin-bottom: 5px;

  @media screen and (min-width: 1024px) {
    height: 50px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 40px;
  }

  @media screen and (max-width: 767px) {
    height: 30px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: calc(10px + 1vw) calc(20px + 2vw);
  box-sizing: border-box;
  z-index: 1000;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media screen and (min-width: 1024px) {
    height: 100%;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 100%;
  }

  @media screen and (max-width: 767px) {
    height: 100%;
  }
`;

export const Logo = styled.img`
  height: auto;
  width: 100%;
  cursor: pointer;
  display: block;

  @media screen and (min-width: 1024px) {
    max-height: 24px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-height: 20px;
  }

  @media screen and (max-width: 767px) {
    max-height: 15px;
  }
`;
export const Title = styled.span`
  font-family: cursive;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;

  &:active {
    color: red;
    transform: translateY(1px);
  }

  @media screen and (min-width: 1024px) {
    font-size: 0.9rem;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.7rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.6rem;
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 14px;

  @media (max-width: 749px) {
    gap: ${({ theme }) => theme.spacing.small};
  }

  @media screen and (min-width: 1024px) {
    gap: 20px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    gap: 15px;
  }

  @media screen and (max-width: 767px) {
    gap: 10px;
  }
`;

const StyledLink = styled.a`
  color: ${({ $isActive }) =>
    $isActive ? "#DD0000 " : "var(--text-secondary-color)"};
  font-weight: ${({ $isActive }) => ($isActive ? "700 " : "500")};
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 100px;
  transition: color 1s, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-primary-color);
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }

  @media screen and (min-width: 1024px) {
    font-size: 0.9rem;
    padding: 12px 18px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.7rem;
    padding: 10px 15px;
  }

  @media screen and (max-width: 767px) {
    font-size: 0.6rem;
    padding: 5px 10px;
  }
`;

export const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Lấy username từ sessionStorage khi trang được tải
    const storedUsername = sessionStorage.getItem("userName");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser(router);
    if (result.success) {
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userRole");
      setUsername(null);
    }
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
          <Link href="/users/course" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/users/course"}>
              Explore
            </StyledLink>
          </Link>
          <Link href="/users/problems" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/users/problems"}>
              Problem
            </StyledLink>
          </Link>
          <Link href="/users/discussions" passHref legacyBehavior>
            <StyledLink $isActive={router.pathname === "/users/discussions"}>
              Discussion
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
