import Glide from "@glidejs/glide";
import LazyImage from "components/Common/CustomImage";
import { useEffect } from "react";

const Photogalleries = ({ newsList }) => {
  useEffect(() => {
    if (document.querySelector(".photogallerie_sldier")) {
      new Glide(document.querySelector(".photogallerie_sldier"), {
        //autoplay: 4000,
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
      <h2 className="photo_title">फोटो</h2>
      <div className="photogallerie">
        <div className="photogallerie_sldier">
          <div className="glide__track" data-glide-el="track">
            <div className="glide__slides">
              {newsList.map((data) => (
                <div key={data.story_id} className="photogallerie_row">
                  <a href={data?.weburl_r || ""}>
                    <figcaption>
                      <h3 className="photogallerie_title">{data.headline}</h3>
                    </figcaption>
                    <figure>
                      <p className="photo_no">
                        {data?.gallery_count || 0} photos
                      </p>
                      <i className="photos_icon">
                        <img
                          src="https://images.news18.com/static_news18/pix/ibnhome/news18/images//cricket/Photo-Icon.svg"
                          alt="photo-icon"
                          title="photo-icon"
                          width={40}
                          height={40}
                        />
                      </i>
                      <LazyImage
                        src={data?.images?.url || ""}
                        alt={data.headline}
                        title={data.headline}
                        width={392}
                        height={261}
                      />
                    </figure>
                  </a>
                </div>
              ))}
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button
                className="glide__bullet glide__bullet--active"
                data-glide-dir="=0"
              ></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
              <button className="glide__bullet" data-glide-dir="=2"></button>
              <button className="glide__bullet" data-glide-dir="=3"></button>
            </div>
          </div>
        </div>
        <div className="load_more">
          <a href="/tag/asian-games/photogallery/">
            <span>और देखें</span>
          </a>
        </div>
      </div>
      <style jsx>{`
        //Photographie
        .photogallerie_streets {
          display: block;
          width: 100%;
        }
        .photogallerie {
          width: 100%;
          background: #222222;
          padding: 10px;
          margin-bottom: 20px;
        }
        .photogallerie_row {
          width: 100%;
        }
        .photogallerie_row figure > img {
          width: 100%;
          display: block;
          border: 1px solid #707070;
          height: 260px;
        }
        .photogallerie_row figure {
          position: relative;
        }
        .photos_icon {
          position: absolute;
          right: 0;
          top: 50%;
          left: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          transform: translateY(-50%);
          z-index: 1;
        }
        .photogallerie_row figure figcaption {
          position: absolute;
          bottom: 0;
          background: transparent
            linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
          padding: 10px 16px;
        }
        .photogallerie_row a {
          color: #ffffff;
        }
        .photogallerie_title {
          font-size: 16px;
          line-height: 22px;
          letter-spacing: 0px;
          color: #ffffff;
          text-shadow: 0px 3px 6px #00000066;
          padding-bottom: 10px;
          min-height: 76px;
        }
        .photo_no {
          width: 84px;
          height: 24px;
          background: #e1261d 0% 0% no-repeat padding-box;
          text-align: center;
          line-height: 24px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
          position: absolute;
          right: 0;
          top: 7px;
          z-index: 1;
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
        .photogallerie_sldier .glide__bullets {
          display: flex;
          justify-content: center;
          width: 100%;
          background: none;
          position: absolute;
          bottom: 10px;
        }
        .photogallerie_sldier button.glide__bullet {
          width: 6px;
          height: 6px;
          background: #e0e0e0 0% 0% no-repeat padding-box;
          border-radius: 3px;
          border: 0;
          outline: none;
          margin: 0 4px;
          cursor: pointer;
        }
        .photogallerie_sldier button.glide__bullet.glide__bullet--active {
          width: 20px;
          height: 6px;
          background: #e1261c 0% 0% no-repeat padding-box;
          border-radius: 3px;
        }
        .photogallerie .load_more {
          background: #0a0a0a 0% 0% no-repeat padding-box;
          border: 2px solid #ffcc00;
          border-radius: 30px;
          width: 168px;
          height: 30px;
          margin: 10px auto 0;
        }
        .photogallerie .load_more a {
          color: #ffcc00;
          width: auto;
          height: auto;
          display: block;
        }
        .photogallerie .load_more span {
          border: 0;
          background: transparent;
        }
        .photo_title {
          color: #ffcc00;
          height: 36px;
          background: #000;
          text-transform: uppercase;
          font-size: 18px;
          line-height: 37px;
          font-weight: 600;
          padding: 0 10px;
        }
        .photogallerie_row figure:after {
          background: transparent
            linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
          width: calc(100% - 2px);
          position: absolute;
          bottom: 1px;
          height: 114px;
          content: "";
          left: 1px;
        }
      `}</style>
    </>
  );
};

export default Photogalleries;
