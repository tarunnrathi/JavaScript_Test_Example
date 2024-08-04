import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { webstory as webstoryAds } from "includes/Desktop/dfpAdIds";
import { webstory as webstoryAdsMobile } from "includes/Mobile/dfpAdIdsMobile";
import { jsonLdForWebPage, jsonLdForNewsArticle, jsonLdForItemList } from "includes/schema.util";
import { checkDevice } from "includes/helper";
import { getWebstoryData, getWebstoryDataByCategory } from "api_dns/individual/webstories";
import { getDistricts, getMenu, getMiscData, getRedisDataByKey, getArticleList, getGoogleConfig } from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

const webstoryProps = async (context, isAmp = false) => {

  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  let category = "";
  let urlParam = context.query;
  if ('params' in urlParam) {
    [category] = urlParam.params;
    urlParam = { 'cat': category };
  }
  if(isAmp){
    category = urlParam.cat || "";
    urlParam = { 'cat': category };
  }

  let [
    menuData = {},
    miscData = {},
    topTrending = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    astroStories = {},
    webstories = {},
    districtList = {},
    googleRemoteConfig,
    iplAuctionList = {},
    categorySponserData = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    !(isMobile || isAmp) ? getRedisDataByKey(REDIS_KEYS.TRENDING_TAG, false) : [],
    getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
    !isMobile ? 
    getArticleList({count: 4 , fields: 'display_headline,weburl,weburl_r,story_id,images'}): [],
    !isMobile
    ? 
    getArticleList({count: 9 , filter: { post_type:"photogallery" },  fields: 'gallery_count,display_headline,weburl,weburl_r,story_id,images'}): [],
    [],
    getWebstoryData(),
    isAmp && getDistricts(),
    getGoogleConfig(),
    {},
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
  ]);

  const catSponData = Object.values(categorySponserData || {})?.find(
    (item) => item.campagin_name === "Lok Sabha Election 2024"
  );
  const _1xbetData = catSponData?.sponserdata || [];

  let categoryWiseData = [];
  if(category) {
    categoryWiseData = await getWebstoryDataByCategory( { categories: category }, 0 , (isMobile || isAmp) ? 16 : 24);
  }

  const pageSeo = {
    "title": "Hindi News: Hindi Samachar, Hindi News Live TV, India News in Hindi, हिंदी न्यूज़ लाइव, हिन्दी समाचार - News18 हिन्दी",
    "description": "Hindi News: Read Breaking News, Live Samachar in Hindi of Business, Sports, India, Education, Bollywood, Watch Live Hindi News TV and more on News18 Hindi. हिंदी समाचार की लोकप्रिय वेबसाइट पर देश, दुनिया, कारोबार, खेल, मनोरंजन से जुड़ी साडी खबरें विस्तार मैं पढ़े - न्यूज़18 हिंदी",
    "keywords": "Hindi news, news in hindi, breaking news in hindi, latest news in hindi, latest hindi news, today news in hindi, hindi news today, News18 Hindi, India News, India Hindi News, हिंदी समाचार, ताजा समाचार",
    "canonical": `${publicRuntimeConfig.siteUrl}web-stories/${category ? `${category}/` : ''}`,
    "og_image": "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
    "pageUrl": `${publicRuntimeConfig.siteUrl}web-stories/${category ? `${category}/` : ''}`,
    "isWebstory": true,
    "cat": urlParam.cat || "",
    page: "webstory",
    ampHtml: `${publicRuntimeConfig.siteUrl}amp/web-stories/${category ? `${category}/` : ''}`
  };

  pageSeo.jsonLdForWebPage = jsonLdForWebPage(
    "Web Stories in Hindi, मोबाइल वेब स्टोरी, Visual stories of Entertainment, Lifestyle - News18 Hindi",
    "Web Stories (Webstories) in Hindi: Get Mobile Visual stories (मोबाइल वेब स्टोरी) in Hindi, Entertainment Webstories, Lifestyle Web Stories and more.",
    "Web Stories, Webstories, Visual stories, Entertainment Web stories, वेब स्टोरी, web stories in hindi, मोबाइल वेब स्टोरी",
    `${publicRuntimeConfig.siteUrl}web-stories/${category ? `${category}/` : ''}`,
    '',
    false
  ) || '';


  let itemList = category ? webstories?.webStoryDataArr?.[category]?[...webstories?.webStoryDataArr?.[category]]:[] : [];

  pageSeo.jsonLdForItemList = jsonLdForItemList(
    `${publicRuntimeConfig.siteUrl}web-stories/${category ? `${category}/` : ''}`,
    itemList?.length,
    itemList
  );

  category && (pageSeo.jsonLdForNewsArticle = jsonLdForNewsArticle(category, `${publicRuntimeConfig.siteUrl}web-stories/${category ? `${category}/` : ''}`));

  const pageAds = isMobile? webstoryAdsMobile() : webstoryAds();

  const breadCrumbArray = [
    { value: "News18 Hindi", slug: "/"},
    { value: "Web Stories", slug: "/web-stories/"}
  ]
  let pageData = {
    isMobile,
    webstories,
    menuData,
    breadCrumbArray,
    pageAds,
    pageSeo,
    districtList,
    categoryWiseData,
    trendingTags: miscData.trendingTags || [],
    topTrending,
    footerData,
    currentUrl,
    urlParam,
    isMobile,
    topStories,
    photoStories,
    astroStories: astroStories["daily"] || astroStories,
    config: googleRemoteConfig,
    webstoryCat: category || 'All',
    iplAuctionList,
    _1xbetData
  };
  return { props: { pageData } };
}
export default webstoryProps;