import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './supplier.api';

export const supplierMenus = [
  {
    label: 'Manage Suppliers',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Suppliers Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Suppliers', icon: <FaPlus /> },
      { to: `${mainUrl}/list`, label: 'Suppliers List', icon: <FaUsers /> },
    ],
  },
];

