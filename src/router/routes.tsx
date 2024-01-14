import { Loader } from 'components/UI';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { Contacts } from '../pages';
import { NotFound } from '../pages';
import { Root } from '../pages';

const TimeLine = lazy(() => import('../pages').then((module) => ({ default: module['TimeLine'] })));

const Home = lazy(() => import('../pages').then((module) => ({ default: module['Home'] })));

const BankMap = lazy(() => import('../pages').then((module) => ({ default: module['BankMap'] })));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Root />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/timeline',
        element: <TimeLine />,
      },
      {
        path: '/bankmap',
        element: <BankMap />,
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
