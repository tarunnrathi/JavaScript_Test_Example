import React from "react";
import LazyLoadImage from "components/Common/CustomImage";
const PGWithoutRunsWickets = ({ isAmp = false, photoGallery=[] }) => {
  return (
    <>
      <div className="latest_photo latesPhotoWrapper">
        <h2 className="page_title">फोटोगैलरी</h2>
        <div className="Phfull_wrap">
          <ul className="latest_photo_list LHS">
            {photoGallery?.length > 0 && photoGallery?.slice(0, 1).map((item, index) => {
              return (
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
              )
            })}
          </ul>
          <ul className="latest_photo_list">
            {photoGallery?.length > 0 && photoGallery?.slice(1, photoGallery?.length).map((item, index) => {
              return (
                <li key={"photoGallery" + index}>
                  <div className="photogallerie_row">
                    <a href={item?.weburl_r}>
                      <figure>
                        <i className="photos_icon">
                          <LazyLoadImage isAMP={isAmp} src={"/images/icons/Photo-Icon.svg"} width={40} height={40} defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg" />
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
        </div>
        <div className="load_more">
          <a href="/cricket/icc-t20-world-cup/photos/">
            <span>और फोटो गैलरी</span>
          </a>
        </div>
      </div>
      <style jsx global>{`
      .Phfull_wrap {
        display: flex;
        justify-content: space-between;
        gap: 5px;
      }
      .latest_photo {
        width: 100% !important;
      }
      .latest_photo_list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 50%;
      }
      .latest_photo_list.LHS li, .latest_photo_list.LHS  li:first-child {
        width: 100% !important;
      }
      .latest_photo_list li, .latest_photo_list li:first-child {
        width: calc(50% - 3px) !important;
        margin-bottom: 5px;
      }
      .photogallerie_row {
        width: 100%;
        position: relative;
      }
      .photogallerie_row:before {
        background: transparent linear-gradient(180deg, #00000000 0%, #000000 100%) 0%
          0% no-repeat padding-box;
        z-index: 1;
        opacity: 0.9;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
      }
      .photogallerie_row figure {
        width: 100%;
      }
      .latest_photo_list li:first-child .photos_icon {
        width: 40px;
        height: 40px;
      }
      .photos_icon {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 3px;
        top: 3px;
      }
      .photos_icon img {
        width: 100%;
        display: block;
      }
      .photogallerie_row figure > img {
        width: 100%;
        display: block;
      }
      .latest_photo_list li:first-child .photogallerie_row figcaption {
        padding: 40px 10px 10px 10px;
      }
      .photogallerie_row figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 40px 10px 10px 10px;
        z-index: 1;
      }
      .latest_photo_list li:first-child .photogallerie_title {
        font-size: 18px;
        line-height: 24px;
      }
      .photogallerie_title {
        color: #ffffff;
        font-size: 13px;
        line-height: 20px;
        font-weight: bold;
      }
      @media (max-width: 768px) {
        .mostrun_section {
          display: block !important;
        }
        .most_run_left {
          width: 100% !important;
        }
        .latest_photo {
          width: 100% !important;
        }
        .Phfull_wrap{flex-wrap: wrap; flex-direction: column;}
        .latest_photo_list{width:100%;}
        .latest_photo_list li, .latest_photo_list li:first-child{width: calc(50% - 3px) !important;
          margin-bottom: 5px;}
        .latest_photo_list.LHS li, .latest_photo_list.LHS  li:first-child {
          width: 100% !important;
        }
      }
    
    `}</style>
    </>
  );
};

export default PGWithoutRunsWickets;
