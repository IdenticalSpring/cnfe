import React from 'react';
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--background-color);
  padding: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid var(--grey-color);
  text-align: center;
  color: var(--text-secondary-color);
  z-index: 1000;
  position: relative; 
  width: 100%;
  box-sizing: border-box; 
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  height: 40px;
  width: auto;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Copyright = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin: ${({ theme }) => theme.spacing.medium} 0;
`;

export const SocialIcon = styled.a`
  display: inline-block;
  width: 24px;
  height: 24px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo src="/assets/img/iconLogo.png" alt="Logo" />
        <Copyright>
          &copy; {new Date().getFullYear()} MasterCoding. All rights reserved.
        </Copyright>

      </FooterContent>
    </FooterContainer>
  );
};
