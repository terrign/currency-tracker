import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import ErrorBoundary from '../components/ErrorBoundary';
import Loader from '../components/UI/Loader';
import Contacts from '../pages/Contacts';
import NotFound from '../pages/NotFound';
import Root from '../pages/Root';

const TimeLine = lazy(() => import('../pages/TimeLine'));

const Home = lazy(() => import('../pages/Home'));

const BankMap = lazy(() => import('../pages/BankMap'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/timeline',
        element: (
          <Suspense fallback={<Loader />}>
            <TimeLine />
          </Suspense>
        ),
      },
      {
        path: '/bankmap',
        element: (
          <Suspense fallback={<Loader />}>
            <BankMap />
          </Suspense>
        ),
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];

export default routes;
