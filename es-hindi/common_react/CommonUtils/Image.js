import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Image = (props) => {
  const [isLazySupported, setIsLazySupported] = useState(false);
  // If target image fails, load default image.
  const setDefaultImage = ({ target }) => {
    target.setAttribute('src', null);
    target.setAttribute('src', publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH);
    target.onerror = null;
  };

  useEffect(() => {
    setIsLazySupported("loading" in HTMLImageElement.prototype);
  }, []);

  return isLazySupported ? (
    <img {...props} onError={(e) => setDefaultImage(e)} />
  ) : props.loading == "lazy" ? (
    <LazyLoad once offset={150}>
      <img {...props} onError={(e) => setDefaultImage(e)} />
    </LazyLoad>
  ) : (
    <img {...props} onError={(e) => setDefaultImage(e)} />
  );
};

export default Image;
