import { logEvent } from "includes/googleAnalytic";
import { useEffect, useState } from "react";
import { getAppDownloadUrl } from "includes/article.util";
import useScrollBar from "hooks/useScrollBar";
import AmpAnalyticsGA4Events from "widgets/Amp/AmpAnalyticsGA4Events";

const InstallAppIcon = ({ category, label, isAMP = false, GA4Data={} }) => {
  useEffect(() => logEvent(category, "Impression", label), []);

  const [appDownloadUrl, setAppDownloadUrl] = useState("");
  const [scroll, scrollTop] = useScrollBar(true);
  const [isScroll, setIsScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timeOutId, setTimeOutId] = useState(null);
  let appDownloadUrlAMP = "";

  // useEffect(() => {
  //   if (scrollTop && scroll > 0) {
  //     setShowSideIcon(true);
  //   } else if (scroll !== 0) {
  //     setShowSideIcon(false);
  //   }
  // }, [scrollTop]);
  useEffect(() => {
    if (!timeOutId) {
      if (scrollTop && scroll > 0) {
        setIsScroll(true);
        setScrollPosition(scroll);
      } else if (!scrollTop && scroll > 0) {
        setIsScroll(false);
        setScrollPosition(scroll);
      }
    }
    if (timeOutId) clearTimeout(timeOutId);
    const timeout = setTimeout(() => {
      if (scroll - scrollPosition > 0) {
        if (scroll > 0) {
          setIsScroll(false);
          setScrollPosition(scroll);
        }
      } else if (scroll - scrollPosition < 0) {
        setIsScroll(true);
        if (scroll > 0) setScrollPosition(scroll);
      }
    }, 100);
    setTimeOutId(timeout);
  }, [scrollTop, scrollPosition, scroll]);

  // useEffect(() => {
  //   let userAgent = '';

  //   if (navigator.userAgent.match(/Android/i)) {
  //     userAgent = 'android'
  //   } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
  //     userAgent = 'ios'
  //   }

  //   if (userAgent) {
  //     if (userAgent === 'android') {
  //       setAppDownloadUrl("https://play.google.com/store/apps/details?id=com.divum.ibn&referrer=utm_source%3Dhindi%26utm_medium%3Dwebbanner%26utm_campaign%3Dappinstall%26anid%3Dadmob")
  //     } else if (userAgent === 'ios') {
  //       setAppDownloadUrl("https://apps.apple.com/app/apple-store/id395194912?pt=433541&ct=hindi-webbanner-installapp&mt=8")
  //     }
  //   }
  // }, [])

  // if(appDownloadUrl === '') {
  //   setAppDownloadUrl("https://www.news18.com/app-download-hindi/");
  // }
  if (isAMP) {
    appDownloadUrlAMP = "https://www.news18.com/app-download-hindi/";
  } else {
    useEffect(() => {
      const playStorURL = getAppDownloadUrl(navigator.userAgent);
      setAppDownloadUrl(playStorURL);
    }, []);
  }

  return (
    <>
      <div
        title="Install App install_app_float"
        className={isScroll ? "instlsapp_fxd show" : "instlsapp_fxd hide"}
        data-vars-event-label={label}
        data-vars-event-category={category}
      >
        <a
          id="app-install-icon"
          href={isAMP ? appDownloadUrlAMP : appDownloadUrl}
          data-vars-event-label={label}
          data-vars-event-category={category}
          onClick={() => logEvent(category, "Click", label)}
          className="install_app_float"
        >
         Install <br></br> App
        </a>
        <AmpAnalyticsGA4Events
          id={"app-install-icon"}
          event_name={"app_install_float"}
          cta_name={"app_install"}
          section={GA4Data?.section || ""}
          subsection={GA4Data?.sub_section || ""}
          article_id={GA4Data?.article_id}
          type_of_article={GA4Data?.type_of_article || ""}
          local18_district={GA4Data?.local18_district || ""}
          domain="https://hindi.news18.com/"
        />
      </div>
      <style jsx global>{`
        .instlsapp_fxd {
          width: 43px;
          height: 34px;
          position: fixed;
          right: 0px;
          top: 43%;
          z-index: 99999;
          border: 2px solid#fff;
          border-radius: 6px 0px 0px 6px;
          border-right: 0;
          box-shadow: -4px 3px 16px#0003;
          background-color: #e1261d;
          padding: 3px 4px;
          font-size: 11px;
          text-align: center;
          line-height: 11px;
          font-weight: bold;
      }
      .instlsapp_fxd a {
          color: #fff;
          line-height: 1;
          font-size: 11px;
          display: inline-block;
      }
        .hide {
          right: -257px;
          z-index: 9999999;
          transition: all ease 0.8s;
        }

      `}</style>
    </>
  );
};

export default InstallAppIcon;
