import { olympics_year } from "api/Constant";
import { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "../CustomImage";

const PhotoGallery = (props) => {
  const glideData =
    props?.photoGallery?.length > 0 ? props?.photoGallery?.slice(0, 8) : [];
  const glideVideoData =
    props?.videos?.length > 0 ? props?.videos?.slice(0, 8) : [];
  // const streetsData =
  //   props?.photoGallery?.length > 0 ? props?.photoGallery?.slice(8, 11) : [];
  useEffect(() => {
    if (props?.photoGallery?.length > 0) {
      new Glide(document.querySelector(".photogallerie_sldier"), {
        //autoplay: 4000,
        type: "slider",
        perView: 1,
        gap: 0,
        slidesToShow: 1,
        draggable: true,
      }).mount();
    }
    if (props?.videos?.length > 0) {
      new Glide(document.querySelector(".video_sldier"), {
        //autoplay: 4000,
        type: "slider",
        perView: 1,
        gap: 0,
        slidesToShow: 1,
        draggable: true,
      }).mount();
    }
  });
  return (
    <>
      <div className="photogallerie_streets">
        <div className="photogallerie">
          <div className="medalHopeHeadingInner">
            <h3 className="heading-1">Paris olympics {olympics_year}</h3>
            <h2 className="heading-2">फोटो</h2>
          </div>
          <div className="photogallerie_sldier">
            <div data-glide-el="controls">
              <a
                id="button_1"
                className="left-arrow l1 act"
                data-glide-dir="<"
              ></a>
              <a
                id="button_2"
                className="right-arrow r1 act"
                data-glide-dir=">"
              ></a>
            </div>
            <div className="glide__track" data-glide-el="track">
              <div
                className="glide__slides"
                style={{
                  transition:
                    "transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s",
                  width: "3624px",
                  transform: "translate3d(-906px, 0px, 0px)",
                }}
              >
                {glideData?.map((item, index) => {
                  return (
                    <div
                      className="photogallerie_row"
                      style={{
                        width: "453px",
                        marginLeft: "0px",
                        marginRight: "0px",
                      }}
                      key={"glideData_" + index}
                    >
                      <a href={item?.weburl_r}>
                        <figure>
                          <LazyLoadImage
                            src={item?.images?.url}
                            width={props.isMobile ? 300 : 453}
                            height={props.isMobile ? 163 : 302}
                            alt={item?.display_headline}
                            title={item?.display_headline}
                            isLazyLoad={true}
                          />
                          <figcaption>
                            <p className="photo_no">
                              {item?.gallery_count} photos
                            </p>
                            <h3 className="photogallerie_title">
                              {item?.display_headline}
                            </h3>
                          </figcaption>
                        </figure>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="streets_section">
          <div className="medalHopeHeadingInner">
            <h3 className="heading-1">Paris olympics {olympics_year}</h3>
            <h2 className="heading-2">वीडियो</h2>
          </div>
          <div className="video_sldier">
            <div data-glide-el="controls">
              <a
                id="button_1"
                className="left-arrow l1 act"
                data-glide-dir="<"
              ></a>
              <a
                id="button_2"
                className="right-arrow r1 act"
                data-glide-dir=">"
              ></a>
            </div>
            <div className="glide__track" data-glide-el="track">
              <div
                className="glide__slides"
                style={{
                  transition:
                    "transform 0ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s",
                  width: "3624px",
                  transform: "translate3d(-906px, 0px, 0px)",
                }}
              >
                {glideVideoData?.map((item, index) => {
                  return (
                    <div
                      className="photogallerie_row"
                      style={{
                        width: "453px",
                        marginLeft: "0px",
                        marginRight: "0px",
                      }}
                      key={"glideData_" + index}
                    >
                      <a href={item?.weburl_r}>
                        <figure>
                          <LazyLoadImage
                            src={item?.images?.url}
                            width={props.isMobile ? 300 : 453}
                            height={props.isMobile ? 163 : 302}
                            alt={item?.display_headline}
                            title={item?.display_headline}
                            isLazyLoad={true}
                          />
                          <figcaption>
                            <h3 className="photogallerie_title">
                              {item?.display_headline}
                            </h3>
                          </figcaption>
                        </figure>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <ul className="cricketwallah_right">
            {streetsData?.map((item, index) => {
              return (
                <li key={"streetsData_" + index}>
                  <a href={item?.weburl_r}>
                    <figure>
                      <LazyLoadImage
                        src={item?.images?.url}
                        width={props.isMobile ? 100 : 453}
                        height={props.isMobile ? 63 : 302}
                        alt={item?.display_headline}
                        title={item?.display_headline}
                        isLazyLoad={true}
                      />
                    </figure>
                    <h3 className="cricketwallah_title">
                      {item?.display_headline}
                    </h3>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="load_more">
            <a href="/sports/olympics/photos/">
              MORE STORIES FROM PARIS STREETS
            </a>
          </div> */}
        </div>
      </div>
      <style jsx global>{`
        .photogallerie_streets {
          display: flex;
          width: 100%;
        }

        .photogallerie {
          width: 49%;
        }

        .streets_section {
          width: 51%;
          padding-left: 20px;
        }

        .streets_section .cricketwallah_right {
          width: 100%;
          padding: 10px;
        }

        .streets_section .cricketwallah_right li {
          padding: 15px 0;
          border-bottom: 1px #dadada solid;
          padding: 10px 0;
        }
        .streets_section .cricketwallah_right li a {
          display: flex;
          color: #001d42;
        }

        .streets_section .cricketwallah_right li:first-child {
          padding-top: 0;
        }

        .streets_section .cricketwallah_right li img {
          width: 80px;
          height: 60px;
        }

        .streets_section .cricketwallah_right li .cricketwallah_title {
          font-size: 13px;
          line-height: 20px;
          width: calc(100% - 90px);
          padding-left: 10px;
          color: #111;
          font-weight: 400;
        }

        .streets_section .load_more {
          height: 35px;
          background: #f4f4f2;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-bottom: 1px #dadada solid;
          width: 220px;
          margin: 0 auto;
        }

        .streets_section .load_more a {
          display: block;
          color: #e1261d;
          font-weight: 700;
          text-decoration: underline;
          letter-spacing: 0.24px;
          text-transform: uppercase;
          font-size: 12px;
          line-height: 18px;
        }

        .streets_section .medalHopeHeadingInner {
          max-width: 100%;
        }

        .photogallerie_row {
          width: 100%;
        }

        .photogallerie_row figure > img {
          width: 100%;
          display: block;
          height: 100%;
        }

        .photogallerie_row figure {
          position: relative;
          height: 302px;
        }

        .photogallerie_row figure:before {
          position: absolute;
          //width: 100%;
          height: 100%;
          display: block;
          content: "";
          background: linear-gradient(
            180deg,
            rgb(0 0 0 / 0.24) 0%,
            rgb(0 0 0 / 0.8) 100%
          );
        }

        .photos_icon {
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .photogallerie_row figure figcaption {
          position: absolute;
          bottom: 0;
          background: #fff0 linear-gradient(180deg, #00000000 0%, #000000 100%)
            0% 0% no-repeat padding-box;
          padding: 10px 16px;
        }

        .photogallerie_row a {
          color: #fff;
        }

        .photogallerie_title {
          font-size: 16px;
          line-height: 24px;
        }

        .photo_no {
          width: 84px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          background: #972d2d99;
          margin-bottom: 10px;
          text-transform: capitalize;
        }

        .photogallerie_sldier,
        .video_sldier {
          width: 100%;
          position: relative;
        }

        .photogallerie_sldier .glide__track,
        .video_sldier .glide__track {
          overflow: hidden;
        }

        .photogallerie_sldier .glide__slides,
        .video_sldier .glide__slides {
          display: flex;
        }

        .photogallerie_sldier .left-arrow,
        .video_sldier .left-arrow {
          background: #0009;
          width: 30px;
          height: 43px;
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 3;
          transform: translate(0, -50%);
          border-radius: 0 6px 6px 0;
          box-shadow: 0 4px 4px 0 #0000001a;
        }

        .photogallerie_sldier .right-arrow,
        .video_sldier .right-arrow {
          background: #1f1f21;
          width: 30px;
          height: 43px;
          position: absolute;
          top: 50%;
          right: 0;
          z-index: 3;
          transform: translate(0, -50%);
          border-radius: 6px 0 0 6px;
          box-shadow: 0 4px 4px 0 #0000001a;
        }

        .photogallerie_sldier .left-arrow:before,
        .video_sldier .left-arrow:before {
          content: "";
          border-top: 3px solid #fff;
          border-left: 3px solid #fff;
          width: 10px;
          height: 10px;
          transform: rotate(-45deg);
          position: absolute;
          left: 11px;
          top: 15px;
        }

        .photogallerie_sldier .right-arrow:before,
        .video_sldier .right-arrow:before {
          content: "";
          border-top: 3px solid #fff;
          border-left: 3px solid #fff;
          width: 10px;
          height: 10px;
          transform: rotate(132deg);
          position: absolute;
          left: 6px;
          top: 15px;
        }

        .photogallerie .medalHopeHeadingInner {
          max-width: 100%;
        }

        @media (max-width: 768px) {
          .photogallerie_streets {
            display: block;
            padding: 0 10px;
          }

          .photogallerie {
            width: 100%;
            margin-bottom: 20px;
          }

          .streets_section {
            width: 100%;
            padding: 0;
          }
        }
        .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 28px;
          font-weight: 600;
          border-bottom: 2px solid #d2d2d2;
          margin-bottom: 7px;
          padding: 0 0 6px;
          line-height: 33px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};
export default PhotoGallery;
