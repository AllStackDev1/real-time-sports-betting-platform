import React, { useState } from 'react';
import { Game } from '../types';

interface BetFormProps {
  game: Game;
  onSubmit: (amount: number, selection: 'home' | 'away' | 'draw') => void;
  onClose: () => void;
}

export function BetForm({ game, onSubmit, onClose }: BetFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [selection, setSelection] = useState<'home' | 'away' | 'draw'>('home');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const betAmount = parseFloat(amount);
    if (betAmount > 0) {
      onSubmit(betAmount, selection);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Place Bet</h2>
        <div className="mb-4">
          <p className="text-gray-600">
            {game.homeTeam} vs {game.awayTeam}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Team</label>
            <select
              value={selection}
              onChange={(e) => setSelection(e.target.value as 'home' | 'away' | 'draw')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="home">{game.homeTeam} ({game.odds.home.toFixed(2)})</option>
              <option value="away">{game.awayTeam} ({game.odds.away.toFixed(2)})</option>
              <option value="draw">Draw ({game.odds.draw.toFixed(2)})</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Bet Amount ($)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Place Bet
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}