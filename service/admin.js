import { request } from "config/request";

export const adminAPI = {
  //------------------------ upload img----------------------------------------
  uploadImage: async (data) => {
    const response = await request.post("/images/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  //------------------------ user----------------------------------------
  gelAllAccount: async () => {
    const response = await request.get("/admin/users/list");
    return response.data;
  },
  //------------------------ course----------------------------------------
  getAllCourse: async () => {
    const response = await request.get("/admin/courses/list");
    return response.data;
  },
  getAllCourseByPage: async (page) => {
    const response = await request.get(
      `/admin/courses/getPagination?page=${page}`
    );
    return response.data;
  },
  createCourse: async (data) => {
    const response = await request.post("/admin/courses/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  detailCourse: async (id) => {
    const response = await request.get(`/admin/courses/detail/${id}`);
    return response.data;
  },
  updateCourse: async (id, data) => {
    const response = await request.patch(`/admin/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await request.delete(`/admin/courses/delete/${id}`);
    return response.data;
  },
  //------------------------ problem----------------------------------------
  getAllProblemsByPage: async (page) => {
    const response = await request.get(`/admin/problem/paginated?page=${page}`);
    return response.data;
  },
  createProblem: async (data) => {
    const response = await request.post("/admin/problem/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  detailProblem: async (id) => {
    const response = await request.get(`/admin/problem/detail/${id}`);
    return response.data;
  },
  updateProblem: async (id, data) => {
    const response = await request.patch(`/admin/problem/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  deleteProblem: async (id) => {
    const response = await request.delete(`/admin/problem/delete/${id}`);
    return response.data;
  },
  //------------------------ difficult----------------------------------------
  getAllDifficulties: async () => {
    const response = await request.get("/difficulties");
    return response.data;
  },
  //------------------------ topic----------------------------------------
  getAllTopics: async () => {
    const response = await request.get("/topics");
    return response.data;
  },
  //------------------------ lesson----------------------------------------
  getAllLesson: async (page) => {
    const response = await request.get(
      `/admin/lessons/getAllPagination?page=${page}`
    );
    return response.data;
  },
  createLesson: async (data) => {
    const response = await request.post("/admin/lessons", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  detailLesson: async (id, courseId) => {
    const response = await request.get(`/admin/lessons/${courseId}/${id}`);
    return response.data;
  },
  updateLesson: async (id, data) => {
    const response = await request.put(`/admin/lessons/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  deleteLesson: async (id) => {
    const response = await request.delete(`/admin/lessons/${id}`);
    return response.data;
  },
  //------------------------ search----------------------------------------
  searchByDiffycult: async (id) => {
    const response = await request.get(
      `/problems/search-by-difficulty?difficultyId=${id}`
    );
    return response.data;
  },
  searchProblemByTitle: async (title) => {
    const response = await request.get(
      `/problems/search-by-title?title=${title}`
    );
    return response?.data;
  },
  searchProblemByDifficultyAndTopic: async (difficultId, topicId) => {
    const response = await request.get(
      `/problems/search-by-difficulty-and-topic?difficultyId=${difficultId}&topicId=${topicId}`
    );
    return response.data;
  },
  searchByCompanies: async (companyId) => {
    const response = await request.get(
      `/problems/search-by-company?companyId=${companyId}`
    );
    return response.data;
  },
  //------------------------ topic----------------------------------------
  getAllTopic: async () => {
    const response = await request.get("/admin/topics");
    return response.data;
  },
  createTopic: async (data) => {
    const response = await request.post("/admin/topics", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  detailTopic: async (id) => {
    const response = await request.get(`/admin/topics/${id}`);
    return response.data;
  },
  updateTopic: async (id, data) => {
    const response = await request.put(`/admin/topics/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  deleteTopic: async (id) => {
    const response = await request.delete(`/admin/topics/${id}`);
    return response.data;
  },
  //------------------------ company----------------------------------------
  getAllCompany: async () => {
    const response = await request.get("/admin/companies");
    return response.data;
  },
  createCompany: async (data) => {
    const response = await request.post("/admin/companies", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  detailCompany: async (id) => {
    const response = await request.get(`/admin/companies/${id}`);
    return response.data;
  },
  updateCompany: async (id, data) => {
    const response = await request.patch(`/admin/companies/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  deleteCompany: async (id) => {
    const response = await request.delete(`/admin/companies/${id}`);
    return response.data;
  },
  //------------------------ chapter----------------------------------------
  getAllChapter: async (page) => {
    const response = await request.get(`/admin/chapters?page=${page}`);
    return response.data;
  },
  createChapter: async (data) => {
    const response = await request.post("/admin/chapters", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  detailChapter: async (id) => {
    const response = await request.get(`/admin/chapters/${id}`);
    return response.data;
  },
  updateChapter: async (id, data) => {
    const response = await request.patch(`/admin/chapters/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
  deleteChapter: async (id) => {
    const response = await request.delete(`/admin/chapters/${id}`);
    return response.data;
  },
};
