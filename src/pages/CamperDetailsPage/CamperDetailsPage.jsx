import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Banner from '../../components/Banner/Banner';
import BookingForm from '../../components/BookingForm/BookingForm';
import InfoContent from '../../components/InfoContent/InfoContent';
import Price from '../../components/Price/Price';
import Modal from '../../components/Modal/Modal';
import {
  getCamperDetails,
  selectCamperDetails,
  selectCamperDetailsError,
  selectCamperDetailsLoading,
} from '../../redux/campersSlice';

import css from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [modalImage, setModalImage] = useState(null);

  const camper = useSelector(state => selectCamperDetails(state, id));
  const isLoading = useSelector(selectCamperDetailsLoading);
  const error = useSelector(selectCamperDetailsError);

  useEffect(() => {
    if (!id) return;

    if (!camper) dispatch(getCamperDetails(id));
  }, [dispatch, id, camper]);

  if (isLoading) return <Loader />;

  const hasError = Boolean(error || !camper);
  // const pageTitle = hasError
  //   ? 'Camper not found | TravelTrucks'
  //   : `${camper.name} | TravelTrucks`;
  // const pageDescription = hasError
  //   ? 'Camper not found'
  //   : `Rent ${camper.name} in ${camper.location}`;

  const renderContent = () => {
    if (hasError) {
      const message =
        error || `There is no information about the camper with ID “${id}”`;

      return (
        <>
          <Link to="/catalog" className={css.backLink}>
            Back to Catalog
          </Link>

          <h2 className={css.title}>Data unavailable</h2>
          <p className={css.notFound}>{message}</p>
          <Banner />
        </>
      );
    }

    return (
      <>
        <Link to="/catalog" className={css.backLink}>
          Back to Catalog
        </Link>
        <h2 className={css.title}>{camper.name}</h2>
        <div className={css.infoContainer}>
          <InfoContent
            review={camper.reviews}
            rating={camper.rating}
            location={camper.location}
            reviewsLink="reviews#reviews"
          />
        </div>
        <div className={css.priceContainer}>
          <Price price={camper.price} />
        </div>
        <ul className={css.gallery}>
          {(camper.gallery?.length
            ? camper.gallery
            : [{ thumb: '/images/placeholder.svg' }]
          ).map((image, index) => (
            <li
              key={image.thumb ?? `placeholder-${index}`}
              className={css.galleryItem}
            >
              <button
                type="button"
                className={css.galleryButton}
                onClick={() =>
                  setModalImage(
                    image.original ?? image.thumb ?? '/images/placeholder.svg'
                  )
                }
                aria-label="Open image"
              >
                <img
                  src={image.thumb ?? '/images/placeholder.svg'}
                  alt={`${camper.name} picture ${index + 1}`}
                  className={css.galleryImage}
                />
              </button>
            </li>
          ))}
        </ul>
        <p className={css.description}>{camper.description}</p>
        <div className={css.subNav}>
          <NavLink
            to="features"
            end
            className={({ isActive }) =>
              `${css.subNavLink} ${isActive ? css.active : ''}`
            }
          >
            Features
          </NavLink>

          <NavLink
            to="reviews#reviews"
            className={({ isActive }) =>
              `${css.subNavLink} ${isActive ? css.active : ''}`
            }
          >
            Reviews
          </NavLink>
        </div>
        <div className={css.bottomContent}>
          <div className={css.left}>
            <Outlet />
          </div>
          <div className={css.right}>
            <BookingForm />
          </div>
        </div>
        <Modal
          isOpen={Boolean(modalImage)}
          onClose={() => setModalImage(null)}
          ariaLabel="Camper image"
        >
          <img
            src={modalImage}
            alt="Camper full size"
            className={css.modalImage}
          />
        </Modal>
      </>
    );
  };

  return (
    <div className="container">
      <div className={css.content}>{renderContent()}</div>
    </div>
  );
};

export default CamperDetailsPage;
