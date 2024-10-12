import axios from 'axios';
import { Modal } from 'antd';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const adminAPI = {
    getAllUsers: async () => {
        const url = `${baseURL}/admin/users/list`;
        const token = Cookies.get('token');

        if (!token) {
            Modal.error({
                title: 'Lỗi xác thực',
                content: 'Không tìm thấy token. Vui lòng đăng nhập lại.',
            });
            return { success: false, message: 'Không tìm thấy token' };
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            return { success: true, data: response.data };
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Modal.error({
                    title: 'Lỗi xác thực',
                    content: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
                });
               
                Cookies.remove('token');
                window.location.href = '/login';
                return { success: false, message: 'Phiên đăng nhập hết hạn.' };
            } else if (error.response) {
                Modal.error({
                    title: 'Lỗi từ server',
                    content: error.response.data.message || 'Có lỗi xảy ra khi lấy danh sách người dùng.',
                });
            } else {
                Modal.error({
                    title: 'Lỗi kết nối',
                    content: 'Không thể kết nối tới server. Vui lòng thử lại sau.',
                });
            }

            return { success: false, message: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.' };
        }
    },
};
