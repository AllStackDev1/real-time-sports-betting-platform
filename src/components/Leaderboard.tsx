import { LeaderboardEntry } from '../types';
import { Medal, Trophy, Award } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  const getRankIcon = (rank: string) => {
    switch (rank) {
      case "1":
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case "2":
        return <Medal className="w-6 h-6 text-gray-400" />;
      case "3":
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.userId}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className="w-8 flex justify-center">
                {getRankIcon(entry.rank) || entry.rank}
              </span>
              <div>
                <p className="font-semibold">{entry.username}</p>
                <p className="text-sm text-gray-500">Win Rate: {entry.winRate.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">${entry.totalWinnings.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}