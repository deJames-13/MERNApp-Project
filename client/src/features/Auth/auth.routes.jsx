import { Auth } from './components';

export const authRoutes = [
  {
    path: '/login',
    element: <Auth page="login" />,
  },
  {
    path: '/signup',
    element: <Auth page="signup" />,
  },
  {
    path: '/onboarding',
    element: <Auth page="onboarding" />,
  },
  {
    path: '/verify-email',
    element: <Auth page="verify-email" />,
  }
];
