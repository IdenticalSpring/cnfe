// src/pages/Login.js
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DefaultLayout from '@/layout/DefaultLayout';

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
  background-color: var(--gray-color);
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  max-height: 650px;
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

  a {
    // text-decoration: none;
    // color: #1890ff;
    // cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <DefaultLayout>
      <Container>
        <FormWrapper>
          <LogoWrapper>
            <Logo src="/assets/img/iconlogo.png" alt="Logo" />
          </LogoWrapper>

          <Title>Login</Title>
          <StyledTextField
            label="Email"
            variant="outlined"
            type="email"
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
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          <LoginButton type="submit">Login</LoginButton>
          <ButtonGroup>
            <Link href="/" passHref legacyBehavior>
              <StyledLink>Forgot Password?</StyledLink>
            </Link>
            <Link href="./signup" passHref legacyBehavior>
              <StyledLink>Sign Up</StyledLink>
            </Link>
          </ButtonGroup>
        </FormWrapper>
      </Container>
    </DefaultLayout>
  );
};

export default Login;