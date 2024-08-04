import getConfig from "next/config";
import {
  pageEvents,
  imageLoader,
  sectionExtractor,
  logGA4VirtualPageView,
} from "includes/article.util";
import parser from "html-react-parser";
import React, { useEffect, useRef, useState, memo, useCallback,useContext } from "react";
import { useInView, InView } from "react-intersection-observer";
import Head from "next/head";
import Glide from "@glidejs/glide";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import { photoGallerydateConversion } from "../../../helper/global";
import { getArticleById } from "api/individual/Article";
import LazyLoadImage from "components/Common/CustomImage";
import { getCompleteURL } from "util/global/Helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { logEvent } from "includes/googleAnalytic";
import { additionalText } from "includes/_app.util";
import HindiGlobalContext from "HindiGlobalContext";

const MemoNewSiteAd = dynamic(() => import("widgets/Common/Responsive/NewSiteAd"));
const MemoByline = dynamic(() => import("components/Common/ByLine"));
const MemoCrTopScoreWidget = dynamic(() => import("widgets/Common/Responsive/CrTopScoreWidget"));
const MemoBylineAuthor = dynamic(() => import("components/Common/BylineAuthor"));
const MemoRhsTopStoryPhotoGallery = dynamic(() => import("widgets/Common/Responsive/RhsTopStoryPhotoGallery"));
const MemoTeamRanking = dynamic(() => import("widgets/Common/Responsive/TeamRanking"));
const MemoCricketTweet = dynamic(() => import("widgets/Common/Responsive/CricketTweet"));
const MemoTaboola = dynamic(() => import("widgets/Common/Responsive/Taboola"));
const TopToolBarMobile = dynamic(() => import("./common/TopToolBarMobile"));
let addInsertinoIndex = 0;
// const SocialShare = memo(({ className, url, headline }) => (
//   <>
//     <div className={className ? className : "newphtshare"}>
//       <a
//         href={"https://www.facebook.com/sharer.php?u=" + url + "&t=" + headline}
//         target="_blank"
//       >
//         <span className="newiconsprite newfb"></span>
//       </a>
//       <a
//         href={"https://twitter.com/share?text=" + headline + "&url=" + url}
//         target="_blank"
//       >
//         <span className="newiconsprite newtwtr"></span>
//       </a>
//       <a
//         href={"whatsapp://send?text=" + headline + "-" + url}
//         target="_blank"
//         data-action="share/whatsapp/share"
//       >
//         <span className="newiconsprite newwtap"></span>
//       </a>
//     </div>
//   </>
// ));
const SocialShare = memo(({ className, url, headline }) => {
  const shareData = {
    title: "",
    text: `${headline}\n${url}\n\n ${additionalText}`,
  };
  const shareWebAPI = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      //resultPara.textContent = `Error: ${err}`;
    }
    logEvent("ss_wapi", "tap", "photogallery_page");
  };
  return (
    <>
      <div className={className ? className : "newphtshare"}>
        <a
          className="arr_redirect"
          href="javascript:void(0)"
          onClick={shareWebAPI}
        >
          <svg
            id=""
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="25"
            viewBox="0 0 32 32"
            color="red"
          >
            <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
          </svg>
        </a>
      </div>
    </>
  );
});
const PhotoViewPopup = ({
  photoList = [],
  url = "",
  headline = "",
  active = 0,
  handleSlideChange = () => { },
  onClose = () => { },
}) => {
  const [readMore, setReadMore] = useState(false);
  const [share, setShare] = useState(false);
  const [isPlay, setIsPlay] = useState(true);
  const [current, setCurrent] = useState(active || 0);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  useEffect(() => {
    const glide = new Glide(`.phtfullviewmodel-slide`, {
      type: "carousel",
      perView: 1,
      gap: 0,
      slidesToScroll: 1,
      startAt: current,
      autoplay: isPlay ? 5000 : false,
    });

    setTimeout(() => {
      glide?.mount();

      glide.on("run.after", function () {
        // Handler logic ...
        setCurrent(glide._i);
        handleSlideChange(glide._i + 1);
      });
    }, 1);

    return () => {
      glide.destroy();
    };
  }, [photoList, isPlay]);
  return (
    <>
      <div className="phtfullviewmodelwrap adcls">
        <div className="phtfullviewmodelhdr">
          <div
            className={isPlay ? "phtplaytn" : "phtplaytn pausebtn"}
            onClick={() => setIsPlay(!isPlay)}
          ></div>
          <a href="/photogallery/" className="phtmoreglr">
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h3>
              MORE<br></br>GALLERIES
            </h3>
          </a>
          <div className="pflhdrrgt">
            <span className="clkwhlshrs" onClick={() => setShare(!share)}>
              <img
                src="https://images.news18.com/ibnkhabar/uploads/assests/images/wholeshareicon.svg"
                alt=""
              />
            </span>
            <span className="phtcloswglr" onClick={onClose}></span>
            {share && (
              <SocialShare
                url={url}
                headline={headline}
                className={"nwphpshr"}
              />
            )}
          </div>
        </div>
        <div className="phtfullviewmodel-slide">
          <div data-glide-el="track">
            <ul>
              {photoList.map((itm, idx) => (
                <li key={idx}>
                  <div className="phtfullviewmodel">
                    {itm?.isTheaterModAdd
                      ? <div className="phtcnsmpnad">
                        <MemoNewSiteAd
                          slotId={`mobileAdNew_ATF_320x480_${itm?.storyId}_${idx}`}
                          adUnit={`NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_PWA_AS/NW18_HIND_PHT_AS_PWA_ROS_ATF_320x480`}
                          sizes={[[320, 480]]}
                          width={320}
                          height={480}
                          lazyLoad={false}
                        />
                      </div>
                      :
                      <figure>
                        <img
                          src={itm?.img + "?im=Resize,width=450,aspect=fit,type=normal"}
                          data-src={imageLoader(
                            itm?.img,
                            450,
                            null,
                            false,
                            true
                          )}
                          alt={itm?.caption || ''}
                          loading={idx === 0 ? "auto" : "lazy"}
                        />
                        {/* <img
                        loading={idx == 0 ? "auto" : "lazy"}
                        src={imageLoader(itm?.img, 450, null, false, true)}
                      /> */}
                        {/* <Image
                          // loading={idx == 0 ? "auto" : "lazy"}
                          src={imageLoader(itm.img, 450, null, false, true)}
                          width={450}
                          height={null}
                        /> */}
                        {itm.caption && (<div
                          className={`phtfullviewmodel-intro ${readMore ? "fullView" : ""
                            }`}
                        >
                          <div className="phtcntnmbr">
                            <span>{idx + 1}</span>
                            <span>{photoList.length}</span>
                          </div>
                          <p>
                            {itm.caption}
                            <span onClick={() => handleReadMore()}>
                              {readMore ? "READ LESS" : "READ MORE"}
                            </span>
                          </p>
                        </div>
                        )}
                      </figure>
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .phtfullviewmodelwrap {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            left: 0;
            background: #2e2e2e;
            z-index: 6;
            visibility: hidden;
            z-index: -1;
            opacity: 0;
          }
          .phtfullviewmodelwrap.adcls {
            visibility: visible;
            opacity: 1;
            z-index: 66;
          }
          .phtfullviewmodelhdr {
            height: 45px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            justify-content: space-between;
            position: fixed;
            top: 7%;
            right: 0;
            left: 0;
            z-index: 1;
          }
          .phtplaytn {
            width: 20px;
            height: 20px;
            border: 2px solid #fff;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .phtplaytn:before {
            content: "";
            border-left: 2px solid #fff;
            border-right: 2px solid #fff;
            display: block;
            width: 2px;
            height: 8px;
          }
          .phtplaytn.pausebtn:before {
            content: "";
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            display: block;
            width: 0;
            height: 0;
            border-bottom: 6px solid #fff;
            transform: rotate(90deg);
            top: 0px;
            position: relative;
            left: 1px;
          }
          .phtmoreglr {
            display: flex;
            align-items: center;
          }
          .phtmoreglr > div {
            display: flex;
            gap: 3px;
            flex-wrap: wrap;
            width: 17px;
            justify-content: space-between;
            margin-right: 3px;
            position: relative;
            top: -1px;
          }
          .phtmoreglr > div span {
            width: 7px;
            height: 7px;
            border: 1px solid #d6d6d6;
            border-radius: 1px;
            display: block;
          }
          .phtmoreglr h3 {
            color: #d6d6d6;
            font-size: 10px;
            line-height: 10px;
            font-weight: normal;
          }
          .pflhdrrgt {
            display: flex;
            align-items: center;
            gap: 30px;
            width: 70px;
            flex-shrink: 0;
            position: relative;
          }
          .nwphpshr {
            width: 30px;
            position: absolute;
            right: 49px;
            top: 32px;
          }
          .nwphpshr a {
            margin-bottom: 10px;
            width: 30px;
            height: 30px;
            background: #1d1d1d;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #797979;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .nwphpshr a span {
            filter: brightness(0) invert(1);
          }
          .pflhdrlft {
            width: 70px;
            flex-shrink: 0;
          }
          .clkwhlshrs {
            height: 18px;
          }
          .phtcloswglr {
            position: relative;
            width: 14px;
            height: 14px;
          }
          .phtcloswglr:before,
          .phtcloswglr:after {
            content: "";
            width: 3px;
            height: 14px;
            background: #fff;
            position: absolute;
            right: -5px;
          }
          .phtcloswglr:before {
            transform: rotate(-45deg);
          }
          .phtcloswglr:after {
            transform: rotate(45deg);
          }
          .phtfullviewmodel-slide {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
          .phtfullviewmodel-slide > div {
            height: 100%;
          }
          .phtfullviewmodel-slide ul {
            display: flex;
            width: 100%;
            height: 100%;
          }
          .phtfullviewmodel-slide ul li {
            flex-shrink: 0;
            height: 100%;
          }
          .phtfullviewmodel {
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .phtfullviewmodel figure {
            width: 100%;
            margin: auto;
          }
          .phtfullviewmodel figure img {
            width: 100%;
            border-radius: 0;
          }
          .phtfullviewmodel-intro {
            position: absolute;
            z-index: 1;
            left: 0;
            right: 0;
            bottom: 0px;
            height: 54px;
            background: rgba(0, 0, 0, 0.8);
            border-top: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0 10px 0 40px;
          }
          .phtcntnmbr {
            width: 30px;
            flex-shrink: 0;
            position: absolute;
            top: 0;
            left: 0;
          }
          .phtfullviewmodel-intro p {
            color: #a2a2a2;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            margin-top: 6px;
            margin-bottom: 10px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .phtfullviewmodel-intro p span {
            font-size: 13px;
            color: #ffffff;
            text-transform: uppercase;
            position: absolute;
            bottom: 5px;
            right: 0px;
            background: rgba(0, 0, 0, 0.9);
            padding: 2px 10px 2px 5px;
          }
          .phtcntnmbr span {
            width: 30px;
            height: 26px;
            line-height: 26px;
            border-bottom: 1px solid #505050;
            background: #2e2e2e;
            display: block;
            color: #fff;
            font-size: 15px;
            text-align: center;
            font-weight: bold;
          }
          .phtcntnmbr span:last-child {
            color: #b7b7b7;
            border: none;
          }
          .phtfullviewmodel-intro.fullView {
            height: auto;
          }
          .phtfullviewmodel-intro.fullView p {
            -webkit-line-clamp: inherit;
            line-clamp: inherit;
          }
        `}
      </style>
    </>
  );
};
const getGalleryAd = (storyId, adInd) => {
  const tag = adInd === 1 ? "ATF" : "BTF";
  return (
    <>
      <div className="phtcnsmpnad">
        {tag === "ATF" ? (
          <MemoNewSiteAd
            slotId="PG_1x1"
            adUnit={
              "NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_PWA_AS/NW18_HIND_PHT_AS_PWA_ROS_PG_1x1"
            }
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadOnScroll={true}
          />
        ) : null}
        {tag === "ATF" ? (
          <MemoNewSiteAd
            slotId={`mobileAdNew300x250_${storyId}_${adInd}`}
            adUnit={`NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_PWA_AS/NW18_HIND_PHT_AS_PWA_ROS_${tag}_300`}
            sizes={[[300, 250]]}
            width={300}
            height={250}
            lazyLoad={true}
          />
        ) : (
          <MemoNewSiteAd
            slotId={`mobileAdNew300x250_${storyId}_${adInd}`}
            adUnit={`NW18_HIND_PWA/NW18_HIND_PHOTO_PWA/NW18_HIND_PHOTO_PWA_AS/NW18_HIND_PHT_AS_PWA_ROS_${tag}_300`}
            sizes={[[300, 250]]}
            width={300}
            height={250}
            lazyLoad={true}
          />
        )}
      </div>
    </>
  );
};

const PhotogalleryMobile = (props) => {
  const { publicRuntimeConfig } = getConfig();
  const { isAjax = false } = props;
  const {
    category,
    pageNumber = "",
    //fullCaptionIds: propCaptionIds = [],
    isCricketNext,
    relatedArticle = [],
    category_hi,
    finalURL = "",
  } = props.topPriorityData || {};
  const callFired = useRef(false);
  const articleData = props?.secondArticleData ? props?.secondArticleData : props.topPriorityData?.articleData;
  const scrolled = useRef(false);
  const {handleNotificatonOnScroll } = useContext(HindiGlobalContext);
  const {
    headline,
    intro,
    updated_at,
    //creationDate,
    agency,
    agency_full: agencyFull,
    author_byline: authorByline = {},
    publish_by = [],
    byline,
    fms_autopublished,
    section,
    weburl = "",
    gallery,
    story_id: storyId,
    ff_source = "",
    ff_author_name,
    written_by: writtenBy = [],
    translated_by: translatedBy = [],
    reported_by: reportedBy = [],
    edited_by: editedBy = [],
    author,
    breadcrumb,
    disclaimer,
    //weburl_r,
  } = articleData;

  const { ref, inView, entry } = useInView({
    threshold: 0.3,
  });

  // current url
  const outBrainUrl = weburl;
  let outBrainUrlSocial = weburl.replace(
    /https:\/\/(stg|beta)?hindi.news18.com\//,
    publicRuntimeConfig.siteUrl
  );
  outBrainUrlSocial = outBrainUrlSocial.includes("http")
    ? outBrainUrlSocial
    : outBrainUrl;
  const [currentArticle, setCurrentArticle] = useState([]);
  const setCurrentArticleId = (id) => {
    currentArticle !== id && setCurrentArticle(id);
  };

  // set current gallery number
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [popupImages, setPopupImages] = useState([]);
  const [active, setActive] = useState(0);
  const [tempScrollY, setScrollY] = useState(0);
  let adInd = 0;

  const pageRefs =
    gallery &&
    gallery.length &&
    gallery.reduce((acc, value, ind) => {
      acc[ind + 1] = useRef();
      return acc;
    }, {});

  const [selectArticle, setSelectArticle] = useState(false);
  const [secondArticleData, setSecondArticleData] = useState(props.isRelatedArticle ? props?.secondArticleData : {});
  const getRelatedArticledata = async () => {
    const relatedArticleId = relatedArticle?.[0]?.story_id;
    const data = await getArticleById(relatedArticleId, true);
    if (data) {
      setSecondArticleData(data);
      setSelectArticle(true);
    }
  };

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
      document.querySelector("#pg_content")?.clientHeight;
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
  }, []);

  useEffect(() => {
    if (pageRefs && pageNumber && !scrolled.current) {
      if (pageRefs[pageNumber]) {
        pageRefs[pageNumber]?.current?.scrollIntoView({
          behavior: "smooth",
        });
        scrolled.current = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [pageRefs, pageNumber, tempScrollY]);

  const handleViewEnlarge = (images, idx) => {
    const newimg = [...images];
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
    setActive(idx);
    setPopupImages([...newimg]);
    document.getElementsByTagName("body")[0]?.classList?.add("hdn");
  };
  const handleClosePopup = () => {
    setPopupImages([]);
    setActive(0);
    document.getElementsByTagName("body")[0]?.classList?.remove("hdn");
  };

  const publishedBy = publish_by.length ? publish_by[0]?.english_name : "";
  const publishedByWithId = publishedBy + "_" + publish_by[0]?.ID;
  const taboolaVariable = true;
  //const nw_post_word_count = 0;
  const updateOnSliderPopup = (galleryNo, word_count) => {
    setCurrentPage(galleryNo);
    //const taboolaVariable = true;
    // const nw_post_word_count = word_count || 0;
    // pageEvents({
    //   inView: false,
    //   entry,
    //   isAjax: false,
    //   authorByline,
    //   byline,
    //   fms_autopublished,
    //   section,
    //   callFired,
    //   url: outBrainUrlSocial,
    //   headline: galleryNo ? `Page-${galleryNo} - ${headline}` : headline,
    //   storyId,
    //   currentPage: galleryNo,
    //   ff_source,
    //   ff_author_name,
    //   publishedBy: publish_by.length ? publish_by[0]?.english_name : "",
    //   articleData,
    //   publishByFull: publish_by,
    //   category,
    //   allSections: sectionExtractor(articleData),
    //   publishedByWithId:publishedByWithId,
    //   taboolaVariable,
    //   nw_post_word_count,
    // });
  };
  const updateCurrentPage = (galleryNo, word_count) => {
    const nw_post_word_count = word_count || 0;
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
      url: outBrainUrlSocial,
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
      publishedByWithId: publishedByWithId,
      taboolaVariable,
      nw_post_word_count,
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
      {!isAjax && (
        <>
          <Head>
            <meta name="robots" content="max-image-preview:large" />
          </Head>

          {!props?.isRelatedArticle && <>
            {isCricketNext && !isAjax ? <MemoCrTopScoreWidget isMobile /> : null}
            {/* bradecrumbs start  */}
          </>}
        </>
      )}
      <TopToolBarMobile
        url={outBrainUrl || finalURL}
        headline={headline}
        articleId={storyId}
        category={category_hi || category}
        pageType="photogallery"
      />
      <section>
        {!props?.isRelatedArticle && <>
          {!isAjax && isCricketNext && (
            <div className="phtcnsmpn-brdcrmb">
              <a href={publicRuntimeConfig.siteUrl}>Home » </a>
              <a href={`${publicRuntimeConfig.siteUrl}cricket/`}>Cricket Home » </a>
              <a href={`${publicRuntimeConfig.siteUrl}cricket/photogallery/`}>
                Photo »
              </a>
              <span>{breadcrumb || headline}</span>
            </div>
          )}</>}
        {/* bradecrumbs end  */}

        {/* Full photo story start  */}

        {gallery && (
          <main
            className="phtcnsmpnwrap"
            onMouseOver={() => {
              setCurrentArticleId(storyId);
            }}
            id={`ph-article_${storyId}`}
            data-url={outBrainUrl}
            data-title={headline}
            data-id={storyId}
          >
            {!isAjax && !isCricketNext && (
              <BreadcrumbCommon breadCrumbArray={props?.data?.breadCrumbArray} />

            )}
            <article id="pg_content">
              <div id="pg_start"></div>
              <div ref={ref}>
                <h1 className="newphttophd">{headline}</h1>
                <h2 className="newphttoppara">{intro}</h2>
                <ul className="newphtbyline">
                  <li style={{ background: '#333' }}>
                    <MemoByline
                      li={true}
                      agency={agency}
                      agencyFull={agencyFull}
                      lastUpdated={`Last Updated: ${photoGallerydateConversion(
                        updated_at
                      )}`}
                      isMobile={true}
                    />
                  </li>
                  <MemoBylineAuthor
                    authors={[
                      { "Reported by": reportedBy },
                      { "Edited by": editedBy },
                      { "Written by": writtenBy },
                      { "Translated by": translatedBy },
                    ]}
                    author={author}
                    isMobile={true}
                    authorByline={authorByline}
                    isPhoto={true}
                    newUi={true}
                  />
                </ul>
              </div>
              {/* Top ad start */}
              <div className="phtcnsmpnad">
                <span>विज्ञापन</span>
                <MemoNewSiteAd
                  slotId={props?.pageAds?.header_ATF_320}
                  adUnit={props?.pageAds?.header_ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  width={336}
                  height={250}
                />
              </div>
              {/* Top ad end */}

              {gallery?.length
                ? gallery.map((item, ind) => {
                  const galleryNo = ind + 1,
                    showAd = galleryNo !== 1 && galleryNo % 2;
                  showAd && adInd++;
                  const captionObj = item.caption || "";
                  const caption = (parser(captionObj) || "")
                    .toString()
                    .replace(/,?\[object Object\],?/gim, "");
                  return (
                    <React.Fragment key={'gallery' + ind}>
                      {showAd ? getGalleryAd(storyId, adInd) : null}
                      {typeof props.pageAds !== "undefined" &&
                        typeof props.pageAds.PG_1x1_2 !== "undefined" &&
                        props.pageAds.PG_1x1_2 !== "" && ind === 0 && (
                          <MemoNewSiteAd
                            slotId="PG_1x1_2"
                            adUnit={props.pageAds.PG_1x1_2}
                            sizes={[[1, 1]]}
                            removeAdSpan={true}
                          //loadOnScroll={true}
                          />
                        )}
                      {typeof props.pageAds !== "undefined" &&
                        typeof props.pageAds.PG_1x1_3 !== "undefined" &&
                        props.pageAds.PG_1x1_3 !== "" && ind === 0 && (
                          <MemoNewSiteAd
                            slotId="PG_1x1_3"
                            adUnit={props.pageAds.PG_1x1_3}
                            sizes={[[1, 1]]}
                            removeAdSpan={true}
                            loadOnScroll={true}
                          />
                        )}
                      <InView
                        as="div"
                        threshold={0.5}
                        onChange={(inView) =>
                          inView &&
                          (currentPage !== galleryNo || (isAjax && ind === 0)) &&
                          updateCurrentPage(galleryNo, item?.word_count)
                        }
                      >
                        <div className="newphtcnsmnbox">
                          <figure>
                            {/* <img
                            src={imageLoader(item.img, 450, null, false, true)}
                            data-src={imageLoader(
                              item.img,
                              450,
                              null,
                              false,
                              true
                            )}
                            alt={caption}
                            loading={ind == 0 ? "auto" : "lazy"}
                          ></img> */}
                            <img
                              src={item?.img + "?im=Resize,width=450,aspect=fit,type=normal"}
                              data-src={imageLoader(
                                item.img,
                                450,
                                null,
                                false,
                                true
                              )}
                              alt={caption || ''}
                              loading={ind === 0 ? "auto" : "lazy"}
                            />
                            <div className="newphtcount">
                              <span>{ind + 1}</span>
                              <span>{gallery.length}</span>
                            </div>
                            <span
                              onClick={() => handleViewEnlarge(gallery, ind)}
                              className="newphtfullviewbtn"
                            ></span>
                          </figure>
                          <p>{caption}</p>
                          <SocialShare
                            url={outBrainUrlSocial}
                            headline={headline}
                          />
                        </div>
                      </InView>
                    </React.Fragment>
                  );
                })
                : null}
            </article>
          </main>
        )}
        {/* Full photo story end  */}
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
                            width={140}
                            height={93}
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
          {selectArticle && <PhotogalleryMobile topPriorityData={props.topPriorityData} isRelatedArticle={true} secondArticleData={secondArticleData} setCurrentArticle={props.setCurrentArticle} />}
        </div>}
        {!props.isRelatedArticle &&

          <MemoTaboola
            mode={TaboolaList.photoPage.bottom.mode}
            id={TaboolaList.photoPage.bottom.id}
            container={TaboolaList.photoPage.bottom.container}
            placement={TaboolaList.photoPage.bottom.placement}
          />}
        {isCricketNext ? (
          <>
            {" "}
            <MemoTeamRanking />
            <MemoCricketTweet />{" "}
          </>
        ) : (
          <aside><MemoRhsTopStoryPhotoGallery topStories={props.data?.topStories} /></aside>
        )}
        {popupImages.length > 0 && (
          <PhotoViewPopup
            handleSlideChange={(galleryNo) =>
              (currentPage !== galleryNo || (isAjax && ind === 0)) &&
              updateOnSliderPopup(galleryNo)
            }
            url={outBrainUrlSocial}
            headline={headline}
            photoList={popupImages}
            active={active}
            onClose={() => handleClosePopup()}
          />
        )}
        {/* <InstallAppIcon category={'APPdownload_Mweb_Photogallery'} label={'Mobile Photogallery'} isSponcer={Object.keys(props?.data?._1xbetData|| {})?.length>0?true:false} /> */}
        <style jsx global>{`
        .disclaimerText { padding: 10px; color:#000; font-weight: bold; font-style: italic; }
        .phtcnsmpnwrap {
          background: #212121;
          padding: 10px;
        }
        .phtcnsmpn-brdcrmb {
          width: 100%;
          border-bottom: 1px dotted #5a5a5a;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-weight: normal;
          font-size: 13px;
          color: #949494;
          overflow: scroll;
          padding: 5px 15px;
          background: #212121;
        }
        .phtcnsmpn-brdcrmb a {
          flex-shrink: 0;
          margin: 0px 6px;
          font-size: 13px;
          color: #949494;
          line-height: 24px;
        }
        .phtcnsmpn-brdcrmb a:first-child {
          margin-left: 0px;
        }
        .phtcnsmpn-brdcrmb span,
        .phtcnsmpn-brdcrmb span {
          flex-shrink: 0;
          color: #fff;
          font-size: 13px;
          margin-left: 6px;
          line-height: 24px;
          font-weight: normal;
        }
        .phtcnsmpnad {
          background: #2e2e2e;
          text-align: center;
          padding: 10px 0;
          height: 300px;
        }
        .phtcnsmpnad span {
          height: 20px;
          line-height: 20px;
          color: #dcdcdc;
          font-size: 11px;
          display: block;
          text-align: center;
        }
        .newphttophd {
          color: #ffd800;
          font-size: 22px;
          line-height: 32px;
        }
        .newphttoppara {
          color: #fff;
          font-size: 15px;
          line-height: 24px;
          margin: 5px 0;
          font-weight : normal;
        }
        .newphtbyline {
          margin-bottom: 10px;
        }
        .newphtbyline li {
          font-size: 13px;
          color: #909090;
          line-height: 20px;
          align-items: center;
        }
        .newphtbyline li a {
          font-size: 14px;
          color: #909090;
          display: inline-block;
        }
        .newphtbyline li:first-child a:after {
          content: "";
          width: 4px;
          height: 4px;
          background: #909090;
          border-radius: 100%;
          display: inline-block;
          margin: 0 10px;
          position: relative;
          top: -2px;
        }
        .newphtbyline li a {
          align-items: center;
          border-radius: 4px;
          height: 34px;
          line-height: 34px;
        }
        .newphtbyline li:first-child a {
          background: none;
          display: inline-block;
          padding: 0;
        }
        .newphtbyline li a b {
          color: #fff;
        }

        // .newphtbyline li:last-child {
        //   display: flex;
        //   align-items: center;
        //   background: #333333;
        //   border-radius: 4px;
        //   height: 34px;
        //   line-height: 34px;
        //   padding: 0 10px;
        //   margin-top: 10px;
        // }
        .hilight{
          display: flex;
          align-items: center;
          background: #333333;
          border-radius: 4px;
          height: 34px;
          line-height: 34px;
          padding: 0 10px;
          margin-top: 10px;
        }
        .newphtbyline li figure {
          background: none;
          display: inline-block;
          padding: 0;
        }
        // .newphtbyline li figure a {
        //   background: none;
        //   display: inline-block;
        //   padding: 0;
        // }
        .newphtbyline li a img {
          width: 15px;
          height: 15px;
          margin: 0px 10px;
          top: 2px;
          position: relative;
        }
        .hdn {
          overflow: hidden;
        }
        .newphtcnsmnbox {
          border-bottom: 1px dotted #939393;
          margin: 10px 0 20px 0;
        }
        .newphtcnsmnbox figure {
          width: 100%;
          position: relative;
          line-height: 0px;
        }
        .newphtcnsmnbox figure img {
          width: 100%;
          border-radius: 0;
        }
        .newphtcnsmnbox p {
          color: #fff;
          font-size: 15px;
          line-height: 26px;
          margin: 10px 0;
          text-align: center;
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
        .newphtshare {
          display: flex;
          gap: 10px;
          justify-content: center;
          padding-bottom: 10px;
        }
        .newphtshare a {
          width: 32px;
          height: 32px;
          //background: #1d1d1d;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #797979;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .newphtshare a span {
          filter: brightness(0) invert(1);
        }
        .newphtcount {
          position: absolute;
          bottom: 8px;
          left: 8px;
          z-index: 1;
          background: #ef6367 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 2px;
        }
        .newphtcount span {
          width: 22px;
          height: 25px;
          letter-spacing: -0.3px;
          color: #ffffff;
          font-size: 12px;
          line-height: 25px;
          text-align: center;
          font-weight: normal;
          display: block;
          margin: 0 3px;
          border-top: 1px solid #fff;
        }
        .newphtcount span:first-child {
          font-size: 16px;
          font-weight: bold;
          border-top: none;
        }
        .newphtfullviewbtn {
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 2px;
          position: absolute;
          top: 8px;
          right: 8px;
          color: #fff;
          height: 26px;
          line-height: 24px;
          font-size: 12px;
          width: 30px;
          background: #ef6367
            url(/images/siteimages/phtfullviewicon_1669352903.svg)
            50% 50% no-repeat;
          background-size: 12px;
        }
        .newphtnxtglr {
          background: #000;
          height: 50px;
          display: flex;
          margin: 0 -10px;
        }
        .newphtnxtglr div {
          position: relative;
          color: #ef6367;
          font-size: 20px;
          line-height: 22px;
          display: table;
          margin: auto;
          font-weight: bold;
        }
        .newphtnxtglr div span {
          border-bottom: 2px solid #ef6367;
          display: inline-block;
        }
        .newphtnxtglr div:before,
        .newphtnxtglr div:after {
          content: "";
          background: url(/images/revampimages/nextgalleryicon.png) 0 0
            no-repeat;
          width: 10px;
          height: 12px;
          display: inline-block;
          margin: 0 20px;
        }

        .outbrain_row {
          width: 100%;
          padding: 0 3px;
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
        .slide .nextarticle_img img {
            width: 110px;
            border-radius: 0;
            height: 73px;
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
          .slide .nextarticle_img figure{
            width: 140px;
            border-radius: 0;
            height: 93px;
          }
          .slide .nextarticle_img img {
            width: 100%;
            height: auto;
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
          .arr_redirect {
            background: #ffffff;
            border: 1px solid #c7c7c7;
            border-radius: 24px;
            color: #fff;
            display: flex;
            float: left;
            line-height: 16px;
            margin: 0;
            position: relative;
            padding: 0;
            text-transform: capitalize;
            text-align: center;
            align-items: center;
            height: 35px;
            min-width: 35px;
            justify-content: center;
            flex-direction: row;
          }
        }
      `}</style>
      </section>
    </>
  );
};
export default PhotogalleryMobile;
