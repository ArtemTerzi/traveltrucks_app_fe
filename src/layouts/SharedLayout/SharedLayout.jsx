import { Outlet } from 'react-router';

const SharedLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
