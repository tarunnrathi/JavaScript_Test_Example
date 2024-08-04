import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import LazyImage from "components/Common/CustomImage";

const Videos = ({ videoNews }) => {
  useEffect(() => {
    if (document.querySelector(".video_sldr")) {
      new Glide(document.querySelector(".video_sldr"), {
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
      <section className="videos_section">
        <div className="video_m_ttl">
          <p>ASIAN GAMES 2023</p>
          <h2 className="ttl">वीडियो</h2>
        </div>
        <div className="budget_container">
          <div className="video_sldr">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {videoNews.map((item) => {
                  return (
                    <li className="video_slide" key={item.story_id}>
                      <a href={item?.weburl_r || ""}>
                        <div className="video_otr">
                          <div className="videoimg_Wrp">
                            <LazyImage
                              src={item?.images?.url || ""}
                              alt={item.headline}
                              title={item.headline}
                              width={384}
                              height={230}
                            />
                            <div className="play_icon">
                              <img
                                src="/images/siteimages/video-iconnew.png"
                                alt={item.headline}
                              />
                            </div>
                          </div>
                          <p>{item.headline}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button className="glide__bullet" data-glide-dir="=0"></button>
              <button className="glide__bullet" data-glide-dir="=1"></button>
              <button className="glide__bullet" data-glide-dir="=2"></button>
            </div>
          </div>
          <a href="/tag/asian-games/videos/" className="more_videos">
            <span>और एशियन गेम्स 2023 वीडियो</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10.5"
              height="7"
              viewBox="0 0 10.5 7"
            >
              <path
                id="Path_1184"
                data-name="Path 1184"
                d="M-5.25-5.824H3.008L.93-7.93l.82-.82,3.5,3.5-3.5,3.5L.93-2.57,3.008-4.676H-5.25Z"
                transform="translate(5.25 8.75)"
                fill="#fd0"
              />
            </svg>
          </a>
        </div>
      </section>
      <style jsx global>{`
        // Video section
        .videos_section {
          margin: 20px 0;
          background: #1c1c1c;
          padding: 15px 12px 12px;
        }
        .play_icon {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .video_m_ttl {
          text-align: center;
          border-bottom: #565656 solid 2px;
          margin: 0 0 10px;
        }
        .video_m_ttl .ttl {
          text-align: center;
          font-weight: bold;
          font-size: 26px;
          line-height: 22px;
          letter-spacing: -1.04px;
          color: #3279ba;
          margin-bottom: 8px;
        }
        .video_m_ttl p {
          text-align: center;
          font-weight: normal;
          font-size: 12px;
          line-height: 12px;
          letter-spacing: 4.44px;
          color: #ffffff;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .video_sldr {
          max-height: 353px;
          overflow: hidden;
        }
        .videos_section .budget_container {
          margin: 0 auto;
          position: relative;
        }
        .video_sldr .slick-track {
          display: flex;
        }
        .videoimg_Wrp {
          position: relative;
          margin-bottom: 5px;
          border: 2px solid #fff;
        }
        .videoimg_Wrp > img {
          width: 100%;
          opacity: 0.3;
        }
        .video_slide p {
          text-align: left;
          font-size: 16px;
          line-height: 22px;
          color: #fff;
        }
        .video_sldr .glide__track {
          overflow: hidden;
        }
        .video_sldr .glide__slides {
          display: flex;
        }
        .video_sldr .glide__bullets {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .video_sldr .glide__bullets button.glide__bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 0;
          border: 0;
          background: #fff;
          margin: 0 5px;
          padding: 0;
        }
        .video_sldr .glide__bullets button.glide__bullet.glide__bullet--active {
          background: #e1261d;
          width: 20px;
          border-radius: 15px;
        }
        .more_videos {
          font-size: 12px;
          line-height: 12px;
          color: #ffdd00;
          text-transform: uppercase;
          display: block;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.24px;
        }
        .more_videos svg {
          margin-left: 10px;
        }
        .more_videos span {
          display: inline-block;
          border-bottom: #ffdd00 solid 1px;
          padding-bottom: 2px;
        }
      `}</style>
    </>
  );
};
export default Videos;
