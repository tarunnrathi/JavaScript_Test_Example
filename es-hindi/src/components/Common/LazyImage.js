import { useRef } from "react";
import Image from "next/image";
import siteConfig from "config/site.config";
import { imageLoader } from "includes/article.util";

export default function LazyImage(props) {
  const placeRef = useRef();

  // Once the image is loaded, remove placeholder.
  const removePlaceholder = () => {
    if (props.isSmartPlayer) {
      !(function () {
        var e = setInterval(function () {
          try {
            if(window.pubstackJSLoaded) {
              clearInterval(e);
              window.refreshPubstackPlayers();
            }
          } catch (error) {}
        }, 1e3);
      })();
    }
    if (placeRef.current) {
      // placeRef.current.remove();
    }
  };

  // If target image fails, load default image.
  const setDefaultImage = ({ target }) => {
    if (placeRef.current) {
      placeRef.current.remove();
    }

    target.src = target.dataset?.src;
    target.srcset = target.dataset?.src;
    target.onError = "";
  };
  let figStyle = {};
  if(props?.page == 'photogallery') {
    figStyle = {
      'width': '70px',
      'margin-right': '10px',
      'float': 'left',
    };
  } else {
    figStyle = {
      position: "relative",
      width: props.isRes ? "100%" : props.isAmp ? "100%" : `${props.width}px`,
      height: props.isRes ? "auto" : `${props.height}px`,
      borderRadius: props?.borderRadius ? props.borderRadius : 0
    };
  }

  return (
    <>
      <figure className={"img-figure"} style={figStyle}>
        <div
          ref={placeRef}
          style={{
            width: props.isRes ? "100%" : `${props.width}px`,
            height: props.isRes ? "auto" : `${props.height}px`,
            backgroundRepeat: "no-repeat",
            background: `url(${imageLoader(
              props.src,
              10,
              10,
              props.dontAlter
            )})`,
            backgroundSize: "100% 100%",
            position: "absolute",
            filter: "blur(1px)"
          }}
        />
        {!props.isAmp ? (
          <Image
            src={
              props.src && props.src != ""
                ? props.filterOut ? props.src : imageLoader(
                    props.src,
                    // props.isFill ? props.imgw : props.width,
                    // props.isFill ? props.imgh : props.height,
                    props.width,
                    props.height,
                    props.dontAlter || props.src.includes("base64")
                  )
                : `${siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}`
            }
            alt={props.alt || ""}
            data-src={`${siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy=website&width=${props.width}`}
            onLoad={removePlaceholder}
            onError={setDefaultImage}
            width={props.width || "100%"}
            height={props.height || "auto"}
            title={props.title || ""}
            //   layout={props.isRes ? "responsive" : props.isFill ? "fill" : ""}
            layout={props.isRes ? "responsive" : "intrinsic"}
            priority={props.priority}
            unoptimized={props.lazyLoad != undefined ? props.lazyLoad : true}
            style = {figStyle}
          />
        ) : (
          <amp-img
            src={
              props.src && props.src != ""
                ? props.filterOut ? props.src : imageLoader(
                    props.src,
                    props.width,
                    props.height,
                    props.dontAlter || props.src.includes("base64")
                  )
                : `${siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}`
            }
            width={props.width}
            height={props.height|| "auto"}
            layout="responsive"
          ></amp-img>
        )}
        {!props.readMore && props.isDistrict == true ? (
          props.isMore ? (
            <div className="chmpntpnwshd"></div>
          ) : (
            <h3 className="article_title">{props.caption}</h3>
          )
        ) : null}
      </figure>
      <style jsx>
        {`
          .article_title {
            font-size: 16px;
            line-height: 20px;
            color: #eee;
            padding: 10px;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            background: rgba(0, 0, 0, 0.6);
          }
          .img-figure amp-img { height: 100%; }
          .img-figure div {
            border-radius: 20px;
          }
        `}
      </style>
    </>
  );
}
