import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.navLink, {
    [css.active]: isActive,
  });

const Navigation = ({ children }) => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={getNavLinkClassNames}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getNavLinkClassNames}>
          Movies
        </NavLink>
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Navigation;