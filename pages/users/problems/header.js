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
  position: sticky; /* Đặt vị trí sticky */
  top: 0; /* Giữ header ở đầu khi cuộn */
  z-index: 9999; /* Đảm bảo header nằm trên các thành phần khác khi cuộn */
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

const Header = ({ onRunCode }) => {
  const router = useRouter();
  const handleClickBack = () => {
    router.push("/users/problems"); // Điều hướng về trang /users/problems
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
        <CustomTooltip title="Show list Problems">
          <IconButton icon={<MenuOutlined />} />
        </CustomTooltip>
      </LeftSection>

      <CenterSection>
        <CustomTooltip title="Run Code">
          <IconButton onClick={onRunCode} icon={<PlayCircleOutlined />}> {/* Gọi hàm onRunCode */}
            <span>Run</span>
          </IconButton>
        </CustomTooltip>
        <CustomTooltip title="Submit Code">
          <IconButton icon={<CloudUploadOutlined style={{ color: "green" }} />}>
            <span style={{ color: "green" }}>Submit</span>
          </IconButton>
        </CustomTooltip>
      </CenterSection>

      <RightSection>
        <CustomTooltip title="Notifications">
          <IconButton icon={<BellOutlined />} />
        </CustomTooltip>
        <CustomTooltip title="Upgrade to Premium">
          <Button>Premium</Button>
        </CustomTooltip>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
