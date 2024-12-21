import { Activity } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useBeforeUnload } from "react-router-dom";

import { GameCard } from "../components/GameCard";
import { Leaderboard } from "../components/Leaderboard";
import { BetForm } from "../components/BetForm";
import { BettingHistory } from "../components/BettingHistory";
import {
  Bet,
  BetSelection,
  BetStatus,
  Game,
  LeaderboardEntry,
  User,
} from "../types";
import { useBetStore, useAuthStore, useGameStore } from "../stores";
import { useSocketIO } from "../hooks";

export const Dashboard = () => {
  const { games, loadGames } = useGameStore();
  const { user, accessToken } = useAuthStore();
  const { bets, createBet, loadBets, leaderboard, loadLeaderboard } =
    useBetStore();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const socket = useSocketIO(accessToken!);

  const handlePlaceBet = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const handleBetSubmit = (amount: number, selection: BetSelection) => {
    if (user && selectedGame) {
      const game = games.find((g) => g.id === selectedGame);
      if (game) {
        const newBet = {
          gameId: selectedGame,
          userId: user?.id,
          amount,
          selectedTeam: selection,
          odds: game.odds[selection],
          status: BetStatus.PENDING,
        };

        // Add new bet
        createBet(newBet);
      }
    }
    setSelectedGame(null);
  };

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.off("message");
    }
  }, [socket]);

  useBeforeUnload(disconnectSocket);

  useEffect(() => {
    // load games
    loadGames();
    // load bets
    loadBets();
    // load leaderboard
    loadLeaderboard();
  }, [loadBets, loadGames, loadLeaderboard]);

  const updateGame = (payload: Game) => {
    const _games = useGameStore.getState().games as Game[];
    // filter and replace the game with id game.id
    const newGames = _games.map((game) => {
      if (game.id === payload.id) {
        return payload;
      }
      return game;
    });
    useGameStore.setState({ games: newGames });
  };

  const updateBetHistory = (payload: Bet) => {
    const _bets = useBetStore.getState().bets as Bet[];
    // filter and replace the bet with id bet.id
    const newBets = _bets.map((bet) => {
      if (bet.id === payload.id) {
        return payload;
      }
      return bet;
    });
    useBetStore.setState({ bets: newBets });
  };

  const updateLeaderboard = (payload: LeaderboardEntry[]) => {
    useBetStore.setState({ leaderboard: payload });
  };

  const updateUserBalance = (payload: number) => {
    useAuthStore.setState({ user: { ...useAuthStore.getState().user, balance: payload } as User });
  };

  useEffect(() => {
    if (socket) {
      socket.on("gameData", updateGame);
      socket.on(`${user?.id}-betHistoryUpdate`, updateBetHistory);
      socket.on(`${user?.id}-balance`, updateUserBalance);
      socket.on("leaderboardUpdate", updateLeaderboard);
    }
    return () => disconnectSocket();
  }, [user, socket, disconnectSocket]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                Yabaleli Betting
              </h1>
            </div>
            {user && (
              <div className="flex">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Balance</p>
                  <p className="text-xl font-bold">
                    ${user.balance.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">User</p>
                    <p className="text-xl font-bold">{user.username}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlaceBet={handlePlaceBet}
                />
              ))}
            </div>
            <BettingHistory bets={bets} />
          </div>
          <div className="space-y-6">
            <Leaderboard entries={leaderboard} />
          </div>
        </div>
      </main>

      {selectedGame && (
        <BetForm
          game={games.find((g) => g.id === selectedGame)!}
          onSubmit={handleBetSubmit}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};
