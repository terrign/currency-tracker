import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { SubHeader } from 'components/SubHeader/Index';
import { Layout, Notification } from 'components/UI';
import { Outlet } from 'react-router-dom';

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
