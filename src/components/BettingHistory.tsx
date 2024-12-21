import { Bet } from "../types";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface BettingHistoryProps {
  bets: Bet[];
}

export function BettingHistory({ bets }: BettingHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "lost":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Betting History</h2>
      <div className="space-y-4">
        {bets.map((bet) => {
          return (
            <div
              key={bet.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(bet.status)}
                <div>
                  <p className="font-semibold">
                    {bet.game.homeTeam} vs {bet.game.awayTeam}
                  </p>
                  <p className="text-sm text-gray-500">
                    Bet on: {bet.selectedTeam} @ {bet.odds}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">${bet.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {new Date(bet.createdAt!).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  {bet.status === "won"
                    ? "Won"
                    : bet.status === "lost"
                    ? "Lost"
                    : "Potential winning"}
                  : ${(bet.amount * bet.odds).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
