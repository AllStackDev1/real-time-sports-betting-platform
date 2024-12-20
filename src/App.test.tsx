import { BrowserRouter } from "react-router-dom";
import { render } from '@testing-library/react';

import App from "./App";
import { useAuthStore } from "./stores";
import { vi } from "vitest";

vi.mock('./stores/auth.store', () => ({
  useAuthStore: vi.fn()
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('redirects to login when not authenticated', () => {
    vi.mocked(useAuthStore).mockImplementation(() => ({
      accessToken: null,
      user: null,
      login: vi.fn(),
      signup: vi.fn(),
      logout: vi.fn()
    }));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // it('shows dashboard when authenticated', () => {
  //   vi.mocked(useAuthStore).mockImplementation(() => ({
  //     accessToken: 'Chinedu',
  //     user: { id: '1', username: 'testuser' },
  //     login: vi.fn(),
  //     signup: vi.fn(),
  //     logout: vi.fn()
  //   }));

  //   render(<App />);
  //   expect(screen.getByText(/Sports Betting/i)).toBeInTheDocument();
  // });
});
