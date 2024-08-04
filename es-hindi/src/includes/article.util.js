import { logPageView, logEvent, logPageViewLiveScore } from "includes/googleAnalytic";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import parser, { attributesToProps } from "html-react-parser";
import FakeYTPlayer from "components/Common/FakeYTPlayer";
import ScriptLoader from "../components/Common/ScriptLoader";
import { districtList } from "./district.helper";
import { encode } from 'html-entities';
import { getRedirectionApi } from "api/global/Common";
/**
 * @description Load external scripts
 * @param {*} src external script url
 * @param {*} onload callback func which is called once the script is loaded
 */

// const encode = (rawStr) =>{
//   rawStr.replace(/'/g, '"');
//   rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => "&#" + i.charCodeAt(0) + ";");
//   return rawStr;
// }
  

const scriptLoader = (src, onload = () => { }, options = {}) => {
  if (typeof document !== "undefined" && src) {
    const s = document.createElement("script");
    const el = document.getElementsByTagName("script")[0];
    s.async = true;
    s.onload = onload;
    s.src = src || "";
    Object.keys(options).forEach((opt) => {
      if (opt == "attr") {
        Object.keys(options[opt]).forEach((key) => {
          s.setAttribute(key, options[opt][key]);
        });
      } else {
        s[opt] = options[opt];
      }
    });
    el.parentNode.insertBefore(s, el);
  }
};
/**
 * @description Update address bar url and title
 * @param {*} url url which needs to be added in the address bar
 * @param {*} headline new title for the tab
 * @param {*} page gallery image number
 */
const updateUrl = (url, headline, page) => {
  url = url.replace(publicRuntimeConfig.siteUrl, "/");

  // add page number in url
  if (page && page !== 1) {
    url = url.replace(".html", `-page-${page}.html`);
  }
  history.replaceState({}, "", url);
  if (typeof document !== "undefined") {
    document.title = headline;
  }
};
const firePV = () => {
  const rand = Math.floor(Math.random() * 1000000);
  // fetch(
  //   `https://hindi.news18.com/dlxczavtqcctuei/news18/comscore/pv-candidate.html?${rand}`
  // );
};

const fireVP = (publishByFull, category, url, headline) => {
  if (window.pSUPERFLY) {
    let authorNames;
    if (publishByFull?.length) {
      const auths = publishByFull.slice(0, 10);
      authorNames = auths.map((i) => i.english_name).join(", ");
    }
    pSUPERFLY.virtualPage({
      sections: `hindi.news18.com,  ${sectionMaker(category)}`,
      authors: authorNames || "no author",
      path: url.replace(publicRuntimeConfig.siteUrl, "/"),
      title: headline
    });
  }
};
// Fire page related events
const pageEvents = ({
  inView,
  callFired,
  isAjax,
  entry,
  authorByline = "",
  byline = "",
  agency = "",
  fms_autopublished = "",
  section = "",
  url,
  headline,
  storyId,
  creationDate,
  currentPage,
  ff_source,
  ff_author_name,
  publishedBy,
  categoryForGA = '',
  articleData,
  cd14Value,
  cd18Value,
  cd19value,
  cd20value,
  publishByFull,
  allSections,
  publishedByWithId = "",
  taboolaVariable = "",
  nw_post_word_count=0,
}) => {
  if (inView) {
    if (isAjax) {
      updateUrl(url, headline);
    }

    if (!callFired.current && isAjax) {
      // Trigger ga

      logPageView(
        publishedBy,
        byline,
        agency,
        authorByline.author_type,
        authorByline.roles ? authorByline.roles : [],
        fms_autopublished,
        section,
        storyId,
        creationDate,
        ff_source,
        ff_author_name,
        articleData,
        '',
        categoryForGA,
        cd18Value,
        cd14Value,
        cd19value,
        cd20value,
        publishedByWithId,
        taboolaVariable,
        nw_post_word_count,
      );
      if (isAjax) {
        // for first article call is being made in the header
        // Trigger comscore
        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
        if (typeof OBR !== "undefined") {
          OBR.extern.researchWidget();
        }
        firePV();
        fireVP(publishByFull, allSections || categoryForGA, url, headline);
      }
      callFired.current = true;
    }
  } else if (currentPage) {
    const condition = !isAjax ? currentPage !== 1 : true; // Not to call on first article's 1st gallery

    if (condition) {
      updateUrl(url, headline, currentPage);
    }

    if (condition && (!callFired.current || currentPage > callFired.current)) {
      // Trigger ga
      logPageView(
        publishedBy,
        byline,
        agency,
        authorByline.author_type,
        authorByline.roles ? authorByline.roles : [],
        fms_autopublished,
        section,
        storyId,
        creationDate,
        ff_source,
        ff_author_name,
        articleData,
        '',
        categoryForGA,
        cd18Value,
        cd14Value,
        cd19value,
        cd20value,
        publishedByWithId,
        taboolaVariable,
        nw_post_word_count,
      );
      if (currentPage > callFired.current) {
        // for first article call is being made in the header
        // Trigger comscore
        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
        if (typeof OBR !== "undefined") {
          OBR.extern.researchWidget();
        }
        firePV();
        if (currentPage && currentPage !== 1) {
          url = url.replace('.html', `-page-${currentPage}.html`);
        }
        fireVP(publishByFull, allSections || categoryForGA, url, headline);
      }
      callFired.current = currentPage;
    }
  }
  if (entry && entry.boundingClientRect.top < 0) {
    if (entry.isIntersecting) {
      logEvent(
        `Next_Story_Appear_${storyId}`,
        "scroll up",
        "scroll_next_story",
        true
      );
      logEvent("scroll_index_D", "scroll", "article", true);
    } else {
      logEvent(
        `Next_Story_Appear_${storyId}`,
        "scroll down",
        "scroll_next_story",
        true
      );
      logEvent("scroll_index_D", "scroll", "article", true);
    }
  }
};
const urlParser = (url) => {
  return url
    .split("?")[1]
    .split("&")
    .reduce((prev, item) => {
      const [key, value] = item.split("=");
      prev[key] = value;
      return prev;
    }, {});
};
export function logGA4VirtualPageView(url) {
  const dataLayer = window.dataLayer || [];
  const urlFind = dataLayer.find((x) => x.page === url);
  if (urlFind && Object?.keys(urlFind)?.length > 0) {
    return;
  } else {
    dataLayer.push({
      event: "NewVirtualPageview",
      page: url,
    });
    window.dataLayer = dataLayer;
  }
}
const Wrapper = ({ children, wrap, wrapper }) => {
  if (wrap) {
    return wrapper(children);
  }
  return children;
};
const replaceSpecialChars = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
};
const getArticleSocials = (article) => {
  const fbshare = "https://www.facebook.com/sharer.php?u=" + article.weburl;
  const twshare =
    "https://twitter.com/share?url=" +
    article.weburl +
    "&text=" +
    replaceSpecialChars(article.headline);
  const whtsup =
    "whatsapp://send?text=" +
    replaceSpecialChars(article.headline) +
    "-" +
    article.weburl;
  return { fbshare, twshare, whtsup };
};
const livePostSourceParser = (body, stamp, lazy = true, nofp) => {
  // Load  scripts
  const script = /<script[\S\s]*?<\/script>/i;
  let match = script.exec(body);
  if (match) {
    const source = match[0].match(/src="([a-zA-Z0-9-.\/:]*)"/);
    body = body.replace(
      script,
      `<scriptloader src=${source && source[1]}></scriptloader>`
    );
  }
  const iframe = /<iframe[\S\s]*?<\/iframe>/i;
  match = iframe.exec(body);
  if (match) {
    const src = (/\/embed\/([a-zA-Z0-9-_]*)/).exec(match[0]);
    if (src && !nofp) {
      body = `<fakeyt src=${src[1]}></fakeyt>`;
    }
    body = body.replace(
      /<iframe /gi,
      `<iframe id="iframe-${stamp}" width="100%" height="360" defer ${lazy ? `loading="lazy"` : ""
      }`
    );
  }
  let allTwitterMatches = body.match(/<blockquote[^>]*>(.*?)<\/blockquote>/gs);

  if (allTwitterMatches != null && allTwitterMatches != '' && typeof allTwitterMatches !== 'undefined') {
    allTwitterMatches.forEach(function (twit, key) {
      let twitterEmbedHtml = ''
      if (twit.includes('instagram-media') || twit.includes('twitter-tweet')) {
        let twitHtml = twit.replace(/\n/g, '<br />')
        twitterEmbedHtml = `<div class="mimg-vdo">${twitHtml}</div>`;
      }
      body = body.replace(twit, twitterEmbedHtml);
    })
  }
  return parser(body, {
    replace: (domNode) => {
      if (domNode.name == "fakeyt") {
        return (
          <FakeYTPlayer
            {...attributesToProps(domNode.attribs)}
            width="400px"
            height="360px"
            style="width:100%;"
          ></FakeYTPlayer>
        );
      }
      if (domNode.name == "scriptloader") {
        return (
          // <LazyLoad once>
          <ScriptLoader
            {...attributesToProps(domNode.attribs)}
          ></ScriptLoader>
          // </LazyLoad>
        );
      }
    },
  });
};

// const removeChar = (str) => {
//   return str
//     .replace(/&/g, "&amp;")
//     .replace(/>/g, "&gt;")
//     .replace(/</g, "&lt;")
//     .replace(/"/g, "&quot;");
// };
const arrayOnly = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "object") {
    return Object.values(value);
  }
  return [];
};

const getSponserData = (event, get1xBet) => {
    let _1xbet = get1xBet && Object.values(get1xBet)?.length && Object.values(get1xBet).find(
      (sponsors) => sponsors?.Event_Page === `${event}`,
    );

    return _1xbet?.sponserdata || [];
}

const generateCrumbFromUrl = (url = "") => {
  const slug = url.split("/").pop().split("-");
  slug.pop();
  return slug.join(" ").toUpperCase();
};
// Function to parse image url
// function isValidURL(str) {
//   var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
//   return !!pattern.test(str);
// }

const imageLoader = (src = "", width, height, dontAlter, im) => {
  src = src?.trim();
  const options = im == "fill" ? `impolicy=website&width=${width}&height=${height}` :
  im
  ? `im=Resize,width=${width},aspect=fit,type=normal`
  : `impolicy=website&width=${width}&height=${height}`;
  if (
    src == "" ||
    !src ||
    src == publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH
  ) {
    return `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?${options}`;
  }
  if (dontAlter) {
    let image = src.replace("http://stghindicms.news18.com/wp-content/uploads/", "https://images.news18.com/staging/ibnkhabar/uploads/");
    image = image.replace("http://img01.ibnlive.in", "https://images.news18.com", "cdn2.storyasset.link");
    return image;
  }
  let image = src
    .replace(/http(s)?:\/\/[a-zA-Z\.\-0-9\/]+\/uploads\//, "")
    .replace("https://images.news18.com/ibnkhabar/uploads/", "");
  image = image.replace("https://images.news18.com/stgrevamp-hindi/", '');
  //return isValidURL(image) ? image : `https://images.news18.com/ibnkhabar/uploads/${image}?${options}`;
  return `https://images.news18.com/ibnkhabar/uploads/${image}?${options}`;
};
const limitChar = (str = "", length) => {
  if (str.length < length) {
    return str;
  }
  return str.substring(0, length) + "...";
};
const stripTags = (str = "") => {
  return str.replace(/(<([^>]+)>)/gi, "");
};

const ignoreQueryParams = (url = "", reSlash = true) => {
  const queryPos = url.indexOf("?");
  url = queryPos > 0 ? url.substr(0, queryPos) : url;
  if (!reSlash) {
    return url;
  }
  return url[url.length - 1] != "/" ? url : url.substring(0, url.length - 1);
};
const customizeUrl = (url, isAmp = false) => {
  if (typeof url !== "undefined" && url != "" && url != null) {
    if (publicRuntimeConfig.siteUrl != "https://hindi.news18.com/") {
      return url
        .replace(
          "https://hindi.news18.com/",
          publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`
        )
        .replace(
          "http://hindi.news18.com/",
          publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`
        );
    } else {
      return isAmp
        ? url.replace(
          "https://hindi.news18.com/",
          publicRuntimeConfig.siteUrl + "amp/"
        )
        : url;
    }
  }
};

const relatedCard = (stories = [], isDesktop, isAmp, heading) => {
  // const width = isDesktop ? 180 : 171;
  // const height = isDesktop ? 120 : 114;

  if (!stories.length) {
    return "";
  }

  return `
  <div class="rltn">
  <h2 class="rlthd">${stories[0] && stories[0].image ? "चुनाव 2022" : (heading ? heading : "संबंधित खबरें")}</h2>
    <div class="rltnsls tq">	
           ${stories
      .map((story, index) => {
        return index < 4 ? `<a class="districtSelect" id='related_stories_cp_${index}' href=${(story.url || story.weburl || story.posturl).replace(
          "https://hindi.news18.com/",
          `${publicRuntimeConfig.siteUrl}${isAmp ? "amp/" : ""}`
        )} data-vars-event-category="Related_Story" data-vars-event-label="${encode(story.display_headline || story.title || story.headline)}">
                         <figure><amp-img src=${story?.images?.url ? story?.images?.url +"?impolicy=website&width=200&height=170" : ""} height="${170}" width="${200}"/></figure>
                         <p>${story.display_headline || story.title || story.headline}</p>
                    </a>` : '';
      })
      .join(" ")}
      </div>
      </div>`;
};

const stateStories = (stories, id, city, cat) => {
  stories = stories
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  let stateList = [
    {
      hi: "उत्तर प्रदेश",
      href: "https://hindi.news18.com/news/uttar-pradesh/",
    },
    {
      hi: "बिहार",
      href: "https://hindi.news18.com/news/bihar/",
    },
    {
      hi: "मध्य प्रदेश",
      href: "https://hindi.news18.com/news/madhya-pradesh/",
    },
    {
      hi: "राजस्थान",
      href: "https://hindi.news18.com/news/rajasthan/",
    },
    {
      hi: "उत्तराखंड",
      href: "https://hindi.news18.com/news/uttarakhand/",
    },
    {
      hi: "हरियाणा",
      href: "https://hindi.news18.com/news/haryana/",
    },
    {
      hi: "झारखंड",
      href: "https://hindi.news18.com/news/jharkhand/",
    },
    {
      hi: "छत्तीसगढ़",
      href: "https://hindi.news18.com/news/chhattisgarh/",
    },
    {
      hi: "हिमाचल प्रदेश",
      href: "https://hindi.news18.com/news/himachal-pradesh/",
    },
    {
      hi: "महाराष्ट्र",
      href: "https://hindi.news18.com/news/maharashtra/",
    },
    {
      hi: "पंजाब",
      href: "https://hindi.news18.com/news/punjab/",
    },
  ];

  const selectedState = stateList.filter((c) =>
    cat.find((i) => i.name == c.hi)
  )[0];
  if (selectedState) {
    stateList = stateList.filter((i) => i.hi != selectedState.hi);
  }

  const dl = districtList.filter((i) => i.href.includes(selectedState?.href?.split("/news/").pop()));

  return `
  <div class="addef" style="min-height:313px; "><div class="slct_sate_city_sec">
    <h4 class="slction_hdng">
      आपके शहर से <span>(${city.name || city.hi})</span>
    </h4>
  </div><div class="slidr_sec">
    <div class="rltnsls">
            ${stories
      .map(
        (item) => `<a class="districtSelect" href=${item.url.replace(
          "https://hindi.news18.com/",
          `${publicRuntimeConfig.siteUrl}amp/`
        )} data-vars-event-category="Local18_Select"
         data-vars-event-label="${encode(item.title)}" >
              <figure>
                <img
                  src=${imageLoader(item.thumbnail, 200, 170)}
                  width="200"
                  height="170"
                />
              </figure>
              <p>
                ${item.title}
              </p>
            </a>`
      )
      .join("")}
    </div>
    </div>
  </div></div>
  `;
};

const currentDate = () => {
  return new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
};
const ellipsis = (str = "", len = 98) => {
  return `${str.slice(0, len)}...`;
};
const loadTvfn = (posterImage) => {
  scriptLoader(
    "https://static.vidgyor.com/player/account/n18/js/n18.js",
    () => {
      const vgr_options = {
        accountId: "62bd56e4517f060009f59961",
        videoId: "b3f70db36af57_live",
        isAutoPlay: true,
        isMute: true,
        posterImageUrl: '',
        // posterImageUrl: posterImage
        //   ? posterImage
        //   : "https://images.news18.com/ibnkhabar/uploads/2019/09/livetv.jpg?impolicy=website&width=407&height=229",
        tapToUnmute: false,
        disableAds: false,
        pip: "0",
      };
      VIDGYOR.initPlayer(vgr_options);
      const el = document.querySelector("#tvposterhome");
      if (el) {
        el.remove();
      }
      scriptLoader(
        "https://static.vidgyor.com/player/v12/js/player.min.js"
      );
    }
  );
};
// const loadTvfn = () => {
//   scriptLoader(
//     'https://content.vidgyor.com/live/dai/js/vidgyor_livemidroll_vjs_n18.min.js',
//     () => {
//       let playerContainer = document.querySelector('#playerContainer');
//       playerContainer.innerHTML = '';
//       let posterImage =
//         'https://images.news18.com/ibnkhabar/uploads/2019/09/livetv.jpg?impolicy=website&width=407&height=229';
//       let videoUrl = '';
//       let channelName = 'news18india';
//       let isMute = true;
//       let isAutoplay = true;
//       VIDGYOR.loadPlayer(
//         posterImage,
//         videoUrl,
//         channelName,
//         isMute,
//         isAutoplay
//       );
//       VIDGYOR.hideControlBar(false);
//     }
//   );
// };

const setDefaultImage = ({ target }, width, height, defaultImageURL=false) => {

  let url = `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}`;
  if (defaultImageURL) {
    url = defaultImageURL;
  }
  if (width && height) {
    url = `${url}?impolicy=website&width=${width}&height=${height}`;
    // url = `${url}?impolicy=website&width=${width}${(height != null) ? '&height=' + height : ''}`;
  }
  target.src = url;
  target.onError = "";
};
const loadGS = (fn = () => { }) => {
  const cx = publicRuntimeConfig.gceCode;
  scriptLoader(`https://cse.google.com/cse.js?cx=${cx}`, fn);
};
const holaPlayer = (articleData, videoUrl, isMobile = false, isEvent = '') => {
  const divPlayerId = isEvent == 'navratri2022' ? 'navratri_2022' : articleData.story_id;
  let preAddTag =
    "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/1039154/Hindi_News18/Hindi_News18_Ros/    Hindi_News18_ROS_Video_Preroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]",
    preAddTagMobile =
      "https://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=/1039154/Hindi_News18_Wap/Hindi_News18_Wap_VideoPrerolls/Hindi_News18_Wap_VideoPrerolls&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]",
    midAddTag =
      "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/1039154/Hindi_News18/Hindi_News18_Ros/Hindi_News18_ROS_Video_Midroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]",
    postAddTag =
      "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/1039154/Hindi_News18/Hindi_News18_Ros/Hindi_News18_ROS_Video_Postroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]",

    _mute = true,
    userclick = 0,
    count = 1,
    play = 1,
    time_frame = [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    time_duration = 0,
    adCount = 1,
    playCount = 1,
    video_id = isEvent == 'navratri-2022' ? '' : articleData.videoId,
    duration = "",
    desc_url = "",
    playerSize = "",
    time_frame_tracked = new Array(),
    ten_second_tracked_count = 1,
    thirty_second_tracked_count = 1,
    onetwenty_second_tracked_count = 1,
    pauseVal = 1,
    //cdn_static = 'http://video.h-cdn.com/static',
    thirdPartyJS = 1,
    playerHeight = isMobile ? "250px" : "406px",
    autoPlay = true,
    { headline } = articleData,
    posterImage = "";

  if (isEvent == 'navratri2022') {
    if (isMobile) {
      preAddTag = "https://pubads.g.doubleclick.net/gampad/ads?iu=/1039154/NW18_HIND_PWA/NW18_HIND_FESTIVAL_PWA/NW18_HIND_FESTIVAL_PWA_AL/NW18_HIND_FSTVL_AL_PWA_ROS_Preroll_400x300&description_url=[placeholder]&tfcd=0&npa=0&sz=400x300&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]";
    }
    else {
      preAddTag = "https://pubads.g.doubleclick.net/gampad/ads?iu=/1039154/NW18_HIND_Desktop/NW18_HIND_FESTIVAL/NW18_HIND_FESTIVAL_AL/NW18_HIND_FSTVL_AL_ROS_Preroll_640x480&description_url=[placeholder]&tfcd=0&npa=0&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=[timestamp]";
    }

  }

  window.hola_player(
    {
      // player: "#holaPlayerContainer_" + isEvent=='navratri2022'?'navratri_2022':articleData.story_id,
      player: "#holaPlayerContainer_" + divPlayerId,
      controls: true,
      width: "100%",
      height: playerHeight,
      sources: [
        {
          src: videoUrl,
          type: "video/mp4",
          // type: "",
          label: "1080p",
        },
      ],
      //poster: cdn_static+'/mp4/tears_of_steel_1080p_MP4.jpg',
      auto_play: autoPlay,
      ads: { manual: true },
      graph: true,
      title: headline,
      poster: posterImage,
      muted: _mute,
    },
    function (player) {
      let played_ad = {},
        ad = true,
        ad1 = true,
        ad2 = true;
      player.isAudio_ = _mute;
      setInterval(function (play, count) {
        if (play == 1) {
          count++;
        }
      }, 1000);
      player.on("ready", function () {
        // console.log("In Load");
      }),
        player.on("readyforpreroll", function () {
          play = 0;
        }),
        player.on("loadedmetadata", function () {
          duration = player.duration();
        }),
        player.on("play", function () {
          // console.log("playing");
          if (playCount == 1) {
            logEvent("Hola Video Player", "Play", video_id);
          }

          if (adCount == 1 && playCount == 1) {
            logEvent("VP_load_Hola", "adplay", "1");
            logEvent("ad Block", "count", video_id);
          }

          if (autoPlay == true && playCount == 1) {
            logEvent("Hola Video Player", "AutoPlay", video_id);
            playCount++;
          }
        }),
        player.on("pause", function () {
          logEvent("Hola Video Player", "Pause", video_id);
        }),
        player.on("resume", function () {
          logEvent("Hola Video Player", "Resume", video_id);
        }),
        player.on("click", function () {
          if (userclick == 0 && autoPlay == false) {
            logEvent("Hola Video Player", "Start", video_id);
            userclick++;
          }
        }),
        player.on("seeked", function () {
          logEvent("Hola Video Player", "Seek", video_id);
        }),
        player.on("complete", function () {
          logEvent("Hola Video Player", "Complete", video_id);
        }),
        player.on("ended", function () {
          logEvent("Hola Video Player", "Complete", video_id);
        }),
        player.on("timeupdate", function () {
          const cur = player.currentTime(),
            chapter = Math.floor(cur / 5);

          if (ad && chapter == 1) {
            player.ima.playAd(preAddTag);
            ad = false;
          }
          if (ad1 && chapter == 9) {
            player.ima.playAd(midAddTag);
            ad1 = false;
          }
          if (ad2 && chapter == 42) {
            player.ima.playAd(midAddTag);
            ad2 = false;
          }
          if (typeof time_frame !== "undefined") {
            for (let i = 0; i < time_frame.length; i++) {
              const completion_time =
                (parseFloat(duration) * time_frame[i]) / 100;
              if (
                Math.round(cur) == Math.round(completion_time) &&
                time_duration != Math.round(cur)
              ) {
                time_duration = Math.round(cur);
                if (time_frame_tracked.indexOf(time_duration) == -1) {
                  if (thirdPartyJS == "1") {
                    logEvent(
                      "Hola Video Player",
                      "Play - " + time_frame[i] + "%",
                      video_id
                    );
                  }
                  time_frame_tracked[time_duration] = time_duration;
                }
                break;
              }
            }
          }
          if (Math.round(cur) == 10 && ten_second_tracked_count == 1) {
            if (thirdPartyJS == "1") {
              logEvent(
                "Hola Video Player",
                "Time Completion - " + Math.round(cur) + " sec ",
                video_id
              );
            }
            ten_second_tracked_count++;
          }
          if (Math.round(cur) == 30 && thirty_second_tracked_count == 1) {
            if (thirdPartyJS == "1") {
              logEvent(
                "Hola Video Player",
                "Time Completion - " + Math.round(cur) + " sec ",
                video_id
              );
            }
            thirty_second_tracked_count++;
          } else if (
            Math.round(cur) == 120 &&
            onetwenty_second_tracked_count == 1
          ) {
            if (thirdPartyJS == "1") {
              logEvent(
                "Hola Video Player",
                "Time Completion - " + Math.round(cur) + " sec ",
                video_id
              );
            }
            onetwenty_second_tracked_count++;
          }
        }),
        player.on("adstart", function () {
          logEvent("Video Advertisement", "Ad Play", video_id);
        }),
        player.on("adskip", function () {
          logEvent("Video Advertisement", "Ad Skip", video_id);
        }),
        player.on("error", (e) => {
          console.log(e);
          // player.off('error', change_src);
          // player.src(video_src);

          // if(thirdPartyJS == '1'){
          //   logEvent("Hola Video Player","Fallback",title+":Could not load m3u8")
          // }
        });
    }
  );
};

const cd7 = ({
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
  return `${ffagency || agency || "News18.com"} | ${author_type || "digital"
    } | ${ffline || byline || "News18 हिंदी"}${(Array.isArray(roles) ? roles : []).includes("contributor")
      ? " | contributor"
      : ""
    }`;
};

const getYtId = (url = "") => {
  const match = (/(watch\?v=|embed\/)([a-z0-9A-Z-_]*)/gi).exec(url);
  if (match && match[2]) {
    return match[2];
  }
  return false;
};

const getPlayerUrl = (name = "", id = "") => {
  return `${publicRuntimeConfig.siteUrl}cricket/profile/${name
    ?.toLowerCase()
    ?.split(" ")
    ?.join("-")}/${id}.html`;
};

const extractMetatags = (articleData = {}) => {
  if (Object.keys(articleData).includes("meta_titile")) {

    return {
      page_title: articleData.meta_titile,
      page_description: articleData.meta_description,
      page_keywords: articleData.meta_keyword,
    };
    // return {
    //   tags: [
    //     {
    //       page_title: articleData.meta_titile,
    //       page_desc: articleData.meta_description,
    //       page_keywords: articleData.meta_keyword,
    //     },
    //   ],
    // };
  }

  return null;
};

const capIt = (str = " ") => {
  if (str && str.length > 0) {
    return str[0]?.toUpperCase() + str?.slice(1);
  }
  return "";

};

const imageDomainChanger = (url = "") => {
  return url.replace(
    /http(s)?:\/\/[a-zA-Z\.\-0-9\/]+\/uploads\//gim,
    "https://images.news18.com/ibnkhabar/uploads/"
  );
};

const DynamicBanner = ({ data, obkey, isMobile }) => {
  if (data && data[obkey] && data[obkey]["home-page-banner"]) {
    const content = data[obkey]?.["home-page-banner"][0];
    return (
      <a href={content.click_tracker_sponser}>
        <img
          src={imageLoader(
            isMobile ? content.mobile_img : content.desktop_img,
            "100%",
            isMobile ? "69" : "52",
            true
          )}
          width="100%"
          loading="lazy"
          style={{ margin: "10px 0 5px 0" }}
          height={isMobile ? "69" : "52"}
        />
      </a>
    );
  }

  return null;
};

const customDimensions = (article) => {
  if (article) {
    let type = article.post_type;
    const ff_source = (article.ff_source || "").toLowerCase();
    switch (type) {
      case "text": {
        type = (ff_source === "hyperlocal" && article.local18_video) ? "Video_Story" : ff_source === "hyperlocal" ? "Text_Story" : "News";
        break;
      }
      case "videos": {
        type = ff_source === "hyperlocal" ? "Video_Story" : "Video";
        break;
      }
      case "photogallery": {
        // type = ff_source === "hyperlocal" ? "Photogallery_Story" : "News";
        type = 'photogallery';
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

    let cat = article.categories;
    cat =
      (cat || [])
        .filter((item) => item.permalink)
        .map((item) => item.slug)[0] || "";

    return {
      // dimension14: cat,
      dimension15: type,
      dimension16: tags,
    };
  }

  return {};
};

const liveBlogScroll = (inView, entry, index, pageNumber, fired) => {
  // update url on scroll
  const url = window.location.href;
  const r = /-page-(\d+).html/gi;
  const m = r.exec(url);
  let page = index / 20 + 1;

  if (pageNumber) {
    page = page + pageNumber - 1;
  }

  if (m && !(pageNumber && index == 0)) {
    if (page == 1) {
      history.replaceState({}, "", url.replace("-page-2.html", ".html"));
    } else {
      history.replaceState({}, "", url.replace(m[0], `-page-${page}.html`));
    }
  } else if (index != 0 && !pageNumber) {
    history.replaceState({}, "", url.replace("-page-2.html", `.html`));
  } else if (index == 0 && pageNumber) {
    history.replaceState({}, "", url.replace(m[0], `-page-${page}.html`));
  }

  if (!fired.includes(index) && index != 0) {
    // Trigger comscore
    self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
    if (typeof OBR !== "undefined") {
      OBR.extern.researchWidget();
    }
    logPageViewLiveScore(document.title);
    firePV();
    fired.push(index);
  }
};

const scrollToTarget = (id, position= "start") => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: position, inline: "nearest" });
  }
};

const scrollIntoViewIfNeeded = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    element.scrollIntoViewIfNeeded(true);
  }
};

const findIndexOfCharFromLast = (str, char) => {
  if (str) {
    for (let i = str.length - 1; i > 0; i--) {
      if (str[i] === char) {
        return i;
      }
    }
  }
  return "notFound";
};

const sectionExtractor = (data) => {
  let sec = '';

  if (data) {
    if (Array.isArray(data.categories)) {
      sec += data.categories.reverse().map((i) => i?.slug).filter(Boolean).join(", ");
    }
  }

  return sec;
};

const sectionMaker = (sl = "") => {
  return sl
    .split(",")
    .slice(0, 4)
    .reduce((p, n) => p + `${p == "" ? "" : ", "}hindi.news18.com - ${(sl=== "Cricket"||sl=== "IPL photos"||sl=== "IPL videos")?"cricket":"news"}, hindi.news18.com - ${sl=== "Cricket"?"ipl, ipl":sl=== "IPL photos"?"photos, ipl":sl === "IPL videos"?"videos, ipl" :tweakSection(n)}`, '');
};

const tweakSection = (sec = "") => {
  return sec.replace(/-/gi, " ").split(" ").map((s) => capIt(s).trim()).join(" ");
};

const pubStackApi = () => {
  return 'https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/pubstack-player/news18-hindi/v2/production-player.js?v=1.3';
};

const newVidgyorScript = (vidStreamData, vid_exist) => {
  var PUBSTACK_VIDEO_CONFIG = {
    env: "production",
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWUyMjZhMDIxNWEyNzg0ODE4NTA1YjEiLCJzY29wZSI6IldFQlNJVEUiLCJzZXNzaW9uX2lkIjoiNjFhN2JiMjEtYTJkMy00NGYyLWE5NzYtOThkNDQ4NDRmOWY2IiwiaWF0IjoxNTk5OTg3Njk2fQ.faoXfaKgAPdxpWIW2OhVrpROELMWsIVLd66C4Omba3M",
    website: {
      id: "5ee0c7d7274b9d7d0ae8f434",
      c3: "10",
      title: "News18 Hindi",
    },
    base_href:
      "https://images.news18.com/static_news18/pix/ibnhome/news18/js/custom-js/news18-player/v-12/",
    version: "1.37",
    publisher_id: "6683813",
  };

  var loadPubstackPlayer = function () {
    if (typeof window !== "undefined" && window?.pubstackJSLoaded) {
      return;
    }
    
    if(typeof window !== "undefined"){
      window.PUBSTACK_VIDEO_CONFIG = PUBSTACK_VIDEO_CONFIG;
    }

    // var head = document.getElementsByTagName("HEAD")[0];
    // var script = document.createElement("script");
    // script.src = PLAYER_LIBRARY + "?v=" + PUBSTACK_VIDEO_CONFIG.version;
    // script.onerror = function (error) {
    //   console.log(error);
    // };
    // head.appendChild(script);
    if (typeof window !== "undefined") {
      try {
        require("../../common_react/CommonSrc/CommonComponents/nw18VideoPlayer/v-12/nw18-player-min");
        if (window?.pubstackJSLoaded) {
          window.location.href.indexOf("video-wall") == -1 &&
            window.refreshPubstackPlayers(vid_exist ? vidStreamData : "");
        } else if (window.location.href.indexOf("video-wall") == -1) {
          !(function () {
            var e = setInterval(function () {
              try {
                clearInterval(e),
                  window.refreshPubstackPlayers(vid_exist ? vidStreamData : "");
              } catch (err) { }
            }, 1000);
          })();
        }
      } catch (error) {
        console.log("Error in Vidgyor Loading", error);
      }
    }
  };
  loadPubstackPlayer();
};

const replaceHost = (url) => {
  url = url.replace('https://betahindi.news18.com/', '');
  url = url.replace('https://stghindi.news18.com/', '');
  url = url.replace('https://hindi.news18.com/', '');
  url = url.replace('http://localhost:3050/', '');
  return url;
};

const getRedirection = async (current_url = "") => {
  try {
    current_url = current_url.replace(/\/$|$/, '/');
    return getRedirectionApi(current_url);
  } catch (error) {
    console.log(error);
    return false;
  }

};

const getAppDownloadUrl = (userAgent) =>{
  let appDownLoadUrl = ''
  if (userAgent.match(/Android/i)) {
    appDownLoadUrl = "https://play.google.com/store/apps/details?id=com.divum.ibn&referrer=utm_source%3Dhindi%26utm_medium%3Dwebbanner%26utm_campaign%3Dappinstall%26anid%3Dadmob";
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    appDownLoadUrl = "https://apps.apple.com/app/apple-store/id395194912?pt=433541&ct=hindi-webbanner-installapp&mt=8";
  }else{
    appDownLoadUrl = "https://play.google.com/store/apps/details?id=com.divum.ibn&referrer=utm_source%3Dhindi%26utm_medium%3Dwebbanner%26utm_campaign%3Dappinstall%26anid%3Dadmob";
  } 
  return appDownLoadUrl
}

const getCd1Data =(reported_by,translated_by,written_by,edited_by,articleData)=>{
  //for CD1 calculation
    let translateRepoetedBy='';
    if(reported_by?.length > 0) {
      translateRepoetedBy = translateRepoetedBy
      ?translateRepoetedBy +" | "+ reported_by[0]?.english_name+'_'+(reported_by[0]?.ID || articleData?.reported_by[0]?.id)
      :reported_by[0]?.english_name+'_'+(reported_by[0]?.ID ||  articleData?.reported_by[0]?.id);
    }
    if(translated_by?.length >0) {
      translateRepoetedBy = translateRepoetedBy
      ?translateRepoetedBy +" | "+ translated_by[0]?.english_name+'_'+(translated_by[0]?.ID || articleData?.translated_by[0]?.id)
      :translated_by[0]?.english_name+'_'+(translated_by[0]?.ID|| articleData?.translated_by[0]?.id);
    }
    if(written_by?.length > 0) {
      translateRepoetedBy = translateRepoetedBy
      ?translateRepoetedBy +" | "+ written_by[0]?.english_name+'_'+(written_by[0]?.ID|| articleData?.written_by[0]?.id)
      : written_by[0]?.english_name+'_'+(written_by[0]?.ID || articleData?.written_by[0]?.id);
    }
    if(edited_by?.length > 0) {
      translateRepoetedBy = translateRepoetedBy
      ?translateRepoetedBy +" | "+ edited_by[0]?.english_name+'_'+(edited_by[0]?.ID || articleData?.edited_by[0].id)
      : edited_by[0]?.english_name+'_'+(edited_by[0]?.ID || articleData?.edited_by[0].id);
    }
    return translateRepoetedBy;
  }

export {
  scriptLoader,
  pageEvents,
  urlParser,
  newVidgyorScript,
  Wrapper,
  replaceSpecialChars,
  getArticleSocials,
  livePostSourceParser,
  arrayOnly,
  getSponserData,
  generateCrumbFromUrl,
  imageLoader,
  limitChar,
  stripTags,
  ignoreQueryParams,
  customizeUrl,
  firePV,
  currentDate,
  updateUrl,
  relatedCard,
  ellipsis,
  loadTvfn,
  // switcher,
  setDefaultImage,
  loadGS,
  holaPlayer,
  cd7,
  getYtId,
  getPlayerUrl,
  extractMetatags,
  stateStories,
  capIt,
  imageDomainChanger,
  DynamicBanner,
  customDimensions,
  liveBlogScroll,
  scrollToTarget,
  scrollIntoViewIfNeeded,
  findIndexOfCharFromLast,
  fireVP,
  sectionExtractor,
  sectionMaker,
  pubStackApi,
  getRedirection,
  getAppDownloadUrl,
  getCd1Data,
};
