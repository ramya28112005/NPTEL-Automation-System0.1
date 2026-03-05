import React from 'react';
import { motion } from 'motion/react';

import { COLLEGE_NAME, COLLEGE_ADDRESS, PRINCIPAL_NAME, SPOC_NAME, SPOC_DEPT, SPOC_ROLE, SPOC_ID } from '../constants';

const CollegeInfo = () => (
  <div className="space-y-8">
    {/* Header Section */}
    <div className="relative glass p-10 overflow-hidden border border-white/20 rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#22D3EE] opacity-20 animate-gradientBG"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <motion.h2
            className="text-4xl md:text-5xl font-black neon text-white mb-2"
            animate={{ opacity: [0,1] }}
            transition={{ duration: 2 }}
          >
            {COLLEGE_NAME}
          </motion.h2>
          <motion.p
            className="text-lg text-teal-200"
            animate={{ y: [10,0,10] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Arts and Science College for Women
          </motion.p>
        </div>
        <motion.img
          src="/image%202.PNG"
          alt="College Logo"
          className="h-32 w-auto drop-shadow-xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </div>

    {/* Images Section - Two Column */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.img
        src="/image%205.PNG"
        alt="Campus View"
        className="w-full h-64 object-cover rounded-3xl shadow-xl border border-white/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      />
      <motion.img
        src="/image%201.PNG"
        alt="College Building"
        className="w-full h-64 object-cover rounded-3xl shadow-xl border border-white/20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      />
    </div>

    {/* Details Section - Three Column */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* College Address */}
      <motion.div
        className="glass p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-white/20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="text-4xl mb-4">📍</div>
        <h3 className="text-xl font-bold text-white mb-4">College Address</h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          {COLLEGE_ADDRESS}
        </p>
      </motion.div>

      {/* Principal Details */}
      <motion.div
        className="glass p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-white/20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <motion.img
          src="/image%203.PNG"
          alt="Principal"
          className="w-20 h-20 rounded-xl object-cover mb-4 shadow-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-2">Principal</h4>
        <p className="text-xl font-bold text-white">{PRINCIPAL_NAME}</p>
        <p className="text-sm text-slate-300">CTTE College for Women</p>
      </motion.div>

      {/* SPoC Details */}
      <motion.div
        className="glass p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-white/20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -5 }}
      >
        <motion.img
          src="/image%204.PNG"
          alt="SPoC"
          className="w-20 h-20 rounded-xl object-cover mb-4 shadow-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-2">SPoC (Student Coordinator)</h4>
        <p className="text-lg font-bold text-white mb-1">{SPOC_NAME}</p>
        <p className="text-xs text-slate-400 mb-2">{SPOC_ROLE}</p>
        {/* removed top border line per request */}
        <div className="mt-2">
          <p className="text-xs font-semibold text-[#6366F1]">{SPOC_DEPT}</p>
          <p className="text-xs font-mono text-slate-400">{SPOC_ID}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default CollegeInfo;
