import React from 'react';
import { dashUrl as mainUrl } from './category.api';

const CategoryForm = React.lazy(() => import('./components/CategoryForm'));
const CategoryPage = React.lazy(() => import('./components/CategoryPage'));
const CategoryList = React.lazy(() => import('./components/CategoryList'));
const CategoryTable = React.lazy(() => import('./components/CategoryTable'));

export const categoryRoutes = [
  { path: `${mainUrl}/table`, element: <CategoryTable /> },
  { path: `${mainUrl}/list`, element: <CategoryList /> },
  { path: mainUrl, element: <CategoryPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <CategoryForm
        action="create"
        title="Create Category"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <CategoryForm
        action="view"
        title="View Category"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <CategoryForm
        action="edit"
        title="Edit Category"
      />
    ),
  },
];
