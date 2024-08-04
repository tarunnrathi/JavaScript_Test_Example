import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const SidebarTopAd = (props) => {
  return (

    <>
         <SiteAd adUnit={(typeof props.pageAds.ATF_300_id !== 'undefined') ? props.pageAds.ATF_300_id : props.pageAds.ATF_300_id} sizes={[[300, 250]]} className={props.className} />

    </>

  );
};
export default SidebarTopAd;
