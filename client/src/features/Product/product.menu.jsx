import { FaPlus, FaTable, FaUsers } from 'react-icons/fa';
import { dashUrl as mainUrl } from './product.api';

export const productMenus = [
  {
    label: 'Manage Products',
    type: 'dropdown',
    to: mainUrl,
    icon: <FaTable />,
    subLinks: [
      { to: `${mainUrl}/table`, label: 'Products Table', icon: <FaTable /> },
      { to: `${mainUrl}/create`, label: 'Create Products', icon: <FaPlus /> },
      { to: `${mainUrl}/list`, label: 'Products List', icon: <FaUsers /> },
    ],
  },
];

