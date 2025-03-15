"use client";

import { useGameRequests } from "@/lib/hook/useGameRequests";
import { State } from "@/models/game-request";

export default function Demo() {
  const { gameRequests, loading, error, addGameRequest } = useGameRequests();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Game Requests</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() =>
          addGameRequest({
            location: "New Library",
            startTime: new Date(),
            capacity: 5,
            userId: "user123",
            state: State.Pending,
            num_player: 1,
            type: "Uno",
          })
        }
      >
        Add New Game Request
      </button>
      <ul>
        {gameRequests.length === 0 ? (
          <p>No game requests found.</p>
        ) : (
          gameRequests.map((request) => (
            <li key={request.id}>
              <strong>Type:</strong> {request.type} <br />
              <strong>Location:</strong> {request.location} <br />
              <strong>Start Time:</strong> {request.startTime.toLocaleString()} <br />
              <strong>Capacity:</strong> {request.capacity} <br />
              <strong>Players Joined:</strong> {request.num_player} / {request.capacity} <br />
              <strong>State:</strong> {request.state} <br />
              <strong>Created By:</strong> {request.userId} <br />
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
