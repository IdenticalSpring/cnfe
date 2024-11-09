import { request } from "config/request";

export const adminAPI = {
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
  gelAllAccount: async () => {
    const response = await request.get("/admin/users/list");
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
  getAllDifficulties: async () => {
    const response = await request.get("/difficulties");
    return response.data;
  },
};
