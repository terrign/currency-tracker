import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/timeline">Timeline</NavLink>
        </li>
        <li>
          <NavLink to="/bankmap">Bank Map</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">Contacts</NavLink>
        </li>
      </nav>
    </header>
  );
}

export default Header;
