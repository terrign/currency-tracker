import { RouteObject } from 'react-router-dom';

import BankMap from '../pages/BankMap';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Root from '../pages/Root';
import TimeLine from '../pages/TimeLine';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
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

export default routes;
