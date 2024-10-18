import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './brand.api';

export const brandMenus = [
  {
    label: 'Manage Brands',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Brands Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Brands', icon: <FaPlus /> },
      { to: `${mainUrl}/list`, label: 'Brands List', icon: <FaUsers /> },
    ],
  },
];

