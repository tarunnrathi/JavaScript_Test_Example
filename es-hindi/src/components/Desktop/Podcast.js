import React from 'react';
import PodcastGrid from 'components/Desktop/podcast/PodcastGrid';
import PodcastSlider from 'components/Desktop/podcast/PodcastSlider';
import Outbrain from 'widgets/Common/Responsive/Outbrain';
import Head from 'next/head';
import BreadcrumbCommon from 'widgets/Common/Responsive/BreadcrumbCommon';

const Podcast = (props) => {
  const { topPriorityData: { podcastData, latestPodcastData, breadCrumbArray } } = props;
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Khand:wght@300;400;500;600;700&display=optional"
          rel="stylesheet"
        />
      </Head>
      <div className='podcast_container container'>
        <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
      </div>
      <PodcastGrid podcastData={podcastData} order={1}/>
      <PodcastSlider latestPodcastData={latestPodcastData}/>
      <PodcastGrid podcastData={podcastData} order={2}/>
      <PodcastGrid podcastData={podcastData} order={3}/>

      {/* Outbrain start here */}
      <div className='podcast_container container'>
        <Outbrain widgetId="AR_9" widgetSrc={'https://hindi.news18.com/podcast/'} />
      </div>
      <style jsx global>{`
        .newdscrt-brdcrmb {
            font-family: Noto Serif, Droid Serif, sans-serif;
            font-weight: 500;
            display: flex;
            margin: 0px;
            // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding: 10px;
        }

        .newdscrt-brdcrmb li {
            flex-shrink: 0;
            color: #000;
            font-size: 13px;
            margin-right: 10px;
        }

        .newdscrt-brdcrmb li h1 {
            color: #838383;
            font-size: 15px;
        }

        .newdscrt-brdcrmb li a {
            color: #000;
            font-size: 15px;
        }
        .newdscrt-brdcrmb li:last-child a:after {
            display: none;
        }
        .podcast-brdcrmb {
          margin : 0 10px;    
          transform: translateY(5px);
          text-transform: uppercase;
        }
        .podcast_topbar_right ul li:nth-child(4) a {
          display: flex;
          align-items: center;
        }
        .podcast_topbar_right ul li:last-child img {
          width: 50px;
        }
      /* devanagari */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('Khand Medium'), local('Khand-Medium'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWExbQe3_w.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('Khand Medium'), local('Khand-Medium'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWE-bQe3_w.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: local('Khand Medium'), local('Khand-Medium'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKhcWEwbQc.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* devanagari */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: local('Khand SemiBold'), local('Khand-SemiBold'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmExbQe3_w.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: local('Khand SemiBold'), local('Khand-SemiBold'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmE-bQe3_w.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: local('Khand SemiBold'), local('Khand-SemiBold'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bKNdmEwbQc.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* devanagari */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('Khand Bold'), local('Khand-Bold'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2ExbQe3_w.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('Khand Bold'), local('Khand-Bold'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2E-bQe3_w.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Khand';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('Khand Bold'), local('Khand-Bold'), url(https://fonts.gstatic.com/s/khand/v8/TwMN-IINQlQQ0bLpd2EwbQc.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      .podcast_topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .podcast_title {
        letter-spacing: 0px;
        color: #EB3D3C;
        text-transform: uppercase;
        font-size: 30px;
        margin: 0;
        padding: 0;
        font-family: 'Khand', sans-serif;
        font-weight: bold;
      }
      .podcast_title a {
        color: #EB3D3C;
      }
      .podcast_topbar_right {
        display: flex;
        align-items: center;
        border-bottom: 1px rgba(0, 0, 0, 0.22) solid;
        position: relative;
      }
      p.subscribe_to {
        padding: 0;
        margin: 0;
        letter-spacing: -0.36px;
        color: #222222;
        text-transform: uppercase;
        font-size: 16px;
        padding-right: 20px;
        margin-right: 15px;
        font-family: 'Noto Sans', sans-serif;
        position: relative;
        font-weight: bold;
      }
      p.subscribe_to::after {
        content: "";
        width: 6px;
        height: 6px;
        position: absolute;
        top: 8px;
        right: 5px;
        border-bottom: 2px solid #222222;
        border-right: 2px solid #222222;
        transform: rotate(-45deg);
      }
      .podcast_topbar_right ul {
        display: flex;
        align-items: center;
        list-style: none;
      }
      .podcast_topbar_right::after {
        content: "";
        position: absolute;
        left: 0;
        background: #EB3D3C;
        width: 210px;
        height: 3px;
        bottom: -2px;
      }
      .podcast_topbar_right ul li {
        padding-right: 20px;
      }
      .podcast_topbar_right ul a {
        text-decoration: none;
        font-family: 'Noto Sans', sans-serif;
      }
      .podcast_topbar_right ul img {
        width: 120px;
      }
      a img {
        border: none;
      }
      .podcast_topbar_right ul li:nth-child(3) {
        display: flex;
        align-items: center;
      }
      .podcast_topbar_right ul li:last-child {
        padding-right: 0;
      }
      .podcast_page_section {
        display: flex;
      }
      .podcast_section_left {
        width: calc(100% - 400px);
        padding-right: 15px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
      }
      .podcast_section_left .podcast_box:nth-child(1) {
        width: 100%;
        padding: 0;
        margin-bottom: 30px;
      }
      .podcast_section_left .podcast_box {
        width: 50%;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .podcast_box {
        font-family: 'Noto Sans', sans-serif;
        width: 100%;
        margin-bottom: 15px;
      }
      .podcast_box a {
        display: block;
        text-decoration: none;
      }
      .podcast_box figure {
        width: 100%;
        margin: 0;
        padding: 0;
      }   
      .podcast_box figure img {
        width: 100%;
        display: block;
        border-radius: 10px;
      }   
      // .podcast_box figcaption {
      //   display: flex;
      //   flex-wrap: wrap-reverse;
      //   position: relative;
      //   z-index: 1;
      // }
      .podcast_box figcaption {
        background: #fff;
        position: relative;
        margin-top: -20px;
      }
      .podcast_section_left .podcast_box:nth-child(1) figcaption::before {
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_1591679661.png);
        background-size: 100.1%;
        height: 26px;
        top: -22px;
      }
      .podcast_box figcaption::before {
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_3_1591698372.png);
        width: 100%;
        content: "";
        position: absolute;
        top: -18px;
        height: 64px;
        left: 0;
        right: 0;
        margin: auto;
        background-size: cover;
        background-position: center;
      }
      .podcast_section_left .podcast_box:nth-child(1) ul.time_location {
        font-size: 14px;
      }
      ul.time_location {
        display: flex;
        align-items: center;
        list-style: none;
        letter-spacing: -0.24px;
        color: #696969;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: normal;
        padding: 0;
        padding-top: 5px;
      }
      ul.time_location li {
        position: relative;
        padding-left: 10px;
        padding-right: 15px;
      }
      ul.time_location li::after {
        width: 6px;
        height: 6px;
        content: "";
        position: absolute;
        left: 0;
        background: #EB3D3C 0% 0% no-repeat padding-box;
        border-radius: 10px;
        top: 6px;
      }
      .podcast_section_left .podcast_box:nth-child(1) h2 {
        font-size: 26px;
        line-height: 46px;
        max-height: 92px;
        overflow: hidden;
      }
      .podcast_box figcaption h2 {
        letter-spacing: -0.36px;
        color: #222222;
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
        margin: 0;
        padding: 0;
        width: 100%;
        position: relative;
        max-height: 60px;
        overflow: hidden;
      }
      .podcast_section_left .podcast_box:nth-child(1) figcaption::after {
        width: 56px;
        height: 56px;
        top: -63px;
      }
      .podcast_box figcaption::after {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        margin: auto;
        left: 0;
        right: 0;
        top: -48px;
        border-radius: 100px;
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/podcast_icon_1591679506.png) #EB3D3C;
        background-size: 15px;
        background-repeat: no-repeat;
        background-position: center;
      }
      .podcast_section_right {
        width: 400px;
      }
      @media screen and (max-width: 768px) {
        .podcast_title {
          font-size: 22px;
          width: 50%;
        }
        p.subscribe_to {
          margin: 0;
          font-size: 12px;
          padding-bottom: 7px;
          padding-right: 15px;
        }
        p.subscribe_to::after {
          border-bottom: 2px solid #222222;
          border-top: 0;
          top: 3px;
          right: 0px;
          width: 6px;
          height: 6px;
          border-left: 2px solid #222222;
          border-right: 0;
        }
        .podcast_topbar_right ul {
          position: absolute;
          top: 21px;
          display: none;
          z-index: 9;
          background: #F7F7F7 0% 0% no-repeat padding-box;
          box-shadow: -5px 1px 0px #0000001a;
          right: 0px;
          padding: 15px;
          box-sizing: border-box;
        }
        .podcast_topbar_right ul li {
          padding: 0;
          padding-bottom: 10px;
        }
        .podcast_page_section {
          display: block;
          width: 100%;
        }
        .podcast_section_left {
          width: 100%;
          padding: 0;
        }
        .podcast_section_left .podcast_box:nth-child(1) {
          margin-bottom: 15px;
        }
        .podcast_section_left .podcast_box:nth-child(1) figure {
          display: block;
        }
        .podcast_box figure {
          display: flex;
          align-items: end;
          position: relative;
        }
        .podcast_section_left .podcast_box:nth-child(1) .podcast_box_figure {
          padding: 0;
        }
        .podcast_box_figure {
          width: 100%;
          position: relative;
          padding-right: 10px;
        }
        .podcast_section_left .podcast_box:nth-child(1) .podcast_box_figure::before {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_3_1591698372.png);
          background-size: cover;
          background-position: center;
          height: 62px;
          bottom: -45px;
        }
        .podcast_box_figure::before {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_pwa_1591798318.png);
          width: 100%;
          content: "";
          position: absolute;
          bottom: -1px;
          height: 17px;
          left: 0;
          margin: auto;
          background-size: cover;
          background-position: center;
        }
        .podcast_section_left .podcast_box:nth-child(1) img {
          height: auto;
        }
        .podcast_box figure img {
          width: 100%;
          height: 95px;
          object-fit: cover;
        }
        .podcast_section_left .podcast_box:nth-child(1) .podcast_box_figure::after {
          width: 38px;
          height: 38px;
          background-size: 12px;
          left: 4px;
          bottom: 26px;
        }
        .podcast_box_figure::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          margin: auto;
          left: 0;
          border-radius: 100px;
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/podcast_icon_1591679506.png) #EB3D3C;
          background-size: 8px;
          background-repeat: no-repeat;
          background-position: center;
          z-index: 2;
          right: 7px;
          bottom: 8px;
        }
        .podcast_box figcaption {
          margin: 0;
          align-items: end;
          width: 100%;
        }
        .podcast_section_left .podcast_box:nth-child(1) ul.time_location {
          font-size: 12px;
          font-weight: bold;
        }
        ul.time_location {
          display: block;
          padding: 0;
          font-size: 11px;
          font-weight: normal;
          padding-top: 7px;
        }
        ul.time_location li {
          padding-bottom: 5px;
        }
        .podcast_section_left .podcast_box:nth-child(1) h2 {
          font-size: 20px;
          line-height: 27px;
          font-weight: bold;
          height: auto;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .podcast_box figcaption h2 {
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .podcast_container {
          width: 95%;
          margin: 0 2.5% 15px;
        }
        .podcast_topbar_right::after {
          bottom: -2px;
          width: 60px;
        }
        .podcast_section_left .podcast_box {
          width: 100%;
          padding: 0;
        }
        .podcast_box figcaption::after {
          display: none;
        }
        .podcast_section_left .podcast_box:nth-child(1) .podcast_box_figure::before {
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/subtraction_3_1591698372.png);
          background-size: cover;
          background-position: center;
          height: 62px;
          bottom: -27px;
        }
        .podcast_section_right {
          width: 100%;
        }
        .podcast_section_left .podcast_box:nth-child(1) figcaption::before {
          display: none;
        }
      }
      .time_location1 {
        padding-left: 10px;
        padding-right: 15px;
        display: block;
        width: 100%;
        list-style: none;
        letter-spacing: -.24px;
        color: #696969;
        text-transform: uppercase;
        font-size: 11px;
        font-weight: normal;
        margin-top: 5px;
        line-height: 15px;
        position: relative;
    }
    .time_location1:before {
        width: 6px;
        height: 6px;
        content: "";
        position: absolute;
        left: 0;
        background: #eb3d3c 0%0%no-repeat padding-box;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        top: 6px;
    }
      `}</style>
    </>
  );
};

export default React.memo(Podcast);
