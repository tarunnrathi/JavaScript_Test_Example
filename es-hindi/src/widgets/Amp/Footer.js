import React from "react";
import AMPHELPER from "includes/Amp/ampHelper";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import AmpAnalyticsGA4Events from "./AmpAnalyticsGA4Events";

// const { publicRuntimeConfig } = getConfig();
import { customDimensions , getCd1Data} from "includes/article.util";
import StickyMenuItems from "widgets/Common/StickyMenuItems";
import AppInstall from "./AppInstall";

const Footer = (props) => {
  const adPref = props.data.district ? '' : 'article';
  const { isNewLiveBlog = false } = props.data;
  let isDistrict = false;
  if (props.data.articleData && props.data.articleData.ff_source && props.data.articleData.ff_source == "Hyperlocal") {
    isDistrict = true;
  }

  const ampAds = AMPHELPER.get_amp_ad_article(props.data.paramObj?.subCategory, isNewLiveBlog ? "LiveBlog" : props.data.paramObj?.category, adPref, isDistrict);
  const adTarget = AMPHELPER.get_ad_targetting(props.data.district ? props.data.articleList[0] : props.data.articleData, props.data.paramObj, props.pageSeo, "news");
  const { articleData, videoId, videoTitle } = props.data;
  const {
    author_byline = [],
    byline = "",
    agency,
    fms_autopublished = "",
    created_at: creationDate,
    // fms_autopublished: fms_autopublishedD,
    section: sectionD,
    section,
    ff_source = "",
    ff_author_name = "",
    gallery,
    headline,
    relatedArticles,
    story_id,
  } = props.data.district && props.data.articleList[0] ? props.data.articleList[0] : articleData || {};
  const { chartbeat } = props;
  if(props?.pageType === "blogs") {
    chartbeat.section ='hindi.news18.com, hindi.news18.com'+` -${props?.pageType}, hindi.news18.com - ${author_byline?.length>0 ? author_byline[0]?.slug:''}`;
    chartbeat.page = 'article';
  }
  const {
    written_by = [],
    edited_by = [],
    translated_by =[],
    reported_by = [],
    // byline_other = '',
    publish_by =[]
  } = articleData ||{};

  if (author_byline.length) {
    var { roles, author_type } = author_byline[0];
  }
  const categoryForGA = articleData?.["subsection"]?.[0]?.slug || "";
  let cd1='', cd9 = '', cd10 = '', cd11 = '', cd12 = '', cd13 = '', cd17 = ''/*  cd21='', cd22='' */;

  if (creationDate) {
    const [year, month, date] = creationDate.split('-');
    const [day, time] = date.split(' ');

    // const monthMap = {
    //   "january": "01",
    //   "february": "02",
    //   "march": "03",
    //   "april": "04",
    //   "may": "05",
    //   "june": "06",
    //   "july": "07",
    //   "august": "08",
    //   "september": "09",
    //   "october": "10",
    //   "november": "11",
    //   "december": "12"
    // };

    cd10 = agency || "News18 हिंदी Staff";
    cd11 = `${story_id}`;
    cd12 = `${month}/${day}/${year}`;
    cd13 = `${time.trim()}`;
  }
  cd9=publish_by.length > 0 ? publish_by[0]?.english_name + '_' + (publish_by[0]?.ID || articleData?.publish_by[0]?.id) : '';

  let o = {};
  let e = {};
  let p = {};
  let q = {};
  let socialShareAmp = {};
  let showWhatsappBannerOnClick = {};
  let showWhatsappBannerOnView = {};
  let installAppAmp ={};
  let joinWhatsAppChannel ={};
  if (props.isVideo && (articleData.youtubeid || articleData.auto_youtube_import?.nw_auto_yt_feed_id)) {
    o = {
      cd18: 'video'
    };

    e = {
      "video test": {
        on: "visible",
        request: "event",
        vars: {
          eventCategory: "video_impressions_yt_video",
          eventAction: "Impressions",
          eventLabel: `youtube, ${articleData.headline || articleData.display_headline}, ${articleData.headline || articleData.display_headline}`
        },
      },
    };

    p = {
      "event call in video page": {
        on: "visible",
        request: "event",
        vars: {
          eventCategory: "Video_Impression_Video_Youtube",
          eventAction: "Impression",
          eventLabel: `${videoTitle}, ${videoId}, ${props?.cd14value} , ${props.data.articleData?.story_id}`
        },
      },
    };
  }

  socialShareAmp = {
    "click on #kooAmp": {
      on: "click",
      selector: "#kooAmp",
      request: "event",
      vars: {
        eventCategory: "Social_Share",
        eventAction: "Click"
      }
    },
    "click on #twitterAmp": {
      on: "click",
      selector: "#twitterAmp",
      request: "event",
      vars: {
        eventCategory: "Social_Share",
        eventAction: "Click"
      }
    },
    "click on #telegramAmp": {
      on: "click",
      selector: "#telegramAmp",
      request: "event",
      vars: {
        eventCategory: "Social_Share",
        eventAction: "Click"
      }
    },
    "click on #facebookAmp": {
      on: "click",
      selector: "#facebookAmp",
      request: "event",
      vars: {
        eventCategory: "Social_Share",
        eventAction: "Click"
      }
    },
    "click on #whatsappAmp": {
      on: "click",
      selector: "#whatsappAmp",
      request: "event",
      vars: {
        eventCategory: "Social_Share",
        eventAction: "Click"
      }
    },
    "click on #googleAmp": {
      on: "click",
      selector: "#googleAmp",
      request: "event",
      vars: {
        eventCategory: "Social_Share",
        eventAction: "Click"
      }
    },
  };

  installAppAmp ={
    "click on #app-install-icon": {
      on: "click",
      selector: "#app-install-icon",
      request: "event",
      vars: {
        eventCategory: props?.amp_ins_app_cat,
        eventAction: "Click"
      }
    },
    "event call in installApp": {
      on: "visible",
      request: "event",
      vars: {
        eventCategory: "AppInstall_FloatingCTA",
        eventAction: "Impressions",
        eventLabel: `Floating CTA`
      },
    },
    "click on .bottomSheet trigger": {
      on: "click",
      selector: ".bottomSheet",
      request: "event",
      vars: {
        eventCategory:"AppInstall_Bottomsheet",
        eventAction: "Click",
        eventLabel: "bottomsheet"
      }
    },
    "click on .floatingCTA trigger": {
      on: "click",
      selector: "#openApp",
      request: "event",
      vars: {
        eventCategory:"AppInstall_FloatingCTA",
        eventAction: "Click",
        eventLabel: "Floating CTA"
      }
    },
  };
  joinWhatsAppChannel ={
    "click on #amp_header": {
      on: "click",
      selector: "#amp_header",
      request: "event",
      vars: {
        eventCategory: "whatsapp_follow",
        eventAction: "Click"
      }
    }
  };

  if (props?.isHome) {
    showWhatsappBannerOnClick = {
      "click on #staticBanner trigger": {
        on: "click",
        selector: "#whatsappBanner",
        request: "event",
        vars: {
          eventCategory: "WhatsApp Banner",
          eventAction: "Click",
          eventLabel: 'WhatsApp Banner – Homepage'
        },
      },
    };

    showWhatsappBannerOnView = {
      "visible on #staticBanner trigger": {
        on: "visible",
        selector: "#whatsappBanner",
        request: "event",
        vars: {
          eventCategory: "WhatsApp Banner",
          eventAction: "Impression",
          eventLabel: 'WhatsApp Banner – Homepage'
        },
      },
    };
  }

  if (articleData?.local18_video) {
    q = {
      'Js Player event track': {
        on: "visible",
        selector: "#JsPlayer",
        request: "event",
        vars: {
          eventCategory: "Video_Feature_Impression_Article_JSPlayer",
          eventAction: "Impression",
          eventLabel: `${videoTitle}, ${videoId} ,  ${props?.cd14value},  ${props.data.articleData?.story_id}`
        },
      }
    };
  }

  const targetting = {
    targeting: props.data?.pageAds?.setTargetingValues
  };
  cd17 = ff_source == 'Hyperlocal' ? articleData?.["reporter_location"] || categoryForGA + '-Local18' : '';
  let gaDimension8 = "";
  if (fms_autopublished && fms_autopublished != "") {
    gaDimension8 = `FMS | ${fms_autopublished == "true"
      ? "Auto"
      : fms_autopublished == "manual"
        ? "Manual"
        : ""
      } | ${agency || "News18 हिंदी"} | ${section || ""} | Article`;
  }

  let gTitle = props.data && props.data.articleData && props.data.articleData['headline'] && props.data.articleData['headline'].replace(/(<([^>]+)>)/gi, "") || '';
  // let gcd7 = cd7({
  //   ff_source, agency, byline, roles, ff_author_name, author_type
  // });

  //for CD1 calculation
  cd1 = getCd1Data(reported_by,translated_by,written_by,edited_by,articleData);
  let gcd1 = cd1

  //for CD7 calculation
  let agency_ff_source_author_byline="";
  if(agency) {
    agency_ff_source_author_byline = agency;
  }

  const source = ff_source.toLocaleLowerCase() === "hyperlocal"
  ?"Local18"
  :ff_source == "FILE18"
  ? "File18"
  : ff_source.toLowerCase() == "greenhonchos" || ff_source.toLowerCase() == "pepper"
  ? "Digital"
  : ff_source;

  if(source) {
    agency_ff_source_author_byline = agency_ff_source_author_byline
      ? agency_ff_source_author_byline +" | "+ source
      :source;
  }
  if(author_byline?.length>0) {
    agency_ff_source_author_byline = agency_ff_source_author_byline
    ?agency_ff_source_author_byline + " | "+author_byline[0].english_name+"_"+(author_byline[0].ID || articleData?.author_byline[0].id)
    :author_byline[0].english_name+"_"+(author_byline[0].ID || articleData?.author_byline[0].id);
  }

   let gcd7 = agency_ff_source_author_byline;

  // district specific
  if (props.data && props.data.district && props.data.articleList && props.data.articleList.length) {

    author_type = ff_source == 'Hyperlocal' ? 'Local18' : author_type;
    gTitle = headline && headline.replace(/(<([^>]+)>)/gi, "") || '';
    gcd7 = `${agency || 'News18.com'} | ${author_type || 'digital'} | ${byline || 'News18 हिंदी'}${(Array.isArray(roles) ? roles : []).includes('contributor') ? ' | contributor' : ''}`;

  }

  let ga4Values = Object.entries(props.GA4Data || {}).map((i, index) => {
    let [ key, value ] = i;
       return {
        [`event__str_${key}`]: key == "taboolaStatus"? "Y" : value
      }
  }).reduce((p, n) => ({...p, ...n}), {}) || {};

  return (
    <>
      <div className="stkad"> 
        <amp-sticky-ad layout="nodisplay" style={{ height:props?.stickyFooterData.length>0?'100px':'50px'}}>
          <amp-ad
            width={320}
            height={50}
            type="doubleclick"
            data-slot={props.isHome ? '/1039154/NW18_HIND_AMP/NW18_HIND_HOME_AMP/NW18_HIND_HOME_HOME_AMP/NW18_HIND_AMP_HP_FBN_320' :
              props?.isPhotoghallery ? '/1039154/NW18_HIND_AMP/NW18_HIND_PHOTO_AMP/NW18_HIND_PHOTO_AMP_AS/NW18_HIND_PHT_AS_AMP_ROS_FBN_320' :
              props?.isCricketNext ? '/1039154/CRINXT_HIND_AMP/CRINXT_HIND_RANKING_AMP/CRINXT_HIND_RANKING_AMP_AL/CRINXT_HIND_RNKG_AL_AMP_ROS_FBN_320':props?.pageType === "blogs"?"/1039154/NW18_HIND_AMP/NW18_HIND_BLOG_AMP/NW18_HIND_BLOG_AMP_AS/NW18_HIND_BLG_AS_AMP_ROS_FBN_320"
              :ampAds.footerAd}
            data-enable-refresh="30"
            json={props.isHome ? JSON.stringify(targetting || "") : adTarget}
            data-lazy-fetch="true"
				    data-loading-strategy="1"
            data-multi-size-validation="false"
            data-multi-size="320x50,300x50,375x50,360x50"
            rtc-config='{
              "vendors": {
                "openwrap": {
                  "PROFILE_ID" : "2059",
                  "PUB_ID" : "113941"
                },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
              },
              "timeoutMillis": 1000
            }'
            className="adPosition" style={{ bottom: props?.stickyFooterData.length>0?'50px' :'0'}}
          ></amp-ad>
        </amp-sticky-ad>
      </div>

      {/* district specific */}
      {props.data.district && <>
        {!props.data.isNotFound && <div>
          {
            !props.data.district ?
              <>
                <h2 className="newdscrt-morehd">More from Other District</h2>
                <ul className="newdscrt-morelist">
                  {
                    (props.data.moreArticleList || []).map((articleItem) => {
                      const {
                        images: { url: thumbnail } = {},
                        headline,
                        // categories,
                        subCategorySlug,
                      } = articleItem;
                      const urlForm = (articleItem.weburl || articleItem.url)
                        .replace(
                          /(https|http):\/\/(stg|beta)?hindi.news18.com\//,
                          "/"
                        );
                      // .replace(/\/.*\//, "");
                      // urlForm = `/amp/news/${subCategorySlug.href}/${urlForm}`;

                      let image = thumbnail
                        .replace(/http(s)?:\/\/[a-zA-Z\.\-0-9\/]+\/uploads\//, "")
                        .replace("https://images.news18.com/ibnkhabar/uploads/", "");
                      image = `https://images.news18.com/ibnkhabar/uploads/${image}?impolicy=website&width=120&height=96`;
                      return (
                        <li>
                          <a href={`/amp${urlForm}`}>
                            <figure>
                              <amp-img
                                src={image}
                                width="120"
                                height="96"
                                alt={headline}
                              ></amp-img>
                            </figure>
                            <h2>
                              {headline}
                              <span>
                                {subCategorySlug?.hi}
                              </span>
                            </h2>
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
              </>
              : ""
          }
        </div>}
      </>
}
      <AppInstall/>
      <amp-analytics type="googleanalytics">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              vars: {
                account: "UA-156703-3",
              },
              triggers: {
                "default pageview": {
                  on: "visible",
                  request: "pageview",
                  vars: {
                    title:
                      (props.data &&
                        props.data.articleData &&
                        props.data.articleData["headline"] &&
                        props.data.articleData["headline"].replace(
                          /(<([^>]+)>)/gi,
                          ""
                        )) ||
                      "",
                  },
                  extraUrlParams: {
                    cd1,
                    cd7: gcd7,
                    cd8: gaDimension8,
                    cd9,
                    cd10,
                    cd11,
                    cd12,
                    cd13,
                    cd14: props?.cd14value,
                    cd17,
                    ...o,
                    ...customDimensions(articleData),
                    cd18: props?.cd18value,
                    cd19: props?.cd19value,
                    cd20: props?.cd20value,
                    cd22: props?.cd22value,
                    cd21: props?.cd21value
                  },
                },
                "click on #moneycontrolheader trigger": {
                  on: "click",
                  selector: "#moneycontrolheader",
                  request: "event",
                  vars: {
                    eventCategory: "Money Control Header",
                    eventAction: "clicked-money-control-header",
                  },
                },
                "click on #moneycontrolevent trigger": {
                  on: "click",
                  selector: "#moneycontrolevent",
                  request: "event",
                  vars: {
                    eventCategory: "Money Control",
                    eventAction: "clicked-money-control",
                  },
                },

                "click on .districtSelect trigger": {
                  "on": "click",
                  "selector": ".districtSelect",
                  "request": "event",
                  "vars": {
                    "eventAction": "Click"
                  }
                },
                "click on #readMoreAmp trigger": {
                  "on": "click",
                  "selector": "#readMoreAmp",
                  "request": "event",
                  "vars": {
                    "eventCategory": "Read_More_AMP",
                    "eventAction": "Click"
                  }
                },
                "click on .btnvav a trigger": {
                  "on": "click",
                  "selector": ".btnvav a",
                  "request": "event",
                  "vars": {
                    "eventAction": "Click"
                  }
                },
                "click on #iplWidget trigger": {
                  "on": "click",
                  "selector": "#iplWidget",
                  "request": "event",
                  "vars": {
                    "eventCategory": "IPL_Auction_widget",
                    "eventAction": "Click",
                    "eventLabel": "AMP_Home_page"
                  }
                },
                'Amp Youtube Embed': {
                  on: "visible",
                  selector: "#AmpYoutubeEmbed",
                  request: "event",
                  vars: {
                    eventCategory: "Video_Embed_Impression_Article_Youtube",
                    eventAction: "Impression",
                    eventLabel: `${videoTitle}, ${videoId} ,  ${props?.cd14value},  ${props.data.articleData?.story_id}`
                  },
                },
                ...e,
                ...p,
                ...q,
                ...showWhatsappBannerOnClick,
                ...showWhatsappBannerOnView,
                ...socialShareAmp,
                ...installAppAmp,
                ...joinWhatsAppChannel

              },
            }),
          }}
        ></script>
      </amp-analytics>

      <amp-analytics type="comscore">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              vars: {
                c2: "6683813",
              },
              extraUrlParams: {
                comscorekw: "amp",
              },
            }),
          }}
        ></script>
      </amp-analytics>
      {chartbeat ? <amp-analytics type="chartbeat">
        <script type="application/json"
          dangerouslySetInnerHTML=
          {{
            __html: JSON.stringify({
              "vars": {
                "uid": "20831",
                "domain": "news18.com",
                "sections": chartbeat.section || chartbeat.webstoryCat,
                "authors": chartbeat.authorNames,
                "canonicalPath": chartbeat.can,
                "title": gTitle || chartbeat.headline,
                "contentType": `${chartbeat.page} page`,
              }
            }),
          }} />
      </amp-analytics> : null}
      <amp-analytics config="https://www.googletagmanager.com/amp.json?id=GTM-WG9DX66&gtm.url=SOURCE_URL" data-credentials="include">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              vars: {
                section: typeof props.isHome !== "undefined" ? 'home' : props.pageSeo?.cat || '',
                subsection: "",
                keyword: props.pageSeo?.keywords || ''
              }
            })
          }}
        ></script>
      </amp-analytics>
      {/* <amp-install-serviceworker src={`${publicRuntimeConfig.siteUrl}service-worker.js`} data-iframe-src={`${publicRuntimeConfig.siteUrl}dlxczavtqcctuei/news18/prod/sw.html`} layout="nodisplay">
      </amp-install-serviceworker> */}
      <amp-analytics type="googleanalytics" config="https://amp.analytics-debugger.com/ga4.json" data-credentials="include">
        <script type="application/json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "vars": {
              "GA4_MEASUREMENT_ID": "G-4LJXB6XTLN",
              "GA4_ENDPOINT_HOSTNAME": "www.google-analytics.com",
              "DEFAULT_PAGEVIEW_ENABLED": false,
              "GOOGLE_CONSENT_ENABLED": true,
              "WEBVITALS_TRACKING": false,
              "PERFORMANCE_TIMING_TRACKING": false,
              "SEND_DOUBLECLICK_BEACON": false
            },
            "triggers": {
              "custom_pageview": {
                "enabled": true,
                "on": "visible",
                "request": "ga4Event",
                "vars": {
                  "ga4_event_name": "page_view",
                  ...props?.isPhotoghallery && { "title": `Page -1 ${articleData?.display_headline || articleData?.headline}` },
                  // ...props?.isPhotoghallery && { "documentLocation": articleData?.weburl.split(".html")[0] + `-page-1.html` },
                  ...props?.isPhotoghallery && { "documentLocation": publicRuntimeConfig.mainUrl +"amp"+ articleData?.weburl_r},
                },
                "extraUrlParams": {
                  ...ga4Values
                }
              },
              // "byline_agency_cp":{
              //   "on": "click",
              //   "selector": "#byline_agency_cp",
              //   "request": "ga4Event",
              //   "vars": {
              //     "ga4_event_name": "byline_agency_cp"
              //   },
              //   "extraUrlParams": {
              //     ...ga4Values,
              //     "event__str_cta_name":props?.data?.articleData?.agency_full?.hindi || props?.data?.articleData?.agency
              //   }
              // },
              // "author_byline_cp":{
              //   "on": "click",
              //   "selector": "#author_byline_cp",
              //   "request": "ga4Event",
              //   "vars": {
              //     "ga4_event_name": "author_byline_cp"
              //   },
              //   "extraUrlParams": {
              //     ...ga4Values,
              //     "event__str_cta_name":cd1||""
              //   }
              // },
              // "article_hyperlink_cp":{
              //   "on": "click",
              //   "selector": "#article_hyperlink_cp",
              //   "request": "ga4Event",
              //   "vars": {
              //     "ga4_event_name": "article_hyperlink_cp"
              //   },
              //   "extraUrlParams": {
              //     ...ga4Values,
              //   }
              // }
            }
          })
        }}></script>
      </amp-analytics>
      {/* <amp-analytics type="gtag" config="https://www.googletagmanager.com/gtag/js?id=G-4LJXB6XTLN" data-credentials="include">
        <script type="application/json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "vars": {
              gtag_id: "G-4LJXB6XTLN",
              gtag_enable: true
            },
            "triggers": {
              "byline_agency_cp": {
                "selector": "#byline_agency_cp",
                "on": "click",
                "vars": {
                  "event_name": "byline_agency_cp",
                  "event__str_cta_name": props?.data?.articleData?.agency_full?.hindi || props?.data?.articleData?.agency,
                  ...ga4Values,
                }
              }
            }
          })
        }}
        ></script>
      </amp-analytics> */}
      <footer>Copyright 2018 NEWS18.com — All rights reserved. NETWORK 18 SITES<a href="/">Visit Mobile Site</a></footer>
      <AmpAnalyticsGA4Events
        id="article_hyperlink_cp"
        event_name={"article_hyperlink_cp"}
        cta_name={""}
        section={props?.GA4Data?.section || ""}
        subsection={props?.GA4Data?.sub_section || ""}
        article_id={props?.GA4Data?.article_id}
        type_of_article={props?.GA4Data?.type_of_article || ""}
        local18_district={props?.GA4Data?.local18_district || ""}
        domain="https://hindi.news18.com/"
      />
      
      {props?.stickyFooterData?.length > 0 &&
      // <ul className="btnvav">
      //     {props.stickyFooterData.slice(0, 5).map((itm,key) => (<li key={key}><a
      //       title={itm.label}
      //       href={itm.url}
      //     >
      //       <span>
      //         <img
      //           src={itm.imgurl}
      //           alt={itm.label}
      //           width={22}
      //           height={20}
      //         />
      //         {itm.highlight_new === "1" &&
      //           <img
      //             src={URL.GET_NEW_ICON}
      //             alt={"New Blinker Icon"}
      //             width={22}
      //             height={12}
      //           />
      //         }
      //       </span>
      //       {itm.label}
      //     </a></li>))}
      // </ul>
        <StickyMenuItems isAMP={true} menuItems={props?.stickyFooterData} toggeleHandler={``} />
      }
      <style jsx global>{`.stkad amp-sticky-ad{    z-index: 111;}
    
    .adPosition{position:absolute;background-color:#fff;z-index:999;    left: 0;
      right: 0;
      margin: 0 auto;}
    .adPosition .amp-sticky-ad-close-button{top:100px}
      `}
      
      </style>
    </>
  );
};

export default React.memo(Footer);
