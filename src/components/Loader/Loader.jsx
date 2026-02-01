import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.wrapper}>
    <ClipLoader
      className={css.loader}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
      color="#e44848"
    />
  </div>
);

export default Loader;
