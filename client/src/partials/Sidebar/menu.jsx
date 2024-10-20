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
    ...features.orderMenus,
  ...features._exampleMenus,
  ...features.brandMenus,
  ...features.productMenus,
  ...features.courierMenus,
  ...features.supplierMenus,
  ...features.categoryMenus,
  ...features.userMenus,
].sort((a, b) => a.label.localeCompare(b.label));

export default makeMenu;

