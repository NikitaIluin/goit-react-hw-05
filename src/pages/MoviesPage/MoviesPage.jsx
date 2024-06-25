import { useEffect, useMemo, useState } from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchData } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchData('search/movie', { query });
        if (results.length === 0 && query) {
          toast("Sorry, we couldn't find anything");
          return;
        }
        setMovies(results);
      } catch (error) {
        toast.error('Oops! Something went wrong. Try reloading the page');
      } finally {
        setIsLoading(false)
      }
    };
    getData();
  }, [query]);

    const filteredMovies = useMemo (() => {
        return movies.filter(movie => movie.title.toLowerCase().includes(query.toLocaleLowerCase()))
    }, [movies, query])

    return (
        <div>
          <p className={css.text}>
            Search film by name
          </p>
          <SearchBox />
          {movies.length > 0 && <MovieList movies={filteredMovies} />}
          {query && isLoading && <Loader />}
          <Toaster />
        </div>
      );
}

export default MoviesPage;