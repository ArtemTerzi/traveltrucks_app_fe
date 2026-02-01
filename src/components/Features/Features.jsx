import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import EquipmentCategories from '../EquipmentCategories/EquipmentCategories.jsx';
import { selectCamperDetails } from '../../redux/campersSlice';

import styles from './Features.module.css';

const Features = () => {
  const { id } = useParams();
  const camper = useSelector(state => selectCamperDetails(state, id));

  if (!camper) return null;

  return (
    <div className={styles.content}>
      <EquipmentCategories camper={camper} className={styles.categoryList} />
      <div>
        <h3 className={styles.infoTitle}>Vehicle details</h3>
        <div className={styles.tableInfo}>
          {camper.form && (
            <p className={styles.row}>
              <span>Form</span>
              <span>{camper.form}</span>
            </p>
          )}
          {camper.length && (
            <p className={styles.row}>
              <span>Length</span>
              <span>{camper.length}</span>
            </p>
          )}
          {camper.width && (
            <p className={styles.row}>
              <span>Width</span>
              <span>{camper.width}</span>
            </p>
          )}
          {camper.height && (
            <p className={styles.row}>
              <span>Height</span>
              <span>{camper.height}</span>
            </p>
          )}
          {camper.tank && (
            <p className={styles.row}>
              <span>Tank</span>
              <span>{camper.tank}</span>
            </p>
          )}
          {camper.consumption && (
            <p className={styles.row}>
              <span>Consumption</span>
              <span>{camper.consumption}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Features;
