// src/pages/Login.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  max-height: 500px;
  max-width: 400px;
  position: relative;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
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
`;

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
      <FormWrapper>
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
          <a href='#' style={{cursor: 'pointer'}}>Forgot Password?</a>
          <a href='#' style={{cursor: 'pointer'}}>Sign Up</a>
        </ButtonGroup>
      </FormWrapper>
    </Container>
  );
};