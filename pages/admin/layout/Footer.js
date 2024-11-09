import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: ${(props) => (props.collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)")};
  margin-left: ${(props) => (props.collapsed ? "80px" : "200px")};
  padding: 16px;
  background-color: #f0f2f5;
  border-top: 1px solid #d9d9d9;
  position: relative;
  bottom: 0;
  z-index: 1000;
  box-sizing: border-box;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Logo = styled.img`
  height: 24px;
  width: auto;
`;

const FooterText = styled.span`
  font-size: 14px;
  color: #333;
`;

const Footer = ({ collapsed }) => {
  return (
    <FooterContainer collapsed={collapsed}>
      <Logo src="/assets/img/logo-nobg.png" alt="Logo" />
      <FooterText>© 2024 Admin Panel. All Rights Reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;