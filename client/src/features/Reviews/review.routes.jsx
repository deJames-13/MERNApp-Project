import React from 'react';
import { dashUrl as mainUrl } from './review.api';

const ReviewForm = React.lazy(() => import('./components/ReviewForm'));
const ReviewPage = React.lazy(() => import('./components/ReviewPage'));
const ReviewTable = React.lazy(() => import('./components/ReviewTable'));

export const reviewRoutes = [
  { path: `${mainUrl}/table`, element: <ReviewTable /> },
  { path: mainUrl, element: <ReviewPage /> },
  {
    path: `${mainUrl}/create`,
    element: (
      <ReviewForm
        action="create"
        title="Create Review"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/view`,
    element: (
      <ReviewForm
        action="view"
        title="View Review"
      />
    ),
  },
  {
    path: `${mainUrl}/:slug/edit`,
    element: (
      <ReviewForm
        action="edit"
        title="Edit Review"
      />
    ),
  },
];
