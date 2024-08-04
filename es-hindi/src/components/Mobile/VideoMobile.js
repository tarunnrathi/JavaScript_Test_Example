import { useRef, useEffect, useState, useCallback, useContext } from "react";
import getConfig from "next/config";
import { useInView } from "react-intersection-observer";
import VideoMobileStyle from "./VideoMobile.module.css";
import { pageEvents } from "includes/article.util";
import Head from "next/head";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import LazyLoadImage from "components/Common/CustomImage";
import dynamic from "next/dynamic";
import { getCompleteURL } from "util/global/Helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import LazyLoad from "react-lazyload";
import HindiGlobalContext from "HindiGlobalContext";

const TopToolBarMobile = dynamic(() => import("./common/TopToolBarMobile"));
const VideoArticleCard = dynamic(() =>
  import("widgets/Common/Responsive/VideoArticleCard")
);

const VideoMobile = ({
  isAjax = false,
  topPriorityData = {},
  data,
  pageAds,
  catVideoTrack,
  ...props
}) => {
  const { publicRuntimeConfig } = getConfig();
  const [currentArticle, setCurrentArticle] = useState([]);
  const { handleNotificatonOnScroll } = useContext(HindiGlobalContext);
  const [tempScrollY, setScrollY] = useState(0);
  const callFired = useRef(false);
  const {
    articleData = {},
    paramObj,
    moreVideos = [],
    breadCrumbArray,
    videoTitle,
    _1xbetData,
    finalURL,
    category_hi
  } = topPriorityData;

  const {
    headline,
    author_byline: authorByline = {},
    publish_by: publishedBy = [],
    weburl = "",
    byline,
    fms_autopublished,
    section,
    auto_youtube_import,
    story_id: storyId,
    ff_source = "",
    ff_author_name,
    disclaimer,
  } = articleData;

  const { ref, inView, entry } = useInView({
    threshold: 0.8,
  });

  const setCurrentArticleId = (id) => {
    currentArticle != id && setCurrentArticle(id);
  };

  const outBrainUrl = (articleData.url || weburl).replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  const publishedByName = publishedBy.length
    ? publishedBy[0]?.english_name
    : "";
  const publishedByWithId = publishedByName + "_" + publishedBy[0]?.ID;

  const onScroll = useCallback(() => {
    const box = document.querySelector("#video_start");
    const rect = box?.getBoundingClientRect() || {};

    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    const totalHeight =
      document.querySelector("#video_content")?.clientHeight;
    if (!isInViewport) {
      const totalScroll = document.documentElement.scrollTop;
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
          if (document.getElementsByClassName("prog_bar")[0].style.width =
            percentage >= 0) {
            handleNotificatonOnScroll(false);
          }
        }
      }
    } else {
      if (
        document.getElementsByClassName("fixtb_wrap")?.[0] &&
        document.getElementsByClassName("prog_bar")?.[0]
      ) {
        document.getElementsByClassName("fixtb_wrap")[0].style.display = "none";
        document.getElementsByClassName("prog_bar")[0].style.width = "0%";
        handleNotificatonOnScroll(true);
      }
    }
    const { pageYOffset } = window;
    setScrollY(pageYOffset);
  }, []);

  useEffect(() => {
    pageEvents({
      inView,
      entry,
      isAjax,
      authorByline,
      byline,
      fms_autopublished,
      section,
      callFired,
      url: outBrainUrl,
      headline,
      storyId,
      ff_source,
      ff_author_name,
      publishedBy: publishedBy.length ? publishedBy[0]?.english_name : "",
      articleData,
      publishedByWithId: publishedByWithId,
    });
    props.setCurrentArticle(storyId);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [inView, tempScrollY]);

  let catValue = "";
  const allSlashSplitted = weburl?.split("/");

  if (allSlashSplitted?.[3] === "news") {
    catValue = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.[3] === "photogallery") {
    catValue = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.[3] === "videos") {
    catValue = allSlashSplitted?.[4];
  } else if (allSlashSplitted?.length === 4 && !allSlashSplitted[1]) {
    catValue = "Home";
  } else {
    catValue = data?.category;
  }
  if (!isAjax) {
    return (
      <>
        <Head>
          <meta name="robots" content="max-image-preview:large" />
        </Head>
        <TopToolBarMobile
          url={outBrainUrl || finalURL }
          headline={headline}
          articleId={storyId}
          category={category_hi || data?.category}
          pageType="videos"
        />
        <div
          className={`${VideoMobileStyle.top_story} ${VideoMobileStyle.videos_consumption}`}
        >
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          <div
            onMouseOver={() => {
              setCurrentArticleId(storyId);
            }}
            ref={ref}
            id="video_content"
          >
            <div id="video_start"></div>
            <VideoArticleCard
              articleData={articleData}
              isMobile={true}
              channelLogo={
                articleData?.auto_youtube_import
                  ?.nw_auto_yt_feed_channel_thumbnail || articleData?.video_encode?.thumbnail_url
              }
              categoryName={paramObj?.subCat}
              catVideoTrack={catVideoTrack}
              videoTitle={videoTitle}
              videoId={auto_youtube_import?.nw_auto_yt_feed_id || articleData?.video_details?.video_id}
              pageAds={pageAds}
              _1xbetData={_1xbetData}
            />
          </div>

          {/* Infinitescroll videos start */}
          {/* {typeof auto_youtube_import != "undefined" && relatedstories.length > 0 && (
                        <LazyLoad once>
                            <ArticleAjax
                                key={"infinite"}
                                articles={relatedstories}
                                pageAds={pageAds}
                                setCurrentArticle={setCurrentArticle}
                                comp={VideoMobile}
                                cat={category}
                                isMobile={true}
                                dtype={"video"}
                            />
                        </LazyLoad>
                    )} */}
          {/* Infinitescroll videos ends */}
          <div className="disclaimerText">
            {disclaimer}
          </div>
        </div>
        <div style={{ height: "335px" }}>
          <Taboola
            mode={TaboolaList.videoPage.center.mode}
            id={TaboolaList.videoPage.center.id}
            container={TaboolaList.videoPage.center.container}
            placement={TaboolaList.videoPage.center.placement}
            isMobile={true}
            position={true}
          />
        </div>
        {moreVideos.length > 0 &&
          <div className="more_data_cont">
            <div className="data_head">
              <h2>मनोरंजन</h2>
              <a title="link" href="/videos/entertainment/">
                और भी देखें...
              </a>
            </div>
            <div className="video_grid">
              {moreVideos.map((video, index) => {
                return (
                  <LazyLoad once offset={500} key={index}>
                    <a href={getCompleteURL(video["weburl_r"], video["weburl"])}>
                      <div className="for_video_info for_v_icon">
                        <LazyLoadImage
                          src={video?.images?.url}
                          width={157}
                          height={100}
                          alt={video["display_headline"] || video["headline"]}
                          title={video["display_headline"] || video["headline"]}
                          isLazyLoad={true}
                        />
                        <strong>{video.post_type}</strong>
                      </div>
                      <p>{video.headline || video.display_headline}</p>
                    </a>
                  </LazyLoad>
                );
              })}
            </div>
          </div>}
        {/* <div className={VideoMobileStyle.m_outbrain}>
                    <Outbrain widgetSrc={outBrainUrl} widgetId="MB_9" />
                </div> */}
        <Taboola
          mode={TaboolaList.videoPage.bottom.mode}
          id={TaboolaList.videoPage.bottom.id}
          container={TaboolaList.videoPage.bottom.container}
          placement={TaboolaList.videoPage.bottom.placement}
        />
        <style jsx>
          {`
            .disclaimerText { padding: 10px; color:#000; font-weight: bold; font-style: italic; }
            .active-loader {
              padding: 0 !important;
              background: transparent;
            }
            .more_data_cont {
              padding: 16px;
            }
            .data_head {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .data_head h2 {
              font-size: 22px;
              color: #000;
              margin: 10px 0;
            }
            .data_head a {
              height: 26px;
              line-height: 26px;
              padding: 0 16px;
              border-radius: 5px;
              background: #fff;
              font-size: 12px;
              color: #828282;
              border: 1px solid #828282;
            }

            .video_grid a {
              color: #000;
              display: flex;
              margin-bottom: 15px;
              height: 104px;
              overflow: hidden;
            }
            .for_video_info {
              position: relative;
              height: 100px;
              width: 157px;
              flex-shrink: 0;
              margin-right: 10px;
            }
            .for_video_info strong {
              position: absolute;
              color: #fff;
              left: 5px;
              bottom: 5px;
              font-weight: normal;
              font-size: 14px;
            }
            .video_grid p {
              font-size: 15px;
              margin: 10px 0;
              line-height: 1.4;
              padding: 0 5px;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden
            }
            .nwgridbox {
              display: flex;
              justify-content: space-between;
            }
            .nwgridbox a {
              border: 1px solid #ddd;
              flex-shrink: 0;
              width: 48%;
              margin-bottom: 10px;
            }
          `}
        </style>
      </>
    );
  } else {
    return (
      <>
        {typeof auto_youtube_import !== "undefined" ? (
          <div
            onMouseOver={() => {
              setCurrentArticleId(storyId);
            }}
            ref={ref}
          >
            <VideoArticleCard
              articleData={articleData}
              isMobile={true}
              channelLogo={
                articleData?.auto_youtube_import
                  ?.nw_auto_yt_feed_channel_thumbnail
              }
              categoryName={paramObj?.subCat}
              catVideoTrack={catVideoTrack || catValue}
              videoTitle={videoTitle || articleData?.display_headline}
              videoId={auto_youtube_import?.nw_auto_yt_feed_id}
            />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
};

export default VideoMobile;
