import React from 'react';
import { dashUrl as mainUrl } from './courier.api';

const CourierForm = React.lazy(() => import('./components/CourierForm'));
const CourierPage = React.lazy(() => import('./components/CourierPage'));
const CourierList = React.lazy(() => import('./components/CourierList'));
const CourierTable = React.lazy(() => import('./components/CourierTable'));

export const courierRoutes = [
  { path: `${mainUrl}/table`, element: <CourierTable /> },
  { path: `${mainUrl}/list`, element: <CourierList /> },
  { path: mainUrl, element: <CourierPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <CourierForm
        action="create"
        title="Create Courier"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <CourierForm
        action="view"
        title="View Courier"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <CourierForm
        action="edit"
        title="Edit Courier"
      />
    ),
  },
];
