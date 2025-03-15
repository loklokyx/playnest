"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameBubble, { Game } from "@/components/game-bubble";
import CreateGameModal from "@/components/create-game-modal";
import { toast } from "sonner";

const game = {
  id: "1",
  type: "Uno",
  location: "Library",
  time: "3:00 PM",
  playersJoined: 3,
  capacity: 4,
  status: "pending",
  isOwner: false,
  joined: false,
} as Game;

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleJoinGame = (gameId: string) => {
    toast.success(`joined game ${gameId}`);
  };

  const handleCreateGame = (newGame: Game) => {
    toast.success(`game created ${newGame}`);
    setIsCreateModalOpen(false);
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

      {/* Game Bubble */}
      <div className="container mx-auto">
        <div className="w-full flex items-center justify-center py-4 pb-8">
          <GameBubble game={game} onJoin={handleJoinGame} />
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
