import getConfig from "next/config";
import { getSetTargettingValues, checkDevice } from "includes/helper";
import { shortvideos as categoryAds } from "includes/Desktop/dfpAdIds";
import { shortvideos as categoryMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import {
  jsonLdForVideoObject,
  jsonLdForHomeOrganization,
} from "includes/schema.util";
import { getArticleByIdFields } from "api_dns/individual/Article";
import {
  getArticleList,
  getRedisDataByKeyWithCache,
  getVideoStreamData,
} from "api_dns/global/Common";

const { publicRuntimeConfig } = getConfig();

const svConsumptionProps = async (context) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const urlParam = context.query;
  const id = urlParam.video_id;

  const homeText = "Hindi News",
    videosText = "Videos";

  let breadCrumbArray = [];
  let tempobj = {};

  tempobj = [
    { slug: "/", value: homeText },
    { slug: "/videos/", value: videosText },
  ];

  breadCrumbArray = tempobj;
  const articleData = await getArticleByIdFields(id, "short_video");

  if (!articleData || !Object.keys(articleData).length) {
    return {
      notFound: true,
    };
  }
  const category =
    articleData.categories?.length > 1
      ? articleData?.categories?.[articleData?.categories?.length - 1]
      : articleData?.categories?.[0];

  const nextData = await (category
    ? getArticleList({
        filter: {
          "categories.slug": category.slug,
          post_type: "videos",
          not: { story_id: articleData.story_id },
        },
        fields:
          "display_headline,video_details,auto_youtube_import,images,intro,story_id,weburl_r,youtubeid,post_type,images_all_sizes,weburl",
      })
    : getArticleList({
        filter: {
          "categories.slug": "short-videos",
          post_type: "videos",
          not: { story_id: articleData.story_id },
        },
        fields:
          "display_headline,video_details,auto_youtube_import,images,intro,story_id,weburl_r,youtubeid,post_type,images_all_sizes,weburl",
      }));

  const streamConfig = await await getRedisDataByKeyWithCache(
    "s3-video-config",
    "KHABARN18-",
    false
  );

  let vidStreamData = {},
    vid_exist = false;
  if (publicRuntimeConfig.inHousePlayer) {
    vidStreamData = await getVideoStreamData(articleData, true, streamConfig);
    if (vidStreamData && Object.keys(vidStreamData).length > 0) {
      vid_exist = true;
    }
  }
  articleData.vidStreamData = vidStreamData;
  articleData.vid_exist = vid_exist;

  const allData = [articleData];

  nextData.forEach(async (article) => {
    if (
      article.video_details &&
      Object.keys(article?.video_details).length > 0
    ) {
      const vidStreamArticleData = await getVideoStreamData(
        article,
        true,
        streamConfig
      );
      let videoExist = false;
      if (vidStreamData && Object.keys(vidStreamData).length > 0) {
        videoExist = true;
      }
      const articlesListData = {
        ...article,
        vidStreamData: vidStreamArticleData,
        vid_exist: videoExist,
      };
      allData.push(articlesListData);
    }
  });

  // let page_title, page_description, page_keywords, page_url, thumbnailUrl;
  const page_title = articleData?.headline,
    page_description = articleData?.meta_description,
    page_keywords = articleData?.meta_keyword;

  const { siteUrl } = publicRuntimeConfig;
  const thumbnailUrl =
    "https://images.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png";
  const pageSeo = {
    title: page_title || "404 Not Found",
    description: page_description || "404 Not Found",
    keywords: page_keywords || "404 Not Found",
    canonical: currentUrl.split("page")[0],
    page:"short videos",
    og_image: thumbnailUrl,
    pageUrl: siteUrl,
    og_title: page_title,
    og_description: page_description || "404 Not Found",
    section: "short-video",
    pageName: "consumption",
  };

  pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || "";
  pageSeo.jsonLdForVideoObject =
    jsonLdForVideoObject(articleData, page_description) || "";

  //schema related code starts here
  const pageAds = {};
  isMobile ? categoryMobileAds(urlParam, false) : categoryAds(urlParam, false);

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: page_title,
    description: page_description,
    seo_keywords: page_keywords,
    weburl: currentUrl,
    section: "short-video",
    content_type: "short-video",
    block_ads: "no",
    meta_keywords: page_keywords,
    header: page_title,
  });

  const articleCategory = articleData?.categories;
  const svCategory = urlParam?.section
    ? articleCategory.find((articleCat) => articleCat.name === "Originals")
    : articleCategory?.[0];
  const pageData = {
    pageSeo,
    breadCrumbArray,
    articleData,
    category: svCategory || [],
    allData,
    currentUrl,
    isMobile,
    vidStreamData,
    section:"short-video",
    vid_exist,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};

export default svConsumptionProps;
