import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './review.api';

export const reviewMenus = [
  {
    label: 'Manage Reviews',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Reviews Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Reviews', icon: <FaPlus /> },
    ],
  },
];

