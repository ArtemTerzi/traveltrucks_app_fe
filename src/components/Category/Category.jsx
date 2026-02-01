import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './Category.module.css';

const Category = ({ category }) => (
  <div className={styles.category}>
    <Icon name={category.icon} size={20} className={styles.icon} />
    <p className={styles.name}>{category.label}</p>
  </div>
);

Category.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    filterKey: PropTypes.string,
  }).isRequired,
};

export default Category;
