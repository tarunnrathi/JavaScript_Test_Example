import React, { useEffect, useState } from "react";
import HeadingSection from "./newLiveBlogMobile/HeadingSection";
import getConfig from "next/config";
import useLiveBlog from "hooks/useLiveBlog";
import { InView } from "react-intersection-observer";
import { liveBlogScroll, scrollToTarget } from "includes/article.util";
import Head from "next/head";
import { relatedCard } from "../../../helper/articleBodyParser";
import Glide from "@glidejs/glide";
import RhsPhoto from "widgets/Common/Responsive/RhsPhoto";
// import englishVariables from "includes/lang.helper.js";
import NewLiveBlogStyle from "styles/Mobile/NewLiveBlogStyle";
import dynamic from "next/dynamic";
// import InstallAppIcon from "widgets/Mobile/InstallAppIcon";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import LiveBlogList from "components/Common/LiveBlogList";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { TaboolaList } from "includes/Tabola.helper";
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));

const LiveFeedRow = dynamic(() => import("./newLiveBlogMobile/LiveFeedRow"));

const NewLiveBlogMobile = ({ topPriorityData = {} }) => {
  const {
    articleData = {},
    topStories,
    photoStories,
    // category = "",
    // category_hi = "",
    pageAds,
    paramObj,
    liveBlogList,
    breadCrumbArray
  } = topPriorityData;
  const {
    // headline,
    // breadcrumb,
    liveUpdates,
    pageNumber,
    stories,
    story_id,
    //isLiveBlogInProgress,
  } = articleData;
  const { publicRuntimeConfig } = getConfig();
  // let baseUrl = publicRuntimeConfig.siteUrl;
  // baseUrl = baseUrl.replace(/\/$/, "");

  let [
    statePosts,
    remOld,
    newCount,
    updatePosts,
    loadPrev,
    lp,
    checked,
    toggle,
    totoalPosts
  ] = useLiveBlog(
    liveUpdates,
    story_id,
    (articleData?.liveblog_switcher === 1 &&
      new Date() >= new Date(articleData?.liveblog_start_time)
      && new Date() <= new Date(articleData?.liveblog_end_time)) ? true : false,
    articleData
  );

  useEffect(() => {
    const selec = document?.querySelector(`.slider-topStories`);
    if (selec) {
      new Glide(`.slider-topStories`, {
        type: "carousel",
        perView: 2,
        // autoplay: 5000,
        focusAt: "center",
        gap: 10,
      })?.mount();
    }
    window.addEventListener("scroll", () => {
      const mybutton = document.getElementById("button-up");
      if (
        document.body.scrollTop > 2000 ||
        document.documentElement.scrollTop > 2000
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    });
  }, []);

  let posts = statePosts?.length ? statePosts : liveUpdates?.posts;
  posts = posts.filter((i) => i.is_highlight != 1);

  const lastArticleDate = posts?.[posts?.length - 1]?.created_at || "";
  const breakIt = posts?.length >= 10;
  const fired = [];
  const [keyPanelData, setKeyPanelData] = useState(liveUpdates?.highlight?.sort((h1, h2) => {
    let date1 = new Date(h1.updated_at);
    let date2 = new Date(h2.updated_at);
    return date2 - date1;
  }));
  const filteredHighlights = liveUpdates?.highlight.filter((el) => el.id != liveUpdates?.sticky[0]?.id);
  const [liveUpdateData, setLiveUpdateData] = useState([...filteredHighlights, ...liveUpdates?.sticky, ...posts].sort((h1, h2) => {
    let date1 = new Date(h1.updated_at);
    let date2 = new Date(h2.updated_at);
    return date2 - date1;
  }));
  const [isHighlight, setHighlight] = useState(false);
  const [latestData, setlatestData] = useState(lp);
  const [prevData, setPrevData] = useState(posts);
  const [stickyData, setStickyData] = useState(liveUpdates?.sticky);

  const idOfFirstPost = posts && posts.length && posts[0].id;

  const firstView = () => {
    scrollToTarget(idOfFirstPost);
  };

  const stickyList = liveUpdates?.sticky || [];
  const newLp = [];

  (Array.isArray(lp) ? lp : [])?.forEach((post) => {
    if (post?.is_sticky === "1") {
      stickyList.unshift(post);
    } else if (post?.is_highlight != "1") {
      newLp.push(post);
    }
  });

  const latestHighlight = lp?.filter((i) => i.is_highlight == 1) || [];
  const sticky = [...lp, ...liveUpdates?.sticky]?.filter((i) => i.is_sticky == 1) || [];
  const updatedData = [...latestHighlight].sort((h1, h2) => {
    let date1 = new Date(h1.updated_at);
    let date2 = new Date(h2.updated_at);
    return date2 - date1;
  });

  useEffect(() => {
    setlatestData(newLp);
    if (updatedData?.length) {
      setKeyPanelData([...updatedData, ...liveUpdates?.highlight].sort((h1, h2) => {
        let date1 = new Date(h1.updated_at);
        let date2 = new Date(h2.updated_at);
        return date2 - date1;
      }));
    }
    setStickyData(sticky);
  }, [lp]);

  useEffect(() => {
    setPrevData(statePosts);
  }, [statePosts]);

  const handleShowKeyEvent = (value) => {
    setHighlight(value)
  }

  useEffect(() => {
    if (isHighlight) {
      setLiveUpdateData(keyPanelData);
    } else {
      const filteredHighlights = keyPanelData.filter((el) => el.id != liveUpdates?.sticky[0]?.id);

      setLiveUpdateData([...stickyList, ...newLp, ...posts, ...filteredHighlights].sort((h1, h2) => {
        let date1 = new Date(h1.updated_at);
        let date2 = new Date(h2.updated_at);
        return date2 - date1;
      }))
    }
  }, [isHighlight, latestData, prevData]);


  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <div>
        <div className="LiveBlog_outer">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />

          <HeadingSection
            data={articleData}
            breakIt={breakIt}
            pageAds={pageAds}
            checked={checked}
            toggle={toggle}
            paramObj={paramObj}
            pageNumber={pageNumber}
            keyPanelData={keyPanelData}
            stickyList={stickyData}
            showKeyEvent={handleShowKeyEvent}
            isHighlight={isHighlight}
          />

          {/* <!----start keyevents------> */}
          {/* <KeyEvents data={liveUpdates?.posts} /> */}
          {/* <!----end keyevents------> */}

          {/* <!----start feeds wrapper------> */}
          <div className="feedsWrapper" id="feedWrapper">
            <ul className="tabs">
              <li className="tab-links active">
                <a href="#">लाइव अपडेट</a>
              </li>
              {/* <li class="tab-links" onclick="MyTab(event, 'Highlight', 'feedWrapper')"><a href="javascript:void(0);">Highlight</a></li>
                <li class="tab-links" onclick="MyTab(event, 'Comments', 'feedWrapper')"><a href="javascript:void(0);">Comments</a></li>
                <li class="tab-links" onclick="MyTab(event, 'Related', 'feedWrapper')"><a href="javascript:void(0);">Related</a></li> */}
            </ul>
            {newCount > 0 && (
              <div className="updateBtn new_count">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    updatePosts();
                    scrollToTarget(idOfFirstPost, "end");
                  }}
                  className="news_updates"
                >
                  <i className="sprite_cls"></i>
                  {newCount} new updates
                </a>
              </div>
            )}
            {/* <div class="updateBtn">
            {newCount ? (
              <a href="#" className="news_updates">
                <i className="sprite_cls"></i>
                {newCount} new updates
              </a>
            ) : null}
          </div> */}

            <div className="PageContentWrapper">
              {/* <!---Live Feed----> */}
              <div className="tab-content LiveFeed">
                {/* {stickyList?.length >0 &&
                  stickyList?.map((post, index) => (
                    <React.Fragment key={"stickyList" + index}>
                      <LiveFeedRow
                        data={post}
                        articleData={articleData}
                        stories={stories}
                        index={3}
                        key={index}
                      />
                    </React.Fragment>
                  ))} */}

                {liveUpdateData?.length > 0 &&
                  liveUpdateData?.map((feed, index) => {
                    if (index % 20 !== 0) {
                      return (
                        <React.Fragment key={"posts" + index}>
                          <LiveFeedRow
                            data={feed}
                            articleData={articleData}
                            index={index}
                            stories={stories}
                            key={index}
                          />
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <React.Fragment key={"posts" + index}>
                          <InView
                            as="div"
                            threshold={0.1}
                            onChange={(inView, _, entry) =>
                              inView &&
                              liveBlogScroll(
                                inView,
                                entry,
                                index,
                                pageNumber,
                                fired
                              )
                            }
                          >
                            <LiveFeedRow
                              data={feed}
                              articleData={articleData}
                              index={index}
                              stories={stories}
                            />
                          </InView>
                        </React.Fragment>
                      );
                    }
                  })}
                <div className="updateBtn">
                  {(totoalPosts >= 20 && !isHighlight) && (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        loadPrev(lastArticleDate);
                      }}
                    >
                      Load More
                    </a>
                  )}
                  <div
                    onClick={firstView}
                    id="button-up"
                    className="button-up"
                  ></div>
                </div>
                <div className="ad-container">
                  <div className="addinner-box">
                    {pageAds?.BTF_300 && (
                      <NewSiteAd
                        width={336}
                        height={280}
                        slotId="mobileAdNew300x250_2"
                        adUnit={pageAds?.BTF_300}
                        sizes={[
                          [300, 250],
                          [336, 280],
                        ]}
                        removeAdSpan={true}
                      >
                      </NewSiteAd>)
                    }
                  </div></div>
                {/* {remOld ? (
                  <div className="updateBtn">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        loadPrev();
                      }}
                    >
                      Load More
                    </a>
                    <div onClick={firstView} class="button-up"></div>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
              {/* <!---Live Feed----> */}

              {/* <ul class="liveBlog_tags">
              <li class="active">
                <a href="#">Tags</a>
              </li>
              <li>
                <a href="#">#Maharashtra</a>
              </li>
              <li>
                <a href="#">#HSC Result</a>
              </li>
              <li>
                <a href="#">#Maharashtra Board</a>
              </li>
              <li>
                <a href="#">#HSC</a>
              </li>
            </ul> */}
              <div
                className={"tops"}
                dangerouslySetInnerHTML={{
                  __html: relatedCard(
                    topStories,
                    false,
                    false,
                    "topStories",
                    "टॉप स्टोरीज"
                  ),
                }}
              ></div>
              {liveBlogList?.length > 0 && (
                <LiveBlogList liveBlogList={liveBlogList} isMobile={true} utm_medium={"liveblog_page"} />
              )}
              <RhsPhoto photoStories={photoStories} />
              {/* {breakIt ? <ReadMore data={articleData} /> : null} */}
            </div>
          </div>
          {pageAds?.FBN_320 && (
            <NewSiteAd
              width={336}
              height={280}
              slotId="mobileAdNew300x250_3"
              adUnit={pageAds?.FBN_320}
              sizes={[
                [300, 250],
                [336, 280],
              ]}
              removeAdSpan={true}
              style={{ display: "flex", justifyContent: "center", height: "280px", top: "15px" }}
            >
            </NewSiteAd>)
          }
        </div>
        <InView as="div" threshold={0.1}>
          <Taboola
            mode={TaboolaList.articlePage.bottom.mode}
            id={TaboolaList.articlePage.bottom.id}
            container={TaboolaList.articlePage.bottom.container}
            placement={TaboolaList.articlePage.bottom.placement}
          />
        </InView>
        {/* <InstallAppIcon category={'APPdownload_Mweb_Liveblog'} label={'Mobile Liveblog'} /> */}
        <style jsx global>
          {NewLiveBlogStyle}
        </style>
      </div>
    </>
  );
};

export default NewLiveBlogMobile;
