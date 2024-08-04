import CustomHead from "components/Common/CustomHeader";
import Document, { Html, Main, NextScript } from "next/document";
import React from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {

  render() {
    const isAMP=this.props.__NEXT_DATA__?.query?.isAmp;
    return (
      <Html lang={process.env.LANG_CODE}>
        <CustomHead>
        <link rel="preconnect" href="https://images.news18.com" />
        <link rel="preconnect" href="https://hindi.news18.com"/>
        {/* <link rel="preload" as="font" type="font/woff2"
        crossOrigin="anonymous" href="https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
           {/* added new links */}
           {isAMP && (
           <>
           <link rel="preconnect" href="https://cdn.ampproject.org"/>
           <link rel="preconnect" href="https://www.googletagservices.com/"/>
           <link rel="preconnect" href="https://tpc.googlesyndication.com/"/>
           <link rel="preconnect" href="https://securepubads.g.doubleclick.net/"/>
          <link rel="preconnect" href="https://pagead2.googlesyndication.com/"/>
          <link rel="preconnect" href="https://adservice.google.com/"/>
          <link rel="preconnect" href="https://www.google.com/"/>
          <link rel="preconnect" href="https://googleads.g.doubleclick.net/"/>
          </>
           )}
           {/* ending of new links */}
           <link rel="preconnect" href="https://ads.pubmatic.com/"/>
           <link rel="preconnect" href="https://www.google-analytics.com/" />
          <link rel="preconnect" href="https://www.googletagmanager.com/" />
          {!isAMP ? (
            <>
            <link rel="preconnect" href="https://static.chartbeat.com/"/>
            {/* <link rel="dns-prefetch" href="https://ib.adnxs.com"/>
            <link rel="dns-prefetch" href="https://fastlane.rubiconproject.com"/> */}
            <link rel="dns-prefetch" href="https://hbopenbid.pubmatic.com"/>
            <link rel="dns-prefetch" href="https://securepubads.g.doubleclick.net"/>
            <link rel="dns-prefetch" href="https://tpc.googlesyndication.com"/>
            <link rel="dns-prefetch" href="https://www.googletagservices.com"/>
            <link rel="dns-prefetch" href="https://ad.doubleclick.net"/>
            <link rel="dns-prefetch" href="https://ads.pubmatic.com" />
          </>
          )
          : ''}
          {(publicRuntimeConfig?.isEnv === "production_404" || publicRuntimeConfig?.isEnv === "production")
          ? null
          : <meta name="robots" content="noindex,nofollow"/>}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta property="fb:pages" content="122176787772" />
          <meta property="fb:app_id" content="561222041954546" />
          <link rel="shortcut icon" href="https://images.news18.com/static_news18/pix/ibnhome/news18/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#001636" />
		      {/* <link rel="alternate" type="application/rss+xml" title="RSS" href="https://hindi.news18.com/rss-newsstandtech/latest.xml" /> */}
          <link rel="alternate" type="application/rss+xml" title="RSS" href="https://hindi.news18.com/commonfeeds/v1/hin/rss/text.xml" />
          <link rel="alternate" type="application/rss+xml" title="RSS" href="https://hindi.news18.com/commonfeeds/v1/hin/rss/photogallery.xml" />
          <link rel="alternate" type="application/rss+xml" title="RSS" href="https://hindi.news18.com/commonfeeds/v1/hin/rss/videos.xml" />
        </CustomHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
