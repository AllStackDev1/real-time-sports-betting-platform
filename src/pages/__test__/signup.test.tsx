import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { Signup } from "../signup";

const mockSignup = vi.fn();

vi.mock("../../stores/auth.store", () => ({
  useAuthStore: vi.fn(() => ({
    signup: mockSignup,
  }))
}));

vi.mock("../../utils/http", () => ({
  post: vi
    .fn()
    .mockResolvedValue({ accessToken: "fake-token", user: { username: "testuser" } }),
  useAuthStore: {
    getState: vi.fn(),
  },
}));

vi.mock("../../hooks", () => ({
  useAlert: vi.fn(() => ({ getState: vi.fn() })), // Default mock implementation
}));

describe("Signup", () => {
  it('renders signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
  });

  it('handles signup error', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /signup/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("handles successful signup", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Nedu@1369" },
    });
    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        {
          username: "testuser",
          password: "Nedu@1369",
        },
      );
    });
  });
});
