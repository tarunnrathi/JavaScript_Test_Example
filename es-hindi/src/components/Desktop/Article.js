import React, { useRef, useEffect, useState, useCallback } from "react";
import getConfig from "next/config";
import useScrollBar from "hooks/useScrollBar";
import { pageEvents, capIt, sectionExtractor } from "includes/article.util";
import { useInView, InView } from "react-intersection-observer";
import Head from "next/head";
import { logEvent, logEventNew } from "includes/googleAnalytic";
import ArticleStyle from "styles/Desktop/ArticleStyle";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import { articleBodyParser } from "../../../helper/articleBodyParser";
import { getArticleList, GetCategoryArticles } from "api/global/Common";
import { longDateConversion } from "../../../helper/global";
import LazyLoadImage from "components/Common/CustomImage";
import { getRelativeURL } from "util/global/Helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import NextPreviousArticleResponsive from "components/Common/NextPreviousComponentArticle";
import LazyLoad from "react-lazyload";

const TopVideoArticle = dynamic(() => import("widgets/Desktop/TopVideosArticle"),{ssr:false});
const TopToolBar = dynamic(() => import("./common/TopToolBar"));
const RhsCommon = dynamic(() => import("widgets/Common/Desktop/RhsCommon"));
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
const FilmReviewWidget = dynamic(() =>
  import("widgets/Desktop/FilmReviewWidget")
);
const ArticleImage = dynamic(() => import("components/Common/ArticleImage"));
const Byline = dynamic(() => import("components/Common/ByLine"));
const SocialShare = dynamic(() => import("components/Desktop/SocialShare"));
const BylineAuthor = dynamic(() => import("components/Common/BylineAuthor"));
const Recipe = dynamic(() => import("components/Common/Recipe"));
const FiveStateElection2022ArticleConstWidget = dynamic(() =>
  import("widgets/Common/Desktop/FiveStateElection2022ArticleConstWidget")
);
const ReadMore = dynamic(() => import("components/Common/ReadMore"));
const ArticleBody = dynamic(() => import("components/Common/ArticleBody"));
const TenThingsText = dynamic(() => import("components/Common/TenThingsText"));
const FilmRatingWidget = dynamic(() =>
  import("widgets/Desktop/FilmRatingWidget")
);
const VideoWallCarousel = dynamic(() =>
  import(
    "../../../common_react/CommonSrc/CommonComponents/videoWall/Desktop/VideoWallCarousel"
  )
);
const SpecialLiveBlogArticle = dynamic(() =>
  import("components/Common/SpecialLiveBlogArticle")
);

const Article = ({
  isAjax = false,
  atags,
  catVideoTrack,
  topPriorityData = {},
  pageAds,
}) => {
  const {
    currentUrl,
    articleData: articleDataById = {},
    liveBlogFlag,
    urlParam = {},
    category,
    topStory = {},
    topStories = [],
    photoStories = [],
    finalURL,
    videoTitle,
    trendingStories,
    config: firebaseconfig = {},
    selectedCity,
    isDistrict,
    isMobile,
    liveBlogList,
    breadCrumbArray,
    specialLiveBlog,
  } = topPriorityData;

  const [articleData, setArticleData] = useState(articleDataById);
  const [tempScrollY, setScrollY] = useState(0);
  const {
    headline,
    images: { url: thumbnail, caption } = {},
    youtubeid: youtubeId,
    categories = [],
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
    publish_by = [],
    author,
    weburl = "",
    byline,
    fms_autopublished,
    section,
    recipe_rating: isRecipe,
    "10things_text": nextTenThings = [],
    hola_player,
    videoUrl,
    story_categories: storyCategories = [],
    story_tags: storyTags = [],
    is_breaking_alert = 0,
    local18_video: local18Video = false,
    ff_source = "",
    ff_author_name,
    hightlight_data = [],
    fs_cons_id = "",
    fs_statename = "",
    readmore,
    body,
    parsedBody,
    url,
    display_headline,
    local18_video,
    story_id,
    images_all_sizes: {
      sizes: { ["4x3"]: { url: thumb_url = null } = {} } = {},
    } = {},
    created_at,
    updated_at,
    disclaimer,
  } = articleData || {};
  const temp = useRef(0);
  const { cat = "" } = urlParam;
  const { publicRuntimeConfig } = getConfig();
  const callFired = useRef(false);
  const [stories, setStories] = useState([]);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [scrollTop] = useScrollBar();
  const [showSlider, setShowSlider] = useState(false);

  const publishedBy = publish_by.length ? publish_by[0]?.english_name : "";
  const publishedByWithId = publishedBy + "_" + publish_by[0]?.ID;
  const isfilmReview =
    categories.length && categories?.[0].slug === "film-review";

  const rhsTopStoryListing =
    "rhsTopStoryListing" in topStory ? topStory.rhsTopStoryListing : [];

  const outBrainUrl = (url || weburl).replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  if (scrollTop > 200 && !showSlider) {
    setShowSlider(true);
  }

  const setCurrentArticleId = useCallback(
    (id) => {
      if (currentArticle !== id) setCurrentArticle(id);
    },
    [currentArticle]
  );

  const hideReadMore = useCallback((i) => {
    const read = document.querySelector(".seconadaryheading");
    read.innerHTML = i;
  }, []);

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
      document.querySelector("#artcle_content")?.clientHeight - 370;
    // tempScroll = tempScroll > rect.top ? tempScroll : rect.top;
    if (!isInViewport) {
      const totalScroll = document.documentElement.scrollTop - 380;
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

  const getTagData = useCallback(() => {
    const tagsData = [];
    let filter = {};
    if (articleData?.tags?.length) {
      (articleData?.tags || []).forEach((item) => {
        if (item.slug) {
          tagsData.push(item.slug);
        }
      });
      filter = {
        not: { story_id: `${articleData.id || articleData.story_id}` },
        post_type: "text",
        "tags.slug": tagsData,
      };
    } else {
      if (articleData?.categories?.length) {
        const obj = {};
        Object.assign(
          obj,
          articleData?.categories[0]?.parent
            ? { "subsection.id": articleData?.categories[0]?.id }
            : { "categories.id": articleData?.categories[0]?.id }
        );
        filter = {
          not: { story_id: `${articleData.id || articleData.story_id}` },
          post_type: "text",
        };
        Object.assign(filter, obj);
      }
    }
    getArticleList(
      {
        count: 4,
        offset: 0,
        fields: "story_id,display_headline,headline,weburl,images",
        filter: filter,
      },
      true
    )
      .then((response) => {
        setStories([...response]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    articleData?.categories,
    articleData.id,
    articleData.story_id,
    articleData?.tags,
  ]);

  const getRelatedVideoData = useCallback(() => {
    if (tempScrollY > 300 && temp.current === 0) {
      temp.current = temp.current + 1;
      articleData?.video_wall &&
        logEvent("select_related_videos", "Impression", finalURL);
      if (isDistrict && selectedCity && selectedCity.slug) {
        GetCategoryArticles(
          {
            filter: [
              {
                count: 11,
                offset: 0,
                sortOrder: "desc",
                fields: "",
                sortBy: "created_at",
                category: `${selectedCity.slug}`,
                type: "category",
              },
            ],
            key: `${selectedCity.slug}`,
          },
          true
        )
          .then((data) => {
            if (data?.length > 0 && articleData) {
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
                !(liveBlogFlag || articleData?.liveblog_switcher === 1),
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
            console.error(error);
          });
      }
    }
  }, [
    articleData,
    finalURL,
    isDistrict,
    isMobile,
    liveBlogFlag,
    pageAds,
    selectedCity,
    storyId,
    tempScrollY,
  ]);

  useEffect(() => {
    getTagData();
    getRelatedVideoData();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [tempScrollY]);

  useEffect(() => {
    pageEvents({
      inView,
      entry,
      isAjax,
      authorByline: authorByline.length
        ? authorByline[0]
        : { language_name: "", author_type: "" },
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
    });
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
      <TopToolBar
        headline={headline}
        url={finalURL || currentUrl || outBrainUrl}
        articleId={storyId}
        pageType={"article"}
      />
      <section
        className="article_section"
        onMouseOver={() => {
          setCurrentArticleId(storyId);
        }}
        id={`article_${storyId}`}
        data-url={outBrainUrl}
        data-title={headline}
        data-id={storyId}
        ref={ref}
      >
        <div className="container">
          {/*ElectionBanner for 2022*/}
          {/* { ElectionsHomeBanner ? <ElectionBanner/>:"" } */}
          <div className="artcl_container">
            <main className="artcl_lft">
              {specialLiveBlog?.switch_status === "1" && (
                <SpecialLiveBlogArticle blogContent={specialLiveBlog} />
              )}
              <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
              <article id="artcle_content">
                <div id="article_start"></div>
                {isfilmReview ? (
                  <FilmReviewWidget articleData={articleData} />
                ) : null}
                {!isRecipe && <h1 style={{ fontSize: "36px" }}>{headline}</h1>}
                <div className="artcl_contents">
                  {!isRecipe ? (
                    <>
                      <InView
                        as="div"
                        threshold={0.1}
                        onChange={(inViewd) => {
                          if (inViewd && local18Video) {
                            logEventNew(
                              "Video_Feature_Impression_Article_JSPlayer",
                              "Impression",
                              ` ${
                                videoTitle || display_headline
                              }, ${local18_video} ,  ${catVideoTrack} , ${story_id}`
                            );
                          }
                        }}
                      >
                        <ArticleImage
                          headline={headline}
                          image={thumb_url || thumbnail}
                          caption={
                            is_breaking_alert === 1 && headline
                              ? headline
                              : caption
                              ? caption
                              : ""
                          }
                          youtubeId={youtubeId}
                          isMobile={false}
                          categories={categories}
                          isAjax={isAjax}
                          hola_player={hola_player}
                          videoUrl={videoUrl}
                          articleData={articleData}
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
                      <div className="article_content_row">
                        <div className="artclbyeline">
                          <h2 className="seconadaryheading summary">
                            {intro.length > 120 ? (
                              <>
                                {intro.substring(0, 119)}{" "}
                                <span
                                  className="readmoreintro news18_read_more"
                                  onClick={() => hideReadMore(intro)}
                                >
                                  ...अधिक पढ़ें
                                </span>
                              </>
                            ) : (
                              <span>{intro}</span>
                            )}
                          </h2>
                          <ul className="artclbyeline-agency">
                            <Byline agency={agency} agencyFull={agencyFull} />
                            <li>
                              <b>Last Updated : </b>
                              <time
                                dateTime={updated_at ? updated_at : created_at}
                              >
                                {updated_at
                                  ? longDateConversion(updated_at)
                                  : longDateConversion(created_at)}
                              </time>
                            </li>
                          </ul>

                          <SocialShare
                            headline={headline}
                            url={finalURL || currentUrl || outBrainUrl}
                            articleId={storyId}
                          />
                          <ul className="artclbyeline-author">
                            <BylineAuthor
                              authors={[
                                { "reported by": reportedBy },
                                { "written by": writtenBy },
                                { "translated by": translatedBy },
                                { "edited by": editedBy },
                              ]}
                              author={author}
                              isMobile={false}
                              authorByline={authorByline}
                            />
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Recipe
                      articleData={articleData}
                      actualUrl={finalURL || currentUrl}
                      isDesktop={true}
                      isAjax={isAjax}
                      storyId={storyId}
                    />
                  )}
                </div>
                {fs_cons_id && fs_statename ? (
                  <FiveStateElection2022ArticleConstWidget
                    fs_cons_id={fs_cons_id}
                    fs_statename={fs_statename}
                  />
                ) : (
                  ""
                )}
                {articleData?.video_wall && (
                  <div className="w-cont cp_related_videos">
                    <VideoWallCarousel
                      language={"hindi"}
                      strategy={"CSR"}
                      videowallCategory={
                        articleData?.categories?.length > 0
                          ? articleData?.categories[0].slug
                          : ""
                      }
                      postId={urlParam.post_id}
                      etl={true}
                    />
                  </div>
                )}
                <div className="khbren_section">
                  {/* <div className="icon-bar">
                    <a
                      href={
                        "https://www.facebook.com/sharer.php?u=" + finalURL ||
                        currentUrl ||
                        outBrainUrl + "&t=" + headline
                      }
                      target="_blank"
                      onClick={() =>
                        logEvent(
                          "Social_Share",
                          "Click",
                          `${headline},${storyId},facebook`
                        )
                      }
                    >
                      <span className="spriteshare art-facebook-icon"></span>
                    </a>
                    <a
                      href={
                        "https://twitter.com/share?text=" +
                          headline +
                          " - " +
                          finalURL ||
                        currentUrl ||
                        outBrainUrl + "&t=" + headline
                      }
                      target="_blank"
                    >
                      <span className="spriteshare art-twitter-icon"></span>
                    </a>
                    <a
                      className="for-whatsapp"
                      href={
                        "https://web.whatsapp.com/send?text=" +
                          headline +
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
                          `${headline},${storyId},whatsapp`
                        )
                      }
                    >
                      <span className="spriteshare art-whatsapp-icon"></span>
                    </a>
                    <a
                      href={
                        "mailto:?subject=" + headline + " - " + finalURL ||
                        currentUrl ||
                        outBrainUrl
                      }
                      target="_blank"
                      onClick={() =>
                        logEvent(
                          "Social_Share",
                          "Click",
                          `${headline},${storyId},email`
                        )
                      }
                    >
                      <span className="spriteshare art-email-icon"></span>
                    </a>
                    <a
                      href={
                        "https://telegram.me/share/url?mini=true&url=" +
                          headline +
                          "&url=" +
                          finalURL ||
                        currentUrl ||
                        outBrainUrl
                      }
                      target="_blank"
                      onClick={() =>
                        logEvent(
                          "Social_Share",
                          "Click",
                          `${headline},${storyId},telegram`
                        )
                      }
                    >
                      <span className="spriteshare art-telegram-icon"></span>
                    </a>
                  </div> */}
                  {stories && stories.length ? (
                    <div className={`khbr_lft_sec related-${storyId}`}>
                      <h4 className="khbr_hdng cp_related_stories">
                        {stories[0]?.image ? "चुनाव 2022" : "संबंधित खबरें"}
                      </h4>
                      <ul className="khbr_lists">
                        {stories.map((item, index) =>
                          index < 4 ? (
                            <li
                              key={"stories" + index}
                              onClick={() =>
                                ga(
                                  "send",
                                  "event",
                                  "related_news",
                                  "Click_Consumption",
                                  item.display_headline ||
                                    item.headline + "," + item.story_id
                                )
                              }
                            >
                              <a
                                href={
                                  item.weburl
                                    ? getRelativeURL(false, item.weburl)
                                    : ""
                                }
                                onClick={() =>
                                  logEvent(
                                    "Related_Story",
                                    "Click",
                                    `${item.headline},${item.story_id}`
                                  )
                                }
                                className="cp_related_stories"
                              >
                                <figure className="khbr_lists_img">
                                  <LazyLoadImage
                                    src={item.thumbnail || item?.images?.url}
                                    alt={item.display_headline || item.headline}
                                    title={
                                      item.display_headline || item.headline
                                    }
                                    width={156}
                                    height={104}
                                    isLazyLoad={false}
                                  />
                                </figure>
                                <p>{item.display_headline || item.headline}</p>
                              </a>
                            </li>
                          ) : (
                            ""
                          )
                        )}
                      </ul>
                    </div>
                  ) : null}

                  <div
                    className={`khbr_rght_sec ${
                      !stories.length ? "fullstateshow" : ""
                    } `}
                    style={{
                      width: stories.length ? "724px" : "724px",
                    }}
                  >
                    {hightlight_data && hightlight_data.length ? (
                      <div className="artclhglght">
                        <span className="artclhglght_hd">हाइलाइट्स</span>
                        <div>
                          {hightlight_data.map((i, index) => (
                            <span
                              className="highbullets"
                              key={"hightlight_data" + index}
                            >
                              {i}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {readmore ? (
                      <ReadMore
                        readData={readmore}
                        body={body}
                        className="storypara"
                        first={true}
                        parsed={parsedBody}
                        storyId={storyId}
                        storyTags={
                          storyTags.length > 0 ? storyTags.toString() : ""
                        }
                        tags={atags || tags}
                        headline={headline}
                        category={category}
                        image={thumbnail}
                        caption={caption && caption !== "" ? caption : intro}
                        categories={
                          storyCategories.length > 0
                            ? storyCategories.toString()
                            : ""
                        }
                      />
                    ) : (
                      <ArticleBody
                        body={body}
                        parsed={parsedBody}
                        id={storyId}
                        first={true}
                        storyTags={
                          storyTags.length > 0 ? storyTags.toString() : ""
                        }
                        tags={atags || tags}
                        headline={headline}
                        image={thumbnail}
                        caption={caption && caption !== "" ? caption : intro}
                        categories={
                          storyCategories.length > 0
                            ? storyCategories.toString()
                            : ""
                        }
                        isAjax={isAjax}
                        category={category}
                        ff_source={ff_source}
                      />
                    )}

                    {nextTenThings && nextTenThings.length ? (
                      <TenThingsText data={nextTenThings} />
                    ) : null}

                    {isfilmReview ? (
                      <FilmRatingWidget article_data={articleData} />
                    ) : null}
                    {ff_source !== "Hyperlocal" && (
                      <LazyLoad once offset={200}>
                        <TopVideoArticle />
                      </LazyLoad>
                    )}
                    {/* {cta ? (
                    <p className="read_more_links news18_read_more">{ReactHtmlParser(cta)}</p>
                  ) : null} */}
                    <p className="tag_s">
                      {tags && tags.length ? <>Tags: </> : null}
                      {tags && tags.length
                        ? tags.map((tag, key) => {
                            return (
                              <React.Fragment key={"tags" + key}>
                                <a
                                  key={key}
                                  href={"/tag/" + tag.slug + "/"}
                                  className="cp_tags"
                                >
                                  {capIt(tag.name)}
                                </a>
                                {key !== tags.length - 1 ? (
                                  <span>, </span>
                                ) : null}
                              </React.Fragment>
                            );
                          })
                        : null}
                    </p>
                    <div className="post_info">
                      <div className="ps_col">
                        <div className="post_date">
                          <span>FIRST PUBLISHED : </span>{" "}
                          {/* {creationDate !== "" ? creationDate : updateDate} */}
                          {created_at
                            ? longDateConversion(created_at)
                            : longDateConversion(updated_at)}
                        </div>
                      </div>
                      <div className="whatsapp_channel">
                        <a
                          onClick={() =>
                            logEvent(
                              "whatsapp_follow",
                              "Click",
                              `desktop_article_eo`
                            )
                          }
                          target="_blank"
                          href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
                          className="join_us_whatsapp_footer_cp"
                        >
                          <div className="walft"> News18 India </div>
                          <div className="wargt cp_footer_join_us_mweb">
                            <span className="cp_footer_join_us_mweb">
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 18.305 18.305"
                                className="cp_footer_join_us_mweb"
                              >
                                <g
                                  id="Group_13"
                                  data-name="Group 13"
                                  transform="translate(0 0)"
                                >
                                  {" "}
                                  <path
                                    id="Path 1596"
                                    data-name="Path 1596"
                                    d="M4.34-6.445a.869.869,0,0,1,.408.236.772.772,0,0,1,.043.408,2.3,2.3,0,0,1-.193.709,1.547,1.547,0,0,1-.687.709,1.857,1.857,0,0,1-.9.3,1.612,1.612,0,0,1-.645.064A9.038,9.038,0,0,1,.3-4.727,7.655,7.655,0,0,1-2.385-6.832q-.967-1.246-1.074-1.439t-.473-.881A3.077,3.077,0,0,1-4.275-10.7a2.361,2.361,0,0,1,.322-1.289,3,3,0,0,1,.516-.6q.387-.344.645-.258h.43a.707.707,0,0,1,.215.043q.129.043.258.387l.645,1.719a.322.322,0,0,1,0,.387l-.215.387-.387.387a.572.572,0,0,0-.129.193.347.347,0,0,0,.043.279,7.054,7.054,0,0,0,.408.645,8.9,8.9,0,0,0,.795.988,6.7,6.7,0,0,0,1.117.816l.688.344q.3.215.473-.043l.73-.859A.371.371,0,0,1,2.535-7.3a1.262,1.262,0,0,1,.3.043ZM0-17.4a9.1,9.1,0,0,1,6.488,2.664A9.1,9.1,0,0,1,9.152-8.25,9.1,9.1,0,0,1,6.488-1.762,9.1,9.1,0,0,1,0,.9,9.165,9.165,0,0,1-4.9-.516L-9.152.9l1.418-4.254a9.165,9.165,0,0,1-1.418-4.9,9.1,9.1,0,0,1,2.664-6.488A9.1,9.1,0,0,1,0-17.4Zm0,1.8a7.35,7.35,0,0,0-5.2,2.148,7.35,7.35,0,0,0-2.148,5.2A7.289,7.289,0,0,0-6.016-4.039l-.859,2.664,2.664-.859A7.289,7.289,0,0,0,0-.9,7.35,7.35,0,0,0,5.2-3.051a7.35,7.35,0,0,0,2.148-5.2,7.35,7.35,0,0,0-2.148-5.2A7.35,7.35,0,0,0,0-15.6Z"
                                    transform="translate(9.152 17.402)"
                                    fill="#fff"
                                  />
                                </g>
                              </svg>{" "}
                            </span>
                            व्हॉट्सऐप चैनल से जुड़ें
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="disclaimerText">{disclaimer}</div>
                  </div>
                </div>
              </article>
              <Taboola
                mode={TaboolaList.articlePage.bottom.mode}
                id={TaboolaList.articlePage.bottom.id}
                container={TaboolaList.articlePage.bottom.container}
                placement={TaboolaList.articlePage.bottom.placement}
              />
            </main>
            <aside className="artcl_rght">
              <RhsCommon
                pageAds={pageAds}
                currentURL={outBrainUrl}
                photoStories={photoStories}
                topStories={
                  rhsTopStoryListing.length ? rhsTopStoryListing : topStories
                }
                articleData={articleData}
                hideAstro={true}
                cat={cat}
                trendingStory={trendingStories}
                taboolaList={TaboolaList.articlePage}
                liveBlogList={liveBlogList}
                utm_medium="article_page"
                isLiveBlogPositionOnArticle={true}
              />
            </aside>
          </div>
          <div className="agli_khb_r_secs"></div>
        </div>
        <NextPreviousArticleResponsive
          article_id={story_id}
          created_at={created_at}
          post_type={articleData.post_type}
          categories={category}
          isMobile={false}
        />
      </section>
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
        .artcl_contents_img {
          padding-left: 0px;
          width: 540px;
          position: relative;
          ${thumb_url ? "height: 360px;" : "height: 320px;"}
          overflow: hidden;
          background: #000;
          display: flex;
          justify-content: center;
        }
        .slction_section {
          width: 100% ${!stories.length ? "!important" : ""};
          background-color: #f2f2f2;
          border-bottom: 1px solid #c4c4c4;
          padding: 16px;
        }
        .w-cont {
          height: 115px;
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
        .artclbyeline-author li.authr_mob_li a {
          margin-right: 8px;
        }
        .readmoreintro {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
export default React.memo(Article);
