import axios from 'axios';
import { notification } from 'antd';

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
            notification.success({
                message: 'Success',
                description: 'User registered successfully',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: true, data: response.data };
        } else {
            notification.error({
                message: 'Error',
                description: response.data.message || 'Registration failed',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            // Lỗi từ phía server trả về
            notification.error({
                message: 'Error',
                description: error.response.data.message || 'Something went wrong.',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: error.response.data.message };
        } else {
            // Lỗi mạng hoặc lỗi khác
            notification.error({
                message: 'Error',
                description: 'Something went wrong. Please try again later.',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: 'Something went wrong. Please try again later.' };
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
            notification.success({
                message: 'Success',
                description: 'Logged in successfully',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: true, data: response.data };
        } else {
            notification.error({
                message: 'Error',
                description: response.data.message || 'Login failed',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: response.data.message };
        }
    } catch (error) {
        console.error('Login Error:', error);
        if (error.response) {
            notification.error({
                message: 'Error',
                description: error.response.data.message || 'Something went wrong.',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: error.response.data.message };
        } else {
            notification.error({
                message: 'Error',
                description: 'Something went wrong. Please try again later.',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: 'Something went wrong. Please try again later.' };
        }
    }
};