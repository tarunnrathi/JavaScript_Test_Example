import {
  logGA4VirtualPageView,
  pageEvents,
  sectionExtractor,
} from "includes/article.util";
import getConfig from "next/config";
import Head from "next/head";
import React, { useEffect, useRef, useState, useCallback ,useContext} from "react";
import { useInView, InView } from "react-intersection-observer";
import parser from "html-react-parser";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import { photoGallerydateConversion } from "../../../helper/global";
import { getArticleById } from "api/individual/Article";
import LazyLoadImage from "components/Common/CustomImage";
import { getCompleteURL } from "util/global/Helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import HindiGlobalContext from "HindiGlobalContext";

const MemoNewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
const MemoScoreRHS = dynamic(() => import("components/Cricketnext/Cards/ScoreRHS"));
const MemoRhsCommon = dynamic(() => import("widgets/Common/Desktop/RhsCommon"));
const MemoTaboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
const MemoByline = dynamic(() => import("components/Common/ByLine"));
const MemoBylineAuthor = dynamic(() => import("components/Common/BylineAuthor"));
const MemoSocialShare = dynamic(() => import("../Common/SocialShareDesktop"));
const TopToolBar = dynamic(() => import("./common/TopToolBar"));
let addInsertinoIndex = 0;

const getGalleryAd = (storyId, adInd) => {
  return (
    <div className="newadd forphotopage">
      <MemoNewSiteAd
        slotId={`Desktop_Static_Ad_Btf_728x90_${storyId}_${adInd}`}
        adUnit="NW18_HIND_Desktop/NW18_HIND_PHOTO/NW18_HIND_PHOTO_HP_AS/NW18_HIND_PHT_HP_AS_ROS_BTF_728"
        sizes={[[728, 90]]}
        width={728}
        height={90}
        removeAdSpan={true}
        lazyload={true}
      />
    </div>
  );
};

let myTimerId;

const Photogallery = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { isAjax = false } = props;
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [tempScrollY, setScrollY] = useState(0);
  const {handleNotificatonOnScroll } = useContext(HindiGlobalContext);
  const {
    category,
    pageNumber,
    photoTs,
    isCricketNext,
    relatedArticle = [],
    finalURL = "",
  } = props.topPriorityData || {};
  const callFired = useRef(false);
  const articleData = props?.secondArticleData ? props?.secondArticleData : props.topPriorityData?.articleData
  const {
    headline,
    intro,
    updated_at,
    created_at,
    agency,
    agency_full: agencyFull,
    author_byline: authorByline = {},
    byline,
    fms_autopublished,
    section,
    weburl = "",
    gallery,
    story_id: storyId,
    ff_source = "",
    ff_author_name,
    written_by = [],
    translated_by = [],
    reported_by = [],
    edited_by = [],
    author,
    publish_by = [],
    breadcrumb,
    disclaimer,
  } = articleData;
  const { ref, inView, entry } = useInView({
    threshold: 0.3,
  });

  // current url
  const outBrainUrl = weburl.replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );

  // const [currentArticle, setCurrentArticle] = useState([]);
  // const setCurrentArticleId = (id) => {
  //   currentArticle != id && setCurrentArticle(id);
  // };

  useEffect(() => {
    props.setCurrentArticle(storyId);
  }, [inView]);

  // set current gallery number
  const [currentPage, setCurrentPage] = useState(pageNumber);

  let adInd = 0;

  const pageRefs =
    gallery &&
    gallery.length &&
    gallery.reduce((acc, value, ind) => {
      acc[ind + 1] = useRef();
      return acc;
    }, {});
  const [selectedPhotos, setSelectedPhoto] = useState(gallery[0]);
  const [selectArticle, setSelectArticle] = useState(false);
  const [secondArticleData, setSecondArticleData] = useState(props.isRelatedArticle ? props?.secondArticleData : {});

  const onScroll = useCallback(() => {
    const box = document.querySelector("#pg_start");
    const rect = box?.getBoundingClientRect() || {};
    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    const totalHeight =
      document.querySelector("#pg_content")?.clientHeight - 205;
    if (!isInViewport) {
      const totalScroll = document.documentElement.scrollTop - 215;
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
            if( document.getElementsByClassName("prog_bar")[0].style.width =
            percentage >= 0){
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
  },[]);

  useEffect(() => {
    if (pageRefs && pageNumber) {
      if (pageRefs[pageNumber]) {
        pageRefs[pageNumber]?.current?.scrollIntoView({
          behavior: "smooth",
        });
        return;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [tempScrollY]);
  const publishedBy = publish_by.length ? publish_by[0]?.english_name : "";
  const publishedByWithId = publishedBy + "_" + publish_by[0]?.ID;
  const taboolaVariable = true;

  const getRelatedArticledata = async () => {
    let relatedArticleId = props?.topPriorityData?.relatedArticle?.[0]?.story_id
    let data = await getArticleById(relatedArticleId, true);
    if (data) {
      setSecondArticleData(data)
      setSelectArticle(true)
    }
  };
  const updateCurrentPage = (galleryNo, btnClick, word_count) => {
    const nw_post_word_count = word_count || 0;
    if (btnClick) {
      if (pageRefs && galleryNo) {
        if (pageRefs[galleryNo]) {
          pageRefs[galleryNo]?.current?.scrollIntoView({
            behavior: "smooth",
          });
          return;
        }
      }
    }
    let allSlashSplitted = articleData.weburl?.split("/");
    let cd14Value = "";
    if (allSlashSplitted?.[3] === "news") {
      cd14Value = allSlashSplitted?.[4];
    } else if (allSlashSplitted?.[3] === "photogallery") {
      cd14Value = allSlashSplitted?.[4];
    } else if (allSlashSplitted?.[3] === "videos") {
      cd14Value = allSlashSplitted?.[4];
    } else if (allSlashSplitted?.length === 4 && !allSlashSplitted[1]) {
      cd14Value = "Home";
    } else {
      cd14Value = "";
    }

    setCurrentPage(galleryNo);
    pageEvents({
      agency,
      inView,
      entry,
      isAjax,
      authorByline,
      byline,
      fms_autopublished,
      section,
      callFired,
      url: outBrainUrl,
      headline: galleryNo ? `Page-${galleryNo} - ${headline}` : headline,
      storyId,
      currentPage: galleryNo,
      ff_source,
      ff_author_name,
      publishedBy,
      articleData,
      publishByFull: publish_by,
      category,
      allSections: sectionExtractor(articleData),
      publishedByWithId,
      taboolaVariable,
      nw_post_word_count,
      created_at,
      cd14Value: cd14Value,
      cd18Value: "photogallery",
      cd19value: "No Video Player",
      cd20value: "No Video",
    });
    if (galleryNo > 1) {
      logGA4VirtualPageView(
        outBrainUrl.replace(
          ".html",
          `-page-${galleryNo}.html`,
          galleryNo ? `Page-${galleryNo} - ${headline}` : headline
        )
      );
    }
  };
  return (
    <>
      <Head>
        <meta name="robots" content="max-image-preview:large" />
      </Head>
      <TopToolBar
        headline={headline}
        url={outBrainUrl || finalURL}
        articleId={storyId}
        pageType="photogallery"
      />
      <div className="newadd newtopadd newcontainer clearfix"></div>
      <div className={props?.isRelatedArticle ? "newphtcnsmpnwrap2" : "newphtcnsmpnwrap"}>
        <div className="newphtnsmpn-container">
          <section className="newphtcnsmpn-middle">
            {/* photo consumption left start */}
            <main className="newphtcnsmpn-left">
              <BreadcrumbCommon breadCrumbArray={props?.data?.breadCrumbArray} />
              <article id="pg_content">
                <div id="pg_start"></div>
                <h1 className="newphttophd">{headline}</h1>
                <h2 className="newphttoppara">{intro}</h2>
                <ul className="newphtbyline">
                  <li>
                    <MemoByline agency={agency} agencyFull={agencyFull} li={true} />
                    <time dateTime={updated_at !== "" ? updated_at : created_at}>
                      Last Updated :
                      {updated_at && updated_at !== ""
                        ? photoGallerydateConversion(updated_at)
                        : photoGallerydateConversion(created_at)}
                    </time>
                  </li>
                  <MemoBylineAuthor
                    authors={[
                      { "Reported by": reported_by },
                      { "Edited by": edited_by },
                      { "Written by": written_by },
                      { "Translated by": translated_by },
                    ]}
                    author={author}
                    isMobile={false}
                    authorByline={authorByline}
                    isPhoto={true}
                    isNewAuthorByLine={true}
                  />
                </ul>
                {/*  photo box start */}
                {gallery?.length &&
                  gallery.map((item, ind) => {
                    const galleryNo = ind + 1,
                      showAd = galleryNo !== 1 && !(galleryNo % 3);
                    showAd && adInd++;
                    const caption = parser(item.caption)
                      ?.toString()
                      .replace(/,?\[object Object\],?/gim, "");
                    return (
                      <React.Fragment key={galleryNo}>
                        {(showAd && ind === 0) ? getGalleryAd(storyId, adInd) : null}
                        <div className="newphtbox">
                          <MemoSocialShare url={outBrainUrl} headline={headline} />
                          <div
                            className="newphtfullviewbtn"
                            onClick={() => {
                              setIsFullScreenMode(true);
                              setSelectedPhoto({ ...item, galleryNo });
                              let gNo = galleryNo - 1;
                              setIsPlay(true);
                              let newimg = [...gallery];
                              newimg?.forEach((item, index) => {
                                if (index === 2) {
                                  addInsertinoIndex = index;
                                  newimg.splice(addInsertinoIndex + 1, 0, { isTheaterModAdd: true, index: 100 + index, storyId: storyId });
                                }
                              });
                              newimg?.forEach((item, index) => {
                                if (addInsertinoIndex + 5 === index) {
                                  addInsertinoIndex = index;
                                  newimg.splice(addInsertinoIndex + 1, 0, { isTheaterModAdd: true, index: 200 + index, storyId: storyId });
                                }
                              });
                              newimg?.forEach((item, index) => {
                                if (addInsertinoIndex + 5 === index) {
                                  addInsertinoIndex = index;
                                  newimg.splice(addInsertinoIndex + 1, 0, { isTheaterModAdd: true, index: 300 + index, storyId: storyId });
                                }
                              });
                              setNewArray(newimg);
                              myTimerId = setInterval(() => {
                                if (gNo + 1 <= newimg.length) {
                                  setSelectedPhoto({
                                    ...newimg[gNo],
                                    galleryNo: gNo + 1,
                                  });
                                } else {
                                  gNo = 0;
                                  setSelectedPhoto({
                                    ...newimg[gNo],
                                    galleryNo: gNo + 1,
                                  });
                                }
                                gNo += 1;
                              }, 5000);
                            }}
                          ></div>
                          <InView
                            as="div"
                            className="newphtbox-in"
                            threshold={0.2}
                            onChange={(inView) =>
                              inView &&
                              (currentPage !== galleryNo ||
                                (isAjax && ind === 0)) &&
                              updateCurrentPage(
                                galleryNo,
                                false,
                                item?.word_count
                              )
                            }
                          >
                            <div
                              className="newphtcount"
                              galleryid={storyId}
                              ref={pageRefs[galleryNo]}
                            >
                              <span>
                                {galleryNo < 10 ? `0${galleryNo}` : galleryNo}
                              </span>
                            </div>
                            <figure>
                              {/* <img
                                src={imageLoader(
                                  item.img,
                                  700,
                                  null,
                                  false,
                                  true
                                )}
                              /> */}
                              {/* <LazyLoadImage
                                width={700}
                                height={700}
                                src={item?.img}
                                alt={item?.attribution||''}
                                title={item?.attribution||''}                                
                              /> */}
                              <img
                                src={item?.img + "?im=Resize,width=700,aspect=fit,type=normal"}
                                alt={item?.attribution || ''}
                              />
                            </figure>
                            <p>{caption}</p>
                          </InView>
                          <div
                            className={
                              gallery?.length === galleryNo
                                ? "newphtbtn newphtbtnlast"
                                : "newphtbtn"
                            }
                          >
                            {galleryNo !== 1 && (
                              <div
                                onClick={() =>
                                  updateCurrentPage(
                                    galleryNo - 1,
                                    true,
                                    item?.word_count
                                  )
                                }
                              ></div>
                            )}
                            {gallery?.length !== galleryNo && (
                              <div
                                onClick={() =>
                                  updateCurrentPage(
                                    galleryNo + 1,
                                    true,
                                    item?.word_count
                                  )
                                }
                              ></div>
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                }
              </article>
              {!props.isRelatedArticle && <div>
                <div className="slid_cont">
                  <div className="slider-wrapper axis-horizontal">
                    <p>अगली गैलरी</p>
                    <ul className="slider animated">
                      <li className="slide">
                        <a href={getCompleteURL(relatedArticle?.[0]?.weburl_r, relatedArticle?.[0]?.weburl)}>
                          <div className="news_carousel">
                            <div className="nextarticle_img">
                              <figure>
                                <LazyLoadImage
                                  src={relatedArticle?.[0]?.images?.url}
                                  width={110}
                                  height={80}
                                  alt={
                                    relatedArticle?.[0]?.["display_headline"] ||
                                    relatedArticle?.[0]?.["headline"]
                                  }
                                  title={
                                    relatedArticle?.[0]?.["display_headline"] ||
                                    relatedArticle?.[0]?.["headline"]
                                  }
                                />
                              </figure>
                            </div>
                            <div className="nextarticle_title">
                              <div className="nextarticle_tag"></div>
                              <div className="nextarticle_title1">{relatedArticle?.[0]?.display_headline}</div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {!selectArticle && <div className="next_gallery" onClick={() => getRelatedArticledata()}><span>अगली गैलरी</span></div>}</div>
                <div className="disclaimerText">
                  {disclaimer}
                </div>
                {selectArticle && <Photogallery topPriorityData={props.topPriorityData} isRelatedArticle={true} secondArticleData={secondArticleData} setCurrentArticle={props.setCurrentArticle} />}
              </div>}
              {!props.isRelatedArticle &&
                <MemoTaboola
                  mode={TaboolaList.photoPage.bottom.mode}
                  id={TaboolaList.photoPage.bottom.id}
                  container={TaboolaList.photoPage.bottom.container}
                  placement={TaboolaList.photoPage.bottom.placement}
                />}
            </main>
            {/* article wrapper end  */}

            {/* Sirde bar start here */}

            {!props.isRelatedArticle && <>{isCricketNext ? (
              <MemoScoreRHS isNews={true} pageAds={props.pageAds} />
            ) : (
              <MemoRhsCommon
                section="photogallery"
                pageAds={props.pageAds}
                currentURL={outBrainUrl}
                topStories={photoTs}
                photoStories={props?.data?.photoStories}
                page="photogallery"
                taboolaList={TaboolaList.photoPage}
              />
            )}</>}
          </section>
        </div>
        <div
          className={`phtfullviewmodelwrap ${isFullScreenMode ? "adcls" : ""}`}
        >
          <div
            className="phtcloswglr"
            onClick={() => {
              {
                setIsFullScreenMode(false);
                clearInterval(myTimerId);
              }
            }}
          ></div>
          <div className="phtfullviewmodel-slide glide--ltr glide--slider glide--swipeable">
            <div data-glide-el="track">
              <ul
                style={{
                  transition:
                    "transform 1000ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s",
                  width: "3723px",
                  transform: "translate3d(0px, 0px, 0px)",
                }}
              >
                <li
                  className="glide__slide--active"
                  style={{ width: "1241px", marginRight: "0px" }}
                >
                  <div className="phtfullviewmodel">
                    {selectedPhotos?.isTheaterModAdd ? (
                      // getTheaterModAd(selectedPhotos?.storyId, selectedPhotos?.isTheaterModAddId)
                      <div className="newadd forNewAdpage">
                        <MemoNewSiteAd
                          slotId={`Desktop_Static_Ad_ATF_728x400_${selectedPhotos?.storyId}`}
                          adUnit={`NW18_HIND_Desktop/NW18_HIND_PHOTO/NW18_HIND_PHOTO_AS/NW18_HIND_PHT_AS_ROS_ATF_728x400`}
                          sizes={[[728, 400]]}
                          width={728}
                          height={400}
                          lazyLoad={false}
                        />
                      </div>
                    ) : (
                      <>
                        <figure>
                          {/* <LazyLoadImage
                        width={700}
                        height={700}
                        src={item?.img}
                        alt={item?.attribution||''}
                        title={item?.attribution||''}                                
                      />                     */}
                          <img
                            src={selectedPhotos?.img + "?im=Resize,width=700,aspect=fit,type=normal"}
                            alt={selectedPhotos?.attribution || ''}
                          />
                        </figure>
                        <div className="phtfullviewmodel-right">
                          <div className="phtfullviewmodel-count">
                            <div className="phtcntnmbr">
                              <span>
                                {selectedPhotos?.galleryNo < 10
                                  ? `0${selectedPhotos?.galleryNo}`
                                  : selectedPhotos?.galleryNo}
                              </span>
                              <span>{`${newArray.length < 10
                                  ? `0${newArray.length}`
                                  : newArray.length
                                }`}</span>
                            </div>
                            <div
                              className={
                                isPlay ? "phtplaytn" : "phtplaytn pausebtn"
                              }
                              onClick={() => {
                                if (!isPlay) {
                                  let galleryNo = selectedPhotos?.galleryNo || 0;
                                  setIsPlay(true);
                                  myTimerId = setInterval(() => {
                                    if (galleryNo + 1 <= gallery.length) {
                                      setSelectedPhoto({
                                        ...gallery[galleryNo],
                                        galleryNo: galleryNo + 1,
                                      });
                                    } else {
                                      galleryNo = 0;
                                      setSelectedPhoto({
                                        ...gallery[galleryNo],
                                        galleryNo: galleryNo + 1,
                                      });
                                    }
                                    galleryNo += 1;
                                  }, 5000);
                                } else {
                                  if (myTimerId) {
                                    clearInterval(myTimerId);
                                  }
                                  setIsPlay(false);
                                }
                              }}
                            ></div>
                          </div>
                          <h2>{headline}</h2>
                          <p>
                            {parser(selectedPhotos?.caption || "")
                              ?.toString()
                              .replace(/,?\[object Object\],?/gim, "")}
                          </p>
                          <MemoSocialShare url={outBrainUrl} headline={headline} />
                          <a href="/photogallery/" className="phtmoreglr">
                            <div>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            <h3>
                              MORE
                              <br />
                              GALLERIES
                            </h3>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            {!selectedPhotos?.isTheaterModAdd && <div data-glide-el="controls" className="phtfullviewmodelarrow">
              <button
                onClick={() => {
                  if (selectedPhotos.galleryNo - 2 >= 0) {
                    setSelectedPhoto({
                      ...gallery[selectedPhotos.galleryNo - 2],
                      galleryNo: selectedPhotos.galleryNo - 1,
                    });
                  } else {
                    setSelectedPhoto({
                      ...gallery[gallery.length - 1],
                      galleryNo: gallery.length,
                    });
                  }
                }}
                data-glide-dir="<"
              ></button>
              <button
                onClick={() => {
                  if (selectedPhotos.galleryNo < gallery.length) {
                    setSelectedPhoto({
                      ...gallery[selectedPhotos.galleryNo],
                      galleryNo: selectedPhotos.galleryNo + 1,
                    });
                  } else {
                    setSelectedPhoto({
                      ...gallery[0],
                      galleryNo: 1,
                    });
                  }
                }}
                data-glide-dir=">"
              ></button>
            </div>
            }
          </div>
        </div>
      </div>
      <style global jsx>{`
        .disclaimerText { padding: 10px; color:#fff; font-weight: bold; font-style: italic; }
        .TABOOLA {
          background: white;
        }
        figure:hover img {
          transform: scale(1.2);
          transition: all 0.3s ease-in-out;
        }
        .phtfullviewmodel figure:hover img{
          transform: unset;
          // transition: all 0.3s ease-in-out;
        }
        .phtfullviewmodelarrow {
          position: absolute;
          bottom: 0;
          right: 310px;
        }
        .phtfullviewmodelarrow button:last-child {
          transform: rotate(180deg);
          top: 2px;
          left: 30px;
        }
        .phtfullviewmodelarrow button {
          position: relative;
          background: none;
          border: none;
          height: 20px;
          width: 32px;
        }
        button {
          cursor: pointer;
          font-size: 0;
          border: 0;
          outline: none;
        }
        .phtfullviewmodel-right p {
          color: #ffff;
          font-size: 16px;
          line-height: 24px;
        }
        .phtfullviewmodelarrow button:before {
          width: 24px;
          height: 2px;
          background: #fff;
        }
        .phtfullviewmodelarrow button:after {
          width: 12px;
          height: 12px;
          border-left: 2px solid #fff;
          border-bottom: 2px solid #fff;
          transform: rotate(45deg);
          top: 4px;
        }
        .phtfullviewmodelarrow button:before,
        .phtfullviewmodelarrow button:after {
          content: "";
          position: absolute;
          left: 0;
        }
        .phtmoreglr h3 {
          color: #d6d6d6;
          font-size: 14px;
          line-height: 16px;
          font-weight: normal;
          text-align: right;
          width: 100%;
        }
        .phtmoreglr > div span {
          width: 9px;
          height: 9px;
          border: 1px solid #ffffff;
          border-radius: 2px;
          display: block;
        }
        .phtmoreglr > div {
          display: flex;
          gap: 3px;
          flex-wrap: wrap;
          width: 22px;
          justify-content: space-between;
        }
        .phtmoreglr {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: end;
          gap: 6px;
        }
        .phtfullviewmodel-slide {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .phtcloswglr:before,
        .phtcloswglr:after {
          content: "";
          width: 3px;
          height: 20px;
          background: #fff;
          position: absolute;
        }
        .phtfullviewmodel {
          height: 90vh;
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          width: 100%;
        }
        .phtfullviewmodel-count .phtplaytn:before {
          content: "";
          border-left: 3px solid #fff;
          border-right: 3px solid #fff;
          display: block;
          width: 4px;
          height: 12px;
        }
        .phtfullviewmodel-count .phtplaytn.pausebtn:before {
          content: "";
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          display: block;
          width: 0;
          height: 0;
          border-bottom: 10px solid #fff;
          transform: rotate(90deg);
          top: 0px;
          position: relative;
          left: 2px;
        }
        .phtfullviewmodel-right .newphtshare {
          position: relative;
          display: flex;
          width: 100%;
          gap: 10px;
          margin-top: 20px;
        }
        .phtfullviewmodel-right h1,
        .phtfullviewmodel-right h2 {
          color: #ffd800;
          font-size: 26px;
          line-height: 32px;
          margin: 20px 0 10px 0;
        }
        figure {
          position: relative;
          line-height: 0;
          flex-shrink: 0;
          overflow: hidden;
        }
        .phtcloswglr:before {
          transform: rotate(-45deg);
        }
        .phtcloswglr:after {
          transform: rotate(45deg);
        }
        .phtfullviewmodel figure img {
          height: 100%;
          border-radius: 0;
        }
        .phtfullviewmodel figure {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(100% - 420px);
          height: 100%;
          background: #2e2e2e;
          box-shadow: 0px 3px 6px #00000029;
        }
        .phtfullviewmodel-right {
          width: 380px;
          position: relative;
        }
        .phtfullviewmodel-count .phtcntnmbr {
          width: 30px;
          flex-shrink: 0;
        }
        .phtfullviewmodel-count .phtcntnmbr span:last-child {
          color: #b7b7b7;
          border: none;
        }
        .phtfullviewmodel-count .phtplaytn {
          width: 34px;
          height: 34px;
          border: 3px solid #fff;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .phtfullviewmodel-count .phtcntnmbr span {
          width: 30px;
          height: 26px;
          line-height: 26px;
          border-bottom: 1px solid #505050;
          background: #2e2e2e;
          display: block;
          color: #fff;
          font-size: 15px;
          text-align: center;
        }
        .phtfullviewmodel-count {
          border-bottom: 1px dotted #939393;
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 20px;
        }
        figure img {
          border-radius: 4px;
          transform: scale(1);
          transition: all 0.3s ease-in-out;
        }
        .phtfullviewmodel-slide ul {
          display: flex;
          width: 100% !important;
        }
        .phtfullviewmodel-slide ul li {
          flex-shrink: 0;
          width: 100% !important;
        }
        .phtcloswglr {
          position: absolute;
          top: 15px;
          right: 5px;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
        .phtfullviewmodelwrap.adcls {
          visibility: visible;
          opacity: 1;
        }
        .phtfullviewmodelwrap {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;
          padding: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #212121;
          overflow: hidden;
          visibility: hidden;
          opacity: 0;
        }
        .newphtcnsmpnwrap {
          background: #1d1d1d;
        }
        .newphtcnsmpnwrap2 {
          background: #1d1d1d;
          width: 1244px;
          height: 100%;
        }
        .newphtnsmpn-container {
          background: #212121;
          padding: 10px 20px;
          max-width: 1284px;
          margin: auto;
        }
        .newphtcnsmpn-middle {
          display: flex;
          justify-content: space-between;
        }
        .newphtnsmpn-container * {
          box-sizing: border-box;
        }
        .newphtcnsmpn-left {
          width: calc(100% - 320px);
          padding: 0 40px;
        }
        .newphtcnsmpn-brdcrmb {
          width: 100%;
          border-bottom: 1px dotted #5a5a5a;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-weight: normal;
          margin-bottom: 10px;
          font-size: 13px;
          color: #949494;
          padding-bottom: 5px;
          overflow: hidden;
        }
        .newphtcnsmpn-brdcrmb * {
          flex-shrink: 0;
        }
        .newphtcnsmpn-brdcrmb a:first-child {
          margin-left: 0px;
        }
        .newphtcnsmpn-brdcrmb a {
          margin: 0px 6px;
          font-size: 13px;
          color: #949494;
          line-height: 24px;
        }
        .newphtcnsmpn-brdcrmb span,
        .newphtcnsmpn-brdcrmb span {
          color: #fff;
          font-size: 13px;
          margin-left: 6px;
          line-height: 24px;
          font-weight: normal;
        }
        .newphttophd {
          color: #ffd800;
          font-size: 36px;
          line-height: 44px;
          margin: 15px 0 10px 0;
        }
        .newphttoppara {
          color: #fff;
          font-size: 17px;
          line-height: 28px;
          margin-bottom: 15px;
          font-weight: normal;
        }
        .newphtbyline {
          border-bottom: 1px dotted #939393;
          padding-bottom: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: flex-end;
          height: 57px;
        }
        .newphtbyline li:first-child {
          border-left: 0px solid #909090;
          padding: 0 10px 0 0;
        }
        .newphtbyline li {
          border-left: 1px solid #909090;
          padding: 0 10px;
          font-size: 14px;
          color: #909090;
          line-height: 20px;
        }
        .newphtbyline li a {
          font-size: 14px;
          color: #909090;
          display: flex;
          align-item: center;
        }
        .newphtbyline li:last-child a {
          display: flex;
          align-items: center;
        }
        .newphtbyline li a b {
          color: #fff;
        }
        .newphtbyline li a img {
          width: 30px;
          height: 30px;
          margin-right: 8px;
        }
        .newphtbyline li a figcaption {
          display: flex;
          align-items: center;
        }
        .newphtbyline li time {
          margin-left: -10px;
        }
        .newphtbox {
          position: relative;
          margin-bottom: 20px;
        }
        .newphtbox:last-child {
          transform: rotate(0deg);
        }
        .newphtshare {
          position: absolute;
          width: 30px px;
          top: 0px;
          left: 0;
        }
        .newphtshare a {
          width: 30px;
          height: 30px;
          background: #1d1d1d;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #797979;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .newphtbox-in {
          position: relative;
          background: #2e2e2e;
          box-shadow: 0px 3px 6px #00000029;
          width: 700px;
          height: 700px;
          overflow: hidden;
          margin: auto;
        }
        .newphtcount {
          background: transparent
            linear-gradient(180deg, #000000 0%, #00000000 100%) 0% 0% no-repeat
            padding-box;
          line-height: 50px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          z-index: 1;
        }
        .newphtcount span {
          width: 30px;
          height: 30px;
          background: #ef6367;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #cecece;
          border-radius: 15px;
          letter-spacing: -0.3px;
          color: #ffffff;
          font-size: 15px;
          line-height: 30px;
          text-align: center;
          font-weight: bold;
        }
        .newphtbox-in figure {
          width: 700px;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0;
        }
        .newphtbox-in figure img {
          max-width: 100%;
          transform: scale(1) !important;
          border-radius: 0;
        }
        .newphtbox-in p {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px;
          font-size: 15px;
          line-height: 26px;
          color: #fff;
          text-align: center;
          background: rgba(0, 0, 0, 0.8);
        }
        .newiconsprite.newfb {
          width: 7px;
          height: 15px;
          background-position: -70px -422px;
        }
        .newphtshare a span {
          filter: brightness(0) invert(1);
        }
        .newphtshare a.forfb:hover {
          background: #4c69b1;
          border-color: #4c69b1;
        }
        .newphtshare a.fortwtr:hover {
          background: #38b2e1;
          border-color: #38b2e1;
        }
        .newiconsprite.newtwtr {
          width: 14px;
          height: 12px;
          background-position: -79px -425px;
        }
        .newphtshare a.forwtap:hover {
          background: #2ca63b;
          border-color: #2ca63b;
        }
        .newiconsprite.newwtap {
          width: 14px;
          height: 15px;
          background-position: -197px -422px;
        }
        .newiconsprite {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg) no-repeat;
        }
        .newphtfullviewbtn {
          width: 30px;
          height: 30px;
          background: #000
            url(/images/siteimages/phtfullviewicon_1669352903.svg)
            50% 50% no-repeat;
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
        }
        .newphtbtn div {
          width: 30px;
          height: 30px;
          background: #000;
          margin-bottom: 2px;
          position: relative;
          display: block;
        }
        .newphtbtn div:last-child {
          transform: rotate(-180deg);
        }
        .newphtbtn div:before {
          content: "";
          width: 6px;
          height: 6px;
          border-left: 2px solid #fff;
          border-top: 2px solid #fff;
          position: absolute;
          transform: rotate(45deg);
          top: 50%;
          left: 50%;
          margin: -3px;
        }
        .newphtbtn {
          position: absolute;
          width: 30px;
          bottom: 0px;
          right: 0;
        }
        .newphtbtnlast {
          transform: rotate(180deg);
        }
        .newadd.forphotopage {
          margin-bottom: 20px;
        }
        .newadd.forAdpage {
          width:100%;
          height:100vh;
        }        
        .= {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: auto;
        }
        .newphtnxtglr {
          background: #000;
          height: 50px;
          display: flex;
          border-bottom: 1px solid #3e3e3e;
        }
        .newphtnxtglr a {
          position: relative;
          color: #ef6367;
          font-size: 20px;
          line-height: 22px;
          display: table;
          margin: auto;
          font-weight: bold;
        }
        .newphtnxtglr a span {
          border-bottom: 2px solid #ef6367;
          display: inline-block;
        }
        .newphtnxtglr a:before,
        .newphtnxtglr a:after {
          content: "";
          background: url(/images/revampimages/nextgalleryicon.png) 0 0
            no-repeat;
          width: 10px;
          height: 12px;
          display: inline-block;
          margin: 0 20px;
        }
        .newadd.forphotopage {
          margin-bottom: 20px;
        }
        .newadd.newtopadd {
          // padding-bottom: 10px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-wrap: wrap;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -moz-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
        .newadd {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: auto;
        }
        .newcontainer {
          max-width: 1244px;
          margin: auto;
        }
        .slid_cont{
          max-width: 700px;
            margin: 0 auto;
        }
        .slider-wrapper {
            background-color: #808080;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 0;
            
        }
        .slider-wrapper p {
                font-size: 20px;
            margin-bottom: 0;
            color: #ffffff;
            padding-left: 14px;
            padding-top: 5px;
            font-weight: 600;
            line-height: 34px;
        }
        .slider {
            padding: 0;
            padding-right: 20px!important;
            padding-bottom: 0;
            margin: 0;
            display: flex;
            overflow-y: auto;
        }
        .slide {
            border-radius: 0;
            background-color: transparent!important;
            overflow: hidden;
            margin: 0!important;
            text-align: left!important;
            padding: 5px 10px 10px;
            font-size: 12px;
            color: #fff;
            line-height: 18px;
            font-family: Mukta,sans-serif;
        }
        .slide a {
            font-size: 14px;
            color: #fff;
            font-family: Mukta,sans-serif;
            line-height: 20px;
            text-decoration: none;
        }
        .news_carousel {
            display: flex;
        }
        .slide .nextarticle_img {
            text-align: left;
          position: relative;
        }
        .slide .nextarticle_title {
            line-height: 20px;
            font-family: Mukta,sans-serif;
            padding-left: 10px;
        }
        .slide .nextarticle_img figure {
            width: 110px;
            border-radius: 0;
            height: 73px;
        }
        .slide .nextarticle_img img {
          width: 100%;
        }
        .nextarticle_tag {
            font-size: 12px;
            color: #f74e21;
            font-weight: 500;
        }
        .nextarticle_title1 {
            font-size: 18px;
            color: #ffffff;
            line-height: 26px;
          display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .next_gallery {
            position: relative;
            margin: 16px auto;
        }
        .next_gallery span{
          background-color: #e1261d;
            font-size: 15px;
            padding: 12px;
            border-radius: 4px;
            color: #fff;
            font-weight: 700;
        }
        .cam_ic{display:none;}
        @media (max-width:768px){
          .slide .nextarticle_img img {
            width: 140px;
            border-radius: 0;
            height: 93px;
          }
          .slide .nextarticle_img img.cam_ic{
            width: 32px;
            height: 32px;
            margin: 0 auto;
            display: block;
            position: absolute;
            top: 25%;
            left: 0;
            right: 0;
            bottom: 0;
            display:block;
          }
        }
        .newglblhdwrap {
          border-bottom: 1px solid#d9d9d9;
          position: relative;
          margin-bottom: 10px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -moz-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-box-align: baseline;
          -webkit-align-items: baseline;
          -moz-box-align: baseline;
          -ms-flex-align: baseline;
          align-items: baseline
      }

      .newglblhdwrap:before {
          content: "";
          background: #ed1c24;
          width: 25px;
          height: 4px;
          position: absolute;
          left: 0;
          bottom: 0
      }
      .moretrndstroy {
        color: #ed1c24 !important;
      }
      .newglblhdwrap .newglblhd,.newglblhdwrap .newglblhd a {
          font-size: 20px;
          line-height: 38px;
          color: #ed1c24;
          font-weight: bold;
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: end;
          -webkit-align-items: end;
          -moz-box-align: end;
          -ms-flex-align: end;
          align-items: end
      }

      .newglblhdwrap .newglblhd span,.newglblhdwrap .newglblhd a span {
          color: #ed1c24;
          margin-right: 5px
      }

      .newglblhdwrap .newglblhd em,.newglblhdwrap .newglblhd a em {
          color: #868686;
          font-weight: normal;
          text-transform: uppercase;
          font-style: normal;
          font-size: 12px;
          position: relative;
          top: 2px;
          margin-left: 10px
      }

      .newglblhdwrap.newsml .newglblhd,.newglblhdwrap.newsml .newglblhd a {
          font-size: 18px;
          line-height: 34px
      }
      `}</style>
    </>
  );
};

export default React.memo(Photogallery);
