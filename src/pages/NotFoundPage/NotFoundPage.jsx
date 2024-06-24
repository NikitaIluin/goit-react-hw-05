import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>404</h2>
      <p className={css.text}>Sorry, the page you visited does not exist</p>
      <Link className={css.link} to="/">
        Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;