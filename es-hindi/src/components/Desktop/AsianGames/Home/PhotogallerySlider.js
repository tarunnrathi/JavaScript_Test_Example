import { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyImage from "components/Common/CustomImage";

const PhotogallerySlider = ({
  header,
  silderClassName,
  newsList = [],
  isPhotogallery = false,
  loadMoreUrl = "",
  loadMoreText = "",
}) => {
  if (!newsList.length) return null;

  useEffect(() => {
    if (document.querySelector(`.${silderClassName}`)) {
      new Glide(document.querySelector(`.${silderClassName}`), {
        autoplay: 4000,
        type: "carousel",
        perView: 1,
        gap: 0,
        slidesToShow: 1,
        dots: "#dots",
        draggable: true,
      }).mount();
    }
  }, []);

  return (
    <>
      <>
        <h2 className="page_title">{header}</h2>
        <div className={silderClassName}>
          <div data-glide-el="controls">
            <a
              href="javascript:void(0)"
              id="button_1"
              className="left-arrow l1 act"
              data-glide-dir="<"
            ></a>
            <a
              href="javascript:void(0)"
              id="button_2"
              className="right-arrow r1 act"
              data-glide-dir=">"
            ></a>
          </div>
          <div className="glide__track" data-glide-el="track">
            <div className="glide__slides">
              {newsList.map((data) => (
                <div className="photogallerie_row" key={data.story_id}>
                  <a href={data?.weburl_r || ""}>
                    <figure>
                      <i className="photos_icon">
                        <LazyImage
                          src="https://images.news18.com/static_news18/pix/ibnhome/news18/images//cricket/Photo-Icon.svg"
                          alt="photo-icon"
                          title="photo-icon"
                          width={40}
                          height={40}
                          isLazyLoad={false}
                        />
                      </i>
                      <LazyImage
                        src={data?.images?.url || ""}
                        alt={data.headline}
                        title={data.headline}
                        width={453}
                        height={302}
                      />
                      <figcaption>
                        {isPhotogallery && (
                          <p className="photo_no">
                            {data?.gallery_count || 0} photos
                          </p>
                        )}
                        <h3 className="photogallerie_title">{data.headline}</h3>
                      </figcaption>
                    </figure>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="load_more">
          <a href={loadMoreUrl}>{loadMoreText}</a>
        </div>
      </>
      <style jsx>{`
        // Photogallery street-Photogalleries
        .photogallerie_row {
          width: 100%;
        }
        .photogallerie_row figure > img {
          width: 100%;
          display: block;
        }
        .photogallerie_row figure {
          position: relative;
          height: 302px;
        }
        .photos_icon {
          position: absolute;
          right: 10px;
          top: 10px;
          z-index: 1;
        }
        .photos_icon img {
          width: 40px;
          height: 40px;
        }
        .photogallerie_row figure figcaption {
          position: absolute;
          bottom: 0;
          background: transparent
            linear-gradient(180deg, #00000000 0, #000 100%) 0 0 no-repeat
            padding-box;
          padding: 10px 16px;
        }
        .photogallerie_row a {
          color: #fff;
        }
        .photogallerie_title {
          font-size: 18px;
          line-height: 22px;
        }
        .photo_no {
          width: 84px;
          height: 24px;
          background: #e1261d 0 0 no-repeat padding-box;
          text-align: center;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .photogallerie_sldier {
          width: 100%;
          position: relative;
        }
        .photogallerie_sldier .glide__track {
          overflow: hidden;
        }
        .photogallerie_sldier .glide__slides {
          display: flex;
        }
        .photogallerie_sldier .left-arrow {
          background: #1f1f21;
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .photogallerie_sldier .right-arrow {
          background: #1f1f21;
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          right: 0;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .photogallerie_sldier .left-arrow:before {
          content: "";
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          left: 13px;
          top: 18px;
        }
        .photogallerie_sldier .right-arrow:before {
          content: "";
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          width: 20px;
          height: 20px;
          transform: rotate(132deg);
          position: absolute;
          left: 6px;
          top: 18px;
        }
        // Photogalleries street-Videos
        .videoie_row {
          width: 100%;
        }
        .videoie_row figure > img {
          width: 100%;
          display: block;
        }
        .videoie_row figure {
          position: relative;
          height: 302px;
        }
        .photos_icon {
          position: absolute;
          right: 10px;
          top: 10px;
        }
        .photos_icon img {
          width: 40px;
          height: 40px;
        }
        .videoie_row figure figcaption {
          position: absolute;
          bottom: 0;
          background: transparent
            linear-gradient(180deg, #00000000 0, #000 100%) 0 0 no-repeat
            padding-box;
          padding: 10px 16px;
        }
        .videoie_row a {
          color: #fff;
        }
        .photogallerie_title {
          font-size: 18px;
          line-height: 22px;
        }
        .photo_no {
          width: 84px;
          height: 24px;
          background: #e1261d 0 0 no-repeat padding-box;
          text-align: center;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .videoie_sldier {
          width: 100%;
          position: relative;
        }
        .videoie_sldier .glide__track {
          overflow: hidden;
        }
        .videoie_sldier .glide__slides {
          display: flex;
        }
        .videoie_sldier .left-arrow {
          background: #1f1f21;
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          left: 0;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .videoie_sldier .right-arrow {
          background: #1f1f21;
          width: 39px;
          height: 62px;
          position: absolute;
          top: 50%;
          right: 0;
          z-index: 3;
          transform: translate(0, -50%);
        }
        .videoie_sldier .left-arrow:before {
          content: "";
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          width: 20px;
          height: 20px;
          transform: rotate(-45deg);
          position: absolute;
          left: 13px;
          top: 18px;
        }
        .videoie_sldier .right-arrow:before {
          content: "";
          border-top: 2px solid #fff;
          border-left: 2px solid #fff;
          width: 20px;
          height: 20px;
          transform: rotate(132deg);
          position: absolute;
          left: 6px;
          top: 18px;
        }
      `}</style>
    </>
  );
};

export default PhotogallerySlider;
