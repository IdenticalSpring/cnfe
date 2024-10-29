import { request } from "config/request";

export const adminAPI = {
  gelAllCourse: async () => {
    const response = await request.get("/admin/courses/list");
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
    const response = await request.patch(`/admin/courses/update/${id}`, data, {
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
};