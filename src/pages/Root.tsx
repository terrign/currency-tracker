import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';

function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
