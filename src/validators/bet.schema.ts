import { z } from "zod";
import { Bet, BetSelection, BetStatus } from "../types";

export const validate = (payload: Partial<Bet>) => {
  const betSchema = z.object({
    odds: z.number(),
    gameId: z.string(),
    userId: z.string(),
    amount: z.number(),
    status: z.nativeEnum(BetStatus),
    selectedTeam: z.nativeEnum(BetSelection),
  });

  return betSchema.safeParse(payload);
};
