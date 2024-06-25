import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchData } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { createImgURL } from '../../utils';
import BackLink from '../../components/BackLink/BackLink';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.isActive)
}

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const BackLinkRef = useRef(location.state ?? '/');
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMovieById = async () => {
            try {
                setIsLoading(true);
                const data = await fetchData(`movie/${movieId}`);
                setMovie(data);
            } catch (error) {
                toast.error('Oops! Something went wrong. Try reloading the page');
            } finally {
                setIsLoading(false);
            }
        }

        if (movieId !== movie?.id) {
            getMovieById();
        }
    }, [movieId, movie?.id]);

    return (
        <div>
            <BackLink to={BackLinkRef.current} />
            <div className={css.container}>
                <div className={css.poster}>
                    <img
                        src={createImgURL(movie?.poster_path)}
                        alt={`${movie?.title} poster`}
                    />
                </div>
                <div>
                    <p className={css.title}>{movie?.title}</p>
                    <p className={css.overview}>{movie?.overview}</p>
                    <div className={css.genres}>
                        <span>Genres:</span>
                        {movie?.genres.map(({ name }) => name).join(', ')}
                    </div>
                    <div className={css.extraInfo}>
                        <p>Release date: {movie?.release_date}</p>
                    </div>
                </div>
            </div>
            <nav className={css.navigation}>
                <NavLink to="cast" className={buildLinkClass}>Cast</NavLink>
                <NavLink to="reviews"className={buildLinkClass}>Reviews</NavLink>
            </nav>
            <div>
                <Suspense fallback={<Loader />}><Outlet /></Suspense>
            </div>
            {isLoading && <Loader />}
            <Toaster />
        </div>
    );
}

export default MovieDetailsPage;