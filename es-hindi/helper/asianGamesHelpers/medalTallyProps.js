import { ignoreQueryParams } from "includes/article.util";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { home as homeAds } from "includes/Desktop/dfpAdIds";
import { home as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import fetchUtilityDirct from "includes/sFetchUtilityDirect";
import {
  // getDistricts,
  getMenu,
  getRedisDataByKey,
  getGoogleConfig,
} from "api_dns/global/Common";

const medalTallyProps = async (context) => {
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  if (currentUrl[currentUrl.length - 1] != "/") {
    currentUrl = currentUrl + "/";
  }

  const series_id = 37;

  let [
    menuData = {},
    footerData = [],
    googleRemoteConfig,
    // districtList = {},
    topStories = [],
    photoStories = [],
    metalTallyTableData = {},
  ] = await Promise.all([
    getMenu(isMobile),
    getRedisDataByKey("new_fms_system", "KHABARN18-"),
    getGoogleConfig(),
    // getDistricts(),
    [],
    [],
    fetchUtilityDirct(
      `https://xmlns.cricketnext.com/cktnxt/scorecard/olympics/${series_id}_medals_tally.json`,
      {}
    ),
  ]);

  const pageSeo = {
    title:
      "Asian Games 2023 Medal Tally: एशियन एथलेटिक्स चैंपियनशिप 2023 मैडल टैली",
    description:
      "Asian Games 2023 Medal Tally: Get the Latest Updates on Medal Tally, know which country won maximum medals. भारत ने अब तक 19वे एशियन गेम्स में कितने मैडल जीते हैं देखें पूरी लिस्ट यहाँ।",
    keywords:
      "एशियन गेम्स, एशियन गेम्स मैडल टैली, एशियन गेम्स 2023 मैडल टैली, Asian Games 2023 Medal, Asian Games Table, Asian Games Medal, Medal Table Asian Games, Asian Games 2023 esports, Asian Athletics, winners Asian Games,",
    canonical: "https://hindi.news18.com/asian-games/medal-tally/",
    og_image:
      "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    page: "Home",
  };

  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    section: "Medal Tally Asian Games 2023",
    block_ads: "no",
  });

  return {
    props: {
      pageData: {
        menuData,
        footerData,
        googleRemoteConfig,
        // districtList,
        pageSeo,
        pageAds,
        isMobile,
        topStories,
        photoStories,
        metalTallyTableData: metalTallyTableData?.medals_tally || [],
      },
    },
  };
};

export default medalTallyProps;
