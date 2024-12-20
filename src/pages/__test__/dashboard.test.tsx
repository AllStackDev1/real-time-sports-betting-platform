import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";

import { Dashboard } from "../dashboard";

vi.mock("../../stores/auth.store", () => ({
  useAuthStore: vi.fn(() => ({
    user: {
      username: "MrCEO",
      balance: 300,
    },
  })),
}));

vi.mock("../../utils/http", () => ({
  get: vi
    .fn()
    .mockResolvedValue({}),
  useAuthStore: {
    getState: vi.fn(),
  },
}));

describe("Dashboard", () => {
  it("renders Dashboard", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
    });

      expect(screen.getByText("MrCEO")).toBeTruthy();
      expect(screen.getByText("$300")).toBeTruthy();
  });
});
