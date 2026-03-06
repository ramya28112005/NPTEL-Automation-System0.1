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

export const COLLEGE_NAME = 'CTTE College for Women';
export const COLLEGE_ADDRESS = `16, St.Mary's Road, Gollam Thottam, Maryland Sembiyan, Perambur, Chennai, Tamil Nadu 600011`;
export const PRINCIPAL_NAME = 'Dr. S. Sridevi';
export const SPOC_NAME = 'V. Sugnathi';
export const SPOC_DEPT = 'Department of Computer Science';
export const SPOC_ROLE = 'Assistant Professor';
export const SPOC_ID = 'SPOC NPTEL';