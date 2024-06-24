import { useEffect, useState } from 'react';
import { requestMovies } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const { results } = await requestMovies();
        setPopularMovies(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, []);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {popularMovies !== null && <MovieList movies={popularMovies} />}
    </>
  );
};

export default HomePage;