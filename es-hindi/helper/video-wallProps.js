import {checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams, arrayOnly } from "includes/article.util";
import { jsonLdForWebPage, jsonLdForHomeSiteNavigation } from "includes/schema.util";
import { getVideoWallProps } from "../common_react/CommonHelper/videoWallHelper";
import {
  getMiscData,
  getDistricts,
  getGoogleConfig,
  RhstopStories,
  getMenu,
  getRedisDataByKey,
  getPriorityData,
} from "api_dns/global/Common";

// import { video_wall as generateDesktopVideoWallAds } from "includes/Desktop/dfpAdIds";
// import { video_wall as generateMobileVideoWallAds } from "includes/Mobile/dfpAdIdsMobile";

const videoWallProps = async(context,isAmp = false)=>{
    //Checking if request is coming with Akamai header or with mobile header
    const isMobile = checkDevice(context);
    
    let protocol = "https://";
    let host = context.req.headers.host;
    if (host.indexOf("localhost") > -1) {
        protocol = "http://";
    }
    let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false).toLowerCase();
    const urlParam = context.query;
    const cat = urlParam.cat || "";

    let [
      menuData = {},
      miscData = {},
      districtList = {},
      footerData = [],
      googleRemoteConfig = {},
      topPriorityStories = [],
      topStories = [],
    ] = await Promise.all([
      getMenu(isMobile, isAmp),
      (!isMobile || !isAmp) &&
        getMiscData({
          trendingTags: true,
          catName: true,
          cat: `${cat}`,
          image: true,
        }),
      isAmp && getDistricts(),
      !isAmp && getRedisDataByKey("new_fms_system", "KHABARN18-"),
      getGoogleConfig(),
      (!isMobile || isAmp) &&
        getPriorityData({
          count: 5,
          subSection: "text",
          filter: { post_type: "text" },
          fields: "story_id,images,display_headline,headline,weburl",
        }),
      !isMobile &&
        RhstopStories({
          count: 4,
          section: "category",
          subSection: cat ? cat : "nation",
          filter: { post_type: "text" },
          fields: "story_id,headline,weburl,images,display_headline",
        }),
    ]);

    let { videoWalls, pageSeo, pageAds, shareUrlPrefix, orientation, category, initialPageLimit, meta } = await getVideoWallProps("hindi", currentUrl, urlParam, isAmp, isMobile, menuData, protocol, host, jsonLdForWebPage, jsonLdForHomeSiteNavigation, getSetTargettingValues, null , {etl: true});

    if (Object.keys(districtList).length) {
        districtList = arrayOnly(districtList);
    }
    let inPv = "";
    let inAds = "";
    // if (isMobile) {
    //     [inPv, inAds] = await getInterstitial();
    // }
    //pageAds = isMobile ? generateMobileVideoWallAds() : generateDesktopVideoWallAds();

    const pageData = {
        isMobile,
        currentUrl,
        urlParam,
        menuData,
        trendingTags: miscData.trendingTags || [],
        topStory: { rhsTopStoryListing: topPriorityStories },        
        footerData,  
        topStories,      
        inPv,
        inAds,
        districtList,
        isVideoWall: true,
        config: googleRemoteConfig,
        orientation,
        shareUrlPrefix,
        videowallCat: category || "All",
        videoWalls,
        pageSeo,
        pageAds,
        language: "hindi",
        initialPageLimit,
        meta
    };
    // Pass data to the page via props
    return { props: { pageData } };
}
export default videoWallProps;