// Mock initial data for testing and development
export const mockGames = [
  {
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
  },
  {
    id: '2',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    homeScore: 64,
    awayScore: 70,
    timeRemaining: '2:15 Q3',
    odds: {
      home: 2.50,
      away: 1.65,
      draw: 17.00
    }
  },
  {
    id: '3',
    homeTeam: 'Bucks',
    awayTeam: 'Suns',
    homeScore: 55,
    awayScore: 53,
    timeRemaining: '8:45 Q3',
    odds: {
      home: 1.95,
      away: 1.90,
      draw: 16.00
    }
  }
];

export const mockUser = {
  id: 'user1',
  username: 'JohnDoe',
  balance: 1000.00,
  rank: 5,
  totalWinnings: 2500.00
};

export const mockLeaderboard = [
  {
    userId: 'user2',
    username: 'BettingPro',
    totalWinnings: 5000.00,
    rank: 1,
    winRate: 0.75
  },
  {
    userId: 'user3',
    username: 'LuckyStreak',
    totalWinnings: 4200.00,
    rank: 2,
    winRate: 0.70
  },
  {
    userId: 'user1',
    username: 'JohnDoe',
    totalWinnings: 2500.00,
    rank: 3,
    winRate: 0.65
  },
  {
    userId: 'user4',
    username: 'SportsFan',
    totalWinnings: 1800.00,
    rank: 4,
    winRate: 0.60
  }
];

export const mockBets = [
  {
    id: 'bet1',
    gameId: '1',
    userId: 'user1',
    amount: 100,
    selectedTeam: 'home',
    odds: 1.85,
    status: 'pending',
    timestamp: new Date().toISOString()
  },
  {
    id: 'bet2',
    gameId: '2',
    userId: 'user1',
    amount: 50,
    selectedTeam: 'away',
    odds: 1.65,
    status: 'won',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
] as const;