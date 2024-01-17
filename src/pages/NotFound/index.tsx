import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section>
      <p>Seems like the page you are looking for does not exist</p>
      <Link to="/">Back Home</Link>
    </section>
  );
}
