import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
const PhotoGallery = ({ isAmp = false, photoGallery }) => {
  return (
    <div className="latest_photo latesPhotoWrapper">
      <h2 className="page_title">फोटोगैलरी </h2>
      <ul className="latest_photo_list">
        {photoGallery?.length > 0 && photoGallery?.map((item, index) => {
          return (
            index === 0
              ?
              <li key={"photoGallery" + index}>
                <div className="photogallerie_row">
                  <a href={item?.weburl_r}>
                    <figure>
                      <i className="photos_icon">
                        <LazyLoadImage isAMP={isAmp} src={"/images/icons/Photo-Icon.svg"} width={40} height={40} defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg" />
                      </i>
                      <LazyLoadImage isAMP={isAmp} src={item?.images?.url} width={447} height={298} alt={item?.display_headline} defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg" />
                      <figcaption>
                        <h3 className="photogallerie_title">
                          {item?.display_headline || ""}
                        </h3>
                      </figcaption>
                    </figure>
                  </a>
                </div>
              </li>
              :
              <li key={"photoGallery" + index}>
                <div className="photogallerie_row">
                  <a href={item?.weburl_r}>
                    <figure>
                      <i className="photos_icon">
                        <LazyLoadImage isAMP={isAmp} src={"/images/icons/Photo-Icon.svg"} width={40} height={40}  defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"/>
                      </i>
                      <LazyLoadImage isAMP={isAmp} src={item?.images?.url} width={220} height={147} alt={item?.display_headline} defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg" />
                      <figcaption>
                        <h3 className="photogallerie_title">
                          {item?.display_headline || ""}
                        </h3>
                      </figcaption>
                    </figure>
                  </a>
                </div>
              </li>
          )
        })}
      </ul>
      <div className="load_more">
        <a href="/cricket/icc-t20-world-cup/photos/">
          <span>और फोटो गैलरी</span>
        </a>
      </div>
    </div>
  );
};

export default PhotoGallery;
