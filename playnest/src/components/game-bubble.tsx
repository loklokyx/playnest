import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";

type GameStatus = "new" | "pending" | "matched" | "joined";

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
          onJoin(game.id);
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
    if (!burst) {
      const timer = setTimeout(() => {
        setSize((prev) => Math.max(1, prev * 0.97)); // Shrink back slowly
        setClickCount((prev) => Math.max(0, prev - 1));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [clickCount, size, burst]);

  return (
    <motion.div
      onClick={handleTap}
      className="select-none relative flex items-center justify-center rounded-full p-4 bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg cursor-pointer"
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
      {game.status === "pending" && (
        <>
          <MdCancel
            className="absolute top-2 right-2 text-red-500"
            size={40}
            onClick={(e) => {
              e.stopPropagation();
              toast.info("You have canceled your request.");
            }}
          />
          <div className="text-white">
            <span className="font-bold text-2xl sm:text-6xl lg:text-8xl">
              Speed Up
            </span>
            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-full my-4">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all"
                style={{
                  width: `${((clickCount > MAX_COUNT ? MAX_COUNT : clickCount) / MAX_COUNT) * 100}%`,
                }}
              />
            </div>
            <div className="text-white text-sm sm:text-lg lg:text-2xl text-center">
              <p>Type: {game.type}</p>
              <p>Location: {game.location}</p>
              <p>Time: {game.time}</p>
              <p>
                Players: {game.playersJoined}/{game.capacity}
              </p>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
