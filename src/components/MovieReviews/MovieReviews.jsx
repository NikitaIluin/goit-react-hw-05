import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestMoviesReviews } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMovieReviews() {
      try {
        setIsLoading(true);
        const data = await requestMoviesReviews(movieId);
        setMovieReviews(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movieReviews !== null && (
        <ul className={css.reviewsList}>
          {movieReviews.map(review => {
            return (
              <li key={review.id} className={css.reviewsListItem}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
// requestMoviesReviews;

export default MovieReviews;