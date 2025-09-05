import { LoginForm } from "@/components/forms/login-form";
import { userService } from "@/services/userService";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do userService
vi.mock("@/services/userService", () => ({
  userService: {
    login: vi.fn(),
  },
}));

// Mock do toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// Mock do Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form correctly", () => {
    render(<LoginForm />);

    expect(screen.getByText("Login to your account")).toBeInTheDocument();
    expect(screen.getByText("Enter your email below to login to your account")).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should handle successful login", async () => {
    vi.mocked(userService.login).mockResolvedValue(true);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(userService.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("should handle login error", async () => {
    vi.mocked(userService.login).mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(userService.login).toHaveBeenCalled();
    });
  });

  it("should disable button during loading", async () => {
    let resolveLogin: (value: boolean) => void;
    const loginPromise = new Promise<boolean>((resolve) => {
      resolveLogin = resolve;
    });

    vi.mocked(userService.login).mockReturnValue(loginPromise);

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    resolveLogin!(true);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should validate email format", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Verifica se não chamou o serviço com email inválido
    expect(userService.login).not.toHaveBeenCalled();
  });
});
