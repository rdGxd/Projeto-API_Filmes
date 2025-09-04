import { CreateReview } from "@/types/review";
import { apiWithAuth } from "./api";

export const ReviewService = {
  async getAll() {
    const response = await apiWithAuth.get("/review");
    return response.data;
  },

  async create(reviewData: CreateReview) {
    const response = await apiWithAuth.post("/review", reviewData);
    return response;
  },
};
