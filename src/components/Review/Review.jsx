import PropTypes from 'prop-types';
import Rating from '../Rating/Rating';
import css from './Review.module.css';

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

const Review = ({ review }) => {
  const initials = getInitials(review.reviewer_name);

  return (
    <div>
      <div className={css.user}>
        <span className={css.avatarFallback} aria-hidden="true">
          {initials}
        </span>

        <div className={css.userInfo}>
          <p className={css.userName}>{review.reviewer_name}</p>
          <Rating rating={review.reviewer_rating} />
        </div>
      </div>
      <p className={css.comment}>{review.comment}</p>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    reviewer_name: PropTypes.string.isRequired,
    reviewer_rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
