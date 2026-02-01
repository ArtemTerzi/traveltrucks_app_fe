import PropTypes from 'prop-types';
import css from './ErrorMessage.module.css';

const ErrorMessage = ({ id, text }) => (
  <p id={id} className={css.errorText}>
    {text}
  </p>
);

ErrorMessage.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default ErrorMessage;
