import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock para Next.js navigation
const mockPush = vi.fn();
const mockBack = vi.fn();
const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    replace: mockReplace,
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

// Mock para localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock para sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

// Mock para fetch API
global.fetch = vi.fn();
