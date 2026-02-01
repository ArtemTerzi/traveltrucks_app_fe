import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Review from '../Review/Review';
import { selectCamperDetails } from '../../redux/campersSlice';
import css from './Reviews.module.css';

const Reviews = () => {
  const { id } = useParams();
  const camper = useSelector(state => selectCamperDetails(state, id));
  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== '#reviews') return;

    const anchor = document.getElementById('reviews');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  if (!camper) return null;

  return (
    <section id="reviews">
      {camper.reviews.length ? (
        <ul className={css.reviews}>
          {camper.reviews.map((review, index) => (
            <li key={index}>
              <Review review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews so far.</p>
      )}
    </section>
  );
};

export default Reviews;
