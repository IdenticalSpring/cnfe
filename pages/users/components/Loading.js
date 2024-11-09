// components/FullscreenLoading.js
import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const FullscreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  z-index: 9999;
`;

const FullscreenLoading = ({ tip = "Loading..." }) => {
  return (
    <FullscreenWrapper>
      <Spin size="large" tip={tip} />
    </FullscreenWrapper>
  );
};

export default FullscreenLoading;
