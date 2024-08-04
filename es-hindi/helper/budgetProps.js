import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { checkDevice, getSetTargettingValues } from "includes/helper";
import { ignoreQueryParams } from "includes/article.util";
import {
  jsonLdForWebPage,
  jsonLdForHomeSiteNavigation,
} from "includes/schema.util";
import { budget as generateDesktopAds } from "includes/Desktop/dfpAdIds";
import { budget as generateMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { getBudgetDetails } from "includes/seo.util";
import { TaboolaList } from "includes/Tabola.helper";
import {
  getArticleList,
  getDistricts,
  getGoogleConfig,
  getMenu,
  getMiscData,
  getPriorityData,
  getRedisDataByKey,
} from "api_dns/global/Common";
import { REDIS_KEYS } from "api/Constant";

async function getSectorData(budgetSectorialReport) {
  const temp = (budgetSectorialReport.top_sectorial_panel || []).filter(
    (sector) => sector.heading && sector.tag
  );
  const asyncRes = await Promise.all(
    temp.map(async (priorityData) => {
      const sectorialSlug = priorityData?.tag
        .trim()
        .replaceAll(" ", "-")
        .toLowerCase();
      // const slugName = priorityData?.tag;
      const childobj = {
        heading: priorityData?.heading,
        logo_tracker_code: priorityData.img_tracker
          ? priorityData.img_tracker
          : "",
        logo_url: priorityData.url ? priorityData.url : "",
        sectorialSlug: sectorialSlug,
        repeater: priorityData.repeater ? priorityData.repeater : [],
        tagName: sectorialSlug,
      };
      const result = await getArticleList({
        count: 4,
        fields:
          "story_id,section,headline,created_at,updated_at,weburl_r,images,intro,display_headline,post_type",
        filter: { post_type: "text", "tags.slug": `${sectorialSlug}` },
      });
      childobj.tagData = result;
      return childobj;
    })
  );
  return asyncRes.filter((art) => art.tagData && art.tagData.length);
}

const budgetProps = async (context, isAmp = false, isTag = false) => {
  const isMobile = checkDevice(context);

  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const { hasLayout = "true" } = context.query;

  const BUDGET_PAGES = {
    HOME: "home",
    TIMELINE: "timeline",
    GLOSSARY: "glossary",
    HIGHLIGHTS: "highlights",
  };

  const currentUrl = ignoreQueryParams(
    protocol + host + context.req.url,
    false
  );
  const urlParam = context.query;
  const sectionName = urlParam?.section || BUDGET_PAGES.HOME;
  const highlightFilter = urlParam?.filter || "";

  if (!Object.values(BUDGET_PAGES).includes(sectionName)) {
    return {
      notFound: true,
    };
  }

  const budgetYear = 2024; // Current Year KEY
  const redisYearKey = 2022; // Previous Year KEY

  const budgetHeadlineData = {
    home: {
      headline: `Budget 2024`,
    },
    timeline: {
      headline: `India Budget History`,
      label: `बजट टाइमलाइन (1991 - ${budgetYear})`,
      description: `बजट 2023-24 अमृत काल के लिए एक विजन प्रस्तुत कर रहा था.
      सरकार ने इसमें तीन प्राथमिकताओं पर ध्यान केंद्रित किया-
      1.नागरिकों, विशेष रूप से युवाओं की आकांक्षाओं को पूरा करने के लिए व्यापक अवसरों को उपलब्ध कराना,
      2. प्रगति और रोजगार सृजन के लिए मजबूत आधार उपलब्ध कराना और 3. वृहद आर्थिक सुस्थिरता को मजबूत बनाना.`,
    },
    highlights: {
      headline: `Budget 2024 Highlights`,
      label: `India Budget ${budgetYear} Highlights`,
      description: `आज मोदी सरकार का लगातार 11वां बजट है.
      1 फरवरी 2024 को अंतरिम बजट के बाद आज 23 जुलाई को इसी वित्त वर्ष का पूर्ण बजट पेश किया जा रहा है.
      ऐसे में वित्त मंत्री निर्मला सीतारमण से आम टैक्सपेयर्स को काफी उम्मीदें हैं. इस बार यह देखना अहम होगा कि सरकार कहां पैसा बरसाएगी और कहां से उगाही के रास्ते तलाशेगी.`,
    },
    glossary: {
      headline: `Budget Glossary`,
      label: `आम बजट ${budgetYear} शब्दावली`,
      description: `बजट शब्दावली: वित्त मंत्री द्वारा पेश किये जाने वाले बजट को समझने के लिए बजट की भाषा को समझना जरूरी है.
       जैसे कि Expenditure, CESS, Financial year, Economic Survey इत्यादी.
        वित्त मंत्री निर्मला सीतारमण 1 फरवरी 2024 को सुबह 11 बजे बजट पेश करेंगी.
         यदि आप उनके द्वारा इस्तेमाल किये गए शब्दों को बेहतर तरीके से समझना चाहते हैं तो ये शब्दावली आपके काम आएगी.`,
    },
  };

  const pageConfig = {
    sectionName,
    breadcrumb: "",
    budgetYear,
    requestURL: currentUrl,
  };
  const pageContent = {};
  let breadcrumbArray = [];
  if (sectionName === BUDGET_PAGES.HOME) {
    breadcrumbArray = [
      { slug: "/", value: "हिंदी न्यूज" },
      { slug: "", value: "बजट 2024" },
    ];
    const [
      budgetBreakingNews,
      budgetGlossary,
      budgetGraphicData,
      { data: timelineData = [] },
      graphicsData,
      sectorialReportsData,
      budgetTopPriority = [],
      sponsorData = {},
    ] = await Promise.all([
      getRedisDataByKey(`nw_budget_breaking_news`),
      getRedisDataByKey(`nw_union_budget_glossary`),
      getRedisDataByKey(
        "nw_budget_graphic",
        "KHABARN18-",
        false
        // "https://stg-api.news18.com/nodeapi/v1/hin/"
      ),
      getRedisDataByKey(`nw_budget_timeline`),
      getPriorityData({
        section: "budget",
        subSection: "photo",
        count: 3,
        fallback: true,
        filter: { "tags.slug": "budget-session", post_type: "photogallery" },
      }),
      getRedisDataByKey(`nw_union_budget_top_sector`),
      getPriorityData({
        section: "budget",
        subSection: "news",
        count: 10,
        fallback: true,
        filter: { "tags.slug": "budget-session" },
        // customURL: "https://stg-api.news18.com/nodeapi/v1/hin/",
      }),
      getRedisDataByKey(`SPONSER_MODULE_POSITION-budget-${redisYearKey}`),
    ]);
    pageContent["budgetHomeData"] = {
      budgetBreakingNews,
      budgetGlossary,
      budgetGraphicData,
      budgetTopPriority,
    };
    pageContent["glossarySponsor"] =
      sponsorData["Budget-2022-Glossary-widget"] || {};
    const sortedTimeline = timelineData.sort((a, b) => b.years - a.years);
    pageContent["timeline"] = sortedTimeline;
    const graphicsDataArr = graphicsData.map((data) => {
      return data.article_details;
    });
    pageContent["graphics"] = graphicsDataArr;
    pageContent["sectorialReports"] = await getSectorData(sectorialReportsData);

    pageContent["heading"] = budgetHeadlineData[sectionName];
    pageContent["timelineSponsor"] =
      sponsorData["Budget-2022-Timeline-widget"] || {};
    pageContent["calculatorSponsor"] =
      sponsorData["Income Tax Caclulator Budget"] || {};
    pageContent["sectorialSponsor"] = sponsorData || {};
  } else if (sectionName === BUDGET_PAGES.TIMELINE) {
    breadcrumbArray = [
      { slug: "/", value: "हिंदी न्यूज" },
      { slug: "/budget/", value: "बजट 2024" },
      { slug: "/budget/timeline/", value: "बजट टाइमलाइन" },
    ];
    const [
      { data: timelineData = [] },
      { data: glossary = [] },
      sponsorData = {},
    ] = await Promise.all([
      getRedisDataByKey(`nw_budget_timeline`),
      getRedisDataByKey(`nw_union_budget_glossary`),
      getRedisDataByKey(`SPONSER_MODULE_POSITION-budget-${redisYearKey}`),
    ]);
    pageContent["rhsGlossaryData"] = glossary;
    pageContent["glossarySponsor"] =
      sponsorData["Budget-2022-Glossary-widget"] || {};

    pageConfig["breadcrumb"] = "बजट टाइमलाइन";
    const sortedTimeline = timelineData.sort((a, b) => b.years - a.years);
    pageContent["timeline"] = sortedTimeline;
    pageContent["heading"] = budgetHeadlineData[sectionName];
    pageContent["headlineSponsor"] =
      sponsorData["Budget-2022-Timeline-landing-page"] || {};
  } else if (sectionName === BUDGET_PAGES.GLOSSARY) {
    breadcrumbArray = [
      { slug: "/", value: "हिंदी न्यूज" },
      { slug: "/budget/", value: "बजट 2024" },
      { slug: "/budget/glossary/", value: "बजट ग्लॉसरी" },
    ];
    const [photoGalleryData, { data: glossary = [] }, sponsorData = {}] =
      await Promise.all([
        getPriorityData({
          section: "budget",
          subSection: "photo",
          count: 10,
          fallback: true,
          filter: { "tags.slug": "budget-session", post_type: "photogallery" },
        }),
        getRedisDataByKey(`nw_union_budget_glossary`),
        getRedisDataByKey(`SPONSER_MODULE_POSITION-budget-${redisYearKey}`),
      ]);

    const photogalleryList = photoGalleryData.map(
      (data) => data.article_details
    );
    pageContent["rhsGlossaryData"] = glossary;
    pageContent["glossarySponsor"] =
      sponsorData["Budget-2022-Glossary-widget"] || {};
    pageConfig["breadcrumb"] = "बजट ग्लॉसरी";
    pageContent["heading"] = budgetHeadlineData[sectionName];
    pageContent["budgetPhotoStories"] = photogalleryList || [];
    pageContent["headlineSponsor"] =
      sponsorData["Budget-2022-Glossary-Landing-page"] || {};
  } else if (sectionName === BUDGET_PAGES.HIGHLIGHTS) {
    breadcrumbArray = [
      { slug: "/", value: "हिंदी न्यूज" },
      { slug: "/budget/", value: "बजट 2024" },
      { slug: "/budget/highlights/", value: "बजट हाइलाइट्स" },
    ];
    const [
      { highlights: highlightData = [] },
      { data: glossary = [] },
      sponsorData = {},
    ] = await Promise.all([
      getRedisDataByKey(`unionbudget_highlights`),
      getRedisDataByKey(`nw_union_budget_glossary`),
      getRedisDataByKey(`SPONSER_MODULE_POSITION-budget-${redisYearKey}`),
    ]);
    pageContent["rhsGlossaryData"] = glossary;
    pageContent["glossarySponsor"] =
      sponsorData["Budget-2022-Glossary-widget"] || {};
    pageConfig["breadcrumb"] = "बजट हाइलाइट्स";
    pageContent["highlights"] = highlightData;
    pageContent["heading"] = budgetHeadlineData[sectionName];
    pageContent["hfilter"] = highlightFilter;
    pageContent["headlineSponsor"] =
      sponsorData["budget-2022-highlights-landing-page"] || {};
  }

  const { title, description, keywords } = getBudgetDetails(
    sectionName,
    BUDGET_PAGES
  );
  const [
    menuData = {},
    miscData = {},
    footerData = [],
    googleRemoteConfig = {},
    districtList = {},
    sales_banner = {},
    eventSwitchers,
    { highlights: highlightData = [] },
  ] = await Promise.all([
    getMenu(isMobile, isAmp),
    !isMobile || !isAmp
      ? getMiscData({
          trendingTags: true,
          catName: true,
          image: true,
        })
      : {},
    !isAmp || !isMobile ? getRedisDataByKey(REDIS_KEYS.NEW_FMS_SYSTEM) : [],
    getGoogleConfig(),
    isAmp && getDistricts(),
    getRedisDataByKey("NW_SALES_BANNERS_hindi", "KHABARN18-"),
    getRedisDataByKey(`union_budget_switch_on_off`),
    isAmp ? getRedisDataByKey(`unionbudget_highlights`) : {},
  ]);

  pageContent["eventSwitchers"] = eventSwitchers;
  const pageTitle = title;
  const pageDescription = description;
  const pageKeywords = keywords;

  const { siteUrl } = publicRuntimeConfig;
  const news = siteUrl + "news/";
  const pageSeo = {
    title: pageTitle || "404 Not Found",
    description: pageDescription,
    keywords: pageKeywords,
    canonical: currentUrl,
    og_image: `https://images.news18.com/ibnkhabar/uploads/2024/01/Budget-OG-2024-2024-01-57e5c90f3727c3acd9a7191595b8c3c0.png`,
    news,
    pageUrl: siteUrl,
    og_title: pageTitle,
    og_description: pageDescription,
    isTag,
    section: "budget",
    sub_section: sectionName === "home" ? "" : sectionName,
    page: "category",
    ampHtml: publicRuntimeConfig.siteUrl + "amp/budget/",
  };

  if (typeof pageContent !== "undefined" && pageContent) {
    pageSeo.jsonLdForWebPage =
      jsonLdForWebPage(
        pageTitle,
        pageDescription,
        pageKeywords,
        currentUrl ? currentUrl.split("?")[0] : "",
        ""
      ) || "";
    pageSeo.jsonLdForHomeSiteNavigation = jsonLdForHomeSiteNavigation(
      menuData,
      isMobile
    );
  }

  const pageAds = isMobile ? generateMobileAds("") : generateDesktopAds("");

  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageTitle,
    description: pageDescription,
    seo_keywords: pageKeywords,
    weburl: currentUrl,
    article_id: "",
    section: "Budget_2024",
    content_type: "budget",
    block_ads: "no",
  });

  const bannerData1 = Object.values(sales_banner).filter(
    (banner) => banner.campagin_name === "Union Budget 2024"
  );
  const _1xbetData = bannerData1[0]?.sponserdata || [];
  const taboolaList = TaboolaList.category;

  const pageData = {
    isMobile,
    pageContent,
    currentUrl,
    urlParam,
    menuData,
    pageSeo,
    pageAds,
    trendingTags: miscData.trendingTags || [],
    pageConfig,
    districtList,
    footerData,
    config: googleRemoteConfig,
    pageType: "budget",
    section: "budget",
    subsection: sectionName === "home" ? "" : sectionName,
    _1xbetData,
    BUDGET_PAGES,
    taboolaList,
    breadcrumbArray,
    isBudgetHome: sectionName === BUDGET_PAGES.HOME ? true : false,
    cd19value: sectionName === "home" ? "Vidgyor" : "",
    cd20value: sectionName === "home" ? "LiveTv" : "",
    isBudgetPage: true,
    highlightData,
    hasLayout,
  };
  return { props: { pageData } };
};
export default budgetProps;
