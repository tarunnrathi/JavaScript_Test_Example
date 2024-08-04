// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();
// import fetchUtility from "includes/sFetchUtility";
import { ignoreQueryParams, capIt } from "includes/article.util";
import { aqi as aqiAds } from "includes/Desktop/dfpAdIds";
import { aqi as aqiMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import {
  getMenu,
  getRealtimeCitiesByCountry,
  getArticleList,
  getRedisDataByKey,
  getGoogleConfig,
  getDistricts,
} from "api_dns/global/Common";

const aqiProps = async (context,isAmp=false) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let urlParam = context.query;
  let statename = "";
  if ("params" in urlParam) {
    [statename] = urlParam.params;
  }
  if(!statename) {
    return {
      notFound: true
    };
  }
  const state = statename ? capIt(statename.replace("-", " ")) : "";
  const year = statename ? new Date().getFullYear() : "";

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  if (currentUrl[currentUrl.length - 1] != "/") {
    currentUrl = currentUrl + "/";
  }
  const breadCrumbArray=[
    { value: "हिंदी न्यूज", slug: "/" },
    {
      value: "aqi-india",
      slug: "/aqi-india/",
    },
    { value: state,
      slug: currentUrl
    },
  ]

  const pageSeo = {
    title: statename
      ? `Pollution Level in ${state} Today ${year} | ${state} Pollution News | {CITY_HI} में आज का पॉलुशन लेवल क्या है`
      : "India's Top Cities Pollution Level Today | भारत के सबसे ज्यादा पॉलुशन वाले शहरों की लिस्ट",
    keywords: statename
      ? `Pollution Level in ${state}: Know ${state} Today Air Quality Index and Read ${state} Pollution latest news and updates. आज {CITY_HI} में पॉलुशन का लेवल क्या है जानें News18 हिंदी पर.`
      : "Pollution Latest News and Updates: Find Today Air Quality Index of your city. देखें आपके शहर में आज कितना है पॉलुशन लेवल News18 हिंदी के इस पेज पर.",
    description: statename
      ? `${state} Today AQI, ${state} Today Air Quality Index, Pollution Level in ${state} Today ${year}, ${state} Pollution News, ${state} Pollution Updates`
      : "Pollution Latest News, Pollution News Updates, Today Air Quality Index, Today AQI Index",
    canonical: currentUrl,
    breadCrumbArray:breadCrumbArray
  };

  let [
    menuData = {},
    aqiData = {},
    photoStories = [],
    topStories = [],
    stories = [],
    footerData = [],
    googleRemoteConfig,
    districtList = {},
    iplAuctionList = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getRealtimeCitiesByCountry(),
    (!isMobile || !isAmp) && getArticleList({
      count:9,
      offset:0,
      fields:"story_id,categories,display_headline,weburl,images,post_type,gallery_count",
      filter:{"post_type":"photogallery"},
      sortOrder:"desc",
      sortBy:"updated_at",      
    }),
    (!isMobile || !isAmp) && getArticleList({
      count:5,
      offset:0,
      fields:"story_id,categories,display_headline,weburl,images,post_type",
      filter:"",
      sortOrder:"desc",
      sortBy:"updated_at",      
    }),
    getArticleList({
      count:9,
      offset:0,
      fields:"story_id,categories,display_headline,weburl,images,post_type",
      filter:{"tags.slug":"aqi"},
      sortOrder:"desc",
      sortBy:"updated_at",      
    }),
    !isAmp ? getRedisDataByKey("new_fms_system", "KHABARN18-") : [],
    getGoogleConfig(),
    isAmp && getDistricts(),
    {},
  ]);

  const pageAds = isMobile ? aqiMobileAds() : aqiAds();

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
  });

  return {
    props: {
      pageData: {
        isMobile,
        menuData,
        aqiData,
        topStories,
        photoStories,
        cityName: state || false,
        stories,
        footerData,
        pageSeo,
        districtList,
        currentUrl,
        pageAds,
        config: googleRemoteConfig,
        iplAuctionList,
      },
    },
  };
};

export default aqiProps;
