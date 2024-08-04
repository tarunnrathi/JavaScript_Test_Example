import React from "react";
import parser from "html-react-parser";
import Head from "next/head";
import getConfig from "next/config";
import Byline from "components/Common/ByLine";
import { photoGallerydateConversion } from "../../../../helper/global";
const { publicRuntimeConfig } = getConfig();
import LazyLoadImage from "components/Common/CustomImage";

const PhotoStory =({ data }) => {
    const {
        articleData,
        urlParam: { gid, pv_candidate },
        pageAds,
    } = data;
    const {
        category,
        brdSlug = "",
        currentUrl,
    } = data || {};
    let {
        headline,        
        agency,
        agency_full: agencyFull,            
        weburl = "",       
        story_id: storyId,        
        images,
        orderbyinfographic,
        updated_at,
        created_at,
    } = articleData;
    let {gallery} = articleData;
    gallery = orderbyinfographic === "DESC" ? gallery?.reverse():gallery;
    const nextUrl = weburl.replace(/\.com\//gi, ".com/amp/");
    let adInd = 0;
    const publishedBy = articleData["publish_by"]?.[0]?.["english_name"] || "";
    const targetting = {
        targeting: pageAds.setTargetingValues,
    };
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
    const galleryCount = gallery?.length;
    const whatsappLink = "https://web.whatsapp.com/send?text=" + headline + "-" + currentUrl;
    const facebookLink =
        "https://www.facebook.com/sharer.php?u=" + currentUrl + "&t=" + headline;
    const telegramLink =
        "https://telegram.me/share/url?url=" + headline + "-" + currentUrl;
    const twitterLink =
        "https://twitter.com/share?text=" + headline + "&url=" + currentUrl;
    const linkedinLink =
        "https://www.linkedin.com/shareArticle/?mini=true&url=" + currentUrl;

        const createMarkup=() => {
            return {
              __html: `
              <li><a id="whatsappsharee" class="for-whatsapp" href="${whatsappLink}" target="_blank"><span class="spriteshare art-whatsapp-icon"></span></a></li>
              <li on="tap:AMP.setState({visible: !visible})" role="button" tabindex="0"><span class="for-moreshr" ></span></li>
              <div [class]="visible ? 'show' : 'hide'" class="hide">
                <li><a id="facebooksharee" href="${facebookLink}" target="_blank"><span class="spriteshare art-facebook-icon"></span></a></li>
                <li><a id="telegramsharee" href="${telegramLink}" target="_blank"><span class="spriteshare art-telegram-icon"></span></a></li>
                <li><a id="twittersharee" href="${twitterLink}" target="_blank"><span class="spriteshare art-twitter-icon"></span></a></li>
                <li><a id="linkedinsharee" href="${linkedinLink}" target="_blank"><span class="spriteshare art-linkedin-icon"></span></a></li>	
              </div>
            `,
            };
        };

        const getGalleryAd = (adInd, isFirst) => {
            const tag = adInd === 1 ? "ATF" : "BTF";
            return (
              <div className="ad-container add" style={{ height: '80px' }}>
                <amp-ad
                  width={320}
                  height={50}
                  type="doubleclick"
                  data-slot={`/1039154/NW18_HIND_AMP/NW18_HIND_PHOTO_AMP/NW18_HIND_PHOTO_STORIES_AMP_AS/NW18_HIND_PHT_STRYS_AS_AMP_ROS_ATF_320`}
                  data-enable-refresh="30"
                  data-loading-strategy="prefer-viewability-over-views"
                  data-multi-size-validation="false"
                  data-multi-size="320x50"
                  rtc-config={JSON.stringify({
                    vendors: {
                      openwrap: {
                        PROFILE_ID: "2059",
                        PUB_ID: "113941",
                      },
                    },
                    timeoutMillis: 1000,
                  })}
                  json={JSON.stringify(targetting || "")}
                />
              </div>
            );
        };        
        return (
            <>
              <Head>
              <link
                rel="preload"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
                href="https://images.news18.com/ibnkhabar/uploads/assests/fonts/mukta-v12-latin-regular.woff2"
              />
              </Head>
              {getGalleryAd(1, true)}
              <div className="breadcum">
                {category && category != "" && (
                  <>
                    <a href="/">Home /</a>
                    <a href="/photogallery/">Photo Story /</a>
                    <a href={`/photogallery/${category}`}>{category}</a>
                    {" / "}
                    <h2>{brdSlug}</h2>
                  </>
                )}
              </div>
              <h1 className="phtstrhdmb phtstrhdmb-stick">{headline}</h1>
              {images.url !== "" && (
                <div className="photowithdetail">
                  <figure className="featureHeight">
                    {/* <amp-img
                      src={(images?.url || publicRuntimeConfig?.
                        THUMBNAIL_IMAGE_PLACEHOLDER_PATH)+'?im=Resize,width=420,aspect=fit,type=normal'}
                      alt={images.caption || "Images"}
                      width="360"
                      height="300"
                      layout="responsive"
                    ></amp-img> */}
                    <LazyLoadImage
                      src={images?.url}
                      width={360}
                      height={300}
                      alt={images.caption || "Images"}
                      title={images.caption || "Images"}
                      isPolicy={false}
                      isAMP={true}
                    />
                  </figure>
                </div>
              )}
              {/* Full photo story start  */}
              <ul className="phtstrslidemb">
                {gallery?.length >0 
                  && gallery.map((item, ind) => {
                      const galleryNo = ind + 1,
                        showAd = galleryNo !== 1 && galleryNo % 2;
                      showAd && adInd++;
                      const caption = parser(item.caption);
                      const url = (ind + 1) == 1 ? nextUrl : nextUrl.replace(".html", `-page-${(ind + 1)}.html`);
                      return (
                          <li key={galleryNo}>
                            <div className="photowithdetail">
                              <h2>
                                {/* {orderbyinfographic == "DESC"
                                  ? galleryCount - ind
                                  : galleryNo}{" "} */}
                                  {ind+1}
                                . {item.alt}
                              </h2>
                              <figure>
                                {/* <amp-img
                                  src={(item.img || publicRuntimeConfig?.
                                    THUMBNAIL_IMAGE_PLACEHOLDER_PATH)+'?im=Resize,width=420,aspect=fit,type=normal'}
                                  alt={item.alt}
                                  width="360"
                                  height="370"
                                  id={`img_cont_${ind + 1}`}
                                  layout="responsive"
                                ></amp-img> */}
                                <LazyLoadImage
                                  src={item.img}
                                  width={360}
                                  height={370}
                                  alt={item.alt || "Images"}
                                  title={item.alt || "Images"}
                                  isPolicy={false}
                                  isAMP={true}
                                />
                                <h3>{item.dataTitle}</h3>
                              </figure>
                              <p>{caption}</p>
                            </div>
                            {ind === 0
                            ?
                              <div className="ad-container add">
                                <amp-ad
                                  width={336}
                                  height={280}
                                  type="doubleclick"
                                  data-loading-strategy="prefer-viewability-over-views"
                                  data-multi-size-validation="false"
                                  data-slot={`/1039154/NW18_HIND_AMP/NW18_HIND_PHOTO_AMP/NW18_HIND_PHOTO_STORIES_AMP_AS/NW18_HIND_PHT_STRYS_AS_AMP_ROS_ATF_300`}
                                  data-multi-size="300x250"
                                  json={JSON.stringify(targetting || "")}
                                  rtc-config='{
                                    "vendors": {
                                      "openwrap": {
                                      "PROFILE_ID" : "2059",
                                      "PUB_ID" : "113941"
                                      }
                                    },
                                    "timeoutMillis": 1000
                                  }'
                                ></amp-ad>
                              </div>
                            :
                            <div className="ad-container add">
                                <amp-ad
                                width={300}
                                height={250}
                                type="doubleclick"
                                data-loading-strategy="prefer-viewability-over-views"
                                data-multi-size-validation="false"
                                data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_PHOTO_AMP/NW18_HIND_PHOTO_STORIES_AMP_AS/NW18_HIND_PHT_STRYS_AS_AMP_ROS_BTF_300"
                                data-multi-size="336x280"
                                json={JSON.stringify(targetting || "")}
                                rtc-config='{
                                                "vendors": {
                                                "openwrap": {
                                                    "PROFILE_ID" : "2059",
                                                    "PUB_ID" : "113941"
                                                }
                                                },
                                                "timeoutMillis": 1000
                                            }'
                                ></amp-ad>
                            </div>
                            }
                            {/* {ind != 0 ? (
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
                                                ind + 1
                                              }`,
                                              visiblePercentageMin: 50,
                                              totalTimeMin: 500,
                                              continuousTimeMin: 200,
                                            },
                                            vars: {
                                              account: "UA-156703-3",
                                              title:
                                                (ind + 1) == 1
                                                  ? headline
                                                  : `Page-${
                                                      ind + 1
                                                    } - ${headline}`,
                                              ampdocUrl: url,
                                              documentLocation: url,
                                              canonicalUrl: nextUrl,
                                            },
                                            // extraUrlParams: {
                                            //   cd7: gcd7,
                                            // },
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
                                                ind + 1
                                              }`,
                                              visiblePercentageMin: 50,
                                              totalTimeMin: 500,
                                              continuousTimeMin: 200,
                                            },
                                            vars: {
                                              c2: "6683813",
                                              title:
                                                (ind + 1) == 1
                                                  ? headline
                                                  : `Page-${
                                                      ind + 1
                                                    } - ${headline}`,
                                              ampdocUrl: url,
                                              documentLocation: url.replace(
                                                "/amp/",
                                                "/"
                                              ),
                                              canonicalUrl:
                                                (ind + 1) == 1
                                                  ? nextUrl.replace("/amp/", "/")
                                                  : nextUrl
                                                      .replace("/amp/", "/")
                                                      .replace(
                                                        ".html",
                                                        `-page-${
                                                          ind + 1
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
                            ) : null} */}
                          </li>
                      );
                    })
                }
              </ul>
              <ul className="phtstrshr" dangerouslySetInnerHTML={createMarkup()} />
              <ul className="phtstrtupdt">
                <Byline agency={agency} agencyFull={agencyFull} storyId={storyId} />
                <li>
                  LAST UPDATED :{" "}
                    <span>
                        {updated_at
                        ?photoGallerydateConversion(updated_at)
                        :photoGallerydateConversion(created_at)
                        }
                    </span>
                </li>
                <li className="forauthr">
                  <a href="#">
                    <amp-img
                      src="https://images.news18.com/ibnkhabar/uploads/2019/09/byeline-editor.jpg"
                      alt="Editor default picture"
                      title="Editor default picture"
                      width="14px"
                      height="13px"
                    ></amp-img>
                  </a>{" "}
                  PUBLISHED BY : <a href="#">{publishedBy}</a>
                </li>
              </ul>              
              <ul className="phtstrtupdt nbdr">
                <li>
                  • FIRST PUBLISHED :{" "}
                    <span>
                        {updated_at
                            ?photoGallerydateConversion(updated_at)
                            :photoGallerydateConversion(created_at)
                        }
                    </span>
                </li>
              </ul>
               <div className="outbrain_rows">
                <amp-embed
                  data-loading-strategy="prefer-viewability-over-views"
                  data-lazy-fetch="true"
                  width="100"
                  height="100"
                  type="taboola"
                  layout="responsive"
                  data-publisher="network18media-news18hindi"
                  data-mode="thumbnails-a"
                  data-placement="Below Article Thumbnails AMP"
                  data-target_type="mix"
                  data-article="auto"
                  data-url=""
                ></amp-embed>
              </div>
              <style jsx global>{`
                .show {
                  display: block;
                }
                .hide {
                  display: none;
                }        
                .brdcrmb {
                  font-size: 11px;
                  color: #757575;
                  text-transform: uppercase;
                  line-height: 18px;
                  position: relative;
                  padding: 10px 16px;
                }
                .brdcrmb a {
                  padding: 0 5px 0 0;
                  color: #757575;
                  font-weight: 400;
                }
                .brdcrmb h2 {
                  color: #757575;
                  font-size: 11px;
                  font-weight: 400;
                }
                .imonomy-amp-frame[height="100"] {
                  display: block;
                  width: 320px;
                  position: absolute;
                }
                .imonomy-amp-frame[style="height: 100px;"] {
                  display: block;
                  width: 320px;
                  position: absolute;
                }
                .imonomy-amp-frame[height="150"] {
                  margin: auto;
                  height: 70px;
                  width: 320px;
                  position: relative;
                }
                .imonomy-amp-frame[height="100"] {
                  margin: auto;
                  height: 70px;
                  width: 320px;
                  position: relative;
                }
                .imonomy-amp-frame[height="50"] {
                  margin: auto;
                  height: 70px;
                  width: 320px;
                  position: relative;
                }
                .imonomy-ad-container {
                  max-height: 70px;
                  overflow: hidden;
                }
                body {
                  font-family: noto_sans_devanagariregular, sans-serif;
                }
                .sponser-new-header {
                  position: sticky;
                  width: 100%;
                  top: 0;
                  z-index: 99999;
                  height: 90px;
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
                  height:280px;
                  overflow:hidden;
                  align-items: center;
                }
                .ad-container_first {
                  display: flex;
                  margin: 0 -15px;
                  justify-content: center;
                  align-items: center; 
                }
                .ad-container {
                  display: flex;
                  margin: 0 -15px;
                  justify-content: center;
                  padding: 15px 0;
                  min-height: 300px;              
                }
                .custcsss {
                  margin: 0;
                  padding: 0;
                  background: #000;
                }
                .top_heading {
                  padding: 12px 16px;
                  border-bottom: 1px solid #454545;
                }
                .top_heading strong {
                  font-weight: 400;
                  color: #959595;
                  font-size: 10px;
                  line-height: 1.4;
                  text-transform: uppercase;
                }
                .top_heading h1 {
                  font-size: 22px;
                  color: #303030;
                  font-weight: 700;
                  margin: 8px 0;
                  line-height: 1.5;
                }
                .intro_ph {
                  font-size: 16px;
                  font-weight: 400;
                }
                .share-icon {
                  display: flex;
                  justify-content: center;
                  padding: 5px 0;
                }
                .share_icon {
                  border: none;
                  margin-bottom: 0;
                }
                a {
                  color: #171e8a;
                  font-size: 16px;
                  line-height: 1.5;
                }
                .img_cont {
                  margin-bottom: 10px;
                  position: relative;
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
                .img_cont {
                  padding: 10px 0px;
                }
        
                .show-para {
                  font-size: 15px;
                  padding: 0 15px;
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
                  padding: 0 16px;
                  border-radius: 5px;
                  background: #fff;
                  font-size: 11px;
                  color: #828282;
                  border: 1px solid #828282;
                  margin: 0 14px 14px 0;
                  display: inline-block;
                  text-decoration: none;
                }
                .page_tag {
                  width: 100%;
                  padding: 0 15px;
                  margin-top: 10px;
                }
                .author {
                  margin: 10px 16px;
                }
                .fixed-container {
                  position: relative;
                  width: 100%;
                  height: 450px;
                }
                amp-img.contain img {
                  object-fit: contain;
                }
                .contain {
                  background: #000;
                }
        
                body {
                  margin: auto;
                  font-family: "Mukta", sans-serif;
                }
                h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                p,
                ul,
                table,
                figure {
                  margin: 0;
                  padding: 0;
                }
                li {
                  list-style: none;
                }
                a {
                  text-decoration: none;
                }
                a img {
                  border: none;
                }
                * {
                  box-sizing: border-box;
                }
                html,
                body {
                  height: 100%;
                }
                .mblhdr {
                  line-height: 0;
                }
                .topmblstkbnr {
                  line-height: 0;
                  display: flex;
                  justify-content: center;
                  padding: 5px;
                  background: #f5f5f5;
                  border-bottom: 1px solid #e4e4e4;
                  position: sticky;
                  top: 0;
                  z-index: 999;
                }
                .phtstrhdmb {
                  color: #001d42;
                  font-size: 28px;
                  line-height: 32px;
                  padding: 10px 15px;
                  position: sticky;
                  top: 34px;
                  z-index: 1;
                }
                .phtstrhdmb.phtstrhdmb-stick {
                  line-height: 32px;
                  background: #ebebeb;
                  font-size: 20px;
                  padding: 0 15px;
                  display: block;
                }
                .phtstrslidemb {
                  overflow: hidden;
                }
                .phtstrslidemb.phtstrslidemb-stick .slick-list {
                  position: relative;
                  top: 50px;
                }
                .phtstrslidemb li {
                }
                .phtstrslidemb li img {
                  width: 100%;
                }
                .phtstrslidemb .slick-arrow {
                  display: none;
                }
                .photowithdetail {
                  padding: 15px;
                }
                .photowithdetail h2 {
                  color: #e1261d;
                  font-size: 20px;
                  line-height: 28px;
                  margin-bottom: 12px;
                }
                .photowithdetail figure {
                  line-height: 0;
                  overflow: hidden;
                  position: relative;
                  margin: 0 -15px 10px -15px;
                  height: auto;
                }
                .photowithdetail figure img {
                  width: 100%;
                }
                .photowithdetail figure h3 {
                  position: absolute;
                  background: transparent linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat padding-box;
                  line-height: 20px;
                  font-size: 14px;
                  bottom: 0px;
                  left: 0px;
                  right: 0px;
                  display: flex;
                  align-items: flex-end;
                  justify-content: center;
                  color: #fff;
                  text-align: center;
                  padding: 40px 10px 10px 10px;
                }
                .photowithdetail p {
                  font-size: 16px;
                  line-height: 26px;
                  color: #404040;
                  overflow: hidden;
                  position: relative;
                }
                .phtstrslidemb li:first-child .photowithdetail {
                  border: none;
                }
                // .phtstrslidemb li:first-child .photowithdetail h2{color: #001D42; font-size: 28px; line-height: 32px;padding:0;}
                .phtstrslidemb li:first-child .photowithdetail p {
                  display: block;
                }
                .phtstrshr {
                  width: 40px;
                  background: #52ba63 0% 0% no-repeat padding-box;
                  box-shadow: 0px 3px 6px #00000066;
                  border: 1px solid #ffffff;
                  border-radius: 6px 0px 0px 6px;
                  position: fixed;
                  top: 40%;
                  right: 0px;
                  z-index: 2;
                  overflow: hidden;
                }
                .phtstrshr li {
                }
                .phtstrshr li:nth-child(1),
                .phtstrshr li:nth-child(2) {
                  display: block;
                }
                .phtstrshr.adclsshowall li {
                  display: block;
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
                .for-moreshr {
                  background: #343434;
                  width: 40px;
                  height: 40px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                }
                .for-moreshr:before {
                  content: "";
                  position: absolute;
                  display: block;
                  width: 16px;
                  height: 18px;
                  background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/shareiconnew_1658309142.svg)
                    0 0 no-repeat;
                }
                .for-moreshr:after {
                  content: "-";
                  position: absolute;
                  display: none;
                }
                .for-moreshr.adclsmoreshr {
                }
                .for-moreshr.adclsmoreshr:before {
                  display: none;
                }
                .for-moreshr.adclsmoreshr:after {
                  display: block;
                  width: 12px;
                  height: 2px;
                  background: #fff;
                }
                .moretext {
                  display: none;
                  position: fixed;
                  background: rgba(0, 0, 0, 0.9);
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  z-index: 9999;
                }
                .moretext div {
                }
                .moretext div h4 {
                  color: #e1c31d;
                  font-size: 20px;
                  line-height: 28px;
                  margin-bottom: 5px;
                }
                .moretext div span {
                  color: #fff;
                  font-size: 18px;
                  line-height: 28px;
                }
                .clickformoretext {
                  position: absolute;
                  bottom: 0;
                  background: #fff;
                  right: 0;
                  color: #e1261d;
                  font-size: 16px;
                  font-weight: bold;
                  padding: 0 5px;
                  line-height: 30px;
                }
                .moretext.adclsmoretext {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 15px;
                }
                .moretextclose {
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 40px;
                  height: 40px;
                  line-height: 45px;
                  color: #fff;
                  display: block;
                  text-align: center;
                  font-size: 18px;
                }
                body.adclsbody {
                  overflow: hidden;
                }
                .mblftr {
                  background: #f5f5f5;
                  padding: 5px 0;
                  display: flex;
                  justify-content: center;
                  position: sticky;
                  bottom: 0;
                }
                .phtstrtupdt {
                  padding: 15px;
                  border-top: 3px solid #d3d3d3;
                }
                .phtstrtupdt.nbdr {
                  border-top: none;
                  padding-top: 0;
                  border-bottom: 5px solid #d3d3d3;
                }
                .phtstrtupdt li {
                  color: #454545;
                  font-size: 13px;
                  font-weight: bold;
                  text-transform: uppercase;
                  line-height: 22px;
                }
                .phtstrtupdt li a {
                  color: #e1261d;
                  font-weight: bold;
                }
                .phtstrtupdt li span {
                  font-weight: normal;
                  color: #949494;
                }
                .phtstrtupdt li.forauthr {
                  font-weight: normal;
                  border-top: 1px dashed #d3d3d3;
                  border-bottom: 1px dashed #d3d3d3;
                  padding: 10px 0;
                  margin-top: 10px;
                }
                .phtstrtupdt li.forauthr img {
                  margin-right: 5px;
                  position: relative;
                  top: 1px;
                }
                .phtstrtupdt li.forauthr a {
                  font-size: 15px;
                }
                .phtstrtags {
                  border-bottom: 1px dashed #d3d3d3;
                  margin: 0 15px 15px 15px;
                  padding-bottom: 10px;
                }
                .phtstrtags h3 {
                  color: #404040;
                  font-size: 16px;
                  line-height: 28px;
                }
                .phtstrtags div a {
                  color: #0076bf;
                  font-size: 16px;
                  line-height: 28px;
                  text-decoration: underline;
                  margin-right: 10px;
                }
                footer {
                  display: none;
                }
                .NextGalleryBtn {
                  display: none;
                }
                /* devanagari start*/
                @font-face {font-family:'Mukta';font-style:normal;font-weight:400;font-display:swap;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
                @font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
                /* devanagari end*/
                /* latin start*/
                @font-face {font-family: 'Mukta';font-style: normal;font-weight: 400;src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
                @font-face {font-family: 'Mukta';font-style: normal;font-weight: 700;src: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
                /* latin end*/
              `}</style>
            </>
          );

};
export default PhotoStory;
