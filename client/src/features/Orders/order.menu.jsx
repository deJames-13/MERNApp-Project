import { FaTable } from 'react-icons/fa';
import { dashUrl as mainUrl } from './order.api';

export const orderMenus = [
  {
    label: 'Manage Orders',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Orders Table', icon: <FaTable /> },
    ],
  },
];

