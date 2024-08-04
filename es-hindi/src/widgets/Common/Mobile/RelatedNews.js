import { memo, useEffect, useState } from "react";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
import Glide from "@glidejs/glide";
// import { imageLoader } from "includes/article.util";
import { logEvent } from "includes/googleAnalytic";
import { getArticleList } from "api/global/Common";
// import LazyLoadImage from "components/Common/CustomImage";
import { getRelativeURL } from "util/global/Helper";

const RelatedNews = ({ data = [], tags, isDesktop, id, heading }) => {
  const width = isDesktop ? 180 : 171;
  const height = isDesktop ? 120 : 114;
  const [stories, setStories] = useState(data);

  // call LHS related stories
  useEffect(() => {
    if (tags) {
      const arr = [];
      (tags || []).forEach((item) => {
        if (item.slug) {
          arr.push(item.slug);
        }
      });
      getArticleList(
        {
          count: 4,
          offset: 0,
          fields: "story_id,display_headline,headline,weburl,images",
          filter: {
            not: { story_id: `${id}` },
            post_type: "text",
            "tags.slug": arr,
          },
        },
        true
      )
        .then((response) => {
          setStories([...response]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTimeout(() => {
      const elm = document?.querySelector(`.slider-${id}`);
      if (elm) {
        new Glide(`.slider-${id}`, {
          type: "carousel",
          perView: 2,
          autoplay: 5000,
          focusAt: "center",
          gap: 10,
        })?.mount();
      }
    }, 2000);
  }, []);

  return (
    <div className="clearfix">
      {stories.length ? (
        <>
          <h4 className="rltd_nws_hdng cp_related_stories">
            {stories[0] && stories[0].image
              ? "चुनाव 2022"
              : heading
              ? heading
              : "संबंधित खबरें"}
          </h4>
          <div className={`related_nws_slidr slider-${id}`}>
            <div className="glide__track" data-glide-el="track">
              <ul className="rltd_lists_sldr">
                {stories.map(
                  (story, index) =>
                    index < 4 && (
                      <li key={index}>
                        <a
                          href={
                            story.weburl
                              ? getRelativeURL(false, story.weburl)
                              : ""
                          }
                          onClick={() =>
                            logEvent(
                              "Related_Story",
                              "Click",
                              `${story.display_headline || story.headline},${
                                story.story_id
                              }`
                            )
                          }
                          className="cp_related_stories"
                        >
                          <figure className="rltd_lists_sldr_img">
                            <img
                              src={
                                (story.images?.url ||
                                  publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH) +
                                `?impolicy=website&width=${width || 100}${
                                  height ? `&height=${height}` : ""
                                }`
                              }
                              width={width}
                              height={height}
                              alt={story.display_headline || story.headline}
                              title={story.display_headline || story.headline}
                              loading="lazy"
                              className="cp_related_stories"
                            />
                            {/* <img
                              src={imageLoader(
                                story.images?.url ||
                                  publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                                width,
                                height
                              )}
                              height={height}
                              width={width}
                              loading="lazy"
                              title={story.display_headline || story.headline}
                            /> */}
                          </figure>
                          <p className="cp_related_stories">{story.display_headline || story.headline}</p>
                        </a>
                      </li>
                    )
                )}
              </ul>
            </div>
            <div data-glide-el="controls" className="glide_arroe_buttons">
              <a className="left-arrow" data-glide-dir="<"></a>
              <a className="right-arrow" data-glide-dir=">"></a>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
              <button
                type="button"
                className="glide__bullet"
                data-glide-dir="=0"
              ></button>
              <button
                type="button"
                className="glide__bullet"
                data-glide-dir="=1"
              ></button>
              <button
                type="button"
                className="glide__bullet"
                data-glide-dir="=2"
              ></button>
              <button
                type="button"
                className="glide__bullet"
                data-glide-dir="=3"
              ></button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default memo(RelatedNews);
