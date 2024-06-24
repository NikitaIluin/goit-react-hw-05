import { useEffect, useState } from 'react';
import { requestMoviesCast } from '../../services/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    async function getMovieCast() {
      try {
        setIsLoading(true);
        const results = await requestMoviesCast(movieId);
        setMovieCast(results.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movieCast !== null && (
        <ul className={css.castList}>
          {movieCast.map(actor => {
            return (
              <li key={actor.cast_id} className={css.castListItem}>
                <img
                  className={css.castListImg}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : defaultImg
                  }
                  alt="poster"
                  width="250"
                />
                <ul className={css.castInformList}>
                  <li>
                    <h4>{actor.name}</h4>
                  </li>
                  <li>
                    <p>Character: {actor.character}</p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;