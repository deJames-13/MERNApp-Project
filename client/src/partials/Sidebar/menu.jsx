import * as features from '@features';
import { FaHome } from 'react-icons/fa';

const makeMenu = () => [
  {
    label: 'Home',
    type: 'link',
    to: '/dashboard',
    icon: <FaHome />,
  },
  // NEW ROUTE HERE ->
  ...features._exampleMenus,
  ...features.productMenus,
  ...features.courierMenus,
  ...features.supplierMenus,
  ...features.categoryMenus,
  ...features.userMenus,
];

export default makeMenu;

