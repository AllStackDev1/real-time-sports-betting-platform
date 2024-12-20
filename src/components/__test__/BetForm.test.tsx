import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { BetForm } from '../BetForm';
import { Game } from '../../types';

describe('BetForm', () => {
  const mockGame: Game = {
    id: '1',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeScore: 87,
    awayScore: 82,
    timeRemaining: '4:35 Q4',
    odds: {
      home: 1.85,
      away: 2.10,
      draw: 15.00
    }
  };

  it('renders bet form correctly', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <BetForm
        game={mockGame}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    expect(screen.getAllByText('Place Bet')[0]).toBeInTheDocument();
    expect(screen.getByText(/Lakers vs Warriors/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bet Amount/)).toBeInTheDocument();
  });

  it('handles bet submission', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <BetForm
        game={mockGame}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    fireEvent.change(screen.getByLabelText(/Bet Amount/), {
      target: { value: '100' }
    });
    fireEvent.click(screen.getByRole("button", { name: /place bet/i }));


    expect(onSubmit).toHaveBeenCalledWith(100, 'home');
  });

  it('handles form cancellation', () => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <BetForm
        game={mockGame}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});