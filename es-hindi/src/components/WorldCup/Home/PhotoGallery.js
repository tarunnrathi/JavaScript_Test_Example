import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader } from 'includes/article.util';

const PhotoGallery = ({ isAmp = false, photoGalleryWc }) => {
  const iconUrl = `http://images.news18.com/static_news18/pix/ibnhome/news18/photoicon-new.svg`;
  return (
    <div className="latest_photo latesPhotoWrapper">
      <h2 className="page_title">फोटोगैलरी </h2>
      <ul className="latest_photo_list">
        {photoGalleryWc && photoGalleryWc.length
          ? photoGalleryWc.map((latest, index) => {
            const imgHeight = index == 0 ? 250 : isAmp ? 300 : 156;
            const src = imageLoader(latest?.images?.url, 375, imgHeight, false);
            return (
              <li key={`map_${index}`}>
                <div className="photogallerie_row">
                  <a href={latest.weburl_r}>
                    <figure>
                      <i className="photos_icon">
                        {isAmp ? (
                          <LazyLoadImage
                            isAMP={true}
                            src={iconUrl}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <img src={`${iconUrl}`} alt="icon image" />
                        )}
                      </i>
                      <LazyLoadImage
                        isAMP={isAmp}
                        src={src}
                        alt={latest?.display_headline}
                        height={imgHeight}
                        width={375}
                      />
                      <figcaption>
                        <h3 className="photogallerie_title">
                          {latest.display_headline != ""
                            ? latest.display_headline
                            : latest?.headline}
                        </h3>
                      </figcaption>
                    </figure>
                  </a>
                </div>
              </li>
            )})
          : null}
      </ul>
      <div className="load_more">
        <a href="/world-cup/photos/">
          <span>और फोटो गैलरी</span>
        </a>
      </div>
    </div>
  );
};

export default PhotoGallery;
