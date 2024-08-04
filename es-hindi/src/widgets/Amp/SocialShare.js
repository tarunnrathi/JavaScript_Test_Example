import React from "react";
import AmpAnalyticsGA4Events from "./AmpAnalyticsGA4Events";
import { additionalText } from "includes/_app.util";

const SocialShare = (props) => {
  const headline = encodeURI(props.headline);
  const url = props?.articleData?.weburl || props?.url||"https://hindi.news18.com/amp/";
  return (
    <>
      <div className="social_share_sec">
        <ul className="art_social_share">
          {["whatsapp", "facebook", "telegram", "twitter"].map(
            (item, key) => {
              if (item == "facebook") {
                return (
                  <li key={"social_media_share"+key} className="social_media_share" id={"social_media_share"+key}>
                    <amp-social-share
                      data-param-app_id="561222041954546"
                      id="facebookAmp"
                      data-vars-event-label={`${props.headline}" "${additionalText}`}
                      data-param-text= {`${props.headline}" - News18 हिंदी - "${url}\n\n ${additionalText}`}  
                      type={item}
                      className="ampshareicon"
                      aria-label={`Share on ${item.toUpperCase()}`}
                      height="40"
                      width="40"
                    ></amp-social-share>
                    <AmpAnalyticsGA4Events
                    id={"social_media_share"+key}
                    event_name={"social_media_share"}
                    cta_name={item}
                    section={props?.GA4Data?.section || ""}
                    subsection={props?.GA4Data?.sub_section || ""}
                    article_id={props?.GA4Data?.article_id}
                    type_of_article={props?.GA4Data?.type_of_article || ""}
                    local18_district={props?.GA4Data?.local18_district || ""}
                    domain="https://hindi.news18.com/"
                  />
                  </li>
                );
              }
              if (item == "telegram") {
                return (
                  <li key={"social_media_share"+key} className="social_media_share" id={"social_media_share"+key}>
                    <amp-social-share
                      type="telegram"
                      aria-label={`Share on Telegram`}
                      id="telegramAmp"
                      data-vars-event-label={props.headline}
                      data-share-endpoint="https://telegram.me/share/url?url="
                      data-param-text= {`${props.headline}\n\n ${additionalText}`}  
                      data-param-url="CANONICAL_URL"
                      height="40"
                      width="40"
                    ></amp-social-share>
                    <AmpAnalyticsGA4Events
                     id={"social_media_share"+key}
                    event_name={"social_media_share"}
                    cta_name={item}
                    section={props?.GA4Data?.section || ""}
                    subsection={props?.GA4Data?.sub_section || ""}
                    article_id={props?.GA4Data?.article_id}
                    type_of_article={props?.GA4Data?.type_of_article || ""}
                    local18_district={props?.GA4Data?.local18_district || ""}
                    domain="https://hindi.news18.com/"
                  />
                  </li>
                );
              }
              // if (item == "koo") {
              //   return (
              //     <li key={key}>
              //       <amp-social-share
              //         type="koo"
              //         id="kooAmp"
              //         aria-label={`Share on Koo`}
              //         data-vars-event-label={props.headline}
              //         data-share-endpoint="https://kooapp.com/create?title=TITLE&link=CANONICAL_URL&language=hi&handle=News18Hindi&utm_source=News18Hindi&utm_campaign=News18Hindi"
              //         data-param-text="TITLE - CANONICAL_URL"
              //         data-param-url="CANONICAL_URL"
              //         height="40"
              //         width="40"
              //       ></amp-social-share>
              //     </li>
              //   );
              // }
              return (
                <li key={"SocialShare"+key} className="social_media_share" id={"social_media_share"+key}>
                  <amp-social-share
                      data-vars-event-label={props.headline}
                    type={item}
                    id={`${item}Amp`}
                    className="ampshareicon"
                    aria-label={`Share on ${item.toUpperCase()}`}
                    height="40"
                    width="40"
                    data-param-text= {`${props.headline}" - News18 हिंदी - "${url}\n\n ${additionalText}`}  
                  ></amp-social-share>
                  <AmpAnalyticsGA4Events
                    id={"social_media_share"+key}
                    event_name={"social_media_share"}
                    cta_name={item}
                    section={props?.GA4Data?.section || ""}
                    subsection={props?.GA4Data?.sub_section || ""}
                    article_id={props?.GA4Data?.article_id}
                    type_of_article={props?.GA4Data?.type_of_article || ""}
                    local18_district={props?.GA4Data?.local18_district || ""}
                    domain="https://hindi.news18.com/"
                  />
                </li>
              );
            }
          )}
          <li key={"SocialShare"}>
            <div className="follow_us">
              <div className="fl_txt">Follow us on</div>
              <a
              id="googleAmp"
               data-vars-event-label={props.headline}
                href="https://news.google.com/publications/CAAqBwgKML6x9wowu8nWAg"
                className="gn_icon"
              ></a>
              <AmpAnalyticsGA4Events
                id="googleAmp"
                event_name={"follow_g_news"}
                cta_name={"Follow us on"}
                section={props?.GA4Data?.section || ""}
                subsection={props?.GA4Data?.sub_section || ""}
                article_id={props?.GA4Data?.article_id}
                type_of_article={props?.GA4Data?.type_of_article || ""}
                local18_district={props?.GA4Data?.local18_district || ""}
                domain="https://hindi.news18.com/"
              />
            </div>
          </li>
        </ul>
      </div>
      <style jsx global>{`
        amp-social-share {
          width: 40px;
          height: 40px;
          display: block;
          margin: 0;
        }

        .art_social_share {
          display: flex;
          justify-content: space-between;
        }
        .amp-social-share-facebook {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
          background-position: -97px -4px;

        }
        .amp-social-share-twitter {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
          background-position: -139px -4px;
        }
        .amp-social-share-koo {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
          background-position: -10px -63px;
        }
        .amp-social-share-whatsapp {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
          background-position: -9px -113px;
        }
        .amp-social-share-telegram {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
          background-position: -226px -4px;
        }
        .amp-social-share-email {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)0 0 no-repeat;
          background-position: -9px -162px;
        }
        .follow_us {
          border-left: #5a5a5a solid 1px;
          padding-left: 8px;
          display: flex;
          align-items: center;
          background: white;
        }
        .fl_txt {
          font: 400 11px/12px Mukta;
          color: #5a5a5a;
          width: 30px;
          text-transform: none;
        }
        .gn_icon {
          display: inline-flex;
          width: 40px;
          height: 40px;
          background: #fff url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          background-position: -10px -374px;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
        }
      `}</style>
    </>
  );
};

export default SocialShare;
