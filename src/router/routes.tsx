import { RouteObject } from 'react-router-dom';

import CurrencyModal from '../components/CurrencyModal';
import BankMap from '../pages/BankMap';
import Contacts from '../pages/Contacts';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Root from '../pages/Root';
import TimeLine from '../pages/TimeLine';
import homeLoader from './homeLoader';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: homeLoader,
        children: [
          {
            path: '/:currencyISO',
            element: <CurrencyModal />,
          },
        ],
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
