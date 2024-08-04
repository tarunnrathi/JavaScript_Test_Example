import parser, { attributesToProps } from "html-react-parser";
import LazyLoad from "react-lazyload";
import { memo, useState, useEffect, useRef } from "react";
import { setDefaultImage } from "includes/article.util";
import Glide from "@glidejs/glide";
import { logEvent } from "includes/googleAnalytic";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import useScrollBar from "hooks/useScrollBar";

const ScriptLoader = dynamic(() => import("./ScriptLoader"));
const Verses = dynamic(() =>
  import("components/Desktop/mobileDataPage/Verses")
);
const YoutubeEmbed = dynamic(() =>
  import("components/Desktop/common/YoutubeEmbed")
);
const FakeYTPlayer = dynamic(() => import("../Common/FakeYTPlayer"));
const RelatedNews = dynamic(() => import("widgets/Common/Mobile/RelatedNews"));
const WebstoryEmbed = dynamic(() => import("components/Common/WebstoryEmbed"));
// const SiteAd = dynamic(() => import("widgets/Common/Responsive/SiteAd"));
const NewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
const FullView = dynamic(() =>
  import("components/Desktop/mobileDataPage/FullView")
);
const FullMobileView = dynamic(() =>
  import("components/Mobile/mMobileDataPages/FullView")
);
const QuickView = dynamic(() =>
  import("components/Desktop/mobileDataPage/QuickView")
);
const QuickMobileView = dynamic(() =>
  import("components/Mobile/mMobileDataPages/QuickView")
);
import { InView } from "react-intersection-observer";
import ThirdPartyPopup from "./ThirdPartyPopup";
import Script from "next/script";
import LazyImage from "./LazyImage";
// const TopVideosArticle = dynamic(() =>
//   import("widgets/Desktop/TopVideosArticle")
// );

const tagList = [
  "aside",
  "lazyload",
  "webstory",
  "siteadm",
  "fly",
  "img",
  "relatednwssec",
  "verses",
  "fixedview",
  "pg",
  "sanjivanidesktop",
  "sanjivani",
  "fakeyt",
  "sitead",
  "html",
  "body",
  "iframe",
  "base",
  "head",
  "style",
  "title",
  "address",
  "article",
  "footer",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hgroup",
  "nav",
  "section",
  "dd",
  "div",
  "dl",
  "dt",
  "a",
  "figcaption",
  "figure",
  "hr",
  "li",
  "main",
  "ol",
  "p",
  "pre",
  "ul",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "br",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr",
  "area",
  "audio",
  "map",
  "track",
  "video",
  "embed",
  "object",
  "param",
  "source",
  "canvas",
  "noscript",
  "script",
  "del",
  "ins",
  "caption",
  "col",
  "colgroup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "button",
  "datalist",
  "fieldset",
  "form",
  "input",
  "keygen",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "details",
  "dialog",
  "menu",
  "menuitem",
  "summary",
  "content",
  "element",
  "shadow",
  "template",
  "acronym",
  "applet",
  "basefont",
  "big",
  "blink",
  "center",
  "dir",
  "frame",
  "frameset",
  "isindex",
  "listing",
  "noembed",
  "plaintext",
  "spacer",
  "strike",
  "tt",
  "xmp",
  "youtubeembed",
  "siteadb",
  "blockquote",
  "scriptloader",
  "thirdpartylink",
  "relatedtopvideo",
];

export default memo(function BodyParser({
  // body = "",
  isDesktop = true,
  id,
  // pageAds,
  // showAds = true,
  parsed: pData = [],
  isDistrict = false,
  headline = "",
  image = "",
  caption = "",
  tags = [],
  categories = "",
  storyTags = "",
  // isAjax,
  category,
  // isDistrict=false,
  selectedCity = false,
  // tempScrollY,
  ff_source = "",
}) {
  const bodyCount = useRef(0);
  const [scroll] = useScrollBar(true);
  const [fireOps, setFireOps] = useState(true);
  if (scroll >= 200 && fireOps) {
    bodyCount.current = 1;
    setFireOps(!fireOps);
  }
  const bodyParser = () => {
    return parser(pData.join("").replace(/data-front-src/gi, "src"), {
      replace: (domNode) => {
        const view = domNode.attribs?.props?.split(",").slice(-1)[0];
        if (domNode.name && !tagList.includes(domNode.name)) {
          console.log("unSupported Tag########", domNode);
          return <p></p>;
        }
        switch (domNode.name) {
          case "fakeyt": {
            return (
              <div
                className="addef"
                style={{ minHeight: isDesktop ? "315px" : "255px" }}
              >
                <LazyLoad once offset={100} height={300}>
                  <FakeYTPlayer
                    {...attributesToProps(domNode.attribs)}
                    // width={isDesktop ? "560px" : "330px"}
                    width={(isDesktop && "560") || "330"}
                    height={isDesktop ? "315" : "255"}
                    style="margin:0 auto; margin-bottom: 10px"
                    headline={headline}
                    image={image}
                    caption={caption}
                    tags={storyTags}
                    categories={categories}
                    isRes={!isDesktop}
                    id={id}
                    category={category}
                  ></FakeYTPlayer>
                </LazyLoad>
              </div>
            );
          }
          case "webstory": {
            return (
              <div
                className="addef"
                style={{ minHeight: isDesktop ? "470px" : "450px" }}
              >
                <LazyLoad once offset={100} height={300}>
                  <WebstoryEmbed
                    {...attributesToProps(domNode.attribs)}
                    id={id}
                    isDesktop={isDesktop}
                    category={category}
                    headline={headline}
                  />
                </LazyLoad>
              </div>
            );
          }
          case "siteadm": {
            if (
              (domNode.attribs?.slotid && domNode.attribs?.adunit) ||
              (domNode.attribs?.slotId && domNode.attribs?.adUnit)
            ) {
              return (
                <div
                  className="middlead"
                  style={{ height: isDesktop ? "110px" : "320px" }}
                >
                  <NewSiteAd
                    slotId={domNode.attribs?.slotid || domNode.attribs?.slotId}
                    adUnit={domNode.attribs?.adunit || domNode.attribs?.adUnit}
                    sizes={
                      isDesktop
                        ? [[728, 90]]
                        : [
                            [300, 250],
                            [336, 280],
                          ]
                    }
                    width={isDesktop ? 728 : 336}
                    height={isDesktop ? 90 : 250}
                    lazyLoad={true}
                  />
                </div>
              );
            } else {
              return null;
            }
          }
          case "siteadb": {
            return bodyCount.current === 1 ? (
              <div style={{ minHeight: "90px" }} className={"middlead"}>
                <NewSiteAd
                  slotId={domNode.attribs?.slotid || domNode.attribs?.slotId}
                  adUnit={domNode.attribs?.adunit || domNode.attribs?.adUnit}
                  sizes={[[728, 90]]}
                  width={728}
                  height={90}
                  lazyLoad={true}
                />
              </div>
            ) : null;
          }
          case "sitead": {
            return (
              <div className={"ad-place"} style={{ minHeight: "90px" }}>
                {bodyCount.current === 1 && (
                  <NewSiteAd
                    slotId={domNode.attribs?.slotid || domNode.attribs?.slotId}
                    adUnit={
                      "NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AS/NW18_HIND_ROS_AS_ROS_MID_728"
                    }
                    sizes={[
                      [728, 90],
                      [1, 1],
                    ]}
                    width={728}
                    height={90}
                    lazyLoad={true}
                  />
                )}
              </div>
            );
          }
          case "fly": {
            return (
              <div className="ad_cntainer" style={{ minHeight: "300px" }}>
                <LazyLoad once offset={100} height={300}>
                  <div className="adinner">
                    <div className="adinner_fxbox">
                      <br />
                      <div>
                        <NewSiteAd
                          slotId={domNode.attribs?.slotid || domNode.attribs?.slotId}
                          adUnit={
                            isDistrict
                              ? "NW18_HIND_PWA/NW18_HIND_LOCAL18_NEWS_PWA/NW18_HIND_LOCAL18_NEWS_PWA_AS/NW18_HIND_LOCAS18_NWS_AS_PWA_ROS_FLY_300"
                              : "NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_FLY_300"
                          }
                          sizes={[
                            [120, 600],
                            [300, 250],
                            [300, 600],
                          ]}
                          width={300}
                          height={600}
                          lazyLoad={true}
                        />
                      </div>
                    </div>
                  </div>
                </LazyLoad>
              </div>
            );
          }
          case "img": {
            if (!domNode.parent?.attribs?.class?.includes("articleimg wauto")) {
              return (
                <img
                  alt="article_image_1"
                  {...attributesToProps(domNode.attribs)}
                  onError={setDefaultImage}
                  loading="lazy"
                />
              );
            }

            domNode.attribs.width && delete domNode.attribs.width;
            domNode.attribs.height && delete domNode.attribs.height;
            return (
              <img
                alt="article_image_2"
                {...attributesToProps(domNode.attribs)}
                onError={setDefaultImage}
                loading="lazy"
              />
            );
          }
          case "scriptloader":
            {
              if (bodyCount.current === 1) {
                return (
                  <ScriptLoader
                    {...attributesToProps(domNode.attribs)}
                  ></ScriptLoader>
                );
              }
            }
            return null;
          case "sanjivani": {
            return bodyCount.current === 1 ? (
              <figure>
                <div>
                  <div id="new_ad_sanjivani">
                    <NewSiteAd
                      slotId={domNode.attribs?.slotid || domNode.attribs?.slotId}
                      adUnit="/1039154/NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_Sanjeevani"
                      sizes={[["fluid"]]}
                      lazyLoad={true}
                    />
                  </div>
                </div>
              </figure>
            ) : null;
          }
          case "thirdpartylink": {
            return <ThirdPartyPopup {...attributesToProps(domNode.attribs)} />;
          }
          case "sanjivanidesktop": {
            return bodyCount.current === 1 ? (
              <figure>
                <div>
                  <div id="new_ad_sanjivani">
                    <NewSiteAd
                      slotId={domNode.attribs?.slotid || domNode.attribs?.slotId }
                      adUnit="/1039154/NW18_HIND_Desktop/NW18_HIND_ROS/NW18_HIND_ROS_AS/NW18_HIND_ROS_AS_Sanjeevani"
                      sizes={[["fluid"]]}
                      lazyLoad={true}
                    />
                  </div>
                </div>
              </figure>
            ) : null;
          }
          case "pg": {
            return bodyCount.current === 1 ? (
              <NewSiteAd
                slotId={domNode.attribs?.slotid || domNode.attribs?.slotId}
                adUnit={domNode.attribs?.adunit || domNode.attribs?.adUnit}
                sizes={[[1, 1]]}
                removeAdSpan={true}
              />
            ) : null;
          }
          case "fixedview":
            {
              if (isDesktop) {
                if (view === "fullView") {
                  return (
                    <div className="addef" style={{ minHeight: "280px" }}>
                      <InView as="div" threshold={0.1}>
                        <FullView data={domNode.attribs?.props} />;
                      </InView>
                    </div>
                  );
                } else if (view === "quickView") {
                  return (
                    <div className="addef" style={{ minHeight: "280px" }}>
                      <InView as="div" threshold={0.1}>
                        <QuickView
                          data={domNode.attribs?.props}
                          headline={headline}
                        />
                      </InView>
                    </div>
                  );
                }
              } else {
                if (view === "fullView") {
                  // return <div>hello</div>
                  return (
                    <div className="addef" style={{ minHeight: "280px" }}>
                      <InView as="div" threshold={0.1}>
                        <FullMobileView data={domNode.attribs?.props} />;
                      </InView>
                    </div>
                  );
                } else if (view === "quickView") {
                  return (
                    <div className="addef" style={{ minHeight: "280px" }}>
                      <InView as="div" threshold={0.1}>
                        <QuickMobileView
                          data={domNode.attribs?.props}
                          headline={headline}
                        />
                      </InView>
                    </div>
                  );
                }
              }
            }
            return null;
          case "verses": {
            return (
              <InView as="div" threshold={0.1}>
                <Verses />
              </InView>
            );
          }
          case "relatednwssec": {
            return !selectedCity ? (
              <div
                className="addef cp_related_stories"
                style={{ minHeight: "310px" }}
              >
                <LazyLoad once offset={1000}>
                  <div className={"related_nws_sec"}>
                    <RelatedNews
                      stories={[]}
                      tags={tags}
                      isDesktop={false}
                      isAmp={false}
                      id={domNode.attribs?.id}
                    />
                  </div>
                </LazyLoad>
              </div>
            ) : (
              <></>
            );
          }

          // case "relatedtopvideo": {
          //   return (
          //     ff_source !== "Hyperlocal" && (
          //       <div
          //         className="related_videos"
          //         style={{ minHeight: "384px", marginBottom: "15px" }}
          //       >
          //         <LazyLoad once offset={350}>
          //           <TopVideosArticle isMobile={true} />
          //         </LazyLoad>
          //       </div>
          //     )
          //   );
          // }

          case "youtubeembed": {
            return (
              <div
                className="addef"
                style={{ minHeight: isDesktop ? "315px" : "185px" }}
              >
                <LazyLoad once offset={200}>
                  <YoutubeEmbed
                    cat={domNode.attribs?.cat}
                    /* creationDate={domNode.attribs?.creationdate}  cd19value={domNode.attribs?.cd19value} */ title={
                      domNode.attribs?.title
                    }
                    src={domNode.attribs?.src}
                    /* item={domNode.attribs?.item} */ isDesktop={isDesktop}
                    id={id}
                  />
                </LazyLoad>
              </div>
            );
          }
          default:
            break;
        }
      },
    });
  };

  // useEffect(() => {
  //   try {
  //     setPBody(bodyParser());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [pData, bodyCount.current, tempScrollY]);

  useEffect(() => {
    const stories = document?.querySelector(`.related-${id}`);
    const options = {};
    if (!isDesktop) {
      options.focusAt = "center";
    }
    if (isDesktop) {
      setTimeout(() => {
        if (document.querySelector(`.state-slider-${id}`)) {
          new Glide(`.state-slider-${id}`, {
            type: "carousel",
            perView: !isDesktop ? 2 : stories ? 3 : 3,
            autoplay: 5000,
            gap: !isDesktop ? 10 : 0,
            ...options,
          })?.mount();
          if (document.getElementsByClassName(`state-slider-${id}`)) {
            logEvent("District_Widget", "Impression", `NA`);
          }
        }
      }, 3000);
    }
    // setTimeout(() => {
    //   // const stories = document?.querySelector(`.related-${id}`);
    //   const selec = document?.querySelector(`.slction_section`);
    //   const elm = document?.querySelector(`.state-slider-${id}`);
    //   // const options = {};
    //   // if (!isDesktop) {
    //   //   options.focusAt = "center";
    //   // }

    //   if (elm) {
    //     if (selec && !stories) {
    //       selec.style.width = "100%";
    //     }

    //     // if (isDesktop) {
    //     //   setTimeout(() => {
    //     //     new Glide(`.state-slider-${id}`, {
    //     //       type: "carousel",
    //     //       perView: !isDesktop ? 2 : stories ? 3 : 3.8,
    //     //       autoplay: 5000,
    //     //       gap: !isDesktop ? 10 : 0,
    //     //       ...options,
    //     //     })?.mount();
    //     //     if (document.getElementsByClassName(`state-slider-${id}`)) {
    //     //       logEvent("District_Widget", "Impression", `NA`);
    //     //     }
    //     //   }, 3000);
    //     // }
    //     const custom_cl_S = document.querySelectorAll(".custom_cl_S");

    //     const all_bords_list_a = document.querySelectorAll(
    //       ".custom_cl_S .all_states_list li a"
    //     );
    //     const glide__track = document.querySelectorAll(
    //       ".glide__track .custom_artcl_sldr li a p"
    //     );
    //     const slction_section_a = document.querySelectorAll(
    //       ".slction_section a p"
    //     );
    //     const glide__track_mobile = document.querySelectorAll(
    //       ".glide__track .rltd_lists_sldr li a p"
    //     );
    //     let takeover;

    //     custom_cl_S.forEach((item) => {
    //       if (item) {
    //         item.addEventListener("click", function (e) {
    //           const p = Array.from(this.lastElementChild.classList).includes(
    //             "show_all_stats_cities"
    //           );
    //           custom_cl_S.forEach((e) => {
    //             e.lastElementChild.classList.remove("show_all_stats_cities");
    //           });

    //           if (p) {
    //             this.lastElementChild.classList.remove("show_all_stats_cities");
    //           } else {
    //             this.lastElementChild.classList.add("show_all_stats_cities");
    //           }
    //         });
    //       }
    //     });
    //     all_bords_list_a.forEach((itm) => {
    //       if (itm) {
    //         itm.addEventListener("click", function (e) {
    //           logEvent(
    //             "Local18_Select",
    //             "Click",
    //             e?.__nrNode?.attrs?.custom?.actionText
    //           );
    //           // e.preventDefault();
    //           takeover = this.innerText;
    //           this.parentElement.parentElement.previousElementSibling.innerText =
    //             takeover;
    //         });
    //       }
    //     });
    //     glide__track.forEach((item) => {
    //       if (item) {
    //         item.addEventListener("click", (event) => {
    //           logEvent("Local18_Select", "Click", event.target.innerText);
    //         });
    //       }
    //     });
    //     if (!isDesktop) {
    //       if (glide__track_mobile?.length) {
    //         logEvent("District_Widget", "Impression", `NA`);
    //       }
    //       slction_section_a.forEach((item) => {
    //         if (item) {
    //           item.addEventListener("click", (event) => {
    //             logEvent("Local18_Select", "Click", event.target.innerText);
    //           });
    //         }
    //       });
    //       glide__track_mobile.forEach((item) => {
    //         if (item) {
    //           item.addEventListener("click", (event) => {
    //             logEvent("Related_Story", "Click", event.target.innerText);
    //           });
    //         }
    //       });
    //     }
    //   }
    // }, 2000);
  }, []);

  return (
    <>
      {bodyParser()}
      <LazyLoad once offset={100} height={300}>
        <Script
          id="taboola_script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: ` window._taboola = window._taboola || [];
        _taboola.push({
          mode: "${TaboolaList.articlePage.center.mode}",
          container: "${TaboolaList.articlePage.center.container}",
          placement: "${TaboolaList.articlePage.center.placement}",
          target_type: 'mix'
        })`,
          }}
        ></Script>
      </LazyLoad>
      <style jsx global>{`
        .addef {
          background-color: #f5f5f5;
          margin: 10px 0px;
        }
        .ad-place {
          height: 120px;
          text-align: center;
          margin: 20px 0;
          display: flex;
          flex-direction: column;
        }
        .middlead {
          flex-direction: column;
          padding-bottom: 15px;
        }
        .middlead span,
        .ad-place span {
          background: #eee;
          font-size: 12px;
          color: #444;
          padding: 3px 0 3px 0;
          text-align: center;
          min-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: normal;
        }
        .adinner_fxbox {
          text-align: center;
        }
        .article_related_story {
          margin: 10px auto 30px;
          border-bottom: 3px solid #0a2040;
          padding-bottom: 20px;
          ${isDesktop
            ? `
          width: 835px;`
            : ""}
          clear: both;
        }
        .story_heading {
          height: 28px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-bottom: 18px;
        }
        ul.story_innbox {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          list-style: none;
          padding-left: 0;
          margin-bottom: 0;
        }
        ul.story_innbox li {
          font-family: "Mukta", sans-serif;
          width: 50%;
          ${isDesktop
            ? `border-right: 1px dashed #707070;
          padding-right: 20px;
          margin-right: 20px;`
            : ""}
          ${isDesktop ? "margin-bottom: 10px;" : ""}
          position: relative;
          ${isDesktop ? `padding-left: 16px;` : ""}
        }
        ul.story_innbox p {
          color: #000;
          font-size: 18px;
          line-height: 26px;
          font-weight: 600;
          margin: 0;
        }
        ul.story_innbox li a {
          ${isDesktop
            ? `
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          border-bottom: 0;`
            : `
            padding: 0 10px;
            display: block;
          `}
        }
        .article-content-box a {
          color: #e1261c;
          border-bottom: dotted 1px #e1261c;
        }
        ul.story_innbox .img_box,
        .img_box div {
          ${isDesktop
            ? `-webkit-flex: 0 0 180px;
          -ms-flex: 0 0 180px;
          flex: 0 0 180px;
          width: 180px;
          height: 120px;`
            : ""}
        }
        ul.story_innbox img {
          display: block;
          width: 100%;
          height: 120px;
        }
        .story_heading span {
          font-family: "Mukta", sans-serif;
          color: ${isDesktop ? "#E1261C" : "#0000FF"};
          border: 1px solid #0a2040;
          -webkit-flex-shrink: 0;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          padding: 0px 10px;
          ${isDesktop ? "" : "line-height: 28px"}
        }

        ul.story_innbox p {
          color: #000;
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          margin: 0;
          padding-top: 10px;
          ${isDesktop
            ? `
          padding-left: 20px;`
            : ""}
        }
        ul.story_innbox li:last-child {
          border-right: 0;
          margin-right: 0;
          padding-right: 0;
        }
        .story_heading::before,
        .story_heading::after {
          content: "";
          width: 100%;
          height: 1px;
          background: #0a2040;
        }
      `}</style>
    </>
  );
});
