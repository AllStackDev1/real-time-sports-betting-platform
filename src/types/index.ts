/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthPayload {
  username: string;
  password: string;
}

export interface FormResponse<T = any> {
  status: boolean;
  errors: any;
  message: string;
  data?: T;
}

interface IDocument {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AuthDetails = {
  message?: string | null;
  accessToken: string | null;
  user: User | null;
};

export interface User {
  id: string;
  username: string;
  balance: number;
}

export interface Odds extends Partial<IDocument> {
  home: number;
  away: number;
  draw: number;
}

export interface Game extends IDocument {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  timeRemaining: string;
  odds: Odds;
}

export interface Bet extends IDocument {
  gameId: string;
  userId: string;
  amount: number;
  selectedTeam: BetSelection;
  odds: number;
  status: BetStatus;
  game: Game;
  user?: User;
}

export interface LeaderboardEntry {
  userId: string;
  user: User;
  username: string;
  totalWinnings: number;
  rank: string;
  winRate: number;
}

export enum BetStatus {
  PENDING = "pending",
  WON = "won",
  LOST = "lost",
}

export enum BetSelection {
  HOME = "home",
  AWAY = "away",
  DRAW = "draw",
}
