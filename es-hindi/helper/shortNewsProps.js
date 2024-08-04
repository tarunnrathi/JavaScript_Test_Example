import { getArticleList } from "api_dns/global/Common";
import { checkDevice, getSetTargettingValues } from "includes/helper";
import getConfig from "next/config";
import { home as homeAds } from "includes/Desktop/dfpAdIds";
import { home as homeMobileAds } from "includes/Mobile/dfpAdIdsMobile";
import { validSlugChecker } from "includes/_app.util";

const { publicRuntimeConfig } = getConfig();

const impactShortProps = async (context) => {
  const urlParam = context.query;
  const isMobile = checkDevice(context);
  let category = "";
  let webSlug = "";
  let protocol = "https://";
  const { host } = context.req.headers;
  if (host.indexOf("localhost") > -1) {
    protocol = "http://";
  }
  const currentUrl = protocol + host + context.req.url;
  const { slug = [] } = urlParam || {};
  if (slug && slug.length > 1) {
    [category, webSlug] = slug;
  } else if (slug.length === 1) {
    const countOfDas = slug[0].match(/-/g)?.length || 0;
    if (countOfDas <= 1) {
      [category] = slug;
    } else {
      [webSlug] = slug;
    }
  }

  category = validSlugChecker(category) ? category : "";
  webSlug = validSlugChecker(webSlug) ? webSlug : "";

  let [currentArticle = [], latestNews = []] = await Promise.all([
    webSlug
      ? getArticleList({
          count: 1,
          filter: category
            ? { weburl_short: webSlug, "categories.slug": category }
            : { weburl_short: webSlug },
          fields:
            "weburl_r,weburl_short,shorts_bulletin,categories,images,headline,display_headline,created_at,story_id,weburl,categories,post_type,is_hyperlocal_vw",
        })
      : [],
    webSlug
      ? getArticleList({
          count: 19,
          filter: category
            ? {
                shortnews_status: "1",
                not: { weburl_short: validSlugChecker(slug) ? slug : "" },
                "categories.slug": category,
              }
            : { shortnews_status: "1", not: { weburl_short: validSlugChecker(slug) ? slug : "" } },
          fields:
            "weburl_r,weburl_short,shorts_bulletin,categories,images,headline,display_headline,created_at,story_id,weburl,categories,post_type,publish_by,is_hyperlocal_vw",
        })
      : getArticleList({
          count: 20,
          filter: category
            ? { shortnews_status: "1", "categories.slug": category }
            : { shortnews_status: "1" },
          fields:
            "weburl_r,weburl_short,shorts_bulletin,images,categories,headline,display_headline,created_at,story_id,weburl,categories,post_type,publish_by,is_hyperlocal_vw",
        }),
  ]);

  let currentArticleTemp = null;
  if (currentArticle && currentArticle.length) {
    const [currentArticleData] = currentArticle;
    currentArticleTemp = currentArticleData;
    latestNews = [currentArticleData, ...latestNews];
  }

  if (!latestNews || !latestNews.length) {
    return {
      notFound: true,
    };
  }

  const commonTitle =
    "News in Shorts: Entertainment News, Cricket News, Economy News, Industry News Headlines";
  const commonDesc =
    "Shorts News: Get all latest news in shorts, news highlights";

  const pageSeo = {
    title: currentArticleTemp
      ? currentArticleTemp?.display_headline || commonTitle
      : commonTitle,
    description: currentArticleTemp
      ? currentArticleTemp?.headline || commonDesc
      : commonDesc,
    keywords:
      "news in shorts, Entertainment news in shorts, Bollywood  news in shorts, personal finance news in shorts, industry news shorts, technology news in shorts, shorts news",
    canonical: currentUrl.split("page")[0],
    news: publicRuntimeConfig.siteUrl + "news/",
    pageUrl: currentUrl,
    og_title: currentArticleTemp
      ? currentArticleTemp?.display_headline || commonTitle
      : commonTitle,
    og_description: currentArticleTemp
      ? currentArticleTemp?.headline || commonDesc
      : commonDesc,
    section: "short news",
    pageName: "landing",
    page: "short news",
  };
  if (currentArticleTemp) {
    pageSeo.og_image = currentArticleTemp?.images?.url || "";
  }
  const pageAds = isMobile ? homeMobileAds() : homeAds();
  pageAds.setTargetingValues = getSetTargettingValues({
    headline: pageSeo.title,
    description: pageSeo.description,
    seo_keywords: pageSeo.keywords,
    weburl: currentUrl,
    article_id: currentArticleTemp?.story_id || "",
    section: "short news",
    block_ads: "no",
  });

  const pageData = {
    latestNews,
    pageSeo,
    currentUrl,
    pageAds,
    isMobile,
    slug,
    category,
    webSlug,
    page: "short news page",
    isShortNews: true,
  };
  return { props: { pageData } };
};

export default impactShortProps;
