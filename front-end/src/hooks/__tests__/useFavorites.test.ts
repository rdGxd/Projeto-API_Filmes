import { useFavorites } from "@/hooks/useFavorites";
import { favoriteService } from "@/services/favoriteService";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do favoriteService
vi.mock("@/services/favoriteService", () => ({
  favoriteService: {
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    getFavorites: vi.fn(),
  },
}));

// Mock do toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useFavorites", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add favorite successfully", async () => {
    const mockResponse = { id: "1", movieId: "movie-1" };
    vi.mocked(favoriteService.addFavorite).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.addFavorite("movie-1");
    });

    expect(favoriteService.addFavorite).toHaveBeenCalledWith("movie-1");
  });

    it("should remove favorite successfully", async () => {
    vi.mocked(favoriteService.removeFavorite).mockResolvedValue({} as import("axios").AxiosResponse);

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.removeFavorite("favorite-1");
    });

    expect(favoriteService.removeFavorite).toHaveBeenCalledWith("favorite-1");
  });

  it("should get favorites successfully", async () => {
    const mockFavorites = [
      { id: "1", movieId: "movie-1" },
      { id: "2", movieId: "movie-2" },
    ];
    vi.mocked(favoriteService.getFavorites).mockResolvedValue(mockFavorites);

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.getFavorites();
    });

    expect(favoriteService.getFavorites).toHaveBeenCalled();
  });

  it("should handle loading state", () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.loading).toBe(false);
  });
});
