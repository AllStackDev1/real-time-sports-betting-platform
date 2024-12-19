import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Game, User, Bet, LeaderboardEntry } from '../types';
import { mockUser, mockBets } from '../mocks/mockData';
import { simulateGameUpdates, simulateLeaderboardUpdates } from '../services/simulationService';

interface BettingState {
  games: Game[];
  user: User | null;
  bets: Bet[];
  leaderboard: LeaderboardEntry[];
  isConnected: boolean;
}

const initialState: BettingState = {
  games: [],
  user: mockUser, // Initialize with mock user
  bets: mockBets, // Initialize with mock bets
  leaderboard: [],
  isConnected: false,
};

type BettingAction =
  | { type: 'SET_GAMES'; payload: Game[] }
  | { type: 'UPDATE_GAME'; payload: Game }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_BETS'; payload: Bet[] }
  | { type: 'ADD_BET'; payload: Bet }
  | { type: 'SET_LEADERBOARD'; payload: LeaderboardEntry[] }
  | { type: 'SET_CONNECTION'; payload: boolean };

const BettingContext = createContext<{
  state: BettingState;
  dispatch: React.Dispatch<BettingAction>;
} | null>(null);

function bettingReducer(state: BettingState, action: BettingAction): BettingState {
  switch (action.type) {
    case 'SET_GAMES':
      return { ...state, games: action.payload };
    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map((game) =>
          game.id === action.payload.id ? action.payload : game
        ),
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BETS':
      return { ...state, bets: action.payload };
    case 'ADD_BET':
      return { ...state, bets: [action.payload, ...state.bets] };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'SET_CONNECTION':
      return { ...state, isConnected: action.payload };
    default:
      return state;
  }
}

export function BettingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bettingReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_CONNECTION', payload: true });

    // Start game simulation
    const cleanupGames = simulateGameUpdates((games) => {
      dispatch({ type: 'SET_GAMES', payload: games });
    });

    // Start leaderboard simulation
    const cleanupLeaderboard = simulateLeaderboardUpdates((leaderboard) => {
      dispatch({ type: 'SET_LEADERBOARD', payload: leaderboard });
    });

    return () => {
      cleanupGames();
      cleanupLeaderboard();
      dispatch({ type: 'SET_CONNECTION', payload: false });
    };
  }, []);

  return (
    <BettingContext.Provider value={{ state, dispatch }}>
      {children}
    </BettingContext.Provider>
  );
}

export function useBetting() {
  const context = useContext(BettingContext);
  if (!context) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
}