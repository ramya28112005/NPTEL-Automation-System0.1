import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Department } from '../types';
import { dataService } from '../services/dataService';

const HODSetup = () => {
  const [depts, setDepts] = useState<Department[]>([]);
  const [emails, setEmails] = useState<Record<number, string>>({});
  const [testing, setTesting] = useState<number | null>(null);

  useEffect(() => {
    dataService.getDepartments().then(data => {
      setDepts(data);
      const initialEmails: Record<number, string> = {};
      data.forEach((d: Department) => {
        initialEmails[d.id] = d.hod_email || '';
      });
      setEmails(initialEmails);
    });
  }, []);

  const handleSave = async () => {
    const hods = Object.entries(emails).map(([id, email]) => ({ id: parseInt(id), email: email as string }));
    await dataService.saveHods(hods);
    alert('HOD Emails Saved Successfully!');
  };

  const testEmail = async (id: number, email: string) => {
    if (!email) return;
    setTesting(id);
    try {
      await dataService.sendEmail({
        to: email,
        subject: "NPTEL System: SMTP Test Email",
        text: "This is a test email to verify your SMTP settings in the NPTEL Automation System.\n\nIf you received this, your email configuration is working correctly!"
      });
      alert(`✅ Test email sent successfully to ${email}`);
    } catch (error: any) {
      console.error(error);
      alert(`❌ SMTP Error: ${error.message || "Failed to send test email"}`);
    } finally {
      setTesting(null);
    }
  };

  return (
    <div className="glass p-8 rounded-2xl shadow-lg border border-white/20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white">Module 2: Department & HOD Setup</h3>
          <p className="text-slate-300 mt-1">Configure once. These remain stored for all future sessions.</p>
        </div>
        <motion.button 
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          className="btn-gradient px-8 py-3 rounded-xl font-bold shadow-md"
        >
          Save Configuration
        </motion.button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/20">
        <div className="flex justify-end mb-2">
          <input
            type="text"
            placeholder="Search departments…"
            className="px-4 py-2 bg-white/10 placeholder-slate-400 rounded-lg text-sm text-white focus:ring-2 focus:ring-[#6366F1] outline-none backdrop-blur-sm"
            onChange={(e) => {
              const term = e.target.value.toLowerCase();
              if (term) {
                setDepts(depts.filter(d => d.name.toLowerCase().includes(term) || d.code.toLowerCase().includes(term)));
              } else {
                dataService.getDepartments().then(setDepts);
              }
            }}
          />
        </div>
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-black/40 backdrop-blur-md text-slate-300 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Department Name</th>
              <th className="px-6 py-4">Identifier Code</th>
              <th className="px-6 py-4">HOD Email Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {depts.map((dept) => (
              <tr key={dept.id} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{dept.name}</td>
                <td className="px-6 py-4 font-mono text-xs text-[#6366F1]">{dept.code}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <input 
                    type="email"
                    value={emails[dept.id] || ''}
                    onChange={(e) => setEmails({ ...emails, [dept.id]: e.target.value })}
                    placeholder="hod.dept@cttewc.edu.in"
                    className="flex-1 p-2 bg-transparent border-b border-white/20 focus:border-[#6366F1] outline-none text-white"
                  />
                  <button 
                    onClick={() => testEmail(dept.id, emails[dept.id])}
                    disabled={testing === dept.id || !emails[dept.id]}
                    className="text-[10px] font-bold text-[#6366F1] bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-30"
                  >
                    {testing === dept.id ? 'Testing...' : 'Test'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HODSetup;
