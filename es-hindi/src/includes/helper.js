// import your default seo configuration
// import SITE_CONFIG from 'config/site.config';
import getConfig from "next/config";
import fetchUtility from "./sFetchUtility";

const { publicRuntimeConfig } = getConfig();

const get_static_img = (src, width = "", height = "") => {
  let stg = "";
  if (publicRuntimeConfig.siteEnv == "stg") {
    stg = "staging/";
  }
  const flag = true;
  let img = "";
  if (flag && src) {
    const image = src.replace(/http(s)?:\/\/[a-zA-Z\.\-0-9\/]+\/uploads\//, "");
    if (image.includes("http://lbimg.in.com/LiveBlog")) {
      if (width == "" && height == "") {
        img = `${image}`;
      } else {
        img = `${image}?impolicy=website&width=${width}&height=${height}`;
      }
    } else if (width == "" && height == "") {
      img = `https://images.news18.com/ibnkhabar/uploads/${image}`;
    } else {
      img = `https://images.news18.com/ibnkhabar/uploads/${image}?impolicy=website&width=${width}&height=${height}`;
    }
  } else {
    img = src;
  }
  img = img
    ? img.replace("https://images.news18.com/stgrevamp-hindi/", "")
    : img;

  img =
    img == ""
      ? "https://images.news18.com/static-guju/uploads/2017/12/default1.jpg"
      : img;

  return img;
};
const get_site_link = (src = "") => {
  src = src.replace(publicRuntimeConfig.siteUrl, "");
  src = src.replace(publicRuntimeConfig.mainUrl, "");
  return src;
};
const check_trending_tags = (trending_tags, page = "index") => {
  let data_set;
  const page_path_array = ["index", "category", "tag", "article"];

  const json_key = {
    index: "home",
    category: "categories",
    tag: "events",
    article: "categories",
  };

  const get_page_script = page;
  if (page_path_array.includes(get_page_script)) {
    if (typeof trending_tags[json_key[get_page_script]] !== "undefined") {
      data_set = json_key[get_page_script];
      return data_set;
    } else {
      data_set = json_key[get_page_script];
      return data_set;
    }
  } else {
    data_set = "events";
    return data_set;
  }
};
const all_states = (state = "", key = "") => {
  const states = {
    ahmedabad: "અમદાવાદ",
    "north-gujarat": "ઉત્તર ગુજરાત",
    "madhya-gujarat": "મધ્ય ગુજરાત",
    "south-gujarat": "દક્ષિણ ગુજરાત",
    "kutchh-saurastra": "કચ્છ-સૌરાષ્ટ્ર",
  };

  if (state == "") {
    return key == "" ? states : Object.keys(states);
  } else {
    return states[state];
  }
};
const timeAgo = (date, timeStamp = false) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const current = new Date();

  if (timeStamp) {
    date = new Date(date * 1000);
  }

  const elapsed = current - date;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};
const formattedApiUrl = (url, is_live = false) => {
  return url + "?is_live=" + is_live;
};
const getSetTargettingValues = function (data) {
  const adTargetingValues = {};

  const title = data.headline;
  const { description } = data;
  const { seo_keywords } = data;
  const { weburl } = data;
  const article_id =
    typeof data.article_id !== "undefined" ? data.article_id.toString() : "";
  const { section } = data;
  const AdStatusflag = data.block_ads;
  const { content_type } = data;

  if (article_id) {
    // adTargetingValues['contextual_description'] = '';
    adTargetingValues["article_id"] = article_id;
  }

  if (section) {
    adTargetingValues["section_name"] = section;
  }

  if (content_type) {
    adTargetingValues["content_type"] = content_type||"";
  }

  adTargetingValues["meta_keywords"] = seo_keywords||"";
  adTargetingValues["title_name"] = title||"";
  //adTargetingValues['Content_Type'] = section;
  adTargetingValues["DFP"] = "okay";
  if (AdStatusflag == "yes") {
    adTargetingValues["DFP"] = "flagged";
  }
  adTargetingValues["page_url"] = weburl;
  adTargetingValues["excerpt_description"] = description||"";
  adTargetingValues["city"] = data.city || "";
  adTargetingValues["State"] = data.State || "";
  return adTargetingValues;
};
const addDefaultSrc = (event) => {
  event.target.src =
    "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg";
};
const checkDevice = (context) => {
  const { headers } = context?.req || {};
  let isMobile = false;
  if (
    "x-akamai-device-characteristics" in headers &&
    headers["x-akamai-device-characteristics"] === "is_mobile=true"
  ) {
    isMobile = true;
  }
  return isMobile;
};
const getBudgetGlobalData = async () => {
  const [Eventswitches = {}, EventHighlights = {}, salesBanner] =
    await Promise.all([{}, {}, {}]);

  const bannerData = Object.values(salesBanner);
  let isHomePage = false;
  let isAllPages = false;
  let isBudget = false;
  let headerSponsorData = {};
  let showBannerInHome = false;

  const budgetData = bannerData.filter(
    (item) => item.campagin_name == publicRuntimeConfig.budgetCompaninName
  );
  if (budgetData.length) {
    if (budgetData[0].home_page == "1") {
      isHomePage = true;
      showBannerInHome = true;
    }
    if (budgetData[0].show_all_page == "1") {
      isAllPages = true;
    }
    if (budgetData[0].Event_Page == "/budget/") {
      isBudget = true;
    }
  }

  headerSponsorData = {
    isHomePage,
    isAllPages,
    isBudget,
    budgetData: budgetData[0],
  };

  return {
    Eventswitches,
    EventHighlights,
    headerSponsorData,
  };
};

// const getPhotoStoriesWithCount = (photoStories) => {
//     const photoCountRhs = photoStories.map((item) => {
//         let article_data;
//         let gallery;
//         if(item?.article_data) {
//             article_data = JSON.parse(item?.article_data);
//             gallery = article_data?.gallery;
//         } else {
//             gallery = item?.gallery;
//         }
//         return {
//           ...item,
//           count: gallery.length
//         };
//     });
//     return photoCountRhs;
// };

export {
  get_static_img,
  get_site_link,
  check_trending_tags,
  all_states,
  timeAgo,
  formattedApiUrl,
  getSetTargettingValues,
  addDefaultSrc,
  checkDevice,
  getBudgetGlobalData,
};
