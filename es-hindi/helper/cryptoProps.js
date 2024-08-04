import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import fetchUtilityDirect from "includes/sFetchUtilityDirect";
import { ignoreQueryParams } from "includes/_app.util";
import { checkDevice } from "includes/helper";

const cryptoProps = async (context) => {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const isMobile = checkDevice(context);

  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  ).toLowerCase();
  const urlParam = context.query;
  const [
    zepayMarketInfo = {},
    videoData = {},
    tag_data = {},
    zPayWidgetData = {},
    webinarData = {},
  ] = await Promise.all([
    fetchUtilityDirect(
      `https://www.zebapi.com/pro/v1/market?group=singapore`,
      [],
      "zebpay-data"
    ),
    /* /get-redis-data/KHABARN18-nw_zebpay_data, */ {},
    [],
    {},
    {},
  ]);

  const { siteUrl } = publicRuntimeConfig;
  let pageUrl = "";
  const topicName = "";
  const h2Tag = "";
  let page_title = "";
  let page_description = "";
  let page_keywords = "";
  let og_image_i = "";

  pageUrl = currentUrl;
  page_title =
    "Cryptocurrency Price, News, Videos, Buy and Sell Information at News18 Hindi";
  page_description =
    "Cryptocurrency (क्रिप्टोकरेंसी): Get the latest news and Cryptocurrency Prices in India, Know about the Bitcoin, dogecoin, shiba rates in INR. Know how to buy sell Cryptocurrency and more.";
  page_keywords =
    "Cryptocurrency, क्रिप्टोकरेंसी, Bitcoin News, Cryptocurrency news, Bitcoin News, Cryptocurrency price";
  og_image_i =
    "https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/images/og-img.jpg";

  const pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description,
    keywords: page_keywords,
    canonical: (currentUrl.split("page")[0] || "").toLowerCase(),
    ogImage: og_image_i,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description,
  };

  const imageWidth = isMobile ? "153" : "219";
  const imageHeight = isMobile ? "123" : "147";

  const pageData = {
    currentUrl,
    urlParam,
    imageWidth,
    imageHeight,
    pageSeo,
    zepayMarketInfo,
    videoData,
    tag_data,
    zPayWidgetData,
    webinarData,
    isMobile,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default cryptoProps;
