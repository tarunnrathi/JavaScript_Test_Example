import ampHelper from "includes/Amp/ampHelper";
import validator from "includes/Amp/validator";
import SocialShare from "widgets/Amp/SocialShare";
import Byline from "widgets/Amp/Byline";
import LiveBlog from "widgets/Amp/LiveBlog";
import ReactHtmlParser from "html-react-parser";
import TenThingsText from "components/Common/TenThingsText";
import ReadMore from "components/Common/ReadMore";
import articleHelper from "includes/article.helper";
import Recipe from "components/Common/Recipe";
import Head from "next/head";
import {
  stateStories,
  capIt,
  arrayOnly,
  relatedCard,
} from "includes/article.util";
import { youtubeParser, anchorParser } from "../../../helper/articleBodyParser";
import ArticleImage from "components/Common/ArticleImage";
import RhsPhoto from "widgets/Common/Responsive/RhsPhoto";
import ArticleStyle from "styles/Amp/ArticleStyle";
import { longDateConversion } from "../../../helper/global";
// import InstallAppIcon from "widgets/Mobile/InstallAppIcon";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { Fragment } from "react";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";
import NextPreviousArticleAMP from "components/Common/NextPreviousComponentArticleAMP";

function matchReplacer(regex, body, arr, tag) {
  const match = regex.exec(body);

  if (!match) {
    return [arr, body];
  }

  return matchReplacer(
    regex,
    body.replace(regex, tag ? `[${tag}${arr.length || 0}]\r\n` : ""),
    [...arr, match[0]],
    tag
  );
}

const webstoryReplacer = (body) => {
  const matches = body.matchAll(
    /<iframe .*?"nw_webstory_embed".*?<\/iframe>/gi
  );
  if (matches) {
    Array.from(matches).forEach((m) => {
      m = m[0];
      const src = /src="(.*?)"/gi.exec(m);
      const img = /data-img="(.*?)"/gi.exec(m);
      const title = /title="(.*?)"/gi.exec(m);
      if (src && img && title && src[1] && img[1] && title[1]) {
        const newElement =
          `<a href=${src[1]} target="_blank"><div role="button" tabindex="4"  class="dfwb" [hidden]="storyUrl">
        <div class="dfwbdt">
<amp-img src="${img[1]}" alt="${title[1]}" height="470" width="300"/>
          <div class="dfwbdthd">
            <em></em>
            ${title[1]}
            <button>
            आगे देखें…
            </button>
          </div>
        </div>
      </div></a>`
            .replace(/\n/gis, "")
            .replace(/\r/gis, "");
        body = body.replace(m, newElement);
      }
    });
  }
  return body;
};

function handleYoutubeEmbedWithDiv(content) {
  const regex = /<div.class="youTubeVideoPlayer" .*?<\/div>/gi;
  const matches = regex.exec(content);
  if (matches) {
    matches.forEach((match) => {
      let youtubeId = match.match(/data-youtube-id="(\S*?)"/);
      // let youtubeTitle = match.match(/data-youtube-title="(.*?)"/);
      let youtubeCat = match.match(/data-youtube-category="(.*?)"/);
      youtubeId = Array.isArray(youtubeId) && youtubeId[1];
      // youtubeTitle = Array.isArray(youtubeTitle) && youtubeTitle[1];
      youtubeCat = Array.isArray(youtubeCat) && youtubeCat[1];
      try {
        if (youtubeId && youtubeId[1]) {
          content = content.replace(
            match,
            // `<div id="AmpYoutubeEmbed" ><amp-youtube data-videoid=${youtubeId[1]} layout="responsive" width="480" height="270"></amp-youtube></div>`
            `<div id="AmpYoutubeEmbed" ><amp-iframe width="200" height="210" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0" src="https://images.news18.com/dlxczavtqcctuei/news18/prod/pubstack.html?youtube_id=${youtubeId || ""
            }&youtube_category=${youtubeCat || ""
            }&youtube=true&domain=else"></amp-iframe></div>`
          );
        }
      } catch (error) {
        if (youtubeId && youtubeId[1]) {
          content = content.replace(
            match,
            // `<div id="AmpYoutubeEmbed" ><amp-youtube data-videoid=${youtubeId[1]} layout="responsive" width="480" height="270"></amp-youtube></div>`
            `<div id="AmpYoutubeEmbed" ><amp-iframe width="200" height="210" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0" src="https://images.news18.com/dlxczavtqcctuei/news18/prod/pubstack.html?youtube_id=${""}&youtube_category=${""}&youtube=true&domain=else"></amp-iframe></div>`
          );
        }
      }
    });
  }
  return content;
}

// function ReplaceAnchor(str){
//   if(str.indexOf("href") > -1 && str.indexOf("<a>")){
//     return str?.replace("<a","<a id=article_hyperlink_cp");
//   }else{
//     return str;
//   }
// }
const Article = (props) => {
  const ogContentType = props.data.paramObj.category;
  const { section, breadCrumbArray, nextPrevious } = props.data;
  // let showRelatedWidget = true;
  const {
    // match_id,
    relatedArticles,
    hightlight_data = [],
    local18_video: local18Video,
    disclaimer,
  } = props.data.articleData;
  let isDistrict = false;
  if (
    props.data.articleData &&
    props.data.articleData.ff_source &&
    props.data.articleData.ff_source === "Hyperlocal"
  ) {
    isDistrict = true;
  }

  const firebaseconfig = props?.data?.config ? props?.data?.config : {};

  const { photoStories } = props.data;
  // const relatedStories = [];
  const headline = props.data?.articleData?.headline;
  const { story_id } = props.data.articleData;
  const isRecipe = props.data.articleData.recipe_rating;

  const newBody = handleYoutubeEmbedWithDiv(props?.data?.articleData?.body);

  let body = newBody;
  body = validator(
    ampHelper.getAMPCodes(webstoryReplacer(body || props.data.articleData.body))
  );
  body = body.replace(/vamp-iframe/gis, "amp-iframe");
  let [tablelist, tbody] = matchReplacer(
    /<table[\S\s]*?<\/table>/gi,
    body,
    [],
    "tl"
  );
  tablelist.forEach((item, index) => {
    const itm = item.replace(/<br ?\/>\r?\n?/gim, "");
    tbody = tbody.replace(`[tl${index}]`, itm);
  });
  body = tbody;
  const ampAds = ampHelper.get_amp_ad_article(
    props.data.paramObj.subCategory,
    props.data.paramObj.category,
    "article",
    isDistrict
  );

  const adTarget = ampHelper.get_ad_targetting(
    props.data.articleData,
    props.data.paramObj,
    props.pageSeo,
    "news"
  );
  const tags_arr = props.data.articleData["tags"]
    ? props.data.articleData["tags"]
    : [];
  let showSanjivaniAd = false;
  tags_arr &&
    tags_arr.length &&
    tags_arr.forEach((tag) => {
      if (tag.name === "Sanjeevani") {
        showSanjivaniAd = true;
      }
    });

  function getAd(pos) {
    switch (pos) {
      case 1: {
        return `<p class="ampaddcntr"><div class="ad-container go adcenter">
        <amp-ad 
          width=${336} 
          height=${280} 
          type="doubleclick" 
          data-slot="${ampAds.middleAd1}" 
          json='${adTarget}' 
          data-loading-strategy="0.5"
          data-lazy-fetch="true"
          //data-multi-size-validation="false" 
          data-multi-size="300x250"  
          rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'>
        </amp-ad>
      </div></p>`;
      }
      case 2: {
        return `
        <div class="taboola_div">
        <amp-ad 
          width=${336} 
          height=${280} 
          type="doubleclick" 
          data-slot=${ampAds?.middleAd3}
          data-loading-strategy="0.5"
          data-lazy-fetch="true"
          //data-multi-size-validation="false" 
          data-multi-size="300x250"  
          rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'>
        </amp-ad>
      </div>`;
      }
      case 3: {
        return `<p class="ampaddcntr"><div class="amp-flying-carpet-text-border"></div>
        <amp-fx-flying-carpet height="600px">
          <amp-ad width="${300}"
            height="${600}"
            layout="fixed"
            type="doubleclick" data-multi-size="300x250,120x600" 
            data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_ROS_AMP/NW18_HIND_ROS_AMP_AS/NW18_HIND_AS_AMP_ROS_FLY_300" 
            json='${adTarget}' 
            data-loading-strategy="0.5" 
            data-lazy-fetch="true"
            //data-multi-size-validation="false" 
            rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'
          >
          </amp-ad>
        </amp-fx-flying-carpet>
        <div class="amp-flying-carpet-text-border"></div></p>`;
      }
      case 5: {
        if (showSanjivaniAd) {
          return `<figure id="new_ad_sanjivani">
            <amp-ad
              layout="fluid"
              type="doubleclick"
              json='${adTarget}' 
              data-slot="/1039154/NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_Sanjeevani', [300, 120]"
              height="fluid">
              </amp-ad></figure>`;
        }
        return;
      }

      default: {
        return `<p class="ampaddcntr"><div class="ad-container go adcenter">
          <amp-ad 
            width=${336} 
            height=${280} 
            type="doubleclick" 
            data-slot="${ampAds.middleAd2}" 
            json='${adTarget}' 
            data-loading-strategy="0.5"
            //data-multi-size-validation="false" 
            data-multi-size="false" data-lazy-fetch="true"  
            rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'>
          </amp-ad>
        </div></p>`;
      }
    }
  }

  function articleBody(body) {
    const formatArray = {
      ".jpeg": ".jpeg?im=Resize,width=300,aspect=fit,type=normal",
      ".jpg": ".jpg?im=Resize,width=300,aspect=fit,type=normal",
      ".png": ".png?im=Resize,width=300,aspect=fit,type=normal",
    };
    const { articleData } = props.data;
    articleData.body = body
      .replace(/<ul>/gi, '<ul class="ul_block">')
      .replace(/<ol>/gi, '<ol class="ol_block">')
      .replace(/<img/gim, "<amp-img");
    articleData.body = articleData.body.replace(
      /\b(?:.jpeg|.jpg|.png)\b/gi,
      (matched) => formatArray[matched]
    );
    body = articleHelper.storyPara(
      articleData,
      false,
      false,
      props?.data?.articleData?.liveblog_api_url?.blog_url,
      true
    );
    let contentArray = anchorParser(youtubeParser(body.__html, true), true);
    let nad = props?.data?.articleData?.nw_amp_add;
    let check;
    let { categories = [], subsection = [] } = articleData;
    categories = arrayOnly(categories);
    subsection = arrayOnly(subsection);

    let disStories;
    if (articleData.fromDistrict?.length) {
      disStories = stateStories(
        articleData.fromDistrict,
        articleData.id,
        articleData.dis,
        categories,
        subsection
      );
    }
    let placedState = false;
    if (nad && typeof nad === "object" && Object.keys(nad).length > 0) {
      check = true;
      nad = JSON.parse(nad?.nw_amp_add);
      const nkeys = Object.keys(nad).map((n) => Number(n));
      const paras = contentArray.matchAll(/<p[\S\s]*?<\/p>/gim);
      let dex = 1;
      for (const para of paras) {
        if (para[0].includes("amp-twitter")) {
          continue;
        }

        if (dex === 3 && articleData.fromDistrict?.length) {
          placedState = true;
          contentArray = contentArray.replace(
            para[0],
            `${para[0]}${disStories || ""}`
          );
        }

        if (nkeys.includes(dex)) {
          const t = getAd(nkeys.indexOf(dex) + 1);
          contentArray = contentArray.replace(
            para[0],
            `${para[0]}${t ? t : ""}`
          );
        }
        if (dex === 3 && !articleData.fromDistrict?.length && relatedArticles) {
          contentArray = contentArray.replace(
            para[0],
            `${para[0]}${relatedCard(relatedArticles, false, true)}`
          );
        }

        dex += 1;
      }
    }
    contentArray = contentArray.split(/\r|\n/);
    let html = "";
    // const bottomStripAdded = false;

    for (let [index, value] of contentArray.entries()) {
     // value = ReplaceAnchor(value);
      let bodyPart = value.replace(/\r?\n?<\/?br ?\/?>/gim, "");
      bodyPart.includes("<link") &&
        bodyPart.includes('rel="stylesheet"') &&
        (bodyPart = "");
      if (bodyPart.includes("<style") && bodyPart.includes("</style>")) {
        bodyPart = bodyPart.split("</style>")[1];
      }
      if (bodyPart && !check) {
        html += `<p>${bodyPart}</p>`;
      } else {
        if (
          bodyPart.indexOf("</strong>") &&
          bodyPart.length - 9 === bodyPart.indexOf("</strong>")
        ) {
          bodyPart += "<br>";
        }
        html += bodyPart;
      }

      if (
        !placedState &&
        (check ? true : contentArray.length < 4) &&
        index === contentArray.length - 1
      ) {
        html += disStories || "";
      }

      if (index === 3 && !check) {
        html += `<p class="ampaddcntr"><div class="ad-container go">
              <amp-ad 
                width=${336} 
                height=${280} 
                type="doubleclick" 
                data-slot="${ampAds.middleAd1}" 
                json='${adTarget}' 
                data-loading-strategy="prefer-viewability-over-views"
                data-lazy-fetch="true"
                data-multi-size-validation="false" 
                data-multi-size="300x250"  
                rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'>
              </amp-ad>
            </div></p>`;
      }

      if (
        index === 2 &&
        relatedArticles?.length > 0 &&
        !check &&
        !articleData.fromDistrict?.length
      ) {
        html += relatedCard(relatedArticles, false, true);
      }
      if (index === 7 && !check) {
        html += `<p class="ampaddcntr"><div class="ad-container go">
              <amp-ad
                width=${336}
                height=${280}
                type="doubleclick"
                data-slot="${ampAds.middleAd2}"
                json='${adTarget}'
                data-loading-strategy="prefer-viewability-over-views" data-multi-size-validation="false"
                data-lazy-fetch="true"
                data-multi-size="300x250"
                rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'>
              </amp-ad>
            </div></p>`;
      }
      if (index === 9 && !check) {
        html += `<p class="ampaddcntr"><div class="amp-flying-carpet-text-border"></div>
                <amp-fx-flying-carpet height="600px">
                  <amp-ad width="${300}"
                    height="${600}"
                    layout="fixed"
                    type="doubleclick" data-multi-size="300x250 ,120x600" 
                    data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_ROS_AMP/NW18_HIND_ROS_AMP_AS/NW18_HIND_AS_AMP_ROS_FLY_300" 
                    json='${adTarget}' 
                    data-loading-strategy="prefer-viewability-over-views" 
                    data-lazy-fetch="true"
                    data-multi-size-validation="false" 
                    rtc-config='{"vendors": {"openwrap": {"PROFILE_ID" : "2059","PUB_ID" : "113941"},"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }},"timeoutMillis": 1000}'
                  >
                  </amp-ad>
                </amp-fx-flying-carpet>
                <div class="amp-flying-carpet-text-border"></div></p>`;
      }
      if (index === 5 && showSanjivaniAd && !check) {
        html += `<figure id="new_ad_sanjivani">
                      <amp-ad
                        layout="fluid"
                        type="doubleclick"
                        json='${adTarget}' 
                        data-slot="/1039154/NW18_HIND_PWA/NW18_HIND_ROS_PWA/NW18_HIND_ROS_PWA_AS/NW18_HIND_AS_PWA_ROS_Sanjeevani', [300, 120]"
                        height="fluid">
                        </amp-ad></figure>`;
      }
    }

    return { __html: html };
  }

  // function get_bowler_batsman_list(batsman, bowler, lastWicketInnings) {
  //   let batting = "";
  //   let bowling = "";
  //   let lastWicket = "";
  //   if (batsman.length > 0) {
  //     batsman.forEach((player) => {
  //       //for(let i= 0; i< batsman.length; i++){
  //       //let player = batsman[i];
  //       if (player.Striker === "Yes") {
  //         batting +=
  //           "<tr><td>" +
  //           player.name +
  //           "*</td><td>" +
  //           player.Runs +
  //           "(" +
  //           player.BallsFaced +
  //           ")</td><tr>";
  //       } else {
  //         batting +=
  //           "<tr><td>" +
  //           player.name +
  //           "</td><td>" +
  //           player.Runs +
  //           "(" +
  //           player.BallsFaced +
  //           ")</td><tr>";
  //       }
  //     });
  //     // console.log('battingInner', batting)
  //   }

  //   if (bowler.length > 0) {
  //     let j = 1;
  //     bowler.forEach((player) => {
  //       if (j > 2) {
  //         return false;
  //       }
  //       if (player.Bowling === "Yes") {
  //         bowling +=
  //           "<tr><td>" +
  //           player.name +
  //           "*</td><td>" +
  //           player.Over +
  //           "</td><td>" +
  //           player.Maiden +
  //           "</td><td>" +
  //           player.Runs +
  //           "</td><td>" +
  //           player.Wicket +
  //           "</td></tr>";
  //       } else {
  //         bowling +=
  //           "<tr><td>" +
  //           player.name +
  //           "</td><td>" +
  //           player.Over +
  //           "</td><td>" +
  //           player.Maiden +
  //           "</td><td>" +
  //           player.Runs +
  //           "</td><td>" +
  //           player.Wicket +
  //           "</td></tr>";
  //       }
  //       j++;
  //     });
  //   }

  //   if (lastWicketInnings["name"]) {
  //     lastWicket =
  //       lastWicketInnings["name"] +
  //       " " +
  //       lastWicketInnings["Runs"] +
  //       "(" +
  //       lastWicketInnings["BallsFaced"] +
  //       ")";
  //   }

  //   //console.log('battingOuter', batting)
  //   const arr = [];
  //   arr["batting"] = batting;
  //   arr["bowling"] = bowling;
  //   arr["lastWicket"] = lastWicket;
  //   //console.log(arr)
  //   return arr;
  // }

  // function live_match_parser(matchData) {
  //   let liveMatchListing = "";
  //   // const countMatch = 0;
  //   // const matchid = match_id;
  //   const { teamfa } = matchData;
  //   const { teamfb } = matchData;
  //   // const { teama_id } = matchData;
  //   // const { teamb_id } = matchData;
  //   // const seriesName = matchData.seriesname;
  //   const matchType = matchData.matchtype?.toLowerCase();
  //   // const venue = matchData.venue_mov;
  //   const matchTeam = [];
  //   matchTeam[teamfa] = matchData.teama;
  //   matchTeam[teamfb] = matchData.teamb;
  //   // const liveMatchURL =
  //   //   "/cricket/live-score/" +
  //   //   articleHelper.convertedToSlug(matchData?.teama_en) +
  //   //   "-vs-" +
  //   //   articleHelper.convertedToSlug(matchData?.teamb_en) +
  //   //   "-live-score-full-" +
  //   //   matchid +
  //   //   ".html";
  //   // const liveMatchURLC =
  //   //   "/cricket/live-score/" +
  //   //   articleHelper.convertedToSlug(matchData?.teama_en) +
  //   //   "-vs-" +
  //   //   articleHelper.convertedToSlug(matchData?.teamb_en) +
  //   //   "-ball-by-ball-live-commentary-" +
  //   //   matchid +
  //   //   ".html";

  //   // const matchstatus = matchData.status;
  //   const fteamNameA = matchData.teamfa;
  //   const fteamNameB = matchData.teamfb;
  //   const fInnings = matchData.firstInnings;
  //   const sInnings = matchData.secondInnings;
  //   const tInnings = matchData.thirdInnings;
  //   const { fourthInnings } = matchData;
  //   let fistinningsscores = "";
  //   let secondinningsscores = "";
  //   // const liveFlag = matchData.matchresult === "" ? true : false;
  //   let battingTeam = "";
  //   let bowlingTeam = "";
  //   let matchStatus = "";
  //   if (matchData.matchresult === "" && matchData.equation === "") {
  //     if (matchData.status) {
  //       matchStatus = matchData.status;
  //     } else {
  //       matchStatus = matchData.Toss_mov;
  //     }
  //   } else if (matchData.equation !== "") {
  //     matchStatus = matchData.equation;
  //   } else {
  //     matchStatus = matchData.matchresult;
  //   }
  //   let arrBt = [];
  //   let batting = "";
  //   let bowling = "";
  //   let lastWicket = "";
  //   if (fInnings?.status === "1") {
  //     battingTeam = fInnings.Battingteam;
  //     bowlingTeam = fInnings.Bowlingteam;
  //     if (!bowlingTeam) {
  //       bowlingTeam = battingTeam === fteamNameA ? fteamNameB : fteamNameA;
  //     }

  //     arrBt = get_bowler_batsman_list(
  //       fInnings.batsmen.list,
  //       fInnings.bowler.list,
  //       fInnings.LastWicket
  //     );
  //     batting = arrBt["batting"];
  //     bowling = arrBt["bowling"];
  //     lastWicket = arrBt["lastWicket"];
  //     fistinningsscores =
  //       '<li class="fl act"><h2>' +
  //       battingTeam +
  //       "</h2><span>पहली पारी</span><h3>" +
  //       fInnings.Equation.Total +
  //       "/" +
  //       fInnings.Equation.Wickets +
  //       " <span>ओवर्स. " +
  //       fInnings.Equation.Overs +
  //       "</span></h3></li>";
  //     let inningName = "दूसरी पारी";
  //     if (matchType === "test") {
  //       inningName = "पहली पारी";
  //     }

  //     secondinningsscores =
  //       '<li class="fr"><h2>' +
  //       bowlingTeam +
  //       "</h2><span>" +
  //       inningName +
  //       "</span><h3>बल्लेबाजी बाकी है</h3></li>";
  //   }

  //   if (sInnings?.status === "1") {
  //     battingTeam = fInnings.Battingteam;
  //     bowlingTeam = fInnings.Bowlingteam;
  //     if (!bowlingTeam) {
  //       bowlingTeam = battingTeam === fteamNameA ? fteamNameB : fteamNameA;
  //     }

  //     arrBt = get_bowler_batsman_list(
  //       sInnings.batsmen.list,
  //       sInnings.bowler.list,
  //       sInnings.LastWicket
  //     );
  //     batting = arrBt["batting"];
  //     bowling = arrBt["bowling"];
  //     lastWicket = arrBt["lastWicket"];
  //     fistinningsscores =
  //       '<li class="fl"><h2>' +
  //       battingTeam +
  //       "</h2><span>पहली पारी</span><h3>" +
  //       fInnings.Equation.Total +
  //       "/" +
  //       fInnings.Equation.Wickets +
  //       " <span>ओवर्स. " +
  //       fInnings.Equation.Overs +
  //       "</span></h3></li>";
  //     let inningName = "दूसरी पारी";
  //     if (matchType === "test") {
  //       inningName = "पहली पारी";
  //     }
  //     secondinningsscores =
  //       '<li class="fr act"><h2>' +
  //       bowlingTeam +
  //       "</h2><span>" +
  //       inningName +
  //       "</span><h3>" +
  //       sInnings.Equation.Total +
  //       "/" +
  //       sInnings.Equation.Wickets +
  //       " <span>ओवर्स. " +
  //       sInnings.Equation.Overs +
  //       "</span></h3></li>";
  //   }

  //   if (matchType === "test") {
  //     if (tInnings.status === "1") {
  //       battingTeam = fInnings.Battingteam;
  //       bowlingTeam = fInnings.Bowlingteam;
  //       if (!bowlingTeam) {
  //         bowlingTeam = battingTeam === fteamNameA ? fteamNameB : fteamNameA;
  //       }

  //       arrBt = get_bowler_batsman_list(
  //         tInnings.batsmen.list,
  //         tInnings.bowler.list,
  //         tInnings.LastWicket
  //       );
  //       batting = arrBt["batting"];
  //       bowling = arrBt["bowling"];
  //       lastWicket = arrBt["lastWicket"];
  //       if (tInnings.Battingteam === battingTeam) {
  //         fistinningsscores =
  //           '<li class="fl act"><h2>' +
  //           battingTeam +
  //           "</h2><span>दूसरी पारी</span><h3>" +
  //           tInnings.Equation.Total +
  //           "/" +
  //           tInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           tInnings.Equation.Overs +
  //           "</span></h3><p>1st Inning " +
  //           fInnings.Equation.Total +
  //           "/" +
  //           fInnings.Equation.Wickets +
  //           " | ओवर्स. " +
  //           fInnings.Equation.Overs +
  //           "</p></li>";
  //         secondinningsscores =
  //           '<li class="fr"><h2>' +
  //           bowlingTeam +
  //           "</h2><span>पहली पारी</span><h3>" +
  //           sInnings.Equation.Total +
  //           "/" +
  //           sInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           sInnings.Equation.Overs +
  //           "</span></h3></li>";
  //       } else {
  //         fistinningsscores =
  //           '<li class="fl"><h2>' +
  //           battingTeam +
  //           "</h2><span>पहली पारी</span><h3>" +
  //           fInnings.Equation.Total +
  //           "/" +
  //           fInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           fInnings.Equation.Overs +
  //           "</span></h3></li>";
  //         secondinningsscores =
  //           '<li class="fr act"><h2>' +
  //           bowlingTeam +
  //           "</h2><span>दूसरी पारी</span><h3>" +
  //           tInnings.Equation.Total +
  //           "/" +
  //           tInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           tInnings.Equation.Overs +
  //           "</span></h3><p> 1st Inning " +
  //           sInnings.Equation.Total +
  //           "/" +
  //           sInnings.Equation.Wickets +
  //           " | ओवर्स. " +
  //           sInnings.Equation.Overs +
  //           "</p></li>";
  //       }
  //     }
  //     if (fourthInnings.status === "1") {
  //       battingTeam = fInnings.Battingteam;
  //       bowlingTeam = fInnings.Bowlingteam;
  //       if (!bowlingTeam) {
  //         bowlingTeam = battingTeam === fteamNameA ? fteamNameB : fteamNameA;
  //       }

  //       arrBt = get_bowler_batsman_list(
  //         fourthInnings.batsmen.list,
  //         fourthInnings.bowler.list,
  //         fourthInnings.LastWicket
  //       );
  //       batting = arrBt["batting"];
  //       bowling = arrBt["bowling"];
  //       lastWicket = arrBt["lastWicket"];
  //       if (fourthInnings.Battingteam === battingTeam) {
  //         fistinningsscores =
  //           '<li class="fl"><h2>' +
  //           battingTeam +
  //           "</h2><span>दूसरी पारी</span><h3>" +
  //           tInnings.Equation.Total +
  //           "/" +
  //           tInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           tInnings.Equation.Overs +
  //           "</span></h3><p>1st Inning " +
  //           fInnings.Equation.Total +
  //           "/" +
  //           fInnings.Equation.Wickets +
  //           " | ओवर्स. " +
  //           fInnings.Equation.Overs +
  //           "</p></li>";
  //         secondinningsscores =
  //           '<li class="fr act"><h2>' +
  //           bowlingTeam +
  //           "</h2><span>दूसरी पारी</span><h3>" +
  //           fourthInnings.Equation.Total +
  //           "/" +
  //           fourthInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           fourthInnings.Equation.Overs +
  //           "</span></h3><p>1st Inning " +
  //           sInnings.Equation.Total +
  //           "/" +
  //           sInnings.Equation.Wickets +
  //           " | ओवर्स. " +
  //           sInnings.Equation.Overs +
  //           "</p></li>";
  //       } else {
  //         fistinningsscores =
  //           '<li class="fl"><h2>' +
  //           battingTeam +
  //           "</h2><span>दूसरी पारी</span><h3>" +
  //           fourthInnings.Equation.Total +
  //           "/" +
  //           fourthInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           fourthInnings.Equation.Overs +
  //           "</span></h3><p>1st Inning " +
  //           fInnings.Equation.Total +
  //           "/" +
  //           fInnings.Equation.Wickets +
  //           " | ओवर्स. " +
  //           fInnings.Equation.Overs +
  //           "</p></li>";
  //         secondinningsscores =
  //           '<li class="fr act"><h2>' +
  //           bowlingTeam +
  //           "</h2><span>दूसरी पारी</span><h3>" +
  //           tInnings.Equation.Total +
  //           "/" +
  //           tInnings.Equation.Wickets +
  //           " <span>ओवर्स. " +
  //           tInnings.Equation.Overs +
  //           "</span></h3><p>1st Inning " +
  //           sInnings.Equation.Total +
  //           "/" +
  //           sInnings.Equation.Wickets +
  //           " | ओवर्स. " +
  //           sInnings.Equation.Overs +
  //           "</p></li>";
  //       }
  //     }
  //   }
  //   liveMatchListing +=
  //     '<div class="mtch-hgt-in"><h3 class="txt12 txtlgtgrey">मैच हाइलाइट्स</h3><ul class="clearfix mtch-hgt-dtl">' +
  //     fistinningsscores +
  //     "" +
  //     secondinningsscores +
  //     '</ul></div><div class="towin txt10">' +
  //     matchStatus +
  //     '</div><div class="mtch-hgt-in clearfix"><div class="boxhalf fl"><table class="mtch-hgt-tbl" cellpadding="0" cellspacing="0"><tr><th colspan="2">बल्लेबाज़</th></tr><tr><td colspan="2"></td></tr>' +
  //     batting +
  //     '</table></div><div class="boxhalf fr"><table class="mtch-hgt-tbl" cellpadding="0" cellspacing="0"><tr><th>गेंदबाज़</th><th>O</th><th>M</th><th>R</th><th>W</th></tr><tr><td colspan="2"></td></tr>' +
  //     bowling +
  //     "</table></div></div>";
  //   if (lastWicket) {
  //     liveMatchListing +=
  //       '<div class="atlast txt10">पिछला विकेट ' + lastWicket + "</div>";
  //   }
  //   return liveMatchListing;
  // }

  const {
    images: { url: thumbnail, caption = "" } = {},
    intro,
    is_breaking_alert = 0,
    youtubeid,
    // match_id: matchId,
    author_byline: authorByline = [],
    written_by: writtenBy = [],
    translated_by: translatedBy = [],
    reported_by: reportedBy = [],
    edited_by: editedBy = [],
    // breadcrumb,
    images_all_sizes: {
      sizes: { ["4x3"]: { url: thumb_url = null } = {} } = {},
    } = {},
  } = props.data.articleData;

  const { /* category,  */ requestURL } = props.data?.paramObj || {};
  const authCount = authorByline.filter(
    (item) => item.nicename?.toLowerCase() != "news18hindi"
  ).length;

  // const liveMatchURL =
  //   "/cricket/live-score/" +
  //   articleHelper.convertedToSlug(props.data?.matchData?.teama_en) +
  //   "-vs-" +
  //   articleHelper.convertedToSlug(props.data?.matchData?.teamb_en) +
  //   "-live-score-full-" +
  //   matchId +
  //   ".html";
  // const liveMatchURLC =
  //   "/cricket/live-score/" +
  //   articleHelper.convertedToSlug(props.data?.matchData?.teama_en) +
  //   "-vs-" +
  //   articleHelper.convertedToSlug(props.data?.matchData?.teamb_en) +
  //   "-ball-by-ball-live-commentary-" +
  //   matchId +
  //   ".html";
  return (
    <>
      <Head>
        <link
          rel="preload"
          href={`${thumb_url || thumbnail
            }?impolicy=website&width=320&height=240`}
          as="image"
        />
        <meta itemProp="image" content={thumbnail} />
        <meta
          itemProp="datePublished"
          content={props.pageSeo.jsonLdForArticleConsumption?.datePublished}
        />
        <meta
          property="article:published_time"
          content={props.pageSeo.jsonLdForArticleConsumption?.datePublished}
        />
        <meta
          property="article:modified_time"
          content={props?.pageSeo?.jsonLdForArticleConsumption?.dateModified}
        />
        <meta
          property="og:updated_time"
          content={props.pageSeo?.jsonLdForArticleConsumption?.dateModified}
        />
        <meta
          name="amp-script-src"
          content="sha384-YCFs8k-ouELcBTgzKzNAujZFxygwiqimSqKK7JqeKaGNflwDxaC3g2toj7s_kxWG"
        />
        <meta property="og:category" content={ogContentType} />
      </Head>

      <section className="article_section">
        <main className="mob_container">
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} isAmp={true} GA4Data={props?.GA4Data} />

          {isRecipe ? (
            <Recipe articleData={props.data.articleData} isAmp={true} />
          ) : null}

          <article className="artcl_cnt">
            <div className="artcl_contnr_upper_sec">
              {!isRecipe && (
                <>
                  <h1 className="art_h1">
                    {ReactHtmlParser(ampHelper.titleFont(headline))}
                  </h1>
                  <h2 className="f_d_h3">{ReactHtmlParser(intro)}</h2>
                </>
              )}
              <div className="ad-cnt">
                <div
                  style={{
                    height: "280px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <amp-ad
                    rtc-config='{ "vendors": {"openwrap": { "PROFILE_ID" : "2059", "PUB_ID" : "113941" },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  } },"timeoutMillis": 1000}'
                    width={336}
                    height={280}
                    data-loading-strategy="0.5"
                    data-lazy-fetch="true"
                    data-slot={ampAds.topAd}
                    json={adTarget}
                    data-multi-size="300x250"
                    type="doubleclick"
                    //data-multi-size-validation="false"
                    data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
                    data-amp-slot-index="0"
                  ></amp-ad>
                </div>
              </div>
              <Byline
                bylineData={props.data?.articleData}
                authorByline={authorByline}
                authors={[
                  { "reported by": reportedBy },
                  { "written by": writtenBy },
                  { "translated by": translatedBy },
                  { "edited by": editedBy },
                ]}
                agencyFull={props.data?.articleData?.agency_full || {}}
                category = {props?.data?.paramObj?.category||""}
              />
              <ArticleImage
                headline={headline}
                image={thumb_url || thumbnail}
                caption={
                  is_breaking_alert == 1 && headline
                    ? headline
                    : caption
                      ? caption
                      : ""
                }
                youtubeId={youtubeid}
                isAmp={true}
                local18Video={local18Video ?? false}
                url={thumbnail}
                articleData={props.data.articleData}
                firebase_ad_config={firebaseconfig}
              />
              <SocialShare headline={headline} url={requestURL} GA4Data={props?.GA4Data} articleData={props.data.articleData}/>
            </div>
            {/* <div className="artcl_contnr_lower_sec">
              {match_id ? (
                <>
                  <div className="mtch-hgt frlvbg">
                    {props.data.matchData ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: live_match_parser(props.data.matchData),
                        }}
                      ></div>
                    ) : (
                      ""
                    )}
                  </div>

                  <ul className="scorecard-tav frlvbgtb clearfix txt12">
                    <li>
                      <a href={URL} className="tab-cric" data-id="full">
                        स्कोरबोर्ड{" "}
                      </a>
                    </li>
                    <li>
                      <a href={URL} className="tab-cric" data-id="commentary">
                        लाइव कमेंट्री
                      </a>
                    </li>
                    <li className="act">
                      <a href="#">लाइव ब्लॉग</a>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </div> */}
            <NextPreviousArticleAMP next={nextPrevious.next} prev={nextPrevious.prev} GA4Data={props?.GA4Data}/>
            <div className="wtsap_fxd">
              <amp-social-share
                data-param-app_id="561222041954546"
                id="whatsappAmp"
                data-vars-event-label={`${headline},${story_id}`}
                type="whatsapp"
                className="ampshareicon"
                aria-label={`Share on WHATSAPP`}
                height="40"
                width="40"
              ></amp-social-share>
            </div>
            <div
              className={"content_sec c_sec"}
              data-amp-bind-class="!visible ?'c_sec':'content_sec'"
            >
              <div>
                {hightlight_data?.length > 0 && (
                  <div className="arthg">
                    <span className="artclhglght_hd">हाइलाइट्स</span>
                    <div>
                      {hightlight_data.map((i, key) => (
                        <span className="highbullets" key={key}>
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {props?.data?.articleData?.liveblog_api_url?.blog_url && (
                  <div
                    className="tpnews clearfix"
                    id={props.data.articleData?.weburl}
                  >
                    <LiveBlog articleData={props.data.liveBlog} />
                  </div>
                )}
                {props?.data?.articleData?.readmore?.length > 0 ? (
                  <ReadMore
                    className="artic-story"
                    target="amp"
                    readData={props.data.articleData.readmore}
                    body={body}
                    tags={props.data.articleData?.tags}
                  />
                ) : (
                  <div
                    className="artic-story"
                    dangerouslySetInnerHTML={articleBody(body)}
                  ></div>
                )}

                {props.data.articleData["10things_text"] &&
                props.data.articleData["10things_text"]?.length > 0 && (
                  <TenThingsText
                    data={props?.data?.articleData["10things_text"]}
                  />
                )}

                {/* {props.data?.articleData.cta ? (
                  <p className="r_m_l">
                    {ReactHtmlParser(props.data?.articleData.cta)}
                  </p>
                ) : null} */}
                <p className="tag_s">
                  {tags_arr && tags_arr?.length > 0 && <>Tags:</>}{" "}
                  {tags_arr && tags_arr?.length > 0
                    && tags_arr.map((tag, key) => {
                      return (
                        <Fragment key={key}>
                          <a key={key} href={"/tag/" + tag.slug + "/"} className="cp_tags" id={`tag_${key}`}>
                            {capIt(tag.name)}
                          </a>
                          {key !== tags_arr.length - 1 ? (
                            <span key={key}>, </span>
                          ) : null}
                          <AmpAnalyticsGA4Events
                            id={`tag_${key}`}
                            event_name={"tags_cp"}
                            cta_name={capIt(tag.name)}
                            section={props?.GA4Data?.section || ""}
                            subsection={props?.GA4Data?.sub_section || ""}
                            article_id={props?.GA4Data?.article_id}
                            type_of_article={props?.GA4Data?.type_of_article || ""}
                            local18_district={props?.GA4Data?.local18_district || ""}
                            domain="https://hindi.news18.com/"
                          />
                        </Fragment>
                      );
                    })
                  }
                </p>
                <div className="ps_inf">
                  <div className="ps_col">
                    <div className="ps_dt">
                      <span>FIRST PUBLISHED : </span>{" "}
                      {props.data.articleData["created_at"]
                        ? longDateConversion(
                          props.data.articleData["created_at"]
                        )
                        : longDateConversion(
                          props.data.articleData["updated_at"]
                        )}
                    </div>
                  </div>
                  {disclaimer && (
                    <div className="disclaimerText">{disclaimer}</div>
                  )}
                </div>
                {/* {section !== "photogallery" && (
                  <RhsTopStory
                    isAmp={true}
                    topStories={topstories}
                    articleData={props.data.articleData}
                    relatedStories={relatedStories}
                  />
                )} */}
                {/* MC Article PROMO Add*/}
                {/* <div className="promo-ad">
                  <amp-ad
                    width={320}
                    height={172}
                    type="doubleclick"
                    data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_ROS_AMP/NW18_HIND_ROS_AMP/NW18_HIND_AS_AMP_ROS_MCpromo_Footer"
                    json={adTarget}
                    data-multi-size="320x172"
                    data-loading-strategy="prefer-viewability-over-views"
                    data-lazy-fetch="true"
                    data-multi-size-validation="false"
                  ></amp-ad>
                </div> */}
                {/* {props.data.articleData.addSavaan ? (
                  <>
                    <div className="amp-jio-savan">
                      <amp-iframe
                        title="Savaan"
                        layout="responsive"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        frameborder="0"
                        src="https://images.news18.com/static_news18/pix/hindi/jiosavan.html"
                        width="375"
                        height="510"
                      ></amp-iframe>
                    </div>
                    <amp-ad
                      width={1}
                      height={1}
                      type="doubleclick"
                      data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_AMP_TRACKERS/NW18_HIND_AMP_TRCK_JIO_IMP_1x1"
                    >
                      <div placeholder="">
                        <div fallback=""></div>
                      </div>
                    </amp-ad>
                  </>
                ) : null} */}
              </div>
            </div>
            <div
              className="mr_cnt"
              data-amp-bind-class="!visible ?'mr_cnt':'hide_content'"
            >
              <a
                id="readMoreAmp"
                on="tap:AMP.setState({visible: !visible})"
                data-vars-event-label={`${headline},${story_id}`}
              >
                आगे पढ़ें
              </a>
              <AmpAnalyticsGA4Events
                id="readMoreAmp"
                event_name={"read_more_full_article"}
                cta_name={"read_more"}
                section={props?.GA4Data?.section || ""}
                subsection={props?.GA4Data?.sub_section || ""}
                article_id={props?.GA4Data?.article_id}
                type_of_article={props?.GA4Data?.type_of_article || ""}
                local18_district={props?.GA4Data?.local18_district || ""}
                domain="https://hindi.news18.com/"
              />
            </div>
          </article>
        </main>
        <div className="outbrain_rows">
          <amp-embed
            data-loading-strategy="prefer-viewability-over-views"
            data-lazy-fetch="true"
            width="100"
            height="100"
            type="taboola"
            layout="responsive"
            data-publisher="network18media-news18hindi"
            data-mode="thumbnails-a"
            data-placement="Below Article Thumbnails AMP"
            data-target_type="mix"
            data-article="auto"
            data-url=""
          ></amp-embed>
        </div>
        {/* {showRelatedWidget && relatedArticles?.length > 0  ? (
          <div
            dangerouslySetInnerHTML={{
              __html: relatedCard(relatedArticles, false, true),
            }}
          ></div>
        ) : (
          ""
        )} */}
        {section !== "photogallery" && section !== "latestnews" && (
          <RhsPhoto isAmp={true} photoStories={photoStories} />
        )}
      </section>
      {/* <AmpAnalyticsGA4Events
        id={`related_stories_cp_0`}
        event_name={"tags_cp"}
        cta_name={""}
        section={props?.GA4Data?.section || ""}
        subsection={props?.GA4Data?.sub_section || ""}
        article_id={props?.GA4Data?.article_id}
        type_of_article={props?.GA4Data?.type_of_article || ""}
        local18_district={props?.GA4Data?.local18_district || ""}
        domain="https://hindi.news18.com/"
      />
      <AmpAnalyticsGA4Events
        id={`related_stories_cp_1`}
        event_name={"tags_cp"}
        cta_name={""}
        section={props?.GA4Data?.section || ""}
        subsection={props?.GA4Data?.sub_section || ""}
        article_id={props?.GA4Data?.article_id}
        type_of_article={props?.GA4Data?.type_of_article || ""}
        local18_district={props?.GA4Data?.local18_district || ""}
        domain="https://hindi.news18.com/"
      />
      <AmpAnalyticsGA4Events
        id={`related_stories_cp_2`}
        event_name={"tags_cp"}
        cta_name={""}
        section={props?.GA4Data?.section || ""}
        subsection={props?.GA4Data?.sub_section || ""}
        article_id={props?.GA4Data?.article_id}
        type_of_article={props?.GA4Data?.type_of_article || ""}
        local18_district={props?.GA4Data?.local18_district || ""}
        domain="https://hindi.news18.com/"
      />
      <AmpAnalyticsGA4Events
        id={`related_stories_cp_3`}
        event_name={"tags_cp"}
        cta_name={""}
        section={props?.GA4Data?.section || ""}
        subsection={props?.GA4Data?.sub_section || ""}
        article_id={props?.GA4Data?.article_id}
        type_of_article={props?.GA4Data?.type_of_article || ""}
        local18_district={props?.GA4Data?.local18_district || ""}
        domain="https://hindi.news18.com/"
      />
      <AmpAnalyticsGA4Events
        id={`related_stories_cp_4`}
        event_name={"tags_cp"}
        cta_name={""}
        section={props?.GA4Data?.section || ""}
        subsection={props?.GA4Data?.sub_section || ""}
        article_id={props?.GA4Data?.article_id}
        type_of_article={props?.GA4Data?.type_of_article || ""}
        local18_district={props?.GA4Data?.local18_district || ""}
        domain="https://hindi.news18.com/"
      /> */}
      {/* <InstallAppIcon
        category={"APPdownload_Mweb_Article"}
        label={"Mobile Article"}
        isAMP={true}
      /> */}
      <style jsx global>
        {ArticleStyle}
      </style>
      <style jsx global>{`
        .disclaimerText {
          padding: 10px;
          color: #000;
          font-weight: bold;
          font-style: italic;
        }
        .adcenter {
          text-align: center;
          min-height: 255px;
        }
        .taboola_div {
          height: 280px;
          margin-top: 15px;
          overflow: hidden;
          text-align: center;
        }
        .artcl_byeline li span a {
          color: #e1261d;
          -webkit-text-decoration: none;
          text-decoration: none;
          position: relative;
          font-weight: 700;
          font-size: 13px;
          line-height: 21px;
          font-family: "Mukta";
          font-weight: bold;
          font-family: "Mukta", sans-serif;
          margin-left: ${authCount ? "0" : "5px"};
        }
        .artclbyeline-author-intro a {
          font-size: 13px;
          line-height: 21px;
          color: #e1261d;
          font-weight: bold;
          font-family: "Mukta";
          margin-left: ${authCount ? "0" : "5px"};
        }

        .f_d_h3 {
          font-size: 14px;
          font-weight: normal;
          line-height: 21px;
          margin: 5px 0px;
        }
      `}</style>
    </>
  );
};

export default Article;
