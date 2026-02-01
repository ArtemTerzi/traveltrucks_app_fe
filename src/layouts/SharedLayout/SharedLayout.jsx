import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';
import { ToastContainer } from 'react-toastify';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default SharedLayout;
