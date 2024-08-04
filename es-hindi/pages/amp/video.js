export const config = { amp: true };

import React from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

import AmpLayout from "layouts/Amp/AmpLayout";
import Video from "components/Amp/Video";
import { extractMetatags } from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForImageObject,
  jsonLdForVideoObject,
} from "includes/schema.util";
import Head from "next/head";
import { getArticleByIdFields } from "api_dns/individual/Article";
import { getArticleList, getDistricts, getMenu } from "api_dns/global/Common";

const video = (props) => {
  let pageSeo = {};

  if (props.pageData.post_id) {
    const article = props.pageData.articleData || {};
    const {
      headline = "",
      intro = "",
      images: { url: thumbnailUrl = "" } = {},
      tag_topic: tagTopic = [],
    } = article;

    let seoPageTitle = "";
    let pageDescription = "";
    let pageKeywords = tagTopic;
    const postMeta = props.pageData.metaData;
    if (article && article != "" && article.story_id) {
      seoPageTitle = headline.replace(/(<([^>]+)>)/gi, "");
      pageDescription = intro.replace(/(<([^>]+)>)/gi, "");
      pageKeywords = "";
      seoPageTitle = seoPageTitle + "– News18 हिंदी";
      if (postMeta?.tags?.[0]?.["page_title"]) {
        seoPageTitle = postMeta["tags"][0]["page_title"] + "– News18 हिंदी";
      }
      if (postMeta?.tags?.[0]?.["page_desc"]) {
        pageDescription = postMeta["tags"][0]["page_desc"];
      }
      if (postMeta?.tags?.[0]?.["page_keywords"]) {
        pageKeywords = postMeta["tags"][0]["page_keywords"];
      }
      if (pageDescription == "") {
        pageDescription = headline;
      }
    }
    const { siteUrl } = publicRuntimeConfig;
    const news = `${siteUrl}news`;
    // let fourthEntry = generateCrumbFromUrl(props.pageData.currentUrl || "");
    pageSeo = {
      title: seoPageTitle || "404 Not Found",
      description: pageDescription,
      keywords: pageKeywords,
      canonical: props.pageData?.finalURL || article.weburl,
      og_image: thumbnailUrl,
      news: news,
      cat: "video",
      subCat:props.pageData?.subCat,
      pageUrl: siteUrl,
      og_title: headline.replace(/(<([^>]+)>)/gi, ""),
      og_description:
        intro.replace(/(<([^>]+)>)/gi, "") ||
        (article["headline"] &&
          article["headline"].replace(/(<([^>]+)>)/gi, "")) ||
        "",
    };
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        article.headline,
        article.headline && article.headline.body,
        pageKeywords,
        article.weburl,
        article
      ) || "";
    pageSeo.jsonLdForImageObject = jsonLdForImageObject(article) || "";
    pageSeo.jsonLdForVideoObject =
      jsonLdForVideoObject(article, pageDescription) || "";
  }

  return (
    <>
      <Head>
        <meta
          itemProp="datePublished"
          content={props.pageData.articleData["timestampCreationDate"]}
        />
        <meta
          property="article:published_time"
          content={props.pageData.articleData["timestampCreationDate"]}
        />
        <meta
          property="article:modified_time"
          content={props.pageData.articleData["timestampUpdateDate"]}
        />
        <meta
          property="og:updated_time"
          content={props.pageData.articleData["timestampUpdateDate"]}
        />
        <meta
          property="og:category"
          content={props.pageData.paramObj.subCat || "videos"}
        />
      </Head>
      <AmpLayout
        data={props.pageData}
        mainComponent={Video}
        pageSeo={pageSeo}
        pageType="video"
        isVideo={true}
        chartbeat={props?.chartbeat}
        category={"APPdownload_Mweb_Video"}
        GA4Data={props?.GA4Data}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  // let urlHash = context.req.url;

  let headerData = context.req.headers,
    isMobile = false;

  if (
    typeof headerData["x-akamai-device-characteristics"] !== undefined &&
    headerData["x-akamai-device-characteristics"] == "is_mobile=true"
  ) {
    isMobile = true;
  }
  const urlParam = context.query;

  const subCat = urlParam.channel || "";
  // let sponData = "";
  const articleData = await getArticleByIdFields(urlParam.video_id, "video");
  if (
    articleData == null ||
    articleData == "" ||
    typeof articleData.story_id === "undefined" ||
    articleData.flag == "0"
  ) {
    return {
      notFound: true,
    };
  }

  let videoId = "";
  let videoTitle = "";

  videoId = articleData?.local18_video || articleData?.youtubeid;

  // if(articleData?.body.indexOf('YoutubeEmbed') !== -1){
  //   console.log('inside footer getting embed');
  //   let src = /data-videoid=(".*?")/gi.exec(articleData?.body)[1];
  //   videoId = src.slice(1,src.length-1)
  // }else{
  //   console.log('body --------', articleData);
  //   videoId = articleData?.local18_video || articleData?.youtubeid
  // }

  if (videoId) {
    videoTitle = articleData?.display_headline;
  }
  let category_videos = {
    "categories.slug": `entertainment`,
    post_type: "videos",
  };
  const [
    metaData = [],
    mainMenu = [],
    miscData = {},
    moreVideos = [],
    districtList = [],
    // iplAuctionList = {},
    menuData = {},
  ] = await Promise.all([
    urlParam.video_id ? extractMetatags(articleData, urlParam.video_id) : [],
    getMenu(false, true),
    {},
    getArticleList({
      count: 4,
      offset: 0,
      filter: category_videos,
      fields: `story_id,display_headline,images,weburl_r,weburl`,
    }),
    getDistricts(),
    getMenu(false, true),
  ]);
  if (
    typeof articleData !== "undefined" &&
    articleData != "" &&
    typeof articleData.story_id !== "undefined" &&
    articleData.story_id != ""
  ) {
    // let article_slug = articleData.weburl.replace("https://hindi.news18.com", ""),
    // webUrl = articleData.weburl.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl + 'amp/');
    // if (encodeURI(article_slug) != ignoreQueryParams(context.req.url)) {
    //   if (encodeURI(webUrl) !== ignoreQueryParams(currentUrl)) {
    //     return {
    //       redirect: {
    //         destination: encodeURI(customizeUrl(articleData.weburl, true)),
    //         statusCode: 301,
    //       },
    //     }
    //   }
    // }
  }

  const finalURL =
    protocol +
    currentUrl.split("/")[2] +
    "/" +
    articleData?.weburl.split(".com/")[1];
  const breadCrumbArray = [
    { value: "हिंदी समाचार", slug: "/" },
    { value: "Video", slug: "/videos/" },
  ];
  if (articleData?.subsection?.length) {
    breadCrumbArray.push({
      value: "Video",
      slug: `/videos/${articleData?.subsection[0]?.slug}`,
    });
  }
  breadCrumbArray.push({ value: articleData?.display_headline });
  const paramObj = {
    category: "videos",
    requestURL: finalURL || currentUrl,
    subCat: subCat,
  };
  const pageData = {
    currentUrl,
    urlParam,
    articleData,
    isMobile,
    pcategory:"Videos",
    subCat,
    breadCrumbArray,
    districtList,
    metaData,
    mainMenu,
    category: paramObj.category,
    paramObj,
    moreVideos,
    // sponData,
    imageM: miscData.image || {},
    post_id: urlParam.video_id ?? false,
    finalURL,
    cd19value: "Vidgyor Player",
    cd20value: "Video",
    videoId,
    videoTitle,
    canonical: finalURL || articleData.weburl,
    page: "video",
    // iplAuctionList,
    menuData,
    isAmp:true,
    section:subCat
  };

  // Pass data to the page via props
  return { props: { pageData } };
}

export default video;
