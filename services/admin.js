import {request} from "config/request"

export const adminAPI = {
    getAllUsers: async () => {
        try {
          const response = await request.get('/admin/users/list');
          return response.data;
        } catch (error) {
          console.error("Error fetching users:", error.response ? error.response.data : error.message);
          throw error;
        }
      },
}