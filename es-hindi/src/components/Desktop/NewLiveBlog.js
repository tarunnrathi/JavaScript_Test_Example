import React, { useEffect, useState } from "react";
import getConfig from "next/config";
// import Breadcrumb from "./newLiveBlog/Breadcrumb";
import HeadingSection from "./newLiveBlog/HeadingSection";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import useLiveBlog from "hooks/useLiveBlog";
import { InView } from "react-intersection-observer";
import {
  liveBlogScroll,
  imageLoader,
  scrollToTarget,
} from "includes/article.util";
import Head from "next/head";
import NewLiveBlogStyle from "styles/Desktop/NewLiveBlogStyle";
import dynamic from "next/dynamic";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { TaboolaList } from "includes/Tabola.helper";
const Taboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));

const LiveFeedRow = dynamic(() => import("./newLiveBlog/LiveFeedRow"));
const ReadMore = dynamic(() => import("./newLiveBlog/ReadMore"));

const NewLiveBlog = (props) => {
  const {
    articleData = {},
    // category = "",
    // category_hi = "",
    liveBlogList = [],
    breadCrumbArray,
  } = props?.topPriorityData || {};
  const { liveUpdates, pageNumber, stories } = articleData || {};
  const [
    statePosts,
    remOld,
    newCount,
    updatePosts,
    loadPrev,
    lp,
    checked,
    toggle,
    totoalPosts,
  ] = useLiveBlog(
    liveUpdates,
    articleData.story_id,
    articleData?.liveblog_switcher === 1 &&
      new Date() >= new Date(articleData?.liveblog_start_time) &&
      new Date() <= new Date(articleData?.liveblog_end_time)
      ? true
      : false,
    articleData
  );
  const { publicRuntimeConfig } = getConfig();
  let baseUrl = publicRuntimeConfig.siteUrl;
  baseUrl = baseUrl.replace(/\/$/, "");
  let posts = statePosts?.length ? statePosts : liveUpdates?.posts;
  posts = posts.filter((i) => i.is_highlight != 1);
  const lastArticleDate = posts?.[posts?.length - 1]?.created_at || "";
  const breakIt = posts?.length >= 10;
  const fired = [];
  const [keyPanelData, setKeyPanelData] = useState(
    liveUpdates?.highlight?.sort((h1, h2) => {
      const date1 = new Date(h1.updated_at);
      const date2 = new Date(h2.updated_at);
      return date2 - date1;
    })
  );
  const filteredHighlights = liveUpdates?.highlight.filter(
    (el) => el.id != liveUpdates?.sticky[0]?.id
  );
  const [liveUpdateData, setLiveUpdateData] = useState(
    [...filteredHighlights, ...liveUpdates?.sticky, ...posts].sort((h1, h2) => {
      const date1 = new Date(h1.updated_at);
      const date2 = new Date(h2.updated_at);
      return date2 - date1;
    })
  );
  const [isHighlight, setHighlight] = useState(false);
  const [latestData, setlatestData] = useState(lp);
  const [prevData, setPrevData] = useState(posts);
  const [stickyData, setStickyData] = useState(liveUpdates?.sticky);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const mybutton = document.getElementById("button-up");
      if (
        document.body.scrollTop > 3000 ||
        document.documentElement.scrollTop > 3000
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    });
  }, []);
  const idOfFirstPost = posts && posts.length && posts[0].id;

  const firstView = () => {
    scrollToTarget(idOfFirstPost);
  };

  const stickyList = liveUpdates?.sticky || [];
  const newLp = [];

  (Array.isArray(lp) ? lp : []).forEach((post) => {
    if (post?.is_sticky === "1") {
      stickyList.unshift(post);
    } else if (post?.is_highlight != "1") {
      newLp.push(post);
    }
  });
  const latestHighlight = lp?.filter((i) => i.is_highlight == 1) || [];
  const sticky =
    [...lp, ...liveUpdates?.sticky]?.filter((i) => i.is_sticky == 1) || [];
  const updatedData = [...latestHighlight].sort((h1, h2) => {
    const date1 = new Date(h1.updated_at);
    const date2 = new Date(h2.updated_at);
    return date2 - date1;
  });

  useEffect(() => {
    setlatestData(newLp);
    if (updatedData?.length) {
      setKeyPanelData(
        [...updatedData, ...liveUpdates?.highlight].sort((h1, h2) => {
          const date1 = new Date(h1.updated_at);
          const date2 = new Date(h2.updated_at);
          return date2 - date1;
        })
      );
    }
    setStickyData(sticky);
  }, [lp]);

  useEffect(() => {
    setPrevData(statePosts);
  }, [statePosts]);

  const handleShowKeyEvent = (value) => {
    setHighlight(value);
  };

  useEffect(() => {
    if (isHighlight) {
      setLiveUpdateData(keyPanelData);
    } else {
      const filteredHighlights = keyPanelData.filter(
        (el) => el.id != liveUpdates?.sticky[0]?.id
      );

      setLiveUpdateData(
        [...stickyList, ...newLp, ...posts, ...filteredHighlights].sort(
          (h1, h2) => {
            const date1 = new Date(h1.updated_at);
            const date2 = new Date(h2.updated_at);
            return date2 - date1;
          }
        )
      );
    }
  }, [isHighlight, latestData, prevData]);

  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
        <link
          rel="preload"
          as="image"
          href={imageLoader(articleData?.images_all_sizes?.url, 205, 137)}
        />
      </Head>
      <div>
        <div className="live_blog_wrapper">
          <div className="live_blog_container">
            <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
            {/* <Breadcrumb
              title={articleData?.display_headline}
              category={category_hi || category}
              breadcrumb={headline || breadcrumb}
              categoryUrl={category || category_hi}
            /> */}
            <div className="live_blog">
              <div className="articleshare-new">
                <div className="articleshare-new-in">
                  <a
                    href={`https://web.whatsapp.com/send?text=${
                      articleData?.display_headline
                    }-${baseUrl + articleData?.weburl_r}`}
                    target="_blank"
                    rel="nofollow"
                  >
                    <svg
                      enableBackground="new 0 0 100 100"
                      height="100px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 100 100"
                      width="100px"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <g>
                        <defs>
                          <rect height="100" id="SVGID_1_" width="100"></rect>
                        </defs>
                        <path d="M95,49.247c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L5,95.406   l7.975-23.522c-4.023-6.606-6.34-14.354-6.34-22.637c0-24.213,19.781-43.841,44.184-43.841C75.223,5.406,95,25.034,95,49.247    M50.818,12.388c-20.484,0-37.146,16.535-37.146,36.859c0,8.066,2.629,15.535,7.076,21.611l-4.641,13.688l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.858C87.964,28.924,71.301,12.388,50.818,12.388    M73.129,59.344c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.494c-0.993-0.359-1.717-0.539-2.438,0.536   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.334   c-3.219-2.847-5.393-6.364-6.025-7.44c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.976   c-0.902-2.151-1.803-1.793-2.436-1.793c-0.631,0-1.354-0.09-2.076-0.09s-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.114c0.541,0.716,7.49,11.92,18.5,16.223   C63.2,71.177,63.2,69.742,65.186,69.562c1.984-0.179,6.406-2.599,7.312-5.107C73.398,61.943,73.398,59.792,73.129,59.344"></path>
                      </g>
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer.php?u=${
                      baseUrl + articleData?.weburl_r
                    }&t=${articleData?.display_headline}`}
                    target="_blank"
                    rel="nofollow"
                  >
                    <svg
                      enableBackground="new 0 0 512 512"
                      height="512px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 512 512"
                      width="512px"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <g>
                        <path d="M191.844,511.5V288.375h-68.313V188h69.875v-83.063c0,0,3.188-104.625,92.813-105.438h99.75V98h-61.875   c0,0-26.125,0-26.125,29.438c0,29.375,0,62.313,0,62.313h89.5l-10.75,100.313h-77.188V511.5H191.844z"></path>
                      </g>
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/share?text=${
                      articleData?.display_headline
                    }&url=${baseUrl + articleData?.weburl_r}`}
                    target="_blank"
                    rel="nofollow"
                    className="nhtwicon-lv hsocialsprite-lv"
                  >
                    {/* <svg
                      enableBackground="new 0 0 56.693 56.693"
                      height="56.693px"
                      id="Layer_1"
                      version="1.1"
                      viewBox="0 0 56.693 56.693"
                      width="56.693px"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <path d="M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454  c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303  c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412  c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91  c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019  c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541  c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z"></path>
                    </svg> */}
                  </a>
                  {/* <a
                    href={`https://kooapp.com/create?title=${articleData?.display_headline}&link=${articleData?.weburl}&language=hi&handle=News18Hindi&utm_source=News18Hindi&utm_campaign=News18Hindi`}
                    target="_blank"
                  >
                    <span className="spriteshare art-linkedin-icon"></span>
                  </a> */}
                  <a
                    href={`mailto:?subject=${
                      articleData?.display_headline
                    }&body=${baseUrl + articleData?.weburl_r}`}
                    target="_blank"
                    rel="nofollow"
                  >
                    <svg
                      height="16px"
                      version="1.1"
                      viewBox="0 0 20 16"
                      width="20px"
                      xmlns="https://www.w3.org/2000/svg"
                      xmlnssketch="https://www.bohemiancoding.com/sketch/ns"
                    >
                      <title></title>
                      <desc></desc>
                      <defs></defs>
                      <g
                        fill="none"
                        fillRule="evenodd"
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                      >
                        <g
                          fill="#000000"
                          id="Icons-Communication"
                          transform="translate(-168.000000, -43.000000)"
                        >
                          <g
                            id="email"
                            transform="translate(168.000000, 43.000000)"
                          >
                            <path
                              d="M18,0 L2,0 C0.9,0 0,0.9 0,2 L0,14 C0,15.1 0.9,16 2,16 L18,16 C19.1,16 20,15.1 20,14 L20,2 C20,0.9 19.1,0 18,0 L18,0 Z M18,4 L10,9 L2,4 L2,2 L10,7 L18,2 L18,4 L18,4 Z"
                              id="Shape"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="live_blog_left">
                <HeadingSection
                  pageNumber={pageNumber}
                  data={articleData}
                  breakIt={breakIt}
                  checked={checked}
                  toggle={toggle}
                  keyPanelData={keyPanelData}
                  stickyList={stickyData}
                  showKeyEvent={handleShowKeyEvent}
                  isHighlight={isHighlight}
                />
                {/* <!-- Key Event start here --> */}
                {/* <KeyEvents data={posts} /> */}
                {/* <!-- Key Event end here --> */}
                <div id="feedWrapper">
                  <div className="live_blog_tab">
                    <a
                      className="tab-links active"
                      onClick="MyTab(event, 'LiveFeed', 'feedWrapper')"
                    >
                      लाइव अपडेट
                    </a>
                    {/* <a
                    className="tab-links"
                    onclick="MyTab(event, 'Highlight', 'feedWrapper')"
                    href="javascript:void(0);"
                  >
                    Highlights
                  </a>
                  <a
                    className="tab-links"
                    onclick="MyTab(event, 'Comments', 'feedWrapper')"
                    href="javascript:void(0);"
                  >
                    Comments
                  </a>
                  <a
                    className="tab-links"
                    onclick="MyTab(event, 'Related', 'feedWrapper')"
                    href="javascript:void(0);"
                  >
                    Related Articles
                  </a> */}
                  </div>
                  {/* <!---Live Feed----> */}
                  <div className="tab-content LiveFeed">
                    {newCount !== 0 && (
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          updatePosts();
                          scrollToTarget(idOfFirstPost, "end");
                        }}
                        href=""
                        className="news_updates"
                      >
                        <i className="sprite_cls"></i>
                        {newCount} new updates
                      </a>
                    )}
                    <div className="live_feed">
                      {/* {stickyList?.length >0 &&
                        stickyList?.map((post, index) => (
                          <React.Fragment key={"stickyList" + index}>
                            <LiveFeedRow
                              data={post}
                              articleData={articleData}
                              index={3}
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
                                  />
                                </InView>
                              </React.Fragment>
                            );
                          }
                        })}
                    </div>
                  </div>
                  {/* <!---Live Feed----> */}

                  <div className="updateBtn">
                    {totoalPosts >= 20 && !isHighlight && (
                      <a
                        href=""
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
                  {/* {remOld ? (
                  <div className="updateBtn">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        loadPrev();
                      }}
                    >
                      Load More
                    </a>
                    <div onClick={firstView} class="button-up"></div>
                  </div>
                ) : null} */}
                  {breakIt ? <ReadMore data={articleData} /> : null}
                </div>
                {props?.topPriorityData?.pageAds?.BTF_728 && (
                  <div className="ad-container" style={{display:'flex',justifyContent:'center'}}>
                    <div className="addinner-box">
                      <NewSiteAd
                        width={728}
                        height={90}
                        slotId="mobileAdNew300x250_3"
                        adUnit={props?.topPriorityData?.pageAds?.BTF_728}
                        sizes={[
                          [728, 90],
                          [1, 1],
                        ]}
                        removeAdSpan={true}
                      ></NewSiteAd>
                    </div>
                  </div>
                )}
                <Taboola
                mode={TaboolaList.articlePage.bottom.mode}
                id={TaboolaList.articlePage.bottom.id}
                container={TaboolaList.articlePage.bottom.container}
                placement={TaboolaList.articlePage.bottom.placement}
              />
              </div>
              <div className="rightwrap">
                <RhsCommon
                  pageAds={props?.topPriorityData?.pageAds}
                  articleData={articleData || []}
                  photoStories={props?.topPriorityData?.photoStories}
                  topStories={props?.topPriorityData?.topStories}
                  astroStories={props?.topPriorityData?.astroStories}
                  relatedStories={stories || []}
                  stories={stories}
                  isNewLiveBlog={true}
                  liveBlogList={liveBlogList}
                  utm_medium={"liveblog_page"}
                  isLiveBlogPositionOnLiveBlog={true}
                />
              </div>
            </div>
          </div>
          <style jsx global>
            {NewLiveBlogStyle}
          </style>
          <style jsx global>
            {`
              .topDate {
                color: #959595;
                font-size: 14px;
                line-height: 22px;
                font-family: "Fira Sans";
                padding-bottom: 5px;
                display: block;
                border-bottom: ${!pageNumber ? "4px #0A2040 solid" : ""};
                display: flex;
              }
              .hsocialsprite-lv {
                background: url(/images/siteimages/news18-hn-sprite-icons.svg)
                  no-repeat;
                vertical-align: top;
              }
              .nhtwicon-lv {
                background-position: -139px -4px;
                width: 20px;
              }
            `}
          </style>
        </div>
      </div>
    </>
  );
};

export default NewLiveBlog;
