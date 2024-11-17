import React, { useState } from 'react';
import { Button, Input, Modal, notification } from 'antd';
import styled from 'styled-components';
import { resetPassword } from '@/service/auth-api';

const ResetPassword = ({ open, onClose, email }) => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!code.trim() || !password.trim() || !confirmPassword.trim()) {
            notification.warning({ message: 'Please enter all fields.' });
            return;
        }
        if (password !== confirmPassword) {
            notification.error({ message: 'Passwords do not match.' });
            return;
        }

        setLoading(true);
        try {
            const result = await resetPassword({ email, code, password, confirmPassword });
            if (result.success) {
                notification.success({
                    message: 'Success',
                    description: 'Your password has been reset successfully.',
                });
                onClose();
            } else {
                notification.error({
                    message: 'Error',
                    description: result.message || 'Password reset failed.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'Password reset failed.',
            });
        }
        setLoading(false);
    };

    return (
        <StyledModal
            title="Reset Password"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Description>Please enter the reset code and your new password:</Description>
            <StyledInput
                placeholder="Reset Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <StyledInput
                placeholder="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <StyledInput
                placeholder="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <StyledButton
                type="primary"
                onClick={handleResetPassword}
                loading={loading}
            >
                Reset Password
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

export default ResetPassword;
