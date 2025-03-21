import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Globe, Rocket, Brain, 
  ChevronRight, ArrowRight, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { BackButton } from '../components/BackButton';

const tracks = [
  {
    id: 'ai-ml',
    icon: <Brain className="w-12 h-12" />,
    title: "AI & Machine Learning",
    description: "Build the next generation of intelligent applications",
    longDescription: "Dive into the world of artificial intelligence and machine learning. Create innovative solutions using cutting-edge technologies like deep learning, natural language processing, computer vision, and more.",
    challenges: [
      "Build an AI-powered personal assistant",
      "Create a computer vision application for social good",
      "Develop a predictive analytics solution for healthcare",
      "Design an AI-driven recommendation system"
    ],
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Hugging Face"],
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 'web3',
    icon: <Globe className="w-12 h-12" />,
    title: "Web3 & Blockchain",
    description: "Create decentralized solutions for the future",
    longDescription: "Explore the potential of blockchain technology and decentralized applications. Build solutions that leverage smart contracts, DeFi, NFTs, and other Web3 technologies.",
    challenges: [
      "Create a DeFi application",
      "Build a decentralized marketplace",
      "Develop a blockchain-based voting system",
      "Design an NFT platform for creators"
    ],
    tools: ["Ethereum", "Solidity", "Web3.js", "IPFS", "Hardhat"],
    color: "from-emerald-500/20 to-blue-500/20"
  },
  {
    id: 'open',
    icon: <Rocket className="w-12 h-12" />,
    title: "Open Innovation",
    description: "Solve real-world problems with creative solutions",
    longDescription: "Let your creativity run wild! This track is for innovative solutions that don't fit into traditional categories. Whether it's a unique web application, mobile solution, or novel use of emerging technologies.",
    challenges: [
      "Build a solution for environmental sustainability",
      "Create an innovative EdTech platform",
      "Develop a social impact project",
      "Design a smart city application"
    ],
    tools: ["Any modern tech stack", "Cloud Services", "IoT", "Mobile Technologies"],
    color: "from-purple-500/20 to-pink-500/20"
  }
];

function TrackCard({ track, isSelected, onClick, onRegister }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(track)}
      className={`relative cursor-pointer transition-all duration-300 ${
        isSelected ? 'lg:col-span-2 row-span-2' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${track.color} rounded-3xl blur-xl transition-all duration-300 ${
        isSelected ? 'opacity-100' : 'opacity-50'
      }`}></div>
      
      <div className="relative h-full border border-white/10 rounded-3xl p-6 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0"></div>
        
        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${
              isSelected ? 'lg:w-20 lg:h-20' : ''
            }`}
          >
            {track.icon}
          </motion.div>

          <h3 className={`font-bold mb-4 transition-all duration-300 ${
            isSelected ? 'text-3xl lg:text-4xl' : 'text-2xl'
          }`}>
            {track.title}
          </h3>

          <p className="text-gray-300 mb-6">
            {isSelected ? track.longDescription : track.description}
          </p>

          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h4 className="text-lg font-semibold mb-3">Challenges</h4>
                <div className="grid gap-2">
                  {track.challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      {challenge}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Recommended Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {track.tools.map((tool, index) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 rounded-full bg-white/5 text-sm"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onRegister(track);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Register for this Track
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Tracks() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleTrackClick = (track) => {
    setSelectedTrack(selectedTrack?.id === track.id ? null : track);
  };

  const handleRegister = (track) => {
    const trackData = {
      id: track.id,
      title: track.title,
      description: track.description
    };
    navigate('/register', { state: { track: trackData } });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <BackButton />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16" ref={containerRef}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-8 p-4 rounded-full bg-blue-500/5 backdrop-blur-sm"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Code className="w-12 h-12 text-blue-400" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            What Will You Innovate Today?
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your track and start building the next big thing. Each track offers unique challenges and opportunities to showcase your skills.
          </p>
        </motion.div>

        {/* Tracks Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="wait">
            {tracks.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                isSelected={selectedTrack?.id === track.id}
                onClick={handleTrackClick}
                onRegister={handleRegister}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}