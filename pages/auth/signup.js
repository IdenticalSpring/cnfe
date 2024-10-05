import React, { useState, useCallback, memo } from 'react';
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
  height: 50px;
  margin-bottom: 0px;
`;

export const Logo = styled.img`
  height: auto;
  width: auto;
  max-height: 200px;
  max-width: 200px;
  cursor: pointer;
`;

const Title = styled.h1`
  margin-bottom: 10px !important;
  font-size: 24px;
  text-align: center;
`;

const SignupButton = styled.button`
  background-color: #1890ff;
  color: #fff;s
  border: none;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #40a9ff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  a {
    color: blue;
    padding-left: 8px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;

const PasswordField = memo(({ label, value, onChange, showPassword, handleClickShowPassword, name }) => (
  <TextField
    label={label}
    variant="outlined"
    type={showPassword ? 'text' : 'password'}
    value={value}
    name={name}
    onChange={onChange}
    fullWidth
    required
    margin="normal"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleClickShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
));

const EmailField = memo(({ value, onChange, name }) => (
  <TextField
    label="Email"
    variant="outlined"
    type="email"
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
    required
    margin="normal"
  />
));
const TextFieldComponent = memo(({ label, value, onChange, type = 'text' }) => (
  <TextField
    label={label}
    variant="outlined"
    type={type}
    value={value}
    onChange={onChange}
    fullWidth
    required
    margin="normal"
  />
));
const Signup = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleClickShowPassword = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  }, []);

  const handleClickShowConfirmPassword = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  }, []);

  const { username, name, email, password, confirmPassword, showPassword, showConfirmPassword } = state;

  return (
    <DefaultLayout>
      <Container>
        <FormWrapper>
          <LogoWrapper>
            <Logo src="/assets/img/iconlogo.png" alt="Logo" />
          </LogoWrapper>

          <Title>Sign Up</Title>
          {/* Username Field */}
          <TextFieldComponent
            label="Username"
            value={username}
            onChange={handleChange}
            name="username"
          />

          {/* Name Field */}
          <TextFieldComponent
            label="Name"
            value={name}
            onChange={handleChange}
            name="name"
          />
          <EmailField value={email} onChange={handleChange} name="email" />
          <PasswordField
            label="Password"
            value={password}
            onChange={handleChange}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            name="password"
          />
          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            showPassword={showConfirmPassword}
            handleClickShowPassword={handleClickShowConfirmPassword}
            name="confirmPassword"
          />
          <SignupButton type="submit">Sign Up</SignupButton>
          <ButtonGroup>
            <span>Have an account? </span>
            <Link href="./login" passHref legacyBehavior>
              <StyledLink>Login</StyledLink>
            </Link>
          </ButtonGroup>
        </FormWrapper>
      </Container>
    </DefaultLayout>
  );
};

export default Signup;
