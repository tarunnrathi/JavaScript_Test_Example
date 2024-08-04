import React, { memo } from "react";
//import parser from "html-react-parser";
import Head from "next/head";
import { cd7, getCd1Data } from "../../includes/article.util";
import getConfig from "next/config";
import Byline from "components/Common/ByLine";
import dynamic from "next/dynamic";
import { photoGallerydateConversion } from "../../../helper/global";
import { getRelativeURL } from "util/global/Helper";
// import InstallAppIcon from "widgets/Mobile/InstallAppIcon";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import LazyLoad from "react-lazyload";
import LazyLoadImage from "components/Common/CustomImage";

const { publicRuntimeConfig } = getConfig();
const MemoSocialShare = memo(
  dynamic(() => import("../../widgets/Amp/PhotosocialShare"))
);
const MemoBylineAuthor = memo(
  dynamic(() => import("components/Common/BylineAuthor"))
);
const MemoRhsTopStoryPhotoGallery = memo(
  dynamic(() => import("widgets/Common/Responsive/RhsTopStoryPhotoGallery"))
);
const MemoAmpTeamRanking = memo(
  dynamic(() => import("widgets/Common/Responsive/AmpTeamRanking"))
);

const Photogallery = ({ data, GA4Data }) => {
  const {
    articleData,
    urlParam: { gid, pv_candidate },
    pageAds,
    category,
    topStories,
    isCricketNext,
    teamRankingData,
    //currentUrl,
  } = data;

  let {
    headline,
    intro,
    gallery,
    weburl,
    author_byline = [],
    byline = "",
    agency,
    agency_full: agencyFull,
    ff_source = "",
    ff_author_name = "",
    written_by: writtenBy = [],
    translated_by: translatedBy = [],
    reported_by: reportedBy = [],
    edited_by: editedBy = [],
    publish_by = [],
    author,
    author_byline: authorByline = {},
    updated_at,
    breadcrumb,
    isAmp = true,
    disclaimer
  } = articleData;

  const [{ roles = [], author_type } = {}] = author_byline || [];

  // Handle next url
  const nextUrl = weburl.replace(/\.com\//gi, ".com/amp/");
  const targetting = {
    targeting: pageAds.setTargetingValues,
  };

  const gcd1 = getCd1Data(reportedBy, translatedBy, writtenBy, editedBy, articleData);
  const gcd9 = publish_by.length > 0 ? publish_by?.[0]?.english_name + '_' + (publish_by?.[0]?.ID || articleData?.publish_by?.[0]?.id) : '';

  const gcd7 = cd7({
    ff_source,
    agency,
    byline,
    roles,
    ff_author_name,
    author_type,
  });

  if (gid) {
    const dex = Number(gid) - 1;
    if (dex < gallery.length) {
      const target = gallery.find((_, index) => index == dex);
      const g = gallery
        .map((item, index) => {
          if (index === dex) {
            return null;
          }
          return { ...item, dex: index + 1 };
        })
        .filter(Boolean);
      target.dex = dex + 1;
      gallery = [target, ...g];
    }
  }
  const getGalleryAd = (adInd, isFirst) => {
    const tag = adInd === 1 ? "ATF" : "BTF";
    return (
      <div className="ad-container add">
        {tag == "BTF" ? (
          <amp-ad
            width={336}
            height={280}
            type="doubleclick"
            data-slot={`/1039154/NW18_HIND_AMP/NW18_HIND_PHOTO_AMP/NW18_HIND_PHOTO_AMP_AS/NW18_HIND_PHT_AS_AMP_ROS_${tag}_${isFirst ? 320 : 300
              }`}
            data-lazy-fetch="true"
            data-loading-strategy="1"
            data-multi-size-validation="false"
            data-multi-size="300x250"
            rtc-config={JSON.stringify({
              vendors: {
                openwrap: {
                  PROFILE_ID: "2059",
                  PUB_ID: "113941",
                },
                "aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
              },
              timeoutMillis: 1000,
            })}
            json={JSON.stringify(targetting || "")}
          />
        ) : (
          <amp-ad
            width={336}
            height={280}
            type="doubleclick"
            data-slot={`/1039154/NW18_HIND_AMP/NW18_HIND_PHOTO_AMP/NW18_HIND_PHOTO_AMP_AS/NW18_HIND_PHT_AS_AMP_ROS_${tag}_${isFirst ? 320 : 300
              }`}
            data-lazy-fetch="true"
            data-loading-strategy="1"
            data-multi-size-validation="false"
            data-multi-size="300x250"
            rtc-config={JSON.stringify({
              vendors: {
                openwrap: {
                  PROFILE_ID: "2059",
                  PUB_ID: "113941",
                },
                "aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
              },
              timeoutMillis: 1000,
            })}
            json={JSON.stringify(targetting || "")}
          />
        )}
      </div>
    );
  };
  const ga4Values = Object.entries(GA4Data || {}).map((i, index) => {
    let [key, value] = i;
    return {
      [`ep.${key}`]: key == "taboolaStatus" ? "Y" : value
    }
  }).reduce((p, n) => ({ ...p, ...n }), {}) || {};

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={gallery[0]?.img + "?im=Resize,width=450,aspect=fit,type=normal" || ""}
          as="image"
        />
        <meta name="robots" content="max-image-preview:large" />
        <meta
          itemProp="datePublished"
          content={data?.pageSeo?.jsonLdForArticleConsumption?.datePublished}
        />
        <meta
          property="article:published_time"
          content={data?.pageSeo?.jsonLdForArticleConsumption?.datePublished}
        />
        <meta
          property="article:modified_time"
          content={data?.pageSeo?.jsonLdForArticleConsumption?.dateModified}
        />
        <meta
          property="og:updated_time"
          content={data?.pageSeo?.jsonLdForArticleConsumption?.dateModified}
        />
        <meta property="og:category" content={category} />
      </Head>
      {/* <InstallAppIcon category={'APPdownload_Mweb_Photogallery'} label={'Mobile Photogallery'} isAMP={true} /> */}
      <main className="phtcnsmpnwrap">
        <BreadcrumbCommon breadCrumbArray={data.breadCrumbArray} />
        <article>
          <h1 className="newphttophd">{headline}</h1>
          <h2 className="newphttoppara">{intro}</h2>
          <ul className="newphtbyline">
            <li>
              <Byline
                li={true}
                agency={agency}
                agencyFull={agencyFull}
                lastUpdated={`Last Updated: ${photoGallerydateConversion(
                  updated_at
                )}`}
                isAmp={true}
                GA4Data={GA4Data}
              />
            </li>
            <li>
              <MemoBylineAuthor
                authors={[
                  { "Reported by": reportedBy },
                  { "Edited by": editedBy },
                  { "Written by": writtenBy },
                  { "Translated by": translatedBy },
                ]}
                author={author}
                isMobile={true}
                authorByline={authorByline}
                isPhoto={true}
                GA4Data={GA4Data}
              />
            </li>
          </ul>
          <div className="newphtcnsmnbox">
            {getGalleryAd(1, true)}
            {gallery && gallery.length > 0
              && gallery.map((item, index) => {
                //const caption = parser(item ? item.caption : "")
                const caption = item?.caption?.toString()?.replace(/,?\[object Object\],?/gim, "");
                const url =
                  (item.dex || index + 1) == 1
                    ? nextUrl
                    : nextUrl.replace(
                      ".html",
                      `-page-${item.dex || index + 1}.html`
                    );
                //let pageurl = publicRuntimeConfig.mainUrl +"amp"+ articleData?.weburl_r.split(".html")[0] + `-page-${index + 1}.html`
                let pageurl = publicRuntimeConfig.mainUrl + "amp" + articleData?.weburl_r;
                return (
                  <React.Fragment key={`img_cont_${item.dex || index + 1}`}>
                    <div
                      className="img_cont fixed-container"
                      id={`img_cont_${item.dex || index + 1}`}
                      key={`img_cont_${item.dex || index + 1}`}
                    >
                      <div className="img_contrap ">
                        {index == 0 ? (
                          // <amp-img
                          //   className="contain"
                          //   // src={
                          //   //   imageLoader(item?.img, 450, 260, false, true) ||
                          //   //   ""
                          //   // }
                          //   src={item?.img}
                          //   layout="fill"
                          //   alt={caption}
                          //   width={450}
                          //   height={260}
                          // ></amp-img>
                          <LazyLoadImage
                            isAMP={true}
                            src={item?.img + "?im=Resize,width=450,aspect=fit,type=normal"}
                            layout="fill"
                            alt={caption}
                            width={450}
                            height={260}
                            isPolicy={true}
                            isByline={true}
                          />
                        ) : (
                          <LazyLoadImage
                            isAMP={true}
                            src={item?.img}
                            layout="fill"
                            alt={caption}
                            width={450}
                            height={260}
                            isPolicy={true}
                            isByline={true}
                          />
                          // <amp-img
                          //   className="contain"
                          //   // src={
                          //   //   imageLoader(item?.img, 450, 260, false, true) ||
                          //   //   ""
                          //   // }
                          //   src={item?.img + "?im=Resize,width=450,aspect=fit,type=normal"}
                          //   layout="fill"
                          //   alt={caption}
                          //   width={450}
                          //   height={260}
                          // ></amp-img>
                        )}
                        <div className="newphtcount">
                          <span>{index + 1}</span>
                          <span>{gallery.length}</span>
                        </div>
                      </div>
                      <p>{caption}</p>
                      <MemoSocialShare
                        url={url}
                        //currentUrl={getCompleteURL(articleData?.weburl_r,articleData?.weburl)}
                        currentUrl={getRelativeURL(true, articleData?.weburl)}
                        headline={headline}
                      />
                    </div>
                    {/* {ReactHtmlParser(adHtml)} */}
                    {index % 2 == 0 &&
                      index != 0 &&
                      getGalleryAd(index == 2 ? 1 : 0)}

                    {index !== 0 ? (
                      <>
                        <amp-analytics type="googleanalytics">
                          <script
                            type="application/json"
                            dangerouslySetInnerHTML={{
                              __html: JSON.stringify({
                                triggers: {
                                  trackPageview: {
                                    on: "visible",
                                    request: "pageview",
                                    visibilitySpec: {
                                      selector: `#img_cont_${item.dex || index + 1
                                        }`,
                                      visiblePercentageMin: 50,
                                      totalTimeMin: 500,
                                      continuousTimeMin: 200,
                                    },
                                    vars: {
                                      account: "UA-156703-3",
                                      title:
                                        `Page-${item.dex || index + 1
                                        } - ${headline}`,
                                      ampdocUrl: url,
                                      documentLocation: url,
                                      canonicalUrl: nextUrl,
                                    },
                                    extraUrlParams: {
                                      cd1: gcd1,
                                      cd7: gcd7,
                                      cd9: gcd9,
                                      cd21: item?.word_count,
                                      cd22: "Taboola Yes",
                                    },
                                  },
                                },
                              }),
                            }}
                          ></script>
                        </amp-analytics>
                        <amp-analytics>
                          <script
                            type="application/json"
                            dangerouslySetInnerHTML={{
                              __html: JSON.stringify({
                                requests: {
                                  host: "https://sb.scorecardresearch.com",
                                  base: "${host}/p?",
                                  pageview:
                                    "${base}c1=2&c2=${c2}&cs_ucfr=$IF($EQUALS(${consentState}, sufficient), 1)$IF($EQUALS(${consentState}, insufficient), 0)$IF($EQUALS(${consentState}, ), )&cs_amp_consent=${consentState}&cs_pv=${pageViewId}&c12=${clientId(comScore)}&rn=${random}&c8=${title}&c7=${canonicalUrl}&c9=${documentReferrer}&cs_c7amp=${ampdocUrl}",
                                },
                                triggers: {
                                  trackPageview: {
                                    on: "visible",
                                    request: "pageview",
                                    visibilitySpec: {
                                      selector: `#img_cont_${item.dex || index + 1
                                        }`,
                                      visiblePercentageMin: 50,
                                      totalTimeMin: 500,
                                      continuousTimeMin: 200,
                                    },
                                    vars: {
                                      c2: "6683813",
                                      title:
                                        (item.dex || index + 1) == 1
                                          ? headline
                                          : `Page-${item.dex || index + 1
                                          } - ${headline}`,
                                      ampdocUrl: url,
                                      documentLocation: url.replace(
                                        "/amp/",
                                        "/"
                                      ),
                                      canonicalUrl:
                                        (item.dex || index + 1) == 1
                                          ? nextUrl.replace("/amp/", "/")
                                          : nextUrl
                                            .replace("/amp/", "/")
                                            .replace(
                                              ".html",
                                              `-page-${item.dex || index + 1
                                              }.html`
                                            ),
                                    },
                                    extraUrlParams: { comscorekw: "amp" },
                                  },
                                },
                                transport: {
                                  beacon: false,
                                  xhrpost: false,
                                  image: true,
                                },
                              }),
                            }}
                          ></script>
                        </amp-analytics>
                      </>
                    ) : null
                    }
                    {index > 0 && (
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
                              "trackPageview": {
                                "on": "visible",
                                "request": "ga4Event",
                                "visibilitySpec": {
                                  "selector": `#img_cont_${item.dex || index + 1}`,
                                  "visiblePercentageMin": 50,
                                  "totalTimeMin": 500,
                                  "continuousTimeMin": 200
                                },
                                "vars": {
                                  "account": "G-4LJXB6XTLN",
                                  "title": `Page -${index + 1}${item?.caption || articleData?.headline}`,
                                  "documentLocation": `${pageurl}`,
                                  "ga4_event_name": "page_view"
                                },
                                "extraUrlParams": {
                                  ...ga4Values
                                }
                              }
                            },
                          })
                        }}>
                        </script>
                      </amp-analytics>
                    )}
                  </React.Fragment>
                );
              })
            }
          </div>
        </article>
      </main>
      <div className="disclaimerText">
        {disclaimer}
      </div>
      {/* <section className="photo_cont">
        <div className="share-icon">
          <SocialShare />
        </div>
        {getGalleryAd(1, true)}
        {gallery && gallery.length
          ? gallery.map((item, index) => {
              let caption = parser(item ? item.caption : "")
                .toString()
                .replace(/,?\[object Object\],?/gim, "");
              let url =
                (item.dex || index + 1) == 1
                  ? nextUrl
                  : nextUrl.replace(
                      ".html",
                      `-page-${item.dex || index + 1}.html`
                    );
              return (
                <>
                  {index % 2 == 0 &&
                    index != 0 &&
                    getGalleryAd(index == 2 ? 1 : 0)}
                  <div
                    className="img_cont fixed-container"
                    id={`img_cont_${item.dex || index + 1}`}
                  >
                    {index == 0 ? (
                      <amp-img
                        className="contain"
                        src={
                          imageLoader(item?.img, 450, 220, false, true) || ""
                        }
                        layout="fill"
                        alt={caption}
                      ></amp-img>
                    ) : (
                      <amp-img
                        className="contain"
                        src={
                          imageLoader(item?.img, 450, 220, false, true) || ""
                        }
                        layout="fill"
                        alt={caption}
                      ></amp-img>
                    )}

                    <div className="phtcount">
                      <span>{item.dex || index + 1}</span>/ {gallery.length}
                    </div>
                  </div>
                  {ReactHtmlParser(adHtml)}
                  <p className="show-para">{caption}</p>
                  {index != 0 ? (
                    <>
                      <amp-analytics type="googleanalytics">
                        <script
                          type="application/json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                              triggers: {
                                trackPageview: {
                                  on: "visible",
                                  request: "pageview",
                                  visibilitySpec: {
                                    selector: `#img_cont_${
                                      item.dex || index + 1
                                    }`,
                                    visiblePercentageMin: 50,
                                    totalTimeMin: 500,
                                    continuousTimeMin: 200,
                                  },
                                  vars: {
                                    account: "UA-156703-3",
                                    title:
                                      (item.dex || index + 1) == 1
                                        ? headline
                                        : `Page-${
                                            item.dex || index + 1
                                          } - ${headline}`,
                                    ampdocUrl: url,
                                    documentLocation: url,
                                    canonicalUrl: nextUrl,
                                  },
                                  extraUrlParams: {
                                    cd7: gcd7,
                                  },
                                },
                              },
                            }),
                          }}
                        ></script>
                      </amp-analytics>
                      <amp-analytics>
                        <script
                          type="application/json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                              requests: {
                                host: "https://sb.scorecardresearch.com",
                                base: "${host}/p?",
                                pageview:
                                  "${base}c1=2&c2=${c2}&cs_ucfr=$IF($EQUALS(${consentState}, sufficient), 1)$IF($EQUALS(${consentState}, insufficient), 0)$IF($EQUALS(${consentState}, ), )&cs_amp_consent=${consentState}&cs_pv=${pageViewId}&c12=${clientId(comScore)}&rn=${random}&c8=${title}&c7=${canonicalUrl}&c9=${documentReferrer}&cs_c7amp=${ampdocUrl}",
                              },
                              triggers: {
                                trackPageview: {
                                  on: "visible",
                                  request: "pageview",
                                  visibilitySpec: {
                                    selector: `#img_cont_${
                                      item.dex || index + 1
                                    }`,
                                    visiblePercentageMin: 50,
                                    totalTimeMin: 500,
                                    continuousTimeMin: 200,
                                  },
                                  vars: {
                                    c2: "6683813",
                                    title:
                                      (item.dex || index + 1) == 1
                                        ? headline
                                        : `Page-${
                                            item.dex || index + 1
                                          } - ${headline}`,
                                    ampdocUrl: url,
                                    documentLocation: url.replace("/amp/", "/"),
                                    canonicalUrl:
                                      (item.dex || index + 1) == 1
                                        ? nextUrl.replace("/amp/", "/")
                                        : nextUrl
                                            .replace("/amp/", "/")
                                            .replace(
                                              ".html",
                                              `-page-${
                                                item.dex || index + 1
                                              }.html`
                                            ),
                                  },
                                  extraUrlParams: { comscorekw: "amp" },
                                },
                              },
                              transport: {
                                beacon: false,
                                xhrpost: false,
                                image: true,
                              },
                            }),
                          }}
                        ></script>
                      </amp-analytics>
                    </>
                  ) : null}
                </>
              );
            })
          : null}
        <div className="top_heading">
          <strong className="byln txtlgtgrey">
            <span>First Published:{creationDate}</span>
          </strong>
        </div>
      </section> */}
      {pv_candidate && (
        <amp-pixel
          src={
            "https://hindi.news18.com/dlxczavtqcctuei/news18/comscore/pv-candidate.html"
          }
          layout="nodisplay"
        ></amp-pixel>
      )}
      {/* MC Article PROMO Add*/}
      <div className="promo-ad">
        <amp-ad
          width={320}
          height={172}
          type="doubleclick"
          data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_ROS_AMP/NW18_HIND_ROS_AMP/NW18_HIND_AS_AMP_ROS_MCpromo_Footer"
          json={targetting}
          data-multi-size="320x172"
          data-lazy-fetch="true"
          data-loading-strategy="1"
          data-multi-size-validation="false"
        ></amp-ad>
      </div>
      {/* <div className="outbrain_row">
        <amp-embed
          width="100"
          height="100"
          type="outbrain"
          layout="responsive"
          data-widgetIds="MB_6"
        ></amp-embed>
      </div> */}
      {/* <div style={{height:"240px"}}>
        <amp-embed width="100" height="100"
          type="taboola"
          layout="responsive"
          data-publisher='network18media-news18hindi'
          data-mode='thumbnails-mid-article'
          data-placement='Mid Photo Thumbnails AMP'
          data-target_type='mix'
          data-photo='auto'
          data-url=''>
        </amp-embed>
      </div> */}
      {isCricketNext ? (
        <>
          {teamRankingData && teamRankingData?.length > 0 && (
            <MemoAmpTeamRanking teamRankingData={teamRankingData} />
          )}
          <amp-iframe
            width="200"
            id="twitterIframe"
            height="600"
            sandbox="allow-scripts allow-same-origin"
            layout="responsive"
            frameborder="0"
            src="https://images.news18.com/dlxczavtqcctuei/news18/prod/nw18-sports-twitter.html"
          >
            <amp-img
              layout="fill"
              src="https://foo.com/foo.png"
              placeholder
            ></amp-img>
          </amp-iframe>{" "}
        </>
      ) : (
        <aside> <MemoRhsTopStoryPhotoGallery isAmp={true} topStories={topStories} GA4Data={GA4Data} /> </aside>
      )}
      {articleData?.addSavaan && (
        <>
          <div className="amp-jio-savan">
            <amp-iframe
              title="Savaan"
              layout="responsive"
              sandbox="allow-scripts allow-same-origin allow-popups"
              frameborder="0"
              src="https://images.news18.com/static_news18/pix/gujarati/jiosavan.html"
              width="375"
              height="510"
            ></amp-iframe>
          </div>
          <amp-ad
            width={1}
            height={1}
            type="doubleclick"
            data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_AMP_TRACKERS/NW18_HIND_AMP_TRCK_JIO_IMP_1x1"
            data-lazy-fetch="true"
            data-loading-strategy="1"
          >
            <div placeholder>
              <div fallback></div>
            </div>
          </amp-ad>
        </>
      )}
      <amp-embed
        width="100"
        height="100"
        type="taboola"
        layout="responsive"
        data-publisher="network18media-news18hindi"
        data-mode="thumbnails-a"
        data-placement="Below Photo Thumbnails AMP"
        data-target_type="mix"
        data-photo="auto"
        data-loading-strategy="prefer-viewability-over-views"
        data-url=""
      ></amp-embed>
      <style jsx global>{`
        .disclaimerText { padding: 10px; color:#000; font-weight: bold; font-style: italic; }
        .phtcnsmpnwrap {
          background: #212121;
          padding: 10px;
        }
        .phtcnsmpn-brdcrmb {
          width: 100%;
          border-bottom: 1px dotted #5a5a5a;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-weight: normal;
          font-size: 13px;
          color: #949494;
          overflow: scroll;
          padding: 5px 15px;
          background: #212121;
        }
        .phtcnsmpn-brdcrmb a {
          flex-shrink: 0;
          margin: 0px 6px;
          font-size: 13px;
          color: #949494;
          line-height: 24px;
        }
        .phtcnsmpn-brdcrmb a:first-child {
          margin-left: 0px;
        }
        .phtcnsmpn-brdcrmb span,
        .phtcnsmpn-brdcrmb span {
          flex-shrink: 0;
          color: #fff;
          font-size: 13px;
          margin-left: 6px;
          line-height: 24px;
          font-weight: normal;
        }
        .newphttophd {
          color: #ffd800;
          font-size: 22px;
          line-height: 32px;
        }
        .newphttoppara {
          color: #fff;
          font-size: 15px;
          line-height: 24px;
          margin: 5px 0;
          font-weight: normal;
        }
        .newphtbyline {
        }
        .newphtbyline li {
          font-size: 14px;
          color: #909090;
          line-height: 20px;
          padding: 0 10px;
          margin-top: 10px;
          background: #333;
        }
        .newphtbyline li a {
          font-size: 14px;
          color: #909090;
          flex-shrink: 0;
          display: inline-block;
        }
        .newphtbyline li figure {
          background: none;
          display: inline-block;
          padding: 0;
        }

        .newphtbyline li:first-child a:after {
          content: "";
          width: 4px;
          height: 4px;
          background: #909090;
          border-radius: 100%;
          display: inline-block;
          margin: 0 10px;
          position: relative;
          top: -2px;
        }

        .newphtbyline .hilight {
          display: flex;
          align-items: center;
          background: #333333;
          border-radius: 4px;
          height: 34px;
          line-height: 34px;
          padding: 0 10px;
          margin-top: 10px;
          gap: 10px;
        }
        .newphtbyline li a b {
          color: #fff;
        }
        .newphtbyline li a img {
          width: 15px;
          height: 15px;
          margin: ${isAmp ? '' : '8px 15px 0px 15px'} ;
        }
        .img_contrap {
          position: relative;
          height: 275px;
        }

        .newphtcnsmnbox {
          border-bottom: 1px dotted #939393;
          margin: 10px 0 20px 0;
        }
        .newphtcnsmnbox figure {
          width: 100%;
        }
        .newphtcnsmnbox figure img {
          width: 100%;
          border-radius: 0;
        }
        .newphtcnsmnbox p {
          color: #fff;
          font-size: 15px;
          line-height: 26px;
          margin: 10px 0;
          text-align: center;
        }
        .newphtcount {
          position: absolute;
          bottom: 8px;
          left: 8px;
          z-index: 1;
          background: #ef6367 0% 0% no-repeat padding-box;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 2px;
        }
        .newphtcount span {
          width: 22px;
          height: 25px;
          letter-spacing: -0.3px;
          color: #ffffff;
          font-size: 12px;
          line-height: 25px;
          text-align: center;
          font-weight: normal;
          display: block;
          margin: 0 3px;
          border-top: 1px solid #fff;
        }
        .newphtcount span:first-child {
          font-size: 16px;
          font-weight: bold;
          border-top: none;
        }

        .imonomy-ad-container {
          max-height: 70px;
          overflow: hidden;
        }
        .imonomy-amp-frame {
          margin: auto;
          height: 70px;
          width: 320px;
          position: relative;
        }
        .more_photos_cont {
          padding: 20px 16px 20px;
          background: #161616;
          margin-left: -10px;
          margin-right: -10px;
        }
        .more_photos_cont h2 {
          font-size: 22px;
          color: #fff;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .more_two_grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 15px;
        }
        .more_two_grid a {
          display: block;
          background: #fff;
          color: #000;
        }
        .promo-ad {
          text-align: center;
        }
        .add {
          background: #dbdde3;
        }
        .ad-container {
          display: flex;
          margin: 0 -15px;
          justify-content: center;
          padding: 10px 0;
          min-height: 300px;
        }

        .share-icon {
          display: flex;
          justify-content: center;
          padding: 5px 0 15px 0;
        }
        a {
          color: #222;
          font-size: 16px;
          line-height: 1.5;
        }
        .img_cont {
          margin-bottom: 10px;
          position: relative;
          padding: 10px 0px;
        }

        .phtcount {
          top: 15px;
          left: 5px;
          width: 60px;
          height: 30px;
          border-radius: 6px;
          font-size: 13px;
          line-height: 30px;
          position: absolute;
          background: #313131;
          text-align: center;
          color: #fff;
        }

        .phtcount span {
          font-size: 18px;
          font-weight: 700;
        }

        .img_cont:last-of-type {
          margin-bottom: 0;
        }

        .show-para {
          height: auto;
        }
        .show-para {
          color: #fff;
          font-size: 16px;
          line-height: 24px;
          overflow: hidden;
          position: relative;
          padding: 0 10px;
        }
        p {
          margin: 20px 0;
          font-size: 16px;
          line-height: 1.5;
        }
        .aurparehn-scnd {
          text-align: center;
          color: #959595;
          font-size: 12px;
          display: block;
          background: #161616;
          position: relative;
          padding: 5px 0;
          margin: 0 20px;
          width: calc(100% - 40px);
          border: none;
        }
        .aurparehn-scnd:before {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          background: #565656;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          left: 0;
        }
        .aurparehn-scnd button,
        .aurparehn-scnd span {
          background: #161616;
          display: inline-block;
          z-index: 2;
          position: relative;
          padding: 0 10px;
          color: #959595;
        }

        .aurparehn-scnd button {
          border: none;
        }
        .page_tag a {
          line-height: 26px;
          padding: 2px 15px;
          border-radius: 5px;
          background: #fff;
          font-size: 14px;
          color: #888;
          border: 1px solid #ccc;
          margin: 0 10px 10px 0;
          display: inline-block;
          text-decoration: none;
        }
        .page_tag {
          width: 100%;
          padding: 0 15px;
          margin-top: 10px;
        }
        .fixed-container {
          position: relative;
          width: 100%;
        }
        amp-img.contain img {
          object-fit: contain;
        }
        .contain {
          background: #000;
        }
        // breadcrumb

        .social_share_sec {
          margin-bottom: 15px;
        }
        ul.art_social_share {
          font-family: "Mukta", sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        ul.art_social_share li {
          color: #6b6b6b;
          font-size: 14px;
          margin-left: 15px;
          text-transform: uppercase;
          line-height: 0;
          background-color: #ccc;
        }
        ul.art_social_share li:first-child {
          margin-left: 0px;
        }

        .spriteshare {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          width: 40px;
          height: 40px;
          display: block;
        }
        .spriteshare.art-facebook-icon {
          background-position: -97px -4px;
        }
        .spriteshare.art-twitter-icon {
          background-position: -139px -4px;
        }
        .spriteshare.art-linkedin-icon {
          background-position: -181px -4px;
        }
        .spriteshare.art-whatsapp-icon {
          background-position: -9px -113px;
        }
        .spriteshare.art-telegram-icon {
          background-position: -226px -4px;
        }
        .spriteshare.art-email-icon {
          background-position: -9px -162px;
        }

        #twitterIframe {
          height: 600px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default Photogallery;
