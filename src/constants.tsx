import { Building, UploadCloud, Users, Settings, BarChart2, Grid } from 'lucide-react';

export const MENU_ITEMS = [
  { id: 'college-info', label: 'College Info', icon: <Building size={20} /> },
  { id: 'upload-data', label: 'Upload Data', icon: <UploadCloud size={20} /> },
  { id: 'hod-setup', label: 'HOD Setup', icon: <Users size={20} /> },
  { id: 'automation', label: 'Automation', icon: <Settings size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart2 size={20} /> },
  { id: 'dashboard', label: 'Dashboard', icon: <Grid size={20} /> },
];

export const COLLEGE_NAME = "Chevalier T. Thomas Elizabeth College for Women";
export const COLLEGE_ADDRESS = "No: 16, St. Mary's Road, Maryland, Sembium, Perambur, Chennai, Tamil Nadu – 600011";
export const PRINCIPAL_NAME = "Dr. S. Sridevi";
export const SPOC_NAME = "Mrs. V. Suganthi";
export const SPOC_ROLE = "Assistant Professor";

export const SPOC_ID = "SPOC NPTEL";
export const SPOC_DEPT = "Department of Computer Science";