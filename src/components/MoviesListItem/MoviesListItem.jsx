import { createImgURL } from '../../utils'
import css from './MoviesListItem.module.css'

const MoviesListItem = ( {movie: {poster_path, title} } ) => {
    return (
        <div>
        <div className={css.poster}>
            <img src={createImgURL(poster_path)} alt={`${title} poster`} />
        </div>
        <div className={css.desc}>
        <p className={css.title}>{title}</p>
        </div>
        </div>
        
    )
}

export default MoviesListItem;