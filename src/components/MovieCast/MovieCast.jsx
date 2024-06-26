import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../../movies-api";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCasts, setMovieCasts] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setMovieCasts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <ul className={css.castList}>
      {movieCasts.length > 0 &&
        movieCasts.map((cast) => (
          <li key={cast.id} className={css.cast}>
            <img
              className={css.castImage}
              src={
                (!cast.profile_path && "../../../imges/user.jpg") ||
                `https://image.tmdb.org/t/p/w200${cast.profile_path}`
              }
              alt={cast.name}
            />
            <h3 className={css.name}>{cast.name}</h3>
            <p className={css.character}>{cast.character}</p>
          </li>
        ))}
    </ul>
  );
}