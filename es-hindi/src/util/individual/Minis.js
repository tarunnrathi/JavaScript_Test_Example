import { SOCIAL_URL, STATIC_IMAGE } from "constant/global/Constant";
import { logEvent } from "includes/googleAnalytic";

export const getSocailShareUI = ({ webUrl, title, isMobile = false }) => {
  return isMobile ? (
    <ul className="ftr_social">
      <li>
        <a
          className="arr_redirect"
          href="javascript:void(0)"
          onClick={async () => {
            const shareData = {
              title: "",
              text: title,
              url: webUrl,
            };
            try {
              await navigator.share(shareData);
            } catch (err) {
              //resultPara.textContent = `Error: ${err}`;
            }
            logEvent("ss_wapi", "tap", "newsMinis_page");
          }}
        >
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
      </li>
    </ul>
  ) : (
    <ul className="ftr_social">
      <li className="whatsApp">
        <a
          href={SOCIAL_URL.WATSAPP + "?text=" + title + " - " + webUrl}
          target="_blank"
        >
          <img src={STATIC_IMAGE.WATSAPP_ICON} alt="" />
        </a>
      </li>
      <li className="fb">
        <a
          href={SOCIAL_URL.FACEBOOK + "?u=" + webUrl + "&t=" + title}
          target="_blank"
        >
          <img src={STATIC_IMAGE.FACEBOOK_ICON} alt="" />
        </a>
      </li>
      <li className="tw">
        <a
          href={SOCIAL_URL.TWITTER + `?text=` + title + "&url=" + webUrl}
          target="_blank"
        >
          <img src={STATIC_IMAGE.TWITTER_ICON} alt="" />
        </a>
      </li>
    </ul>
  );
};
