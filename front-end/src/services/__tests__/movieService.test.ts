import { apiWithAuth } from "@/services/api";
import { movieService } from "@/services/movieService";
import { genreEnum } from "@/types/movie";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do apiWithAuth
vi.mock("@/services/api", () => ({
  apiWithAuth: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("movieService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("should fetch all movies", async () => {
      const mockMovies = [
        {
          id: "1",
          title: "Test Movie",
          description: "Test Description",
          genre: "Drama",
          yearRelease: 2023,
          rating: 8.5,
        },
      ];

      vi.mocked(apiWithAuth.get).mockResolvedValue({ data: mockMovies });

      const result = await movieService.getAll();

      expect(apiWithAuth.get).toHaveBeenCalledWith("/movie");
      expect(result).toEqual(mockMovies);
    });
  });

  describe("getById", () => {
    it("should fetch movie by id", async () => {
      const mockMovie = {
        id: "1",
        title: "Test Movie",
        description: "Test Description",
        genre: "Drama",
        yearRelease: 2023,
        rating: 8.5,
      };

      vi.mocked(apiWithAuth.get).mockResolvedValue({ data: mockMovie });

      const result = await movieService.getById("1");

      expect(apiWithAuth.get).toHaveBeenCalledWith("/movie/1");
      expect(result).toEqual(mockMovie);
    });
  });

  describe("create", () => {
    it("should create a new movie", async () => {
      const newMovie = {
        title: "New Movie",
        description: "New Description",
        genre: genreEnum.Animação,
        coverImage: "https://example.com/image.jpg",
        yearRelease: 2024,
        rating: 9.0,
      };

      const createdMovie = { id: "2", ...newMovie };

      vi.mocked(apiWithAuth.post).mockResolvedValue({ data: createdMovie });

      const result = await movieService.create(newMovie);

      expect(apiWithAuth.post).toHaveBeenCalledWith("/movie", newMovie);
      expect(result).toEqual(createdMovie);
    });
  });

  describe("update", () => {
    it("should update a movie", async () => {
      const updateData = {
        title: "Updated Movie",
        description: "Updated Description",
        genre: genreEnum.Animação,
        coverImage: "https://example.com/image.jpg",
        yearRelease: 2024,
        rating: 9.5,
      };

      const updatedMovie = { id: "1", ...updateData };

      vi.mocked(apiWithAuth.patch).mockResolvedValue({ data: updatedMovie });

      const result = await movieService.update("1", updateData);

      expect(apiWithAuth.patch).toHaveBeenCalledWith("/movie/1", updateData);
      expect(result).toEqual(updatedMovie);
    });
  });

  describe("delete", () => {
    it("should delete a movie", async () => {
      vi.mocked(apiWithAuth.delete).mockResolvedValue({});

      await movieService.delete("1");

      expect(apiWithAuth.delete).toHaveBeenCalledWith("/movie/1");
    });
  });

  describe("filter", () => {
    it("should filter movies with search parameters", async () => {
      const filters = {
        genre: "Drama",
        year: 2023,
        minRating: 8.0,
      };

      const mockMovies = [
        {
          id: "1",
          title: "Filtered Movie",
          description: "Filtered Description",
          genre: "Drama",
          yearRelease: 2023,
          rating: 8.5,
        },
      ];

      vi.mocked(apiWithAuth.get).mockResolvedValue({ data: mockMovies });

      const result = await movieService.filter(filters);

      expect(apiWithAuth.get).toHaveBeenCalledWith(
        "/movie/search?genre=Drama&year=2023&minRating=8",
      );
      expect(result).toEqual(mockMovies);
    });
  });
});
