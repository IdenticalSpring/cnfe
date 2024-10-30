// ButtonCustom.js
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || "#4CAF50"};
  color: ${(props) => props.color || "#fff"};
  font-size: ${(props) => props.fontSize || "16px"};
  padding: ${(props) => props.padding || "10px 20px"};
  border: none;
  border-radius: ${(props) => props.borderRadius || "4px"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#45a049"};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #cccccc;
  }
`;

const ButtonCustom = ({
  children,
  onClick,
  bgColor,
  color,
  fontSize,
  padding,
  borderRadius,
  hoverColor,
  ...rest
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={{ backgroundColor: bgColor, color }}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonCustom;