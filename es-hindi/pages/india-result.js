//Global import
import SiteSeo from 'widgets/Common/Responsive/SiteSeo';
import dynamic from "next/dynamic";
// props import 
import boardresultProps from '../helper/boardresultProps';
import boardProps from '../helper/boardProps';
//Desktop import
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const Board = dynamic(() => import("components/Desktop/board/Result"));
const BoardData = dynamic(() => import("components/Desktop/board/Board"));
//Mobile import
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const BoardListMobile = dynamic(() => import("components/Mobile/board/ResultMobile"));
const BoardDataMobile = dynamic(() => import("components/Mobile/board/BoardMobile"));

const boardresult = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        chartbeat={chartbeat}
      />
      {
        pageData.isMobile ?
          <MobileLayout
            data={pageData}
            mainComponent={ pageData?.board !=="" && pageData?.board !== null ? BoardDataMobile : BoardListMobile}
            pageAds={pageData.pageAds}
            pageSeo={pageData.pageSeo}
            dtype='tag'
            isTag={true}
            pageType={"boardresult"}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
          :
          <DesktopLayout
            data={pageData}
            mainComponent={pageData?.board !=="" && pageData?.board !== null ? BoardData  : Board}
            pageAds={pageData.pageAds}
            pageSeo={pageData.seo}
            isHome={true}
            config={pageData.config}
            pageType={"boardresult"}
            showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
          />
      }
    </>
  );
};
export async function getServerSideProps(context) {
  const urlParam = context.query;
  if(urlParam?.board){
    return boardProps(context);
  }else{
    return boardresultProps(context);
  }  
}
export default boardresult;