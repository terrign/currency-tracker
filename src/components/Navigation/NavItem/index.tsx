import { NavLink } from 'react-router-dom';
import { Route } from 'router/routes';

export const ROUTE_NAME_MAP: Record<Route, string> = {
  '/bankmap': 'Bank map',
  '/contacts': 'Contacts',
  '/': 'Home',
  '/timeline': 'Timeline',
};

export function NavItem({ route }: { route: Route }) {
  return (
    <li>
      <NavLink to={route}>{ROUTE_NAME_MAP[route]}</NavLink>
    </li>
  );
}
