import { Outlet } from 'react-router-dom';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader/Index';
import { Layout } from '../../components/UI';
import { Notification } from '../../components/UI';

export function Root() {
  return (
    <>
      <Header />
      <Notification />
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
