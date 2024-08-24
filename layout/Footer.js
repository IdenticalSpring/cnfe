import React from 'react';
import styled from 'styled-components';

// Định nghĩa các styled components sử dụng các giá trị từ theme
export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
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

export const Links = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Copyright = styled.div`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <Logo src="https://openui.fly.dev/openui/24x24.svg?text=🧩" alt="Logo" />
                <Links>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Help</a>
                </Links>
                <Copyright>
                    &copy; {new Date().getFullYear()} LeetCode. All rights reserved.
                </Copyright>
            </FooterContent>
        </FooterContainer>
    );
};
