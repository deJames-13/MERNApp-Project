import React from 'react';
import { dashUrl as mainUrl } from './supplier.api';

const SupplierForm = React.lazy(() => import('./components/SupplierForm'));
const SupplierPage = React.lazy(() => import('./components/SupplierPage'));
const SupplierList = React.lazy(() => import('./components/SupplierList'));
const SupplierTable = React.lazy(() => import('./components/SupplierTable'));

export const supplierRoutes = [
  { path: `${mainUrl}/table`, element: <SupplierTable /> },
  { path: `${mainUrl}/list`, element: <SupplierList /> },
  { path: mainUrl, element: <SupplierPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <SupplierForm
        action="create"
        title="Create Supplier"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <SupplierForm
        action="view"
        title="View Supplier"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <SupplierForm
        action="edit"
        title="Edit Supplier"
      />
    ),
  },
];
