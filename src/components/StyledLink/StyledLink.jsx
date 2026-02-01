import PropTypes from 'prop-types';
import { Link } from 'react-router';
import css from './StyledLink.module.css';

const StyledLink = ({ text, to, className = '', target, rel }) => (
  <Link
    to={to}
    className={`${css.link} ${className}`}
    target={target}
    rel={rel}
  >
    {text}
  </Link>
);

StyledLink.propTypes = {
  text: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
};

export default StyledLink;
