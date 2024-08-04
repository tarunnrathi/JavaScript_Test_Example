import React, { useEffect } from "react";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const BudgetHighlightAcrossSiteResposiveWidget = ({
  device = "mobile",
  pageAds = {},
  isBudgetPage = false,
  isShowSponser = false,
  showAcrossWidget = false,
}) => {
  const companion_banner = isBudgetPage
    ? pageAds.companion_banner
    : device === "mobile"
    ? "NW18_HIND_PWA/NW18_HIND_HOME_EVENT_PWA/NW18_HIND_HOME_HOME_EVENT_PWA/NW18_HIND_EVNT_PWA_HP_ROS_EVENT_TOP_320x60"
    : "NW18_HIND_Desktop/NW18_HIND_EVENT_Home/NW18_HIND_EVENT_Home_Home/NW18_HIND_HP_ROS_EVENT_TOP_1244x60";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showAcrossWidget) {
        // Start acrossScript Script
        const acrossScript = document.createElement("script");
        if (device === "desktop") {
          acrossScript.src = "/images/budgetAcrossSiteWidget_hindi_v1.js";
        } else {
          acrossScript.src = "/images/budgetAcrossSiteWidget_hindi_mWeb.js";
        }
        acrossScript.defer = true;
        document.body.appendChild(acrossScript);
        // End acrossScript Script
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showAcrossWidget && (
        <div className="budgetWidgetWrap">
          <div id="budgetWidgetScrossSite">
            <div className="skele-2">
              <div className="skele-3 skeleton" />
              <ul className="skele-4">
                <li className="skeleton" />
                <li className="skeleton" />
                <li className="skeleton" />
                <li className="skeleton" />
                <li className="skeleton" />
                <li className="skeleton" />
                <li className="skeleton" />
                <li className="skeleton" />
              </ul>
              <div className="skele-5 skeleton" />
            </div>
          </div>
        </div>
      )}
      {isShowSponser && (
        <div
          style={
            device === "mobile"
              ? {
                  minHeight: "60px",
                  margin: "auto",
                  background: "#f5f5f5",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }
              : {
                  minHeight: "60px",
                  margin: "auto",
                  background: "#00000021",
                  marginBottom: "10px",
                }
          }
        >
          <NewSiteAd
            slotId="budget_across_site_ad"
            adUnit={companion_banner}
            sizes={device === "mobile" ? [[360, 60]] : [[1244, 60]]}
            width={device === "mobile" ? 360 : 1244}
            height={60}
            style={{ display: "flex", justifyContent: "center" }}
            removeAdSpan={true}
            lazyLoad={false}
          />
        </div>
      )}

      <style jsx>
        {`
          .budgetWidgetWrap {
            width: 1244px;
            margin: 20px auto 0;
            font-family: "Fira Sans", sans-serif;
          }

          @keyframes loader {
            from {
              background-position: -100% 0;
            }
            to {
              background-position: 100% 0;
            }
          }

          .skeleton {
            background: linear-gradient(
              90deg,
              hsl(210, 15%, 88%),
              hsl(210, 15%, 95%),
              hsl(210, 15%, 88%)
            );
            background-size: 200%;
            animation: loader 1s infinite reverse;
          }

          .skele-1 {
            width: 100%;
            height: 59px;
            border-bottom: 1px solid #fff;
          }

          .skele-2 {
            display: flex;
            height: 62px;
          }

          .skele-3 {
            width: 160px;
          }

          .skele-4 {
            width: 984px;
            background: #ddd;
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          .skele-4 li {
            width: 112px;
            height: 48px;
            margin: 0 5px;
            border-radius: 6px;
            flex-shrink: 0;
            list-style: none;
          }

          .skele-5 {
            flex-grow: 1;
          }

          @media screen and (max-width: 768px) {
            .budgetWidgetWrap {
              width: 100%;
            }

            /**skeleton start**/
            .skele-1 {
              height: 50px;
            }

            .skele-2 {
              flex-direction: column;
              height: auto;
            }

            .skele-3 {
              width: 100%;
              height: 38px;
              border-bottom: 1px solid #fff;
            }

            .skele-4 {
              width: 100%;
              height: 68px;
              border-bottom: 1px solid #fff;
            }

            .skele-5 {
              height: 29px;
            }

            /**skeleton end**/
          }
        `}
      </style>
    </>
  );
};

export default React.memo(BudgetHighlightAcrossSiteResposiveWidget);
