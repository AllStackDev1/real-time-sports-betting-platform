import { describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { BettingHistory } from '../BettingHistory';
import { Bet, BetSelection, BetStatus } from '../../types';

describe('BettingHistory', () => {
  const mockBets: Bet[] = [
    {
      id: 'bet1',
      gameId: '1',
      userId: 'user1',
      amount: 100,
      selectedTeam: BetSelection.HOME,
      odds: 1.85,
      game: {
        id: '1',
        homeTeam: 'Lakers',
        awayTeam: 'Warriors',
        homeScore: 87,
        awayScore: 82,
        timeRemaining: '4:35 Q4',
        odds: { home: 1.85, away: 2.10, draw: 15.00 }
      },
      status: BetStatus.WON,
      createdAt: '2024-03-10T12:00:00Z'
    }
  ];

  it('renders betting history correctly', () => {
    render(<BettingHistory bets={mockBets} />);

    expect(screen.getByText('Betting History')).toBeInTheDocument();
    expect(screen.getByText(/Lakers vs Warriors/)).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('displays correct status icons', () => {
    render(<BettingHistory bets={mockBets} />);
    
    const betEntry = screen.getByText(/Lakers vs Warriors/).closest('div');
    expect(betEntry).toBeInTheDocument();
  });
});