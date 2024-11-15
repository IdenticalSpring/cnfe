import { request } from "config/request";
import { requestNoTK } from "config/requestNoTK";

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

  // -----------------------------PROBLEM-----------------------------------

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
  getCompanyProblemCounts: async () => {
    const response = await request.get(`companies/with-problem-count`);
    return response.data;
  },
  getTopicProblem: async (id) => {
    try {
      const response = await request.get(`/problem-topics/${id}/topics`);
      return response.data;
    } catch (error) {
      console.error("Error fetching problem-topics:", error);
      throw error;
    }
  },
  getCompaniesProblem: async (id) => {
    try {
      const response = await request.get(`problem-companies/${id}/companies`);
      return response.data;
    } catch (error) {
      console.error("Error fetching problem-companies:", error);
      throw error;
    }
  },
  getTestCasesByProblemId: async (problemId) => {
    try {
      const response = await request.get(`/test-cases/problem/${problemId}`);
      return response.data.data.map(testCase => ({
        input: testCase.input,
        output: testCase.expected_output,
      }));
    } catch (error) {
      console.error("Error fetching test cases:", error);
      throw error;
    }
  },
  executeCode: async (userId, code, language, stdin) => {
    try {
      const requestData = {
        code,
        language,
        stdin
      };

      const response = await request.post(
        `/submissions/run/${userId}`,
        requestData
      );

      return response.data.data;
    } catch (error) {
      console.error("Error running code:", error);
      throw error;
    }
  },
  // -----------------------------EXPLORE-----------------------------------
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
            `/lessons/chapter/${chapter.id}/${courseId}`
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
      const response = await requestNoTK.get(
        `/courses/getByType`,
        { params: { type, page: 1 } },
        { noToken: true }
      );
      return response.data?.data?.data || [];
    } catch (error) {
      console.error(`Error fetching ${type} courses:`, error);
      throw error;
    }
  },
  createOrder: async (orderData) => {
    try {
      const response = await request.post("/orders", orderData);
      return response.data;
    } catch (error) {
      alert("Có lỗi xảy ra khi mua khóa học. Vui lòng thử lại sau.");
    }
  },
  getCouponByCode: async (code) => {
    const response = await request.get(`/coupons/code/${code}`);
    return response.data;
  },
  getAllCoupons: async () => {
    const response = await request.get("/coupons");
    return response.data;
  },
  getPurchaseStatus: async (userId, courseId) => {
    try {
      const response = await request.get(
        `/orders/check-purchase-status/${userId}/${courseId}`
      );
      console.log("Response from check-purchase-status API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error checking purchase status:", error);
      throw error;
    }
  },
  
};
