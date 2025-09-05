import { api, apiWithAuth } from "@/services/api";
import { userService } from "@/services/userService";
import Cookies from "js-cookie";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dos módulos
vi.mock("@/services/api", () => ({
  api: {
    post: vi.fn(),
  },
  apiWithAuth: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

vi.mock("js-cookie", () => ({
  default: {
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      const loginResponse = {
        data: {
          accessToken: "access-token",
          refreshToken: "refresh-token",
        },
      };

      vi.mocked(api.post).mockResolvedValue(loginResponse);

      const result = await userService.login(credentials);

      expect(api.post).toHaveBeenCalledWith("/auth/login", credentials);
      expect(Cookies.set).toHaveBeenCalledWith("accessToken", "access-token", { expires: 1 / 24 });
      expect(Cookies.set).toHaveBeenCalledWith("refreshToken", "refresh-token", { expires: 1 });
      expect(result).toBe(true);
    });

    it("should return false when login fails", async () => {
      const credentials = {
        email: "test@example.com",
        password: "wrong-password",
      };

      vi.mocked(api.post).mockResolvedValue({ data: null });

      const result = await userService.login(credentials);

      expect(result).toBe(false);
    });
  });

  describe("logout", () => {
    it("should remove tokens and redirect", async () => {
      await userService.logout();

      expect(Cookies.remove).toHaveBeenCalledWith("accessToken");
      expect(Cookies.remove).toHaveBeenCalledWith("refreshToken");
    });
  });

  describe("getAll", () => {
    it("should fetch all users", async () => {
      const mockUsers = [
        { id: "1", name: "User 1", email: "user1@example.com" },
        { id: "2", name: "User 2", email: "user2@example.com" },
      ];

      vi.mocked(apiWithAuth.get).mockResolvedValue({ data: mockUsers });

      const result = await userService.getAll();

      expect(apiWithAuth.get).toHaveBeenCalledWith("/users");
      expect(result).toEqual(mockUsers);
    });
  });

  describe("getById", () => {
    it("should fetch current user", async () => {
      const mockUser = {
        id: "1",
        name: "Current User",
        email: "current@example.com",
      };

      vi.mocked(apiWithAuth.get).mockResolvedValue({ data: mockUser });

      const result = await userService.getById();

      expect(apiWithAuth.get).toHaveBeenCalledWith("/user/me");
      expect(result).toEqual(mockUser);
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "New User",
        email: "new@example.com",
      };

      const createdUser = { id: "3", ...newUser };

      vi.mocked(apiWithAuth.post).mockResolvedValue({ data: createdUser });

      const result = await userService.create(newUser);

      expect(apiWithAuth.post).toHaveBeenCalledWith("/users", newUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe("update", () => {
    it("should update user data", async () => {
      const userData = {
        name: "Updated Name",
        email: "updated@example.com",
        password: "newpassword",
      };

      const updatedUser = { id: "1", ...userData };

      vi.mocked(apiWithAuth.patch).mockResolvedValue({ data: updatedUser });

      const result = await userService.update(userData);

      expect(apiWithAuth.patch).toHaveBeenCalledWith("/user/me", userData);
      expect(result).toEqual(updatedUser);
    });
  });
});
