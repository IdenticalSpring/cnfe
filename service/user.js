import { patch } from "@mui/material";
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
          const lessonsResponse = await request.get(
            `/lessons/chapter/${chapter.id}`
          );
          return { ...chapter, lessons: lessonsResponse.data.data };
        })
      );

      return chaptersWithLessons;
    } catch (error) {
      console.error("Error fetching chapters and lessons:", error);
      throw error;
    }
  },

  getLessonById: async (lessonId) => {
    try {
      const response = await request.get(`/lessons/${lessonId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching lesson details:", error);
      throw error;
    }
  },
  fetchCoursesByType: async (type) => {
    try {
      const response = await request.get(`/courses/getByType`, {
        params: { type, page: 1 },
      });
      return response.data?.data?.data || [];
    } catch (error) {
      console.error(`Error fetching ${type} courses:`, error);
      throw error;
    }
  },
  getCategories: async () => {
    try {
      const response = await request.get("/categories");
      return response.data.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  getAllTags: async () => {
    try {
      const response = await request.get("/tags");
      console.log(response.data);
      return response.data.data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },
  getAllDiscussions: async (page) => {
    try {
      const response = await request.get(`/discuss/getpaginated?page=${page}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching discussions:", error);
      throw error;
    }
  },

  createDiscussion: async (id, data) => {
    try {
      const response = await request.post(`/discuss/${id}`, data); // Use dynamic ID in URL
      return response.data;
    } catch (error) {
      console.error("Error posting discussion:", error);
      throw error;
    }
  },

  getDiscussionByID: async (id) => {
    try {
      const response = await request.get(`/discuss/getOne${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết thảo luận:", error);
      throw error;
    }
  },

  upvoteDiscussion: async (id) => {
    try {
      const response = await request.patch(`/discuss/${id}/upvote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCommentsByDiscussionID: async (id, page = 1) => {
    try {
      const response = await request.get(
        `/discussion-comments/${id}?page=${page}`
      );
      return response.data.data; // Trả về dữ liệu bình luận từ API
    } catch (error) {
      console.error("Lỗi khi fetch comments:", error);
      throw error;
    }
  },

  submitComment: async (userId, data) => {
    try {
      const response = await request.post(`/comments/${userId}`, data); // Sử dụng dynamic ID trong URL
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gửi comment:", error);
      throw error;
    }
  },
};
