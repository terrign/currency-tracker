import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from './routes';

function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default Router;
