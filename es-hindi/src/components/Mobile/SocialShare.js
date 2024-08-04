import { logEvent } from "includes/googleAnalytic";
import { memo } from "react";
import { additionalText } from "includes/_app.util";

// function SocialShare({ headline, url, articleId = "", hideJoin = false }) {
//   return (
//     <>
//       <div className="social_share_sec">
//         <div class="social_wrap">
//           <ul className="art_social_share">
//             <li>
//               <a
//                 title="Whatsapp Share"
//                 className="for-whatsapponly"
//                 href={
//                   "https://wa.me/?text=" +
//                   encodeURIComponent(headline) +
//                   " - " +
//                   url
//                 }
//                 onClick={() =>
//                   logEvent(
//                     "Social_Share",
//                     "Click",
//                     `${headline},${articleId},whatsapp`
//                   )
//                 }
//               >
//                 <span className="spriteshare art-whatsapp-icon"></span>
//               </a>
//             </li>
//             <li>
//               <a
//                 title="Facebook Share"
//                 className="for-facebook"
//                 href={
//                   "https://www.facebook.com/sharer.php?u=" +
//                   url +
//                   "&t=" +
//                   headline
//                 }
//                 onClick={() =>
//                   logEvent(
//                     "Social_Share",
//                     "Click",
//                     `${headline},${articleId},facebook`
//                   )
//                 }
//               >
//                 <span className="spriteshare art-facebook-icon"></span>
//               </a>
//             </li>
//             <li>
//               <a
//                 title="Telegram Share"
//                 className="for-telegram"
//                 href={
//                   "https://telegram.me/share/url?url=" + url + "&t=" + headline
//                 }
//                 onClick={() =>
//                   logEvent(
//                     "Social_Share",
//                     "Click",
//                     `${headline},${articleId},telegram`
//                   )
//                 }
//               >
//                 <span className="spriteshare art-telegram-icon"></span>
//               </a>
//             </li>
//             <li>
//               <a
//                 title="Twitter Share"
//                 className="for-twitter"
//                 href={"https://twitter.com/share?text=" + url + "&t=" + headline}
//                 onClick={() =>
//                   logEvent(
//                     "Social_Share",
//                     "Click",
//                     `${headline},${articleId},twitter`
//                   )
//                 }
//               >
//                 <span className="spriteshare art-twitter-icon"></span>
//               </a>
//             </li>
//             {/* <li>
//               <a
//                 href={`https://kooapp.com/create?title=${headline}&link=${url}&language=hi&handle=News18Hindi&utm_source=News18Hindi&utm_campaign=News18Hindi`}
//               onClick={()=>logEvent("Social_Share","Click",`${headline},${articleId},kooapp`)}
//               >
//                 <span className="spriteshare art-linkedin-icon"></span>
//               </a>
//             </li> */}
//             {/* <li>
//               <div className="follow_us">
//                 <div className="fl_txt">Follow us on</div>
//                 <a
//                   href="https://news.google.com/publications/CAAqBwgKML6x9wowu8nWAg"
//                   className="gn_icon"
//                   onClick={() =>
//                     logEvent(
//                       "Social_Share",
//                       "Click",
//                       `${headline},${articleId},google`
//                     )
//                   }
//                 ></a>
//               </div>
//             </li> */}
//           </ul>
//         </div>
//         {!hideJoin && (
//           <a className="follow_us"
//             onClick={() =>
//               logEvent(
//                 "whatsapp_follow",
//                 "Click",
//                 `mobile_article_share`
//               )
//             }
//             target="_blank"
//             href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
//             >
//             <div className="fl_txt">Join our Channel</div>
//             <div className="wtapp_ic"><svg id="whatsapp-svgrepo-com" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
//               <path id="Path_2" data-name="Path 2" d="M0,25l2.15-6.45A12.283,12.283,0,1,1,7,23.158Z" fill="#2cb742"/>
//               <path id="Path_3" data-name="Path 3" d="M26.253,21.178a8.248,8.248,0,0,0-2.464-2.129c-.439-.25-.968-.278-1.218.168a10.04,10.04,0,0,1-.79.864,1.472,1.472,0,0,1-2.094-.208l-1.59-1.59-1.59-1.59A1.472,1.472,0,0,1,16.3,14.6a10.04,10.04,0,0,1,.864-.79c.446-.25.418-.779.168-1.218A8.248,8.248,0,0,0,15.2,10.127a1.089,1.089,0,0,0-1.279.193l-.7.7c-2.228,2.228-1.131,4.742,1.1,6.97l2.036,2.036,2.036,2.036c2.228,2.228,4.742,3.324,6.97,1.1l.7-.7A1.09,1.09,0,0,0,26.253,21.178Z" transform="translate(-6.207 -5.173)" fill="#fff"/>
//               </svg>
//             </div>
//           </a>
//         )}

//       </div>
//       <style jsx global>{`
//         .for-whatsapponly svg {
//           filter: brightness(0) invert(1);
//           height: 40px !important;
//           width: 40px !important;
//         }
//         .for_mail svg#Layer_111 {
//           height: 20px !important;
//           width: 20px !important;
//           filter: brightness(0) invert(1);
//         }
//         .follow_us .wtapp_ic {
//           padding: 4px 0;
//           margin: auto 0;
//         }
//       `}</style>
//     </>
//   );
// }
function SocialShare({
  headline,
  url,
  page = "",
  hasShortNews = false,
  weburl_short = "",
  articleData,
  articleId,
  isArticlePage = false,
}) {
  const shareData = {
    title: "",
    text: `${headline}\n${url}\n\n ${additionalText}`,
  };
  const shareWebAPI = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      //resultPara.textContent = `Error: ${err}`;
    }
    logEvent("ss_wapi", "tap", page);
  };
  return (
    <>
      <div className="social_share_sec">
        {/* {!hideJoin && (
          <a
            className="follow_us social_share cp_mid_join_us_mweb"
            onClick={() =>
              logEvent("whatsapp_follow", "Click", `mobile_article_share`)
            }
            target="_blank"
            href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
          >
            <div className="fl_txt cp_mid_join_us_mweb">Join our Channel</div>
            <div className="wtapp_ic cp_mid_join_us_mweb">
              <svg
                id="whatsapp-svgrepo-com"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
              >
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M0,25l2.15-6.45A12.283,12.283,0,1,1,7,23.158Z"
                  fill="#2cb742"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M26.253,21.178a8.248,8.248,0,0,0-2.464-2.129c-.439-.25-.968-.278-1.218.168a10.04,10.04,0,0,1-.79.864,1.472,1.472,0,0,1-2.094-.208l-1.59-1.59-1.59-1.59A1.472,1.472,0,0,1,16.3,14.6a10.04,10.04,0,0,1,.864-.79c.446-.25.418-.779.168-1.218A8.248,8.248,0,0,0,15.2,10.127a1.089,1.089,0,0,0-1.279.193l-.7.7c-2.228,2.228-1.131,4.742,1.1,6.97l2.036,2.036,2.036,2.036c2.228,2.228,4.742,3.324,6.97,1.1l.7-.7A1.09,1.09,0,0,0,26.253,21.178Z"
                  transform="translate(-6.207 -5.173)"
                  fill="#fff"
                />
              </svg>
            </div>
          </a>
        )} */}

        {/* Impact Short Widget Start */}
        {isArticlePage && (
          <a
            onClick={() =>
              logEvent(
                "Short_news_CP",
                "Click",
                `${articleData?.categories?.[0]?.slug || ""}, ${articleId}, ${
                  articleData.display_headline
                }, ${hasShortNews ? "version2" : "version1"}, mobile`
              )
            }
            className="cp_mid_short_news"
            href={hasShortNews ? `/short-news/${weburl_short}` : "/short-news/"}
          >
            <div
              className={
                hasShortNews
                  ? "imswrap imslg cp_mid_short_news"
                  : "imswrap cp_mid_short_news"
              }
            >
              <div className="ls">
                <img
                  src="/images/impactShort/imsmob.svg"
                  width={22}
                  height={41}
                  alt="imsmob"
                />
              </div>
              <div className="rg">
                <div className="imstxt">
                  {hasShortNews
                    ? "फटाफट खबरें : गहराई में जाने से पहले, संक्षिप्त अपडेट्स।"
                    : "फटाफट खबरें = Impact"}
                  <span>&nbsp;Shorts</span>
                  <p>
                    Impact <span>Shorts</span>
                  </p>
                </div>
                <div className="imscta">
                  Experience now <span className="imsarrrg"></span>
                </div>
              </div>
            </div>
          </a>
        )}
        {/* Impact Short Widget Ends */}
        <a className="arr_redirect social_share" onClick={shareWebAPI}>
          <svg
            id=""
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="25"
            viewBox="0 0 32 32"
          >
            <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
          </svg>
        </a>
      </div>
      <style jsx global>{`
        .for-whatsapponly svg {
          filter: brightness(0) invert(1);
          height: 40px !important;
          width: 40px !important;
        }
        .for_mail svg#Layer_111 {
          height: 20px !important;
          width: 20px !important;
          filter: brightness(0) invert(1);
        }
        .follow_us .wtapp_ic {
          padding: 4px 0;
          margin: auto 0;
        }
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: left;
          line-height: 16px;
          margin: 0;
          position: relative;
          padding: 0;
          text-transform: capitalize;
          text-align: center;
          align-items: center;
          height: 35px;
          min-width: 35px;
          justify-content: center;
          flex-direction: row;
        }

        .imswrap {
          min-width: 225px;
          height: max-content;
          border: 1px solid #b2b2b2;
          background-color: #f9f4f4;
          padding: 4px 10px;
          border-radius: 4px;
          display: flex;
          gap: 7px;
        }
        .ls {
          width: 21px;
          height: 41px;
        }
        .rg {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .rg p {
          display: none;
        }
        .imstxt {
          font-size: 12px;
          font-weight: 600;
          line-height: 19.94px;
          text-align: left;
          color: #000;
        }
        .imstxt span {
          font-size: 12px;
          line-height: 14.4px;
          text-align: left;
          color: #e1281c;
          font-style: italic;
        }
        .imscta {
          width: max-content;
          height: max-content;
          border-radius: 4px;
          border: 1.2px solid #ffffff;
          background-color: #e1281c;
          font-size: 12px;
          font-weight: 500;
          line-height: 14.4px;
          text-align: left;
          color: #fff;
          padding: 2px 6px;
          display: flex;
          justify-content: space-around;
        }
        .imsarrrg {
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 14px;
          height: 10px;
        }

        .imsarrrg::after,
        .imsarrrg::before {
          content: "";
          display: block;
          box-sizing: border-box;
          position: absolute;
          right: -1px;
        }

        .imsarrrg::after {
          width: 5px;
          height: 5px;
          border-top: 1px solid;
          border-right: 1px solid;
          transform: rotate(45deg);
          bottom: 0;
        }

        .imsarrrg::before {
          width: 11px;
          height: 1px;
          bottom: 2px;
          background: currentColor;
        }
        .imslg {
          max-width: 250px;
        }
        .imslg .rg {
          display: flex;
          flex-direction: row;
          position: relative;
        }
        .imslg .rg .imscta {
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .imslg .rg p {
          display: block;
        }
        .imslg .rg .imstxt > span {
          display: none;
        }
        .imslg .rg .imstxt {
          line-height: 15px;
        }
      `}</style>
    </>
  );
}

export default memo(SocialShare);
