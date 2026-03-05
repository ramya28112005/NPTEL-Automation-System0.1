import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import ReminderModal from './ReminderModal';

const Automation = () => {
  const [showModal, setShowModal] = useState<'Enrollment' | 'Registration' | null>(null);
  const [automationEnabled, setAutomationEnabled] = useState({ enrollment: true, registration: false });

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-2xl shadow-lg border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-2">Automation Controls</h3>
        <p className="text-slate-300 mb-8">Manage communication modules (Module 8)</p>

        <div className="glass p-8 rounded-3xl border border-white/20 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">Module 8</div>
          <div className="flex items-start gap-6">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl shadow-lg">
              <Bell size={32} />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">Reminder Emails</h4>
              <p className="text-slate-300 mt-2 max-w-md">
                User-triggered notifications for deadlines. Can be sent anytime during the semester cycle.
              </p>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl">
                  <span className="font-bold text-white">Enrollment Reminders</span>
                  <motion.button
                    onClick={() => setAutomationEnabled({ ...automationEnabled, enrollment: !automationEnabled.enrollment })}
                    className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${
                      automationEnabled.enrollment ? 'bg-[#22D3EE]' : 'bg-slate-600'
                    }`}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-white"
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{ marginLeft: automationEnabled.enrollment ? '24px' : '0px' }}
                    />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl">
                  <span className="font-bold text-white">Registration Reminders</span>
                  <motion.button
                    onClick={() => setAutomationEnabled({ ...automationEnabled, registration: !automationEnabled.registration })}
                    className={`w-14 h-8 rounded-full flex items-center p-1 transition-colors ${
                      automationEnabled.registration ? 'bg-[#22D3EE]' : 'bg-slate-600'
                    }`}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full bg-white"
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      style={{ marginLeft: automationEnabled.registration ? '24px' : '0px' }}
                    />
                  </motion.button>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <motion.button 
                  onClick={() => setShowModal('Enrollment')}
                  whileHover={{ scale: 1.05 }}
                  className="btn-gradient px-6 py-3 rounded-xl font-bold flex-1"
                >
                  Send Enrollment
                </motion.button>
                <motion.button 
                  onClick={() => setShowModal('Registration')}
                  whileHover={{ scale: 1.05 }}
                  className="btn-gradient px-6 py-3 rounded-xl font-bold flex-1"
                >
                  Send Registration
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <ReminderModal type={showModal} onClose={() => setShowModal(null)} />}
    </div>
  );
};

export default Automation;
