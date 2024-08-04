import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const BlogsUtil = {
  formTopicUrlParam: (url) => {
    let topicUrlParam = url;
    if (!url) {
      return;
    }
    topicUrlParam = url.replace(
      /https:\/\/(stg|beta)?hindi.news18.com\//,
      publicRuntimeConfig.siteUrl
    );
    return topicUrlParam;
  },
  formAuthorBlogsUrl: (authorName, authorId) => {
    return `/byline/${authorName}-${parseInt(
      authorId
    )}.html`;
  },
  formAuthorAMPBlogsUrl: (authorName, authorId) => {
    return `/byline/${authorName}-${parseInt(
      authorId
    )}.html`;
  },
  apiQueryFilters: {
    blogsList: "author_byline,display_headline,intro,weburl_r,created_at,updated_at,body,images,tags,images_all_sizes,nw_post_word_count",
    authorBlogs: "display_headline,images,weburl_r,author_byline",
  },
};

const timeConverter = (inputDate) => {
  const dateObj = new Date(inputDate);
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const timezone = 'IST';
  const formattedDate = `${month} ${day}, ${year} ${time} ${timezone}`;

  return formattedDate;
};

const getQuery = (cat, topic, urlParam) => {
  let subString = '';

  const post_type = cat === 'news' ? 'text' : cat === 'videos' ? 'videos' : cat === 'photogallery' ? 'photogallery' : '';
  const agency = topic !== '' ? topic : 'news18hindi';

  post_type === '' ? subString = agency === "ganeshagrace"?{ "agency_full.slug": ["ganeshagrace","ganeshas-grace"] } : { "agency_full.slug": agency } : subString = { post_type, "agency_full.slug": agency };

  if (topic === '' && cat === '' && urlParam === '') {
    subString = { 'agency_full.slug': 'news18hindi' };
  }

  return subString;
};

/**
install
@ColorHighlight
vs code extension to view the colors
*/

const BlogsCssGlobalVariables = {
  colors: {
    red: "#ea2320",
    lightRed: "#eb3d3c",
    darkRed: "#c0221f",

    white: "#fff",
    lightWhite: "#f7f7f7",
    fadedWhite: "#ebebeb",

    black: "#111",
    lightBlack: "#222",
    fadedBlack: "#333",

    grey: "#999",
    lightGrey1: "#6d6d6d",
    lightGrey2: "#dbdbdb",
    fadedGrey: "#313131",
    ash: "#bebdbd",

    darkSkyBlue: "#34a8fd",
    lightSkyBlue: "#3b5a9a",
  },
};
export { BlogsUtil, BlogsCssGlobalVariables, timeConverter, getQuery };
