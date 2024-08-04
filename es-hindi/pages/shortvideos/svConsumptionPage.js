//Global import
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import svConsumptionProps from "../../helper/shortvideos/svConsumptionProps";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { initGA, logPageViewUpdated } from "includes/googleAnalytic";

//Desktop import
const SvConsumption = dynamic(() =>
  import("components/Desktop/shortvideos/SvConsumption_new")
);

//Mobile import
const SvConsumptionMobile = dynamic(() =>
  import("components/Mobile/mshortvideos/SvConsumptionMobile")
);

const SvConsumptionPage = ({ pageData, chartbeat }) => {
  const { articleData, category } = pageData;
  const cat = category?.slug === "short-videos" ? "" : category?.slug || "";

  useEffect(() => {
    initGA();
    logPageViewUpdated(
      articleData,
      cat ? cat : "Video",
      "short videos",
      "Vidgyor",
      "Video Shorts"
    );
  }, []);

  return (
    <>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isShortVideos={true}
        chartbeat={chartbeat}
      />
      {pageData.isMobile ? (
        <SvConsumptionMobile data={pageData} />
      ) : (
        <SvConsumption data={pageData} />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return svConsumptionProps(context);
}

export default SvConsumptionPage;
