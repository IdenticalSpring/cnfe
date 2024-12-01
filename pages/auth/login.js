// Login Component
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DefaultLayout from '@/layout/DefaultLayout';
import { loginUser } from '@/service/auth-api';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import ActivateAccountModal from './active-account';
import axios from 'axios';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';

const StyledLink = styled.a`
  text-decoration: none;
  color: #1890ff;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  margin-bottom: 25px;
`;

export const Logo = styled.img`
  height: auto;
  width: auto;
  max-height: 200px;
  max-width: 200px;
  cursor: pointer;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;
  width: 100%;
`;

const LoginButton = styled.button`
  background-color: #1890ff;
  color: #fff;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  a, button {
    color: #1890ff;
    font-size: 14px;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: red;
    }
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 14px;

  &:hover {
    color: red;
  }
`;
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null); 
  const router = useRouter();
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [isResetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');

  const openForgotPassword = () => {
    setForgotPasswordVisible(true);
  };

  const closeForgotPassword = () => {
    setForgotPasswordVisible(false);
  };

  const openResetPassword = (email) => {
    setEmailForReset(email);
    setResetPasswordVisible(true);
  };

  const closeResetPassword = () => {
    setResetPasswordVisible(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { username, password };
    const result = await loginUser(payload);

    if (result.success) {
      const token = result.data.access_token;

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        const userName = decodedToken.username;
        const userRole = decodedToken.role;
        const tokenExpiration = decodedToken.exp;

        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('userRole', userRole);
        sessionStorage.setItem('tokenExpiration', tokenExpiration);

        if (userRole === 'admin') {
          router.push('/admin/dashboard');
        } else if (userRole === 'user') {
          router.push('/');
        } else {
          notification.error({
            message: 'Error',
            description: 'Invalid role!',
            placement: 'bottomRight',
            duration: 3,
          });
        }
      } catch (error) {
        console.error('JWT Decode Error:', error);
        notification.error({
          message: 'Error',
          description: 'Invalid token!',
          placement: 'bottomRight',
          duration: 3,
        });
      }
    } else if (result.message === 'The account has not been activated.') {
      try {
        const userIdResult = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-user-id?username=${username}`
        );
        setUserId(userIdResult.data.data.userId);
        setModalVisible(true);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch user ID for activation!',
          placement: 'bottomRight',
          duration: 3,
        });
      }
    } else {
      notification.error({
        message: 'Error',
        description: result.message || 'Login failed!',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  };

  return (
    <DefaultLayout>
      <Container>
        <FormWrapper>
          <LogoWrapper>
            <Logo src="/assets/img/iconLogo.png" alt="Logo" />
          </LogoWrapper>

          <Title>Login</Title>
          <StyledTextField
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />

          <StyledTextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          <LoginButton type="submit" onClick={handleSubmit}>
            Login
          </LoginButton>
          <ButtonGroup>
            <LinkButton onClick={openForgotPassword}>Forgot Password</LinkButton>

            {/* Modal quên mật khẩu */}
            <ForgotPassword
              open={isForgotPasswordVisible}
              onClose={closeForgotPassword}
              onEmailSubmitted={(email) => {
                setEmailForReset(email);
                closeForgotPassword();
                openResetPassword(email);
              }}
            />

            {/* Modal đặt lại mật khẩu */}
            <ResetPassword
              open={isResetPasswordVisible}
              onClose={closeResetPassword}
              email={emailForReset}
            />

            <Link href="/auth/signup" passHref legacyBehavior>
              <StyledLink>Sign Up</StyledLink>
            </Link>
          </ButtonGroup>


          <ActivateAccountModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
            userId={userId} 
          />
        </FormWrapper>
      </Container>
    </DefaultLayout>
  );
};

export default Login;
