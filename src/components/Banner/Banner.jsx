import bannerUrl from '../../assets/camper-banner.jpg';
import css from './Banner.module.css';

const Banner = () => (
  <div>
    <img src={bannerUrl} alt="Camper banner" className={css.banner} />
  </div>
);

export default Banner;
