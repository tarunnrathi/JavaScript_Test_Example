import { memo } from "react";
import { logEvent } from 'includes/googleAnalytic';

function SocialShare({ headline, url, isDistrict = false, articleId='' }) {
  return (
    <>
      <ul className="artclbyeline-share">
        <li>
          <a
            className="for-whatsapp social_share"
            href={
              "https://web.whatsapp.com/send?text=" + url + "&t=" + headline
            }
            target="_blank"
            onClick={() => {
              logEvent("Social_Share", "Click", `${headline},${articleId},whatsapp`);
            }}
            id="whatsapp"
          >
            <span className="spriteshare art-whatsapp-icon social_share"></span>
          </a>
        </li>
        <li>
          <a
            href={
              "https://www.facebook.com/sharer.php?u=" + url + "&t=" + headline
            }
            target="_blank"
            onClick={() => {
              logEvent("Social_Share", "Click", `${headline},${articleId},facebook`);
            }}
            className="social_share"
            id="facebook"
          >
            <span className="spriteshare art-facebook-icon social_share"></span>
          </a>
        </li>
        <li>
          <a
            href={
              "https://telegram.me/share/url?url=?mini=true&url=" +
              url + "&t=" + headline
            }
            target="_blank"
            onClick={() => {
              logEvent("Social_Share", "Click", `${headline},${articleId},telegram`);
            }}
            className="social_share"
            id="telegram"
          >
            <span className="spriteshare art-telegram-icon social_share"></span>
          </a>
        </li>
        <li>
          <a
            href={"https://twitter.com/share?url=" + url + "&text=" +  headline}
            target="_blank"
            onClick={() => {
              logEvent("Social_Share", "Click", `${headline},${articleId},twitter`);
            }}
            className="social_share"
            id="twitter"
          >
            <span className="spriteshare art-twitter-icon social_share"></span>
          </a>
        </li>
        {/* <li>
          <a
            href={`https://kooapp.com/create?title=${headline}&link=${url}&language=hi&handle=News18Hindi&utm_source=News18Hindi&utm_campaign=News18Hindi`}
            target="_blank"
            onClick={()=>logEvent("Social_Share","Click",`${headline},${articleId},kooapp`)}
          >
            <span className="spriteshare art-linkedin-icon"></span>
          </a>
        </li> */}
        <li>
          <div className="follow_us">            
            {/* <a href="https://news.google.com/publications/CAAqBwgKML6x9wowu8nWAg" className="gn_icon"
            onClick={() => logEvent("Social_Share", "Click", `${headline},${articleId},google`)}></a> */}
            <a
              onClick={() =>
                logEvent("whatsapp_follow", "Click", `desktop_article_share`)
              }
              target="_blank"
              href="https://www.whatsapp.com/channel/0029Va6tGtl5q08jzMp2jm2l"
              style={{display: 'flex'}}
              className="cp_mid_join_us_mweb"
            > 
              <div className="fl_txt">Join our Channel</div>  
              <svg viewBox="0,0,256,256" width="32px" height="32px">
                <g
                  fill="#25d366"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                  style={{ "mixBlendMode": "normal" }}
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </li>
      </ul>
    </>
  );
}

export default memo(SocialShare);
