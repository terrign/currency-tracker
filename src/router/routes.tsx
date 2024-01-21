import { Loader } from 'components/UI';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { Route } from 'types';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { Contacts, NotFound, Root } from '../pages';

const TimeLine = lazy(() => import('../pages').then((module) => ({ default: module['TimeLine'] })));

const Home = lazy(() => import('../pages').then((module) => ({ default: module['Home'] })));

const BankMap = lazy(() => import('../pages').then((module) => ({ default: module['BankMap'] })));

export const routes: RouteObject[] = [
  {
    path: Route.HOME,
    element: (
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <Root />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: Route.HOME,
        element: <Home />,
      },
      {
        path: Route.TIMELINE,
        element: <TimeLine />,
      },
      {
        path: Route.BANKMAP,
        element: <BankMap />,
      },
      {
        path: Route.CONTACTS,
        element: <Contacts />,
      },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];
