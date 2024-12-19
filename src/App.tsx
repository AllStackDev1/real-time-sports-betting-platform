import React, { useState } from 'react';
import { BettingProvider } from './context/BettingContext';
import { GameCard } from './components/GameCard';
import { Leaderboard } from './components/Leaderboard';
import { BetForm } from './components/BetForm';
import { BettingHistory } from './components/BettingHistory';
import { useBetting } from './context/BettingContext';
import { Activity } from 'lucide-react';

function Dashboard() {
  const { state, dispatch } = useBetting();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handlePlaceBet = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleBetSubmit = (amount: number, selection: 'home' | 'away' | 'draw') => {
    if (state.user && selectedGame) {
      const game = state.games.find(g => g.id === selectedGame);
      if (game) {
        const newBet = {
          id: `bet${Date.now()}`,
          gameId: selectedGame,
          userId: state.user.id,
          amount,
          selectedTeam: selection,
          odds: game.odds[selection],
          status: 'pending',
          timestamp: new Date().toISOString()
        };
        
        // Update user balance
        dispatch({
          type: 'SET_USER',
          payload: {
            ...state.user,
            balance: state.user.balance - amount
          }
        });
        
        // Add new bet
        dispatch({ type: 'ADD_BET', payload: newBet });
      }
    }
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Sports Betting</h1>
            </div>
            {state.user && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-xl font-bold">${state.user.balance.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlaceBet={handlePlaceBet}
                />
              ))}
            </div>
            <BettingHistory bets={state.bets} games={state.games} />
          </div>
          <div className="space-y-6">
            <Leaderboard entries={state.leaderboard} />
          </div>
        </div>
      </main>

      {selectedGame && (
        <BetForm
          game={state.games.find((g) => g.id === selectedGame)!}
          onSubmit={handleBetSubmit}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BettingProvider>
      <Dashboard />
    </BettingProvider>
  );
}

export default App;