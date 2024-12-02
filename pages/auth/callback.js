import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";

const AuthCallbackPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("access_token");

            if (!token) {
                notification.error({
                    message: "Lỗi",
                    description: "Không tìm thấy token trong URL. Vui lòng thử lại.",
                    placement: "bottomRight",
                    duration: 3,
                });
                setLoading(false);
                return;
            }

            // Lưu token vào cookies
            Cookies.set("token", token);

            try {
                // Giải mã token JWT để lấy thông tin người dùng
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.sub;
                const userName = decodedToken.username;
                const userRole = decodedToken.role;
                const tokenExpiration = decodedToken.exp;

                // Lưu thông tin người dùng vào sessionStorage
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("userName", userName);
                sessionStorage.setItem("userRole", userRole);
                sessionStorage.setItem("tokenExpiration", tokenExpiration);

                // Điều hướng người dùng dựa trên vai trò
                if (userRole === "admin") {
                    router.push("/admin/dashboard");
                } else if (userRole === "user") {
                    router.push("/");
                } else {
                    notification.error({
                        message: "Lỗi",
                        description: "Vai trò người dùng không hợp lệ.",
                        placement: "bottomRight",
                        duration: 3,
                    });
                }
            } catch (error) {
                console.error("JWT Decode Error:", error);
                notification.error({
                    message: "Lỗi",
                    description: "Token không hợp lệ!",
                    placement: "bottomRight",
                    duration: 3,
                });
            }

            setLoading(false);
        };

        handleOAuthCallback();
    }, [router]);

    return loading ? (
        <div>Đang xử lý đăng nhập...</div>
    ) : (
        <div>Đăng nhập thành công!</div>
    );
};

export default AuthCallbackPage;
