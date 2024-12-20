import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { GameCard } from '../GameCard';

describe('GameCard', () => {
  const mockGame = {
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

  it('renders game information correctly', () => {
    const onPlaceBet = vi.fn();
    render(<GameCard game={mockGame} onPlaceBet={onPlaceBet} />);

    expect(screen.getByText('Lakers')).toBeInTheDocument();
    expect(screen.getByText('Warriors')).toBeInTheDocument();
    expect(screen.getByText('87')).toBeInTheDocument();
    expect(screen.getByText('82')).toBeInTheDocument();
    expect(screen.getByText('4:35 Q4')).toBeInTheDocument();
  });

  it('calls onPlaceBet with correct arguments', () => {
    const onPlaceBet = vi.fn();
    render(<GameCard game={mockGame} onPlaceBet={onPlaceBet} />);

    const homeButton = screen.getByText('1.85');
    fireEvent.click(homeButton);
    expect(onPlaceBet).toHaveBeenCalledWith('1', 'home');
  });
});