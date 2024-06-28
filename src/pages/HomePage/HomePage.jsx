import { useEffect, useState, lazy } from "react";
import { getTrendingMovies } from "../../../movies-api";
// import { MovieList } from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
import css from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setLoading(false);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);
  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
    </div>
  );
}