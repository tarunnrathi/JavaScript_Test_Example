import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { generateAdTags } from 'config/ads.config';
import { checkDevice, getSetTargettingValues } from 'includes/helper';
import { generateMobileAdTags } from 'config/ads_pwa.config';
import { ignoreQueryParams } from 'includes/article.util';
import { jsonLdForWebPage, jsonLdForHomeSiteNavigation, jsonLdForItemList } from 'includes/schema.util';
import { getDistricts, getMenu, getMiscData, getRedisDataByKey, getArticleList, getGoogleConfig } from "api_dns/global/Common";
import { REDIS_KEYS } from 'api/Constant';
import { getQuery } from 'includes/blogs.util';

const agencyProps = async (context, isAmp = false, isTag = true) => {

  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = 'https://';
  let host = context.req.headers.host;
  if (host.indexOf('localhost') > -1) {
    protocol = 'http://';
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url, false);
  const urlParam = context.query || "";
  let topic = urlParam?.topic || "";
  let ct = urlParam.ct || '';
  let pageNumber = parseInt(urlParam.page) || 1;
  let tagUrl = ignoreQueryParams(currentUrl, false).split('page')[0];

  if (topic && topic?.toLowerCase() === 'ibn7') {
    return {
      redirect: {
        destination: protocol + host + "/tag/ibn7",
        statusCode: 301,
      },
    }
  }

  if (topic === 'news' || topic === 'videos' || topic === 'photogallery') {
    ct = topic;
    topic = '';
  }

  let paramObj = {
    topic: topic,
    ct: ct ? ct + '/' : '',
    requestURL: currentUrl,
    page: pageNumber,
  };

  let subString = getQuery(ct, topic, urlParam);
  let fields = 'weburl_r,display_headline,images,intro,post_type,section,created_at,ff_source,local18_video';

  let tagResult = [];
  const pageLimit = isMobile ? 16 : 15;
  let offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;

  tagResult = await getArticleList({count: pageLimit, offset: offset, filter: subString,  fields:fields })
  let tagData = tagResult;

  if (tagUrl) {
    if (ignoreQueryParams(currentUrl, false).lastIndexOf('/') !== ignoreQueryParams(currentUrl, false).length - 1) {
      return {
        redirect: {
          destination: ignoreQueryParams(currentUrl) + '/',
          statusCode: 301
        }
      }
    }
  }

  let page_title = '';
  let page_description = '';
  let page_keywords = '';

  function capitalize(input) {
    if (input) {
      var words = input.split('-');
      var CapitalizedWords = [];
      words.forEach((element) => {
        if (element.length) {
          CapitalizedWords.push(
            element[0].toUpperCase() + element.slice(1, element.length)
          );
        }
      });
      return CapitalizedWords.join(' ');
    } else {
      return '';
    }
  }

  if(tagData.length === 0) {
    return { notFound : true }
  }
  let TopicName = capitalize(topic) || capitalize(urlParam.topic);

  page_title =
    'News18 हिंदी Digital- Latest Hindi news, Live news in hindi , hindi news today';
  page_description =
    'Get all the latest आज की ताजा खबर, लाइव न्यूज अपडेट, पढ़ें सबसे विश्वसनीय हिंदी न्यूज़ वेबसाइट News18 हिंदी | जानिए देश-विदेश और अपने प्रदेश, बॉलीवुड, स्पोर्ट्स, बिजनेस, हेल्थ, लाइफस्टाइल, धर्म, राशिफल से जुड़ी from News 18 hindi Digital Desk.';
  page_keywords =
    'hindi news , हिंदी न्यूज़ लाइव, Watch Live Hindi News, news 18 hindi desk, news 18 hindi digital, और अपने प्रदेश, बॉलीवुड, स्पोर्ट्स, बिजनेस, हेल्थ, लाइफस्टाइल, धर्म, राशिफल';

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
      getMiscData({ trendingTags: true }),
      !isMobile ? getArticleList({count: 5, filter: { post_type:'text' }, fields: 'display_headline,weburl_r,story_id,images,weburl'}): [], 
      !isAmp? getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM): [],
      !isMobile ? getArticleList({count: 5 , fields: 'display_headline,weburl_r,story_id,images,weburl'}): [],
      !isMobile ? getArticleList({count: 9 , filter: { post_type:"photogallery" },  fields: 'display_headline,weburl_r,story_id,images,weburl,weburl_r,gallery_count'}): [],
      getGoogleConfig(),
      isAmp && getDistricts(),
    ]);

  let seoPageTitle = page_title;
  let pageDescription = page_description;
  let pageKeywords = page_keywords;

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + 'tag/';
  let pageSeo = {
    title: seoPageTitle || '404 Not Found',
    description: pageDescription,
    keywords: pageKeywords,
    canonical: currentUrl.split('page')[0],
    og_image: '',
    news: news,
    pageUrl: siteUrl,
    og_title: seoPageTitle,
    og_description: pageDescription,
    isTag,
    topic,
    ct,
    page: "agency"
  };

  if (typeof tagData !== 'undefined' && tagData !== '') {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        page_title,
        pageDescription,
        pageKeywords,
        currentUrl,
        { headline: '', intro: '', display_headline: '' }
      ) || '';

    pageSeo.jsonLdForItemList = jsonLdForItemList(
      currentUrl,
      isMobile ? 16 : 24,
      tagData
    );
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
      menuData,
      isMobile
    );
  }

  const pageAds = isMobile
    ? generateMobileAdTags('listing', 'topic')
    : generateAdTags('listing', 'topic');
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
    article_id: '',
    section: topic !== '' ? topic : 'Tag',
    content_type: 'TOPIC',
    block_ads: 'no',
  });
  pageAds.isTag = true;

  const imageWidth = isMobile ? '186' : '225';
  const imageHeight = isMobile ? '124' : '150';
  const pageData = {
    isMobile,
    tagData,
    currentUrl,
    urlParam,
    pageLimit,
    dataLength: tagResult.length || 0,
    imageWidth,
    imageHeight,
    topic,
    topicName: TopicName || '',
    ct,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    pageNumber: parseInt(pageNumber),
    paramObj,
    footerData,
    topStories,
    photoStories,
    districtList,
    isMobile,
    config: googleRemoteConfig,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default agencyProps;
