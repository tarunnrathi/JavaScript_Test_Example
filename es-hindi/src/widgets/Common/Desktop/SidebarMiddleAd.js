import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const SidebarTopAd = (props) => {
  return (

    <>
      { (props.pageAds.BTF_300_id !== 'undefined') ?
         <SiteAd adUnit={props.pageAds.BTF_300_id} sizes={[[300, 250], [300, 600]]} className={props.className} lazyload={true}/>
         :''
      }
    </>

  );
};
export default SidebarTopAd;
