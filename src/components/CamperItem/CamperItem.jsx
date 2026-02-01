import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../Category/Category';
import Icon from '../Icon/Icon';
import InfoContent from '../InfoContent/InfoContent';
import Price from '../Price/Price';
import StyledLink from '../StyledLink/StyledLink';
import { toggleFavorite } from '../../redux/favoritesSlice';
import css from './CamperItem.module.css';
import { vehicleEquipmentCategories } from '../../utils/constants/vehicleEquipmentCategories';

const CamperItem = ({ item }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector(state => state.favorites.ids);
  const isFavorite = favoriteIds.includes(String(item.id));
  const placeholderImage = '/images/placeholder.svg';
  const coverImage = item.gallery?.[0]?.thumb || placeholderImage;

  const availableCategories = vehicleEquipmentCategories.filter(c =>
    c.isAvailable(item)
  );

  return (
    <div className={css.camperItem}>
      <div className={css.imageWrapper}>
        <img
          src={coverImage}
          alt={`${item.name} picture`}
          className={css.image}
        />
      </div>
      <div>
        <div className={css.camperHeader}>
          <h2 className={css.camperName}>{item.name}</h2>
          <div className={css.camperHeaderInfo}>
            <Price price={item.price} />
            <button
              type="button"
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              className={`${css.heartBtn} ${
                isFavorite ? css.heartBtnActive : ''
              }`}
              onClick={() => dispatch(toggleFavorite(item.id))}
            >
              <Icon
                name="icon-heart"
                width={26}
                height={24}
                className={css.heartBtnIcon}
              />
            </button>
          </div>
        </div>
        <InfoContent
          review={item.reviews}
          rating={item.rating}
          location={item.location}
          reviewsLink={`/catalog/${item.id}/reviews#reviews`}
        />
        <p className={css.camperDescription}>{item.description}</p>
        <ul className={css.categoryList}>
          {availableCategories.map(category => (
            <li key={category.label}>
              <Category category={category} />
            </li>
          ))}
        </ul>
        <StyledLink
          text=" Show more"
          to={`/catalog/${item.id}`}
          className={css.showMoreBtn}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  );
};

CamperItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string.isRequired,
        reviewer_rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ).isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        thumb: PropTypes.string.isRequired,
        original: PropTypes.string.isRequired,
      })
    ).isRequired,
    form: PropTypes.string,
    length: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    tank: PropTypes.string,
    consumption: PropTypes.string,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    AC: PropTypes.bool,
    bathroom: PropTypes.bool,
    kitchen: PropTypes.bool,
    TV: PropTypes.bool,
    radio: PropTypes.bool,
    refrigerator: PropTypes.bool,
    microwave: PropTypes.bool,
    gas: PropTypes.bool,
    water: PropTypes.bool,
  }).isRequired,
};

export default CamperItem;
