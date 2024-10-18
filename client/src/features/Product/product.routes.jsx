import React from 'react';
import { dashUrl as mainUrl } from './product.api';

const ProductForm = React.lazy(() => import('./components/ProductForm'));
const ProductPage = React.lazy(() => import('./components/ProductPage'));
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductTable = React.lazy(() => import('./components/ProductTable'));

export const productRoutes = [
  { path: `${mainUrl}/table`, element: <ProductTable /> },
  { path: `${mainUrl}/list`, element: <ProductList /> },
  { path: mainUrl, element: <ProductPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <ProductForm
        action="create"
        title="Create Product"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <ProductForm
        action="view"
        title="View Product"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <ProductForm
        action="edit"
        title="Edit Product"
      />
    ),
  },
];
