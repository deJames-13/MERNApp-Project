import React from 'react';
import { dashUrl as mainUrl } from './order.api';

const OrderForm = React.lazy(() => import('./components/OrderForm'));
const OrderPage = React.lazy(() => import('./components/OrderPage'));
const OrderTable = React.lazy(() => import('./components/OrderTable'));

export const orderRoutes = [
  { path: `${mainUrl}/table`, element: <OrderTable /> },
  { path: mainUrl, element: <OrderPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <OrderForm
        action="create"
        title="Create Order"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <OrderForm
        action="view"
        title="View Order"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <OrderForm
        action="edit"
        title="Edit Order"
      />
    ),
  },
];
