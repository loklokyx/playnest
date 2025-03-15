import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGame: (game: any) => void;
}

const gameTypes = [
  { id: "uno", name: "Uno", icon: "🎴", color: "bg-red-500" },
  { id: "mafia", name: "Mafia", icon: "🕵️", color: "bg-gray-800" },
  { id: "mahjong", name: "Mahjong", icon: "🀄", color: "bg-green-600" },
  { id: "chess", name: "Chess", icon: "♟️", color: "bg-amber-700" },
  { id: "monopoly", name: "Monopoly", icon: "🏢", color: "bg-blue-600" },
  { id: "poker", name: "Poker", icon: "🃏", color: "bg-purple-600" },
];

const locations = [
  { id: "library", name: "Library", icon: "📚" },
  { id: "club-room", name: "Club Room", icon: "🚪" },
  { id: "student-center", name: "Student Center", icon: "🏫" },
  { id: "cafe", name: "Cafe", icon: "☕" },
  { id: "dorm-lounge", name: "Dorm Lounge", icon: "🛋️" },
];

export default function CreateGameModal({
  isOpen,
  onClose,
  onCreateGame,
}: CreateGameModalProps) {
  const [step, setStep] = useState(1);
  const [gameType, setGameType] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState(4);
  const [note, setNote] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    const selectedGameType =
      gameTypes.find((g) => g.id === gameType)?.name || "";
    const selectedLocation =
      locations.find((l) => l.id === location)?.name || "";

    onCreateGame({
      type: selectedGameType,
      location: selectedLocation,
      time,
      capacity,
      note,
    });

    // Reset form
    setStep(1);
    setGameType("");
    setLocation("");
    setTime("");
    setCapacity(4);
    setNote("");
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ type: "tween", damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <h2 className="text-xl font-bold">Create a Game</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="w-full h-1 bg-gray-100 dark:bg-gray-800">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: `${(step - 1) * 33.33}%` }}
              animate={{ width: `${step * 33.33}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Select Game Type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {gameTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGameType(type.id)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border-2 transition-all duration-200",
                        gameType === type.id
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                          : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                          type.color,
                        )}
                      >
                        <span className="text-2xl">{type.icon}</span>
                      </div>
                      <span className="text-sm font-medium">{type.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Select Location</h3>
                <RadioGroup
                  value={location}
                  onValueChange={setLocation}
                  className="space-y-2"
                >
                  {locations.map((loc) => (
                    <motion.div
                      key={loc.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200",
                        location === loc.id
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                          : "border-gray-200 dark:border-gray-800",
                      )}
                      onClick={() => setLocation(loc.id)}
                    >
                      <RadioGroupItem
                        value={loc.id}
                        id={loc.id}
                        className="sr-only"
                      />
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <span className="text-xl">{loc.icon}</span>
                      </div>
                      <Label htmlFor={loc.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{loc.name}</div>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Set Time & Capacity</h3>

                <div className="space-y-2">
                  <Label htmlFor="time">Game Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Player Capacity</Label>
                    <span className="text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full">
                      {capacity} players
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <Slider
                      value={[capacity]}
                      min={2}
                      max={10}
                      step={1}
                      onValueChange={(value) => setCapacity(value[0])}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Add a note (optional)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                    <textarea
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add any additional information..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t dark:border-gray-800 flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}

            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !gameType) || (step === 2 && !location)
                }
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!time || !capacity}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Create Game
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
