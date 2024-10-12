import axios from 'axios';
import { Modal, notification } from 'antd';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (payload) => {
    const url = `${baseURL}/auth/register`;

    try {
        console.log('Sending payload:', payload);

        // Sử dụng axios để gửi POST request
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response Status:', response.status);
        console.log('API response:', response.data);

        if (response.status === 200 || response.status === 201) {
            // Hiển thị modal đăng ký thành công
            return new Promise((resolve) => {
                Modal.success({
                    title: 'Đăng ký thành công',
                    content: 'Người dùng đã được đăng ký thành công. Bấm OK để tiếp tục.',
                    onOk: () => {
                        resolve({ success: true, data: response.data });
                    },
                });
            });
        } else {
            // Hiển thị modal khi đăng ký thất bại
            Modal.error({
                title: 'Đăng ký thất bại',
                content: response.data.message || 'Có lỗi xảy ra khi đăng ký.',
            });
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            // Hiển thị modal khi có lỗi từ server
            Modal.error({
                title: 'Lỗi',
                content: error.response.data.message || 'Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.',
            });
            return { success: false, message: error.response.data.message };
        } else {
            // Hiển thị modal khi có lỗi kết nối hoặc lỗi khác
            Modal.error({
                title: 'Lỗi',
                content: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            });
            return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' };
        }
    }
};

export const loginUser = async (payload) => {
    const url = `${baseURL}/auth/login`;

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            // Lưu JWT vào cookie
            const token = response.data.data.access_token;
            Cookies.set('token', token, { expires: 1 }); // Token hết hạn sau 1 ngày

            // Hiển thị modal và đợi người dùng bấm "OK"
            return new Promise((resolve) => {
                Modal.success({
                    title: 'Đăng nhập thành công',
                    content: 'Bạn đã đăng nhập thành công. Bấm OK để tiếp tục.',
                    onOk: () => {
                        resolve({ success: true, data: response.data.data });
                    },
                });
            });
        } else {
            // Hiển thị modal khi đăng nhập thất bại
            Modal.error({
                title: 'Đăng nhập thất bại',
                content: response.data.message || 'Có lỗi xảy ra khi đăng nhập.',
            });
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        if (error.response) {
            // Hiển thị modal lỗi từ server
            Modal.error({
                title: 'Lỗi',
                content: error.response.data.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
            });
            return { success: false, message: error.response.data.message };
        } else {
            // Hiển thị modal lỗi kết nối
            Modal.error({
                title: 'Lỗi',
                content: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            });
            return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' };
        }
    }
};