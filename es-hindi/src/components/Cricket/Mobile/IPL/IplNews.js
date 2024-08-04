import { displayAds, IPL_YEAR } from "includes/ipl.helper";
import dynamic from "next/dynamic";
import IplDataList from "./IplDataList";
import IplDescription from "./IplDescription";
import useLoadMore from "hooks/useLoadMore";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);
const IplNewsInHindi = ({ data }) => {
  const { latestNewsData, dataLength, paramObj, pageAds, seoData } = data;
  // const page = paramObj.page;
  // const noContent = page > 24 ? false : true;
  const pageLimit = paramObj.pageLimit;
  const query_arr = { post_type:"text",'tags.slug':'ipl-2023' };
  const {loadMore, categoryData, hasMoreData} = useLoadMore(latestNewsData, pageLimit, dataLength, query_arr)
  return (
    <>
        <div className="vsp10"></div>
        <div className="CN__scoreCardsection">
        <DynamicCrTopScoreWidgetWithNoSSR isMobile isIPL={true} />
        </div>
        {displayAds(pageAds.ATF_320)}
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
        <IplDataList
          list={categoryData}
          pageAds={pageAds}
        />
        {/* {noContent ? (
          <Pagination
            curpage={page}
            TotalRecord={dataLength}
            limit={paramObj.pageLimit}
            pageurl={paramObj.pageUrl}
            pageflag={false}
          />
        ) : null} */}
        {hasMoreData && <button onClick={loadMore} className="load_more">Load More</button>}
        {
          seoData && seoData.meta_ipl_page_description && (
            <IplDescription page_description={seoData.meta_ipl_page_description} />
          )
        }
        <Taboola
        mode={TaboolaList.category.bottom.mode}
        id={TaboolaList.category.bottom.id}
        container={TaboolaList.category.bottom.container}
        placement={TaboolaList.category.bottom.placement}
/>
      <style jsx global>{`
      .CN__scoreCardsection {
        height: 160px;
        overflow: hidden;
      }
        .brdacrum {
          font-size: 14px;
          color: #001d42;
          text-transform: uppercase;
          line-height: 18px;
          margin: 12px 10px 0 10px;
          border-bottom: 1px solid #eee;
          padding-bottom: 6px;
          font-weight: 700;
        }
        .brdacrum a {
            color: #404040;
            font-weight: 400;
            margin-right: 2px;
        }
        .sponsor-with-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-right: 10px;
        }
        .ipl-globahd {
            font-size: 24px;
            color: #eb3d3c;   
            line-height: 20px;
            padding: 20px 10px 0 10px;
        }
        .add {
          padding: 15px;
          margin: 20px 0px;
          text-align: center;
          display: flex;
          overflow: hidden;
          background: #dbdde3;
          justify-content: center;
          height: 280px;
        }
        .vsp10 {
          margin-top: 10px;
        }
        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer; margin-bottom: 14px;}
      `}</style>
    </>
  );
};
export default IplNewsInHindi;