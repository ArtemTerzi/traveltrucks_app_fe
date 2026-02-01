import PropTypes from 'prop-types';
import css from './Price.module.css';

const Price = ({ price }) => (
  <h2 className={css.camperPrice}>
    {new Intl.NumberFormat('de-AT', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    }).format(price)}
  </h2>
);

Price.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Price;
