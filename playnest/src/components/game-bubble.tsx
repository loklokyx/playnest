import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Clock, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

type GameStatus = "pending" | "matched" | "finished";

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
  index: number;
  // onDragEnd?: (id: string, position: { x: number; y: number }) => void;
}

export default function GameBubble({
  game,
  onJoin,
  index,
  // onDragEnd,
}: GameBubbleProps) {
  const [taps, setTaps] = useState(0);
  const [showSpeedUp, setShowSpeedUp] = useState(false);
  const [speedUpProgress, setSpeedUpProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isBursting, setIsBursting] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Make the bubble draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: game.id,
    data: {
      game,
    },
  });

  // Calculate size based on players joined and capacity - more flexible sizing
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const isMobile = screenWidth < 640;

  // Base size is now responsive to screen size
  const baseSize = isMobile ? 100 : Math.min(120, screenWidth * 0.12);
  const maxSizeIncrease = isMobile ? 50 : 60;
  const fillRatio = game.playersJoined / game.capacity;
  const size = baseSize + fillRatio * maxSizeIncrease;

  // Position based on provided position or calculate
  const xPos =
    game.position?.x || (index % 3) * (baseSize * 0.7) + Math.random() * 20;
  const yPos =
    game.position?.y ||
    Math.floor(index / 3) * (baseSize * 0.8) + Math.random() * 30;

  // Color based on status
  const getBubbleColor = () => {
    if (game.isOwner) return "from-amber-400 to-orange-500";
    if (game.status === "matched") return "from-green-400 to-emerald-500";
    if (game.joined) return "from-blue-400 to-indigo-500";
    return "from-indigo-400 to-purple-500";
  };

  const handleTap = () => {
    if (game.joined || game.status === "matched") return;

    setTaps((prev) => {
      const newTaps = prev + 1;

      // Join after 3 taps
      if (newTaps >= 3) {
        onJoin(game.id);
        setShowSpeedUp(true);
      }

      return newTaps;
    });

    setIsExpanding(true);
    setTimeout(() => {
      setIsExpanding(false);
    }, 300);
  };

  const handleSpeedUp = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Increment taps for speed up effect
    setTaps((prev) => prev + 1);

    // Only burst after enough taps (8 total taps)
    if (taps >= 7) {
      setIsBursting(true);
      setTimeout(() => {
        setIsBursting(false);
        setTaps(0);
      }, 1000);
      return;
    }

    // Otherwise just increase progress
    progressInterval.current = setInterval(() => {
      setSpeedUpProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval.current as NodeJS.Timeout);
          return 0;
        }
        return prev + 5;
      });
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Burst animation when game is full - but don't loop
  useEffect(() => {
    if (game.playersJoined >= game.capacity && !isBursting) {
      setIsBursting(true);
      setTimeout(() => {
        setIsBursting(false);
      }, 1000);
    }
  }, [isBursting, game.playersJoined, game.capacity]);

  // Calculate scale based on taps for progressive enlargement
  const getScale = () => {
    if (isBursting) return [1, 1.2, 0];
    if (isExpanding) return 1.05;

    // Gradually increase scale with taps
    const tapScale = 1 + Math.min(taps, 7) * 0.02;
    return tapScale;
  };

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: getScale(),
        opacity: isBursting ? [1, 1, 0] : 1,
        x: transform ? transform.x + xPos : xPos,
        y: transform ? transform.y + yPos : yPos,
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        scale: { duration: isBursting ? 0.5 : 0.2 },
      }}
      className={cn(
        "absolute rounded-full flex flex-col items-center justify-center p-4 shadow-lg cursor-grab active:cursor-grabbing",
        "bg-gradient-to-br",
        getBubbleColor(),
        game.status === "matched" && "animate-pulse",
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        touchAction: "none",
      }}
      onClick={handleTap}
      whileHover={{
        scale: game.joined ? getScale() : (getScale() as number) * 1.03,
      }}
      {...attributes}
      {...listeners}
    >
      <div className="text-white font-bold text-sm mb-1">{game.type}</div>

      <div className="flex items-center text-white/90 text-[10px] mb-1">
        <MapPin className="w-3 h-3 mr-1" />
        {game.location}
      </div>

      <div className="flex items-center text-white/90 text-[10px] mb-1">
        <Clock className="w-3 h-3 mr-1" />
        {game.time}
      </div>

      <div className="flex items-center text-white/90 text-[10px] mb-2">
        <Users className="w-3 h-3 mr-1" />
        {game.playersJoined}/{game.capacity}
      </div>

      {game.status === "matched" ? (
        <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium">
          Ready to Play!
        </div>
      ) : game.joined ? (
        <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium">
          Joined
        </div>
      ) : (
        <div className="bg-white/20 rounded-full px-3 py-1 text-xs text-white font-medium animate-pulse">
          Join
        </div>
      )}

      {showSpeedUp && game.joined && game.status !== "matched" && (
        <div className="mt-2 w-full max-w-[120px]">
          <Progress value={speedUpProgress} className="h-2 bg-white/30" />
          <Button
            size="sm"
            variant="secondary"
            className="mt-2 w-full bg-white/20 hover:bg-white/30 text-white text-xs py-1 h-7"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeedUp();
            }}
          >
            <Zap className="w-3 h-3 mr-1" /> Speed Up ({8 - taps} more)
          </Button>
        </div>
      )}
    </motion.div>
  );
}
