import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { generateAdTags } from "config/ads.config";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { generateMobileAdTags } from "config/ads_pwa.config";
import {
  ignoreQueryParams,
  customizeUrl,
  getRedirection,
} from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForHomeSiteNavigation,
  jsonLdForItemList,
} from "includes/schema.util";
import { getTagResult, getTopPriorityStories } from "api_dns/individual/Tag";

import {
  getDistricts,
  getMenu,
  getMiscData,
  getRedisDataByKey,
  getArticleList,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

const hasHindiCharacters = function (str) {
  if (!str) {
    return false;
  }
  return (
    str.split("").filter(function (char) {
      const charCode = char.charCodeAt();
      return charCode >= 2309 && charCode <= 2361;
    }).length > 0
  );
};

const tagProps = async (context, isAmp = false, isTag = true) => {
  //Checking if request is coming with Akamai header or with mobile header
  const isMobile = checkDevice(context);
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }

  let showBannerInTag = false;
  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  ).toLowerCase();
  const urlParam = context.query;
  let topic = (urlParam.topic || "").toLowerCase();
  const checkStrType = hasHindiCharacters(urlParam.topic);

  if (topic === "" || checkStrType === true) {
    return {
      notFound: true,
    };
  }
  // Redirect URL
  const redirectionArray = [
    "goa-elections",
    "uttar-pradesh-elections",
    "assembly-elections",
    "manipur-elections",
    "punjab-elections",
    "uttarakhand-elections",
    "pro-kabaddi",
  ];
  if (redirectionArray.includes(topic)) {
    if (topic === "goa-elections") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/assembly-elections/goa/"
          ),
          statusCode: 301,
        },
      };
    } else if (topic === "uttar-pradesh-elections") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/assembly-elections/uttar-pradesh/"
          ),
          statusCode: 301,
        },
      };
    } else if (topic === "assembly-elections") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/assembly-elections/"
          ),
          statusCode: 301,
        },
      };
    } else if (topic === "manipur-elections") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/assembly-elections/manipur/"
          ),
          statusCode: 301,
        },
      };
    } else if (topic === "punjab-elections") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/assembly-elections/punjab/"
          ),
          statusCode: 301,
        },
      };
    } else if (topic === "uttarakhand-elections") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/assembly-elections/uttarakhand/"
          ),
          statusCode: 301,
        },
      };
    } else if (topic === "pro-kabaddi") {
      return {
        redirect: {
          destination: ignoreQueryParams(
            protocol + host + "/pro-kabaddi-league/"
          ),
          statusCode: 301,
        },
      };
    }
  }
  const findWord = currentUrl.includes("assembly-elections");
  if (findWord === true) {
    if (topic === "goa") {
      topic = "goa-elections";
    } else if (topic === "manipur") {
      topic = "manipur-elections";
    } else if (topic === "uttar-pradesh") {
      topic = "uttar-pradesh-elections";
    } else if (topic === "punjab") {
      topic = "punjab-elections";
    } else if (topic === "uttarakhand") {
      topic = "uttarakhand-elections";
    }
  }

  const findWord1 = Boolean(currentUrl.includes("pro-kabaddi-league"));
  if (findWord1 === true) {
    topic = "pro-kabaddi";
  }

  let ct = urlParam.ct || "";
  const pageNumber = parseInt(urlParam.page) || 1;
  const [tagUrl] = ignoreQueryParams(currentUrl, false).split("page");

  if (topic === "news" || topic === "videos" || topic === "photogallery") {
    ct = topic;
    topic = "";
  }
  let TitlePrefix = "";
  if (parseInt(urlParam.page)) {
    TitlePrefix = "Page " + pageNumber + " - ";
  }

  const paramObj = {
    topic: topic,
    ct: ct ? ct + "/" : "",
    requestURL: currentUrl,
    page: pageNumber,
  };

  let subString = topic ? { "tags.slug": encodeURIComponent(topic) } : "";
  if (topic && ct === "news") {
    subString = { "tags.slug": encodeURIComponent(topic), post_type: "text" };
  } else if (topic && ct === "videos") {
    subString = {
      "tags.slug": encodeURIComponent(topic),
      post_type: "videos",
    };
  } else if (topic && ct === "photogallery") {
    subString = {
      "tags.slug": encodeURIComponent(topic),
      post_type: "photogallery",
    };
  } else if (!topic && ct === "news") {
    subString = { post_type: "text" };
  } else if (!topic && ct === "videos") {
    subString = { post_type: "videos" };
  } else if (!topic && ct === "photogallery") {
    subString = { post_type: "photogallery" };
  }
  if (topic.toLowerCase() === "ibn7") {
    subString = { post_type: "text" };
  }

  let tagResult = [];
  tagResult = await getTagResult({
    count: 24,
    offset: pageNumber ? (pageNumber - 1) * 24 : 0,
    fields:
      "story_id,images,display_headline,headline,weburl,liveblog_switcher,tags,post_type,weburl_r,images_all_sizes,intro,created_at,weburl,categories",
    filter: subString,
  });

  if (!tagResult || !tagResult.length) {
    return {
      notFound: true,
    };
  }

  let topTagStory = [];
  const tagCMSInfo = await getRedisDataByKey(`term-${topic}`);
  if (
    topic !== "news" &&
    topic !== "videos" &&
    topic !== "photogallery" &&
    !ct
  ) {
    topTagStory = tagCMSInfo || [];
  }
  const tagData = tagResult;

  /*
    When above condition not matched, then check this one also
    */
  if (topic[0] && topic[0].match(/[^\w\d]/) && checkStrType === false) {
    const redirect_url = await getRedirection(currentUrl);
    if (!redirect_url) {
      return {
        notFound: true,
      };
    } else {
      return {
        redirect: {
          destination: redirect_url,
          statusCode: 301,
        },
      };
    }
  }
  if (tagUrl) {
    if (
      ignoreQueryParams(currentUrl, false).lastIndexOf("/") !==
      ignoreQueryParams(currentUrl, false).length - 1
    ) {
      return {
        redirect: {
          destination: ignoreQueryParams(currentUrl) + "/",
          statusCode: 301,
        },
      };
    }
  }

  if (
    typeof tagData !== "undefined" &&
    tagData &&
    typeof tagData.id !== "undefined" &&
    tagData.id &&
    !isAmp
  ) {
    const article_slug = tagData.url
        .replace("https://hindi.news18.com", "")
        .replace(/\/\//gi, "/"),
      webUrl = tagData.url
        .replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl)
        .replace(/\/\//gi, "/");

    if (article_slug !== ignoreQueryParams(context.req.url, false)) {
      if (
        webUrl !== ignoreQueryParams(currentUrl, false) &&
        currentUrl.search(`page-${pageNumber}`) === -1
      ) {
        return {
          redirect: {
            destination: customizeUrl(webUrl),
            statusCode: 301,
          },
        };
      }
    }
  }

  // meta details start
  //   let pageUrl = "";
  let topicName = "";
  //   let h2Tag = "";
  let page_title = "";
  let page_description = "";
  let page_keywords = "";

  function capitalize(input) {
    if (input) {
      const words = input.split("-");
      const CapitalizedWords = [];
      words.forEach((element) => {
        if (element.length) {
          CapitalizedWords.push(
            element[0].toUpperCase() + element.slice(1, element.length)
          );
        }
      });
      return CapitalizedWords.join(" ");
    } else {
      return "";
    }
  }

  const TopicName = capitalize(urlParam.topic);

  if (ct === "news") {
    // pageUrl = currentUrl;
    topicName = TopicName + " News in Hindi";
    // h2Tag = TopicName + " - न्यूज़ रिजल्ट्स";
    page_title =
      TitlePrefix +
      TopicName +
      " News in Hindi, " +
      TopicName +
      " Latest News, " +
      TopicName +
      " News";
    page_description =
      "Get " +
      TopicName +
      " News in Hindi, Find " +
      TopicName +
      " Latest News on News18 हिंदी";
    page_keywords =
      TopicName +
      " News in Hindi, " +
      TopicName +
      " Latest News, " +
      TopicName +
      " News";
  } else if (ct === "photogallery") {
    // pageUrl = currentUrl;
    topicName = TopicName + " फोटो";
    // h2Tag = TopicName + " - फोटो रिजल्ट्स";
    page_title =
      TitlePrefix +
      TopicName +
      " Photos in Hindi, " +
      TopicName +
      " Latest Photos, " +
      TopicName +
      " Photos";
    page_description =
      "Get " +
      TopicName +
      " Photos in Hindi, Find " +
      TopicName +
      " Latest Photos on News18 हिंदी";
    page_keywords =
      TopicName +
      " Photos in Hindi, " +
      TopicName +
      " Latest Photos, " +
      TopicName +
      " Photos";
  } else if (ct === "videos") {
    // pageUrl = currentUrl;
    topicName = TopicName + " वीडियो";
    // h2Tag = TopicName + " - वीडियो रिजल्ट्स";
    page_title =
      TitlePrefix +
      TopicName +
      " Videos in Hindi, " +
      TopicName +
      " Latest Videos, " +
      TopicName +
      " Videos";
    page_description =
      "Get " +
      TopicName +
      " Videos in Hindi, Find " +
      TopicName +
      " Latest Videos on News18 हिंदी";
    page_keywords =
      TopicName +
      " Videos in Hindi, " +
      TopicName +
      " Latest Videos, " +
      TopicName +
      " Videos";
  } else {
    // pageUrl = currentUrl;
    topicName = topic;
    // h2Tag = TopicName + " - सभी रिजल्ट्स";
    if (topic === "btdd") {
      page_title =
        "Bhabhi Tera Dewar Diwana | भाभी तेरा देवर दीवाना | btdd News in Hindi - News18India";
      page_description =
        "Get Bhabhi Tera Dewar Diwana (BTDD) news in Hindi only on News18India.com. Bhabhi Tera Dewar Diwana (भाभी तेरा देवर दीवाना) is a IBN7 TV show in Hindi.";
      page_keywords =
        "Bhabhi Tera Dewar Diwana, भाभी तेरा देवर दीवाना, btdd News in Hindi";
    } else if (topic === "mission-paani") {
      page_title =
        "Network18 Mission Paani — प्रत्येक नागरिक के लिए स्वच्छ पेयजल | Clean Drinking Water for Every Citizen - News18 हिंदी";
      page_description =
        "Mission Paani — प्रत्येक नागरिक के लिए स्वच्छ पेयजल. Network18 is on mission for ‘clean drinking water for every citizen’.";
      page_keywords =
        "Water Crisis, Water Crisis story, Water Crisis in India, Mission Paani, News18 हिंदी Mission Paani, Mission Paani News";
    } else if (topic === "warrior-mothers") {
      page_title =
        "Mother's Day 2020 News in Hindi: मदर्स डे, मातृ दिवस, ताजा खबर, हिंदी समाचार";
      page_description =
        "Mother's Day 2020 News in Hindi: Get latest news and updated on Mother’s day (मदर्स डे) including मातृ दिवस ताजा खबर, हिंदी समाचार and many more at News18 हिंदी.";
      page_keywords =
        "Mother's Day 2020 News in Hindi, मदर्स डे, मातृ दिवस, ताजा खबर, हिंदी समाचार, Mother's Day 2020";
    } else if (topic === "assembly-elections-2021") {
      page_title =
        "Assembly Election (विधानसभा चुनाव) 2021 News of West Bengal, Tamil Nadu, Kerala, Assam, Puducherry";
      page_description =
        "Assembly Election (विधानसभा चुनाव) 2021 News in Hindi for the states West Bengal, Tamil Nadu, Kerala, Assam and Puducherry Union Territory. Get latest updates of polls, Candidates, Parties and more.";
      page_keywords =
        "Assembly Election 2021, विधानसभा चुनाव 2021, Assembly Election News, West Bengal Assembly Election, Tamil Nadu Assembly Election, Kerala Assembly Election, Assam Assembly Election, Puducherry Assembly Election";
    } else if (topic === "west-bengal-assembly-elections-2021") {
      page_title =
        "West Bengal Assembly Election 2021, पश्चिम बंगाल विधानसभा चुनाव, West Bengal Assembly Polls - News18 हिंदी";
      page_description =
        "पश्चिम बंगाल विधानसभा चुनाव 2021: Get Latets news updates of West Bengal Assembly Election 2021. पश्चिम बंगाल विधानसभा चुनाव कैंडिडेट्स, पार्टी, सीट, परिणाम के अपडेट.";
      page_keywords =
        "West Bengal Assembly Election 2021, पश्चिम बंगाल विधानसभा चुनाव, West Bengal Election News, पश्चिम बंगाल चुनाव समाचार, West Bengal Assembly Polls";
    } else if (topic === "tamil-nadu-assembly-election-2021") {
      page_title =
        "Tamil Nadu Assembly Election 2021, तमिल नाडु विधानसभा चुनाव, Tamil Nadu Assembly Polls - News18 हिंदी";
      page_description =
        "तमिल नाडु विधानसभा चुनाव 2021: Get Latets news updates of Tamil Nadu Assembly Election 2021. तमिल नाडु विधानसभा चुनाव कैंडिडेट्स, पार्टी, सीट, परिणाम के अपडेट.";
      page_keywords =
        "Tamil Nadu Assembly Election 2021, तमिल नाडु विधानसभा चुनाव, Tamil Nadu Election News, तमिल नाडु चुनाव समाचार, Tamil Nadu Assembly Polls";
    } else if (topic === "kerala-assembly-election-2021") {
      page_title =
        "Kerala Assembly Election 2021, केरल विधानसभा चुनाव, Kerala Assembly Polls - News18 हिंदी";
      page_description =
        "केरल विधानसभा चुनाव 2021: Get Latets news updates of Kerala Assembly Election 2021. केरल विधानसभा चुनाव कैंडिडेट्स, पार्टी, सीट, परिणाम के अपडेट.";
      page_keywords =
        "Kerala Assembly Election 2021, केरल विधानसभा चुनाव, Kerala Election News, केरल चुनाव समाचार, Kerala Assembly Polls";
    } else if (topic === "assam-assembly-election-2021") {
      page_title =
        "Assam Assembly Election 2021, असम विधानसभा चुनाव, Assam Assembly Polls - News18 हिंदी";
      page_description =
        "असम विधानसभा चुनाव 2021: Get Latets news updates of Assam Assembly Election 2021. असम विधानसभा चुनाव कैंडिडेट्स, पार्टी, सीट, परिणाम के अपडेट.";
      page_keywords =
        "Assam Assembly Election 2021, असम विधानसभा चुनाव, Assam Election News, असम चुनाव समाचार, Assam Assembly Polls";
    } else if (topic === "puducherry-assembly-election-2021") {
      page_title =
        "Puducherry Assembly Election 2021, पांडिचेरी विधानसभा चुनाव, Puducherry Assembly Polls - News18 हिंदी";
      page_description =
        "पांडिचेरी विधानसभा चुनाव 2021: Get Latets news updates of Puducherry Assembly Election 2021. पांडिचेरी विधानसभा चुनाव कैंडिडेट्स, पार्टी, सीट, परिणाम के अपडेट.";
      page_keywords =
        "Puducherry Assembly Election 2021, पांडिचेरी विधानसभा चुनाव, Puducherry Election News, पांडिचेरी चुनाव समाचार, Puducherry Assembly Poll";
    } /* else if (topic === "puducherry-assembly-election-2021") {
      page_title =
        "Bihar Elections 2020 News, Bihar Chunav Samachar, Bihar Assembly Polls, बिहार चुनाव की ताज़ा ख़बर";
      page_description =
        "बिहार चुनाव (Bihar Election) 2020: Latest Bihar News in hindi and Updates on Bihar assembly election 2020. News18 India पर बिहार चुनाव और पॉलिटिक्स की ताज़ा खबरें पढ़े, जाने पार्टी, कैंडिडेट के बारे मैं.";
      page_keywords =
        "Bihar Elections, Bihar Chuvan, Bihar Polls, बिहार चुनाव, Bihar Elections News, Bihar Chuvan Samachar, Bihar Polls Latest News";
    } */ else if (topic === "goa-elections") {
      page_title =
        "Goa Assembly Election Results 2022, गोवा विधानसभा चुनाव,  Goa Assembly Polls 2022, Goa Chunav 2022, vidhan sabha election 2022";
      page_description =
        "Goa Assembly Election Results (गोवा) विधानसभा चुनाव  2022: Get Latest News, Live Updates of Goa Assembly Polls 2022, Know About Candidates, Seats, Campaign, Result and More of Goa Chunav.";
      page_keywords =
        "Goa Assembly Election Results, गोवा विधानसभा चुनाव, Goa Assembly Polls, Goa Chunav 2022";
    } else if (topic === "manipur-elections") {
      page_title =
        "Manipur Assembly Election Results 2022, मणिपुर विधानसभा चुनाव,  Manipur Assembly Polls 2022, Manipur Chunav 2022, vidhan sabha election 2022";
      page_description =
        "Manipur Assembly Election Results (मणिपुर) विधानसभा चुनाव  2022: Get Latest News, Live Updates of Manipur Assembly Polls 2022, Know About Candidates, Seats, Campaign, Result and More of Manipur Chunav.";
      page_keywords =
        "Manipur Assembly Election Results, मणिपुर विधानसभा चुनाव, Manipur Assembly Polls, Manipur Chunav 2022";
    } else if (topic === "uttar-pradesh-elections") {
      page_title =
        "Uttar Pradesh Assembly Election Results 2022, उत्तर प्रदेश विधानसभा चुनाव,  Uttar Pradesh Assembly Polls 2022, Uttar Pradesh Chunav 2022, vidhan sabha election 2022";
      page_description =
        "Uttar Pradesh Assembly Election Results (उत्तर प्रदेश) विधानसभा चुनाव  2022: Get Latest News, Live Updates of Uttar Pradesh Assembly Polls 2022, Know About Candidates, Seats, Campaign, Result and More of Uttar Pradesh Chunav.";
      page_keywords =
        "Uttar Pradesh Assembly Election Results, उत्तर प्रदेश विधानसभा चुनाव, Uttar Pradesh Assembly Polls, Uttar Pradesh Chunav 2022";
    } else if (topic === "punjab-elections") {
      page_title =
        "Punjab Assembly Election Results 2022, पंजाब विधानसभा चुनाव,  Punjab Assembly Polls 2022, Punjab Chunav 2022, vidhan sabha election 2022";
      page_description =
        "Punjab Assembly Election Results (पंजाब) विधानसभा चुनाव  2022: Get Latest News, Live Updates of Punjab Assembly Polls 2022, Know About Candidates, Seats, Campaign, Result and More of Punjab Chunav.";
      page_keywords =
        "Punjab Assembly Election Results, पंजाब विधानसभा चुनाव, Punjab Assembly Polls, Punjab Chunav 2022";
    } else if (topic === "uttarakhand-elections") {
      page_title =
        "Uttarakhand Assembly Election Results 2022, उत्तराखंड विधानसभा चुनाव,  Uttarakhand Assembly Polls 2022, Uttarakhand Chunav 2022, vidhan sabha election 2022";
      page_description =
        "Uttarakhand Assembly Election Results (उत्तराखंड) विधानसभा चुनाव  2022: Get Latest News, Live Updates of Uttarakhand Assembly Polls 2022, Know About Candidates, Seats, Campaign, Result and More of Uttarakhand Chunav.";
      page_keywords =
        "Uttarakhand Assembly Election Results, उत्तराखंड विधानसभा चुनाव, Uttarakhand Assembly Polls, Uttarakhand Chunav 2022";
    } else if (topic === "assembly-elections") {
      page_title =
        "Assembly Election 2022: Chunav  News from Uttar-Pradesh, Goa, Manipur, Punjab, Uttarakhand, विधानसभा चुनाव Result,  BJP, RJD, Congress at News18 हिंदी.";
      page_description =
        "Assembly Election 2022 News - Check out विधानसभा चुनाव 2022(vidhan sabha) election updates, Get Latest News, Live Updates of Uttar-Pradesh, Goa, Manipur, Punjab, Uttarakhand Assembly Polls 2022, Know About Vidhan sbaha chunav result,  Candidates, Seats, Campaign and More Vidhan Sabha Exit Poll.";
      page_keywords =
        "Assembly Election 2022, Assembly Election, Assembly Elections News, Election News, MLA election, Election 2022, BJP, RJD, Congress Vidhan sabha seats, live election result news, Vidhan Sabha Exit Poll, BJP, RJD, Congress";
    } else if (topic === "pro-kabaddi") {
      page_title =
        "Pro Kabaddi League 2021 Season 8- प्रो कबड्डी लीग 2021 Team, Live Score PKL 2021, Players List 2021, Match Schedule 2021, PKL 2021 Dates and Time Table| News18 हिंदी";
      page_description =
        "PKL 2021 Season 8 - Get latest news and Live Score Pro Kabaddi 2021, प्रो कबड्डी लीग 2021 News, vivo Pro Kabaddi League 2021 Team, Pro Kabaddi 2021 Schedule, Venue, Team Player at News18 हिंदी";
      page_keywords =
        "प्रो कबड्डी लीग 2021,PKL 2021 season 8, प्रो कबड्डी लीग News, Pro Kabaddi live updates, live pro kabaddi score, pro kabaddi schedule, pro kabaddi timings, latest kabaddi news, Pro Kabaddi, Venue, Team Player, प्रो कबड्डी लीग 2021 Team, vivo Pro Kabaddi League 2021 photos, vivo Pro Kabaddi League 2021 video, kabaddi, pro kabaddi, kabaddi 2021, pro kabaddi 2021 match, pkl, vivo kabaddi, vivo pro kabaddi, pkl 2021, pro kabaddi 2021 date, vivo pro kabaddi 2021, pro kabaddi schedule, pro kabaddi 2021 schedule, pro kabaddi season 8, vivo kabaddi 2021 date, vivo, Sports";
    } else if (topic === "womens-world-cup-2022") {
      page_title =
        "Women Cricket World Cup 2022: आईसीसी महिला क्रिकेट विश्व कप लाइव मैच, क्रिकेट विश्व कप स्कोर, समाचार, महिला विश्वकप हाइलाइट in Hindi, WCWC Live Updates|  न्यूज़18 इंडिया";
      page_description =
        "Women Cricket World Cup 2022 (WCWC): Get latest news and live covergae of all the ODI matches of ICC women world cup (महिला विश्वकप) including महिला विश्व कप रिजल्ट, महिला वर्ल्ड कप 2022 में भारत का शेड्यूल (match dates) and timings in India, photos and videos at न्यूज़18 इंडिया.";
      page_keywords =
        "Women Cricket World Cup 2022 news in Hindi, आईसीसी महिला क्रिकेट विश्व कप लाइव मैच, स्कोर, समाचार, महिला विश्वकप हाइलाइट, महिला विश्व कप रिजल्ट, ICC Women Cricket World Cup, न्यूज़18 इंडिया,WCWC Live Updates in Hindi, Women World Cup 2022, Cricket News, WCWC, WCWC 2022, World Cup of Cricket, Cricket World Cup Live, Live Cricket, World CupWomen Cricket World Cup, Women ODI Matches";
    } else {
      if (topTagStory["meta_title"]) {
        page_title = topTagStory["meta_title"];
      } else {
        page_title =
          TitlePrefix +
          TopicName +
          " News in Hindi, " +
          TopicName +
          " Latest News, " +
          TopicName +
          " News";
      }
      if (topTagStory["seo_description"]) {
        page_description = topTagStory["seo_description"];
      } else {
        page_description =
          "Get " +
          TopicName +
          " News in Hindi, Find " +
          TopicName +
          " Latest News on News18 हिंदी";
      }
      if (topTagStory["seo_keywords"]) {
        page_keywords = topTagStory["seo_keywords"];
      } else {
        page_keywords =
          TopicName +
          " News in Hindi, " +
          TopicName +
          " Latest News, " +
          TopicName +
          " News";
      }
    }
  }
  // meta details end
  const [
    menuData = {},
    miscData = {},
    topPriorityStories = [],
    footerData = [],
    topStories = [],
    photoStories = [],
    districtList = {},
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    getMiscData({ trendingTags: true }),
    !isMobile
      ? getTopPriorityStories({
          count: 5,
          offset: 0,
          fields:
            "story_id,thumbnail,display_headline,title,weburl,images,weburl_r",
          filter: { post_type: "text" },
        })
      : [],
    !isAmp ? getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM) : [],
    isAmp
      ? []
      : getArticleList({
          count: 5,
          offset: 0,
          fields:
            "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro",
          filter: { post_type: "text" },
        }),
    !isAmp
      ? getArticleList({
          count: 9,
          offset: 0,
          fields:
            "story_id,display_headline,title,images,weburl_r,weburl,gallery_count",
          filter: { post_type: "photogallery" },
        })
      : [],
    isAmp && getDistricts(),
  ]);

  //   const article = tagData || {};
  //   const { images: { url: thumbnailUrl = "" } = {}, tag_topic: tagTopic = [] } =
  //     article;
  const seoPageTitle = page_title;
  const pageDescription = page_description;
  const pageKeywords = page_keywords;

  const { siteUrl } = publicRuntimeConfig;
  const news = siteUrl + "tag/";
  const pageSeo = {
    title: seoPageTitle || "404 Not Found",
    description: pageDescription,
    keywords: pageKeywords,
    canonical: (currentUrl.split("page")[0] || "").toLowerCase(),
    og_image: "",
    news: news,
    pageUrl: siteUrl,
    og_title: seoPageTitle,
    og_description: pageDescription,
    isTag,
    topic,
    ct,
    page: "tag",
  };

  let isWomenWorldCupPage = false;
  if (topic === "womens-world-cup-2022") {
    isWomenWorldCupPage = true;
  }

  if (typeof tagData !== "undefined" && tagData) {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        tagData.display_headline,
        pageDescription,
        pageKeywords,
        (currentUrl || "").toLowerCase(),
        { headline: "", intro: "", display_headline: "" }
      ) || "";

    pageSeo.jsonLdForItemList = jsonLdForItemList(
      currentUrl,
      isMobile ? 16 : 24,
      tagData
    );
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
      menuData,
      isMobile
    );
  }
  const pageAds = isMobile
    ? generateMobileAdTags("listing", "topic", false, {
        isCryptoTag: topic === "cryptocurrency",
        isAmp,
        isWomenWorldCupPage,
      })
    : generateAdTags("listing", "topic", false, {
        isCryptoTag: topic === "cryptocurrency",
        isWomenWorldCupPage,
      });
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: seoPageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
    article_id: "",
    section:
      topic === "womens-world-cup-2022"
        ? "WomensWorldCup"
        : topic
        ? topic
        : "Tag",
    content_type: "TOPIC",
    block_ads: tagCMSInfo?.is_adult_content === "yes" ? "yes" : "no",
  });
  pageAds.isTag = true;
  if (tagData) {
    tagData.parsedBody = tagData.body;
    tagData.story_id = tagData.id;
  }
  const imageWidth = isMobile ? "156" : "220";
  const imageHeight = isMobile ? "117" : "165";
  const sales_banner = await getRedisDataByKey(`NW_SALES_BANNERS_hindi`);
  const bannerData1 = Object.values(sales_banner)
    .filter((banner) => {
      if (topic && banner.tag_slug === topic) {
        showBannerInTag = true;
      }
      return banner.tag_slug === topic;
    })
    .map(function (banner) {
      return banner;
    });

  const _1xbetData = bannerData1[0]?.sponserdata || [];
  const tempObj = [
    { slug: `${publicRuntimeConfig.siteUrl}`, value: "हिंदी समाचार" },
    {
      //   slug: `${publicRuntimeConfig.siteUrl}tag/`,
      slug: topicName,
      value: "Tag",
    },
  ];
  if (topicName) {
    tempObj.push({
      slug: `${publicRuntimeConfig.siteUrl}tag/${topicName}`,
      value: TopicName.replace(/%20/g, " ") || "",
    });
  }
  pageSeo.breadCrumbArray = tempObj;

  const pageData = {
    isMobile,
    tagCMSInfo,
    tagData: Array.isArray(tagData) ? tagData : [],
    currentUrl,
    breadCrumbArray: tempObj,
    //    prevLink,
    //    nextLink,
    urlParam,
    dataLength: tagResult.length || 0,
    imageWidth,
    imageHeight,
    topic,
    topicName: TopicName.replace(/%20/g, " ") || "",
    ct,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    topStory: { rhsTopStoryListing: topPriorityStories },
    pageNumber: parseInt(pageNumber),
    paramObj,
    topTagStory,
    districtList,
    footerData,
    topStories,
    photoStories,
    config: {},
    headers: context?.req?.headers || {},
    isWomenWorldCupPage,
    _1xbetData,
    showBannerInTag,
    // iplAuctionList,
  };
  // Pass data to the page via props
  return { props: { pageData } };
};
export default tagProps;
