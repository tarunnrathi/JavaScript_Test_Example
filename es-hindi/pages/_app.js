import App from "next/app";

import { GlobalStore } from "../src/GlobalStore";
import HindiGlobalContext from "HindiGlobalContext";
import Script from "next/script";
import { DFPManager } from "react-dfp";
import Head from "next/head";

// import { checkDevice } from "includes/helper";
import { cd7, customDimensions, sectionMaker } from "includes/_app.util";
import { logEvent } from "includes/googleAnalytic";
// import { getRedisDataByKey } from "api/global/Common";
// import { getRedisDataByKey } from "api/global/Common";
//import moment from "moment";
// import { getRedisDataByKey } from "api/global/Common";

export default class MyApp extends App {
  state = {
    pageProps: this.props.pageProps,
    searchBar: false,
    pageType: "",
    isPopUpOpen: false,
    showStates: false,
    isBottomNextPrevOpen: false,
    isNotificationOnScroll: true,
  };
  updatePageProps = (pageProps) => {
    this.setState({ pageProps });
  };
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
    window.DFPManager = DFPManager;
  }

  handleOnSetSearchBar = (pageType = "") => {
    this.setState({ searchBar: !this.state.searchBar, pageType: pageType });
  };
  handleOnSetNotificationPopUp = () => {
    this.setState({ isPopUpOpen: !this.state.isPopUpOpen });
  };
  handleShowStates = () => {
    // const handleShowChange = () => {
    //   setShowStates((prev) => !prev);
    //   if (!showStates) {
    //     logEvent("Top_Nav_Local18_district", "Click", "अपना शहर चुनें");
    //   }
    // };
    this.setState({ showStates: !this.state.showStates });
    if (!this.state.showStates) {
      logEvent("Top_Nav_Local18_district", "Click", "अपना शहर चुनें");
    }
  };

  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};
  //   //   // const isMobile = checkDevice(ctx);
  //   //   let isAmp = false;

  //   //   if (ctx.req.url.indexOf("/amp") !== -1) {
  //   //     isAmp = true;
  //   //   }

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   const [budgetSwitcherData, { highlights: highlightData = [] }] =
  //     await Promise.all([
  //       getRedisDataByKey(`union_budget_switch_on_off`, "KHABARN18-", true),
  //       getRedisDataByKey(`unionbudget_highlights`, "KHABARN18-", true),
  //     ]);

  //   pageProps.pageCommonProps = {
  //     // electionSwitcherData: electionSwitcherData || {},
  //     // isMobile,
  //     // budgetData: {
  //     //   // budgetSwitcherData,
  //     // },
  //     budgetSwitcherData,
  //     highlightData,
  //     // isAmp,
  //   };

  //   return { pageProps };
  // }
  handleNotificatonOnScrolls = (value) => {
    this.setState({
      isNotificationOnScroll: value,
    });
  };

  render() {
    const { Component, pageProps } = this.props;
    const articleData = pageProps.pageData?.articleData || {};
    const categoryForGA =
      articleData?.["reporter_location"] ||
      articleData?.["subsection"]?.[0]?.slug ||
      "";
    const {
      created_at: timestampCreationDate = "",
      ff_source = "",
      nw_post_word_count: word_count = 0,
      byline = "",
      fms_autopublished = "",
      local18_video = "",
    } = articleData;
    const can =
      pageProps.pageData?.pageSeo?.canonical ||
      pageProps.pageData?.currentURL?.replace("amp/", "") ||
      pageProps.pageData?.canonical?.replace("amp/", "") ||
      "";
    let authorNames;
    if (articleData?.publish_by?.length) {
      const auths = articleData?.publish_by.slice(0, 10);
      authorNames = auths
        .map((i) => i.english_name + "_" + (i.ID || i.id))
        .join(", ");
    } else if (articleData?.auto_youtube_import?.nw_auto_yt_feed_channel_id) {
      authorNames = "News18 India";
    }
    let section =
      pageProps.pageData?.pcategory ||
      pageProps.pageData?.pageAds?.setTargetingValues?.section_name ||
      pageProps.pageData?.section ||
      "";
    const gtmSection =
      pageProps.pageData?.pageSeo?.page === "news-feed"
        ? "news feed"
        : pageProps.pageData?.allSections ||
          pageProps.pageData?.pcategory ||
          pageProps.pageData?.section ||
          pageProps.pageData?.pageAds?.setTargetingValues?.section_name ||
          "";
    const {
      taboolaList = {},
      cd20value = "",
      cd19value = "",
    } = pageProps.pageData || {};
    let channleName;
    let pub_date, pub_time;

    let { dimension15 = "", dimension16 = "" } = customDimensions(articleData);
    if (timestampCreationDate) {
      const newDate = new Date(timestampCreationDate);
      pub_date =
        newDate.getDate() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getFullYear();
      pub_time =
        newDate.getHours() +
        ":" +
        newDate.getMinutes() +
        ":" +
        newDate.getSeconds();
    }
    if (pageProps && pageProps.pageData && pageProps.pageData.isShortNews) {
      dimension15 = "short news page";
    }
    if (pageProps && pageProps.pageData && pageProps?.pageData?.isNewsFeed) {
      dimension15 = "category page";
    }
    const channel = pageProps.pageData?.channel || "";
    section = section
      ? `hindi.news18.com, ${sectionMaker(
          section,
          pageProps.pageData?.pageSeo?.page
        )}`
      : section;
    let page = pageProps.pageData?.pageSeo?.page || pageProps.pageData?.page;
    section = channel ? `${section}, ${sectionMaker(channel)}` : section;
    let subCat =
      pageProps?.pageData?.subCat || pageProps?.pageData?.pageSeo?.subCat || "";
    const subsection =
      (pageProps?.pageData?.subsection || "").toLowerCase() || "";
    let webstoryCat = pageProps.pageData?.webstoryCat;
    webstoryCat = webstoryCat
      ? `hindi.news18.com, ${sectionMaker(webstoryCat)}`
      : webstoryCat;
    if (page === "photogallery") {
      section = pageProps.pageData?.categoryName
        ? `hindi.news18.com, ${sectionMaker(pageProps.pageData?.categoryName)}`
        : "";
      const photoString = section
        ? ", hindi.news18.com - Photogallery"
        : "hindi.news18.com - Photogallery";
      section = section + photoString;
    } else if (pageProps?.pageData?.pageType === "budget") {
      section = `hindi.news18.com, hindi.news18.com - budget`;
    } else if (page === "news-feed") {
      section = `hindi.news18.com, hindi.news18.com - news feed`;
    } else if (page === "Live Tv") {
      section =
        section === ""
          ? `hindi.news18.com , hindi.news18.com - livetv`
          : section;
    } else if (
      !pageProps?.pageData?.isAmp &&
      (page === "video" || page === "short-video-landing")
    ) {
      page = "category";
    } else if (
      page === "videoConsumption" ||
      (pageProps?.pageData?.isAmp && page === "video")
    ) {
      if (subCat !== undefined && subCat !== "" && subCat !== "videos") {
        section = section + `, hindi.news18.com - ${subCat}`;
      }
      page = "video";
    }
    let chartbeat;

    if (can) {
      chartbeat = {
        section:
          page !== "tag"
            ? section
            : page === "news-feed"
            ? "category"
            : "hindi.news18.com, hindi.news18.com - Tag, Tag",
        webstoryCat,
        authorNames,
        can,
        page,
        ...(page === "article"
          ? { wordCount: articleData?.nw_post_word_count || 0 }
          : page === "photogallery"
          ? {
              wordCount:
                (articleData?.gallery?.length > 0 &&
                  articleData?.gallery[0]?.word_count) ||
                0,
            }
          : null),
      };
    }

    let editedByNames = "";
    editedByNames += articleData?.reported_by?.length
      ? articleData.reported_by[0].english_name
      : "";

    editedByNames += articleData?.translated_by?.length
      ? editedByNames
        ? `| ${articleData.translated_by[0].english_name}`
        : articleData.translated_by[0].english_name
      : "";

    editedByNames += articleData?.written_by?.length
      ? editedByNames
        ? `| ${articleData.written_by[0].english_name}`
        : articleData.written_by[0].english_name
      : "";

    editedByNames += articleData?.edited_by?.length
      ? editedByNames
        ? `| ${articleData.edited_by[0].english_name}`
        : articleData.edited_by[0].english_name
      : "";

    const GA4Data = {
      event: "custom_dimensions",
      section: `${
        gtmSection === "t20WorldCup2024"
          ? "cricket"
          : gtmSection === "ParisOlympics"
          ? "sports"
          : section || ""
      }`,
      sub_section: `${
        gtmSection === "t20WorldCup2024"
          ? "t20 world cup"
          : gtmSection === "ParisOlympics"
          ? "olympics"
          : subsection || ""
      }`,
      article_id: `${articleData?.story_id ? articleData?.story_id : ""}`,
      page_type: pageProps?.pageData?.isNewsFeed ? "category" : `${page}`,
      pub_date: `${pub_date || ""}`,
      pub_time: `${pub_time || ""}`,
      taboola: `${Object.keys(taboolaList).length > 0 ? "Y" : "N"}`,
      ad_block: "Y",
      author_name: `${authorNames || ""}`,
      by_line: `${byline || ""}`,
      fms: `${fms_autopublished || ""}`,
      player_identifier: `${
        gtmSection === "ParisOlympics" ? "No video" : cd19value || ""
      }`,
      video_identifier: `${
        gtmSection === "ParisOlympics" ? "No video" : cd20value || ""
      }`,
      word_count: `${word_count || ""}`,
      tag: `${dimension16 || ""}`,
      type_of_article:
        pageProps?.pageData?.pageType === "budget" ||
        page === "news-feed" ||
        gtmSection === "t20WorldCup2024" ||
        gtmSection === "ParisOlympics"
          ? "category page"
          : `${dimension15 || ""}`,
      local18_district: `${
        ff_source === "Hyperlocal" ? categoryForGA + "-Local18" : ""
      }`,
      author_type: `${cd7(articleData) || ""}`,
      article_edited_by: `${editedByNames || ""}`,
      video_title: `${articleData?.headline || ""}`,
      local18_video_identifier: `${local18_video ? "Y" : "N"}`,
      video_slot: "",
      video_channel_name: `${channleName || ""}`,
      video_amp_filter:
        page === "news-feed" || gtmSection === "t20WorldCup2024"
          ? "Non AMP"
          : "AMP",
      video_category: "",
      domain: "hindi.news18.com",
      page_url: `${this.props?.pageProps?.pageData?.currentURL || ""}`,
      video_action: "",
    };
    return (
      <>
        {pageProps.pageData && !pageProps.pageData.isAmp && (
          <Head>
            <meta
              name="viewport"
              content="width=device-width,minimum-scale=1,initial-scale=1"
            />
          </Head>
        )}
        <Script id="comscore" strategy="afterInteractive">
          {`var _comscore = _comscore || [];
              _comscore.push({
              c1: "2",
              c2: "6683813",
              options: { enableFirstPartyCookie: "false" }
              });
              (function () {
              var s = document.createElement("script"), el = document
              .getElementsByTagName("script")[0];
              s.async = true;
              s.src = " https://sb.scorecardresearch.com/cs/6683813/beacon.js";
              el.parentNode.insertBefore(s, el);
              })();`}
        </Script>
        <noscript>
          <img
            alt="comscore_image"
            src="https://sb.scorecardresearch.com/p?c1=2&amp;c2=6683813&amp;cv=3.9.1&amp;cj=1"
          />
        </noscript>
        {/* End comScore Tag  */}
        <Script id="googleAnalytics" strategy="afterInteractive">
          {`
            (function (i, s, o, g, r, a, m) {
              i['GoogleAnalyticsObject'] = r;
              (i[r] =
                i[r] ||
                function () {
                  (i[r].q = i[r].q || []).push(arguments);
                }),
                (i[r].l = 1 * new Date());
              (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
              a.async = 1;
              a.src = g;
              m.parentNode.insertBefore(a, m);
            })(
              window,
              document,
              'script',
              'https://www.google-analytics.com/analytics.js',
              'ga'
            );`}
        </Script>
        {/* <Script id="googleAds" strategy="lazyOnload">
          {`
            var PWT = {};
            PWT.jsLoaded = function() {
              window.DFPManager.load();
            }
            setTimeout(() => {
            (function () {
              var purl = window.location.href;
              var url = '//ads.pubmatic.com/AdServer/js/pwt/113941/2060';
              var profileVersionId = '';
              if (purl.indexOf('pwtv=') > 0) {
              var regexp = /pwtv=(.*?)(&|$)/g;
              var matches = regexp.exec(purl);
              if (matches.length >= 2 && matches[1].length > 0) {
              profileVersionId = '/' + matches[1];
              }
              }
              var wtads = document.createElement('script');
              wtads.async = true;
              wtads.type = 'text/javascript';
              wtads.src = url + profileVersionId + '/pwt.js';
              var node = document.getElementsByTagName('script')[0];
              node.parentNode.insertBefore(wtads, node);
              })();
            }, 3000);
          `}
        </Script> */}
        <Script id="googleTagManager" strategy="lazyOnload">
          {`
            (function (w, d, s, l, i) {
              w[l] = w[l] || []; w[l].push(
              { 'gtm.start': new Date().getTime(), event: 'gtm.js' }
              ); var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-PBM75F9');
          `}
        </Script>
        <Script id="ga4_data_layer">
          {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
          'event': 'custom_dimensions',
          'section': '${
            gtmSection === "t20WorldCup2024"
              ? "cricket"
              : gtmSection === "ParisOlympics"
              ? "sports"
              : gtmSection || ""
          }', 
          'sub_section': '${
            gtmSection === "t20WorldCup2024"
              ? "t20 world cup"
              : gtmSection === "ParisOlympics"
              ? "olympics"
              : subsection || ""
          }',
          'article_id': '${articleData?.story_id ? articleData?.story_id : ""}',
          'pub_date': '${pub_date || ""}',
          'pub_time': '${pub_time || ""}',
          'taboola': '${Object.keys(taboolaList).length > 0 ? "Y" : "N"}',
          'ad_block': 'Y',
          'author_name': '${authorNames || ""}',
          'by_line': '${byline || ""}',
          'fms': '${fms_autopublished || ""}',
          'player_identifier': '${
            gtmSection === "ParisOlympics" ? "No video player" : cd19value || ""
          }',
          'video_identifier': '${
            gtmSection === "ParisOlympics" ? "No video" : cd20value || ""
          }',
          'word_count': '${word_count || ""}',
          'tag' : '${dimension16 || ""}',
          'type_of_article': '${
            pageProps?.pageData?.pageType === "budget" ||
            gtmSection === "t20WorldCup2024" ||
            gtmSection === "ParisOlympics"
              ? "category page"
              : dimension15 || ""
          }',
          'local18_district': '${
            ff_source === "Hyperlocal" ? categoryForGA + "-Local18" : ""
          }',
          'author_type': '${cd7(articleData) || ""}',
          'article_edited_by': '${editedByNames}',
          'video_title': '${articleData?.headline || ""}',
          'local18_video_identifier': '${local18_video ? "Y" : "N"}',
          'video_slot': '',
          'video_channel_name': '${
            articleData?.auto_youtube_import?.nw_auto_yt_feed_channel_name || ""
          }',
          'video_amp_filter': 'NON AMP',
          'video_category': '${
            articleData?.categories?.length > 0
              ? articleData?.categories?.map((x) => x.slug).join(",")
              : ""
          }',
          'domain_name': 'hindi.news18.com' 
          });
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4LJXB6XTLN', {
            'groups': 'default',
            'send_page_view' : false,
          });
        `}
        </Script>
        {/* <Script
          src="https://images.news18.com/dlxczavtqcctuei/news18/prod/js/nw18-interstitial.js?v=4"
          strategy="lazyOnload"
        /> */}
        <HindiGlobalContext.Provider
          value={{
            pageData: pageProps,
            pageCommonProps: pageProps.pageCommonProps,
            updatePageProps: this.updatePageProps,
            searchBar: this.state.searchBar,
            setSearchBar: this.handleOnSetSearchBar,
            pageType: this.state.pageType,
            isPopUpOpen: this.state.isPopUpOpen,
            setIsPopUpOpen: this.handleOnSetNotificationPopUp,
            showStates: this.state.showStates,
            handleShowChange: this.handleShowStates,
            isBottomNextPrevOpen: this.state.isBottomNextPrevOpen,
            setBottomNextPrevOpen: () => {
              this.setState({
                isBottomNextPrevOpen: !this.state.isBottomNextPrevOpen,
              });
            },
            isNotificationOnScroll: this.state.isNotificationOnScroll,
            handleNotificatonOnScroll: this.handleNotificatonOnScrolls,
          }}
        >
          <GlobalStore>
            <Component {...pageProps} chartbeat={chartbeat} GA4Data={GA4Data} />
          </GlobalStore>
        </HindiGlobalContext.Provider>
        {/* Bellow code uncommented, because Naveen said to do so - @31st Jan 2023 */}
        {/* <Script strategy="lazyOnload" id="adpush">{`
            setTimeout(() => {
              (function(w, d) {
                    var s = d.createElement('script');
                    s.src = '//cdn.adpushup.com/43392/adpushup.js';
                    s.crossOrigin='anonymous';
                    s.type = 'text/javascript'; s.async = true;
                    (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(s);
                    w.adpushup = w.adpushup || {que:[]};
              })(window, document);
            }, 3000);
		  `}</Script> */}
      </>
    );
  }
}
