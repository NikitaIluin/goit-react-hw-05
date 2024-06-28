import css from "../MovieInfo/MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  const genres = movie.genres;
  return (
    <section className={css.section}>
      {movie.poster_path ? (
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}
  `}
          alt={`poster ${movie.title}`}
        />
      ) : (
        <div className={css.noposter}>{movie.title}</div>
      )}
      <div className={css.details}>
        <h2 className={css.title}>{movie.title}</h2>
        {movie.tagline && <p className={css.slug}>{movie.tagline}</p>}
        <ul className={css.descr}>
          <li>
            <h4 className={css.subtitle}>Year</h4>
            <p className={css.text}>{movie.release_date}</p>
          </li>
          <li>
            <h4 className={css.subtitle}>Overview</h4>
            <p className={css.text}>{movie.overview}</p>
          </li>
          <li>
            <h4 className={css.subtitle}>Genres</h4>
            <ul className={css.genres}>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}