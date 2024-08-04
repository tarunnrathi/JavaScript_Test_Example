//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import dynamic from "next/dynamic";
import News18LocalProps from "../helper/news18LocalProps";
import INIT_OOP_Manager from "components/Common/INIT_OOP_Manager";

const News18LocalPage = dynamic(() => import("components/Desktop/News18LocalPage"));
const News18LocalPageMobile = dynamic(() => import("components/Mobile/News18LocalPageMobile"));

//Desktop import

//Mobile import

const News18Local = ({ pageData, chartbeat }) => {
  return (
    <>
      <SiteSeo pageSeo={pageData.pageSeo} url={pageData.currentUrl} isShortVideos={true} chartbeat={chartbeat} />
      {pageData.isMobile ?
        <News18LocalPageMobile data={pageData} />

        :
        <News18LocalPage data={pageData} />
      }
      <INIT_OOP_Manager pageAds={{}} isMobile={pageData.isMobile} />
    </>
  );
};

export async function getServerSideProps(context) {
  return News18LocalProps(context);
}

export default News18Local;
