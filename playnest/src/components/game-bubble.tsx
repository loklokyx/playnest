import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type GameStatus = "pending" | "joined";

export interface Game {
  id: string;
  type: string;
  location: string;
  time: string;
  playersJoined: number;
  capacity: number;
  status: GameStatus;
  isOwner: boolean;
  joined: boolean;
  position?: { x: number; y: number };
}

interface GameBubbleProps {
  game: Game;
  onJoin: (gameId: string) => void;
}

const MAX_COUNT = 10;

export default function GameBubble({ game, onJoin }: GameBubbleProps) {
  const [clickCount, setClickCount] = useState(0);
  const [size, setSize] = useState(1);
  const [burst, setBurst] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const handleTap = () => {
    if (game.status === "pending" || game.status === "joined") {
      setClickCount((prev) => prev + 1);

      // Increase size with each click
      if (clickCount < MAX_COUNT) {
        setSize(1 + (clickCount + 1) * 0.03); // Gradually enlarge
      } else {
        // Burst animation when clicked too much
        setBurst(true);
        if (!toastShown) {
          setToastShown(true);
          toast.success(
            game.status === "pending"
              ? "You've requested to join this game. The owner will be notified."
              : "The game owner has been notified that you want to speed up the matching process.",
          );
          onJoin;
        }

        // Reset after delay
        setTimeout(() => {
          setClickCount(0);
          setSize(1);
          setToastShown(false);
          setBurst(false);
        }, 1000); // Delay the reset
      }
    }
  };

  // Slowly shrink back if not clicked
  useEffect(() => {
    if (clickCount > 0 && !burst) {
      const timer = setTimeout(() => {
        setSize((prev) => Math.max(1, prev - 0.01)); // Shrink back slowly
        if (size <= 1.01) {
          setClickCount(0);
          setSize(1);
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [clickCount, size, burst]);

  return (
    <motion.div
      onClick={handleTap}
      className="relative flex items-center justify-center rounded-full p-4 bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg cursor-pointer"
      style={{
        width: "60vw",
        height: "60vw",
        touchAction: "none",
        borderRadius: "50%", // Ensure it's round
      }}
      animate={{ scale: size }} // Animate size change only
      transition={{ duration: 0.3 }} // Smooth transition for size change
    >
      {burst && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></div>
        </div>
      )}
      <div className="text-white font-bold text-2xl sm:text-6xl lg:text-8xl">
        Join Game
      </div>
    </motion.div>
  );
}
