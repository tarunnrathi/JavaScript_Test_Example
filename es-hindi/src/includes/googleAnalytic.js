import ReactGA from "react-ga";
import { cd7, customDimensions } from "./_app.util";

export const GA_TRACKING_ID = process.env.GA_TRACKING_ID
  ? process.env.GA_TRACKING_ID
  : "UA-156703-3";

export const initGA = () => {
  // GA Initializing
  ReactGA.initialize(GA_TRACKING_ID, { standardImplementation: true });

  // Ad-blocker tracker
  ReactGA.ga("provide", "adblockTracker", function (tracker, opts) {
    const ad = document.createElement("ins");
    ad.className = "AdSense";
    ad.style.display = "block";
    ad.style.position = "absolute";
    ad.style.top = "-1px";
    ad.style.height = "1px";
    document.body.appendChild(ad);
    tracker.set("dimension" + opts.dimensionIndex, !ad.clientHeight);
    document.body.removeChild(ad);
  });

  ReactGA.ga("require", "adblockTracker", { dimensionIndex: 2 });
};

// Log pageview ga event
// cd1 = author name, cd7 = byline data
export const logPageView = (
  author,
  byline,
  agency,
  author_type,
  roles,
  published,
  section,
  storyId,
  creationDate,
  ff_source,
  ff_author_name,
  article,
  setIdentifier,
  categoryForGA,
  cd18value = "",
  cd14value,
  cd19value,
  cd20value,
  publishedByWithId = "",
  taboolaVariable,
  nw_post_word_count,
  Publish_by_login_ID,
  agency_ff_source_author_byline,
  translateRepoetedBy,
  isT20,
  isolympics,
  isBudgetPage
) => {
  if (publishedByWithId && author) {
    author = publishedByWithId;
  }

  translateRepoetedBy ="";
  agency_ff_source_author_byline = "";

  //for CD1 calculation
  if (article?.reported_by?.length > 0) {
    translateRepoetedBy =
    article?.reported_by[0]?.english_name + "_" + (article?.reported_by[0]?.ID || article?.reported_by[0]?.id);
  }
  if (article?.translated_by?.length > 0 ) {
    translateRepoetedBy = translateRepoetedBy
      ? translateRepoetedBy +
        " | " +
        article?.translated_by[0]?.english_name +
        "_" +
        (article?.translated_by[0]?.ID || article?.translated_by[0]?.id)
      : article?.translated_by[0]?.english_name + "_" + (article?.translated_by[0]?.ID || article?.translated_by[0]?.id);
  }
  if (article?.written_by?.length > 0 ) {
    translateRepoetedBy = translateRepoetedBy
      ? translateRepoetedBy +
        " | " +
        article?.written_by[0]?.english_name +
        "_" +
        (article?.written_by[0]?.ID || article?.written_by[0]?.id)
      : article?.written_by[0]?.english_name + "_" + (article?.written_by[0]?.ID || article?.written_by[0]?.id);
  }
  if (article?.edited_by?.length > 0 ) {
    translateRepoetedBy = translateRepoetedBy
      ? translateRepoetedBy +
        " | " +
        article?.edited_by[0]?.english_name +
        "_" +
        (article?.edited_by[0]?.ID || article?.edited_by[0].id)
      : article?.edited_by[0]?.english_name + "_" + (article?.edited_by[0]?.ID || article?.edited_by[0].id) ;
  }

  //for CD7 calculation
  if (agency) {
    agency_ff_source_author_byline = agency;
  }
   author_type =
    ff_source == "FILE18"
      ? "File18"
      : ff_source.toLowerCase() == "greenhonchos" ||
        ff_source.toLowerCase() == "pepper"
      ? "Digital"
      : ff_source.toLocaleLowerCase() === "hyperlocal"
      ? "Local18"
      : ff_source;
  if (author_type) {
    agency_ff_source_author_byline = agency_ff_source_author_byline
      ? agency_ff_source_author_byline + " | " + author_type
      : author_type;
  }
  
  if (article?.author_byline?.length > 0) {
    agency_ff_source_author_byline = agency_ff_source_author_byline
      ? agency_ff_source_author_byline +
        " | " +
        article?.author_byline[0]?.english_name +
        "_" +
        (article?.author_byline[0]?.ID || article?.author_byline[0]?.id)
      : article?.author_byline[0]?.english_name + "_" + (article?.author_byline[0]?.ID || article?.author_byline[0]?.id);
  }

  //for CD9 calculation
  if (article?.publish_by?.length > 0) {
    Publish_by_login_ID =
    article?.publish_by[0].english_name + "_" + (article?.publish_by[0].ID||article?.publish_by[0].id);
  }else{
    if (article?.written_by?.length > 0) {         
      Publish_by_login_ID = article?.written_by[0]?.english_name + "_" + (article?.written_by[0]?.ID || article?.written_by[0]?.id);
    }
  }

  let cd1 = author || "";
  let cd9 = "",
    cd10 = "",
    cd11 = "",
    cd12 = "",
    cd13 = "",
    cd17 = "",
    cd18 = "",
    cd19 = "",
    cd14 = "",
    cd20 = "",
    cd21 = "",
    cd22 = "";
  if (creationDate) {
    // const monthMap = {
    //   "january": "01",
    //   "february": "02",
    //   "march": "03",
    //   "april": "04",
    //   "may": "05",
    //   "june": "06",
    //   "july": "07",
    //   "august": "08",
    //   "september": "09",
    //   "october": "10",
    //   "november": "11",
    //   "december": "12"
    // };
    const [dateYear, time] = creationDate.split(" ");
    const [year, month, day] = dateYear.split("-");
    // const [month, day] = date.split(' ');

    cd9 = `${Publish_by_login_ID || ""}`;
    cd10 = `${agency || "News18 Hindi Staff"}`;
    cd11 = `${storyId}`;
    cd12 = `${month}/${day}/${year.trim()}`;
    cd13 = `${time.trim()}`;

    // if(isYoutube != 'no') {
    //   cd19 = isYoutube ? 'Youtube' : 'JS Player';
    // }
    // console.log('cd19', cd19)
  }

  let taboolaData = "Taboola No";
  if (taboolaVariable == true) {
    taboolaData = "Taboola Yes";
  }
  if(isBudgetPage){
    taboolaData = "Taboola Yes";
  }
  cd22 = taboolaData;
  cd21 = nw_post_word_count;
  cd18 = cd18value;
  cd14 = cd14value;
  cd19 = cd19value;
  cd20 = cd20value;
  cd17 =
    ff_source == "Hyperlocal"
      ? article?.["reporter_location"] || categoryForGA + "-Local18"
      : "";
  const { href } = window.location,
    path = window.location.pathname;
  const _w18_uni_id = _w18gcon("_w18g");
  let attr = [];
  if (section && section.length) {
    attr = section.map((item, ind) => ({ c0: "news and media", c1: item }));
  }

  // if (!district) {
  //   let cd5 = {
  //       _w18g:_w18_uni_id,
  //       sections:section,
  //       language:"hindi",
  //       data:{
  //         post_type:"news",
  //         attributes:attr,
  //         autono: storyId
  //       }
  //     };

  //   if (cd5 != '') {
  //     // ReactGA.set({ dimension5: cd5 });
  //   }
  // }

  let gaDimension8 = "";
  if (published && published != "") {
    gaDimension8 = `FMS | ${
      published == "true" ? "Auto" : published == "manual" ? "Manual" : ""
    } | ${agency || "News18 Hindi"} | ${section || ""} | Article`;
  }

  let o = {};
  if (setIdentifier) {
    o = {
      dimension18: setIdentifier == 1 ? "video" : "article",
    };
  }
  cd1 = translateRepoetedBy;
  
  ReactGA.set({
    location: href,
    dimension1: cd1,
    // dimension7:  cd7({
    //   ff_source, agency, byline, roles, ff_author_name, author_type
    // }),
    dimension7: agency_ff_source_author_byline,
    dimension9: Publish_by_login_ID,
    dimension10: cd10,
    dimension11: cd11,
    dimension12: cd12,
    dimension13: cd13,
    dimension17: cd17,
    ...o,
    ...customDimensions(article),
    dimension18: cd18,
    dimension14: cd14,
    dimension19: cd19,
    dimension20: cd20,
    dimension21: cd21,
    dimension22: cd22,
    ...(isT20||isolympics)?{dimension15: "category",}:null
  });
  ReactGA.set({ dimension8: gaDimension8 });
  ReactGA.pageview(path);
};

// log events i.e., click
// Category = Hindi',
// Action = 'Click',
// label = 'https://www.news18.com/'
export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    ReactGA.event({ category, action, label });
  }
};

export const logEventNew = (category = "", action = "", label = "") => {
  if (category && action) {
    ga("send", "event", category, action, label);
  }
};
export function _w18gcon(wg) {
  let i,
    x,
    y,
    cl = document.cookie.split(";");
  const out = {};
  let c = 0;
  for (i = 0; i < cl.length; i++) {
    x = cl[i].substr(0, cl[i].indexOf("="));
    y = cl[i].substr(cl[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == "nnmc") {
      out.nnmc = unescape(y);
      c = c + 1;
    } else if (x == "_w18g") {
      out._w18g = unescape(y);
      c = c + 1;
    } else if (x == "_w18s") {
      out._w18s = unescape(y);
      c = c + 1;
    }
    if (c == 3) {
      return out;
    }
  }
  return out;
}

export const logPageViewLiveScore = (
  title,
  cd18value = "",
  cd14value = "",
  cd19value = "",
  cd20value = ""
) => {
  if (title) {
    ReactGA.set({ title });
  }

  ReactGA.set({
    dimension18: cd18value,
    dimension14: cd14value,
    dimension19: cd19value,
    dimension20: cd20value,
  });

  ReactGA.pageview(window?.location?.pathname);
};

const capIt = (str = " ") => {
  if (!str[0]) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

const getCdValues = (articleData, isShortNews) => {
  let cd1,
    cd9 = "",
    cd7Dim = "",
    cd8 = "",
    cd10 = "",
    cd11 = "",
    cd12 = "",
    cd13 = "",
    cd16 = "",
    cd17 = "",
    cd15 = "",
    cd21 = 0,
    cd22 = "";
  let editedByName;
  if (typeof articleData === "object" && Object.keys(articleData).length > 0) {
    cd15 = isShortNews
      ? "short news page"
      : (articleData && articleData.post_type) || "";
    const roles = (
      Array.isArray(articleData?.author_byline?.roles)
        ? articleData.author_byline?.roles
        : []
    ).includes("contributor");

    const agency = articleData?.agency || "";
    const byline = articleData?.byline || "";
    const ff_author_name = articleData?.ff_author_name || "";
    const author_type = articleData?.author_byline?.author_type || "";
    const cd1Arr = [];

    const reportersDis = articleData?.["reporters_district"] || "";

    let pubByName = articleData?.publish_by?.[0]?.english_name || "";
    if (pubByName) {
      pubByName = pubByName.replace(".", "");
      pubByName = pubByName.replace(/[ _-]/g, "-");
      pubByName = pubByName + "_" + articleData?.publish_by?.[0]?.id;
    }

    const writtenByName =
      Array.isArray(articleData?.written_by) && articleData?.written_by?.length
        ? articleData?.written_by?.[0]?.english_name
        : typeof articleData?.written_by === "string"
        ? articleData?.written_by
        : "";
    const translatedByName =
      Array.isArray(articleData?.translated_by) &&
      articleData?.translated_by?.length
        ? articleData?.translated_by?.[0]?.english_name
        : typeof articleData?.translated_by === "string"
        ? articleData?.translated_by
        : "";
    const reportedByName =
      Array.isArray(articleData?.reported_by) &&
      articleData?.reported_by?.length
        ? articleData?.reported_by?.[0]?.english_name
        : typeof articleData?.reported_by === "string"
        ? articleData?.reported_by
        : "";
    editedByName =
      Array.isArray(articleData?.edited_by) && articleData?.edited_by?.length
        ? articleData?.edited_by?.[0]?.english_name
        : typeof articleData?.edited_by === "string"
        ? articleData?.edited_by
        : "";

    const ff_source1 =
      articleData && (articleData.ff_source || "").toLowerCase();
    switch (cd15) {
      case "news":
      case "post":
      case "text": {
        cd15 =
          ff_source1 === "hyperlocal" && articleData.local18_video
            ? "Video_Story"
            : ff_source1 === "hyperlocal"
            ? "Text_Story"
            : "News";
        break;
      }
      case "videos": {
        cd15 = ff_source1 === "hyperlocal" ? "Video_Story" : "Video";
        break;
      }
      case "photogallery": {
        cd15 =
          ff_source1 === "hyperlocal" ? "Photogallery_Story" : "photogallery";
        break;
      }
      default:
        break;
    }

    if (articleData.creationDate) {
      const [date, year, time] =
        articleData?.creationDate &&
        typeof articleData?.creationDate === "string"
          ? articleData.creationDate.split(",")
          : [];
      const [month, day] = date.split(" ");
      const monthMap = {
        january: "01",
        february: "02",
        march: "03",
        april: "04",
        may: "05",
        june: "06",
        july: "07",
        august: "08",
        september: "09",
        october: "10",
        november: "11",
        december: "12",
      };
      cd9 = typeof pubByName !== "undefined" ? `${pubByName}` : "News18 Hindi";
      cd10 = articleData.agency || "News18 Hindi Staff";
      cd11 = `${articleData.story_id}`;
      cd12 = `${monthMap[month.toLowerCase()]}/${day}/${year?.trim()}`;
      cd13 = `${time?.trim()}`;
    }

    cd16 =
      articleData.story_tags && articleData.story_tags.length
        ? articleData.story_tags.join("-")
        : "";
    cd17 = isShortNews ? "" : reportersDis ? `${reportersDis}-local18` : `Hindi-local18`;

    // let ff_source =  ff_source1 == 'hyperlocal' ? categoryForGA+'-Local18' : '';

    if (articleData.fms_autopublished && articleData.fms_autopublished != "") {
      cd8 = `FMS | ${
        articleData.fms_autopublished === "true"
          ? "Auto"
          : articleData.fms_autopublished === "manual"
          ? "Manual"
          : ""
      } | ${articleData.agency || "News18 Hindi"} | ${
        articleData.section || ""
      } | Article`;
    }

    cd1Arr.push(reportedByName, translatedByName, writtenByName, editedByName);
    cd1 = cd1Arr.filter((i) => i !== "").join("|");
    cd7Dim = cd7({
      ff_source: ff_source1,
      agency,
      byline,
      roles,
      ff_author_name,
      author_type,
    });
    cd21 =
      typeof articleData.nw_post_word_count !== "undefined"
        ? articleData.nw_post_word_count
        : 0;
  } else {
    cd7Dim = "";
    cd17 = "Hindi-local18";
  }

  cd22 = typeof _taboola !== "undefined" ? "Taboola Yes" : "Taboola No";
  cd15 = capIt(cd15) || "";

  return {
    cd1,
    cd7: cd7Dim,
    cd8,
    cd9,
    cd10,
    cd11,
    cd12,
    cd13,
    cd16,
    cd17,
    cd15: cd15 === "undefined" ? "" : cd15,
    cd21,
    cd22,
    editedByName,
  };
};

export const logPageViewUpdated = (
  article = {},
  cd14Value = "",
  cd18Value = "",
  cd19Value = "",
  cd20Value = "",
  isShortNews = false
) => {
  const cd18 = cd18Value || ""; // if undefined
  const cd14 = cd14Value || "";
  const cd19 = cd19Value || "";
  const cd20 = cd20Value || "";

  const cdObject = getCdValues(article, isShortNews);

  const { href } = window.location;
  //const path = window.location.pathname;

  ReactGA.set({
    location: href,
    dimension1: cdObject.cd1,
    dimension7: cdObject.cd7,
    dimension8: cdObject.cd8,
    dimension9: cdObject.cd9,
    dimension10: cdObject.cd10,
    dimension11: cdObject.cd11,
    dimension12: cdObject.cd12,
    dimension13: cdObject.cd13,
    dimension15: cdObject.cd15,
    dimension17: cdObject.cd17,
    dimension18: cd18,
    dimension14: cd14,
    dimension19: cd19,
    dimension20: cd20,
    dimension21: cdObject.cd21,
    dimension22: cdObject.cd22,
  });
  //ReactGA.set({ dimension8: gaDimension8});
  //ReactGA.pageview(path);
  ReactGA.pageview(article?.weburl);
};