"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameBubble from "@/components/game-bubble";
import CreateGameModal from "@/components/create-game-modal";
import { cn } from "@/lib/utils";
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

// Update the game type to include position
interface Game {
  id: string;
  type: string;
  location: string;
  time: string;
  playersJoined: number;
  capacity: number;
  status: "pending" | "matched" | "finished";
  isOwner: boolean;
  joined: boolean;
  position?: { x: number; y: number };
}

// Sample game data
const initialGames = [
  {
    id: "1",
    type: "Uno",
    location: "Library",
    time: "3:00 PM",
    playersJoined: 3,
    capacity: 4,
    status: "pending",
    isOwner: false,
    joined: false,
  },
  {
    id: "2",
    type: "Mafia",
    location: "Club Room",
    time: "4:30 PM",
    playersJoined: 5,
    capacity: 8,
    status: "pending",
    isOwner: true,
    joined: true,
  },
  {
    id: "3",
    type: "Mahjong",
    location: "Student Center",
    time: "5:00 PM",
    playersJoined: 3,
    capacity: 4,
    status: "matched",
    isOwner: false,
    joined: true,
  },
  {
    id: "4",
    type: "Chess",
    location: "Cafe",
    time: "6:15 PM",
    playersJoined: 1,
    capacity: 2,
    status: "pending",
    isOwner: false,
    joined: false,
  },
  {
    id: "5",
    type: "Monopoly",
    location: "Dorm Lounge",
    time: "7:30 PM",
    playersJoined: 2,
    capacity: 6,
    status: "pending",
    isOwner: false,
    joined: false,
  },
];

export default function Home() {
  const [games, setGames] = useState<Game[]>(initialGames as Game[]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Configure sensors for drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    }),
  );

  const filteredGames = games.filter((game) => {
    if (activeTab === "all") return true;
    if (activeTab === "joined") return game.joined;
    if (activeTab === "created") return game.isOwner;
    return true;
  });

  const handleJoinGame = (gameId: string) => {
    setGames(
      games.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            joined: true,
            playersJoined: game.playersJoined + 1,
            status:
              game.playersJoined + 1 >= game.capacity ? "matched" : game.status,
          };
        }
        return game;
      }),
    );
  };

  const handleCreateGame = (newGame: any) => {
    setGames([
      ...games,
      {
        ...newGame,
        id: (games.length + 1).toString(),
        playersJoined: 1,
        status: "pending",
        isOwner: true,
        joined: true,
      },
    ]);
    setIsCreateModalOpen(false);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const gameId = active.id as string;

    setGames(
      games.map((game) => {
        if (game.id === gameId) {
          // Calculate new position
          const currentPosition = game.position || { x: 0, y: 0 };
          return {
            ...game,
            position: {
              x: currentPosition.x + delta.x,
              y: currentPosition.y + delta.y,
            },
          };
        }
        return game;
      }),
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mr-2 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <span className="text-white font-bold">P</span>
            </motion.div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PlayNest
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={activeTab === "all" ? "default" : "outline"}
            className={cn(
              "rounded-full",
              activeTab === "all" ? "bg-indigo-600 hover:bg-indigo-700" : "",
            )}
            onClick={() => setActiveTab("all")}
          >
            All Games
          </Button>
          <Button
            variant={activeTab === "joined" ? "default" : "outline"}
            className={cn(
              "rounded-full",
              activeTab === "joined" ? "bg-indigo-600 hover:bg-indigo-700" : "",
            )}
            onClick={() => setActiveTab("joined")}
          >
            Joined
          </Button>
          <Button
            variant={activeTab === "created" ? "default" : "outline"}
            className={cn(
              "rounded-full",
              activeTab === "created"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "",
            )}
            onClick={() => setActiveTab("created")}
          >
            Created
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Game Bubbles */}
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="relative h-full min-h-[400px]">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <AnimatePresence>
              {filteredGames.map((game, index) => (
                <GameBubble
                  key={game.id}
                  game={game}
                  onJoin={handleJoinGame}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </DndContext>
        </div>
      </div>

      {/* Create Game Button */}
      <div className="container mx-auto px-4 py-4 sticky bottom-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-6 shadow-lg"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" /> Create Game
          </Button>
        </motion.div>
      </div>

      {/* Create Game Modal */}
      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGame={handleCreateGame}
      />
    </div>
  );
}
