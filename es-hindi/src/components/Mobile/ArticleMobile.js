import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
} from "react";
import getConfig from "next/config";
import { InView, useInView } from "react-intersection-observer";
import { pageEvents, sectionExtractor } from "includes/article.util_new";
import { capIt } from "includes/_app.util";
import Head from "next/head";
import { logEvent, logEventNew } from "includes/googleAnalytic";
import ArticleStyle from "styles/Mobile/ArticleStyle";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import { articleBodyParser } from "../../../helper/articleBodyParser";
import { longDateConversion } from "../../../helper/global";
import { GetCategoryArticles } from "api/global/Common";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import useScrollBar from "hooks/useScrollBar";
import NextPreviousArticleResponsive from "components/Common/NextPreviousComponentArticle";
import LazyLoad from "react-lazyload";

const TopToolBarMobile = dynamic(() => import("./common/TopToolBarMobile"),{ssr:false});
const NewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
const Recipe = dynamic(() => import("components/Common/Recipe"));
const FilmReviewWidgetMobile = dynamic(() =>
  import("widgets/Mobile/FilmReviewWidgetMobile")
);
const ArticleImage = dynamic(() => import("components/Common/ArticleImage"));
const FiveStateElection2022ArticleConstWidget = dynamic(() =>
  import("widgets/Common/Mobile/FiveStateElection2022ArticleConstWidget")
);
const ReadMore = dynamic(() => import("components/Common/ReadMore"));
const ArticleBody = dynamic(() => import("components/Common/ArticleBody"));
const TenThingsText = dynamic(() => import("components/Common/TenThingsText"));
const RelatedNews = dynamic(() => import("widgets/Common/Mobile/RelatedNews"));
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
const Byline = dynamic(() => import("components/Common/ByLine"));
const SocialShare = dynamic(() => import("./SocialShare"));
const BylineAuthor = dynamic(() => import("components/Common/BylineAuthor"));
const VideoWallCarousel = dynamic(() =>
  import(
    "../../../common_react/CommonSrc/CommonComponents/videoWall/Desktop/VideoWallCarousel"
  )
);
const SpecialLiveBlogArticle = dynamic(() =>
  import("components/Common/SpecialLiveBlogArticle")
);
const TopVideosArticle = dynamic(() =>
  import("widgets/Desktop/TopVideosArticle")
);

let timeOutId = null;

const ArticleMobile = ({
  isAjax = false,
  data: { config: firebaseconfig = {} } = {},
  topPriorityData = {},
  pageAds = {},
  atags,
  catVideoTrack,
}) => {
  const temp = useRef(0);
  const { publicRuntimeConfig } = getConfig();
  const callFired = useRef(false);
  const {
    currentUrl,
    articleData: articleDataById = {},
    liveBlogFlag,
    category,
    category_hi = "",
    finalURL,
    fs_cons_id = "",
    fs_statename = "",
    urlParam = {},
    selectedCity,
    isDistrict,
    isMobile,
    isFloatingWatsAppShare,
    breadCrumbArray,
    specialLiveBlog,
  } = topPriorityData;
  const [articleData, setArticleData] = useState(articleDataById);
  const [tempScrollY, setScrollY] = useState(0);
  const [scroll, scrollTop] = useScrollBar(true);
  const [isScroll, setIsScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const {
    headline,
    images: { url: thumbnail, caption } = {},
    youtubeid: youtubeId,
    categories,
    intro = "",
    story_id: storyId,
    tags = [],
    agency,
    agency_full: agencyFull,
    author_byline: authorByline = [],
    written_by: writtenBy = [],
    translated_by: translatedBy = [],
    reported_by: reportedBy = [],
    edited_by: editedBy = [],
    weburl = "",
    byline,
    fms_autopublished,
    section,
    recipe_rating: isRecipe,
    "10things_text": nextTenThings = [],
    readmore,
    body,
    parsedBody,
    hola_player,
    videoUrl,
    story_categories: storyCategories,
    story_tags: storyTags,
    is_breaking_alert = 0,
    local18_video: local18Video,
    ff_source = "",
    ff_author_name,
    publish_by = [],
    hightlight_data = [],
    url = "",
    cta,
    showRelatedWidget,
    story_id,
    display_headline,
    created_at,
    updated_at,
    images_all_sizes: {
      sizes: { ["4x3"]: { url: thumb_url = null } = {} } = {},
    } = {},
    disclaimer,
  } = articleData || {};

  const publishedBy = publish_by?.length ? publish_by[0]?.english_name : "";
  const publishedByWithId = publishedBy + "_" + publish_by?.[0]?.ID;
  const outBrainUrl = (url || weburl).replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  const [videoWallCheck, setVideoWallCheck] = useState(0);
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
  });

  const authCount = (authorByline || []).filter(
    (item) => item?.nicename?.toLowerCase() !== "news18hindi"
  ).length;

  const authorByLine = authorByline?.length
    ? authorByline[0]
    : { language_name: "", author_type: "" };

  let isfilmReview = false;

  for (let i = 0; i < categories?.length; i++) {
    if (categories[i].slug === "film-review") {
      isfilmReview = true;
      i = categories?.length;
    }
  }

  const onScroll = useCallback(() => {
    const box = document.querySelector("#article_start");
    const rect = box?.getBoundingClientRect() || {};

    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    const totalHeight =
      document.querySelector("#artcle_content")?.clientHeight - 130;
    if (!isInViewport) {
      const totalScroll = document.documentElement.scrollTop + 140;

      if (totalHeight >= totalScroll) {
        const percentage = Math.ceil((totalScroll / totalHeight) * 100);
        if (
          document.getElementsByClassName("fixtb_wrap")?.[0] &&
          document.getElementsByClassName("prog_bar")?.[0]
        ) {
          document.getElementsByClassName("fixtb_wrap")[0].style.display =
            percentage > 0 ? "flex" : "none";
          document.getElementsByClassName("prog_bar")[0].style.width =
            percentage >= 0 ? percentage + "%" : "0%";
        }
      }
    } else {
      if (
        document.getElementsByClassName("fixtb_wrap")?.[0] &&
        document.getElementsByClassName("prog_bar")?.[0]
      ) {
        document.getElementsByClassName("fixtb_wrap")[0].style.display = "none";
        document.getElementsByClassName("prog_bar")[0].style.width = "0%";
      }
    }
    const { pageYOffset } = window;
    setScrollY(pageYOffset);
  }, []);

  const changeHeight = (str) => {
    const elem = document.querySelector(".read");
    const descDiv = elem.nextElementSibling;
    if (elem.classList.contains("expand")) {
      descDiv.textContent = str;
      descDiv.style.height = "auto";
      descDiv.style.animation = "auto";
      elem.classList.remove("expand");
      elem.classList.add("collapsed");
    } else {
      descDiv.style.height = "70px";
      elem.classList.remove("collapsed");
      elem.classList.add("expand");
    }
  };

  const loadVideoWall = () => {
    const windowOffset = parseInt(window.pageYOffset);
    if (windowOffset >= 800) {
      setVideoWallCheck(1);
    }
  };

  useEffect(() => {
    if (!timeOutId) {
      if (scrollTop && scroll > 0) {
        setIsScroll(true);
        setScrollPosition(scroll);
      } else if (!scrollTop && scroll > 0) {
        setIsScroll(false);
        setScrollPosition(scroll);
      }
    }
    if (timeOutId) clearTimeout(timeOutId);
    const timeout = setTimeout(() => {
      if (scroll - scrollPosition > 0) {
        if (scroll > 0) {
          setIsScroll(false);
          setScrollPosition(scroll);
        }
      } else if (scroll - scrollPosition < 0) {
        setIsScroll(true);
        if (scroll > 0) setScrollPosition(scroll);
      }
    }, 100);
    timeOutId = timeout;

    return () => clearTimeout(timeOutId);
  }, [scrollTop, scrollPosition, scroll]);

  useEffect(() => {
    // videoWallFunction();
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", loadVideoWall);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
      window.removeEventListener("scroll", loadVideoWall);
    };
  }, []);

  useEffect(() => {
    if (tempScrollY > 1000 && temp.current === 0) {
      temp.current = temp.current + 1;
      articleData?.video_wall &&
        logEvent("select_related_videos", "Impression", finalURL);
      if (
        isDistrict &&
        Object.keys(selectedCity)?.length > 0 &&
        selectedCity.slug
      ) {
        GetCategoryArticles(
          {
            filter: [
              {
                count: 11,
                offset: 0,
                sortOrder: "desc",
                fields: "",
                sortBy: "created_at",
                category: `${selectedCity?.slug}`,
                type: "category",
              },
            ],
            key: `${selectedCity?.slug}`,
          },
          true
        )
          .then((data) => {
            if (data?.length > 0) {
              const tempfromDistrict = data
                .filter((item) => !(item.id && item.id.includes(storyId)))
                .slice(0, 11);
              Object.assign(articleData, {
                fromDistrict: tempfromDistrict,
                dis: selectedCity || "",
              });
              const { parsedBody, body } = articleBodyParser(
                articleData.body,
                !isMobile,
                storyId,
                pageAds,
                !(liveBlogFlag || articleData?.liveblog_switcher == 1),
                articleData.tags,
                articleData.nw_desktop_add,
                articleData.nw_amp_add,
                articleData?.stories,
                articleData.weburl,
                false,
                articleData
              );
              articleData.parsedBody = parsedBody;
              articleData.body = body;
              setArticleData(() => ({ ...(articleData || {}) }));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [tempScrollY]);

  useEffect(() => {
    pageEvents({
      inView,
      entry,
      isAjax,
      authorByline: authorByLine,
      byline,
      fms_autopublished,
      created_at,
      section,
      callFired,
      url: outBrainUrl,
      headline,
      storyId,
      agency,
      ff_source,
      ff_author_name,
      publishedBy,
      articleData,
      publishByFull: publish_by,
      allSections: sectionExtractor(articleData),
      publishedByWithId: publishedByWithId,
      taboolaVariable: true,
    });
    return () => false;
  }, [inView]);

  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
        {(category === "entertainment" ||
          category === "nation" ||
          category === "cricket") && (
          <script async type="text/javascript">{`
        setTimeout(() => {
        (function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)}; t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i; y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y); })(window, document, "clarity", "script", "kxxjg01c8x");
      }, 3000);
        `}</script>
        )}
      </Head>
      <TopToolBarMobile
        url={finalURL || currentUrl || outBrainUrl}
        headline={headline}
        articleId={story_id}
        category={category_hi || category}
        pageType={"article"}
      />
      <section className="article_section" ref={ref}>
        {/* {
          ElectionsHomeBanner ? <ElectionBannerMobile /> : ""
        } */}
        {specialLiveBlog?.switch_status === "1" && (
          <SpecialLiveBlogArticle blogContent={specialLiveBlog} />
        )}
        <main id="artcle_content" className="mob_container">
          <div id="article_start"></div>
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />

          {/* <TrendStoryMob
            trendStory={[]}
            isMobile={true}
            category={category}
          /> */}

          {isRecipe ? (
            <Recipe
              articleData={articleData}
              actualUrl={finalURL || currentUrl}
              isDesktop={false}
            />
          ) : null}
          <article className="artcl_container">
            <div className="artcl_contnr_upper_sec">
              {!(isRecipe || isfilmReview) ? (
                <>
                  <h1 className="article_heading1" style={{ fontSize: "26px" }}>
                    {headline}
                  </h1>
                  <div className="short_desc">
                    {intro.length >= 140 ? (
                      <span
                        className="read expand"
                        onClick={() => changeHeight(intro)}
                      ></span>
                    ) : (
                      ""
                    )}
                    <h2 className="full_desc_h3">{intro}</h2>
                  </div>
                </>
              ) : null}
              {isfilmReview && <FilmReviewWidgetMobile data={articleData} />}
              <div className="add_secton" style={{ height: "320px" }}>
                <NewSiteAd
                  slotId={`mobile_atf_320_${storyId}`}
                  adUnit={pageAds.header_ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  width={336}
                  height={280}
                  style={{ padding: "16px" }}
                />
              </div>
              <NewSiteAd
                slotId="PG_1x1_2"
                adUnit={pageAds.PG_1x1_2}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                style={{ height: "0" }}
                loadOnScroll={false}
              />
              <NewSiteAd
                slotId="PG_1x1_3"
                adUnit={pageAds.PG_1x1_3}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                style={{ height: "0" }}
                loadOnScroll={true}
              />
            </div>
            <div className="artcl_contnr_lower_sec">
              <div className="artcl_byline_sec">
                <ul className="artcl_byeline">
                  <Byline
                    agency={agency}
                    agencyFull={agencyFull}
                    // translated
                    // by={translatedBy}
                  />

                  <li>
                    <b>Last Updated : </b>
                    <time dateTime={updated_at ? updated_at : created_at}>
                      {updated_at
                        ? longDateConversion(updated_at)
                        : longDateConversion(created_at)}
                    </time>
                  </li>
                  <div
                    style={{
                      borderBottom: "#939393 dotted 1px",
                      margin: "7px 0",
                    }}
                  ></div>
                  <BylineAuthor
                    authors={[
                      { "reported by": reportedBy },
                      { "written by": writtenBy },
                      { "translated by": translatedBy },
                      { "edited by": editedBy },
                    ]}
                    // author={author}
                    isMobile={true}
                    authorByline={authorByline}
                  />
                </ul>
              </div>
            </div>

            {!isfilmReview ? (
              <InView
                as="div"
                threshold={0.1}
                onChange={(inView) => {
                  if (inView && local18Video) {
                    logEventNew(
                      "Video_Feature_Impression_Article_JSPlayer",
                      "Impression",
                      `${display_headline}, ${local18Video}, ${catVideoTrack} , ${story_id}`
                    );
                  }
                }}
              >
                <ArticleImage
                  headline={headline}
                  image={thumb_url || thumbnail}
                  caption={
                    is_breaking_alert == 1 && headline
                      ? headline
                      : caption
                      ? caption
                      : ""
                  }
                  youtubeId={youtubeId}
                  isMobile={true}
                  categories={categories}
                  isAjax={isAjax}
                  hola_player={hola_player}
                  videoUrl={videoUrl}
                  articleData={articleData}
                  // local18Video={local18Video ?? false}
                  local18Video={
                    articleData?.video_details?.type === "youtube"
                      ? false
                      : local18Video
                  }
                  category={category}
                  pageAds={pageAds}
                  firebase_ad_config={firebaseconfig}
                />
              </InView>
            ) : null}
            {fs_cons_id && fs_statename ? (
              <FiveStateElection2022ArticleConstWidget
                fs_cons_id={fs_cons_id}
                fs_statename={fs_statename}
              />
            ) : (
              ""
            )}
            <div
              style={{ borderBottom: "#939393 dotted 1px", margin: "7px 0" }}
            ></div>
            <SocialShare
              url={finalURL || currentUrl || outBrainUrl}
              weburl_short={articleData.weburl_short}
              articleData={articleData}
              hasShortNews={articleData.shortnews_status === 1 ? true : false}
              headline={headline}
              articleId={story_id}
              page="article_page"
              isArticlePage={true}
            />
            {articleData?.video_wall && (
              <div className="w-cont cp_related_videos">
                {videoWallCheck == 1 && (
                  <VideoWallCarousel
                    language={"hindi"}
                    strategy={"CSR"}
                    // videowallCategory={urlParam?.cat}
                    videowallCategory={
                      articleData?.categories?.length > 0
                        ? articleData?.categories[0].slug
                        : ""
                    }
                    postId={urlParam.post_id}
                    etl={true}
                  />
                )}
              </div>
            )}
            <div className="content_sec">
              {/* <InstallAppIcon
                category={"APPdownload_Mweb_Article"}
                label={"Mobile Article"}
                isSponcer={Object.keys(_1xbetData)?.length > 0 ? true : false}
              /> */}
              {/* {
                isFloatingWatsAppShare && (
                  <div className={openWatsAppShare}>
                    <div className="wa-float">
                      <div
                        title="Whatsapp Share"
                        target="_blank"
                        className=" for-whatsapp"
                      >
                        <span
                          className="wppicn"
                          onClick={() => strechIcon("open")}
                        ></span>
                        <span className="wptxt">व्हॉट्सऐप चैनल से जुड़ें</span>
                        <a
                          className="wpbtn"
                          target="_blank"
                          href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
                          onClick={() =>
                            logEvent(
                              "wa_fb",
                              "click_subscribe",
                              `${currentUrl}`
                            )
                          }
                        >
                          JOIN NOW
                        </a>
                        <span
                          className="cta"
                          onClick={() => strechIcon("close")}
                        ></span>
                      </div>
                    </div>
                  </div>
                ): (
                  <div className="whatsapp_fxd">
                    <a
                      title="Whatsapp Share"
                      className="for-whatsapp"
                      href={
                        "https://wa.me/?text=" +
                          encodeURIComponent(headline) +
                          " - " +
                          finalURL ||
                        currentUrl ||
                        outBrainUrl
                      }
                      target="_blank"
                      onClick={() =>
                        logEvent("Social_Share", "Click", `${headline},${story_id}`)
                      }
                    >OLD Icon
                      <span className="spriteshare art-whatsapp-icon"></span>
                    </a>
                  </div>
                )
              } */}

              {!isFloatingWatsAppShare && (
                //!isFixecWatsAppShare
                <div
                  className={
                    isScroll ? "whatsapp_fxd show" : "whatsapp_fxd hide"
                  }
                >
                  <a
                    title="Whatsapp Share"
                    className="for-whatsapp cp_mid_join_us_mweb"
                    href={
                      "https://wa.me/?text=" +
                        encodeURIComponent(headline) +
                        " - " +
                        finalURL ||
                      currentUrl ||
                      outBrainUrl
                    }
                    target="_blank"
                    onClick={() =>
                      logEvent(
                        "Social_Share",
                        "Click",
                        `${headline},${story_id}`
                      )
                    }
                  >
                    <span className="spriteshare art-whatsapp-icon"></span>
                  </a>
                </div>
              )}
              {hightlight_data.length ? (
                <div className="artclhglght">
                  <span className="artclhglght_hd">हाइलाइट्स</span>
                  <div>
                    {hightlight_data.map((i, key) => (
                      <span className="highbullets" key={key}>
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {liveBlogFlag ? (
                // <LiveBlogMobile allData={topPriorityData} />
                <></>
              ) : readmore?.length > 0 ? (
                <ReadMore
                  readData={readmore}
                  body={body}
                  storyId={storyId}
                  parsed={parsedBody}
                  className="content_sec"
                  isDesktop={false}
                  target="mobile"
                  headline={headline}
                  image={thumbnail}
                  category={category}
                  caption={caption ? caption : ""}
                  tags={atags || tags}
                  storyTags={
                    storyTags && storyTags.length > 0
                      ? storyTags.toString()
                      : ""
                  }
                  categories={
                    storyCategories && storyCategories.length > 0
                      ? storyCategories.toString()
                      : ""
                  }
                />
              ) : (
                <ArticleBody
                  body={body}
                  id={storyId}
                  pageAds={pageAds}
                  isDesktop={false}
                  parsed={parsedBody}
                  headline={headline || display_headline}
                  image={thumbnail}
                  caption={caption ? caption : ""}
                  tags={atags || tags}
                  storyTags={
                    storyTags && storyTags.length > 0
                      ? storyTags.toString()
                      : ""
                  }
                  categories={
                    storyCategories && storyCategories.length > 0
                      ? storyCategories.toString()
                      : ""
                  }
                  isAjax={isAjax}
                  isDistrict={ff_source == "Hyperlocal" ? true : false}
                  category={category}
                  selectedCity={
                    Object.keys(selectedCity)?.length > 0 || isDistrict
                      ? true
                      : false
                  }
                  tempScrollY={tempScrollY}
                  ff_source={ff_source}
                />
              )}
              {nextTenThings && nextTenThings?.length > 0 ? (
                <TenThingsText data={nextTenThings} />
              ) : null}
              {isfilmReview && (
                <FilmReviewWidgetMobile data={articleData} isDetailed={true} />
              )}
              {ff_source !== "Hyperlocal" && (
                <div className="related_videos" style={{ minHeight: "384px" }}>
                  <LazyLoad once offset={350}>
                    <TopVideosArticle isMobile={true} />
                  </LazyLoad>
                </div>
              )}
              {/* {cta ? (
                <p className="read_more_links">{ReactHtmlParser(cta)}</p>
              ) : null} */}
              {cta ? <p className="read_more_links"></p> : null}

              {/* {isFixecWatsAppShare && (
                <div className="whatsapp_channel">
                  <a
                    onClick={() =>
                      logEvent("wa_fixbut", "click_subscribe", `${currentUrl}`)
                    }
                    target="_blank"
                    href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
                  >
                    News18 India
                    <span>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                      >
                        <g
                          id="Group_13"
                          data-name="Group 13"
                          transform="translate(-1 -1)"
                        >
                          {" "}
                          <path
                            id="Path_1"
                            data-name="Path 1"
                            d="M11,1A10,10,0,1,0,21,11,10,10,0,0,0,11,1Zm6.891,6.7L9.158,16.455a.307.307,0,0,1-.43,0L4.109,11.821a.315.315,0,0,1,.012-.43L5.833,9.676a.3.3,0,0,1,.43,0L8.955,12.37l6.794-6.809a.3.3,0,0,1,.43,0l1.712,1.715A.3.3,0,0,1,17.891,7.7Z"
                            transform="translate(0 0)"
                            fill="#fff"
                          />
                        </g>
                      </svg>{" "}
                    </span>
                    व्हॉट्सऐप चैनल से जुड़ें
                  </a>
                </div>
              )} */}
              {
                /* !isFloatingWatsAppShare &&  */
                // !isFixecWatsAppShare && (
                //   <div className="whatsapp_channel">
                //     <a
                //       onClick={() =>
                //         logEvent(
                //           "whatsapp_follow",
                //           "Click",
                //           `mobile_article_eos`
                //         )
                //       }
                //       target="_blank"
                //       href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
                //     >
                //       News18 India
                //       <span>
                //         {" "}
                //         <svg
                //           xmlns="http://www.w3.org/2000/svg"
                //           width="20"
                //           height="20"
                //           viewBox="0 0 20 20"
                //         >
                //           <g
                //             id="Group_13"
                //             data-name="Group 13"
                //             transform="translate(-1 -1)"
                //           >
                //             {" "}
                //             <path
                //               id="Path_1"
                //               data-name="Path 1"
                //               d="M11,1A10,10,0,1,0,21,11,10,10,0,0,0,11,1Zm6.891,6.7L9.158,16.455a.307.307,0,0,1-.43,0L4.109,11.821a.315.315,0,0,1,.012-.43L5.833,9.676a.3.3,0,0,1,.43,0L8.955,12.37l6.794-6.809a.3.3,0,0,1,.43,0l1.712,1.715A.3.3,0,0,1,17.891,7.7Z"
                //               transform="translate(0 0)"
                //               fill="#fff"
                //             />
                //           </g>
                //         </svg>{" "}
                //       </span>
                //       व्हॉट्सऐप चैनल से जुड़ें
                //     </a>
                //   </div>
                // )
              }

              <p className="tag_s">
                {tags?.length ? (
                  <>
                    <strong className="tag_cls">Tags:</strong>
                  </>
                ) : null}
                {tags?.length
                  ? tags.map((tag, key) => {
                      return (
                        <Fragment key={key}>
                          <a
                            key={key}
                            href={"/tag/" + tag.slug + "/"}
                            className="cp_tags"
                          >
                            {capIt(tag.name)}
                          </a>
                          {key !== tags.length - 1 ? <span>, </span> : null}
                        </Fragment>
                      );
                    })
                  : null}
              </p>
              <div className="post_info">
                <div className="ps_col">
                  <div className="post_date">
                    <span>FIRST PUBLISHED : </span>{" "}
                    {created_at !== ""
                      ? longDateConversion(created_at)
                      : longDateConversion(updated_at)}
                  </div>
                </div>
              </div>
              {disclaimer && <div className="disclaimerText">{disclaimer}</div>}
            </div>
          </article>
        </main>
        {/* {liveBlogList?.length > 0 && (
          <InView as="div" threshold={0.1}>
            <div className="mob_container">
              <LiveBlogList
                liveBlogList={liveBlogList}
                isMobile={true}
                utm_medium={"article_page"}
              />
            </div>
          </InView>
        )} */}
        <InView as="div" threshold={0.1}>
          <Taboola
            mode={TaboolaList.articlePage.bottom.mode}
            id={TaboolaList.articlePage.bottom.id}
            container={TaboolaList.articlePage.bottom.container}
            placement={TaboolaList.articlePage.bottom.placement}
          />
        </InView>
        {showRelatedWidget && tempScrollY > 1000 && (
          <InView as="div" threshold={0.1}>
            <RelatedNews isDesktop={false} tags={atags || tags} id={storyId} />
          </InView>
        )}
        <NextPreviousArticleResponsive
          article_id={story_id}
          created_at={created_at}
          post_type={articleData.post_type}
          categories={category}
          isMobile={true}
        />
      </section>
      <div className="agli_khb_r_secs"></div>
      <style jsx global>
        {ArticleStyle}
      </style>
      <style jsx global>{`
        .disclaimerText {
          padding: 10px;
          color: #000;
          font-weight: bold;
          font-style: italic;
        }
        // .breadcum {
        //   display: flex;
        //   overflow: scroll;
        //   border-bottom: 1px dotted #939393;
        //   white-space: nowrap;
        //   align-items: center;
        //   padding: 2px 15px;
        //   text-transform: uppercase;
        //   height: 33px;
        //   color: #e1261d;
        //   ${liveBlogFlag ? "" : "margin: 0 -15px;"}
        // }
        .article_img_inner {
          display: block;
          position: relative;
          ${thumb_url ? "padding-bottom:71%;" : "height:290px;"}
          overflow:hidden;
        }
        .artclbyeline-author-intro a {
          font-size: 13px;
          line-height: 21px;
          color: #e1261d;
          font-weight: bold;
          margin-left: ${authCount ? "0" : "5px"};
        }
        .w-cont {
          height: 137px;
          overflow: hidden;
        }
        blockquote {
          background: #f9f9f9;
          border-left: 10px solid #ccc;
          margin: 1.5em 10px;
          padding: 0.5em 10px;
        }
        blockquote:before {
          color: #ccc;
          content: open-quote;
          font-size: 4em;
          line-height: 0.1em;
          margin-right: 0.25em;
          vertical-align: -0.4em;
        }
        blockquote p {
          display: inline;
        }
        .whatsapp_channel {
          margin-left: auto;
          border-radius: 5px;
          display: inline-block;
          position: relative;
          line-height: 25px;
          font-size: 18px;
          margin-bottom: 15px;
          background-color: #52ba63;
          width: 100%;
          text-align: center;
        }
        .whatsapp_channel a {
          display: flex;
          padding: 0 10px;
          font-size: 18px;
          line-height: 14px;
          height: 40px;
          color: #fff;
          border-radius: 5px;
          text-align: center;
          width: 100%;
          justify-content: center;
          align-items: center;
        }
        .whatsapp_channel svg {
          fill: #fff;
          position: relative;
          top: 2px;
          height: 35px;
        }
        .whatsapp_channel span {
          margin: 0 5px;
        }
        .form-parent {
          width: 293px;
          height: auto;
          position: fixed;
          top: 49%;
          right: -257px;
          z-index: 9999999;
          transition: all ease 0.6s;
          box-shadow: 0 3px 6px #00000029;
          border: 1px solid #fff;
          border-radius: 6px 0 0 6px;
          background-color: #52ba63;
        }
        .form-parentStr {
          right: -1px;
        }
        .whatsapp_fxd {
          position: fixed;
          right: 0;
          top: 50%;
          z-index: 111;
          border: 1px solid#fff;
          -webkit-border-radius: 6px 0 0 6px;
          -moz-border-radius: 6px 0 0 6px;
          border-radius: 6px 0 0 6px;
          border-right: 0;
          -webkit-box-shadow: 0 3px 6px#0006;
          -moz-box-shadow: 0 3px 6px#0006;
          box-shadow: 0 3px 6px#0006;
          display: none;
        }
        .show {
          right: -1px;
        }

        .wppicn {
          background: url(https://hindi.news18.com/images/siteimages/news18-hn-sprite-icons.svg)
            0 0 no-repeat;
          width: 23px;
          height: 40px;
          display: block;
          background-position: -16px -113px;
          margin-left: 3px;
        }
        .for-whatsapp {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .wptxt {
          font-size: 18px;
          line-height: 14px;
          color: #fff;
          font-weight: 700;
        }
        .wpbtn {
          width: 69px;
          height: 28px;
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          background-color: #151515;
          color: #fff;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cta {
          position: relative;
          width: 15px;
          height: 15px;
          margin-right: 4px;
        }
        .cta:before,
        .cta:after {
          content: "";
          width: 2px;
          height: 16px;
          left: 50%;
          background: #fff;
          display: block;
          position: absolute;
          margin-left: -2px;
          top: -2px;
          transform: rotate(135deg);
        }
        .cta:before {
          transform: rotate(45deg);
        }
      `}</style>
    </>
  );
};

export default React.memo(ArticleMobile);
