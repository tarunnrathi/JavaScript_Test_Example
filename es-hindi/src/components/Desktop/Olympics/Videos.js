import { getArticleList } from "api/global/Common";
import { useState } from "react";
import { olympics_year } from "api/Constant";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/CustomImage";
import RhsTopStory from "widgets/Common/Desktop/RhsTopStory";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import PageNavigations from "components/Common/Olympics/PageNavigations";
import EventDateWidgetDesktop from "components/Common/Olympics/EventDateWidgetDesktop";
import MedalTally from "components/Common/Olympics/MedalTally";

const Videos = (props) => {
  const {
    breadCrumbArray,
    lomp_sdl_with_date,
    date,
    medalTally,
    isMobile,
    pageAds,
  } = props.data;
  const [loadMoreData, setLoadMoreData] = useState(
    props?.data?.latestVideosStories?.length > 0
      ? props?.data?.latestVideosStories
      : 0
  );
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const loadMore = async () => {
    const tempData = await getArticleList(
      {
        count: 20,
        offset: loadMoreData?.length > 0 ? loadMoreData?.length : 0,
        filter: {
          post_type: "videos",
          "tags.slug": `olympics-${olympics_year}`,
        },
        fields: "display_headline,weburl_r,images,weburl",
      },
      true
    );
    if (tempData?.length === 0) {
      setHideLoadMore(true);
    }
    setLoadMoreData([...loadMoreData, ...tempData]);
  };
  return (
    <>
      <EventDateWidgetDesktop
        lomp_sdl_with_date={lomp_sdl_with_date}
        date={date}
      />
      <div className="outer">
        <div className="CN-pageWrapper">
          {!props.isMobile && (
            <div
              style={{
                minHeight: "60px",
                background: "#00000021",
                marginTop: "10px",
              }}
            >
              <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
                lazyload={false}
              />
            </div>
          )}
          <div className="CN-section">
            <div className="CN-sec-l">
              <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
              <PageNavigations title="वीडियो" />
              <div className="CN-innersection">
                <div className="cn-heading-1">
                  <div className="headinner">
                    <h1>
                      ओलिंपिक {olympics_year} <span>वीडियो</span>
                    </h1>
                  </div>
                  <div className="icon" />
                </div>
                {/*CN-listing-wrap START----*/}

                <ul className="CN-listing-wrap">
                  {loadMoreData?.length > 0 &&
                    loadMoreData?.map((item, index) => {
                      return (
                        <li className="CN-list-box" key={index}>
                          <a href={item?.weburl_r}>
                            <div className="image-wrap">
                              <span>
                                <img
                                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg"
                                  alt="v-icon"
                                />
                              </span>
                              <LazyLoadImage
                                src={item?.images?.url}
                                width={216}
                                height={144}
                                isLazyLoad={true}
                                alt={item?.display_headline}
                              />
                            </div>
                            <div className="content-box">
                              <p className="discription">
                                {item?.display_headline}
                              </p>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                </ul>
                {!hideLoadMore && (
                  <button
                    type="button"
                    onClick={loadMore}
                    className="load_more"
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
            <div className="CN-sec-r">
              {/* <SiteAd
                                slotId="cn-add-section-1"
                                adUnit={props?.pageAds?.ATF_300_id}
                                lazyload={true}
                                sizes={[[300, 250]]}
                                width={300}
                                height={250}
                                removeAdSpan
                            /> */}

              <div style={{ marginTop: "10px" }}>
                <MedalTally
                  medalTally={medalTally}
                  pageAds={pageAds}
                  isMobile={isMobile}
                />
              </div>

              {!props?.isMobile && (
                <div className="cn-add-section-2" style={{ minHeight: 519 }}>
                  <div className="vsp20"></div>
                  <RhsTopStory
                    topStories={props?.data?.topStoriesData}
                    articleData={{}}
                    relatedStories={{}}
                    isRss={false}
                  />
                </div>
              )}
              {props?.pageAds?.BTF_300_id && (
                <div style={{ marginTop: "10px" }}>
                  <SiteAd
                    slotId="cn-add-section-2"
                    adUnit={props?.pageAds?.BTF_300_id}
                    sizes={[
                      [300, 250],
                      [336, 280],
                      [300, 600],
                    ]}
                    width={300}
                    height={250}
                    lazyload={true}
                    removeAdSpan
                  />
                </div>
              )}
            </div>
          </div>
          <Taboola
            mode={TaboolaList.articlePage.bottom.mode}
            id={TaboolaList.articlePage.bottom.id}
            container={TaboolaList.articlePage.bottom.container}
            placement={TaboolaList.articlePage.bottom.placement}
          />
        </div>
      </div>
      <style jsx global>{`
        .load_more {
          width: 130px;
          height: 38px;
          background: #ed1c24;
          border-radius: 19px;
          font-size: 17px;
          color: #ffffff;
          line-height: 38px;
          border: none;
          display: table;
          margin: auto;
          cursor: pointer;
          margin-top: 35px;
        }
        .headinner h1 {
          font-size: 26px;
          line-height: 25px;
        }
        .outer {
          max-width: 1244px;
          margin: 0 auto;
          padding: 0;
          clear: both;
          overflow: hidden;
        }
        body .CN-pageWrapper > div {
          margin-bottom: 0px !important;
        }
        body .CN-section,
        body .CN-section * {
          font-family: "Mukta", sans-serif !important;
        }
        .CN-section {
          display: flex;
          justify-content: space-between;
        }
        .CN-section .CN-sec-l {
          width: 924px;
          min-width: 924px;
        }
        .CN-breadcum {
          font-size: 14px;
          padding: 4px 0;
          background: none;
          border-bottom: 1px dotted #939393;
          margin-bottom: 10px;
          line-height: 13px;
          color: #292929;
          text-transform: uppercase;
        }
        .CN-breadcum h1,
        .CN-breadcum h2 {
          display: inline-block;
        }
        .CN-breadcum h1 {
          font-size: 14px;
          font-weight: 400;
          font-family: "Mukta", sans-serif !important;
        }
        .newadd {
          background: #efefef;
          line-height: 0;
          display: table;
          margin: auto;
        }
        .newadd span {
          display: block;
          font-size: 12px;
          color: #8e8e8e;
          text-align: center;
          height: 20px;
          line-height: 20px;
          width: 100%;
        }
        .adbox {
          background: #dbdde3 !important;
          padding: 16px 0;
          position: relative;
        }
        .vsp20 {
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          * {
            padding: 0;
            margin: 0;
            list-style: none;
            box-sizing: border-box;
            text-decoration: none;
            line-height: 19px !important;
            border-collapse: collapse;
          }
          body {
            font-family: "Mukta", sans-serif !important;
            margin: 0;
            padding: 0;
            font-size: 13px;
            line-height: 19px;
            font-weight: 400;
          }
          .outer {
            width: 100%;
            display: block;
            overflow: auto !important;
          }
          .CN-section {
            display: block !important;
            width: 100%;
          }
          .CN-section .CN-sec-l {
            width: 100% !important;
            min-width: auto !important;
          }
          .CN-breadcum {
            font-size: 13px;
            height: 34px;
            background: none;
            border-top: none;
            border-bottom: 1px dashed rgb(147 147 147 / 57%);
            display: flex;
            overflow: scroll;
            padding: 8px 10px 5px 10px;
            margin-bottom: 0;
            line-height: 1.4;
          }
          .CN-breadcum a {
            padding: 0 4px;
            flex-shrink: 0;
          }
          body .CN-breadcum a span {
            padding: 0 4px 0 0;
          }
          body .CN-breadcum h1,
          body .CN-breadcum h2 {
            font-size: 13px;
            line-height: 19px;
            flex-shrink: 0;
          }
          .CN-sec-r {
            display: none;
          }
        }
        .cn-heading-1 {
          border-bottom: 3px solid #e1261d;
          margin-bottom: 10px;
        }
        .cn-heading-1 div {
          font-size: 22px;
          line-height: 20px;
          color: #e1261d;
          font-weight: bold;
          background: #fff;
          position: relative;
          top: 8px;
          padding-right: 4px;
          display: inline-block;
          text-transform: uppercase;
        }
        .cn-heading-1 div span {
          color: #001d42 !important;
          top: 0;
        }
        .pageContent {
          font-size: 16px;
          line-height: 1.5;
          margin-top: 10px;
        }
        @media (max-width: 768px) {
          .cn-heading-1 {
            padding: 0 0 0 10px;
            margin-bottom: 10px;
            border: none;
          }
          .CN-schedule-main {
            padding: 0 10px;
          }
          .pageContent {
            padding: 10px 10px;
            font-size: 16px;
            line-height: 1.5;
          }
        }
        .CN-listing-wrap {
          display: grid;
          grid-template-columns: 216px 216px 216px 216px;
          column-gap: 19px;
          row-gap: 19px;
          border-bottom: 1px solid #d8d8d8;
          padding-bottom: 20px;
        }
        .CN-listing-wrap li {
          border-bottom: 1px #939393 dotted;
          padding-bottom: 10px;
        }
        .CN-listing-wrap li a {
          display: block;
        }
        .CN-listing-wrap .image-wrap,
        .CN-latestStory-widget li .image-box {
          height: 144px;
          overflow: hidden;
        }
        .CN-listing-wrap .image-wrap {
          position: relative;
        }
        .CN-listing-wrap .image-wrap img {
          display: block;
          width: 100%;
        }
        .CN-listing-wrap li a .content-box {
          margin-bottom: 0px;
          margin-top: 7px;
        }
        .CN-listing-wrap li a .content-box .discription {
          font-size: 16px;
          line-height: 24px;
          font-weight: bold;
          margin-bottom: 0px;
          color: #292929;
        }
        .CN-section .CN-sec-r {
          width: 300px;
          min-width: 300px;
        }
        .CN-listing-wrap .image-wrap span {
          width: 30px;
          position: absolute;
          right: 4px;
          top: 4px;
        }
        .CN-listing-wrap .image-wrap img {
          display: block;
          width: 100%;
        }
        .inner-ad {
          margin-top: 42px;
        }
        .CN-section {
          margin-top: 10px;
        }
        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
        }
        .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
      `}</style>
    </>
  );
};
export default Videos;
