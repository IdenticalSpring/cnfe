import { request } from "config/request";

export const userAPI = {
  getAllEx: async () => {
    try {
      const response = await request.get("/courses");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  getProfile: async () => {
    const response = await request.get("/auth/profile");
    return response.data;
  },
  getAllProblemsByPage: async (page) => {
    const response = await request.get(`/problems/paginated?page=${page}`);
    return response.data;
  },

  getDifficulties: async () => {
    const response = await request.get("/difficulties");
    return response.data;
  },
  getProblemByID: async (id) => {
    const response = await request.get(`/problems/detail/${id}`);
    return response.data;
  },
  getSearchProblemByDifficulty: async (id) => {
    const response = await request.get(
      `/problems/search-by-difficulty?difficultyId=${id}`
    );
    return response.data;
  },
  getSearchProblemByTitle: async (title) => {
    const response = await request.get(
      `/problems/search-by-title?title=${title}`
    );
    return response.data;
  },
  getAllCompanies: async () => {
    const response = await request.get("/companies");
    return response.data;
  },
  getAllTopics: async () => {
    const response = await request.get("/topics");
    return response.data;
  },
};
