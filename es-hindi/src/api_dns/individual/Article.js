import { URL, getFilteredFields } from "api/Constant";
import fetchUtility from "../sFetchUtility";

export const getArticleById = async (article_id, isCSR = false) => {
  if (!article_id) {
    return {};
  }
  const baseURL = URL.getURL(URL.GET_ARTICLE_BY_ID, isCSR);
  return await fetchUtility(`${baseURL}?article_id=${article_id}`);
};

export const getArticleByIdFields = async (article_id, type = "video") => {
  if (!article_id) {
    return {};
  }
  const fields = getFilteredFields(type)
  const baseURL = URL.getURL(URL.GET_ARTICLE_BY_ID);
  return await fetchUtility(`${baseURL}?article_id=${article_id}&fields=${fields}`);
};

export const getLiveBlog = async (
  { count = "", storyId = "", date = "", dir = "prev", fields = "*" },
  isCSR = false
) => {
  const baseURL = URL.getURL(URL.GET_LIVE_BLOG, isCSR);
  const url =
    date === ""
      ? `${baseURL}?count=${count}&storyId=${storyId}&dir=${dir}&fields=${fields}`
      : `${baseURL}?count=${count}&storyId=${storyId}&date=${date}&dir=${dir}&fields=${fields}`;
  return fetchUtility(url) || {};
};

// export const getIPLStories = async (trendingStory) => {
//     let trndArticles = trendingStory.map((trstr) => trstr.article_id);
//     let storyData = [];

//     for (let id of trndArticles) {
//       try {
//         const story = await getArticleById(id);
//         if (story) {
//           storyData.push(story);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     return storyData;
//   };


