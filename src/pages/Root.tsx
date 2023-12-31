import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader/Index';
import Layout from '../components/UI/Layout';

function Root() {
  return (
    <>
      <Header />
      <Layout>
        <SubHeader />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Layout>
    </>
  );
}

export default Root;
