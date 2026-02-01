import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import css from './Rating.module.css';

function clampRating(rating) {
  const num = Number(rating);
  if (Number.isNaN(num)) return 0;
  return Math.max(0, Math.min(5, Math.round(num)));
}

const Rating = ({ rating }) => {
  const res = clampRating(rating);

  return (
    <div className={css.stars} aria-label={`Rating: ${res} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="icon-star"
          size={16}
          className={`${i < res ? css.full : css.empty}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
