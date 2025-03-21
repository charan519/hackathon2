import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  team: string;
  score: number;
  category: string;
}

export function LeaderboardSection() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, team: "TechTitans", score: 950, category: "AI & ML" },
    { rank: 2, team: "BlockchainBusters", score: 920, category: "Web3" },
    { rank: 3, team: "DataDynamos", score: 890, category: "Open Innovation" },
    { rank: 4, team: "CloudChasers", score: 850, category: "AI & ML" },
    { rank: 5, team: "WebWizards", score: 820, category: "Web3" },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        updated[randomIndex] = {
          ...updated[randomIndex],
          score: updated[randomIndex].score + Math.floor(Math.random() * 10)
        };
        return updated.sort((a, b) => b.score - a.score)
          .map((entry, index) => ({ ...entry, rank: index + 1 }));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 neon-text"
        >
          Live Leaderboard
        </motion.h2>

        <div className="overflow-hidden glass-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Team</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <motion.tr
                    key={entry.team}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.rank === 1 && <Trophy className="w-5 h-5 text-yellow-400" />}
                        {entry.rank === 2 && <Medal className="w-5 h-5 text-gray-400" />}
                        {entry.rank === 3 && <Medal className="w-5 h-5 text-amber-700" />}
                        {entry.rank > 3 && <span className="w-5">{entry.rank}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">{entry.team}</td>
                    <td className="px-6 py-4">{entry.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {entry.score}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}