import axios from "axios";
import { Modal, notification } from "antd";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (payload) => {
  const url = `${baseURL}/auth/register`;

  try {
    console.log("Sending payload:", payload);

    // Sử dụng axios để gửi POST request
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response Status:", response.status);
    console.log("API response:", response.data);

    if (response.status === 200 || response.status === 201) {
      // Display successful registration modal
      return new Promise((resolve) => {
        Modal.success({
          title: "Registration Successful",
          content:
            "User has been successfully registered. Click OK to continue.",
          onOk: () => {
            resolve({ success: true, data: response.data });
          },
        });
      });
    } else {
      // Display modal when registration fails
      Modal.error({
        title: "Registration Failed",
        content:
          response.data.message || "An error occurred during registration.",
      });
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      // Display modal when there's an error from the server
      Modal.error({
        title: "Error",
        content:
          error.response.data.message ||
          "An error occurred from the server. Please try again.",
      });
      return { success: false, message: error.response.data.message };
    } else {
      // Display modal when there's a connection error or other error
      Modal.error({
        title: "Error",
        content: "An error occurred. Please try again later.",
      });
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  }
};

export const loginUser = async (payload) => {
  const url = `${baseURL}/auth/login`;

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      // Save JWT to cookie
      const token = response.data.data.access_token;
      Cookies.set("token", token);

      // Display modal and wait for user to click "OK"
      return new Promise((resolve) => {
        Modal.success({
          title: "Login Successful",
          content: "You have successfully logged in. Click OK to continue.",
          onOk: () => {
            resolve({ success: true, data: response.data.data });
          },
        });
      });
    } else {
      // Display modal when login fails
      Modal.error({
        title: "Login Failed",
        content: response.data.message || "An error occurred during login.",
      });
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Login error:", error);
    if (error.response) {
      // Display error modal from server
      Modal.error({
        title: "Error",
        content:
          error.response.data.message || "An error occurred. Please try again.",
      });
      return { success: false, message: error.response.data.message };
    } else {
      // Display connection error modal
      Modal.error({
        title: "Error",
        content: "An error occurred. Please try again later.",
      });
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  }
};
export const logoutUser = async (router) => {
  const url = `${baseURL}/auth/logout`;
  const token = Cookies.get("token");

  if (!token) {
    Modal.error({
      title: "Error",
      content: "Token not found. Please log in again.",
    });
    return { success: false, message: "Token not found" };
  }

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 204) {
      Cookies.remove("token");
      Modal.success({
        title: "Logout Successful",
        content: "You have successfully logged out. Click OK to continue.",
        onOk: () => {
          router.push("/auth/login");
        },
      });
      return { success: true };
    }
  } catch (error) {
    console.error("Logout error:", error);
    Modal.error({
      title: "Error",
      content:
        error.response?.data?.message ||
        "An error occurred. Please try again later.",
    });
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred. Please try again later.",
    };
  }
};
export const checkActivationCode = async (payload) => {
  const url = `${baseURL}/auth/check-code`;
  try {
    const response = await axios.post(url, payload);
    notification.success({
      message: "Success",
      description: response.data.message || "Account activated successfully!",
    });
    return { success: true };
  } catch (error) {
    notification.error({
      message: "Error",
      description: error.response?.data?.message || "Activation failed",
    });
    return { success: false };
  }
};
export const resendActivationCode = async (email) => {
  const url = `${baseURL}/auth/retry-active`;
  try {
    const response = await axios.post(url, { email });
    notification.success({
      message: "Code Sent",
      description:
        response.data.message || "Activation code sent to your email!",
    });
    return { success: true };
  } catch (error) {
    notification.error({
      message: "Error",
      description:
        error.response?.data?.message || "Failed to send activation code",
    });
    return { success: false };
  }
};
export const retryPassword = async (email) => {
  const url = `${baseURL}/auth/retry-password`;

  try {
    const response = await axios.post(
      url,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response?.data?.message };
  }
};

// Hàm đặt lại mật khẩu
export const resetPassword = async ({
  email,
  code,
  password,
  confirmPassword,
}) => {
  const url = `${baseURL}/auth/change-password`;

  try {
    const response = await axios.post(
      url,
      {
        email,
        code,
        password,
        confirmPassword,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    Modal.error({
      title: "Error",
      content:
        error.response?.data?.message ||
        "An error occurred. Please try again later.",
    });
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred. Please try again later.",
    };
  }
};
export const loginWithGoogle = async () => {
  const googleAuthUrl = `${baseURL}/auth/google`;
  window.location.href = googleAuthUrl;
};

export const loginWithGitHub = async () => {
  const githubAuthUrl = `${baseURL}/auth/github`;
  window.location.href = githubAuthUrl;
};
