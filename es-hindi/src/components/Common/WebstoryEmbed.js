import LazyLoad from "react-lazyload";
import { useState, useRef, useEffect } from "react";
import { logEvent } from "includes/googleAnalytic";

const WebstoryEmbed = ({ src, img, isDesktop, title, category, headline, id }) => {
  const [showStory, setStory] = useState(false);
  const loaderRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      logEvent(
        "Webstory_Embed_Article",
        "Impression",
        `${id}, ${headline}, ${category}, ${title}, ${parseInt(src?.split("-")[src?.split("-")?.length -1]?.replace("/", ""))}`,
        );
      }, 1000);
  }, [src]);
  return (
    <LazyLoad offset={100}>
      {!showStory ? (
        <div
          className="dfltwebststrwrap"
          onClick={() => {
            logEvent(
                "Webstory_Embed_Article",
                "Click",
                `${id}, ${headline}, ${category}, ${title}, ${parseInt(src?.split("-")[src?.split("-")?.length -1]?.replace("/", ""))}`,
              );
              setStory(true);
            }}
          style={{
            cursor: "pointer",
          }}
        >
          {isDesktop ? (
            <div
              className="dfltwebststr"
              style={{
                background: `url(${
                  img + "?im=Resize,width=310,aspect=fit,type=normal"
                }) no-repeat center`,
                backgroundSize: "100%",
                filter: "blur(30px)",
              }}
            ></div>
          ) : null}
          <div className="dfltwebststrdtls">
            <img
              src={img + "?im=Resize,width=310,aspect=fit,type=normal"}
              alt={title}
              loading="lazy"
            />
            <div className="dfltwebststrdtlshd">
              <em></em>
              {title}
              <button>आगे देखें...</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="svgloader-frame web_wrap">
          <img
            ref={loaderRef}
            src="/images/webstory_loader.svg"
            fetchPriority={true}
            width={52}
            height={52}
          />
          <iframe
            style={{ outline: "none", border: "none", textAlign: "center" }}
            src={src}
            height={isDesktop ? 450 : 470}
            onLoad={() => {
              if (loaderRef.current) {
                loaderRef.current.remove();
              }
            }}
          />
        </div>
      )}
      <style jsx global>{`
        .svgloader-frame {
          background: #000;
          position: relative;
          height: ${isDesktop ? "450px" : "470px"};
          width: ${isDesktop ? "" : "300px"};
          margin: ${isDesktop ? "" : "0 auto"};
        }
        .content_sec .svgloader-frame img,
        .khbren_section .svgloader-frame img {
          position: absolute;
          top: ${isDesktop ? "48%" : "48%"};
          right: 0;
          bottom: 0;
          left: ${isDesktop ? "40%" : "37%"};
          width: ${isDesktop ? "100px" : "100px"};
          height: ${isDesktop ? "100px" : "100px"};
          animation: rotate 0.8s linear infinite;
          border: none;
          margin: unset;
          padding: unset;
          box-shadow: none;
        }
        @keyframes rotate {
          from {
            transform: rotate(-0deg);
          }
          to {
            transform: rotate(-359deg);
          }
        }
        .lazyload-wrapper {
          position: relative;
        }
        .dfltwebststrwrap {
          height: ${isDesktop ? "450px" : "470px"};
          position: relative;
          width: ${isDesktop ? "100%" : "330px"};
          background: ${isDesktop ? "#000" : "#fff"};
          margin: ${isDesktop ? "unset" : "10px auto"};
          margin-bottom: ${isDesktop ? "10px" : "unset"};
          border: ${isDesktop ? "unset" : "1px solid #707070"};
          overflow: hidden;
        }
        .dfltwebststr {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .dfltwebststrdtls {
          width: ${isDesktop ? "305px" : "310px"};
          height: 450px;
          position: relative;
          margin: ${isDesktop ? "auto" : "10px auto"};
          overflow: hidden;
        }
        .dfltwebststrwrap .dfltwebststrdtls img {
          height: 100%;
          border: none;
          box-shadow: none;
          height: 100%;
          margin: unset;
          padding: unset;
          width: 100%;
        }
        .dfltwebststrdtlshd {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 150px 15px 15px 15px;
          text-align: center;
          color: #fff;
          font-size: 20px;
          line-height: 26px;
          background: linear-gradient(transparent, #000);
          font-weight: bold;
        }
        .dfltwebststrdtlshd button {
          background: #fe001a 0% 0% no-repeat padding-box;
          border: 1px solid #ffffff;
          border-radius: 14px;
          width: 145px;
          display: block;
          height: 28px;
          line-height: 27px;
          font-size: 14px;
          margin: 10px auto;
          color: #fff;
          font-weight: bold;
        }
        .dfltwebststrdtlshd em {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/webstrticn_1653380813.png)
            0 0 no-repeat;
          width: 52px;
          height: 52px;
          display: block;
          margin: 15px auto;
        }
        .content_sec p .web_wrap iframe {
          height: 100%;
        }
      `}</style>
    </LazyLoad>
  );
};
export default WebstoryEmbed;
