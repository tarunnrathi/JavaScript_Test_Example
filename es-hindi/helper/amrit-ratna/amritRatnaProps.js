import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { ignoreQueryParams } from "includes/article.util";
import sfetchUtilityDirect from "includes/sFetchUtilityDirect";
import { getSetTargettingValues } from "includes/helper";
import { getArticleList } from "api_dns/global/Common";

const amritRatnaProps = async (context) => {

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  const currentUrl = ignoreQueryParams(protocol + host + context.req.url, false).toLowerCase();

  const pageLimit = 24;
  const offset = 0;
  let [
    articleTagResult =[],
  photogallaryTagResult = [],
  videosTagResult = [],
  amritRatnaRedisData={},
  amritRatnaAjendaData={},
  amritRatnaOverviewData={},
]= await Promise.all([
  getArticleList({
    count: pageLimit, offset: offset, fields: "display_headline,post_type,weburl,images,intro",
    filter: { post_type: "text", "tags.slug": "amrit-ratna-2023" },
  }),
  getArticleList({
    count: pageLimit, offset: offset, fields: "display_headline,post_type,weburl,images,intro",
    filter: { post_type: "photogallery", "tags.slug": "amrit-ratna-2023" },
  }),
  getArticleList({
    count: pageLimit, offset: offset, fields: "display_headline,post_type,weburl,images,intro",
    filter: { post_type: "videos", "tags.slug": "amrit-ratna-2023" },
  }),
  sfetchUtilityDirect(`${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:microsite_data_speaker_290&allow_prefix=false`, []),
  sfetchUtilityDirect(`${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:tata_power_conclave_event_1693180800&allow_prefix=false`, []),
  sfetchUtilityDirect(`${publicRuntimeConfig.engApiUrl}/get-redis?key=NEWS18:tata_power_conclave_event_1695081600&allow_prefix=false`, []),
]);

  const { siteUrl } = publicRuntimeConfig;
  let page_title = '';
  let page_description = '';
  let page_keywords = '';
  let og_image_i = '';

  page_title = "Amrit Ratna Award 2023 (अमृत रत्न सम्मान) by News 18 India";
  page_description = "Amrit Ratna Award 2023 (अमृत रत्न सम्मान) by News 18 India on 10th October 2023 in Delhi";
  page_keywords = "Amrit Ratna 2023, Amrit Ratna Award 2023, 2023 Amrit Ratna, News18 India Amrit Ratna, Amrit Ratna News18 India,  amrit ratna samman";
  og_image_i = "https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/amrit-ratna/images/amrit-banner.png";

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
    content_type: "amrit-ratna-2023",
    block_ads: "no",
  });

  const pageData = {
    pageSeo,
    photogallaryTagResult,
    videosTagResult,
    articleTagResult,
    amritRatnaRedisData,
    amritRatnaAjendaData,
    amritRatnaOverviewData,
    pageAds,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default amritRatnaProps;
