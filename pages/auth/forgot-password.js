import React, { useState } from "react";
import { Button, Input, Modal, notification } from "antd";
import styled from "styled-components";
import { retryPassword } from "@/service/auth-api";

const ForgotPassword = ({ open, onClose, onEmailSubmitted }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      notification.warning({ message: "Please enter your email." });
      return;
    }

    setLoading(true);
    try {
      await retryPassword(email);
      notification.success({
        message: "Success",
        description: "Password reset code sent to your email!",
      });
      onEmailSubmitted(email);
      onClose();
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message || "Failed to send reset code",
      });
    }
    setLoading(false);
  };

  return (
    <StyledModal
      title="Forgot Password"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Description>
        Please enter your email to receive a reset code:
      </Description>
      <StyledInput
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledButton
        type="primary"
        onClick={handleForgotPassword}
        loading={loading}
      >
        Send Reset Code
      </StyledButton>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 24px;
  }
  .ant-modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const StyledInput = styled(Input)`
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 600;
`;

export default ForgotPassword;
