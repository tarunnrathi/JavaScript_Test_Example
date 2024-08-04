import {
  limitChar,
  replaceSpecialChars,
  stripTags,
  imageDomainChanger,
} from "./article.util";
import getConfig from "next/config";
import empty from "./empty";
import moment from "moment";
import str_replace from "./str_replace";
import { getInningData } from "./ipl.helper";

const { publicRuntimeConfig } = getConfig();

const strip_tags = (str) => {
  return str.replace(/(<([^>]+)>)/gi, "");
};

const htmlspecialchars = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
};

const blogNiceDate = (
  date,
  schema = false,
  timeStamp = false,
  addHours = "",
) => {
  if (typeof date !== "undefined") {
    if (timeStamp) {
      date = new Date(date * 1000);
    } else {
      const splitTime = date.split("");
      if (splitTime.length > 13) {
        date =
          splitTime[0] +
          splitTime[1] +
          splitTime[2] +
          splitTime[3] +
          "-" +
          splitTime[4] +
          splitTime[5] +
          "-" +
          splitTime[6] +
          splitTime[7] +
          " " +
          splitTime[8] +
          splitTime[9] +
          ":" +
          splitTime[10] +
          splitTime[11] +
          ":" +
          splitTime[12] +
          splitTime[13];
      }
      date = new Date(date);
    }
    // let minutes = date.getMinutes();
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    // let month = date.getMonth()
    // month = month < 10 ? '0'+month: month
    if (schema) {
      if (addHours != "") {
        date.setHours(date.getHours() + 20);
      }
      return moment(date).tz("Asia/Kolkata").format("YYYY-MM-DDTHH:mm:ss");
      // return date.getFullYear() +"-"+ month +"-"+ date.getDate() +" "+ date.getHours() +":"+ minutes +":"+ date.getSeconds()
    } else {
      return moment(date).tz("Asia/Kolkata").format("HH:mm") + " (IST)";
      // return date.getHours()+":"+minutes + ' (IST)';
    }
  }
};

const jsonLdForArticleConsumption = (
  post_data = [],
  blogFeedAllTitle = "",
  isAmp,
  keywords,
) => {
  const json_ld_array = {};
  if (typeof post_data !== "undefined" && Object.keys(post_data).length > 0) {
    let article_headline =
      typeof post_data["article_headline"] !== "undefined"
        ? post_data["article_headline"]
        : post_data["headline"];
    if (
      typeof post_data["article_headline"] !== "undefined" &&
      post_data["article_headline"] != ""
    ) {
      article_headline = post_data["article_headline"];
    } else {
      article_headline = post_data["headline"] || post_data["title"];
    }
    let auther_name = "";
    let authorLink = "";
    const liveBlogSwitch = post_data["liveblog_switcher"];
    const authline =
      post_data["author_byline"] && post_data["author_byline"][0];
    if (
      typeof post_data["reported_by"] !== "undefined" &&
      post_data["reported_by"] !== "" &&
      post_data["reported_by"]?.length > 0 &&
      liveBlogSwitch !== 1
    ) {
      auther_name = post_data["reported_by"][0]||"";
      authorLink = `https://hindi.news18.com/byline/${auther_name?.slug||""}-${auther_name?.id||""}.html`;
      auther_name = auther_name?.language_name;
    } else if (
      typeof post_data["written_by"] !== "undefined" &&
      post_data["written_by"] !== "" &&
      post_data["written_by"]?.length > 0 &&
      liveBlogSwitch !== 1
    ) {
      auther_name = post_data["written_by"][0]||"";
      authorLink = `https://hindi.news18.com/byline/${auther_name?.slug||""}-${auther_name?.id||""}.html`;
      auther_name = auther_name?.language_name;
    } else if (
      typeof post_data["edited_by"] !== "undefined" &&
      post_data["edited_by"] !== "" &&
      post_data["edited_by"]?.length > 0 &&
      liveBlogSwitch !== 1
    ) {
      auther_name = post_data["edited_by"][0]||"";
      authorLink = `https://hindi.news18.com/byline/${auther_name?.slug||""}-${auther_name?.id||""}.html`;
      auther_name = auther_name?.language_name;
    } else if (
      typeof post_data["translated_by"] !== "undefined" &&
      post_data["translated_by"] !== "" &&
      post_data["translated_by"]?.length > 0 &&
      liveBlogSwitch !== 1
    ) {
      auther_name = post_data["translated_by"][0]||"";
      authorLink = `https://hindi.news18.com/byline/${auther_name?.slug||""}-${auther_name?.id||""}.html`;
      auther_name = auther_name?.language_name;
    } else if (
      typeof post_data["byline"] !== "undefined" &&
      post_data["byline"] !== ""
    ) {
      auther_name = post_data["byline"];
      if (authline && authline?.nicename) {
        authorLink = `https://hindi.news18.com/byline/${authline?.nicename?.replace(
          "_",
          "-",
        )}-${authline.id}.html`;
      }
    } else {
      auther_name = "Hindi Editor";
    }

    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "NewsArticle";
    json_ld_array["mainEntityOfPage"] = {
      "@type": "WebPage",
      "@id": post_data["weburl"] || "",
    };
    json_ld_array["isPartOf"] = {
      "@type": "CreativeWork",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com",
    };

    json_ld_array["inLanguage"] = "hi";
    json_ld_array["headline"] = limitChar(article_headline, 107);
    json_ld_array["description"] = stripTags(post_data["intro"]);
    json_ld_array["keywords"] =
      keywords &&
      (Array.isArray(keywords)
        ? keywords.join(" ,")
        : keywords.split(",").slice(0, 10).join(" ,"));
    json_ld_array["articleSection"] = Array.isArray(post_data["section"])
      ? post_data["section"].length && post_data["section"][0]
      : post_data["section"];
    json_ld_array["url"] = post_data["weburl"];
    if (
      Object.keys(post_data?.images_all_sizes?.sizes || {}).length &&
      post_data.images_all_sizes.sizes?.["3x2"] &&
      post_data.images_all_sizes.sizes?.["3x2"] != ""
    ) {
      const keys =
        Object.keys(post_data?.images_all_sizes?.sizes).filter(
          (item) => item != "3x2" && item != "16x9",
        ) || [];

      const images = [
        ...keys.map((key) =>
          imageDomainChanger(post_data?.images_all_sizes?.sizes[key].url),
        ),
      ];
      json_ld_array["image"] = [
        ...images,
        imageDomainChanger(post_data?.images_all_sizes?.url),
      ];
    } else {
      json_ld_array["image"] = post_data["images"]
        ? imageDomainChanger(post_data["images"]["url"])
        : imageDomainChanger(post_data["thumbnail"]);
      json_ld_array["image"] =
        !json_ld_array["image"] || json_ld_array["image"] == ""
          ? publicRuntimeConfig.schemaImagePlaceholder
          : imageDomainChanger(json_ld_array["image"]);
      json_ld_array["image"] = new Array(3)
        .fill(json_ld_array["image"])
        .map(
          (url, ind) =>
            `${imageDomainChanger(url)}?im=FitAndFill,width=1200,height=${
              ["675", "900", "1200"][ind]
            }`,
        );
    }

    json_ld_array["datePublished"] = dateConversion(post_data["created_at"] || new Date()) ;
    json_ld_array["dateModified"] = post_data.latestTimeStamp
      ? dateConversion(post_data.latestTimeStamp)
      : dateConversion(post_data["updated_at"])
      ? dateConversion(post_data["updated_at"])
      : dateConversion(post_data["created_at"] || null);
    json_ld_array["articleBody"] = replaceSpecialChars(
      (post_data["body"] || post_data["content"] || "").replace(
        /<(.|\n)*?>/g,
        "",
      ),
    );
    json_ld_array["author"] = {
      "@type": "Person",
      name: auther_name||"",
      url: authorLink||"",
    };
    json_ld_array["publisher"] = {
      "@type": "NewsMediaOrganization",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
        width: 112,
        height: 112,
      },
    };
    // const hires = imageDomainChanger(
    //   post_data?.images_all_sizes?.sizes?.["16x9"]?.url,
    // );
    // const res43 = imageDomainChanger(
    //   post_data?.images_all_sizes?.sizes?.["4x3"]?.url,
    // );
    json_ld_array["associatedMedia"] = {
      "@type": "ImageObject",
      url:       
        `${
          // (post_data["images"]["url"]
          //   ? imageDomainChanger(post_data["images"]["url"])
          //   : imageDomainChanger(post_data["thumbnail"])) ||
          // publicRuntimeConfig.schemaImagePlaceholder
          post_data["images"]["url"]||publicRuntimeConfig.schemaImagePlaceholder }?im=FitAndFill,width=1200,height=675`,
      caption: post_data["images"] ? post_data["images"]["caption"] : "",
      description: post_data["images"] ? post_data["images"]["caption"] : "",
      // height: hires ? 900 : res43 ? 900 : 675,
      // width: hires ? 1600 : 1200,
    };
    if( (post_data["nw_post_word_count"] !== '') || (post_data?.gallery !== undefined && post_data?.gallery[0]?.word_count !== '')){
      json_ld_array["wordCount"]= `${post_data["nw_post_word_count"] || post_data?.gallery[0]?.word_count}`
    }else{
      json_ld_array["wordCount"]="";
    }
  } 
  return json_ld_array;
};

const jsonLdForWebPage = (
  name = null,
  description = null,
  keywords = null,
  url = null,
  article = {},
  isHome = false,
  isCategory = false,
  isCricketNext = false,
) => {
  const web_page_json_array = {};
  if (isHome) {
    if (
      typeof name !== "undefined" &&
      description != "" &&
      typeof url !== "undefined"
    ) {
      web_page_json_array["@context"] = "https://schema.org";
      web_page_json_array["@type"] = "WebPage";
      web_page_json_array["name"] = name;
      web_page_json_array["description"] = description;
      web_page_json_array[
        "keywords"
      ] = `Hindi news, news in hindi, breaking news in hindi, latest news in hindi, latest hindi news, 
        today news in hindi, hindi news today, News18 हिंदी, India News, India Hindi News, हिंदी समाचार, ताजा समाचार`;
      web_page_json_array["url"] = url;
      web_page_json_array["speakable"] = {
        "@type": "SpeakableSpecification",
        // cssSelector: [name, description],
      };
    }
  } else if (isCategory) {
    if (
      typeof name !== "undefined" &&
      description != "" &&
      typeof url !== "undefined"
    ) {
      web_page_json_array["@context"] = "https://schema.org";
      web_page_json_array["@type"] = "WebPage";
      web_page_json_array["name"] = name;
      web_page_json_array["description"] = description;
      web_page_json_array["keywords"] = keywords;
      web_page_json_array["url"] = url;
      web_page_json_array["speakable"] = {
        "@type": "SpeakableSpecification",
        // cssSelector: [name, description],
      };
    }
  } else {
    if (
      typeof name !== "undefined" &&
      description != "" &&
      typeof url !== "undefined"
    ) {
      web_page_json_array["@context"] = "https://schema.org";
      web_page_json_array["@type"] = "WebPage";
      (web_page_json_array["name"] =
        article?.headline ||
        article?.display_headline ||
        name ||
        "News18 हिंदी"),
        (web_page_json_array["description"] = description
          ? description
          : article.intro || "");
      if (typeof keywords !== "undefined" && keywords != "")
        web_page_json_array["keywords"] = keywords
          ?.split(",")
          ?.slice(0, 10)
          ?.join(" ,");
      web_page_json_array["url"] = url || publicRuntimeConfig.siteUrl;
      web_page_json_array["speakable"] = {
        "@type": "SpeakableSpecification",
        // cssSelector: [
        //   article?.headline || article?.display_headline || name,
        //   article?.intro || description,
        // ],
      };
    }
  }
  if (isCricketNext) {
    web_page_json_array["publisher"] = {
      "@type": "Organization",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
        width: 112,
        height: 112,
      },
    };
  }
  return web_page_json_array;
};

const jsonLdForPodcastWebPage = (
  name = null,
  description = null,
  keywords = null,
  url = null,
) => {
  const web_page_json_array = {};
  if (
    typeof name !== "undefined" &&
    description != "" &&
    typeof url !== "undefined"
  ) {
    web_page_json_array["@context"] = "https://schema.org";
    web_page_json_array["@type"] = "WebPage";
    web_page_json_array["name"] = name || "News18 हिंदी";
    web_page_json_array["description"] = description || "";
    web_page_json_array["mainEntityOfPage"] = {
      "@type": ["Thing", "WebPage"],
      "@id": url,
      name: "Podcast",
    };
    web_page_json_array["publisher"] = {
      "@type": "Organization",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
        width: 112,
        height: 112,
      },
    };
  }
  return web_page_json_array;
};

const jsonLdForImageObject = (post_data = [], blogFeedAllTitle = "") => {
  const json_ld_array = {};
  if (typeof post_data !== "undefined" && Object.keys(post_data).length > 0) {
    let article_headline =
      typeof post_data["article_headline"] !== "undefined"
        ? post_data["article_headline"]
        : post_data["headline"];
    if (
      typeof post_data["article_headline"] !== "undefined" &&
      post_data["article_headline"] != ""
    ) {
      article_headline = post_data["article_headline"];
    } else {
      article_headline = post_data["headline"] || post_data["title"];
    }
    let auther_name = "";
    if (
      typeof post_data["byline"] !== "undefined" &&
      post_data["byline"] != ""
    ) {
      auther_name = post_data["byline"];
    } else {
      auther_name = "Hindi Editor";
    }
    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "ImageObject";
    json_ld_array["author"] = {
      "@type": "Person",
      name: auther_name,
    };
    json_ld_array["description"] = stripTags(post_data["intro"]);
    json_ld_array["datePublished"] = post_data["created_at"] || null;
    const hires = imageDomainChanger(
      post_data?.images_all_sizes?.sizes?.["16x9"]?.url,
    );
    json_ld_array["url"] =
      hires ||
      `${
        (post_data["images"]
          ? imageDomainChanger(post_data["images"]["url"])
          : imageDomainChanger(post_data["thumbnail"])) ||
        publicRuntimeConfig.schemaImagePlaceholder
      }?im=FitAndFill,width=1200,height=675`;
    json_ld_array["name"] = limitChar(article_headline, 107);
  }
  return json_ld_array;
};
const jsonLdForVideoObject = (post_data = [], pageDescription) => {
  const json_ld_array = {};
  const regex = /https:\/\/www.youtube.com\/embed\/[a-zA-Z0-9-_]*/gi;
  const vid =
    post_data && post_data["body"] ? post_data["body"].match(regex) : null;

  let local18_video = false;
  if (
    typeof post_data !== "undefined" &&
    Object.keys(post_data).length > 0 &&
    post_data?.ff_source == "Hyperlocal" &&
    post_data?.local18_video != ""
  ) {
    local18_video = true;
  }
  if (
    (typeof post_data !== "undefined" &&
      Object.keys(post_data).length > 0 &&
      vid &&
      vid[0]) ||
    post_data?.video_details?.mongo_id || post_data?.youtubeid ||
    local18_video
  ) {
    let article_headline =
      typeof post_data["article_headline"] !== "undefined"
        ? post_data["article_headline"]
        : post_data["headline"];
    if (
      typeof post_data["article_headline"] !== "undefined" &&
      post_data["article_headline"] != ""
    ) {
      article_headline = post_data["article_headline"];
    } else {
      article_headline = post_data["headline"] || post_data["title"];
    }
    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "VideoObject";
    json_ld_array["name"] = limitChar(article_headline, 107);
    json_ld_array["description"] =
      stripTags(post_data["intro"]) || pageDescription;
    const hires = imageDomainChanger(
      post_data?.images_all_sizes?.sizes?.["16x9"]?.url,
    );
    json_ld_array["thumbnailUrl"] =
      hires ||
      `${
        (post_data["images"]
          ? imageDomainChanger(post_data["images"]["url"])
          : imageDomainChanger(post_data["thumbnail"])) ||
        publicRuntimeConfig.schemaImagePlaceholder
      }?im=FitAndFill,width=1200,height=675`;
    json_ld_array["uploadDate"] = dateConversion(post_data["updated_at"]);
    if (local18_video) {
      json_ld_array["contentUrl"] = post_data?.weburl;
      //json_ld_array["embedUrl"] = post_data?.weburl;
    } else {
      json_ld_array["contentUrl"] = post_data?.video_details?.mp4_path ?
        post_data?.video_details?.mp4_path.replace("https://nw18videostorage.blob.core.windows.net/", "https://media-assets.nw18.com/") : post_data?.auto_youtube_import
        ?.nw_auto_yt_feed_youtube_id
        ? `https://www.youtube.com/watch?v=${post_data?.auto_youtube_import?.nw_auto_yt_feed_youtube_id}`
        : vid?.length
        ? vid[0]
        : [];
      // json_ld_array["embedUrl"] = post_data?.auto_youtube_import
      //   ?.nw_auto_yt_feed_youtube_id
      //   ? `https://www.youtube.com/watch?v=${post_data?.auto_youtube_import?.nw_auto_yt_feed_youtube_id}`
      //   : vid[0];
    }
    // json_ld_array['contentUrl'] = post_data?.auto_youtube_import?.nw_auto_yt_feed_youtube_id ? `https://www.youtube.com/watch?v=${post_data?.auto_youtube_import?.nw_auto_yt_feed_youtube_id}`: vid[0];
    // json_ld_array['embedUrl'] = post_data?.auto_youtube_import?.nw_auto_yt_feed_youtube_id ? `https://www.youtube.com/watch?v=${post_data?.auto_youtube_import?.nw_auto_yt_feed_youtube_id}` :  vid[0];
    json_ld_array["interactionStatistic"] = {
      "@type": "InteractionCounter",
        "interactionType": { "@type": "WatchAction" },
        "userInteractionCount": Math.floor(
          Math.random() * (2271 - 2262 + 1) + 2262,
        )
    }
    json_ld_array["publisher"] = {
      "@type": "Organization",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
        width: 112,
        height: 112,
      },
    };
  }
  if (json_ld_array["thumbnailUrl"] === "") {
    json_ld_array["thumbnailUrl"] = publicRuntimeConfig.schemaImagePlaceholder;
  }
  json_ld_array["datePublished"] = post_data["created_at"] ? dateConversion(post_data["created_at"]):null;
  json_ld_array["dateModified"] =  post_data["updated_at"] ? dateConversion(post_data["updated_at"]):null; 
  return json_ld_array;
};

const jsonLdForNonYTVideoObject = (
  post_data = [],
  pageDescription,
  keywords = "",
) => {
  const json_ld_array = {};
  if (typeof post_data !== "undefined" && Object.keys(post_data).length > 0) {
    const formatDuration = (duration) =>
      moment.utc(duration.split(".")[0] * 1000).format("[T]HH[H]mm[M]ss[S]");

    let article_headline =
      typeof post_data["article_headline"] !== "undefined"
        ? post_data["article_headline"]
        : post_data["headline"];
    if (
      typeof post_data["article_headline"] !== "undefined" &&
      post_data["article_headline"] != ""
    ) {
      article_headline = post_data["article_headline"];
    } else {
      article_headline = post_data["headline"] || post_data["title"];
    }
    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "VideoObject";
    json_ld_array["name"] = limitChar(article_headline, 107);
    json_ld_array["headline"] = article_headline;
    json_ld_array["description"] =
      stripTags(post_data["intro"]) || pageDescription;
    json_ld_array["thumbnailUrl"] = post_data["images"]
      ? post_data["images"]["url"]
      : post_data["thumbnail"];
    json_ld_array["uploadDate"] = post_data["created_at"]
      ? dateConversion(post_data["created_at"]) 
      : "";
    json_ld_array["datePublished"] = post_data["created_at"]
      ? dateConversion(post_data["created_at"])  
      : "";
    json_ld_array["dateModified"] = post_data["updated_at"]
      ? dateConversion(post_data["updated_at"])  
      : post_data["created_at"]
      ? dateConversion(post_data["created_at"])   
      : "";
    json_ld_array["keywords"] = keywords;
    json_ld_array["duration"] =
      (post_data["ff_video_duration"] &&
        formatDuration(post_data["ff_video_duration"])) ||
      (post_data["ff_video_duration_s"] &&
        formatDuration(post_data["ff_video_duration_s"])) ||
      "";
    json_ld_array["url"] = post_data["weburl"] ? post_data["weburl"] : "";
    json_ld_array["contentUrl"] = post_data?.video_details?.mp4_path ?
    post_data?.video_details?.mp4_path.replace("https://nw18videostorage.blob.core.windows.net/", "https://media-assets.nw18.com/") :
      post_data["ff_video_mp4_path"] || post_data["ff_video_mp4_path_s"] || "";
    json_ld_array["embedUrl"] = post_data["weburl"];
    json_ld_array["interactionCount"] = Math.floor(
      Math.random() * (2271 - 2262 + 1) + 2262,
    );
    json_ld_array["publisher"] = {
      "@type": "Organization",
      name: "News18 Hindi",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2022/10/News18Hindi_logo_600x60_1.png",
        width: 154,
        height: 40,
      },
    };
  }
  if (json_ld_array["thumbnailUrl"] === "") {
    json_ld_array["thumbnailUrl"] =
      publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH;
  }
  return json_ld_array;
};

const jsonLdForSiteNavigation = (news, cat) => {
  const web_page_json_array = {};
  const copyright = `CNN name, logo and all associated elements ® and © 2017 Cable News Network LP, LLLP. A Time Warner Company. 
    All rights reserved. CNN and the CNN logo are registered marks of Cable News Network, LP LLLP, displayed with permission. 
    Use of the CNN name and/or logo on or as part of NEWS18.com does not derogate from the intellectual 
    property rights of Cable News Network in respect of them. © Copyright Network18 Media and Investments Ltd 2016. All rights reserved.`;
  web_page_json_array["@context"] = "https://schema.org";
  web_page_json_array["@type"] = "SiteNavigationElement";
  (web_page_json_array["name"] = "News18 हिंदी"),
    (web_page_json_array["inLanguage"] = "Hindi");
  web_page_json_array["url"] = publicRuntimeConfig.siteUrl;
  web_page_json_array["copyrightNotice"] = copyright;
  web_page_json_array["hasPart"] = [
    {
      "@type": "CreativeWork",
      url: publicRuntimeConfig.siteUrl,
    },
    {
      "@type": "CreativeWork",
      url: news,
    },
    {
      "@type": "CreativeWork",
      url: news + cat,
    },
  ];
  return web_page_json_array;
};
const jsonLdForOrganization = (post_data = [], isAmp) => {
  const json_ld_array = {};
  json_ld_array["@context"] = "https://schema.org";
  json_ld_array["@type"] = "Organization";
  json_ld_array["name"] = "News18 हिंदी";
  json_ld_array["url"] = "https://hindi.news18.com";
  json_ld_array["logo"] = {
    "@type": "ImageObject",
    url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
    width: 112,
    height: 112,
  };
  return json_ld_array;
};
const faq_schema = (html, metaDescription) => {
  const bodyHtml = str_replace(["\r\n", "\r", "\n"], "<br />", html["body"]);
  let allFaqTags = {};
  const patternFAQ1 = new RegExp("\\[q\\](.*?)\\[/q\\]", "sgiu");
  const patternFAQ2 = new RegExp("\\[ans\\](.*?)\\[/ans\\]", "sgiu");
  const allhQtags = [];
  const allhAtags = [];

  const h1 = bodyHtml.matchAll(patternFAQ1);
  if (h1) {
    allhQtags.push(...[...h1].map((item) => item[1]));
  }

  const h2 = bodyHtml.matchAll(patternFAQ2);
  if (h2) {
    allhAtags.push(...[...h2].map((item) => item[1]));
  }

  const arrayfaqTags = [
    ...allhQtags.map((item, index) => ({
      question: item,
      answer: allhAtags[index],
    })),
  ];

  if (arrayfaqTags.length) {
    allFaqTags = {
      "@context": "http://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    };
  }

  arrayfaqTags.forEach((tags, key) => {
    if (!empty(tags["question"]) && !empty(tags["answer"])) {
      allFaqTags.mainEntity.push({
        "@type": "Question",
        name: tags["question"],
        acceptedAnswer: {
          "@type": "Answer",
          text: tags["answer"],
        },
      });
    }
  });

  return allFaqTags;
};
const jsonLdForRecipe = (post_data) => {
  const json_ld_array = {};
  if (
    typeof post_data !== "undefined" &&
    Object.keys(post_data).length > 0 &&
    post_data.recipe_rating != null &&
    post_data.recipe_rating != ""
  ) {
    let auther_name = "";

    if (
      typeof post_data["byline"] !== "undefined" &&
      post_data["byline"] != ""
    ) {
      auther_name = post_data["byline"];
    } else {
      auther_name = "News18 इंडिया";
    }

    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "Recipe";
    json_ld_array["name"] = post_data.recipe_name;
    json_ld_array["recipeCuisine"] = post_data.recipe_type;
    json_ld_array["recipeCategory"] = post_data.recipe_category;
    json_ld_array["author"] = {
      "@type": "Person",
      name: auther_name,
    };
    json_ld_array["image"] = post_data["images"]
      ? imageDomainChanger(post_data["images"]["url"])
      : imageDomainChanger(post_data["thumbnail"]);
    json_ld_array["image"] =
      !json_ld_array["image"] || json_ld_array["image"] == ""
        ? publicRuntimeConfig.schemaImagePlaceholder
        : imageDomainChanger(json_ld_array["image"]);
    json_ld_array["description"] = strip_tags(post_data["intro"]);
    json_ld_array["datePublished"] = post_data["created_at"];
    json_ld_array["aggregateRating"] = {
      "@type": "AggregateRating",
      ratingValue: post_data.recipe_rating,
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    };
    json_ld_array["prepTime"] = "PT" + post_data.recipe_prep_time + "M";
    json_ld_array["cookTime"] = "PT" + post_data.recipe_cook_time + "M";
    json_ld_array["totalTime"] =
      "PT" +
      (Number(post_data.recipe_prep_time) +
        Number(post_data.recipe_cook_time)) +
      "M";
    (json_ld_array["recipeYield"] =
      post_data.recipe_serving_people + " servings"),
      (json_ld_array["nutrition"] = {
        "@type": "NutritionInformation",
        servingSize: "1 bowl",
        calories: post_data.recipe_calorie,
        fatContent: "",
        carbohydrateContent: "",
        cholesterolContent: "",
        fiberContent: "",
        proteinContent: "",
        saturatedFatContent: "",
        sodiumContent: "",
        sugarContent: "",
        transFatContent: "",
      });
    json_ld_array["recipeIngredient"] = post_data.recipe_ingredients;
    json_ld_array["recipeInstructions"] = post_data.recipe_instructions;
    json_ld_array["video"] = post_data.external_video;
    json_ld_array["keywords"] = post_data.tag_topic;
  }

  return json_ld_array;
};
const jsonLdForMovie = (post_data) => {
  const json_ld_array = {};
  if (
    typeof post_data !== "undefined" &&
    Object.keys(post_data).length > 0 &&
    post_data?.movie_review?.movie_rating != null &&
    post_data?.movie_review?.movie_rating != ""
  ) {
    let auther_name = "";

    if (
      typeof post_data["byline"] !== "undefined" &&
      post_data["byline"] != ""
    ) {
      auther_name = post_data["byline"];
    } else {
      auther_name = "News18 इंडिया";
    }

    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "Movie";
    json_ld_array["dateCreated"] = post_data["created_at"] ? dateConversion(post_data["created_at"]):'';
    json_ld_array["name"] = post_data?.movie_review?.movie_name;
    json_ld_array["sameAs"] = post_data["weburl"];
    json_ld_array["url"] = post_data["weburl"];
    json_ld_array["releasedEvent"] = {
      "@type": "PublicationEvent",
    };
    json_ld_array["image"] =
      post_data.images && imageDomainChanger(post_data.images.url);
    json_ld_array["image"] =
      !json_ld_array["image"] || json_ld_array["image"] == ""
        ? publicRuntimeConfig.schemaImagePlaceholder
        : imageDomainChanger(json_ld_array["image"]);
    json_ld_array["actor"] = {
      "@type": "Person",
      name: post_data?.movie_review?.star_cast,
    };
    json_ld_array["director"] = {
      "@type": "Person",
      name: post_data?.movie_review?.director,
      sameAs: "",
    };
    (json_ld_array["duration"] = `PT${post_data?.movie_review?.movie_duration}`),
      (json_ld_array["review"] = {
        "@type": "Review",
        url: post_data["weburl"],
        author: {
          "@type": "Person",
          name: auther_name,
          sameAs: "",
        },
        publisher: {
          "@type": "Organization",
          name: "News18 हिंदी",
          sameAs: "https://hindi.news18.com",
        },
        datePublished: post_data["created_at"] ? dateConversion(post_data["created_at"]):'',
        description: htmlspecialchars(
          (post_data["intro"] || "").replace(/<(.|\n)*?>/g, ""),
        ),
        inLanguage: "hi",
        reviewRating: {
          "@type": "Rating",
          worstRating: 1,
          bestRating: 5,
          ratingValue: post_data?.movie_review?.movie_rating,
        },
      });
  }
  return json_ld_array;
};
const jsonLdForHomeOrganization = () => {
  const json_ld_array = {};

  json_ld_array["@context"] = "https://schema.org";
  json_ld_array["@type"] = "NewsMediaOrganization";
  json_ld_array["name"] = "News18 हिंदी";
  json_ld_array["url"] = publicRuntimeConfig.siteUrl;
  json_ld_array["sameAs"] = [
    "https://www.facebook.com/news18india/",
    "https://twitter.com/news18india",
    "https://www.youtube.com/c/news18India",
    "https://www.instagram.com/news18hindi/",
  ];
  json_ld_array["logo"] = {
    "@type": "ImageObject",
    url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
    width: "112",
    height: "112",
  };

  json_ld_array["address"] = {
    "@type": "PostalAddress",
    streetAddress:
      "TV18 Broadcast Limited, Tower E, SkymarkOne, Plot no. H-10 A",
    addressLocality: "Sector 98, Noida",
    addressRegion: "Uttar Pradesh, India",
    postalCode: "201301",
  };

  return json_ld_array;
};

const jsonLdForHomeWebSite = (isAmp) => {
  const json_ld_array = {};

  json_ld_array["@context"] = "https://schema.org";
  json_ld_array["@type"] = "WebSite";
  json_ld_array["name"] = "News18 हिंदी";
  json_ld_array["alternateName"] = "News18 India";
  json_ld_array["url"] = isAmp
    ? `${publicRuntimeConfig.siteUrl}amp/`
    : publicRuntimeConfig.siteUrl;

  return json_ld_array;
};

const jsonLdForHomeSiteNavigation = (menuData = {}, isMobile,is) => {
  const json_ld_array = {};

  if (!menuData.headermenu_l1) {
    menuData.headermenu_l1 = menuData["MENU-L2"]? menuData["MENU-L2"]:[];
  }

  if (!menuData.menu) {
    menuData.menu = menuData["MENU-L1"]? menuData["MENU-L1"]:[];
  }

  json_ld_array["@context"] = "https://schema.org";
  json_ld_array["@type"] = "SiteNavigationElement";
  json_ld_array["name"] = isMobile
    ? [...menuData.headermenu_l1.map((ele) => ele.label)]
    : [...menuData.menu.map((ele) => ele.label)];
  json_ld_array["url"] = isMobile
    ? [
        ...menuData.headermenu_l1.map(
          (ele) => ele.url.includes("news18")
          ?ele.url
          :publicRuntimeConfig.siteUrl + ele.url.replace("/", ""),
        ),
      ]
    : [
        ...menuData.menu.map(
          // (ele) => publicRuntimeConfig.siteUrl + ele.url.replace("/", ""),
          (ele) =>  ele.url === "/" 
          ? publicRuntimeConfig.siteUrl
          : publicRuntimeConfig.siteUrl + ele.url.split('/').filter(x => x).join('/')+"/" 
        ),
      ];

  return json_ld_array;
};

const jsonLdForCricketSiteNavigation = (crMenu = []) => {
  const json_ld_array = {};

  const menu = [
    {
      label: "क्रिकेट होम",
      url: "cricket/",
    },
    {
      label: "शेड्यूल",
      url: "cricket/match-schedule/",
    },
    {
      label: "लाइव स्कोर",
      url: "cricket/live-score/",
    },
    {
      label: "नतीजे",
      url: "cricket/result/",
    },
    {
      label: "रैंकिंग",
      url: "cricket/teams-ranking.html",
    },
    {
      label: "न्यूज",
      url: "cricket/news/",
    },
    {
      label: "फोटो",
      url: "cricket/photogallery/",
    },
    {
      label: "वीडियो",
      url: "cricket/videos/",
    },
    {
      label: "टीमें",
      url: "cricket/",
    },
    ...crMenu.map((item) => {
      return {
        label: item.label,
        url: item.link.replace("https://hindi.news18.com/", ""),
      };
    }),
  ];

  json_ld_array["@context"] = "https://schema.org";
  json_ld_array["@type"] = "SiteNavigationElement";
  json_ld_array["name"] = [...menu.map((ele) => ele.label)];
  json_ld_array["url"] = [
    ...menu.map((ele) => publicRuntimeConfig.siteUrl + ele.url),
  ];

  return json_ld_array;
};

const jsonLdForImageGallery = (data, isAmp) => {
  const web_page_json_array = {};
  let auther_name = "";
  // if (typeof data["byline"] !== "undefined" && data["byline"] != "") {
  //   auther_name = data["byline"];
  // } else {
  //   auther_name = "Hindi Editor";
  // }

  if (
    typeof data["reported_by"] !== "undefined" &&
    data["reported_by"] !== ""
  ) {
    auther_name = data["reported_by"][0]?.language_name||"";
  } else if (
    typeof data["written_by"] !== "undefined" &&
    data["written_by"] !== ""
  ) {
    auther_name = data["written_by"][0]?.language_name ||"";
  } else if (
    typeof data["edited_by"] !== "undefined" &&
    data["edited_by"] !== ""
  ) {
    auther_name = data["edited_by"][0]?.language_name ||"";
  } else if (
    typeof data["translated_by"] !== "undefined" &&
    data["translated_by"] !== ""
  ) {
    auther_name = data["translated_by"][0]?.language_name ||"";
  } else if (typeof data["byline"] !== "undefined" && data["byline"] !== "") {
    auther_name = data["byline"]||"";
  } else {
    auther_name = "Hindi Editor";
  }

  web_page_json_array["@context"] = "https://schema.org";
  web_page_json_array["@type"] = "ImageGallery";
  // web_page_json_array["mainEntityOfPage"] = {
  //   "@type": "WebPage",
  //   "@id": data.weburl,
  //   headline: limitChar(data.headline, 107) || limitChar(data.display_headline, 107),
  //   description: stripTags(data["intro"]),
  //   keywords: data["tag_topic"]
  // }
  web_page_json_array["url"] = data.weburl;

  web_page_json_array["image"] = {
    "@type": "ImageObject",
    url: data.gallery.map(({ img }) => imageDomainChanger(img)),
    width: 1200,
    height: 800,
  };

  web_page_json_array["author"] = {
    "@type": "Person",
    name: auther_name,
  };
  web_page_json_array["publisher"] = {
    "@type": "Organization",
    name: "News18 हिंदी",
    url: "https://hindi.news18.com/",
    sameAs: [
      "https://www.facebook.com/News18India/",
      "https://twitter.com/news18india",
      "https://t.me/news18hindi",
      "https://www.instagram.com/news18hindi/",
      "https://www.youtube.com/c/news18india",
    ],
    logo: {
      "@type": "ImageObject",
      url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
      width: 112,
      height: 112,
    },
  };
  web_page_json_array["datePublished"] = data["created_at"] || null;
  web_page_json_array["dateModified"] = data["updated_at"] || null;

  return web_page_json_array;
};

const jsonLdForLiveBlog = (article, live, keywords, newBlog) => {
  // console.log("article900",article)
  const json = {};
  let article_headline =
    typeof article["article_headline"] !== "undefined"
      ? article["article_headline"]
      : article["headline"];
  if (
    typeof article["article_headline"] !== "undefined" &&
    article["article_headline"] != ""
  ) {
    article_headline = article["article_headline"];
  } else {
    article_headline = (article["headline"] || article["title"])+(article?.cricketData ?', '+getInningData(article?.cricketData):'');
  }
  let auther_name = "";
  let authorLink = "";
  if (typeof article["byline"] !== "undefined" && article["byline"] != "") {
    auther_name = article["byline"];
  } else {
    auther_name = "Hindi Editor";
  }

  const authline = article["author_byline"] && article["author_byline"][0];
  if (authline) {
    authorLink = `https://hindi.news18.com/byline/${authline.nicename.replace(
      "_",
      "-",
    )}-${authline.id}.html`;
  }

  json["@context"] = "http://schema.org";
  json["@type"] = "LiveBlogPosting";
  json.url = article.weburl;
  json.mainEntityOfPage = article.weburl;
  json.about = {
    "@type": "http://schema.org/Event",
    name: article.headline || article.display_headline,
    startDate: dateConversion(article.liveblog_start_time || article?.created_at),
    endDate: dateConversion(article.liveblog_end_time || article?.updated_at),
    eventAttendanceMode: "Mixed",
    eventStatus: newBlog
      ? article.liveblog_switcher === 1
        ? "Live"
        : "Finished"
      : article?.liveblog_api_url?.status == "1"
      ? "Live"
      : "Finished",
    location: {
      "@type": "http://schema.org/Place",
      name: "India",
      address: {
        "@type": "http://schema.org/PostalAddress",
        name: "India",
      },
    },
    image: [
      article.images?.url && article.images?.url !== ""
        ? imageDomainChanger(article.images?.url)
        : publicRuntimeConfig.schemaImagePlaceholder,
    ],
    description: stripTags(article["intro"])+(article?.cricketData ?', '+getInningData(article?.cricketData):''),
  };
  json.headline = limitChar(article_headline, 107);
  json.description = stripTags(article["intro"])+(article?.cricketData ?', '+getInningData(article?.cricketData):'');
  json.keywords =
    keywords &&
    (Array.isArray(keywords)
      ? keywords.join(" ,")
      : keywords.split(",").slice(0, 10).join(" ,"));
  json.coverageStartTime = dateConversion(article?.liveblog_start_time || article?.created_at);
  json.coverageEndTime = dateConversion(article.liveblog_end_time) || "";
  json.datePublished = dateConversion(article?.created_at);
  json.dateModified =
    (newBlog ? dateConversion(article?.latestTimeStamp || live.latestTime) : dateConversion( live?.blogDate) ||
    "");
  json.articleSection = Array.isArray(article["section"])
    ? article["section"].length && article["section"][0]
    : article["section"];
  json.author = {
    "@type": "Person",
    name: auther_name,
    url: authorLink,
  };
  json.publisher = {
    "@type": "Organization",
    name: "News18 हिंदी",
    url: "https://hindi.news18.com/",
    logo: {
      "@type": "ImageObject",
      url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
      width: 112,
      height: 112,
    },
  };

  const imgSizes = article?.images_all_sizes?.sizes;
  //console.log("imgsize49",imgSizes['4x3'].url )
  const checkSize = imgSizes ? imgSizes.hasOwnProperty("4x3") : false;
  json.liveBlogUpdate = (live?.posts || [])?.map((item) => ({
    "@type": "BlogPosting",
    headline:
      limitChar(
        stripTags(newBlog ? item.blog_title : item.post?.title || ""),
        107,
      ) || "News18 हिंदी",
    url: `${article.weburl}#${item.id}`,
    datePublished: dateConversion(item.created_at) || "",
    dateModified: dateConversion(item.updated_at) || "",
    articleBody:
      stripTags(newBlog ? item.blog_content : item.post?.source || "") ||
      stripTags(newBlog ? item.blog_title : item.post?.title || "") ||
      "News18 हिंदी",
    image: {
      "@type": "ImageObject",
      width: checkSize ? "1200" : "1600",
      height: "900",
      url: checkSize
        ? imgSizes["4x3"]?.url
        : "https://images.news18.com/ibnkhabar/uploads/2021/08/News18_Hindi_Live_Coverage.png",
    },
    author: {
      "@type": "Person",
      name: auther_name,
      url: authorLink,
    },
    mainEntityOfPage: article.weburl,
    publisher: {
      "@type": "Organization",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
        width: 112,
        height: 112,
      },
    },
  }));
  return json;
};

function removeScriptTags(inputString) {
  // Regular expression to match script tags
  const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

  // Remove script tags from the input string
  const sanitizedString = inputString?.replace(scriptTagRegex, "");

  return sanitizedString;
}

const jsonLdForItemList = (
  URL = "",
  numberOfItems = 30,
  listItems,
  category = false,
) => {
  const web_page_json_array = {};
  web_page_json_array["@context"] =  "https://schema.org";
  web_page_json_array["@type"] = "ItemList";
  web_page_json_array["mainEntityOfPage"] = {
    "@type": "WebPage",
    "@id": URL,
  };
  if (category) {
    web_page_json_array["mainEntityOfPage"] = {
      "@type": "Thing",
      ...web_page_json_array["mainEntityOfPage"],
      name: "category",
    };
  }
  web_page_json_array["url"] = URL;
  web_page_json_array["numberOfItems"] = numberOfItems;
  web_page_json_array["itemListOrder"] =
    "https://schema.org/ItemListOrderAscending";
  web_page_json_array["itemListElement"] = [];
  listItems?.length > 0 &&
    listItems.forEach((item, index) => {
      // console.log("item: ", [item]);
      web_page_json_array["itemListElement"].push({
        "@type": "ListItem",
        position: index + 1,
        url: item?.url || item?.weburl || "",
        name: removeScriptTags(item?.display_headline) || item?.title || "",
        description: "",
      });
    });

  return web_page_json_array;
};

const jsonLdForDistrictSubsectionWebPage = (url = "", district = "") => {
  const web_page_json_array_json = {};
  web_page_json_array_json["@context"] = "https://schema.org";
  web_page_json_array_json["@type"] = "WebPage";
  (web_page_json_array_json["name"] = "News18 हिंदी"),
    (web_page_json_array_json[
      "description"
    ] = `Get ${district.toUpperCase()} News in Hindi, Find ${district.toUpperCase()} Latest News on News18 हिंदी`);
  web_page_json_array_json[
    "keywords"
  ] = `${district.toUpperCase()} News in Hindi , ${district.toUpperCase()} Latest News , ${district.toUpperCase()} News`;
  web_page_json_array_json["url"] = (
    url || publicRuntimeConfig.siteUrl
  ).replace("/amp", "");
  web_page_json_array_json["speakable"] = {
    "@type": "SpeakableSpecification",
  };
  return web_page_json_array_json;
};

const jsonLdForDistrictSubsectionItemList = (
  URL,
  numberOfItems = 30,
  listItems,
) => {
  const district_item_list_json_array = {};
  district_item_list_json_array["@context"] = "https://schema.org";
  district_item_list_json_array["@type"] = "ItemList";
  (district_item_list_json_array["mainEntityOfPage"] = {
    "@type": "WebPage",
    "@id": URL.replace("/amp", ""),
  }),
    (district_item_list_json_array["url"] = URL.replace("/amp", ""));
  district_item_list_json_array["numberOfItems"] = numberOfItems;
  district_item_list_json_array["itemListOrder"] =
    "https://schema.org/ItemListOrderAscending";
  district_item_list_json_array["itemListElement"] = [];
  listItems.forEach((item, index) => {
    district_item_list_json_array["itemListElement"].push({
      "@type": "ListItem",
      position: index + 1,
      url: item.weburl.replace(
        "https://hindi.news18.com/",
        publicRuntimeConfig.siteUrl,
      ),
      name: item.headline || item.display_headline,
    });
  });
  return district_item_list_json_array;
};

const jsonLdForNewsArticle = (category = "", url) => {
  const news_article_json_array = {};
  news_article_json_array["@context"] = "https://schema.org";
  news_article_json_array["@type"] = "NewsArticle";
  news_article_json_array["headline"] = category.toLowerCase();
  news_article_json_array["description"] = category.toLowerCase();
  news_article_json_array["mainEntityOfPage"] = {
    "@type": "WebPage",
    "@id": url,
  };
  news_article_json_array["image"] = {
    "@type": "ImageObject",
    url: "https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/default-642x428.jpg",
    width: 696,
    height: 522,
  };
  news_article_json_array["author"] = {
    "@type": "Person",
    name: "News18",
  };
  news_article_json_array["publisher"] = {
    "@type": "Organization",
    name: "News18 हिंदी",
    logo: {
      "@type": "ImageObject",
      url: "https://static.hindi.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
      width: 120,
      height: 40,
    },
  };
  return news_article_json_array;
};

const jsonLdForPodcastArticle = (
  headline = "",
  keywords = "",
  description = "",
  dateUpdated = "",
  dateModified = "",
  articleBody = "",
  category = "",
  url = "",
) => {
  const news_article_json_array = {};
  news_article_json_array["@context"] = "https://schema.org";
  news_article_json_array["@type"] = "NewsArticle";
  news_article_json_array["articleBody"] = articleBody;
  news_article_json_array["headline"] = headline;
  news_article_json_array["articleSection"] = category;
  news_article_json_array["datePublished"] = dateUpdated;
  news_article_json_array["dateModified"] = dateModified;
  news_article_json_array["datePublished"] = dateUpdated;
  news_article_json_array["description"] = description;
  news_article_json_array["keywords"] = keywords;
  news_article_json_array["mainEntityOfPage"] = {
    "@type": "WebPage",
    "@id": url,
  };
  news_article_json_array["image"] = {
    "@type": "ImageObject",
    url: "https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/default-642x428.jpg",
    width: 696,
    height: 522,
  };
  news_article_json_array["author"] = {
    "@type": "Person",
    name: "News18",
  };
  news_article_json_array["publisher"] = {
    "@type": "Organization",
    name: "News18 हिंदी",
    logo: {
      "@type": "ImageObject",
      url: "https://static.hindi.news18.com/ibnkhabar/uploads/2017/01/mainlogo_hindi_new.png",
      width: 120,
      height: 40,
    },
  };
  return news_article_json_array;
};

const jsonLdForAudioObject = (
  thumbnailUrl = "",
  embedUrl = "",
  title = "",
  description = "",
  dateUpdated = "",
) => {
  const news_article_json_array = {};
  news_article_json_array["@context"] = "https://schema.org";
  news_article_json_array["@type"] = "AudioObject";
  news_article_json_array["thumbnailUrl"] = thumbnailUrl;
  news_article_json_array["embedUrl"] = embedUrl;
  news_article_json_array["name"] = title;
  news_article_json_array["description"] = description;
  news_article_json_array["uploadDate"] = dateUpdated;
  news_article_json_array["author"] = {
    "@type": "Organization",
    name: "News 18 Hindi",
    url: "http://hindi.news18.com/",
  };
  return news_article_json_array;
};

const jsonLdForPodcastEpisode = (
  webUrl = "",
  title = "",
  dateUpdated = "",
  dateModified = "",
  description = "",
) => {
  const news_article_json_array = {};
  news_article_json_array["@context"] = "https://schema.org";
  news_article_json_array["@type"] = "PodcastEpisode";
  news_article_json_array["url"] = webUrl;
  news_article_json_array["name"] = title;
  news_article_json_array["datePublished"] = dateUpdated;
  news_article_json_array["dateModified"] = dateModified;
  news_article_json_array["timeRequired"] = "PT37M";
  news_article_json_array["description"] = description;

  news_article_json_array["associatedMedia"] = {
    "@type": "MediaObject",
    url: "http://hindi.news18.com/",
  };
  news_article_json_array["partOfSeries"] = {
    "@type": "PodcastSeries",
    name: "News 18 Hindi",
    url: "http://hindi.news18.com/",
  };
  return news_article_json_array;
};

const jsonLdForVideoListingPage = (
  name = null,
  description = null,
  keywords = null,
  contentUrl = null,
  thumbnailUrl = null,
  uploadDate = null,
  duration = null,
  interactionCount = null,
  embedUrl = null,
) => {
  const web_page_json_array = {};
  web_page_json_array["@context"] = "https://schema.org";
  web_page_json_array["@type"] = "VideoObject";
  web_page_json_array["name"] = name;
  web_page_json_array["description"] = description;
  web_page_json_array["thumbnailUrl"] = thumbnailUrl;
  web_page_json_array["uploadDate"] = uploadDate;
  web_page_json_array["duration"] = duration;
  web_page_json_array["publisher"] = {
    "@type": "Organization",
    name: "News18 हिंदी",
    url: "https://hindi.news18.com/",
    logo: {
      "@type": "ImageObject",
      url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
      width: 112,
      height: 112,
    },
  };
  web_page_json_array["contentUrl"] = contentUrl;
  web_page_json_array["embedUrl"] = embedUrl;
  web_page_json_array["interactionCount"] = interactionCount;
  return web_page_json_array;
};

const jsonLdForSingleProductPage = (
  name = "",
  description = "",
  images = [],
  brandName = "",
  offerDetails = {},
) => {
  const web_page_json_array = {};

  web_page_json_array["@context"] = "https://schema.org";
  web_page_json_array["@type"] = "Product";
  web_page_json_array["name"] = name;
  web_page_json_array["description"] = description;

  web_page_json_array["image"] = [];
  images.forEach((item) => {
    web_page_json_array["image"].push(item);
  });
  web_page_json_array["brand"] = {
    "@type": "Brand",
    name: brandName,
  };
  web_page_json_array["offers"] = {
    "@type": "Offer",
    price: offerDetails?.price || 0,
    priceCurrency: offerDetails?.priceCurrency || "Rs",
  };

  return web_page_json_array;
};

function dateConversion(date){  
  let r = new Date(date);  
  // console.log(r.getFullYear() + '-'+ r.toLocaleDateString('en-us',{month:'2-digit'}) + '-'+ r.toLocaleDateString('en-us',{day:'2-digit'})+"T"+("0" + r.getHours()).slice(-2)+':'+("0" + r.getMinutes()).slice(-2)+':'+("0" + r.getSeconds()).slice(-2)+'+05:30')
  return r.getFullYear() + '-'+ r.toLocaleDateString('en-us',{month:'2-digit'}) + '-'+ r.toLocaleDateString('en-us',{day:'2-digit'})+"T"+("0" + r.getHours()).slice(-2)+':'+("0" + r.getMinutes()).slice(-2)+':'+("0" + r.getSeconds()).slice(-2)+'+05:30';
}

const jsonLdForByliePage =(
  topicResult,
  tagResult,
  currentUrl    
)=>{
  const profile_page_json_array = {};
  profile_page_json_array["@context"] = "https://schema.org";
  profile_page_json_array["@type"] = "ProfilePage";
  profile_page_json_array["dateCreated"] =  "2019-12-23T12:34:00+05:30";
  profile_page_json_array["dateModified"] = dateConversion(tagResult[0]?.updated_at);
  profile_page_json_array["mainEntity"] = {
    "@type":"Person",
    "name": topicResult?.hindi_name || topicResult?.english_name || "",
    "@id":  currentUrl||"",
    "url": currentUrl||"",
    "description": topicResult?.author_bio||topicResult?.fullbio||"",
    "image": topicResult?.avtar||"",
    "sameAs":[topicResult?.twitter,topicResult?.facebook,topicResult?.instagram],
  };
  profile_page_json_array["hasPart"] = [];
  tagResult?.length > 0 && tagResult?.map((item)=>{
    const article = {
      "@type" : "Article",
      "headline" : item?.headline || item?.display_headline ||"",
      "url" :  item?.weburl || "",
      "image" : item?.images?.url || "",
      "datePublished": dateConversion(item?.created_at),
      "author": currentUrl ||""
    }
    profile_page_json_array["hasPart"].push(article);
  });
  return profile_page_json_array;
}

const jsonLdLiveTvForVideoObject = (page_title,page_description,page_keywords) => {
  const json_ld_array = {};
    json_ld_array["@context"] = "https://schema.org";
    json_ld_array["@type"] = "VideoObject";
    json_ld_array["name"] = page_title;
    json_ld_array["description"] = page_description;
    json_ld_array["keywords"]= page_keywords;
    json_ld_array["mainEntityOfPage"]="https://hindi.news18.com/livetv/";
    json_ld_array["duration"]="P1D";
    json_ld_array["thumbnailUrl"]="https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png";
    json_ld_array["uploadDate"]=moment().startOf("d").format("YYYY-MM-DDTHH:mm:ss")+"+05:30";   
    json_ld_array["publisher"] = {
      "@type": "Organization",
      name: "News18 हिंदी",
      url: "https://hindi.news18.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://images.news18.com/ibnkhabar/uploads/2024/03/News18-Hn-2024-03-5f3f32fe8464a95d1f7450f691964286.png",
        "width":600,
        "height":60
      },      
    };
    json_ld_array["publication"] = {
      "@type": "BroadcastEvent",
      "isLiveBroadcast":true,
      "startDate":moment().startOf("d").format("YYYY-MM-DDTHH:mm:ss")+"+05:30",
      "endDate":moment().endOf("d").format("YYYY-MM-DDTHH:mm:ss")+"+05:30"
    }
    return json_ld_array;
  };

export {
  jsonLdForArticleConsumption,
  jsonLdForWebPage,
  jsonLdForImageObject,
  jsonLdForSiteNavigation,
  jsonLdForVideoObject,
  jsonLdForNonYTVideoObject,
  jsonLdForOrganization,
  faq_schema,
  jsonLdForRecipe,
  jsonLdForMovie,
  jsonLdForHomeOrganization,
  jsonLdForImageGallery,
  jsonLdForLiveBlog,
  jsonLdForHomeWebSite,
  jsonLdForHomeSiteNavigation,
  jsonLdForItemList,
  jsonLdForDistrictSubsectionWebPage,
  jsonLdForDistrictSubsectionItemList,
  jsonLdForPodcastWebPage,
  jsonLdForNewsArticle,
  jsonLdForCricketSiteNavigation,
  jsonLdForVideoListingPage,
  jsonLdForSingleProductPage,
  jsonLdForPodcastArticle,
  jsonLdForAudioObject,
  jsonLdForPodcastEpisode,
  jsonLdForByliePage,
  jsonLdLiveTvForVideoObject
};
