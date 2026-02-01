import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button/Button';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Icon from '../Icon/Icon';
import { vehicleEquipmentCategories } from '../../utils/constants/vehicleEquipmentCategories';
import { vehicleTypeCategories } from '../../utils/constants/vehicleTypeCategories';
import {
  getCampers,
  resetSearchResults,
  selectCampersIsLoading,
} from '../../redux/campersSlice';
import {
  resetFilters,
  setForm,
  setLocation,
  toggleFeature,
} from '../../redux/filtersSlice';

import styles from './FiltersPanel.module.css';

const FiltersPanel = () => {
  const dispatch = useDispatch();
  const { location, form, features } = useSelector(state => state.filters);

  const isLoading = useSelector(selectCampersIsLoading);
  const [hasSearched, setHasSearched] = useState(false);

  const selectedFeatures = useMemo(
    () => Object.keys(features).filter(k => features[k]),
    [features]
  );

  const handleSearch = () => {
    setHasSearched(true);
    dispatch(resetSearchResults());
    dispatch(getCampers());
  };

  const handleReset = () => {
    dispatch(resetFilters());
    if (hasSearched) {
      dispatch(resetSearchResults());
      dispatch(getCampers());
      setHasSearched(false);
    }
  };

  const hasActiveFilters = useMemo(() => {
    const hasLocation = location.trim().length > 0;
    const hasForm = form.trim().length > 0;
    const hasFeatures = Object.values(features).some(Boolean);
    return hasLocation || hasForm || hasFeatures;
  }, [location, form, features]);

  return (
    <div>
      <div className={styles.locationFilter}>
        <label htmlFor="location" className={styles.label}>
          Location
        </label>
        <div className={styles.inputWrapper}>
          <Icon name="icon-location" size={20} className={styles.inputIcon} />
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Kyiv, Ukraine"
            className={styles.input}
            value={location}
            onChange={e => dispatch(setLocation(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.categoryFilterWrapper}>
        <p className={styles.filtersLabel}>Filters</p>

        <CategoryFilter
          label="Vehicle equipment"
          categories={vehicleEquipmentCategories}
          multiple
          selected={selectedFeatures}
          onSelect={category => dispatch(toggleFeature(category.filterKey))}
        />

        <CategoryFilter
          label="Vehicle type"
          categories={vehicleTypeCategories}
          selected={form}
          onSelect={category =>
            dispatch(setForm(form === category.value ? '' : category.value))
          }
        />

        <div className={styles.btnContainer}>
          <Button
            text="Search"
            disabled={!hasActiveFilters || isLoading}
            className={styles.searchBtn}
            onClick={handleSearch}
          />
          {hasActiveFilters && (
            <Button
              text="Reset"
              disabled={isLoading}
              className={styles.resetBtn}
              onClick={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
