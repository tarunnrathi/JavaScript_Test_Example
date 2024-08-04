import moment from "moment-timezone";
import dynamic from "next/dynamic";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyImage from "components/Common/LazyImage";
import useLoadMore from "hooks/useLoadMore";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import { IPL_YEAR } from "includes/ipl.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const DynamicRHSWithNoSSR = dynamic(
  () => import("components/Cricketnext/home/RHS"),
  { ssr: false }
);
const IplNewsDesktop = ({ data, pageAds }) => {
  const { latestNewsData, dataLength, paramObj, seoData } = data;
  const liveTime = (time) => {
    return time
      .toString()
      .replace(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        "$1-$2-$3 $4:$5:$6"
      );
  };
  // const noContent = paramObj.page > 24 ? false : true;
  const pageLimit = paramObj.pageLimit;
  const query_arr = { post_type:"text",'tags.slug':`ipl-${IPL_YEAR}` };
  const {loadMore, categoryData, hasMoreData} = useLoadMore(latestNewsData, pageLimit, dataLength, query_arr)
  return (
    <>
      <div className="CN-pageOutter CN-Desktop-HomeOuter">
        <div className="CN-pageWrapper">
          <div className="CN-pageCN-scoreCardsection">
            <SiteAd
              slotId="Desktop_ScoreCard_ad"
              adUnit={pageAds?.ScoreCard_ad}
              sizes={[[1244, 60]]}
              width={1244}
              height={60}
              removeAdSpan={true}
              lazyload={true}
            />
            <div className="CN-scoreCardsection">
              <DynamicCrTopScoreWidgetWithNoSSR isIPL={true} />
            </div>
          </div>
          <section className="iplwrapper">
            <div className="container clearfix">
              <div className="ipl-leftwrap">
              <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "क्रिकेट", slug: "/cricket/"},
                  { value: `IPL ${IPL_YEAR}`,slug: "/cricket/ipl/"},
                  { value: `न्यूज़`},
                ]}
                isCapitalize={true}/>
                <div className="sponsor-with-heading">
                  <h1 className="ipl-globahd">IPL {IPL_YEAR} न्यूज़</h1>
                  <div className="predictor_sponsored"></div>
                </div>
                <ul className="ipltag-storylist clearfix">
                  {categoryData.map((data, index) => (
                    <li key={index}>
                        <a href={data.weburl_r}>
                          <LazyImage
                            className=""
                            loading="lazy"
                            src={data.images?.url}
                            data-src={data.images?.url}
                            alt={data.display_headline}
                            width={220}
                            height={147}
                          />
                        </a>
                        {index === 0
                        ?
                      
                      <div className="ipltagintro">
                        <h2>
                          <a href={data.weburl_r}>{data.display_headline}</a>
                        </h2>
                        <p>{data.intro}</p>
                        <div className="ipl-pstdt">
                          {moment(liveTime(data.created_at)).format(
                            "MMMM D, YYYY, h:mm a"
                          )}
                        </div>
                      </div>
                      : 
                      <div className="ipltagintro">
                        <h3>
                          <a href={data.weburl_r}>{data.display_headline}</a>
                        </h3>
                        <p>{data.intro}</p>
                        <div className="ipl-pstdt">
                          {moment(liveTime(data.created_at)).format(
                            "MMMM D, YYYY, h:mm a"
                          )}
                        </div>
                      </div>
                          }
                    </li>
                  ))}
                </ul>
                {/* {noContent ? (
                  <Pagination
                    curpage={paramObj.page}
                    TotalRecord={dataLength}
                    limit={paramObj.pageLimit}
                    pageurl={paramObj.pageUrl}
                    pageflag={false}
                  />
                ) : null} */}
                {hasMoreData && <button onClick={loadMore} className="load_more">Load More</button>}
                <div className="vsp20"></div>
                <SiteAd
                  width={728}
                  height={90}
                  style={{ textAlign: "center" }}
                  adUnit={pageAds.BTF_728}
                  sizes={[[728, 90]]}
                  lazyload={true}
                ></SiteAd>
                <div className="vsp20"></div>
                {seoData.meta_ipl_page_description && (
                  <div className="iplspclcnts clearfix">
                    {seoData.meta_ipl_page_description}
                  </div>
                )}
              </div>
              <div className="ipl-rightwrap">
                <DynamicRHSWithNoSSR
                  position={"first"}
                  pageAds={pageAds}
                  isIPL={true}
                  taboola ={true}
                   taboolaList={TaboolaList.category}
                />
              </div>
            </div>
            <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
/>
          </section>
        </div>
      </div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
        }
        .CN-pageOutter {
          margin-bottom: 20px;
          width: 100%;
        }
        .CN-pageWrapper {
          max-width: 1244px;
          margin: 0 auto;
          background: #fff;
          clear: both !important;
        }
        .CN-pageCN-scoreCardsection {
          min-height: 60px;
          background: rgb(0 0 0 / 13%);
          margin-top: 10px;
        }
        .CN-scoreCardsection {
          background: #f5f5f5;
          padding: 0 15px;
        }
        .slick-arrow {
          cursor: pointer !important;
        }
        .iplwrapper {
          background: #f5f5f5;
        }
        .iplwrapper .container {
          padding: 15px;
          background: #fff;
          box-sizing: border-box;
        }
        .container {
          margin: auto;
          max-width: 1244px;
          padding: 0 10px;
          position: relative;
        }
        .clearfix {
          clear: both;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .ipl-leftwrap {
          float: left;
          width: calc(100% - 320px);
        }
        .brdacrum {
          margin-bottom: 5px;
        }
        .brdacrum {
          font-size: 14px;
          color: #001d42;
          text-transform: uppercase;
          line-height: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          border-bottom: 2px solid #eee;
          padding-bottom: 6px;
        }
        .brdacrum a {
          color: #404040;
          font-weight: 400;
          margin-right: 2px;
        }
        .sponsor-with-heading {
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .ipl-globahd {
          font-size: 28px !important;
          margin-bottom: 5px !important;
          line-height: 32px !important;
        }
        .ipl-globahd {
          font-size: 30px;
          color: #eb3d3c;
          line-height: 36px;
          margin-bottom: 10px;
        }
        .predictor_sponsored {
          text-align: center;
        }
        .ipltag-storylist li {
          display: flex;
          margin-bottom: 15px;
        }
        .ipltag-storylist li figure {
          width: 220px;
          height: 148px;
          margin-right: 15px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 10px;
        }
        figure {
          line-height: 0;
          position: relative;
        }
        .ipltag-storylist li:hover .ipltagintro h2 a {
          color: #eb3d3c;
        }
        .ipltag-storylist li {
          display: flex;
          margin-bottom: 15px;
        }
        .ipltag-storylist li figure {
          width: 220px;
          height: 148px;
          margin-right: 15px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 10px;
        }
        .ipltag-storylist li figure img {
          width: 100%;
          transform: scale(1);
          transition: all 0.5s ease-in-out;
        }
        .ipltag-storylist li:hover figure img {
          transform: scale(1.2);
          transition: all 0.5s ease-in-out;
        }
        .ipltag-storylist li .ipltagintro {
          margin: auto;
          width: 100%;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .ipltag-storylist li .ipltagintro {
          margin: auto;
          width: 100%;
        }
        .ipltag-storylist li .ipltagintro h2,
        .ipltag-storylist li .ipltagintro h2 a {
          font-size: 24px;
          font-weight: 400;
          color: #000;
        }
        .ipltag-storylist li .ipltagintro h2,
        .ipltag-storylist li .ipltagintro h2 a {
          font-size: 24px;
          font-weight: 400;
          color: #000;
        }
        .ipltag-storylist li .ipltagintro p {
          font-size: 15px;
          margin: 8px 0;
          line-height: 22px;
        }
        .ipltag-storylist li .ipltagintro .ipl-pstdt {
          font-size: 13px;
          color: #999;
          display: block;
        }
        .pagination {
          margin: 30px 0 20px 0;
        }
        .pagination ul {
          display: flex;
          justify-content: center;
        }
        .pagination {
          margin: 30px 0 20px 0;
        }
        .pagination ul {
          display: flex;
          justify-content: center;
        }
        li {
          list-style: none;
        }
        .pagination ul li a.selected {
          background: #e1261d;
          color: #fff;
        }
        .pagination ul li a {
          display: block;
          width: 33px;
          height: 33px;
          text-align: center;
          color: #000;
          line-height: 33px;
          background: #e8e8e8;
          border-radius: 100%;
          margin: 0 2px;
          position: relative;
        }
        a {
          text-decoration: none;
          color: #111;
        }
        .vsp20 {
          margin-top: 20px;
        }
        .iplspclcnts {
          background: #f5f5f5;
          padding: 15px 20px;
          font-size: 18px;
          color: #444;
          line-height: 28px;
          margin-bottom: 20px;
        }
        .ipl-rightwrap {
          float: right;
          width: 300px;
        }
        .rgtad {
          width: 300px;
          display: flex;
          justify-content: center;
        }
        .n18bhdr + div {
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer; margin-bottom: 14px;}
      `}</style>
    </>
  );
};
export default IplNewsDesktop;