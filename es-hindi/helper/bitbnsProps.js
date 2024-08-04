import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { bitbns as categoryAds } from "includes/Desktop/dfpAdIds";
import { bitbns as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { bitbnscoins as categorybitbnsAds } from "includes/Desktop/dfpAdIds";
import { bitbnscoins as categorybitbnsMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { checkDevice, getSetTargettingValues } from "includes/helper";
// import fetchUtility from "includes/sFetchUtility";
import { ignoreQueryParams } from "includes/article.util";

const bitbnsProps = async (context, pageType = "market") => {
  const isMobile = checkDevice(context);
  let userAgent = "";

  if (context.req) {
    userAgent = context.req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }
  let protocol = "https://";
  let host = context.req.headers.host;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  if (host.indexOf("127.0.0.1:3050") > -1) {
    protocol = "http://";
  }
  let currentUrl = ignoreQueryParams(protocol + host + context.req.url);
  const urlParam = context.query;
  const _param = urlParam;

  let coins = urlParam.coin || "BTC";
  coins = coins.toUpperCase();

  let page_title,
    page_description,
    page_keywords,
    slugVal = "";

  page_title =
    "क्रिप्टोकरेंसी: Cryptocurrency Prices in India Today: Bitcoin (BTC-INR) Price, Trading, Value at hindi.news18.com";
  page_description =
    "Bitcoin Price India INR: Get the latest cryptocurrency News in Hindi, Bitcoin बिटकॉइन (BTC-INR) Price, Ethereum Price, Ripple Price, Binance Price, Dogecoin & Others, the crypto market dashboard shows prices, crypto trading, क्रिप्टो मुद्रा, रियल-टाइम बाज़ार डेटा  (क्रिप्टोकरेंसी) समाचार की सभी ताज़ा खबरें ब्रेकिंग न्यूज़  इन हिंदी - hindi.news18.com";
  page_keywords =
    "क्रिप्टोकरेंसी, बिटकॉइन की कीमत, क्रिप्टो मुद्रा,  bitcoin price in inr, Cryptocurrency News Today in Hindi, bitcoin price, Ethereum Value, bitcoin price in india, btc to inr, bitcoin price in india 2022, compare bitcoin, dogecoin, stellar, tron, litecoin, ripple, ethereum, iota prices in india, cryptocurrency price in india, Bitcoin value, भारत में बिटकॉइन की कीमत,";

  let bredCrumb = "";
  let breadCrumbArray = [];
  let tempobj = {};
  let homeText = "Hindi News"; //'होम';

  const ucwords = (str) => {
    return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  };

  let thumbnailUrl = "";

  let siteUrl = publicRuntimeConfig.siteUrl;
  let news = siteUrl + "news/";
  let pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: currentUrl.split("page")[0],
    og_image: thumbnailUrl,
    news: news,
    cat: "Microsite",
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
  };

  const pageAds = isMobile
    ? pageType == "market"
      ? categoryMobileAds(urlParam, false)
      : categorybitbnsMobileAds(urlParam, false)
    : pageType == "market"
    ? categoryAds(urlParam, false)
    : categorybitbnsAds(urlParam, false);
  //  console.log(pageAds)
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    content_type: "News",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
  });

  let [
    menuData = {},
    topNews = [],
    exnews = {},
    miscData = {},
    footerData = [],
    photoStories = [],
    topStories = [],
    astroStories = {},
    latestNewsStories = [],
    googleRemoteConfig,
    // districtList = {},
    iplAuctionList = {},
  ] = await Promise.all([
    isMobile ? [] : {},
    isMobile ? {} : {},
    {},
    {},
    isMobile ? {} : {},
    [],
    [],
    [],
    [],
    !isMobile ? [] : [],
    {},
    [],
    {},
  ]);

  const pageData = {
    menuData,
    topNews,
    exnews,
    miscData,
    pageAds,
    pageSeo,
    bredCrumb,
    breadCrumbArray,
    footerData,
    photoStories,
    topStories,
    latestNewsStories,
    // districtList,
    astroStories,
    trendingTags: miscData.trendingTags || [],
    coins,
    isbitbns: true,
    config: googleRemoteConfig,
    iplAuctionList,
    isMobile,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default bitbnsProps;
