import PropTypes from 'prop-types';

import spriteUrl from '../../assets/sprite.svg';

const Icon = ({ name, size = 24, width, height, className, ...props }) => {
  const w = width ?? size;
  const h = height ?? size;

  return (
    <svg width={w} height={h} className={className} {...props}>
      <use href={`${spriteUrl}#${name}`} />
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};
