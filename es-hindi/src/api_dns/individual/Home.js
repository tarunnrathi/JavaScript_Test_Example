import { REDIS_KEYS, URL } from "api/Constant";
import {
  getArticleList,
  getDataByRedisKey,
  getHomeTopNews,
  getPriorityData,
} from "api_dns/global/Common";
import fetchUtility from "../sFetchUtility";

export const getTopSpecialWidget = async () => {
  const topspecialwidgetQString = `key=${REDIS_KEYS.TOP_SPECIAL_WIDGET}&allow_prefix=false`;
  const result = await getDataByRedisKey(topspecialwidgetQString);
  return result?.topspecialwidget || {};
};

export const getTopNews = async () => {
  const articleCount = 16;
  return await getHomeTopNews({
    count: articleCount,
    fields:
      "story_id,related_story,updated_at,display_headline,images,weburl,post_type,ff_source,local18_video,gif_n18_images,ff_source,showRelatedArticle,liveblog_end_time,liveblog_start_time,liveblog_switcher,local18_video,headline,weburl_r,id,hindi_title,blog_title,feature_img,web_url,web_url_r",
  });
};

export const getArticles = async (
  { count = 6, category, cache = {} },
  isCSRCall = false
) => {
  return await getArticleList(
    {
      count: count,
      filter: { "categories.slug": category },
      fields: "story_id,headline,images,display_headline,weburl,weburl_r",
      cache,
    },
    isCSRCall
  );
};

export const getArticlesByPriorityData = async (
  { count, subSection, filter, section = "home", cache = {} },
  isCSRCall = false
) => {
  const filterParam = filter ? filter : "";
  return await getPriorityData(
    {
      count: count,
      section: section,
      subSection: subSection,
      fields:
        "story_id,headline,images,display_headline,weburl,intro,post_type,gallery_count,weburl_r,author_byline",
      filter: filterParam,
      cache,
    },
    isCSRCall
  );
};

export const getArticleListAPIUrl = (
  count = 6,
  category,
  isCSRCall = false
) => {
  const filter = { "categories.slug": category };
  return `${URL.getURL(
    URL.GET_ARTICLE_LIST,
    isCSRCall
  )}?count=${count}&offset=0&fields=story_id,headline,images,display_headline,weburl,weburl_r&filter=${JSON.stringify(
    filter
  )}`;
};

export const getDynamicBanner = async () => {
  const queryString = `key=KHABARN18-${REDIS_KEYS.HOMEPAGE_DYNAMIC_BANNER}&allow_prefix=false`;
  const result = await getDataByRedisKey(queryString);
  return Object.values(result)[0] || {};
};

export const getStateArray = async () => {
  const queryString = `key=${REDIS_KEYS.HOMEPAGE_STATE_MENU}&allow_prefix=true`;
  const result = await getDataByRedisKey(queryString);
  return result?.nw_home_state_menu?.state_widget || [];
};

export const getEventSlider = async ({
  offset = 0,
  count = 18,
  cache = {},
}) => {
  const cacheKey = cache && cache?.key ? cache?.key : "";
  const cacheTtl = cache && cache?.ttl ? cache?.ttl : "";
  const baseURL =
    URL.getURL(URL.GET_EVENT_SLIDER) +
    `?name=specialeventwidget&offset=${offset}&count=` +
    count;
  if (cacheKey && cacheTtl) {
    return await fetchUtility(`${baseURL}`, [], cacheKey, cacheTtl);
  } else {
    return await fetchUtility(`${baseURL}`);
  }
};
