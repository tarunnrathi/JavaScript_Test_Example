
import {Fragment} from "react";
import Slider from "react-slick";
import LazyLoadCustomImage from "components/Common/CustomImage";

const Photogallery = ({ gallery, isMobile }) => {
  const galleryArr = Object.values(gallery);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          slidesToShow: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          swipeToSlide: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="cn-photogallerywidget dark-box CN-Sections">
        <div className="CN-heading-1">
          <h2 className="headinner">फोटो गैलरी</h2>
          <div className="icon"></div>
        </div>
        {isMobile && galleryArr?.length ? (
          <div className="CN-photoslider-mobile CN-slider-mobile">
            <Slider {...settings}>
              {galleryArr.map((val, index) => (
                <Fragment key={"galleryArr" + index}>
                  <div className="heading">
                    <a href={val.weburl}>{val.headline}</a>
                  </div>
                  <div className="image-box">
                    <a href={val.weburl}>
                      <span className="overlay"></span>
                      <span className="img-icon">
                        <img
                          src="/images/icons/Photo-Icon.svg"
                          alt="Photo Icon"
                        />
                      </span>
                      <div className="counter">
                        {index + 1}/{galleryArr.length}
                      </div>
                      <LazyLoadCustomImage
                        src={val.fullimage}
                        width={367}
                        height={270}
                        alt={val.headline || ""}
                        title={val.headline || ""}
                        defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                        isLazyLoad={true}
                      />
                    </a>
                  </div>
                </Fragment>
              ))}
            </Slider>
            <a href="/cricket/photos/" className="cn-morebtn1">
              और भी...
            </a>
          </div>
        ) : (
          <div className="cn-smallstory-wrapper cn-photoslider-wrap">
            {galleryArr?.length > 0 && <a className="play-icon" href="#">
              <img src="/images/icons/Photo-Icon.svg" alt="Photo Icon" />
            </a>}
            <div className="cn-photoSlider">
              <ul className="CN-slider-2">
                <Slider {...settings}>
                  {galleryArr.map((val, index) => {
                    return (
                      <>
                        <li key={"galleryArr" + index}>
                          <a href={val.weburl}>
                            <div className="content-box">
                              <div className="counter">
                                {index + 1}/{galleryArr.length}
                              </div>
                              <h3 className="heading">{val.headline}</h3>
                            </div>
                            <LazyLoadCustomImage
                              src={val.fullimage}
                              width={444}
                              height={296}
                              title={val.headline}
                              alt={val.headline}
                              defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                              isLazyLoad={true}
                            />
                          </a>
                        </li>
                      </>
                    );
                  })}
                </Slider>
              </ul>
            </div>
            <a href="/cricket/photos/" className="cn-morebtn1">
              और भी...
            </a>
          </div>
        )}
      </div>
      <style jsx global>{`
        .cn-photoslider-wrap {
          position: relative;
          overflow: hidden;
        }
        .cn-photoSlider {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }
        .cn-photoslider-wrap .play-icon {
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 1;
        }
        .cn-photoSlider a {
          display: block;
          position: relative;
        }
        .cn-photoSlider a .content-box {
          position: absolute;
          bottom: 0;
          padding: 0 20px;
          background: -webkit-linear-gradient(top, transparent 10%, #000000bd 60%);
          padding-top: 80px;
          padding-bottom: 15px;
          width: 100%;
        }
        .cn-photoSlider a .content-box .counter {
          display: inline-block;
          font-style: normal;
          padding: 5px 7px;
          font-size: 14px;
          background: #e1261c;
          color: #fff;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .cn-photoSlider a .content-box .heading {
          font-size: 18px;
          color: #fff;
          font-family: "Mukta", sans-serif !important;
          font-weight: bold;
          line-height: 22px;
        }

        .cn-photoSlider .slick-arrow {
          background: rgba(0, 0, 0, 0.7);
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          left: 0px;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .cn-photoSlider .slick-arrow.slick-prev {
          left: 0px;
          right: initial;
        }
        .cn-photoSlider .slick-arrow.slick-prev::before {
          content: "";
          border-top: 1px solid #ffffff;
          border-left: 1px solid #ffffff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          left: 15px;
          top: 20px;
        }
        .cn-photoSlider .slick-arrow.slick-next {
          right: 0px;
          left: initial;
        }
        .cn-photoSlider .slick-arrow.slick-next::before {
          content: "";
          border-bottom: 1px solid #ffffff;
          border-right: 1px solid #ffffff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          right: 15px;
          top: 20px;
        }
        .CN-Mobile-HomeOuter .CN-photoslider-mobile.CN-slider-mobile .slick-arrow.slick-prev,
        .CN-Mobile-HomeOuter .CN-photoslider-mobile.CN-slider-mobile .slick-arrow.slick-next {
          display: none !important;
        }
        .CN-Mobile-HomeOuter .CN-photoslider-mobile .image-box .counter {
          position: absolute;
          right: 0;
          background: #e1261d;
          color: #fff;
          padding: 1px 6px;
          top: 10px;
          font-family: "Mukta", sans-serif !important;
          font-size: 14px;
          z-index: 2;
        }
        .cn-photoslider-wrap .slick-track{display:flex}
      `}</style>
    </>
  );
};

export default Photogallery;
