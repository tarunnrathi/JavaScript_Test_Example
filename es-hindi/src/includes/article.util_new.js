import getConfig from "next/config";
import { logPageView, logEvent } from "includes/googleAnalytic";
import { sectionMaker } from "./_app.util";

const { publicRuntimeConfig } = getConfig();

export const sectionExtractor = (data) => {
  let sec = "";

  if (data) {
    if (Array.isArray(data.categories)) {
      sec += data.categories
        .reverse()
        .map((i) => i?.slug)
        .filter(Boolean)
        .join(", ");
    }
  }

  return sec;
};

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
      title: headline,
    });
  }
};

export const pageEvents = ({
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
  categoryForGA = "",
  articleData,
  cd14Value,
  cd18Value,
  cd19value,
  cd20value,
  publishByFull,
  allSections,
  publishedByWithId = "",
  taboolaVariable = "",
  nw_post_word_count = 0,
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
        "",
        categoryForGA,
        cd18Value,
        cd14Value,
        cd19value,
        cd20value,
        publishedByWithId,
        taboolaVariable,
        nw_post_word_count
      );
      if (isAjax) {
        // for first article call is being made in the header
        // Trigger comscore
        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
        if (typeof OBR !== "undefined") {
          OBR.extern.researchWidget();
        }
        // firePV();
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
        "",
        categoryForGA,
        cd18Value,
        cd14Value,
        cd19value,
        cd20value,
        publishedByWithId,
        taboolaVariable,
        nw_post_word_count
      );
      if (currentPage > callFired.current) {
        // for first article call is being made in the header
        // Trigger comscore
        self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
        if (typeof OBR !== "undefined") {
          OBR.extern.researchWidget();
        }
        //   firePV();
        if (currentPage && currentPage !== 1) {
          url = url.replace(".html", `-page-${currentPage}.html`);
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
