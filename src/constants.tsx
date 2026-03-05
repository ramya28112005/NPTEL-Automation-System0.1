import {
  Building,
  Upload,
  UserCheck,
  Zap,
  BarChart3,
  FileText,
} from 'lucide-react';

export const MENU_ITEMS = [
  {
    id: 'college-info',
    label: 'College Info',
    icon: <Building className="w-5 h-5" />,
  },
  {
    id: 'upload-data',
    label: 'Upload Data',
    icon: <Upload className="w-5 h-5" />,
  },
  {
    id: 'hod-setup',
    label: 'HOD Setup',
    icon: <UserCheck className="w-5 h-5" />,
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileText className="w-5 h-5" />,
  },
];

export const COLLEGE_NAME = 'CTTEWC';
export const COLLEGE_ADDRESS = 'College Address';
export const PRINCIPAL_NAME = 'Principal Name';
export const SPOC_NAME = 'SPOC Name';
export const SPOC_DEPT = 'SPOC Department';
export const SPOC_ROLE = 'SPOC Role';
export const SPOC_ID = 'SPOC ID';