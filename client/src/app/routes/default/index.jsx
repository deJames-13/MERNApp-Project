import { authRoutes } from '@features';
import { DefaultLayout } from '@layouts';
import * as Screen from '@screens';

const defaultRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Screen.Shop />,
        // element: <Screen.Home />,
      },
      {
        path: '/shop',
        element: <Screen.Shop />,
      },
      {
        path: '/cart',
        element: <Screen.Cart />,
      },
      {
        path: '/shop/:slug',
        element: <Screen.ProductDisplay />,
      },
      {
        path: '/about',
        element: <Screen.About />,
      },

      ...authRoutes,
    ],
  },
];

export default defaultRoutes;
