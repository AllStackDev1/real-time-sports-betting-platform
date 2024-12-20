import {
  Bet,
  Game,
  User,
  AuthDetails,
  AuthPayload,
  FormResponse,
  LeaderboardEntry,
} from "../types";
import { get, post, remove } from "./http";

export const login = async (payload: AuthPayload) =>
  await post<AuthDetails>("/auth/login", JSON.stringify(payload));

export const register = async (payload: AuthPayload) =>
  await post<{ user: User; message: string }>(
    "/auth/signup",
    JSON.stringify(payload)
  );

export const loadGames = async () => await get<FormResponse<Game[]>>("/games");

export const loadBets = async () => await get<FormResponse<Bet[]>>("/bets");

export const loadLeaderboard = async () =>
  await get<FormResponse<LeaderboardEntry[]>>("/bets/leaderboard");

export const createBet = async (payload: Partial<Bet>) =>
  await post<FormResponse<Bet>>("/bets", JSON.stringify(payload));

export const refreshAccessToken = async () =>
  await get<AuthDetails>(`/auth/refresh-token`);

export const logOut = async () => await remove<FormResponse>(`/auth/session`);
