"use client";

import { createContext, useContext, useState } from "react";

type GameStatus = "pending" | "matched" | "finished";
export interface GameForm {
  type: string;
  location: string;
  time: string;
  capacity: number;
  status: GameStatus;
  number: number;
}
export interface GameFormContextProps {
  propertyForm: GameForm | null;
  updatePropertyForm: (property: Partial<GameForm>) => void;
}

export const GameFormContext = createContext<GameFormContextProps | null>({
  propertyForm: null,
  updatePropertyForm: () => null,
} as GameFormContextProps);

import { ReactNode } from "react";

export function GameFormContextProvider({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<GameForm | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const updateGameData = (values: Partial<GameForm>) => {
    setGame((prevGame) => ({ ...prevGame, ...values }) as GameForm);
  };

  return (
    <GameFormContext.Provider
      value={{ propertyForm: game, updatePropertyForm: updateGameData }}
    >
      {children}
      <input
        type="text"
        value={inputValue} // Use controlled input by keeping the value prop
        onChange={(e) => setInputValue(e.target.value)}
      />
    </GameFormContext.Provider>
  );
}
export const useGameFormContext = () => {
  const context = useContext(GameFormContext);
  if (!context) {
    throw new Error(
      "useNewPropertyFormContext must be used within a NewUserFormContextProvider",
    );
  }
  return context;
};
