import React from 'react';
import { dashUrl as mainUrl } from './brand.api';

const BrandForm = React.lazy(() => import('./components/BrandForm'));
const BrandPage = React.lazy(() => import('./components/BrandPage'));
const BrandList = React.lazy(() => import('./components/BrandList'));
const BrandTable = React.lazy(() => import('./components/BrandTable'));

export const brandRoutes = [
  { path: `${mainUrl}/table`, element: <BrandTable /> },
  { path: `${mainUrl}/list`, element: <BrandList /> },
  { path: mainUrl, element: <BrandPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <BrandForm
        action="create"
        title="Create Brand"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <BrandForm
        action="view"
        title="View Brand"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <BrandForm
        action="edit"
        title="Edit Brand"
      />
    ),
  },
];
