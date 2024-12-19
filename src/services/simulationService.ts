import { mockGames, mockLeaderboard } from '../mocks/mockData';
import { Game, LeaderboardEntry } from '../types';

// Utility to generate random score changes
const generateScoreChange = () => {
  return Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
};

// Utility to update odds based on score changes
const updateOdds = (game: Game) => {
  const scoreDiff = game.homeScore - game.awayScore;
  const homeOdds = 2 - (scoreDiff * 0.1);
  const awayOdds = 2 + (scoreDiff * 0.1);
  
  return {
    home: Math.max(1.1, homeOdds),
    away: Math.max(1.1, awayOdds),
    draw: Math.max(10, 15 - Math.abs(scoreDiff))
  };
};

// Simulate game updates
export const simulateGameUpdates = (callback: (games: Game[]) => void) => {
  let games = [...mockGames];
  
  const updateGames = () => {
    games = games.map(game => {
      const homeScoreChange = generateScoreChange();
      const awayScoreChange = generateScoreChange();
      
      const updatedGame = {
        ...game,
        homeScore: game.homeScore + homeScoreChange,
        awayScore: game.awayScore + awayScoreChange,
        timeRemaining: updateGameTime(game.timeRemaining)
      };
      
      updatedGame.odds = updateOdds(updatedGame);
      return updatedGame;
    });
    
    callback(games);
  };

  // Update every 3 seconds
  const interval = setInterval(updateGames, 3000);
  return () => clearInterval(interval);
};

// Simulate leaderboard updates
export const simulateLeaderboardUpdates = (
  callback: (leaderboard: LeaderboardEntry[]) => void
) => {
  let entries = [...mockLeaderboard];
  
  const updateLeaderboard = () => {
    entries = entries.map(entry => ({
      ...entry,
      totalWinnings: entry.totalWinnings + (Math.random() > 0.7 ? Math.random() * 100 : 0),
      winRate: Math.min(1, entry.winRate + (Math.random() > 0.8 ? 0.01 : 0))
    }));
    
    // Sort by total winnings
    entries.sort((a, b) => b.totalWinnings - a.totalWinnings);
    // Update ranks
    entries = entries.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
    
    callback(entries);
  };

  // Update every 5 seconds
  const interval = setInterval(updateLeaderboard, 5000);
  return () => clearInterval(interval);
};

// Helper function to update game time
function updateGameTime(currentTime: string): string {
  const [time, quarter] = currentTime.split(' ');
  const [minutes, seconds] = time.split(':').map(Number);
  
  let totalSeconds = minutes * 60 + seconds - 5;
  if (totalSeconds < 0) {
    switch (quarter) {
      case 'Q1': return '12:00 Q2';
      case 'Q2': return '12:00 Q3';
      case 'Q3': return '12:00 Q4';
      case 'Q4': return 'Final';
      default: return currentTime;
    }
  }
  
  const newMinutes = Math.floor(totalSeconds / 60);
  const newSeconds = totalSeconds % 60;
  return `${newMinutes}:${newSeconds.toString().padStart(2, '0')} ${quarter}`;
}