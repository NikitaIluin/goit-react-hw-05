import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

import Loader from './components/Loader/Loader';

function App() {
  return (
    <>
      <Navigation>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Navigation>
    </>
  );
}

export default App;