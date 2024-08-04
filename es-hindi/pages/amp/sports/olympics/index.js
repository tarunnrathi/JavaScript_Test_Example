export const config = { amp: true };
import olympicsProps from "../../../../helper/olympicsProps";
import AmpLayout from "layouts/Amp/AmpLayout";
import Home from "components/Amp/Olympics/Home";
import XMLScript from "components/Common/XMLScript";

const OlympicsPage = ({ pageData,chartbeat, GA4Data }) => {
  return (
    <>
      <XMLScript category={"Olympics"} />
      <AmpLayout
        data={{ ...pageData }}
        mainComponent={Home}
        pageAds={pageData.pageAds}
        pageSeo={pageData.pageSeo}
        pageType="category"
        isolympics={true}
        GA4Data={GA4Data}
        chartbeat={chartbeat}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  return await olympicsProps(context);
}

export default OlympicsPage;
