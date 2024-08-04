import React, { useState } from 'react';
import Image from 'next/image';
// import PropTypes from 'prop-types';
// import 'lazysizes';

const ImageFallback = (props) => {

  const { src, lazyload, className, optimized = false, fallbackSrc = 'https://images.news18.com/ibnlive/uploads/2021/07/1627283897_news18_logo-1200x800.jpg', priority, ...rest } = props;
  let imgSrcVal = src;
  const imgFormat = ['jpg', 'jpeg', 'png', 'PNG', 'JPG', 'JPEG', 'gif', 'GIF', 'svg'];
  const imgExist = imgFormat.some((format) => src ? src.includes(format) : fallbackSrc);
  if(!imgExist) {
      imgSrcVal = fallbackSrc;
  }
  const [imgSrc, setImgSrc] = useState(imgSrcVal || fallbackSrc);
  const blurSrc = 'data:image/*;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  return (
    <Image
      {...rest}
      // src={lazyload ? blurSrc : imgSrc}
      src={imgSrc}
      loading={!priority ? 'lazy' : undefined}
      placeholder={!priority ? 'blur' : undefined}
      blurDataURL={fallbackSrc}
      // data-src={lazyload ? imgSrc : ''}
      // className={lazyload ? 'lazyload' : className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      unoptimized={!optimized}
      priority={priority}
    />
  );
};

// ImageFallback.propTypes = {
//   src: PropTypes.instanceOf(PropTypes.string).isRequired,
//   rest: PropTypes.objectOf(PropTypes.object).isRequired,
//   lazyload: PropTypes.bool,
//   className: PropTypes.string,
//   optimized: PropTypes.bool,
//   fallbackSrc: PropTypes.string
// };

ImageFallback.defaultProps = {
  lazyload: false,
  className: '',
  optimized: false,
  fallbackSrc: 'https://images.news18.com/ibnlive/uploads/2021/07/1627283897_news18_logo-1200x800.jpg'
};

export default React.memo(ImageFallback);
