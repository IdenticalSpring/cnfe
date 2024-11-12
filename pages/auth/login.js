import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GitHubIcon from "@mui/icons-material/GitHub";
import DefaultLayout from "@/layout/DefaultLayout";
import { loginUser } from "@/service/auth-api";
import { notification } from "antd";
import { useRouter } from "next/router";
import {jwtDecode} from "jwt-decode";
import { authAPI } from "@/service/auth-api";

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

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  margin-bottom: 25px;
`;

const Logo = styled.img`
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

const OAuthButton = styled(LoginButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #333;
  margin-top: 10px;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    margin-right: 10px;
  }
`;

const GoogleIconImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  a {
    &:hover {
      color: red;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

        
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('userRole', userRole);

        
        if (userRole === 'admin') {
          router.push('/admin/dashboard');
        } else if (userRole === 'user') {
          router.push('/');
        } else {
          notification.error({
            message: "Error",
            description: "Vai trò không hợp lệ!",
            placement: "bottomRight",
            duration: 3,
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Token không hợp lệ!",
          placement: "bottomRight",
          duration: 3,
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: result.message || "Đăng nhập thất bại!",
        placement: "bottomRight",
        duration: 3,
      });

    }
  };

  const handleLogin = async (provider) => {
    await authAPI.loginWithProvider(provider);
  };

  const handleGithubLogin = () => {
    console.log("git");
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
            type={showPassword ? "text" : "password"}
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

          <OAuthButton onClick={() => handleLogin('google')}>
            <GoogleIconImage src="/assets/img/google.png" alt="Google Icon" />
            Login with Google
          </OAuthButton>

          <OAuthButton onClick={() => handleLogin('github')}>
            <GitHubIcon />
            Login with GitHub
          </OAuthButton>

          <ButtonGroup>
            <Link href="/" passHref legacyBehavior>
              <StyledLink>Forgot password</StyledLink>
            </Link>
            <Link href="/auth/signup" passHref legacyBehavior>
              <StyledLink>Sign up</StyledLink>
            </Link>
          </ButtonGroup>
        </FormWrapper>
      </Container>
    </DefaultLayout>
  );
};

export default Login;