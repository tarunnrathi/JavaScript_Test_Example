import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { ignoreQueryParams } from "includes/article.util";
import sfetchUtilityDirect from "includes/sFetchUtilityDirect";
import { getSetTargettingValues } from "includes/helper";
import { getArticleList, getRedisDataByKey, getAQiData } from "api_dns/global/Common";
import { getWebstoryDataByCategory } from "api_dns/individual/webstories";
import { getDataWithCategoryId } from "api_dns/individual/Podcast";
import { REDIS_KEYS } from "api/Constant";

const fitIndiaProps = async (context) => {

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const headerData =
    context.req.headers && JSON.parse(JSON.stringify(context.req.headers));
  let isMobile = false;

  if (
    headerData &&
    typeof headerData["x-akamai-device-characteristics"] !== "undefined"
  ) {
    if (
      headerData &&
      headerData["x-akamai-device-characteristics"] === "is_mobile=true"
    ) {
      isMobile = true;
    }
  } else {
    const userAgent =
      context.req.headers && context.req.headers["user-agent"];
    isMobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
  }
  // console.log(isMobile);

  const currentUrl = ignoreQueryParams(protocol + host + context.req.url, false).toLowerCase();
  const urlParam = context.query;

  let articleTagResult = [];
  let bannerTagResult = [];
  const topic = 'lifestyle';
  const pageNumber = parseInt(urlParam.page) || 1;
  const pageLimit = 24;
  const offset = (pageNumber) ? (pageNumber - 1) * pageLimit : 0;
  articleTagResult =await getArticleList({
    count: pageLimit,
    offset: offset,
    fields: "display_headline,post_type,weburl,images,intro",
    filter: { "tags.slug": "lifestyle" },
  });
  bannerTagResult =await getArticleList({
    count: pageLimit,
    offset: offset,
    fields: "display_headline,post_type,weburl,images,intro",
    filter: { "tags.slug": "fit-india-movement" },
  });

  let photogallaryTagResult = [];
  if (articleTagResult !== '' && articleTagResult !== 'error') {
    photogallaryTagResult = articleTagResult.filter((data) => {
      return data.post_type === "photogallery";
    });
  }

  let categoryId ='';
  let isCategory = false;
  let categoryName = "";
  const categories_podcast = await getRedisDataByKey(REDIS_KEYS.PODCAST_DATA, true);
  let data =categories_podcast;
  data = Array.isArray(data) ? data : [];
  data.map((item) => {
    if (item.slug === "jeevan-samvad") {
      categoryId = item.ID;
      categoryName = item.name;
      isCategory = true;
    }
    return "";
  });
  // console.log(categories_podcast);
  const [
    webstories = {},
    podcastData = {},
    aqiData = {},
    eventDayData = {},
    sponsorData ={},
  ] = await Promise.all([
    getWebstoryDataByCategory({ categories: "lifestyle" }, 0, pageLimit),
    getDataWithCategoryId(categoryId, 0, pageLimit),
    getAQiData(),
    sfetchUtilityDirect(`${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:microsite_data_speaker_85&allow_prefix=false`, []),
    sfetchUtilityDirect(`${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:microsite_sponsor_1&allow_prefix=false`, []),]);

  const { siteUrl } = publicRuntimeConfig;
  let pageUrl = '';
  let page_title = '';
  let page_description = '';
  let page_keywords = '';
  let og_image_i = '';

  pageUrl = currentUrl;
  page_title = "Fit India Hit India - Get Daily Health and Wellness Tips, Mental Health, Anxiety, Women’s Health News - News18";
  page_description = `Fit India Hit India: News18 is set to bring in India’s largest digital-only 
  health initiative, focusing on health and wellness on how to build a strong immune system and all
   aspects of Mental health issues, Get Daily Health and Wellness Tips including, Women’s Health,
    depression and anxiety, Sexual Health, Diabetes, Latest Health news updates - News18.com`;
  page_keywords = `Health, Health news, Mental health issues, anxiety, spiritual health, food & nutrition,
   Mental Health, Women’s Health, Ayurveda, Sexual Health, Health Tips, Diabetes, Nutrition, Infertility,
    Fitness, Hypertension, Healthy Recipes, lifestyle articles,`;
  og_image_i = "https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/health-logo.jpg";

  const pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: (currentUrl.split('page')[0] || "").toLowerCase(),
    ogImage: og_image_i,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description
  };

  const pageAds ={};
   pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: "",
    content_type: "fit-india-hit-india",
    block_ads: "no",
  });

  const pageData = {
    isMobile,
    articleTagResult,
    bannerTagResult,
    photogallaryTagResult,
    webstories,
    podcastData,
    eventDayData,
    sponsorData,
    aqiData,
    currentUrl,
    urlParam,
    topic,
    pageSeo,
    pageAds,
    pageUrl,

  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default fitIndiaProps;
