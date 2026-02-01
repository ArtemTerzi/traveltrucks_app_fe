import StyledLink from '../StyledLink/StyledLink';

import css from './Hero.module.css';

const Hero = () => (
  <section className={css.hero}>
    <div className={css.heroContainer}>
      <div className={css.content}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <StyledLink to="/catalog" className={css.heroButton} text="View Now" />
      </div>
    </div>
  </section>
);

export default Hero;
