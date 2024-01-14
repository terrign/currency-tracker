import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <p>Seems like the page you are looking for does not exist</p>
      <Link to="/">Back Home</Link>
    </div>
  );
}
