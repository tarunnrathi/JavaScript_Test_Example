import { additionalText } from "includes/_app.util";
import React from "react";

const SocialShare = (props) => {
  return (
    <>
      <div className="newphtshare">
        {["whatsapp", "facebook", "twitter"].map((item, key) => {
          if (item === "facebook") {
            return (
              <React.Fragment key={"social-share" + key}>
                <amp-social-share
                  data-param-app_id="561222041954546"
                  id="facebookAmp"
                  // data-vars-event-label={props.headline?.replace(/Page-\d - /g, '')}
                  data-param-text={`${props?.headline}\n${props?.currentUrl}\n\n ${additionalText}`}
                  type={item}
                  className="ampshareicon"
                  aria-label={`Share on ${item.toUpperCase()}`}
                  height="32"
                  width="32"
                ></amp-social-share>
              </React.Fragment>
            );
          } else if (item === "twitter") {
            return (
              <React.Fragment key={"social-share" + key}>
                <amp-social-share
                  data-param-app_id="561222041954546"
                  id="twitterAmp"
                  // data-vars-event-label={props.headline?.replace(/Page-\d - /g, '')}
                  data-param-text={`${props?.headline}\n${props?.currentUrl}\n\n ${additionalText}`}
                  data-param-url={props.currentUrl}
                  type={item}
                  className="ampshareicon"
                  aria-label={`Share on ${item.toUpperCase()}`}
                  height="32"
                  width="32"
                ></amp-social-share>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={"social-share" + key}>
              <amp-social-share
                data-param-text={`${props.headline}\n${props.currentUrl}\n\n ${additionalText}`}
                type={item}
                id={`${item}Amp`}
                className="ampshareicon"
                aria-label={`Share on ${item.toUpperCase()}`}
                height="32"
                width="32"
              ></amp-social-share>
            </React.Fragment>
          );
        })}
      </div>
      <style jsx global>{`
        .newphtshare {
          display: flex;
          gap: 10px;
          justify-content: center;
          padding-bottom: 10px;
        }
        .newphtshare amp-social-share {
          display: flex;
          width: 32px;
          height: 32px;
          box-shadow: 0px 3px 6px#00000029;
          border: 1px solid#797979;
          background: #1d1d1d;
        }
        .newphtshare amp-social-share:before {
          background: url(/images/siteimages/news18-hn-sprite-icons.svg)no-repeat;
          content: "";
          background-repeat: no-repeat;
          display: block;
          margin: auto;
          filter: brightness(0) invert(1);
        }

        amp-social-share.amp-social-share-facebook:before {
          width: 7px;
          height: 15px;
          background-position: -71px -422px
        }
        amp-social-share.amp-social-share-twitter:before {
          width: 14px;
          height: 12px;
          background-position: -79px -425px;
        }

       amp-social-share.amp-social-share-whatsapp:before {
          width: 14px;
          height: 14px;
          background-position: -197px -422px;
        }
      `}</style>
    </>
  );
};

export default SocialShare;
