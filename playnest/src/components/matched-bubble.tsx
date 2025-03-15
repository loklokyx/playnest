import { toast } from "sonner";
import { motion } from "framer-motion";

export interface MatchedPerson {
  name: string;
  contactNo: string;
}

interface MatchedBubbleProps {
  matchedPeople: MatchedPerson[];
}

export default function MatchedBubble({ matchedPeople }: MatchedBubbleProps) {
  const handleTap = () => {
    const matchedDetails = matchedPeople
      .map((person) => `Name: ${person.name}\nContact: ${person.contactNo}`)
      .join("\n\n");

    toast.custom(() => (
      <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          Matched Players
        </h2>
        <pre className="text-sm sm:text-base lg:text-lg text-gray-600 whitespace-pre-wrap">
          {matchedDetails}
        </pre>
      </div>
    ));
  };

  return (
    <motion.div
      onClick={handleTap}
      className="relative flex items-center justify-center rounded-full p-4 bg-green-500 shadow-lg cursor-pointer"
      style={{
        width: "60vw",
        height: "60vw",
        borderRadius: "50%",
      }}
    >
      <div className="text-white font-bold text-2xl sm:text-6xl lg:text-8xl">
        Matched!
      </div>
    </motion.div>
  );
}
