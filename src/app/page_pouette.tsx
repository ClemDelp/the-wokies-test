'use client';

import { useEffect, useState } from 'react';
import { Player } from '@/shared/models/player.model';
import { getAllPlayers, getPlayerCount } from '@/shared/models/player.repository';
import { AddPlayerModal } from '@/components/AddPlayerModal';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [playersData, countData] = await Promise.all([
        getAllPlayers(),
        getPlayerCount()
      ]);
      
      if (playersData) {
        setPlayers(playersData);
      }
      if (countData !== undefined) {
        setCount(countData);
      }
    };

    fetchData();
  }, []);

  const handleAddPlayer = (newPlayer: Player) => {
    setPlayers([...players, newPlayer]);
    setCount(prev => prev + 1);
    setIsModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">The Wokies</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Players ({count})</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Add Player
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div key={player.id} className="border p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{player.name}</h3>
                <p className="text-gray-600">{player.mail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPlayer={handleAddPlayer}
      />
    </main>
  );
} 