import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from './AnimatedBackground';
import { Building, User, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple login logic
    onLogin();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md glass p-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.img
            src="/images/image%202.PNG"
            alt="CTTEWC Logo"
            className="h-24 w-auto drop-shadow-xl mb-4"
          />
          <h1 className="text-3xl font-black tracking-tight neon">CTTEWC NPTEL</h1>
          <p className="text-slate-300 font-medium mt-1">Automation System Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#6366F1] outline-none transition-all backdrop-blur-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#6366F1] outline-none transition-all backdrop-blur-sm"
                required
              />
            </div>
          </div>
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-gradient py-4 text-lg shadow-md"
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-center text-xs text-slate-300 mt-10\">
          © 2026 Chevalier T. Thomas Elizabeth College for Women
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
