import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onEnter: () => void;
}

const Welcome = ({ onEnter }: WelcomeProps) => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(/image%201.PNG)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        {/* Logo/Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/image%202.PNG" 
            alt="CTTEWC Logo" 
            className="h-32 w-auto drop-shadow-xl"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg"
        >
          Welcome to NPTEL
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md"
        >
          CTTEWC Automation System
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-white/80 mb-12 drop-shadow-md max-w-lg mx-auto leading-relaxed"
        >
          Streamline your NPTEL course management with our comprehensive automation platform. 
          Manage enrollments, track certifications, and generate insightful reports effortlessly.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all"
        >
          Get Started <ArrowRight size={24} />
        </motion.button>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/60 text-sm mt-12 drop-shadow-md"
        >
          Sign in with your credentials to access the system
        </motion.p>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-10 text-white/20 text-6xl"
      >
        📚
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-10 text-white/20 text-6xl"
      >
        🎓
      </motion.div>
    </div>
  );
};

export default Welcome;
