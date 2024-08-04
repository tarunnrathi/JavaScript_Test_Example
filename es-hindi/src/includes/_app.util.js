export const capIt = (str = " ") => {
  if (str && str.length > 0) {
    return str[0]?.toUpperCase() + str?.slice(1);
  }
  return "";
};

const tweakSection = (sec = "") => {
  return sec
    .replace(/-/gi, " ")
    .split(" ")
    .map((s) => capIt(s).trim())
    .join(" ");
};

export const cd7 = ({
  ff_source = "",
  agency,
  byline,
  roles,
  ff_author_name,
  author_type,
}) => {
  if (ff_source.toLocaleLowerCase() == "hyperlocal") {
    author_type = "Local18";
  }

  let ffline = ff_source.match(/FILE18/gi)
    ? [ff_author_name]
    : ff_source.match(/greenhonchos|pepper/gi);
  ffline = ffline ? ffline[0] : null;
  author_type =
    ff_source == "FILE18"
      ? "File18"
      : ff_source.toLowerCase() == "greenhonchos" ||
        ff_source.toLowerCase() == "pepper"
      ? "Digital"
      : author_type;
  const ffagency =
    ff_source.toLowerCase() == "greenhonchos" ||
    ff_source.toLowerCase() == "pepper"
      ? "Trending Desk"
      : ff_source == "FILE18"
      ? "News18 हिंदी"
      : null;
  return `${ffagency || agency || "News18.com"} | ${
    author_type || "digital"
  } | ${ffline || byline || "News18 हिंदी"}${
    (Array.isArray(roles) ? roles : []).includes("contributor")
      ? " | contributor"
      : ""
  }`;
};

export const customDimensions = (article) => {
  if (article) {
    let type = article.post_type;
    const ff_source = (article.ff_source || "").toLowerCase();
    switch (type) {
      case "text": {
        type =
          ff_source === "hyperlocal" && article.local18_video
            ? "Video_Story"
            : ff_source === "hyperlocal"
            ? "Text_Story"
            : "article";
        break;
      }
      case "videos": {
        type = ff_source === "hyperlocal" ? "Video_Story" : "Video";
        break;
      }
      case "photogallery": {
        // type = ff_source === "hyperlocal" ? "Photogallery_Story" : "News";
        type = "photogallery";
        break;
      }
    }

    if (article.liveblog_api_url && article.liveblog_api_url.blog_url) {
      type = "Liveblog";
    }

    type = capIt(type);

    let { tags } = article;
    tags = (tags || []).map((item) => item.name).join("-");
    if (!tags.length) {
      tags = "No Tags";
    }

    return {
      // dimension14: cat,
      dimension15: type,
      dimension16: tags,
    };
  }
};

export const sectionMaker = (sl = "", page) => {
  return sl
    .split(",")
    .slice(0, 4)
    .reduce(
      (p, n) =>
        p +
        `${!p ? "" : ", "}${
          sl !== "Videos" && sl !== "short-video" ? "hindi.news18.com -" : ""
        } ${
          sl === "Cricket" ||
          sl === "IPL photos" ||
          sl === "IPL videos" ||
          sl === "t20WorldCup2024"
            ? "cricket"
            : page === "Live Tv"
            ? "livetv"
            : sl === "ParisOlympics"
            ? "sports"
            : sl === "Videos" || sl === "short-video"
            ? ""
            : "news"
        }${
          sl !== "Videos" && sl !== "short-video" ? ", " : ""
        }hindi.news18.com - ${
          sl === "Cricket"
            ? "ipl, ipl"
            : sl === "IPL photos"
            ? "photos, ipl"
            : sl === "IPL videos"
            ? "videos, ipl"
            : sl === "t20WorldCup2024"
            ? "T20 world cup"
            : sl === "ParisOlympics"
            ? "olympics"
            : sl === "short-video"
            ? "short videos"
            : tweakSection(n)
        }`,
      ""
    );
};

export const ignoreQueryParams = (url = "", reSlash = true) => {
  const queryPos = url.indexOf("?");
  url = queryPos > 0 ? url.substr(0, queryPos) : url;
  if (!reSlash) {
    return url;
  }
  return url[url.length - 1] != "/" ? url : url.substring(0, url.length - 1);
};

export const arrayOnly = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "object") {
    return Object.values(value);
  }
  return [];
};

export const validSlugChecker = (slug) => {
  return Boolean(/^[-,^_a-zA-Z0-9]+$/.test(slug));
};

export const additionalText = `लेटेस्ट न्यूज किसी भी जगह, किसी भी टाइम. फ्री में ऐप इंस्टॉल करें!
https://onelink.to/website-share-hindi`;

export const  formatText = (text)=> {
  if (text && text != undefined )
    return text
      .toLowerCase() // Convert the entire string to lowercase
          .replace(/\s+/g, '-'); // Replace one or more spaces with a single hyphen
  else
      return "";
}
