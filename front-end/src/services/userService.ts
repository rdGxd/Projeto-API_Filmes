import { api } from "./api";

export const userService = {
  async getAll() {
    const response = await api.get("/users");
    return response.data;
  },

  async getById(id: number) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async create(user: { name: string; email: string }) {
    const response = await api.post("/users", user);
    return response.data;
  },
};
