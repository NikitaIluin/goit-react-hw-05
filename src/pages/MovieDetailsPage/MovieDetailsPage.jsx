import { lazy, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import { requestMoviesById } from '../../services/api';

const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));

// import MovieReviews from '../../components/MovieReviews/MovieReviews';
// import MovieCast from '../../components/MovieCast/MovieCast';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';
import { Suspense } from 'react';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');

  const getNavLinkClassNames = ({ isActive }) =>
    clsx(css.navLink, {
      [css.active]: isActive,
    });

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const results = await requestMoviesById(movieId);
        setMovie(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  return (
    <>
      <div>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}

        {movie !== null && (
          <div className={css.movieWrapper}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie.original_title"
            />

            <div className={css.informWrapper}>
              <Link className={css.linkGoBack} to={backLinkRef.current}>
                Go back
              </Link>

              <h1>{movie.original_title}</h1>
              <div>
                <h3>Overview: </h3>
                <p>{movie.overview}</p>
              </div>
              <div>
                <h3>Genres:</h3>
                <ul>
                  {movie.genres.map(genre => {
                    return (
                      <li key={genre.id}>
                        <h4>{genre.name}</h4>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={css.navLinkWrapper}>
        <NavLink to="cast" className={getNavLinkClassNames}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={getNavLinkClassNames}>
          Reviews
        </NavLink>
      </div>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;