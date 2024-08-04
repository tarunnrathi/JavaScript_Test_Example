import { useRef } from "react";
import siteConfig from "config/site.config";
import { imageLoader, Wrapper } from "includes/article.util";
import LazyLoad from "react-lazyload";

export default function LazyImage(props) {
  const placeRef = useRef();

  // Once the image is loaded, remove placeholder.
  const removePlaceholder = () => {
    if (placeRef.current) {
      placeRef.current.remove();
    }
  };

  // If target image fails, load default image.
  const setDefaultImage = ({ target }) => {
    if (placeRef.current) {
      placeRef.current.remove();
    }
    target.setAttribute("src", null);
    target.setAttribute("src", target.dataset?.src);
    target.onerror = null;
  };

  const figStyle = {
    position: "relative",
    width: props.isRes ? "100%" : `${props.width}px`,
    height: props.isRes ? "auto" : `${props.height}px`,
  };

  return (
    <>
      <figure className={"img-figure"} style={figStyle}>
        {!props.greed ? (
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
              filter: "blur(1px)",
            }}
          />
        ) : null}
        <Wrapper
          wrap={!props.greed}
          wrapper={(child) => (
            <LazyLoad
              offset={150}
              once
              placeholder={
                <img
                  data-src={
                    props.src && props.src != ""
                      ? imageLoader(
                          props.src,
                          props.width,
                          props.height,
                          props.dontAlter,
                          props.isMobile
                        )
                      : `${
                          props.holder ||
                          siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                        }`
                  }
                  alt={props.alt || ""}
                  src={`${
                    props.holder || siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                  }?impolicy=website&width=${props.width}`}
                  width={props.width || "100%"}
                  height={props.height ||"auto"}
                  title={props.title || ""}
                />
              }
            >
              {child}
            </LazyLoad>
          )}
        >
          <img
            src={
              props.src && props.src != ""
                ? imageLoader(
                    props.src,
                    props.width || "100%",
                    props.height || "auto",
                    props.dontAlter,
                    props.isMobile
                  )
                : `${
                    props.holder || siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
                  }`
            }
            alt={props.alt || ""}
            data-src={`${
              props.holder || siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
            }?impolicy=website&width=${props.width || "100%"}`}
            onLoad={(e) => removePlaceholder(e)}
            onError={(e) => setDefaultImage(e)}
            width={props.width || "100%"}
            height={props.height ||"auto"}
            title={props.title || ""}
            className={props.className || ""}
          />
        </Wrapper>
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
        `}
      </style>
    </>
  );
}
