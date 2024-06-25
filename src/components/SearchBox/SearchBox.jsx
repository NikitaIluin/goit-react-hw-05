import toast, { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import css from './SearchBox.module.css';

const SearchBox = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get('query') ?? ''
    
    const handleChange = e => {
        searchParams.set('query', e.target.value);
        setSearchParams(searchParams)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
            toast('Type something to search');
            return;
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} className={css.form}>
            <label className={css.label}>
                <span className={css.searchIcon}>
                    <IoSearchOutline />
                </span>
                <input 
                onChange={handleChange}
                value={query}
                className={css.searchInput}
                placeholder='Write to search'
                />
            </label>
        </form>
        <Toaster/>
        </>
    )
}

export default SearchBox;
