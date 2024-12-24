import { useState } from "react";
import { BetSelection, Game } from "../types";
import Input from "./Input";
import Button from "./Button";
import { debounce } from "../utils/helper";

interface BetFormProps {
  game: Game;
  selection: BetSelection;
  onSubmit: (amount: number, selection: BetSelection) => void;
  onClose: () => void;
}

export function BetForm({ game, selection, onSubmit, onClose }: BetFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [_selection, setSelection] = useState<BetSelection>(selection);

  const handleSubmit = debounce(() => {
    const betAmount = parseFloat(amount);
    if (betAmount > 0) {
      onSubmit(betAmount, _selection);
    }
  }, 300);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Place Bet</h2>
        <div className="mb-4">
          <p className="text-gray-600">
            {game.homeTeam} vs {game.awayTeam}
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit()
        }} className="space-y-4">
          <div className="relative">
            <select
              value={_selection}
              onChange={(e) => setSelection(e.target.value as BetSelection)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            >
              <option value="home">
                {game.homeTeam} ({game.odds.home.toFixed(2)})
              </option>
              <option value="away">
                {game.awayTeam} ({game.odds.away.toFixed(2)})
              </option>
              <option value="draw">Draw ({game.odds.draw.toFixed(2)})</option>
            </select>
            <div className="mt-1 w-full h-14 px-4 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 flex items-center justify-between">
              <span>{_selection}</span>
              <span className="ml-auto">▼</span>
            </div>
          </div>

          <Input
            type="number"
            value={amount}
            label="Bet Amount ($)"
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="1"
          />

          <div className="flex space-x-4">
            <Button title="Place Bet" />
            <Button
              type="button"
              variant="secondary"
              title="Cancel"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
