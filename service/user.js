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
  getSearchProblemByDifficultyAndTopic: async (difficultId, topicId) => {
    const response = await request.get(
      `/problems/search-by-difficulty-and-topic?difficultyId=${difficultId}&topicId=${topicId}`
    );
    return response.data;
  },
  getSearchByCompanies: async (companyId) => {
    const response = await request.get(
      `/problems/search-by-company?companyId=${companyId}`
    );
    return response.data;
  },
  getCourseById: async (id) => {
    try {
      const response = await request.get(`/courses/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching course details:", error);
      throw error;
    }
  },

  getChaptersAndLessonsByCourseId: async (courseId) => {
    try {
      const response = await request.get(`/chapters/course/${courseId}`);
      const chapters = response.data.data;

      const chaptersWithLessons = await Promise.all(
        chapters.map(async (chapter) => {
          const lessonsResponse = await request.get(`/lessons/chapter/${chapter.id}/${courseId}`);
          return { ...chapter, lessons: lessonsResponse.data.data };
        })
      );

      return chaptersWithLessons;
    } catch (error) {
      console.error("Error fetching chapters and lessons:", error);
      throw error;
    }
  },

  getLessonById: async (courseId, lessonId) => {
    try {
      const response = await request.get(`/lessons/${courseId}/${lessonId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching lesson details:", error);
      throw error;
    }
  },
fetchCoursesByType: async (type) => {
    try {
      const response = await request.get(`/courses/getByType`, { params: { type, page: 1 } });
      return response.data?.data?.data || [];
    } catch (error) {
      console.error(`Error fetching ${type} courses:`, error);
      throw error;
    }
  },
  createOrder :async (orderData) => {
    try {
      const response = await request.post('/orders', orderData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else {
        console.error("Error purchasing course:", error.message);
      }
      alert("Có lỗi xảy ra khi mua khóa học. Vui lòng thử lại sau.");
    }

  },
  getCouponByCode: async (code) => {
    const response = await request.get(`/coupons/code/${code}`);
    return response.data;
  },
  getAllCoupons: async () => {
    const response = await request.get('/coupons');
    return response.data;
  },
};
