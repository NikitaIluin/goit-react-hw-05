import css from './SearchForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () =>
  toast('Please enter the name of the movie!', {
    style: {
      borderRadius: '50px',
      background: '#333',
      color: '#fff',
    },
  });

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.target;
    if (form.elements.search.value.trim() === '') {
      notify();
    }

    onSubmit(form.elements.search.value.toLowerCase());

    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.formInput}
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search images and photos"
        />
        <button className={css.formButton} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default SearchForm;