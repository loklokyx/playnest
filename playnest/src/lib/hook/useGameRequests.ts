import { useEffect, useState } from "react";
import { databases } from "@/app/(auth)/auth"; // Fixed import path
import { GameRequest, State } from "@/models/game-request"; // Fixed import path using alias
import { ID } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_COLLECTION_ID!;

export function useGameRequests() {
  const [gameRequests, setGameRequests] = useState<GameRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // GET Request
  useEffect(() => {
    const fetchGameRequests = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const formattedData = response.documents.map((doc) => ({
          id: doc.$id,
          location: doc.location,
          startTime: new Date(doc.startTime),
          capacity: doc.capacity,
          userId: doc.userId,
          state: State[doc.state as keyof typeof State],
          num_player: doc.num_player,
          type: doc.type,
        }));

        setGameRequests(formattedData);
      } catch (err) {
        console.error("Error fetching game requests:", err);
        setError("Failed to fetch game requests");
      } finally {
        setLoading(false);
      }
    };

    fetchGameRequests();
  }, []);

  // Post Request
  const addGameRequest = async (newGameRequest: Omit<GameRequest, "id">) => {
    try {
      const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        location: newGameRequest.location,
        startTime: newGameRequest.startTime.toISOString(), 
        capacity: newGameRequest.capacity,
        userId: newGameRequest.userId,
        num_player: newGameRequest.num_player,
        state: newGameRequest.state.toString(),
        type: newGameRequest.type,
      });

      setGameRequests((prev) => [
        ...prev,
        { ...newGameRequest, id: response.$id }, 
      ]);
    } catch (err) {
      console.error("Error adding game request:", err);
      setError("Failed to add game request");
    }
  };

  return { gameRequests, loading, error, addGameRequest };
}
