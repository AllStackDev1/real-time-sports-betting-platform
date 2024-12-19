export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  timeRemaining: string;
  odds: {
    home: number;
    away: number;
    draw: number;
  };
}

export interface User {
  id: string;
  username: string;
  balance: number;
  rank: number;
  totalWinnings: number;
}

export interface Bet {
  id: string;
  gameId: string;
  userId: string;
  amount: number;
  selectedTeam: 'home' | 'away' | 'draw';
  odds: number;
  status: 'pending' | 'won' | 'lost';
  timestamp: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalWinnings: number;
  rank: number;
  winRate: number;
}