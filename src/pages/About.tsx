import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code, Users2, Globe, Target, 
  ChevronRight, Instagram, Linkedin, 
  MessageSquare, Rocket, GraduationCap 
} from 'lucide-react';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { BackButton } from '../components/BackButton';

function About() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-block p-3 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm mb-6">
              <Code className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              The Coding Club
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Empowering students through technology, innovation, and collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Our Mission",
                description: "To foster innovation and learning through hands-on experience and peer collaboration."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Our Vision",
                description: "To become India's leading platform for technological innovation and learning."
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Our Impact",
                description: "Creating opportunities for students to build, learn, and grow together."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "2000+", label: "Students Mentored", icon: <Users2 /> },
              { number: "100+", label: "Projects Completed", icon: <Code /> },
              { number: "50+", label: "Workshops Conducted", icon: <GraduationCap /> },
              { number: "20+", label: "Industry Partners", icon: <Globe /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center"
                >
                  {stat.icon}
                </motion.div>
                <h3 className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"></div>
            <div className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of a vibrant community of tech enthusiasts and innovators.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link to="/tracks">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Join Hack The Future
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>

              <div className="flex justify-center gap-6">
                <a href="https://www.instagram.com/thecodingclubx/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/the-coding-club-922327356/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://chat.whatsapp.com/CaGrQ0yzarfGYMvEvYteum" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;