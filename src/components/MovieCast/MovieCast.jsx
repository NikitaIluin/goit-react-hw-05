import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../movies-api';
import Loader from '../Loader/Loader';
import { createImgURL } from '../../utils';
import css from './MovieCast.module.css'


const MovieCast = () => {
    const [credits, setCredits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams();
  
    useEffect(() => {
      const getData = async () => {
        try {
          setIsLoading(true);
          const { cast } = await fetchData(`movie/${movieId}/credits`);
          setCredits(cast);
        } catch (error) {
          toast.error('Oops! Something went wrong. Try reloading the page');
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }, [movieId]);

    return  (
        <div>
            <ul className={css.list}>
            {credits.map(({ id, name, character, profile_path }) => (
                <li key={id}>
                    <div className={css.imageContainer}>
                        <img 
                        src={createImgURL(profile_path)}
                        alt={name}
                        />
                    </div>
                    <div className={css.actorDesc}>
                        <span className={css.name}>{name}</span>
                        <span className={css.character}>{character}</span>
                    </div>
                </li>
            ))}
            </ul>
            {isLoading && <Loader />}
            <Toaster/>
        </div>
    )
}

export default MovieCast;