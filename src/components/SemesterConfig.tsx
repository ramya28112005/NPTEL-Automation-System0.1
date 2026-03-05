import React, { useState } from 'react';
import { Semester } from '../types';
import { dataService } from '../services/dataService';

interface SemesterConfigProps {
  onSemesterChange: () => void;
  currentSemester: Semester | null;
}

const SemesterConfig = ({ onSemesterChange, currentSemester }: SemesterConfigProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [period, setPeriod] = useState('July - December');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleCreate = async () => {
    if (loading) return;
    setLoading(true);
    setMessage(null);
    
    try {
      const result = await dataService.createSemester(year, period);
      console.log('✅ Semester created:', result);
      setMessage({ type: 'success', text: `Semester ${period} ${year} activated successfully!` });
      
      // Wait a moment then refresh
      setTimeout(() => {
        onSemesterChange();
      }, 500);
    } catch (error: any) {
      console.error('❌ Semester creation failed:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to create semester: ${error.message || 'Unknown error'}. Check console for details.`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-2xl shadow-lg border border-white/20 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">1</div>
        <h3 className="text-xl font-bold">Semester Configuration</h3>
      </div>
      
      {message && (
        <div className={`mb-6 p-4 rounded-xl border ${
          message.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {currentSemester && (
        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p className="text-sm">
            <span className="font-bold text-indigo-700">✅ Current Active Semester: </span>
            <span className="text-indigo-600">{currentSemester.period} {currentSemester.year}</span>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Year</label>
          <select 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            disabled={loading}
            className="w-full p-3 bg-slate-900/80 text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {Array.from({ length: 10 }, (_, i) => 2026 + i).map(y => <option key={y} value={y} className="bg-slate-900 text-white">{y}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Semester</label>
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-slate-900/80 text-white border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="January - June" className="bg-slate-900 text-white">January - June</option>
            <option value="July - December" className="bg-slate-900 text-white">July - December</option>
          </select>
        </div>
      </div>
      
      <button 
        onClick={handleCreate}
        disabled={loading}
        className="mt-6 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating Semester...' : (currentSemester ? 'Update Semester' : 'Create & Select Semester')}
      </button>
    </div>
  );
};

export default SemesterConfig;
