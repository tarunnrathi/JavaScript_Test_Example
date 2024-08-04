import {
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getRedisDataWithKey,
  getGoogleConfig,
  getDistricts,
  getArticleListWithFilterRange,
  RhsphotoStories,
  RhstopStories
} from "api_dns/global/Common";
import { getEventSlider } from "api_dns/individual/Home";
import { checkDevice } from "includes/helper";
import { REDIS_KEYS } from "api/Constant";
import moment from "moment";
import { recordsCountWithPostType,recordsGroupByWithTime } from "includes/newsFeed.helper";
import { home as feedsAds } from "includes/Desktop/dfpAdIds";
import { home as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
const newsFeedProps = async (context, isAmp = false) => {
  const isMobile = checkDevice(context);
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const currentDateObj ={
    "gte":moment(new Date()).format("YYYY-MM-DD")+" 00:00:00",
    "lte":moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  }  
  const oneDayBackDateObj = {
    "gte":moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")+" 00:00:00",
    "lte":moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")+" 23:59:59" 
  }
  const twoDayBackDateObj = {
    "gte":moment(new Date()).subtract(2, 'days').format("YYYY-MM-DD")+" 00:00:00",
    "lte":moment(new Date()).subtract(2, 'days').format("YYYY-MM-DD")+" 23:59:59" 
  }
  let [
    menuData = {},
    miscData = {},
    eventSlider = {},
    footerData = [],
    cricketNewsHome = {},
    googleRemoteConfig = {},
    districtList = {},
    currentDateRecord = [],
    oneDayaBackRecord = [],
    twoDayBackRecord = [],
    photoStories = [],
    topStories = [],
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    getEventSlider({
      offset: 0,
      count: 8,
      cache: { key: "get_homepage_event_slider", ttl: 60 },
    }),
    !isAmp ? getRedisDataByKey("new_fms_system", "KHABARN18-") : [],
    getRedisDataWithKey(REDIS_KEYS.HOMEPAGE_CRICKET, false),
    getGoogleConfig(),
    isAmp && getDistricts(),
    getArticleListWithFilterRange({
        count: 10,
        offset: 0,
        fields:
          "story_id,headline,display_headline,title,post_type,weburl,intro,created_at,updated_at,liveblog_switcher,categories,ff_source,feature_img,keyword,web_url,hindi_title,blog_content,id",
        filterRange: {"created_at":{"gte":currentDateObj.gte, "lte":currentDateObj.lte}},
        filter:{"not":{"ff_source":"Hyperlocal"}}
    }),
    getArticleListWithFilterRange({
        count: 10,
        offset: 0,  
        fields:
          "story_id,headline,display_headline,title,post_type,weburl,intro,created_at,updated_at,liveblog_switcher,categories,ff_source,feature_img,keyword,web_url,hindi_title,blog_content,id",
        filterRange: {"created_at":{"gte":oneDayBackDateObj.gte, "lte":oneDayBackDateObj.lte}},
        filter:{"not":{"ff_source":"Hyperlocal"}}
    }),
    getArticleListWithFilterRange({
        count: 10,
        offset: 0,
        fields:
          "story_id,headline,display_headline,title,post_type,weburl,intro,created_at,updated_at,liveblog_switcher,categories,ff_source,feature_img,keyword,web_url,hindi_title,blog_content,id",
        filterRange: {"created_at":{"gte":twoDayBackDateObj.gte, "lte":twoDayBackDateObj.lte}},
        filter:{"not":{"ff_source":"Hyperlocal"}}
    }),
    RhsphotoStories(),
    !isMobile ?
      RhstopStories({
        count: 4,
        section: "category",
        subSection: "nation",
        filter: { post_type: "text" },
        fields: "story_id,headline,weburl,images,display_headline",
      }): [],
  ]);
  // Records Types
  const recordTypeInCurrentDate = recordsCountWithPostType(currentDateRecord);
  const recordTypeInOneDayBackDate = recordsCountWithPostType(oneDayaBackRecord);
  const recordTypeInTwoDayBackDate = recordsCountWithPostType(twoDayBackRecord);
  // Records GroupbyWithTime
  const recordGroupByWithTimeCurrentDate = recordsGroupByWithTime(currentDateRecord);
  const recordGroupByWithTimeOneDayBackDate = recordsGroupByWithTime(oneDayaBackRecord);
  const recordGroupByWithTimeTwoDayBackDate = recordsGroupByWithTime(twoDayBackRecord);
  let breadCrumbArray = [];
  const tempobj = [{ value: "हिंदी न्यूज", slug: "/"},{ value: "न्यूज फ़ीड", slug: "/news-feed/"}];
  breadCrumbArray = tempobj;
  if (cricketNewsHome?.live && cricketNewsHome?.live === "true") {
    const homePageCricketNews = await getHomePageCricketArticles(
      cricketNewsHome?.story_id,
    );
    cricketNewsHome.storiesListLeft = homePageCricketNews.slice(0, 2) || [];
    cricketNewsHome.storiesListRight = homePageCricketNews.slice(2, 6) || [];
  }
  const pageAds = isMobile ? homeMobileAds() : feedsAds();
  let pageSeo = {
    title:"News Feed",      
    description: "News Feed",  
    keywords: "News Feed",  
    canonical: currentUrl,
    og_image: "",
    news: "",
    cat: "",
    pageUrl: currentUrl,
    og_title: "News Feed",
    og_description: "News Feed",
    isPhoto: false,
    hires:  false,
    caption: "News Feed",
    res43: "",
    author: "",
    page: "news-feed",
  };
  let pageData = {
    currentUrl,
    isMobile,
    menuData,
    trendingTags: miscData.trendingTags || [],
    eventSlider,
    footerData,
    cricketNewsHome,
    config: googleRemoteConfig,
    districtList,
    pageAds,
    breadCrumbArray,
    currentDateObj,
    oneDayBackDateObj,
    twoDayBackDateObj,
    currentDateRecord,
    oneDayaBackRecord,
    twoDayBackRecord,
    recordTypeInCurrentDate,
    recordTypeInOneDayBackDate,
    recordTypeInTwoDayBackDate,
    recordGroupByWithTimeCurrentDate,
    recordGroupByWithTimeOneDayBackDate,
    recordGroupByWithTimeTwoDayBackDate,
    photoStories,
    topStories,
    pageSeo,
    isNewsFeed:true
  }
  // Pass data to the page via props
  return { props: { pageData } };
};
export default newsFeedProps;