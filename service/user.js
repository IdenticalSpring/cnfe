import { request } from "config/request";

export const userAPI = {
  getAllEx: async () => {
    try {
      const response = await request.get('/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
  getProfile: async () => {
      const response = await request.get('/auth/profile');
      return response.data;
  },
};