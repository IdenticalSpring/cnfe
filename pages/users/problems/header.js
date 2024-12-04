import React from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import {
  ArrowLeftOutlined,
  MenuOutlined,
  PlayCircleOutlined,
  CloudUploadOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: var(--background-hover-color);
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled(Button)`
  background-color: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--grey-color);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-right: 2px solid #ddd;
`;

const Logo = styled.img`
  height: auto;
  width: 100%;
  max-height: 20px;
  cursor: pointer;
`;

const CustomTooltip = styled(Tooltip)``;

const Header = ({ onRunCode, onSubmitCode }) => {
  const router = useRouter();
  const handleClickBack = () => {
    router.push("/users/problems");
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <Link href="/">
          <LogoWrapper>
            <Logo src="/assets/img/logo-nobg.png" alt="Logo" />
          </LogoWrapper>
        </Link>
        <CustomTooltip title="Back to Problems">
          <IconButton onClick={handleClickBack} icon={<ArrowLeftOutlined />} />
        </CustomTooltip>
      </LeftSection>

      <CenterSection>
        <CustomTooltip title="Run Code">
          <IconButton onClick={onRunCode} icon={<PlayCircleOutlined />}>
            <span>Run</span>
          </IconButton>
        </CustomTooltip>
        <CustomTooltip title="Submit Code">
          <IconButton onClick={onSubmitCode} icon={<CloudUploadOutlined />}>
            <span style={{ color: "green" }}>Submit</span>
          </IconButton>
        </CustomTooltip>
      </CenterSection>

      <RightSection>
        <CustomTooltip title="Notifications"></CustomTooltip>
        <CustomTooltip title="Upgrade to Premium"></CustomTooltip>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
