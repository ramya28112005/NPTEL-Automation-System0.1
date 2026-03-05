import React, { useState, useEffect } from 'react';
import { Semester } from './types';
import { dataService } from './services/dataService';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import Login from './components/Login';
import CollegeInfo from './components/CollegeInfo';
import SemesterConfig from './components/SemesterConfig';
import UploadData from './components/UploadData';
import HODSetup from './components/HODSetup';
import Automation from './components/Automation';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('college-info');
  const [currentSemester, setCurrentSemester] = useState<Semester | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCurrentSemester = async () => {
    const semesters = await dataService.getSemesters();
    setCurrentSemester(semesters.find((s: Semester) => s.is_active === 1) || null);
  };

  useEffect(() => {
    fetchCurrentSemester();
  }, []);

  if (showWelcome) {
    return <Welcome onEnter={() => setShowWelcome(false)} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      currentSemester={currentSemester}
      onLogout={() => setIsLoggedIn(false)}
    >
      {activeTab === 'college-info' && <CollegeInfo />}
      {activeTab === 'upload-data' && (
        <>
          <SemesterConfig onSemesterChange={fetchCurrentSemester} currentSemester={currentSemester} />
          <UploadData semester={currentSemester} />
        </>
      )}
      {activeTab === 'hod-setup' && <HODSetup />}
      {activeTab === 'automation' && <Automation />}
      {activeTab === 'dashboard' && <Dashboard semester={currentSemester} />}
      {activeTab === 'reports' && <Reports semester={currentSemester} />}
    </Layout>
  );
}
