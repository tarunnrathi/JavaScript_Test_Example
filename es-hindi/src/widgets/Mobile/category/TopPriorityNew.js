import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { imageLoader } from "includes/article.util";
// import { get_static_img } from "includes/helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const TopPriorityNew = (props) => {
  useEffect(() => {
    if (props.sliderFlag) {
      new Glide(".section-topslider", {
        autoplay: 4000,
        infinite: true,
        rewind: true,
        perView: 1,
      }).mount();
    }
  }, []);

  if (!props.initialData.leftCat) {
    return false;
  }

  return (
    <>
      <div className="tpnews clearfix">
        {/* swiper slider start */}
        <div className="pgtbox forentertainment section-topslider">
          <div data-glide-el="track">
            <ul>
              {props.initialData.leftCat.map((topNews, key) => (
                <li key={"TP" + key} className="">
                  <figure>
                    <a href={topNews.weburl}>
                      <img
                        alt={topNews.display_headline || topNews.title || ''}
                        title={topNews.display_headline || topNews.title || ''}
                        src={imageLoader(topNews?.images?.url || "", 360, 288)}
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=360&height=288";
                        }}
                      />
                    </a>
                    <div className="chmpntpnwshd">
                      <a href={topNews.weburl}>
                        <div className="tpall">
                          <span className="tpc">
                            {topNews.subsection && topNews.subsection.length>0
                              ? topNews.subsection[
                                  topNews.subsection.length - 1
                                ].name.replace('&amp;', '&') || "News"
                              : topNews.categories[
                                  topNews.categories.length - 1
                                ].name.replace('&amp;', '&') || "News"}
                          </span>
                        </div>
                      </a>
                      <h2>
                        <a title="Link" href={topNews.weburl}>
                          {topNews.display_headline}
                        </a>
                      </h2>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-glide-el="controls[nav]"
            className="section-topslider-bullets"
          >
            {props.initialData.leftCat.map((topNews, key) => (
              topNews.length>0 ? <button data-glide-dir="{key}" key={key} className=""></button> : ''
            ))}
          </div>
        </div>
        {/* swiper slider end */}

        <div className="pwa_add">
          <div className="addinner-box">
            <SiteAd
              slotId={`mobile_atf_320`}
              adUnit={`NW18_HIND_PWA/NW18_HIND_MANORANJAN_PWA/NW18_HIND_MANORANJAN_PWA_AL/NW18_HIND_MANO_AL_PWA_ROS_ATF_320`}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              width={336}
              height={280}
              lazyload={true}
              style={{ padding: "16px" }}
            />
          </div>
        </div>

        <ul className="listview-story clearfix">
          {props.initialData.rightCat.map((topNews, key) => (
            <li className="forpurplebg" key={"TL" + key}>
              <figure>
                <span className=""></span>
                <a href={topNews.weburl}>
                  <img
                    alt="Image"
                    src={imageLoader(topNews?.images?.url || "", 360, 288)}
                    className="lazyload"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=360&height=288";
                    }}
                  />
                </a>
              </figure>
              <div className="lstintro">
                <a href={topNews.weburl}>
                  {" "}
                  <div className="tag-tm">
                    <span className="tpc">
                      {topNews?.subsection && topNews?.subsection?.length>0
                        ? topNews.subsection[topNews?.subsection?.length - 1]
                            ?.name?.replace('&amp;', '&') || "News"
                        : topNews?.categories[topNews?.categories?.length - 1]
                            ?.name?.replace('&amp;', '&') || "News"}
                    </span>
                  </div>
                </a>
                <h3 className="mvnm">
                  <a href={topNews?.weburl}>
                    {topNews?.display_headline || topNews?.headline}
                  </a>
                </h3>
              </div>
            </li>
          ))}
        </ul>

        <a href={`${publicRuntimeConfig.siteUrl}news/`} className="rdmr">
          और भी पढ़ें{" "}
        </a>
      </div>

      <style jsx global>{``}</style>
    </>
  );
};

export default TopPriorityNew;
