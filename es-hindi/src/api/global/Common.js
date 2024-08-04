import { URL, REDIS_KEYS } from "api/Constant";
import { StateDistrictList } from "api/StateDistrictList";
import fetchUtility from "includes/sFetchUtility";
// import sfetchUtilityDirect from "includes/sFetchUtilityDirect";

export const getRedisDataByKey = async (
  key,
  prefix = "KHABARN18-",
  isCSRCall = false,
  baseUrl = ""
) => {
  let cache = null;
  switch (key) {
    case REDIS_KEYS.NW_HM_DATA:
      cache = {
        key: REDIS_KEYS.NW_HM_DATA,
        ttl: 1800,
      };
      break;
    case REDIS_KEYS.NEW_FMS_SYSTEM:
      cache = {
        key: REDIS_KEYS.NEW_FMS_SYSTEM,
        ttl: 900,
      };
      break;
    default:
      cache = null;
      break;
  }
  const defaultHeader =
    typeof prefix === "boolean" && prefix ? "" : prefix || "";
  const keyWithPrefix = defaultHeader + key;
  const baseURL = URL.getURL(URL.GET_REDIS_URL, isCSRCall, baseUrl);
  const data = keyWithPrefix
    ? await fetchUtility(
        `${baseURL}?key=${keyWithPrefix}&allow_prefix=${
          typeof prefix === "boolean" && prefix ? true : false
        }`,
        [],
        cache ? cache.key : null,
        cache ? cache.ttl : undefined
      )
    : {};
  return data?.[keyWithPrefix] || data;
};

export const getRedisDataByKeyWithCache = async (
  key,
  prefix = "KHABARN18-",
  isCSRCall = false,
  ttl = 24 * 60 * 60
) => {
  const defaultHeader =
    typeof prefix === "boolean" && prefix ? "" : prefix || "";
  const keyWithPrefix = defaultHeader + key;
  const baseURL = URL.getURL(URL.GET_REDIS_URL, isCSRCall);
  const data = keyWithPrefix
    ? await fetchUtility(
        `${baseURL}?key=${keyWithPrefix}&allow_prefix=${
          typeof prefix === "boolean" && prefix ? true : false
        }`,
        [],
        key,
        ttl
      )
    : {};
  return data?.[keyWithPrefix] || data;
};

/**
 *
 * @param {*} section  section name for get data
 * @param {*} subSection sub section name for get data
 * @param {*} count No of Articles for get data for particular section and sub section
 * @param {*} filter this filter will be used for get data to maintain the count of articles for particular section and sub section
 * @param {*} fallback if True then given count will be fullfilled by given filter articles, otherwise only mapped articles will be returned
 * @returns
 */

export const getArticleList = async (
  {
    count = 10,
    offset = 0,
    fields = "story_id,display_headline,post_type",
    filter = false,
    sortOrder = "desc",
    sortBy = "created_at",
    section = "",
    subSection = "",
    sectionCount = "",
    sectionFilter = "",
    customURL = "",
    header = "",
    cache: { key, ttl } = { key: "", ttl: undefined },
  },
  isCSRCall = true
) => {
  const baseURL = URL.getURL(URL.GET_ARTICLE_LIST, isCSRCall, customURL);
  let queryParams = "";
  queryParams += section ? `&section=${section}` : "";
  queryParams += subSection
    ? `&subSection=${subSection ? subSection : "NA"}`
    : "";
  queryParams += sectionCount ? `&sectionCount=${sectionCount}` : "";
  queryParams += sectionFilter
    ? `&sectionFilter=${JSON.stringify(sectionFilter)}`
    : "";
  filter = typeof filter === "object" ? filter : false;
  offset = isNaN(offset) ? 0 : offset > 1000 ? 1000 : offset;
  let fieldQuery = fields ? `&fields=${fields}` : "";
  let filterQuery = filter ? `&filter=${JSON.stringify(filter)}` : "";

  const url = `${baseURL}?count=${count}&offset=${offset}${fieldQuery}${filterQuery}&sortOrder=${sortOrder}&sortBy=${sortBy}${queryParams}`;

  if (header && customURL) {
    return await fetchUtility(url, [], key, ttl, header);
  } else {
    return await fetchUtility(url, [], key, ttl);
  }
};

export const getDistricts = async () => {
  const redisData = {
    cityData: [],
    stateData: [],
  };
  const [redisStateData, redisCityData] = await Promise.all([
    getRedisDataByKeyWithCache(REDIS_KEYS.LOCAL_STATE, "KHABARN18-", true),
    getRedisDataByKeyWithCache(REDIS_KEYS.LOCAL_CATEGORY, "KHABARN18-", true),
  ]);

  const stateDataResult = Object.keys(redisStateData).map(
    (key) => redisStateData[key]
  );
  const cityDataResult = Object.keys(redisCityData).map(
    (key) => redisCityData[key]
  );

  redisData.stateData = stateDataResult;
  redisData.cityData = cityDataResult;

  return redisData;
};

export const getPriorityData = async (
  {
    count = 10,
    section = "NA",
    subSection = "NA",
    fields = "",
    filter = false,
    fallback = true,
    cache: { key, ttl } = { key: "", ttl: undefined },
  },
  isCSRCall = false
) => {
  const baseURL = URL.getURL(URL.GET_PRIORITY, isCSRCall);
  const filterQueryString =
    filter && typeof filter === "object"
      ? `&filter=${JSON.stringify(filter)}`
      : "";
  const fieldsQueryString = fields ? `&fields=${fields}` : "";
  let url = `${baseURL}?count=${count}&section=${section || "NA"}&subSection=${
    subSection || "NA"
  }${fieldsQueryString}${filterQueryString}&fallback=${fallback}`;
  let data = await fetchUtility(url, [], key, ttl);
  return data;
};

export const getWebStories = async (
  { count = 10, fields = "*", filter = {}, offset = 0, cache = {} },
  isCSRCall
) => {
  const cacheKey = cache && cache?.key ? cache?.key : "";
  const cacheTtl = cache && cache?.ttl ? cache?.ttl : "";
  const baseURL = URL.getURL(URL.GET_WEBSTORY, isCSRCall);
  const filterQueryString = filter ? `&filter=${JSON.stringify(filter)}` : "";
  if (cacheKey && cacheTtl) {
    return await fetchUtility(
      `${baseURL}?count=${count}&offset=${offset}&fields=${fields}${filterQueryString}`,
      [],
      cacheKey,
      cacheTtl
    );
  } else {
    return await fetchUtility(
      `${baseURL}?count=${count}&offset=${offset}&fields=${fields}${filterQueryString}`
    );
  }
};

export const getRedisDataWithKey = async (
  key,
  prefix = true,
  isCSR = false,
  baseUrl = ""
) => {
  const baseURL = URL.getURL(URL.GET_REDIS_URL, isCSR, baseUrl);
  const data = key
    ? await fetchUtility(`${baseURL}?key=${key}&allow_prefix=${prefix}`)
    : {};
  return data?.[key] || data;
};

export const RhsphotoStories = async (isCSRCall = false) => {
  const photoStories = await getArticleList(
    {
      count: 6,
      offset: 0,
      fields: "headline,weburl,weburl_r,images,gallery_count",
      filter: { post_type: "photogallery" },
      sortOrder: "desc",
      sortBy: "created_at",
      cache: { key: "rhs_photo_stories", ttl: 300 },
    },
    isCSRCall
  );
  return photoStories;
};

export const AllCatList = async (isCSR = false) => {
  return await getRedisDataByKey(REDIS_KEYS.CATLIST_KEY, "KHABAR:", isCSR);
};

export const getHomeTopNews = async (
  { count = 18, fields = "*", category = "" },
  isCSR = false
) => {
  let baseURL = URL.getURL(URL.TOP_NEWS, true);
  baseURL += `?count=${count}&fields=${fields}`;
  baseURL += category ? `&category=${category}` : "";
  return await fetchUtility(`${baseURL}`);
};

export const GetCategoryArticles = async (
  { filter = {}, key, cache = {} },
  isCSRCall = false
) => {
  const cacheKey = cache && cache?.key ? cache?.key : "";
  const cacheTtl = cache && cache?.ttl ? cache?.ttl : "";
  const baseURL = URL.getURL(URL.GET_CATEGORY_ARTICLE, isCSRCall);
  const url = `${baseURL}?list=${JSON.stringify(filter)}`;
  let data = null;
  if (cacheKey && cacheTtl) {
    data = await fetchUtility(url, [], cacheKey, cacheTtl);
  } else {
    data = await fetchUtility(url);
  }
  return key ? data[key] || [] : data;
};

export const getMobilelist = async (
  {
    count = 10,
    offset = 0,
    fields = "",
    filter = false,
    filterRange = false,
    sortOrder = "desc",
    sortBy = "popularity",
  },
  isCSR = false
) => {
  filter = typeof filter === "object" ? filter : false;
  filterRange = typeof filterRange === "object" ? filterRange : false;
  const baseURL = URL.getURL(URL.GET_MOBILE_LIST, isCSR);
  const url = `${baseURL}?count=${count}&offset=${offset}${
    fields ? `&fields=${fields}` : ""
  }${filter ? `&filter=${JSON.stringify(filter)}` : ""}${
    filterRange ? `&filterRange=${JSON.stringify(filterRange)}` : ""
  }&sortOrder=${sortOrder}&sortBy=${sortBy}`;

  return await fetchUtility(url);
};

export const getMobile = async (
  { fields = "*", id = "" },
  isCSRCall = false
) => {
  const baseURL = URL.getURL(URL.GET_MOBILE, isCSRCall);
  return await fetchUtility(`${baseURL}?fields=${fields}&id=${id}`);
};

export const getMobileSearch = async (
  {
    count = 10,
    offset = 0,
    fields = "*,",
    sortOrder = "desc",
    sortBy = "popularity",
    keyword = "",
  },
  isCSR = false
) => {
  const baseURL = URL.getURL(URL.GET_MOBILE_SEARCH, isCSR);
  return await fetchUtility(
    `${baseURL}?count=${count}&offset=${offset}&fields=${fields}&keyword=${keyword}&sortOrder=${sortOrder}&sortBy=${sortBy}`
  );
};

export const getPetrolDieselPrices = async (
  { city = "", limit = 1 },
  isCSR = true
) => {
  const baseURL = URL.getURL(URL.GET_PETROL_DIESEL, isCSR);
  return await fetchUtility(
    `${baseURL}?count=${limit}&fields=city_slug,petrol_diff,diesel_diff,gold_24_carat_diff,gold_22_carat_diff,silver_1_kg_diff,silver_1_gram_diff,city_name,silver_1_gram,silver_1_kg,diesel,gold_22_carat,gold_24_carat,petrol,price_date&filter=${JSON.stringify(
      { city_slug: city }
    )}&sortBy=price_date`,
    [],
    "petrol_diesel_prices",
    60 * 60
  );
};

export const getTopVideos = async (isCSR = false) => {
  // const data = await getPriorityData(
  //   {
  //     count: 3,
  //     section: "top_video",
  //     fields:
  //       "video_details,local18_video,video_id,created_at,story_id,weburl_r,youtubeid,display_headline,images,post_type,tags,publish_by,weburl,headline",
  //     fallback: false,
  //   },
  //   isCSR
  // );

  const data = await getArticleList(
    {
      filter: { post_type: "videos", not: { nw_auto_yt_video_type: "shorts" } },
      count: 3,
      offset: 0,
      fields:
        "video_details,video_id,created_at,story_id,weburl_r,youtubeid,display_headline,local18_video,images,post_type,tags,publish_by,weburl,headline",
    },
    isCSR
  );
  const local18_data = await getArticleList(
    {
      filter: {
        "video_details.type": "Hyperlocal",
        not: "{local18_video: '' }",
      },
      count: 5 - data.length,
      offset: 0,
      fields:
        "video_details,video_id,created_at,story_id,weburl_r,youtubeid,display_headline,local18_video,images,post_type,tags,publish_by,weburl,headline",
    },
    isCSR
  );
  return [...data, ...local18_data];
};

export const getAuthorName = async (
  {
    count = 10,
    offset = 0,
    fields = "id,english_name,hindi_name,slug",
    sortOrder = "asc",
    sortBy = "english_name",
    filter = {},
  },
  isCSR = false
) => {
  const baseURL = URL.getURL(URL.GET_AUTHOR_LIST, isCSR);
  return await fetchUtility(
    `${baseURL}?count=${count}&offset=${offset}&fields=${fields}&sortOrder=${sortOrder}&sortBy=${sortBy}&filter=${JSON.stringify(
      filter
    )}`
  );
};

export const getTagsSearchList = async (val) => {
  const baseURL = URL.getURL(URL.GET_TAGS_LIST, true);
  return await fetchUtility(`${baseURL}?filter={"wildcard":"*${val}*"}`);
};

const replaceHost = (url) => {
  url = url.replace(
    "https://betahindi.news18.com/",
    "https://hindi.news18.com/"
  );
  url = url.replace(
    "https://stghindi.news18.com/",
    "https://hindi.news18.com/"
  );
  url = url.replace("http://localhost:3050/", "https://hindi.news18.com/");
  return url;
};

export const getRedirectionApi = async (current_url) => {
  current_url = replaceHost(current_url);
  // console.log(current_url);
  // console.log(`${publicRuntimeConfig.apiUrl}/getredirectUrls/`);

  try {
    const baseURL = URL.getURL(URL.GET_REDIRECTION_URL);
    const redUrldData = await fetchUtility(`${baseURL}?id=${current_url}`);

    if (typeof redUrldData !== "object") {
      // console.log("redUrldData is not an object.");
      return false;
    }

    if (!Array.isArray(redUrldData)) {
      // console.log("redUrldData is not an array.");
      return false;
    }

    const dataArray = redUrldData || []; //Object.values(redUrldData);
    const fda = dataArray.filter(
      (c) => replaceHost(c.request_url) === current_url
    );

    return fda.length > 0 ? fda[0].destination_url : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getArticleAdjacents = async ({
  fields = "story_id,display_headline,images,weburl_r",
  created_at = "",
  filter = false,
  article_id = "",
  customURL = "",
}) => {
  const baseURL = URL.getURL(URL.GET_ARTICLE_ADJACENTS, true, customURL);
  filter = typeof filter === "object" ? filter : false;
  let fieldQuery = fields ? `&fields=${fields}` : "";
  let filterQuery = filter ? `&filter=${JSON.stringify(filter)}` : "";

  const url = `${baseURL}?article_id=${article_id}&created_at=${created_at}&${fieldQuery}${filterQuery}`;
  return await fetchUtility(url, []);
};

export async function getVideoStreamData(
  articleData,
  isSSR = false,
  streamConfigData = null
) {
  let vidStreamData = {};
  if (vidStreamData?.data?.videos?.[0]?.source?.length) {
    let streamConfig = streamConfigData;
    try {
      if (
        articleData?.video_details &&
        Object.keys(articleData?.video_details).length > 0
      ) {
        vidStreamData = {
          success: true,
          message: "Success!",
          data: { videos: [articleData?.video_details] },
        };
        if (!streamConfig) {
          streamConfig = await getRedisDataByKeyWithCache(
            "s3-video-config",
            "KHABARN18-",
            !isSSR
          );
        }
        vidStreamData = processStreamData(
          vidStreamData,
          articleData,
          streamConfig
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  return vidStreamData;
}
export function processStreamData(vidStreamData, articleData, streamConfig) {
  if (vidStreamData?.data.videos[0]?.mongo_id) {
    vidStreamData.data.videos[0]._id = vidStreamData.data.videos[0].mongo_id;
  }
  if (vidStreamData?.data.videos[0]?.source) {
    vidStreamData.data.videos[0].sources = vidStreamData.data.videos[0].source;
  }
  if (
    vidStreamData?.data?.videos?.[0] &&
    !vidStreamData?.data?.videos?.[0]?.ad_tag
  ) {
    if (
      !vidStreamData?.data?.videos?.[0]?.ad_tag_desktop &&
      !vidStreamData?.data?.videos?.[0]?.ad_tag_pwa
    ) {
      vidStreamData.data.videos[0].ad_tag_desktop =
        streamConfig?.ad_tag_desktop;
      vidStreamData.data.videos[0].ad_tag_pwa = streamConfig?.ad_tag_pwa;
    }
  }
  if (
    vidStreamData?.data?.videos?.[0] &&
    !vidStreamData?.data?.videos?.[0]?.player
  ) {
    vidStreamData.data.videos[0].player = streamConfig?.player;
  }
  if (vidStreamData?.data?.videos?.[0] && articleData?.images_all_sizes?.url) {
    vidStreamData.data.videos[0].thumbnail = articleData?.images_all_sizes?.url;
  }
  if (articleData?.youtubeid) {
    vidStreamData.data.videos[0].youtube = { id: articleData?.youtubeid };
  }
  return vidStreamData;
}

export const getEngDistrictList = async () => {
  // const baseURL = URL.getURL(URL.GET_REDIS_URL, false, publicRuntimeConfig.engApiUrl );
  // const data = await fetchUtility(
  //       `${baseURL}?key=NEWS18:nw_districts_data&allow_prefix=false`,
  //       [],
  //     );

  return StateDistrictList;
};
export const getGoogleConfig = async () => {
  const baseURL = URL.getURL(URL.GET_CONFIG);
  const data = await fetchUtility(
    `${baseURL}`,
    [],
    "get_google_config_data",
    21600
  );
  return data || [];
};

export const RhstopStories = async ({
  count = 4,
  section = "category",
  subSection = "",
  filter = false,
  fields = "",
}) => {
  let cache = { key: `${section}_${subSection}_top_stories`, ttl: 300 };
  const data = await getPriorityData({
    count,
    section,
    subSection,
    filter,
    fields,
    cache,
  });

  return data || [];
};

export const getMenu = async (isMobile = false, isAmp = false) => {
  const baseURL = URL.getURL(URL.GET_COMMON_MENU);
  const data = await fetchUtility(
    `${baseURL}${
      isAmp ? "?isAmp=true" : isMobile ? "?isAmp=true" : "?isDesktop=true"
    }`,
    {},
    `menu_data${isMobile ? "_mobile" : isAmp ? "_amp" : "_desktop"}`,
    21600
  );
  return data;
};

export const getArticleListWithFilterRange = async (
  {
    count = 10,
    offset = 0,
    fields = "story_id,display_headline,post_type",
    filter = false,
    filterRange = "",
    sortOrder = "desc",
    sortBy = "created_at",
    customURL = "",
    header = "",
    source = "story_webstory",
    cache: { key, ttl } = { key: "", ttl: undefined },
  },
  isCSRCall = false
) => {
  const baseURL = URL.getURL(URL.GET_ARTICLE_LIST, isCSRCall, customURL);
  offset = isNaN(offset) ? 0 : offset > 1000 ? 1000 : offset;
  const fieldQuery = fields ? `&fields=${fields}` : "";
  const filterRangeQuery = `&filterRange=${JSON.stringify(filterRange)}`;
  const filterQuery = `&filter=${JSON.stringify(filter)}`;
  const url = `${baseURL}?source=${source}&count=${count}&offset=${offset}${fieldQuery}${filterRangeQuery}${filterQuery}&sortOrder=${sortOrder}&sortBy=${sortBy}`;
  if (header && customURL) {
    return await fetchUtility(url, [], key, ttl, header);
  } else {
    return await fetchUtility(url, [], key, ttl);
  }
};
export const getArticleListWithCount = async (
  { countOption = false, filterRange = "", filter = "" },
  isCSRCall = false
) => {
  const baseURL = URL.getURL(URL.GET_ARTICLE_LIST, isCSRCall);
  const filterRangeQuery = `&filterRange=${JSON.stringify(filterRange)}`;
  const filterQuery = `&filter=${JSON.stringify(filter)}`;
  const url = `${baseURL}?countOption=${countOption}${filterRangeQuery}${filterQuery}`;
  const data = await fetchUtility(url, []);
  return data;
};
export const getWebStoryWithCount = async (
  { countOption = false, filterRange = "" },
  isCSRCall = false
) => {
  const baseURL = URL.getURL(URL.GET_WEBSTORY, isCSRCall);
  const filterRangeQuery = `&filterRange=${JSON.stringify(filterRange)}`;
  const url = `${baseURL}?countOption=${countOption}${filterRangeQuery}`;
  const data = await fetchUtility(url, []);
  return data;
};

export const getCricketData = async (queryString, lng = "hi") => {
  const url =
    lng === "en"
      ? `${URL.CRICKET_NEXT_APIURL_ENG_CSR}${queryString}`
      : `${URL.CRICKET_NEXT_APIURL}${queryString}`;
  return await fetchUtility(url, []);
};
