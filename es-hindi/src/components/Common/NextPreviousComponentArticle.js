import React, { useEffect, useState, useContext } from "react";
import LazyLoadImage from "./CustomImage";
import { getArticleAdjacents } from "api/global/Common";
import HindiGlobalContext from "HindiGlobalContext";

let isHoverShowed = false;
let lastScrollTop = 0;
const NextPreviousArticleResponsive = ({
  article_id = "",
  created_at = "",
  categories = "",
  post_type = "text",
  isMobile = false,
}) => {
  const [nextPrevious, setNextPreviousData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showNextPreviousIcon, setShowNextPrevious] = useState(false);
  const [showOnHoverElement, setShowOnHoverElement] = useState(false);
  const [showNextPrevious, setShowNextPreviousMweb] = useState("N");
  const { setBottomNextPrevOpen } = useContext(HindiGlobalContext);

  const VisibleWhenElementInViewPort = () => {
    const element = document.querySelector(
      isMobile ? ".cp_mid_short_news" : ".cp_rhs_photo_widget"
    );
    if (element) {
      const bounding = element.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      ) {
        setShowNextPrevious(true);
      }
    }
  };

  const showHoverIcons = () => {
    let element = document.querySelector(
      isMobile ? ".tbl-read-more-btn" : ".cp_rhs_topstory_widget"
    );
    if (!element && isMobile) {
      element = document.querySelector(".cp_related_stories");
    }
    if (element) {
      const bounding = element.getBoundingClientRect();
      if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      ) {
        setShowOnHoverElement(true);
        document.removeEventListener("scroll", showHoverIcons, false);
        isHoverShowed = true;
        if (!isMobile) {
          setTimeout(() => {
            setShowOnHoverElement(false);
          }, 3000);
        } else {
          setBottomNextPrevOpen(true);
        }
      }
    }
  };

  const handleOnUpDownScroll = () => {
    VisibleWhenElementInViewPort();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      // if (showNextPrevious !== "N") {
      setShowNextPreviousMweb("N");
      // }
    } else if (st < lastScrollTop) {
      // upscroll code
      // if (showNextPrevious !== "P") {
      setShowNextPreviousMweb("P");
      // }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };

  useEffect(() => {
    if (article_id && created_at && showNextPreviousIcon) {
      getArticleAdjacents({
        article_id,
        created_at,
        filter: { post_type: post_type, "categories.slug": categories },
      })
        .then((response) => {
          setNextPreviousData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("NextPreviousArticleResponsiveError", error);
        });
    }

    if (showNextPreviousIcon && !isHoverShowed) {
      document.addEventListener("scroll", showHoverIcons, false);
    }
  }, [article_id, categories, created_at, post_type, showNextPreviousIcon]);

  useEffect(() => {
    document.addEventListener("scroll", handleOnUpDownScroll, false);
    return () => {
      document.removeEventListener("scroll", handleOnUpDownScroll, false);
    };
  }, []);

  const handleOnClose = () => {
    setShowOnHoverElement(false);
    setBottomNextPrevOpen(false);
  };

  if (isLoading || !showNextPreviousIcon) return null;

  const { next = {}, prev = {} } = nextPrevious;
  const dataToShow =
    showNextPrevious === "N" && Object.keys(next).length ? next : prev;
  const isPrev =
    showNextPrevious === "N" && Object.keys(next).length ? false : true;

  return (
    <>
      <div className="anarrcont">
        {Object.keys(prev).length > 0 && (
          <div className="anlft">
            <a href={prev.weburl_r} className="cp_perpetual_prev">
              <span className="arrow-left"></span>
            </a>
            <div className={`strwrap`}>
              <LazyLoadImage
                alt={prev.images.caption}
                src={prev.images.url}
                title={prev.display_headline}
                width={110}
                height={73}
                isLazyLoad={true}
              />
              <div className="stritle">
                <span>Previous Article</span>
                <a href={prev.weburl_r} className="cp_perpetual_prev">
                  <h3>{prev.display_headline}</h3>
                </a>
              </div>
            </div>
          </div>
        )}
        {Object.keys(next).length > 0 && (
          <div
            className={
              showOnHoverElement && !isMobile ? "anrgt anrgt_auto" : "anrgt"
            }
          >
            <div className={`strwrap cp_perpetual_next`}>
              <a href={next.weburl_r} className="cp_perpetual_next">
                <LazyLoadImage
                  alt={next?.images?.caption}
                  src={next?.images?.url}
                  title={next.display_headline}
                  width={110}
                  height={73}
                  isLazyLoad={true}
                />
              </a>
              <div className="stritle">
                <span>Next Article</span>
                <a href={next.weburl_r} className="cp_perpetual_next">
                  <h3>{next.display_headline}</h3>
                </a>
              </div>
            </div>
            <a href={next.weburl_r} className="cp_perpetual_next">
              <span className="arrow-right"></span>
            </a>
          </div>
        )}
      </div>
      {/* MWeb Story */}
      {dataToShow && showOnHoverElement && (
        <div className="strwrap mweb">
          <a
            href={dataToShow.weburl_r}
            className={isPrev ? "cp_perpetual_prev" : "cp_perpetual_next"}
          >
            <LazyLoadImage
              alt={dataToShow?.images?.caption}
              src={dataToShow?.images?.url}
              title={dataToShow.display_headline}
              width={110}
              height={73}
              isLazyLoad={true}
            />
            <div className="stritle">
              <h3>{dataToShow.display_headline}</h3>
            </div>
          </a>
          <span onClick={() => handleOnClose()}>
            <img alt="ancross" src="/images/logos/ancross.svg" />
          </span>
        </div>
      )}
      {/* MWeb Story */}
      <style jsx global>{`
        .arrow-right,
        .arrow-left {
          display: block;
          margin: 30px auto;
          width: 16px;
          height: 16px;
          border-top: 3px solid #000;
          border-left: 3px solid #000;
        }
        .arrow-right {
          transform: rotate(135deg);
        }
        .arrow-left {
          transform: rotate(-45deg);
        }
        .strwrap img,
        .strwrap a img {
          vertical-align: middle;
        }
        .anlft,
        .anrgt {
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 0px 10px 10px 0px;
          width: 50px;
          height: 117px;
          display: flex;
          align-items: center;
          cursor: pointer;
          z-index: 999;
          justify-content: center;
        }
        .anlft {
          position: fixed;
          left: 0;
          top: 45%;
        }
        .anrgt {
          right: 0;
          position: fixed;
          top: 45%;
          border-radius: 10px 0px 0px 10px;
        }
        .strwrap {
          display: none;
          border-right: 1px solid #b4b4b4;
        }
        .anrgt_auto .strwrap {
          display: flex;
        }
        .strwrap img,
        .strwrap a img {
          width: 130px;
          height: 97px;
          border-radius: 10px;
        }
        .stritle span {
          font-size: 14px;
          line-height: 14px;
          color: #e02a26;
          font-weight: 600;
        }
        .stritle h3 {
          font-size: 15px;
          line-height: 20px;
          width: 100%;
        }
        ${!isMobile
          ? ` .anlft:hover,
          .anrgt:hover {
            width: 375px;
            max-height: 117px;
            padding: 20px;
          }
          .anrgt_auto {
            width: 375px !important;
            max-height: 117px;
            padding: 20px 0 20px 20px;
          }
        .anlft:hover .strwrap,
        .anrgt:hover .strwrap,
        .anrgt_auto .strwrap
         {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          width: calc(100% - 50px);
        }
        .anrgt:hover .arrow-right,
        .anlft:hover .arrow-left,
        .anrgt_auto .arrow-right
        {
          margin: 10px auto;
        }
        .anrgt:hover, anrgt_auto {
          padding: 20px 0 20px 20px;
        }
        .anlft:hover {
          padding: 20px 20px 20px 0 !important;
        }
        .anlft:hover .strwrap {
          display: flex;
          flex-direction: row-reverse;
          border-left: 1px solid #ddd;
          border-right: 0;
          padding-left: 10px;
          align-items: center;
        }
        .anrgt_auto  .strwrap {
          display: flex;
          padding-right: 10px;
        }
        .anrgt .strwrap > a, .anrgt_auto .strwrap > a {
          display: block;
          max-height: 97px;
      }
        .anlft > a, .anrgt > a {
          width: 50px;
        }
        .stritle a:hover {
          color: #111;
        }
        .anrgt:hover .strwrap {
          padding-right: 10px;
        }`
          : ""}

        @media (max-width: 768px) {
          .anrgt {
            opacity: 0.67;
            box-shadow: unset;
            border-radius: 100%;
            width: 80px;
            height: 80px;
            right: -10%;
            justify-content: flex-start;
          }
          .anlft {
            opacity: 0.67;
            box-shadow: unset;
            border-radius: 100%;
            width: 80px;
            height: 80px;
            left: -10%;
          }
          .arrow-right {
            right: 3px;
            position: relative;
          }
          .arrow-left {
            left: 18px;
            position: relative;
          }
          .strwrap.mweb {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            box-shadow: 0px -3px 6px #00000029;
            background-color: #fff;
            height: 85px;
            align-items: center;
            border: 0;
            padding: 8px;
            gap: 14px;
            z-index: 9999999;
            justify-content: space-between;
          }
          .strwrap.mweb > a {
            display: flex;
            justify-content: center;
            gap: 14px;
          }
          .strwrap > span img {
            width: 20px;
            height: 20px;
          }
          .stritle h3 {
            font-size: 17px;
            line-height: 23px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .arrow-right,
          .arrow-left {
            width: 20px;
            height: 20px;
          }
          .anlft > a,
          .anrgt > a {
            width: 50px;
          }
          .strwrap img,
          .strwrap a img {
            width: 90px;
            height: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default NextPreviousArticleResponsive;
