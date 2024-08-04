import React, { useContext, useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { logEvent } from "includes/googleAnalytic";
import HindiGlobalContext from "HindiGlobalContext";

const AppInstall = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [browserLogo, setBrowserLogo] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const maxDisplaysPerMonth = 1;
  const { isBottomNextPrevOpen } = useContext(HindiGlobalContext);

  // Show the bottom sheet once in 30 days
  const showBottomSheetInThirtyDays = () => {
    const lastDisplayData = localStorage.getItem("appInstallDisplayData");
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    today.setDate(today.getDate() + 30); // Reset today's date

    let displayCount = 0;
    let lastDisplayDate = new Date("1970-01-01"); // Default to an old date

    if (lastDisplayData) {
      const { count, date } = JSON.parse(lastDisplayData);
      displayCount = count;
      lastDisplayDate = new Date(date);
    }

    // Reset the count if the last display was more than 30 days ago
    if (lastDisplayDate < thirtyDaysAgo) {
      displayCount = 0;
    }

    // Show the bottom sheet once in 30 days
    if (displayCount < maxDisplaysPerMonth) {
      setIsVisible(true);
      localStorage.setItem(
        "appInstallDisplayData",
        JSON.stringify({
          count: displayCount + 1,
          date: today.toISOString(),
        })
      );
    }
  };

  const handleScroll = () => {
    if (!isScrolled && window.scrollY > 10) {
      setIsScrolled(true);
      showBottomSheetInThirtyDays();
    }
  };

  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (
      userAgent.includes("crios") ||
      (userAgent.includes("chrome") && !userAgent.includes("edg"))
    ) {
      setBrowserLogo("/images/browser/Chrome.png");
    } else if (userAgent.includes("fxios") || userAgent.includes("firefox")) {
      setBrowserLogo("/images/browser/Mozilla.png");
    } else if (
      userAgent.includes("opios") ||
      userAgent.includes("opr") ||
      userAgent.includes("opera")
    ) {
      setBrowserLogo("/images/browser/Opera.png");
    } else if (
      userAgent.includes("safari") &&
      !userAgent.includes("chrome") &&
      !userAgent.includes("crios") &&
      !userAgent.includes("fxios") &&
      !userAgent.includes("opios")
    ) {
      setBrowserLogo("/images/browser/Safari.png");
    } else if (userAgent.includes("ucbrowser")) {
      setBrowserLogo("/images/browser/UCbrowser.png");
    } else {
      setBrowserLogo("/images/browser/Chrome.png");
    }
  };

  const handleBrowserContinue = () => {
    setIsVisible(false);
    setShowBanner(true);
    logEvent("AppInstall_Bottomsheet", "Click", "bottomsheet");
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("overlayapp")) {
      setIsVisible(false);
      setShowBanner(true);
    }
  };

  useEffect(() => {
    const appbannerClosed = sessionStorage.getItem("appbannerClosed");  
    setTimeout(()=>{setShowBanner(appbannerClosed === "true" ? false : true);},2000);
    detectBrowser();
    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("appbannerClosed", "true");
  };

  const getAppDownloadUrl = (userAgent, widget = "") => {
    let appDownLoadUrl = "";
    if (userAgent.match(/Android/i)) {
      if (widget == "bottomSheet") {
        appDownLoadUrl = `https://play.google.com/store/apps/details?id=com.divum.ibn&utm_source=hindi&utm_medium=bottomsheet&utm_campaign=bottomsheet_appinstall `;
      } else if (widget == "floatingCTA") {
        appDownLoadUrl = `https://play.google.com/store/apps/details?id=com.divum.ibn&utm_source=hindi&utm_medium=webbanner&utm_campaign=appinstall`;
      }
    } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
      if (widget == "bottomSheet") {
        appDownLoadUrl =
          "https://apps.apple.com/app/apple-store/id395194912?pt=433541&ct=bottomsheet-hindi-install&mt=8 ";
      } else if (widget == "floatingCTA") {
        appDownLoadUrl =
          "https://apps.apple.com/app/apple-store/id395194912?pt=433541&ct=hindi-webbanner-installapp&mt=8";
      }
    }
    return appDownLoadUrl;
  };

  if (!isVisible && !showBanner) return null;

  return (
    <>
      {isVisible && (
        <div>
          <InView
            as="div"
            className="overlayapp install_app_bottom_sheet"
            threshold={0.1}
            onChange={(inView, _, entry) => {
              if (inView) {
                logEvent(
                  "AppInstall_Bottomsheet",
                  "Impressions",
                  "bottomsheet"
                );
              }
            }}
          >
            <div className="apptch_wrap">
              <span>देखें इस पेज को:</span>
              <div className="appitm_wrp">
                <div className="appoption">
                  <div className="lhs">
                    <img
                      src="/images/browser/news18logo.png"
                      alt="News18 Logo"
                      width={40}
                      height={40}
                    />
                    <h3 className="lghead">
                      News18 ऐप में{" "}
                      <span className="lgdesc">बेहतर न्यूज़ अनुभव</span>
                    </h3>
                  </div>
                  <span className="appcta active install_app_bottom_sheet">
                    <button
                      className="install_app_bottom_sheet"
                      onClick={() => {
                        logEvent(
                          "AppInstall_Bottomsheet",
                          "Click",
                          `bottomsheet`
                        );
                        window.location.href = 
                          getAppDownloadUrl(
                            navigator.userAgent,"bottomSheet"
                          );
                      }}
                    >
                      {navigator.userAgent.match(/Android/i)
                        ? "ऐप खोलें"
                        : "इंस्टॉल ऐप"}
                    </button>
                  </span>
                </div>
                <div className="appoption">
                  <div className="lhs">
                    <img
                      src={browserLogo}
                      alt="Browser Logo"
                      width={40}
                      height={40}
                    />
                    <h3 className="lghead">ब्राउज़र में ही</h3>
                  </div>
                  <span
                    className="appcta"
                    onClick={() => handleBrowserContinue()}
                  >
                    जारी रखें
                  </span>
                </div>
              </div>
            </div>
          </InView>
        </div>
      )}
      {showBanner && (
        <div>
          <InView
            as="div"
            className="opnbtnwrap install_app_float"
            threshold={0.1}
            onChange={(inView, _, entry) => {
              if (inView) {
                logEvent(
                  "AppInstall_FloatingCTA",
                  "Impressions",
                  "Floating CTA"
                );
              }
            }}
          >
            <div className="opbtntxt">
              <span>
                <button
                className="install_app_float"
                  onClick={() => {
                    logEvent("AppInstall_FloatingCTA", "Click", `Floating CTA`);
                    window.location.href = 
                    getAppDownloadUrl(
                      navigator.userAgent,"floatingCTA"
                    );
                  }}
                >
                  {navigator.userAgent.match(/Android/i)
                    ? "ऐप खोलें"
                    : "इंस्टॉल ऐप"}
                </button>
              </span>
            </div>
            <div className="opbtnclose" onClick={handleCloseBanner}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8.73"
                height="8.73"
                viewBox="0 0 8.73 8.73"
              >
                <path
                  id="Path_16"
                  data-name="Path 16"
                  d="M11.865-9.111l-.879-.879L7.5-6.5,4.014-9.99l-.879.879L6.621-5.625,3.135-2.139l.879.879L7.5-4.746,10.986-1.26l.879-.879L8.379-5.625Z"
                  transform="translate(-3.135 9.99)"
                  fill="#fff"
                />
              </svg>
            </div>
          </InView>
        </div>
      )}
      <style jsx global>
        {`
          .overlayapp {
            height: 100%;
            width: 100%;
            display: block;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgb(0 0 0 / 70%);
            z-index: 111111;
          }
          .apptch_wrap {
            position: fixed;
            bottom: 62px;
            left: 0;
            right: 0;
            height: 178px;
            background-color: #ffffff;
            border-radius: 20px 20px 0 0;
            padding: 20px;
          }
          .apptch_wrap > span {
            font-size: 15px;
            line-height: 25px;
            font-weight: bold;
            color: #000;
            margin-bottom: 16px;
            display: block;
          }
          .appitm_wrp {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
          }
          .appoption {
            display: flex;
            justify-content: space-between;
          }
          .appoption .lhs {
            display: flex;
            gap: 10px;
            align-items: center;
          }
          .lghead {
            display: flex;
            font-size: 14px;
            line-height: 23px;
            flex-direction: column;
          }
          .lghead span {
            font-weight: normal;
            font-size: 11px;
            line-height: 13px;
            color: #6f6f6f;
          }
          .appcta {
            background-color: #eaeaea;
            width: 90px;
            height: 28px;
            text-align: center;
            border-radius: 6px;
            font-size: 13px;
            line-height: 22px;
            color: #595959;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .appcta.active {
            background-color: #d7121b;
            color: #fff;
          }
          .appcta.active a {
            color: #fff;
          }
          .opnbtnwrap {
            filter: drop-shadow(0 3px 6px #00000042);
            position: fixed;
            margin: 0 auto;
            left: 0;
            right: 0;
            bottom: ${isBottomNextPrevOpen ? "155px" : "70px"};
            display: flex;
            justify-content: center;
            width: 96px;
            z-index: 999;
          }
          .opbtntxt a {
            color: #fff;
          }
          .opbtntxt {
            color: #fff;
            font-size: 13px;
            line-height: 22px;
            text-transform: uppercase;
            letter-spacing: 0px;
            width: 103px;
            height: 32px;
            background-color: #d7121b;
            border-radius: 40px 0px 0 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .opbtnclose {
            border-left: 1px solid #fff;
            width: 40px;
            height: 32px;
            background-color: #d7121b;
            border-radius: 0 40px 40px 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .opbtntxt button {
            font-size: 13px;
            background: transparent;
            color: #fff;
            line-height: 25px;
            padding: 0;
          }
          .appcta button,
          .appcta.active button {
            font-size: 13px;
            background-color: transparent;
            color: #595959;
          }
          .appcta.active button {
            color: #fff;
          }
          .appcta button {
            font-size: 13px;
            background-color: transparent;
            color: #fff;
        }
        `}
      </style>
    </>
  );
};

export default AppInstall;
