import { URL } from "api/Constant";
import {
  getArticleList,
  getHomeTopNews,
  getPriorityData,
} from "api/global/Common";

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

export const getTopNews = async (
  count = 16,
  fields = "related_story,updated_at,display_headline,images,weburl,post_type,ff_source,local18_video,gif_n18_images,ff_source,showRelatedArticle,liveblog_end_time,liveblog_start_time,liveblog_switcher,local18_video,headline,weburl_r,id,hindi_title,blog_title,feature_img,web_url,web_url_r"
) => {
  return await getHomeTopNews({
    count: count,
    fields: fields,
  });
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
