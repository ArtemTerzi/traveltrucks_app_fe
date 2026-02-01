import { Link, NavLink } from 'react-router';
import Icon from '../Icon/Icon';
import styles from './Header.module.css';

const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return isActive ? `${styles.link} ${styles.active}` : styles.link;
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/">
          <Icon name="icon-logo" height={16} width={136} />
        </Link>
        <nav className={styles.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={buildLinkClass}>
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
