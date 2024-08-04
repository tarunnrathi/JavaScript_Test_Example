import React from "react";
import dynamic from "next/dynamic";
import categoryHelper from "includes/category.helper";
// import Taboola from "widgets/Common/Responsive/Taboola";
// import { TaboolaList } from "includes/Tabola.helper";
// import StateLandingBottomCommonPage from "./StatelandingBottomCommon";
// const SiteAd = dynamic(() => import("widgets/Common/Responsive/SiteAd"));
const NewSiteAd = dynamic(() => import("./NewSiteAd"));

import CategoryPageTempBottomOne from "./CategoryPageTempBottomOne";
// import SpecialWidget from "../Desktop/SpecialWidget";
// const NewsListing = dynamic(() =>
//   import("widgets/Desktop/category/NewsListing"),
// );

const CategoryPageTempOne = (props) => {
  const {
    data: {
      // topPriorityData: { topRecord = [], bottomRecord = [] } = {},
      categoryStoriesList = [],
      pageAds,
      currentUrl,
      // sliderFlag,
      isMobile,
      _pageParam: {
        category = "",
        subCategory = "",
        // sub_cat = "",
        // get_section = {},
        isStatePage = false,
      } = {},
    } = {},
  } = props;

  const getCategoryTopSliderAndBottomBoxList = categoryHelper.getCategoryTopSliderAndBottomBoxList(category);

  // let bottomListing = {};
  // topSliderUrl = [];
  // if (getCategoryTopSliderAndBottomBoxList !== undefined) {
  // bottomListing = getCategoryTopSliderAndBottomBoxList.bottomListing;
  // topSliderUrl = getCategoryTopSliderAndBottomBoxList.topSliderUrl;
  // }
  const { bottomListing = [] } = getCategoryTopSliderAndBottomBoxList || [];

  return (
    <>
      <div className="newbottomsectionswrap">
        {bottomListing && bottomListing.length > 0 ? (
          bottomListing.map((listNews, key) => {
            return (
              <>
                {key === 5
                  ? isMobile && (
                      <div className="newadd clearfix">
                        <span id="first">Advertisement</span>
                        {/* <SiteAd
                          slotId={`mobile_btf_300`}
                          adUnit={pageAds.BTF_300}
                          sizes={[
                            [320, 250],
                            [300, 250],
                            [336, 280],
                          ]}
                          width={300}
                          height={250}
                        /> */}
                        <NewSiteAd
                          slotId={`mobile_btf_300`}
                          adUnit={pageAds.BTF_300}
                          sizes={[
                            [320, 250],
                            [300, 250],
                            [336, 280],
                          ]}
                          width={300}
                          height={250}
                        />
                      </div>
                    )
                  : ""}

                {key === 10
                  ? ""
                  : // <div className="page_outbrain">
                    //   <Taboola
                    //     mode={TaboolaList.category.center.mode}
                    //     id={TaboolaList.category.center.id}
                    //     container={TaboolaList.category.center.container}
                    //     placement={TaboolaList.category.center.placement}
                    //     position={"center"}
                    //     isMobile={isMobile}
                    //   />
                    // </div>
                    ""}

                <CategoryPageTempBottomOne
                  initialData={listNews}
                  pageParam={props.data._pageParam}
                  currentUrl={currentUrl}
                  pageAds={pageAds}
                  numkey={key}
                  key={key}
                  isMobile={isMobile}
                />
              </>
            );
          })
        ) : categoryStoriesList &&
          categoryStoriesList.length &&
          !isStatePage ? (
          <>
          </>
        ) : (
          ""
        )}
      </div>
      {/* <div className="page_outbrain">
        <Taboola
          mode={TaboolaList.category.center.mode}
          id={TaboolaList.category.center.id}
          container={TaboolaList.category.center.container}
          placement={TaboolaList.category.center.placement}
        />
      </div> */}
      <style global jsx>{``}</style>
    </>
  );
};
export default CategoryPageTempOne;
