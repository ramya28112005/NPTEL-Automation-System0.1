import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onEnter: () => void;
}

const Welcome = ({ onEnter }: WelcomeProps) => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/image%201.PNG)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        {/* Logo/Icon */}
        <div
          className="flex justify-center mb-8"
        >
          <img 
            src="/images/image%202.PNG" 
            alt="CTTEWC Logo" 
            className="h-32 w-auto drop-shadow-xl"
          />
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg"
        >
          Welcome to NPTEL
        </h1>

        {/* Subheading */}
        <p
          className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md"
        >
          CTTEWC Automation System
        </p>

        {/* Description */}
        <p
          className="text-lg text-white/80 mb-12 drop-shadow-md max-w-lg mx-auto leading-relaxed"
        >
          Streamline your NPTEL course management with our comprehensive automation platform. 
          Manage enrollments, track certifications, and generate insightful reports effortlessly.
        </p>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all"
        >
          Get Started <ArrowRight size={24} />
        </button>

        {/* Bottom Text */}
        <p
          className="text-white/60 text-sm mt-12 drop-shadow-md"
        >
          Sign in with your credentials to access the system
        </p>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 right-10 text-white/20 text-6xl"
      >
        📚
      </div>
      <div
        className="absolute bottom-20 left-10 text-white/20 text-6xl"
      >
        🎓
      </div>
    </div>
  );
};

export default Welcome;
