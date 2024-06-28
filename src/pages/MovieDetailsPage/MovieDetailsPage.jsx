import { useEffect, lazy, useState, useRef, Suspense } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../../movies-api";
// import { MovieInfo } from "../../components/MovieInfo/MovieInfo";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";
const MovieInfo = lazy(() => import("../../components/MovieInfo/MovieInfo"));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getMovieById() {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setLoading(false);
        setMovies(data);
      } catch (error) {
        setError(true);
      }
    }

    getMovieById();
  }, [movieId]);

  return (
    <div>
      <div>
        <p className={css.back_link}>
          <Link to={backLink.current}>Go back</Link>
        </p>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {movies && <MovieInfo movie={movies} />}
        <hr className={css.line} />
        <div className={css.container}>
          <h2 className={css.title}>Additional information</h2>
          <ul className={css.links}>
            <li>
              <Link className={css.link} to="cast">
                Cast
              </Link>
            </li>
            <li>
              <Link className={css.link} to="reviews">
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <hr className={css.line} />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}