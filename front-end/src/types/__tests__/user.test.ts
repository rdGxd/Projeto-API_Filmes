import { User } from "@/types/user";
import { describe, expect, it } from "vitest";

describe("User validation schema", () => {
  describe("valid user data", () => {
    it("should validate matching passwords", () => {
      const validUser = {
        newPassword: "password123",
        confirmPassword: "password123",
      };

      const result = User.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should validate minimum password length", () => {
      const validUser = {
        newPassword: "123456",
        confirmPassword: "123456",
      };

      const result = User.safeParse(validUser);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid user data", () => {
    it("should reject short passwords", () => {
      const invalidUser = {
        newPassword: "12345",
        confirmPassword: "12345",
      };

      const result = User.safeParse(invalidUser);
      expect(result.success).toBe(false);

      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 6 characters");
      }
    });

    it("should reject mismatched passwords", () => {
      const invalidUser = {
        newPassword: "password123",
        confirmPassword: "differentpassword",
      };

      const result = User.safeParse(invalidUser);
      expect(result.success).toBe(false);

      if (!result.success) {
        const passwordMismatchError = result.error.issues.find(
          (issue) => issue.message === "Passwords must match",
        );
        expect(passwordMismatchError).toBeDefined();
      }
    });

    it("should reject empty passwords", () => {
      const invalidUser = {
        newPassword: "",
        confirmPassword: "",
      };

      const result = User.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it("should reject missing fields", () => {
      const invalidUser = {
        newPassword: "password123",
        // confirmPassword missing
      };

      const result = User.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });
});
