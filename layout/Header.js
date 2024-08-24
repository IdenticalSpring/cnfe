import React from 'react';
import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky; 
  top: 0;            
  z-index: ${({ theme }) => theme.zIndex.high}; 
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 32px;
  width: 32px;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-left: ${({ theme }) => theme.spacing.small};
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.3s, background-color 0.3s;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.large};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(0, 0, 0, 0.05);   
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
`;

export const Header = () => {
    return (
        <Nav>
            <Container>
                <LogoWrapper>
                    <Logo src="https://openui.fly.dev/openui/24x24.svg?text=🧩" alt="Logo" />
                    <Title>Leetcode Clone</Title>
                </LogoWrapper>
                <LinkWrapper>
                    <NavLink href="#">Premium</NavLink>
                    <NavLink href="#">Explore</NavLink>
                    <NavLink href="#">Product</NavLink>
                    <NavLink href="#">Developer</NavLink>
                    <NavLink href="#">Sign in</NavLink>
                </LinkWrapper>
            </Container>
        </Nav>
    );
}
