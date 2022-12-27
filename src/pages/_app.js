import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Algo Trading Dashboard</title>
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
