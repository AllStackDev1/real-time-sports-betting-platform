import { BetSelection, Game } from '../types';
import { Trophy } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlaceBet: (gameId: string, selection: BetSelection) => void;
}

export function GameCard({ game, onPlaceBet }: GameCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-sm text-gray-500">Live</span>
        </div>
        <span className="text-sm font-medium text-red-500">{game.timeRemaining}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-center">
          <h3 className="font-semibold text-lg">{game.homeTeam}</h3>
          <p className="text-3xl font-bold">{game.homeScore}</p>
          <button
            onClick={() => onPlaceBet(game.id, BetSelection.HOME)}
            className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {game.odds.home.toFixed(2)}
          </button>
        </div>
        
        <div className="text-center">
          <span className="text-gray-500 text-sm">Draw</span>
          <button
            onClick={() => onPlaceBet(game.id, BetSelection.DRAW)}
            className="mt-2 w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            {game.odds.draw.toFixed(2)}
          </button>
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-lg">{game.awayTeam}</h3>
          <p className="text-3xl font-bold">{game.awayScore}</p>
          <button
            onClick={() => onPlaceBet(game.id, BetSelection.AWAY)}
            className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {game.odds.away.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}