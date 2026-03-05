import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../constants';
import { Semester } from '../types';
import { AnimatedBackground } from './AnimatedBackground';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
  return (
    <motion.div
      className="w-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 h-screen fixed left-0 top-0 flex flex-col text-white border-r border-slate-700/50 backdrop-blur-xl"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header Logo */}
      <motion.div
        className="p-6 border-b border-slate-700/50 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity" />

        <h1 className="text-xl font-black tracking-tight relative bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          CTTEWC
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest mt-2 relative">
          🚀 NPTEL System
        </p>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group overflow-hidden ${
              activeTab === item.id
                ? 'text-white'
                : 'text-slate-400 hover:text-white'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            {activeTab === item.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Glow on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"
            />

            {item.icon && <span className="relative">{item.icon}</span>}
            <span className="relative font-medium text-sm">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.div className="p-4 border-t border-slate-700/50 space-y-3">
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 transition-colors relative group overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
          <span className="font-medium text-sm relative">🔓 Admin Logout</span>
        </motion.button>

        {/* Footer branding */}
        <motion.p
          className="text-xs text-slate-500 text-center mt-4"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          v1.0 Premium Edition
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

interface LayoutProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
  currentSemester: Semester | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout = ({ activeTab, setActiveTab, currentSemester, onLogout, children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative">
      {/* animated gradient background on all pages */}
      <AnimatedBackground />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      <main className="ml-64">
        {/* Top Header */}
        <motion.header
          className="flex justify-between items-center p-4 glass sticky top-0 z-40 backdrop-filter backdrop-blur-md border-b border-white/20"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-black neon bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              CTTEWC NPTEL Automation System
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentSemester && (
              <motion.div
                className="bg-gradient-to-r from-cyan-50 to-purple-50 px-6 py-3 rounded-2xl border border-gradient-to-r from-cyan-200 to-purple-200 flex items-center gap-3 shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                  animate={{ boxShadow: ['0 0 0 0 rgba(34,211,238,0.7)', '0 0 0 8px rgba(34,211,238,0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-bold text-slate-700">
                  {currentSemester.period} {currentSemester.year}
                </span>
              </motion.div>
            )}

            {/* Admin Avatar */}
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              AD
            </motion.div>
          </motion.div>
        </motion.header>

        {/* Content */}
        <motion.div
          className="p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
