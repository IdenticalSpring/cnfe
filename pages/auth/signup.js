import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DefaultLayout from "@/layout/DefaultLayout";
import { registerUser } from "@/service/auth-api";
import { notification } from "antd";

// Styled components
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
  color: #fff;
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

const ErrorMessage = styled.p`
  color: #f44336;
  margin: 0;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;

// Components
const PasswordField = memo(
  ({ label, value, onChange, onBlur, showPassword, handleClickShowPassword, name, error }) => (
    <div style={{ marginBottom: "16px" }}>
      <TextField
        label={label}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
        required
        margin="normal"
        error={!!error}
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
);
PasswordField.displayName = "PasswordField";

const EmailField = memo(({ value, onChange, onBlur, name, error }) => (
  <div style={{ marginBottom: "16px" }}>
    <TextField
      label="Email"
      variant="outlined"
      type="email"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      required
      margin="normal"
      error={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
));
EmailField.displayName = "EmailField";

const TextFieldComponent = memo(({ label, value, onChange, onBlur, name, error }) => (
  <div style={{ marginBottom: "16px" }}>
    <TextField
      label={label}
      variant="outlined"
      type="text"
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth
      required
      margin="normal"
      error={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
));
TextFieldComponent.displayName = "TextFieldComponent";

const Signup = () => {
  const [state, setState] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`;
    }
    return "";
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Validate field on change
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }

      // Specific field validations
      if (name === "password") {
        validatePassword(value);
      } else if (name === "confirmPassword") {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: value !== state.password ? "Passwords do not match" : "",
        }));
      } else if (name === "email") {
        validateEmail(value);
      }
    },
    [state.password]
  );

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;

    // Validate on blur
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`,
      }));
    } else if (name === "email") {
      validateEmail(value);
    } else if (name === "password") {
      validatePassword(value);
    } else if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== state.password ? "Passwords do not match" : "",
      }));
    }
  }, [state.password]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorMsg = "";

    if (!email.trim()) {
      errorMsg = "Email cannot be empty";
    } else if (!emailRegex.test(email)) {
      errorMsg = "Please enter a valid email address";
    }

    setErrors((prev) => ({
      ...prev,
      email: errorMsg,
    }));

    return errorMsg === "";
  };

  const validatePassword = (password) => {
    const sqlChars = /['";=()%<>&\/*+]/;

    let errorMsg = "";

    if (password.length < 8) {
      errorMsg = "Password must be at least 8 characters";
    } else if (sqlChars.test(password)) {
      errorMsg = "Password cannot contain special SQL characters";
    } else if (!/[A-Z]/.test(password)) {
      errorMsg = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      errorMsg = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      errorMsg = "Password must contain at least one number";
    }

    setErrors((prev) => ({
      ...prev,
      password: errorMsg,
    }));

    return errorMsg === "";
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    let hasEmptyFields = false;
    const updatedErrors = { ...errors };
    
    if (!state.username.trim()) {
      updatedErrors.username = "Username cannot be empty";
      hasEmptyFields = true;
    }
    if (!state.name.trim()) {
      updatedErrors.name = "Name cannot be empty";
      hasEmptyFields = true;
    }
    if (!state.email.trim()) {
      updatedErrors.email = "Email cannot be empty";
      hasEmptyFields = true;
    }
    if (!state.password.trim()) {
      updatedErrors.password = "Password cannot be empty";
      hasEmptyFields = true;
    }
    if (!state.confirmPassword.trim()) {
      updatedErrors.confirmPassword = "Confirm password cannot be empty";
      hasEmptyFields = true;
    }

    setErrors(updatedErrors);
    
    if (hasEmptyFields) {
      return;
    }

    if (!validateEmail(state.email)) {
      return;
    }
    
    if (!validatePassword(state.password)) {
      return;
    }
    
    if (state.confirmPassword !== state.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    try {
      const payload = {
        username: state.username,
        password: state.password,
        name: state.name,
        email: state.email,
      };
      
      const result = await registerUser(payload);
      notification.success({
        message: "Sign Up Successful",
        description: "You have successfully created an account.",
      });
    } catch (error) {
      notification.error({
        message: "Sign Up Failed",
        description: error.response?.data?.message || "An error occurred during sign up.",
      });
    }
  };

  const {
    username,
    name,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
  } = state;

  return (
    <DefaultLayout>
      <Container>
        <FormWrapper>
          <LogoWrapper>
            <Logo src="/assets/img/logo-nobg.png" alt="Logo" />
          </LogoWrapper>

          <Title>Sign Up</Title>
          <form onSubmit={handleSubmit}>
            <TextFieldComponent
              label="Username"
              value={username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
              error={errors.username}
            />

            <TextFieldComponent
              label="Name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              error={errors.name}
            />
            
            <EmailField 
              value={email} 
              onChange={handleChange} 
              onBlur={handleBlur}
              name="email" 
              error={errors.email}
            />
            
            <PasswordField
              label="Password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              name="password"
              error={errors.password}
            />
            
            <PasswordField
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              showPassword={showConfirmPassword}
              handleClickShowPassword={handleClickShowConfirmPassword}
              name="confirmPassword"
              error={errors.confirmPassword}
            />
            
            <SignupButton type="submit">Sign Up</SignupButton>
          </form>
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