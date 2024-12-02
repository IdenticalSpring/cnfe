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
      // Hiển thị modal đăng ký thành công
      return new Promise((resolve) => {
        Modal.success({
          title: "Đăng ký thành công",
          content: "Người dùng đã được đăng ký thành công. Bấm OK để tiếp tục.",
          onOk: () => {
            resolve({ success: true, data: response.data });
          },
        });
      });
    } else {
      // Hiển thị modal khi đăng ký thất bại
      Modal.error({
        title: "Đăng ký thất bại",
        content: response.data.message || "Có lỗi xảy ra khi đăng ký.",
      });
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.response) {
      // Hiển thị modal khi có lỗi từ server
      Modal.error({
        title: "Lỗi",
        content:
          error.response.data.message ||
          "Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.",
      });
      return { success: false, message: error.response.data.message };
    } else {
      // Hiển thị modal khi có lỗi kết nối hoặc lỗi khác
      Modal.error({
        title: "Lỗi",
        content: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
      return {
        success: false,
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
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
      // Lưu JWT vào cookie
      const token = response.data.data.access_token;
      Cookies.set("token", token);

      // Hiển thị modal và đợi người dùng bấm "OK"
      return new Promise((resolve) => {
        Modal.success({
          title: "Đăng nhập thành công",
          content: "Bạn đã đăng nhập thành công. Bấm OK để tiếp tục.",
          onOk: () => {
            resolve({ success: true, data: response.data.data });
          },
        });
      });
    } else {
      // Hiển thị modal khi đăng nhập thất bại
      Modal.error({
        title: "Đăng nhập thất bại",
        content: response.data.message || "Có lỗi xảy ra khi đăng nhập.",
      });
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    if (error.response) {
      // Hiển thị modal lỗi từ server
      Modal.error({
        title: "Lỗi",
        content:
          error.response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.",
      });
      return { success: false, message: error.response.data.message };
    } else {
      // Hiển thị modal lỗi kết nối
      Modal.error({
        title: "Lỗi",
        content: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
      return {
        success: false,
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      };
    }
  }
};

export const logoutUser = async (router) => {
  const url = `${baseURL}/auth/logout`;
  const token = Cookies.get("token");

  if (!token) {
    Modal.error({
      title: "Lỗi",
      content: "Không tìm thấy token. Vui lòng đăng nhập lại.",
    });
    return { success: false, message: "Không tìm thấy token" };
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
        title: "Đăng xuất thành công",
        content: "Bạn đã đăng xuất thành công. Bấm OK để tiếp tục.",
        onOk: () => {
          router.push("/auth/login");
        },
      });
      return { success: true };
    }
  } catch (error) {
    Modal.error({
      title: "Lỗi",
      content:
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
    });
    return {
      success: false,
      message:
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
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
    console.error("Lỗi đăng xuất:", error);
    Modal.error({
      title: "Lỗi",
      content:
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
    });
    return {
      success: false,
      message:
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
    };
  }
};
export const loginWithGoogle = async () => {
  const googleAuthUrl = `${baseURL}/auth/google`;
  window.location.href = googleAuthUrl; 
};

export const loginWithGitHub = async () => {
  const githubAuthUrl = `${baseURL}/auth/github`;
  window.location.href = githubAuthUrl;;
};
