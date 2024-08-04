import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { ignoreQueryParams } from "includes/article.util";
import sfetchUtilityDirect from "includes/sFetchUtilityDirect";
import { getArticleList } from "api_dns/global/Common";

const electralProps = async (context, isMobile = false) => {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false,
  ).toLowerCase();
  const urlParam = context.query;
  let topic = (urlParam.topic || "").toLowerCase();
  let tagResult = [];
  topic = "hydrationforhealth";
  const pageNumber = parseInt(urlParam.page) || 1;
  const pageLimit = isMobile ? 16 : 24;
  const limit = pageLimit;
  const offset = pageNumber ? (pageNumber - 1) * pageLimit : 0;
  const query_arr = { post_type: "text", "tags.slug": "hydrationforhealth" };
  const fields = "display_headline,post_type,weburl,images,intro";
  tagResult = await getArticleList({
    count: limit,
    offset: offset,
    fields: fields,
    filter: query_arr,
  });

  // console.log(tagResult)

  const electralVideoData = await sfetchUtilityDirect(
    `${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:microsite_data_video_157&allow_prefix=false`,
    [],
  );

  const { siteUrl } = publicRuntimeConfig;
  let { pageUrl, page_title, page_description, page_keywords, og_image_i } = "";

  pageUrl = currentUrl;
  page_title =
    "Electral Hydration for Health: जानें ORS के फायदे और डिहाइड्रेशन से बचने के तरीके News18 हिंदी पर";
  page_description =
    "Network 18 and Electral - Hydration for Health Campaign: जुड़ें नेटवर्क 18 और एलेक्ट्रल के 'हाइड्रेशन फ़ॉर हेल्थ' कैंपेन से और जानें ओरल रिहाइड्रेशन सॉल्यूशन (ORS) के फायदे.";
  page_keywords =
    "Electral Powder, ORS, Energy Drink online, Oral Rehydration Solution, Hydration for Health Campaign, ओरल रिहाइड्रेशन सॉल्यूशन";
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

  const pageData = {
    tagResult,
    currentUrl,
    urlParam,
    pageUrl,
    topic,
    pageSeo,
    electralVideoData,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default electralProps;
