import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Icon from '../Icon/Icon';
import css from './InfoContent.module.css';

const InfoContent = ({ review, rating, location, reviewsLink }) => {
  const reviewsCount = review.length;
  const ratingText = `${rating} (${reviewsCount} Reviews)`;
  const showReviewsLink = reviewsCount > 0 && reviewsLink;

  return (
    <div className={css.camperBottomInfo}>
      {showReviewsLink ? (
        <Link to={reviewsLink} className={css.camperRating}>
          <Icon name="icon-star" size={16} className={css.ratingIcon} />
          <span>{ratingText}</span>
        </Link>
      ) : (
        <div className={css.camperRating}>
          <Icon name="icon-star" size={16} className={css.ratingIcon} />
          <span>{ratingText}</span>
        </div>
      )}
      <div className={css.camperLocation}>
        <Icon name="icon-map" size={16} className={css.iconMap} />
        <p>{location}</p>
      </div>
    </div>
  );
};

InfoContent.propTypes = {
  review: PropTypes.arrayOf(
    PropTypes.shape({
      reviewer_name: PropTypes.string.isRequired,
      reviewer_rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  reviewsLink: PropTypes.string,
};

export default InfoContent;
