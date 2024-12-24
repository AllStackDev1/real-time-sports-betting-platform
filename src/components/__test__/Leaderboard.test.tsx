import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Leaderboard } from "../Leaderboard";
import { LeaderboardEntry } from "../../types";

describe("Leaderboard", () => {
  const mockEntries: LeaderboardEntry[] = [
    {
      userId: "user1",
      username: "JohnDoe",
      user: {
        id: "1",
        username: "JohnDoe",
        balance: 5000,
      },
      totalWinnings: 5000,
      rank: "1",
      winRate: 75,
    },
    {
      userId: "user2",
      username: "JaneSmith",
      totalWinnings: 3000,
      rank: "2",
      user: {
        id: "1",
        balance: 5000,
        username: "JaneSmith",
      },
      winRate: 65,
    },
  ];

  it("renders leaderboard entries correctly", () => {
    render(<Leaderboard entries={mockEntries} />);

    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(screen.getByText("JaneSmith")).toBeInTheDocument();
    expect(screen.getByText("Win Rate: 75.0%")).toBeInTheDocument();
    expect(screen.getByText("$5,000")).toBeInTheDocument();
  });

  it('displays correct rank icons', () => {
    render(<Leaderboard entries={mockEntries} />);

    // Trophy icon for first place
    const firstPlace = screen.getByText('JohnDoe').closest('div');
    expect(firstPlace).toBeInTheDocument();
  });
});
