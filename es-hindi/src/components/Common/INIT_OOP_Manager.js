import { useEffect } from "react";
import { scriptLoader } from "includes/article.util";
import Script from "next/script";

const INIT_OOP_Manager = ({ pageAds, isMobile }) => {
  function loadGpt() {
    window.removeEventListener("scroll", loadGpt);
    if (!window.gptRan && typeof window !== "undefined") {
      window.gptRan = true;
      scriptLoader(
        "https://ads.pubmatic.com/AdServer/js/pwt/113941/5151/pwt.js"
      );
    }
    return true;
  }
  useEffect(() => {
    loader(pageAds, isMobile);
  }, []);

  const adScriptLoader = () => {
    setTimeout(() => {}, 7000);
    window.addEventListener("scroll", loadGpt);
  };

  return (
    <Script
      strategy="lazyOnload"
      src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      onLoad={() => {
        adScriptLoader();
      }}
    ></Script>
  );
};
export default INIT_OOP_Manager;

const loader = (pageAds, isMobile) => {
  window.PWT = window.PWT || {};
  window.googletag = window.googletag || { cmd: [] };
  window.googletag.cmd.push(function () {
    let interstitialSlot = null;
    Object.keys(pageAds?.setTargetingValues || {}).forEach((item) => {
      googletag.pubads().setTargeting(item, pageAds.setTargetingValues[item]);
    });
    window.googletag.enableServices();
    if (isMobile) {
      setTimeout(() => {
        interstitialSlot = googletag.defineOutOfPageSlot(
          "/1039154/NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_INSTL_OOP",
          googletag.enums.OutOfPageFormat.INTERSTITIAL
        );
        if (interstitialSlot?.getOutOfPage()) {
          interstitialSlot.addService(googletag.pubads());
          googletag.display(interstitialSlot);
          // console.log("interstitialSlot =",interstitialSlot.getSlotElementId());
          // adsId = interstitialSlot;
        }
      }, 1000);
    } else {
      window.googletag.pubads().disableInitialLoad();
    }
    window.googletag.pubads().collapseEmptyDivs(true);
  });
};
