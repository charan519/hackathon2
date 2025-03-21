import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Users2, MessageSquare, ChevronRight, Home } from 'lucide-react';
import { ParticlesBackground } from './ParticlesBackground';
import { useScrollToTop } from '../hooks/useScrollToTop';
import confetti from 'canvas-confetti';

interface RegistrationSuccessProps {
  onClose: () => void;
}

export function RegistrationSuccess({ onClose }: RegistrationSuccessProps) {
  useScrollToTop();

  useEffect(() => {
    // Create a more elaborate confetti animation
    const end = Date.now() + 500; // 0.5 seconds duration

    // Create a confetti cannon effect
    const colors = ['#60A5FA', '#818CF8', '#A78BFA', '#34D399', '#6EE7B7'];
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });

    // Start the side cannons
    frame();

    // Cleanup
    return () => {
      confetti.reset();
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      <ParticlesBackground />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,255,0.1),transparent_70%)]"></div>
      
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Glowing orb background effect */}
          <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-purple-500/20 blur-3xl"></div>
          
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="relative"
          >
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-1 bg-[var(--gradient-start)] rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
              Welcome to Hack with India 2025!
            </h1>
            <p className="text-xl text-gray-300">
              Your team has been successfully registered.
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 mb-12"
          >
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Check Your Email",
                description: "We've sent you a confirmation email with important details."
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Join WhatsApp Community",
                description: "Connect with fellow participants and get real-time updates."
              },
              {
                icon: <Users2 className="w-6 h-6" />,
                title: "Team Collaboration",
                description: "Start collaborating with your team members."
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 flex items-start gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://chat.whatsapp.com/CaGrQ0yzarfGYMvEvYteum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 transition-all duration-300 shadow-lg shadow-green-500/20"
              >
                <MessageSquare className="w-5 h-5" />
                Join WhatsApp Community
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </a>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}