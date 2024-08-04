import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { article as videoAds } from "includes/Desktop/dfpAdIds";
import { article as videoMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import { extractMetatags } from "includes/article.util.js";
import {
    jsonLdForHomeOrganization,
    jsonLdForWebPage,
    jsonLdForVideoObject,
    jsonLdForHomeSiteNavigation
} from "includes/schema.util";
import Head from "next/head";
import { get_site_link, getSetTargettingValues } from "includes/helper";
import TaboolaHeader from "widgets/Common/Responsive/TaboolaHeader";
import { TaboolaList } from "includes/Tabola.helper";
import dynamic from "next/dynamic";
import video_category from "../helper/videoCategoryData";
import { REDIS_KEYS,CONST_CAT_PAGE } from "api/Constant";
import { getDistricts, getMenu, getMiscData, getRedisDataByKey, getArticleList, RhstopStory, RhsphotoStories, getGoogleConfig, getVideoStreamData } from "api_dns/global/Common";
import { getArticleByIdFields } from "api/individual/Article";
const DesktopLayout = dynamic(() => import("layouts/Desktop/DesktopLayout"));
const MobileLayout = dynamic(() => import("layouts/Mobile/MobileLayout"));
const VideoDesktop = dynamic(() => import("components/Desktop/VideoDesktop"));
const VideoMobile = dynamic(() => import("components/Mobile/VideoMobile"));
const video = ({pageData,chartbeat}) => {
    const { pageSeo } = pageData;
    
    const {
        articleData: { timestampCreationDate, timestampUpdateDate } = {}
    } = pageData;
    if (pageData.isMobile) {
        const pageAds = videoMobileAds(pageData.paramObj, false);
        pageAds.setTargetingValues = getSetTargettingValues({
            headline: pageSeo.title,
            description: pageSeo.description,
            seo_keywords: pageSeo.keywords,
            weburl: pageData.currentUrl,
            article_id: "",
            section: "Video",
            block_ads: "no",
        });
        return (
            <>
                <Head>
                    {timestampCreationDate && timestampUpdateDate && (
                        <>
                            <meta itemProp="datePublished" content={timestampCreationDate} />
                            <meta property="og:updated_time" content={timestampUpdateDate} />
                            <meta property="article:published_time" content={timestampCreationDate} />
                            <meta property="article:modified_time" content={timestampUpdateDate} />
                            <meta property="og:category" content={pageData.paramObj.subCat || 'videos'} />
                        </>
                    )}
                </Head>
                <SiteSeo pageSeo={pageSeo} url={pageData.finalURL || pageData.currentUrl} isVideo={true} chartbeat={chartbeat} />
                <MobileLayout
                    data={pageData}
                    mainComponent={VideoMobile}
                    pageAds={pageAds}
                    pageSeo={pageSeo}
                    dtype="video"
                    isVideoConsumption={true}
                    pageType="video"
                    isVideo={true}
                    section="video"
                    showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
                />
            </>
        );
    } else {
        const pageAds = videoAds('videos', false);
        pageAds.setTargetingValues = getSetTargettingValues({
            headline: pageSeo.title,
            description: pageSeo.description,
            seo_keywords: pageSeo.keywords,
            weburl: pageData.currentUrl,
            article_id: "",
            section: "Video",
            block_ads: "no",
        });
        return (
            <>
                <Head>
                    {timestampCreationDate && timestampUpdateDate && (
                        <>
                            <meta itemProp="datePublished" content={timestampCreationDate} />
                            <meta property="og:updated_time" content={timestampUpdateDate} />
                            <meta property="article:published_time" content={timestampCreationDate} />
                            <meta property="article:modified_time" content={timestampUpdateDate} />
                            <meta property="og:category" content={pageData.paramObj.subCat || 'videos'} />
                        </>
                    )}
                    <TaboolaHeader page={TaboolaList.videoPage.header.page} />
                </Head>
                <SiteSeo pageSeo={pageSeo} url={pageData?.finalURL || pageData?.currentUrl} chartbeat={chartbeat} />
                <DesktopLayout
                    data={pageData}
                    mainComponent={VideoDesktop}
                    pageAds={pageAds}
                    pageSeo={pageSeo}
                    dtype="video"
                    pageType="video"
                    config={pageData.config}
                    isVideo={true}
                    isVideoConsumption={true}
                    section="video"
                    showSponser={Object.keys(pageData._1xbetData || {}).length ? true: false}
                />
            </>
        );
    }
};
export async function getServerSideProps(context, isAmp = false) {
    let protocol = "https://";
    const { host } = context.req.headers;
    if (host.indexOf("localhost") > -1) {
        protocol = "http://";
    }
    const currentUrl = protocol + host + context.req.url;
    const category = 'videos';
    let headerData = context.req.headers,
        isMobile = false;
    if (typeof headerData["x-akamai-device-characteristics"] !== undefined && headerData["x-akamai-device-characteristics"] == "is_mobile=true") {
        isMobile = true;
    }
    const cd19value = 'Vidgyor Player';
    const cd20value = 'Video';
    const urlParam = context.query;
    const district = urlParam?.district ? urlParam?.district
        : currentUrl.split("/")[2];
    urlParam.district = district;
    const id = urlParam.video_id;
    const cat = "videos";
    let subCat = urlParam.channel || "";
    const isWidgetOn = 0;
    const isWidgetSponsorOn = 0;
    // const rhsPhotoGallery = [];
    // const rhsTopStory = [];
    let videoTitle = '';
    const articleData = await getArticleByIdFields(id, "video") || [];
    if (articleData == null || articleData == "" || typeof articleData.story_id === 'undefined' || articleData.flag == '0') {
        return {
            notFound: true
        };
    }
    if (articleData?.auto_youtube_import?.nw_auto_yt_feed_id || articleData?.video_details?.video_id) {
        videoTitle = articleData?.display_headline;
    }
    if((articleData?.video_type === 'desk'|| articleData?.video_details?.type === 'desk') && (articleData?.video_encode?.mongo_id || articleData?.video_details?.video_id)) {
        videoTitle = articleData?.display_headline;
    }
    const cat_videos= { "categories.slug": `${cat ? cat : 'nation'}`, "post_type": "videos" };
    const category_videos= { "categories.slug": `entertainment`,"post_type":"videos"};
    let vidStreamData = {},
    vid_exist = false;
    if (publicRuntimeConfig.inHousePlayer) {
        vidStreamData = await getVideoStreamData(articleData, true);
        if(vidStreamData && Object.keys(vidStreamData).length > 0) {
            vid_exist = true;
        }
    }
    articleData.vidStreamData = vidStreamData;
    articleData.vid_exist = vid_exist;
    const [
        metaData = {},
        miscData = [],
        menuData = {},
        footerData = [],
        topStories = [],
        photoStories = [],
        googleremoteconfig,
        moreVideos = [],
        districtList = {},
        categorySponserData = {},
    ] = await Promise.all([
        id ? extractMetatags(articleData, id) : [],
        getMiscData({ trendingTags: true, catName: true, cat: subCat || cat, image: true }),
        getMenu(isMobile, isAmp),
        getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM),
        RhstopStory(cat_videos, id),
        RhsphotoStories(),
        getGoogleConfig(),
        getArticleList({count: 4, offset: 0, filter: category_videos,  fields:`story_id,display_headline,images,weburl_r,weburl,post_type`}),
        isAmp && getDistricts(),
        getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    ]);
    const catSponData = Object.values(categorySponserData || {})?.find(
        (item) => item.campagin_name === "Lok Sabha Election 2024"
      );
      const _1xbetData = catSponData?.sponserdata || [];
    if (typeof articleData !== "undefined" && articleData != "") {
        articleData.categories.forEach((item) => {
            if (subCat == "") {
                subCat = item.slug;
            }
        });
    }
    const paramObj = {
        id: id,
        cat: cat,
        subCat: subCat,
        requestURL: currentUrl,
    };
    const finalURL = protocol + currentUrl.split('/')[2] + "/" + articleData?.weburl.split('.com/')[1];
    paramObj.requestURL = finalURL || currentUrl;
    const taboolaList = TaboolaList.videoPage;
    const breadCrumbArray = [
        { value: "हिंदी समाचार", slug: "/"},
        { value: "Video", slug: "/videos/"},
    ]
    if(articleData?.subsection?.length) {
        breadCrumbArray.push(
        { value: articleData.subsection[0]?.slug, slug: `/videos/${articleData.subsection[0]?.slug}`},
        )
    }
    breadCrumbArray.push({ value: articleData?.display_headline});
    let pageSeo = {};
    if (id) {
        const article = articleData || {};
        const {
            headline = "",  
            intro = "",
            images: { url: thumbnailUrl = "" } = {},
            tag_topic: tagTopic = [],
        } = article;
        let seoPageTitle = "";
        let pageDescription = "";
        let pageKeywords = tagTopic;
        const postMeta = metaData;
        if (article && article != "" && article.story_id) {
            seoPageTitle = headline.replace(/(<([^>]+)>)/gi, "");
            pageDescription = intro.replace(/(<([^>]+)>)/gi, "");
            pageKeywords = "";
            seoPageTitle = seoPageTitle + " – News18 हिंदी";
            if (postMeta?.tags?.[0]?.["page_title"]) {
                seoPageTitle =
                    postMeta["tags"][0]["page_title"] + " – News18 हिंदी";
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
        const news = siteUrl + "videos/";
        pageDescription = pageDescription.substr(0, 200),
            pageSeo = {
                title: seoPageTitle || "404 Not Found",
                description: pageDescription,
                keywords: pageKeywords,
                canonical: finalURL || article.weburl,
                og_image: thumbnailUrl,
                ampHtml: publicRuntimeConfig.siteUrl + "amp/" + get_site_link(article.weburl),
                news: news,
                cat: 'videos',
                page:"videoConsumption",
                subCat: paramObj.subCat,
                pageUrl: siteUrl,
                og_title: headline.replace(/(<([^>]+)>)/gi, ""),
                og_description:
                    intro.replace(/(<([^>]+)>)/gi, "") ||
                    (article["headline"] && article["headline"].replace(/(<([^>]+)>)/gi, "")) || "",
                isVideo: true,
            };
        // pageSeo.jsonLdForArticleConsumption = jsonLdForArticleConsumption(article) || "";
        pageSeo.jsonLdForOrganization = jsonLdForHomeOrganization() || '';
        pageSeo.jsonLdForWebPage = jsonLdForWebPage(
            article.headline,
            article.headline && article.headline.body,
            pageKeywords,
            article.weburl,
            article
        ) || "";
        // pageSeo.jsonLdForImageObject = jsonLdForImageObject(article) || "";
        pageSeo.jsonLdForVideoObject = jsonLdForVideoObject(article, pageDescription);
        pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(menuData, isMobile) || "";
        // pageSeo.jsonLdForOrganization = jsonLdForOrganization(article) || "";
    }
    // breadCrumbArray.push({ value: articleData?.display_headline})
    const states = CONST_CAT_PAGE.STATES;
    const sectionListTr = CONST_CAT_PAGE.SECTION_LIST_TR;
    const getSectionTranslation = (key = "") => {
        let data = [];
        data =
        districtList?.cityData &&
        districtList.cityData.filter((itm) => itm.slug === key.toLowerCase()) || [];
        if (!data.length) {
        data =
            districtList?.stateData &&
            districtList.stateData.filter((itm) => itm.slug === key.toLowerCase());
        }
        if (data && data.length && data[0]) {
        return data[0].name;
        } else if (states[key.toLowerCase()]) {
        return states[key.toLowerCase()];
        } else {
        return sectionListTr[key.toLowerCase()] || key;
        }
    };
    const category_hi = getSectionTranslation(category);
    const pageData = {
        taboolaList,
        category,
        currentUrl,
        urlParam,
        articleData,
        isMobile,
        breadCrumbArray,
        isWidgetOn,
        isWidgetSponsorOn,
        metaData,
        post_id: id ?? false,
        // sponData,
        paramObj,
        districtList,
        imageM: miscData.image || {},
        // rhsPhotoGallery:photoStories,
        // rhsTopStory: topStories,
        photoStories,
        topStories,
        menuData,
        footerData,
        video_category,
        trendingTags: miscData.trendingTags || [],
        config: googleremoteconfig,
        finalURL,
        cd19value,
        cd20value,
        videoTitle,
        moreVideos,
        vidStreamData,
        vid_exist,
        _1xbetData,
        pageSeo,
        section: "Videos",
        slug: context?.query?.slug || "",
        category_hi
    };
    return { props: { pageData } };
}
export default video;