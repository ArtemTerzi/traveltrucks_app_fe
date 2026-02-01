import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

const SharedLayout = lazy(
  () => import('../../layouts/SharedLayout/SharedLayout')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const CamperDetailsPage = lazy(
  () => import('../../pages/CamperDetailsPage/CamperDetailsPage')
);
const Features = lazy(() => import('../Features/Features'));
const Reviews = lazy(() => import('../Reviews/Reviews'));
const Loader = lazy(() => import('../Loader/Loader'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CamperDetailsPage />}>
            <Route index element={<Navigate to="features" replace />} />
            <Route path="features" element={<Features />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
