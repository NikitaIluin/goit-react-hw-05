import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { fetchData } from "../../movies-api";
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import css from './MovieReviews.module.css'
import { createImgURL } from "../../utils";


const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { results } = await fetchData(`movie/${movieId}/reviews`);
                setReviews(results)
            } catch (error) {
                toast.error('Oops! Something went wrong. Try reloading the page');
            } finally {
                setIsLoading(false)
            }
        };
        getData();
    }, [movieId]);

    return (
        <div>
            {isLoading && <Loader/> }

            {reviews.length > 0 ?(
                <ul className={css.list}>
                    {reviews?.map(
                        ({
                            id,
                            content,
                            author_details: { name, username, avatar_path },
                        }) => (
                            <li key={id}>
                                <div className={css.userInfoContainer}>
                                    <div className={css.userInfo}>
                                        <img 
                                        src={createImgURL(avatar_path)}
                                        alt={`${name}avatar`}
                                        className={css.avatar}
                                        />
                                        <div>
                                            <span>@{username}</span>
                                        </div>
                                        <p className={css.comment}>{content}</p>
                                    </div>
                                </div>
                            </li>
                        )

                    )}
                </ul>
            ) : (
                <div>There aren&apos;t any reviews yet</div>
            ) }
            <Toaster />
        </div>
    ); 
};

export default MovieReviews;