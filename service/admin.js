import { request } from "config/request";
import Cookies from "js-cookie";

export const adminAPI = {
    getAllUsers: async () => {
        const token = Cookies.get('token');

        if (!token) {
            console.error("Token không tồn tại");
            throw new Error("Token không tồn tại.");
        }

        try {
            // Thêm token vào headers của request
            const response = await request.get('/admin/users/list', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("Response data:", response.data);
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            if (error.response) {
                console.error("Server Response:", error.response.data);
            }
            throw error;
        }
    },
};
