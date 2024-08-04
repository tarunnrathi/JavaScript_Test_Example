import { useEffect } from "react";
import { newVidgyorScript, scriptLoader } from "includes/article.util";
import { logPageView, logPageViewLiveScore } from "includes/googleAnalytic";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { set_ppid } from "includes/ppid.helper";

import { initGA } from "includes/googleAnalytic";

export default function ScriptManager({
  isMobile = false,
  pageAds = {},
  articleData = {},
  dtype = "",
  switches,
  liveCricketScore,
  isAqi,
  isVideoPage,
  isArticle,
  cd18value,
  cd14value,
  cd19value,
  cd20value,
  isFeature,
  callJsOnFkYt,
  taboolaVariable = "",
  nw_post_word_count = "",
  vidStreamData = {},
  vid_exist = false,
  isT20=false,
  isolympics = false,
  isBudgetPage = false,
}) {
  useEffect(() => {
    if (!isMobile) {
      loader({}, true, articleData);

      setTimeout(() => {
        loader(pageAds, false, articleData, true);
      }, 1000);
      // if (callJsOnFkYt || isVideoPage || isFeature) {
      //   loadSmartPlayer();
      // }
      setTimeout(() => {
        //loadCleverTap();
        if (switches?.score) {
          scriptLoader("/images/livescoreticker.js?v=4");
        }
      }, 3000);

      setTimeout(() => {
        set_ppid();
      }, 100);
    } else {
      // Load ads on mobile on scroll
      window.addEventListener("scroll", function func() {
        const { pageYOffset } = window;
        if (pageYOffset > 30) {
          const stickyDiv = document?.getElementsByClassName("ftrad")?.[0];
          if (stickyDiv) {
            stickyDiv.style.display = "block";
          }

          const btnDiv = document?.getElementsByClassName("btnvav")?.[0];
          if (btnDiv) {
            btnDiv.style.display = "flex";
          }

          const closeDiv = document?.getElementsByClassName(
            "sticky-ad-close-button",
          )?.[0];
          if (closeDiv) {
            closeDiv.style.visibility = "visible";
          }

          // Remove listener
          window.removeEventListener("scroll", func);
          //setTimeout(() => loadCleverTap(), 3000);
        }
      });

      setTimeout(() => {
        set_ppid();
      }, 100);
      // Load comscore on mobile after document is loaded
      initGA();
      fireGa(articleData);      

      // if (callJsOnFkYt || isVideoPage || isFeature) {
      //     loadSmartPlayer();
      // }
      setTimeout(() => {
        loader(pageAds, false);
      }, 2000);

      setTimeout(() => {
        if (dtype == "photogallery") {
          window.intervalId = setInterval(() => {
            if (window.googletag) {
              const slotId = window.googletag
                .pubads()
                .getSlots()
                .filter(
                  (item) => item.getSlotElementId() == "sticky_footer_ad",
                );
              window.googletag.pubads().refresh(slotId);
            }
          }, 30000);
        }
      }, 5000);
    }

    return () => {
      clearInterval(window.intervalId);
    };
  }, []);

  

  const loader = (pageAds, fireEvents = true, articleData) => {
    if (fireEvents) {
      initGA();
      fireGa(articleData);
    }
    //  else {
    //   if (callJsOnFkYt || isVideoPage || isFeature) {
    //     loadSmartPlayer();
    //   }
    // }
  };

  const loadSmartPlayer = () => {
      vid_exist && publicRuntimeConfig.inHousePlayer ? newVidgyorScript(vidStreamData, vid_exist) : newVidgyorScript();
  };

  if (callJsOnFkYt || isVideoPage || isFeature) {
    loadSmartPlayer();
  }

  const fireGa = (articleData) => {
    const {
      agency,
      section,
      fms_autopublished = "",
      author_byline: authorByline = [],
      publish_by: publishedBy = [],
      byline = "",
      ff_source = "",
      ff_author_name = "",
      created_at: creationDate,
      story_id,
      written_by: writtenBy = [],
      edited_by: editedBy = [],
      translated_by: translateBy = [],
      reported_by: reportedBy = [],
      author: authorBy = [],
      byline_other,
    } = articleData;
    // if (isCricketNext || isAqi) {
    if (isAqi) {      
      return logPageViewLiveScore(
        "",
        cd18value,
        cd14value,
        cd19value,
        cd20value,
      );
    }

    const categoryForGA = articleData?.["subsection"]?.[0]?.slug || "";
    // if(!isCricketNext){
    const publishedByName = publishedBy.length
      ? publishedBy[0].english_name
      : "";
    const publishedByWithId = publishedByName + "_" + publishedBy[0]?.ID;

    //for CD1 calculation
    let translateRepoetedBy = "";
    if (reportedBy?.length > 0) {
      translateRepoetedBy =
        reportedBy[0]?.english_name + "_" + reportedBy[0]?.ID;
    }
    if (translateBy?.length > 0) {
      translateRepoetedBy = translateRepoetedBy
        ? translateRepoetedBy +
          " | " +
          translateBy[0]?.english_name +
          "_" +
          translateBy[0]?.ID
        : translateBy[0]?.english_name + "_" + translateBy[0]?.ID;
    }
    if (writtenBy?.length > 0) {
      translateRepoetedBy = translateRepoetedBy
        ? translateRepoetedBy +
          " | " +
          writtenBy[0]?.english_name +
          "_" +
          writtenBy[0]?.ID
        : writtenBy[0]?.english_name + "_" + writtenBy[0]?.ID;
    }
    if (editedBy?.length > 0) {
      translateRepoetedBy = translateRepoetedBy
        ? translateRepoetedBy +
          " | " +
          editedBy[0]?.english_name +
          "_" +
          editedBy[0]?.ID
        : editedBy[0]?.english_name + "_" + editedBy[0]?.ID;
    }

    //for CD7 calculation
    let agency_ff_source_author_byline = "";
    if (agency) {
      agency_ff_source_author_byline = agency;
    }
    const author_type =
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
    

    if (authorByline?.length > 0) {
      agency_ff_source_author_byline = agency_ff_source_author_byline
        ? agency_ff_source_author_byline +
          " | " +
          authorByline[0]?.english_name +
          "_" +
          authorByline[0]?.ID
        : authorByline[0]?.english_name + "_" + authorByline[0]?.ID;
    }

    //for CD9 calculation
    let Publish_by_login_ID = "";
    if (publishedBy.length > 0) {
      Publish_by_login_ID =
        publishedBy[0].english_name + "_" + publishedBy[0].ID;
    }else{
      if ( writtenBy?.length > 0) {         
        Publish_by_login_ID = writtenBy[0]?.english_name + "_" + writtenBy[0]?.ID;
      }
    }

    logPageView(
      publishedBy.length ? publishedBy[0].english_name : "",
      byline,
      agency,
      authorByline.length ? authorByline[0].author_type : "",
      authorByline.roles ? authorByline.roles : [],
      fms_autopublished,
      section,
      story_id,
      creationDate,
      ff_source,
      ff_author_name,
      articleData,
      isVideoPage ? 1 : isArticle ? 2 : 0,
      categoryForGA,
      cd18value,
      cd14value,
      cd19value,
      cd20value,
      publishedByWithId,
      taboolaVariable,
      nw_post_word_count,
      Publish_by_login_ID,
      agency_ff_source_author_byline,
      translateRepoetedBy,
      isT20,
      isolympics,
      isBudgetPage
    );
    // }
  };

  const loadCleverTap = () => {
    window.clevertap = {
      event: [],
      profile: [],
      account: [],
      onUserLogin: [],
      region: "in1",
      notifications: [],
      privacy: [],
    };
    // replace with the CLEVERTAP_ACCOUNT_ID with the actual ACCOUNT ID value from your Dashboard -> Settings page
    window.clevertap.account.push({
      id: publicRuntimeConfig.CLEVERTAP_ACCOUNT_ID,
    });
    window.clevertap.privacy.push({ optOut: false }); //set the flag to true, if the user of the device opts out of sharing their data
    window.clevertap.privacy.push({ useIP: true }); //set the flag to true, if the user agrees to share their IP data
    scriptLoader("https://d2r1yp2w7bby2u.cloudfront.net/js/clevertap.min.js");
  };
  return null;
}
