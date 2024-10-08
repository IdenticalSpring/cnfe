import Link from 'next/link';
import React from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';
import isPropValid from '@emotion/is-prop-valid';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: sticky; 
  top: 0;
  width: 100%; 
  box-sizing: border-box;
  z-index: 1000;
  background-color: var(--background-color); 
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
  @media (max-width: 749px) {
    padding: calc(5px + 0.5vw) calc(10px + 1vw);
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

export const Logo = styled.img`
  height: auto;
  width: 100%;
  max-height: 30px;
    cursor: pointer;
 
`;

export const Title = styled.span`
  font-family: cursive;
  font-size: calc(1rem + 0.5vw);
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: var(--text-secondary-color);
  cursor: pointer;
  &:active{
    color:red;
    transform: translateY(1px);
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;

`;

const StyledLink = styled.a.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  color: ${({ isActive }) => (isActive ? '#DD0000' : 'var(--text-secondary-color)')}; 
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 100px;
  transition: color 1s, background-color 0.3s;

  &:hover {
    color: var(--text-primary-color);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 100px;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Header = () => {
  const router = useRouter();
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
            <StyledLink isActive={router.pathname === '/'}>Home</StyledLink>
          </Link>
          <Link href="/explore" passHref legacyBehavior>
            <StyledLink isActive={router.pathname === '/explore'}>Explore</StyledLink>
          </Link>
          <Link href="/problem" passHref legacyBehavior>
            <StyledLink isActive={router.pathname === '/problem'}>Problem</StyledLink>
          </Link>
          <Link href="/developer" passHref legacyBehavior>
            <StyledLink isActive={router.pathname === '/developer'}>Developer</StyledLink>
          </Link>
          <Link href="/auth/login" passHref legacyBehavior>
            <StyledLink isActive={router.pathname === '/Login/login'}>Sign in</StyledLink>
          </Link>
        </LinkWrapper>
      </Nav>
    </Container>
  );
};
