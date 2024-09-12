import Link from 'next/link';
import React from "react";
import styled from "styled-components";


export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: sticky; 
  top: 0 ;
  width: calc(100vw+ 10vw);
  box-sizing: border-box;
  z-index: 1000; 
  background-color: ${({ theme }) => theme.colors.background}; /* Thêm màu nền để header không bị mờ */
`;


export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(5px + 1vw) calc(20px + 2vw); /* Padding thay đổi theo kích thước màn hình */

  padding: 5px 20px;
  width: 100%;
  box-sizing: border-box; 
  z-index: 1000;

  @media (max-width: 749px) {
    padding: calc(5px + 0.5vw) calc(10px + 1vw);
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

`;

export const Logo = styled.img`
 height: calc(1vw + 16px); /* Thay đổi kích thước theo kích thước màn hình */
  width: auto; /* Giữ tỷ lệ khung hình */
`;

export const Title = styled.span`
  font-family: cursive;
  font-size: calc(1rem + 0.5vw); /* Kích thước chữ thay đổi theo kích thước màn hình */
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.small};
  cursor: pointer;

`;



export const LinkWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */
  cursor: pointer;

  text-decoration:none;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }
`;
export const Header = () => {
  return (
    <Container>
      <Nav>
        <Link href="/" passHref legacyBehavior>
          <LogoWrapper>
            <Logo
              src="https://openui.fly.dev/openui/24x24.svg?text=🧩"
              alt="Logo"
            />
            <Title>MinhTu</Title>
          </LogoWrapper>

        </Link>
        <LinkWrapper>
          <Link href="/" passHref legacyBehavior>
            <StyledLink>Home</StyledLink>
          </Link>
          <Link href="/explore" passHref legacyBehavior>
            <StyledLink>Explore</StyledLink>
          </Link>
          <Link href="/product" passHref legacyBehavior>
            <StyledLink>Product</StyledLink>
          </Link>
          <Link href="/developer" passHref legacyBehavior>
            <StyledLink>Developer</StyledLink>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <StyledLink>Sign in</StyledLink>
          </Link>
        </LinkWrapper>
      </Nav>
    </Container>
  );
};