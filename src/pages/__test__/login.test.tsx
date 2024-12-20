import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { Login } from "../login";

const mockLogin = vi.fn();

vi.mock("../../stores/auth.store", () => ({
  useAuthStore: vi.fn(() => ({
    login: mockLogin,
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

describe("Login", () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles login error', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it("handles successful login", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Nedu@1369" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        {
          username: "testuser",
          password: "Nedu@1369",
        },
      );
    });
  });
});
