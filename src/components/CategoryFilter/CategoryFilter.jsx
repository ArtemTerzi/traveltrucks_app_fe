import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';
import css from './CategoryFilter.module.css';

const CategoryFilter = ({
  label,
  categories,
  selected,
  multiple = false,
  onSelect,
}) => {
  const isSelected = category => {
    const value = category.value ?? category.filterKey ?? category.label;
    return multiple
      ? Array.isArray(selected) && selected.includes(value)
      : selected === value;
  };

  return (
    <>
      <h3 className={css.label}>{label}</h3>
      <ul className={css.categoryList}>
        {categories.map(category => {
          const active = isSelected(category);
          return (
            <li key={category.label} className={css.categoryItem}>
              <button
                type="button"
                className={`${css.categoryButton} ${active ? css.active : ''}`}
                onClick={() => onSelect?.(category)}
                aria-pressed={active}
              >
                <Icon name={category.icon} height={28} width={32} />
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

CategoryFilter.propTypes = {
  label: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      value: PropTypes.string,
      filterKey: PropTypes.string,
    })
  ).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default CategoryFilter;
