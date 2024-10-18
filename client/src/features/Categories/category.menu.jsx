import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './category.api';

export const categoryMenus = [
  {
    label: 'Manage Categories',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Categories Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Categories', icon: <FaPlus /> },
      { to: `${mainUrl}/list`, label: 'Categories List', icon: <FaUsers /> },
    ],
  },
];

