import PropTypes from 'prop-types';
import css from './CamperList.module.css';
import CamperItem from '../CamperItem/CamperItem';

const CamperList = ({ items }) => (
  <ul className={css.camperList}>
    {items.map(camper => (
      <li key={camper.id}>
        <CamperItem item={camper} />
      </li>
    ))}
  </ul>
);

CamperList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CamperList;
