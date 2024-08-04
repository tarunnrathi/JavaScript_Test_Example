export const config = { amp: true };
import AmpLayout from "layouts/Amp/AmpLayout";
import Photogallery from "components/Amp/Photogallery";
import pgConsProps from "../../helper/pgConsProps";
import XMLScript from "components/Common/XMLScript";

const photogallery = ({ pageData = {}, chartbeat, GA4Data }) => {
  return (<>
  <XMLScript category={"photogallery"} />
    <AmpLayout
      data={{
        ...(typeof pageData === "object" ? pageData : {}),
        photogalleryFlag: true,
      }}
      mainComponent={Photogallery}
      pageSeo={pageData.pageSeo}
      pageAds={pageData.pageAds}
      chartbeat={chartbeat}
      pageType="photogallery"
      GA4Data={GA4Data}
      category={"APPdownload_Mweb_Photogallery"}
      isPhotoghallery={true}
    />
  </>

  );
};

export async function getServerSideProps(context) {
  return pgConsProps(context, true, false);
}
export default photogallery;
