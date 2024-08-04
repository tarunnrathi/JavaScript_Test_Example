import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { isInfographics as isInfographicsMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { isInfographics as isInfographicsAds } from "includes/Desktop/dfpAdIds";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import { TaboolaList } from "includes/Tabola.helper";
import {
  jsonLdForWebPage,
  jsonLdForHomeSiteNavigation,
  jsonLdForArticleConsumption,
  jsonLdForImageGallery,
} from "includes/schema.util";
import { getArticleById } from "api_dns/individual/Article";
import {
  getMiscData,
  RhsphotoStories,
  getDistricts,
  getGoogleConfig,
  RhstopStories,
  getMenu,
  getRedisDataByKey,
  getPriorityData,
} from "api_dns/global/Common";

const photoStoryProps = async (context, isAmp = false) => {
  const isMobile = checkDevice(context);

  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;
  const id = urlParam.post_id;
  const cat = urlParam.cat || "";
  let paramObj = {
    category:cat
  };


  let isInphoGraphics = false
  if((context.req?.url || urlParam.url).includes('infographics')||(context.req?.url || urlParam.url).includes('infographic') || (context.req?.url || urlParam.url).includes('photo-listicle') || (context.req?.url || urlParam.url).includes('photo-story')){
    isInphoGraphics = true;
  }else{
    return {
      notFound: true
    }
  }

 

  let articleData;
  try{
    articleData = await getArticleById(id);
  }catch (error) {   
    articleData = null;
  }
 
  if(articleData === null || articleData === '' || typeof articleData?.story_id === 'undefined' || articleData?.infographics!== true) {
    return {
      notFound: true
    }
  } 

  let [
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    googleRemoteConfig = {},
    districtList = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    (!isMobile || !isAmp) &&
      getMiscData({
        trendingTags: true,
        catName: true,
        cat: `${cat}`,
        image: true,
      }),
    (!isMobile || isAmp) &&
      getPriorityData({
        count: 5,
        subSection: "text",
        filter: { post_type: "text" },
        fields: "story_id,images,display_headline,headline,weburl",
      }),
    !isAmp && getRedisDataByKey("new_fms_system", "KHABARN18-"),
    !isMobile &&
      RhstopStories({
        count: 4,
        section: "category",
        subSection: cat ? cat : "nation",
        filter: { post_type: "text" },
        fields: "story_id,headline,weburl,images,display_headline",
      }),
    !isMobile && RhsphotoStories(),
    getGoogleConfig(),
    isAmp && getDistricts(),
  ]);  

  const article = articleData || {};
  const {
    headline = "",
    intro = "",
    images: { url: thumbnailUrl = "" } = {},
    tag_topic: tagTopic = [],
  } = article;
  let seoPageTitle = "";
  let pageDescription = "";
  let pageKeywords = tagTopic;  
  let isDistrict = false;
  if (articleData && articleData.ff_source && articleData.ff_source == "Hyperlocal") {
    isDistrict = true;
  }
  if (article && article != "" && article.story_id) {    
    seoPageTitle = headline;
    pageDescription = intro;   
    seoPageTitle = seoPageTitle + " – News18 हिंदी";    
  }

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/";
  let pageSeo = {
    title: seoPageTitle && urlParam.gid && urlParam.gid != "1" ? `Page-${urlParam.gid} - ${seoPageTitle}` : seoPageTitle || "404 Not Found",
    description: pageDescription,
    keywords: pageKeywords,
    canonical:isAmp? currentUrl.split('/amp/')[0] + currentUrl.split('amp')[1]: currentUrl,
    og_image: `https://images.news18.com/ibnkhabar/uploads/2023/01/News18_Hindi_Budget_2023_OG_Image.png`,
    news: news,
    cat: cat,
    pageUrl: siteUrl,
    og_title: seoPageTitle.replace(/(<([^>]+)>)/gi, ""),
    og_description: pageDescription || "",    
    caption: articleData.images?.caption,   
    author: article['byline'] || 'Hindi Editor',
    page: 'photogallery'
  };
  if (!isAmp) {
    let ampUrl = protocol + host + "/amp" + context.req.url;
    //pageSeo.ampHtml = ampUrl.slice(0, -1);
    pageSeo.ampHtml = ampUrl;
  }

  if (typeof articleData != "undefined" && articleData != "") {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        seoPageTitle,
        pageDescription,
        pageKeywords,
        currentUrl ? currentUrl.split("?")[0] : "",
        ""
      ) || "";
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
      menuData,
      isMobile
    );
    pageSeo.jsonLdForArticleConsumption = jsonLdForArticleConsumption(articleData, '', isAmp, pageKeywords) || '';
    pageSeo.jsonLdForImageGallery = jsonLdForImageGallery(articleData, isAmp) || ''
  }

  const pageAds = isMobile ? isInfographicsMobileAds() : isInfographicsAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
    article_id: "",
    sectionName: "",
    content_type: "photogallery",
    block_ads: "no",
  });

  let taboolaList = pageSeo?.page === "photogallery" ?TaboolaList.photoPage :TaboolaList.articlePage;
  

  const pageData = {
    taboolaList,
    isMobile,
    articleData,
    currentUrl,
    category:cat,
    urlParam,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    districtList,
    footerData,
    topStories,
    photoStories,
    isMobile,
    config: googleRemoteConfig,
    isInphoGraphics,
    paramObj
  }
  return { props: { pageData } };
};

export default photoStoryProps;
