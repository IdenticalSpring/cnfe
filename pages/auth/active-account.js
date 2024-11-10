import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { MailOutline, LockOutlined, Send } from '@mui/icons-material';
import { checkActivationCode, resendActivationCode } from '@/service/auth-api';

const ActivateAccountModal = ({ visible, onClose, userId, initialEmail }) => {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState(initialEmail || '');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleActivate = async () => {
        if (!code.trim()) return;
        setLoading(true);
        try {
            const payload = { codeId: code, id: userId };
            const result = await checkActivationCode(payload);
            if (result.success) onClose();
        } catch (error) {
            console.error('Activation failed:', error);
        }
        setLoading(false);
    };

    const handleRetryCode = async () => {
        if (!email.trim()) return;
        setIsResending(true);
        try {
            await resendActivationCode(email);
            setCountdown(60);
        } catch (error) {
            console.error('Resend failed:', error);
        }
        setIsResending(false);
    };

    return (
        <StyledModal
            title="Activate Your Account"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <ContentWrapper>
                <Title>Welcome! Let's activate your account</Title>
                <Description>
                    Please enter the activation code sent to your email address.
                    Check your spam folder if you don't see it in your inbox.
                </Description>

                <InputGroup>
                    <InputWrapper>
                        <StyledIcon>
                            <LockOutlined fontSize="small" />
                        </StyledIcon>
                        <Input
                            placeholder="Enter activation code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </InputWrapper>
                    <ActivateButton
                        onClick={handleActivate}
                        disabled={loading || !code.trim()}
                        $loading={loading}
                    >
                        {loading ? 'Activating...' : 'Activate Account'}
                    </ActivateButton>
                </InputGroup>

                <Divider>
                    <span>OR</span>
                </Divider>

                <InputGroup>
                    <InputWrapper>
                        <StyledIcon>
                            <MailOutline fontSize="small" />
                        </StyledIcon>
                        <Input
                            placeholder="Confirm your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>
                    <ResendButton
                        onClick={handleRetryCode}
                        disabled={countdown > 0 || isResending || !email.trim()}
                    >
                        <Send fontSize="small" />
                        {countdown > 0
                            ? `Resend in ${countdown}s`
                            : isResending
                                ? 'Sending...'
                                : 'Resend Code'
                        }
                    </ResendButton>
                </InputGroup>
            </ContentWrapper>
        </StyledModal>
    );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    padding: 24px;
  }
  .ant-modal-header {
    padding: 0;
    border: none;
  }
  .ant-modal-body {
    padding: 24px 0 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.5;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #999;
  display: flex;
  align-items: center;
`;

const BaseButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActivateButton = styled(BaseButton)`
  background: #1677ff;
  color: white;

  &:hover:not(:disabled) {
    background: #0958d9;
  }

  opacity: ${props => props.$loading ? 0.8 : 1};
`;

const ResendButton = styled(BaseButton)`
  background: #f0f0f0;
  color: #666;

  &:hover:not(:disabled) {
    background: #e6e6e6;
    color: #1677ff;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #999;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e6e6e6;
  }

  span {
    padding: 0 12px;
  }
`;

export default ActivateAccountModal;
