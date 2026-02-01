import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import CamperList from '../../components/CamperList/CamperList';
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel';
import Loader from '../../components/Loader/Loader';
import {
  getCampers,
  loadMoreCampers,
  selectCampersError,
  selectCampersHasMore,
  selectCampersIsLoading,
  selectCampersItems,
} from '../../redux/campersSlice';

import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCampersItems);
  const isLoading = useSelector(selectCampersIsLoading);
  const error = useSelector(selectCampersError);
  const hasMore = useSelector(selectCampersHasMore);

  useEffect(() => {
    dispatch(getCampers());
  }, [dispatch]);

  return (
    <div className="container">
      <div className={styles.content}>
        <FiltersPanel />

        {isLoading && items.length === 0 ? (
          <Loader />
        ) : error === 'Request failed with status code 404' ? (
          <div>
            <p className={styles.infoMessage}>
              Nothing was found for your request
            </p>
            <Banner />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            <CamperList items={items} />
            {hasMore && (
              <Button
                className={styles.loadMoreBtn}
                text={isLoading ? 'Loading...' : 'Load More'}
                onClick={() => dispatch(loadMoreCampers())}
                disabled={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
