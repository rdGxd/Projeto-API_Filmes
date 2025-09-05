import { useConfirmation } from "@/hooks/useConfirmation";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do window.confirm
Object.defineProperty(window, "confirm", {
  writable: true,
  value: vi.fn(),
});

describe("useConfirmation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when user confirms", async () => {
    vi.mocked(window.confirm).mockReturnValue(true);

    const { result } = renderHook(() => useConfirmation());

    let confirmResult: boolean = false;

    await act(async () => {
      confirmResult = await result.current.confirm({
        title: "Test Title",
        message: "Test Message",
      });
    });

    expect(window.confirm).toHaveBeenCalledWith("Test Title\n\nTest Message");
    expect(confirmResult).toBe(true);
  });

  it("should return false when user cancels", async () => {
    vi.mocked(window.confirm).mockReturnValue(false);

    const { result } = renderHook(() => useConfirmation());

    let confirmResult: boolean = true;

    await act(async () => {
      confirmResult = await result.current.confirm({
        title: "Test Title",
        message: "Test Message",
      });
    });

    expect(confirmResult).toBe(false);
  });

  it("should use default values when no options provided", async () => {
    vi.mocked(window.confirm).mockReturnValue(true);

    const { result } = renderHook(() => useConfirmation());

    await act(async () => {
      await result.current.confirm();
    });

    expect(window.confirm).toHaveBeenCalledWith(
      "Confirmation\n\nAre you sure you want to proceed?",
    );
  });

  it("should handle custom confirm and cancel text", async () => {
    vi.mocked(window.confirm).mockReturnValue(true);

    const { result } = renderHook(() => useConfirmation());

    await act(async () => {
      result.current.confirm({
        title: "Custom Title",
        message: "Custom Message",
      });
    });

    expect(window.confirm).toHaveBeenCalledWith("Custom Title\n\nCustom Message");
  });
});
