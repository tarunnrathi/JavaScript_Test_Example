import ImpactShortMainBody from "components/ShortNews/MainBody";
import impactShortProps from "../../helper/shortNewsProps";
import SiteSeo from "widgets/Common/Responsive/SiteSeo";
import INIT_OOP_Manager from "components/Common/INIT_OOP_Manager";
import NewRelicRum from "components/Common/NewRelicRum";
import NewRelicEvents from "components/Common/NewRelicEvents";
import Head from "next/head";
import LazyLoadImage from "components/Common/CustomImage";
import { useEffect, useState } from "react";
import { initGA, logEvent, logPageViewUpdated } from "includes/googleAnalytic";
const shortNewsCategory = [
  { url: "/short-news/entertainment/", value: "entertainment", title: "मनोरंजन", icon: "/images/impactShort/manoblack.svg" },
  { url: "/short-news/cricket/",value: "cricket", title: "क्रिकेट", icon: "/images/impactShort/cricket.svg" },
  { url: "/short-news/business/",value: "business", title: "मनी", icon: "/images/impactShort/money.svg" },
  { url: "/short-news/lifestyle/",value: "lifestyle", title: "लाइफ़", icon: "/images/impactShort/life.svg" },
  { url: "/short-news/tech/",value: "tech", title: "मोबाइल टेक", icon: "/images/impactShort/tech.svg" },
  { url: "/short-news/nation/",value: "nation", title: "देश", icon: "/images/impactShort/desh.svg" },
  { url: "/short-news/crime/",value: "crime", title: "क्राइम", icon: "/images/impactShort/crime.svg" },
  { url: "/short-news/knowledge/",value: "knowledge", title: "नॉलेज", icon: "/images/impactShort/knowledge.svg" },
  { url: "/short-news/health/",value: "health", title: "हेल्थ", icon: "/images/impactShort/health.svg" },
  { url: "/short-news/career/",value: "career", title: "करियर", icon: "/images/impactShort/carrer.svg" },
  { url: "/short-news/ajab-gajab/",value: "ajab-gajab", title: "अजब गजब", icon: "/images/impactShort/agj.svg" },
  { url: "/short-news/jobs/",value: "jobs", title: "नौकरी", icon: "/images/impactShort/job.svg" },
  { url: "/short-news/astro/",value: "astro", title: "राशि", icon: "/images/impactShort/israshi.svg" },
]
export default function ImpactShortPage({ pageData, chartbeat }) {
  const [isLoadTips, setIsLoadTips] = useState(false);
  const getLatestNewsWithAd = (newsArray) => {
    const latestNewsWithAd = [];
    newsArray.forEach((news, index) => {
      if (index > 0 && index % 3 === 0) {
        latestNewsWithAd.push({ isAd: true, story_id: news.story_id });
        latestNewsWithAd.push(news);
      } else {
        latestNewsWithAd.push(news);
      }
    });
    return { latestNewsWithAd, newsArray };
  };
  const [latestNewsData, setLatestNewsWithAds] = useState(
    getLatestNewsWithAd(pageData.latestNews)
  );
  const GA4AndPvFireFunction = (news) => {
    ga("send", "pageview");
    logPageViewUpdated(
      news || {},
      "short news",
      "short news page",
      "No video player",
      "No video",
      true
    );
  };
  useEffect(() => {
    const isTipsLoaded = localStorage.getItem("isTipsLoaded"); // true
    if (!isTipsLoaded) {
      setIsLoadTips(true);
    }
    initGA();
    GA4AndPvFireFunction(pageData.latestNews?.[0] || {});
  }, []);
  const handleOnGotItClick = () => {
    localStorage.setItem("isTipsLoaded", true);
    setIsLoadTips(false);
    logEvent(
      "io_shortnews",
      pageData.isMobile ? "tap" : "click",
      pageData.isMobile ? "mobile" : "desktop"
    );
  };
  const currentShortNews = shortNewsCategory.find(itm => itm.value === pageData.category)
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js" async />
      </Head>
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isHome={true}
        chartbeat={chartbeat}
      />
      <NewRelicRum />
      <NewRelicEvents />
      <INIT_OOP_Manager pageAds={pageData.pageAds} isMobile={false} />
      <SiteSeo
        pageSeo={pageData.pageSeo}
        url={pageData.currentUrl}
        isShortVideos={true}
        chartbeat={chartbeat}
      />
      {/* Tips HTML Start */}
      {isLoadTips && pageData.isMobile && (
        <div className="tipswrap">
          <h1>
            {" "}
            NEWS18 प्रेजेंट्स{" "}
            <img
              src="/images/impactShort/Impact-shorts.svg"
              height={108}
              width={303}
              alt="short-news-logo"
            />
          </h1>
          {/* <span className="sectxt">
            शॉर्ट न्यूज़
            <br /> अब आपके फिंगर
            <br /> टिप्स पर
          </span> */}
          <div className="mdlwrap">
            <img
              src="/images/impactShort/Swipe-Hand.svg"
              width={"50%"}
              alt="impact-short-logo"
            />
          </div>
          <div className="btmwrp">
            <span>
              अगली शॉर्ट न्यूज़ <br /> पढ़ने के लिए ऊपर स्वाइप करें
            </span>
            <a className="ctatips" onClick={handleOnGotItClick}>
              Got it!
            </a>
          </div>
        </div>
      )}
      {/* Tips HTML Ends */}
      <div className="nws_hdr">
        <div className="sht_hdr_lhs">
          <a className="nws_hdrlgo" href="/short-news/">
            <LazyLoadImage
              src="/images/impactShort/Impactshorts.svg"
              width={pageData.isMobile ? 89 : 140}
              height={pageData.isMobile ? 32 : 50}
              isLazyLoad={false}
              className={"nw_lgo"}
            />
          </a>
        </div>
        <div className="nws_menu">
          
          {pageData.isMobile ? <div className="newchoosecitywrap">
            <a href="#" className="newchoosecitybtn">{currentShortNews?.title || "Choose Category"}</a> 
            <div className="newhdrlnghover">
              <ul>
              {shortNewsCategory.map((itm,index) => (
                <li key={`it-${index}`} className={pageData.category === itm.value ? "active" : ""}>
                  <a href={itm.url}>
                    <span>
                      {/* <img src={itm.icon}></img> */}
                    </span>{itm.title}</a>
                </li>
              ))}
              </ul>
            </div>
          </div> : <ul>
            {
              shortNewsCategory.slice(0,9).map((itm,index) => (
                <li key={`itm-${index}`} className={pageData.category === itm.value ? "active" : ""}>
                  <a href={itm.url}>
                    <span>
                      <img src={itm.icon}></img>
                    </span>{itm.title}</a>
                </li>
              )) 
            }
            
            <li>
                <div className="newchoosecitywrap">
                  <a href="#" className="newchoosecitybtn">{shortNewsCategory.slice(9,13).find(itm => itm.value === pageData.category)?.title || "More"}</a> 
                  <div className="newhdrlnghover">
                    <ul>
                    {shortNewsCategory.slice(9,13).map((itm,index) => (
                        <li className={pageData.category === itm.value ? "active" : ""} key={"shortNewsCategory"+index}>
                          <a href={itm.url}>
                            <span>
                              <img src={itm.icon}></img>
                            </span>{itm.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
          </ul>}
        </div>
        <div className="sht_hdr_rhs">
          <a className="nws_hdrgo" href="/">
            <LazyLoadImage
              src="/images/impactShort/nw_logo.svg"
              width={pageData.isMobile ? 104 : 185}
              height={pageData.isMobile ? 28 : 50}
              isLazyLoad={false}
              className={"nw_lgo"}
            />
          </a>
        </div>
      </div>
      <div className="nw_sht">
        
        <ImpactShortMainBody
          latestNews={pageData.latestNews}
          isMobile={pageData.isMobile}
          slug={pageData.webSlug}
          shortNewsCat={currentShortNews}
          category={pageData.category}
          setLatestNewsWithAds={setLatestNewsWithAds}
          latestNewsData={latestNewsData}
          getLatestNewsWithAd={getLatestNewsWithAd}
        />
      </div>
      <style jsx global>{`
          h1, h2, h3, h4, h5, h6, div, section, article, aside, figure, p, ul, li, form {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          li{list-style: none;}
          .nw_sht {
            align-items: center;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            padding: 10px 30px 19px;
          }
        .nws_hdr {
          display: flex;
          justify-content: space-between;
          margin: 0 0 15px;
          align-items: center;
          // width: 100%;
          padding: 7px 35px;
          box-shadow: 0px 5px 14.800000190734863px 0px #0000001f;
          background-color: #F5F5F5;
        }
        .nws_hdrlgo {
          display: block;
        }
        .nw_lgo {
          max-width: 98px;
        }
        .nws_hdrgo {
          border-radius: 4px;
          color: #000000;
          display: flex;
          flex-shrink: 0;
          font-size: 24px;
          justify-content: center;
          white-space: nowrap;
          text-decoration: none;
          align-items: baseline;
        }
        .nws_hdrgo .nw_lgo {
          margin-left: 4px;
          max-width: 130px;
        }
        .nws_menu ul {
          display: flex;
          align-items: center;
          position: relative;
        }
        .nws_menu ul li {
          margin-right: 25px;
        }
        .nws_menu ul li a {
          font-size: 16px;
          line-height: 19px;
          color: #404040;
          text-decoration: none;
        }
        .nws_menu ul li.active a{color:#EC2028;}
        .nws_menu ul li a span {
          margin-right: 8px;
          vertical-align: bottom;
        }
        .nws_menu ul li a span img {
          width: 24px;
          height: 18px;
          vertical-align: middle;
        }
        .nws_menu ul li:last-child {
          margin: 0;
        }
        .nws_menu {
          margin: 0 auto;
      }
      .newchoosecitywrap:hover .newchoosecitybtn{border-radius: 4px; background: #fff;}
			.newchoosecitywrap:hover .newhdrlnghover{    visibility: visible;
        background: #F2F2F2;
        top: 29px;
        right: 0;
        width: 50%;
        position: absolute;    border: 1px solid #0000001A; padding: 20px;}
			.newhdrlnghover div{height: 190px;overflow: auto; width: 111%;}
			.newchoosecitywrap .newiconsprite.newarrow{background-position: -250px 0px; right: 10px;}
      // .newchoosecitywrap{position:relative;}
      .newchoosecitybtn {
        line-height: 25px!important;
        width: 100px;
        height: 25px;
        border-radius: 6px;
        display: block;
        padding: 0px 0px 0 13px;
        position: relative;
        background-color: #fff;
        border: 0.5px solid#ededed;
        font-weight: 500;
        text-decoration: none;
      }
      .newhdrlnghover {
        position: absolute;
        overflow: hidden;
        background: #fff;
        top: 20px;
        box-shadow: 0px 2px 4px #0000001a;
        // border: 1px solid #C4C4C4;
        border-radius: 0 0 4px 4px;
        visibility: hidden;
        right: -1px;
        border-top: none;
        z-index: 90;
      }
      .newchoosecitybtn:after {
        content: "";
        right: 9px;
        background: url(/images/impactShort/expand.svg)0 0 no-repeat;
        width: 16px;
        height: 13px;
        position: absolute;
        top: 5px;
        background-size: 18px;
        }
        .newchoosecitywrap:hover .newhdrlnghover ul {
          width: 100%;
          margin: 0 auto;
          padding: 0;
          font-size: 0;
          z-index: 100;
          display: block;
      }
      .newchoosecitywrap:hover .newhdrlnghover ul li {
        display: inline-block;
        margin: 10px 19px;
        cursor:pointer;
    }
        @media (max-width: 767px) {
          body {
            background-color: #f5f5f5;
          }
          .nw_sht {
            background-color: #f5f5f5;
            padding: 5px 15px 15px;
            height: 100%;
          }
          .sht_hdr_rhs {
            display:none;
          }
          .nws_hdr {
            width: 100%;
            padding: 10px 30px 10px 20px;
            align-items: center;
          }
          .nw_lgo {
            max-width: 56px;
          }
          .newchoosecitybtn span {
            vertical-align: middle;
          }
          .nws_menu{margin:0;}
          .newchoosecitybtn {
            color: #EC2028;
            font-size: 15px;
            font-weight: bold;
            width: 130px;
            height: 30px;
            line-height: 32px !important;
            padding: 0 11px;
          }
          .newchoosecitybtn img{    width: 20px;
            height: 15px;
            vertical-align: text-top;
            margin-right: 8px;}
            .newchoosecitybtn:after{    top: 7px;}
            .newhdrlnghover, .newchoosecitywrap:hover .newhdrlnghover{z-index: 99;}
            .nws_menu .newchoosecitywrap:hover .newhdrlnghover ul {
              display: block !important;
              border: 0.5px solid #EDEDED;
              border-top: 0;
            }
            .newchoosecitywrap:hover .newhdrlnghover ul li{ 
              padding: 10px 12px;
              margin: 0;
              border-top: 0.5px solid #EDEDED;
              display: block;
            }
            .newchoosecitywrap:hover .newhdrlnghover{
              top: 30px;
              box-shadow: none;
              border: none;
              width: 145px;    padding: 0;
            }
            .nws_menu ul li a span img {
              width: 20px;
              height: 15px;
            }
            .newchoosecitywrap {
              position: relative;
          }
        }
        // Tips CSS Starts..
        .tipswrap {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          height: 100%;
          background-color: #070707b3;
          z-index: 111;
          color: #fff;
          padding: 0 20px;
        }
        .tipswrap h1 {
          text-align: center;
          font-size: 44px;
          margin-bottom: 10px;
        }
        .sectxt {
          font-size: 34px;
          display: block;
          text-align: right;
          line-height: 1.5;
        }
        .btmwrp {
          position: absolute;
          bottom: 10px;
        }
        .mdlwrap {
          text-align: center;
          margin: 25px 0;
        }
        .btmwrp {
          position: absolute;
          bottom: 10px;
          text-align: center;
          left: 0;
          right: 0;
          padding: 0 20px;
        }
        .btmwrp span {
          font-size: 27px;
          line-height: 1.3;
          margin-bottom: 20px;
          display: block;
        }
        .ctatips {
          background: #1d8cbe;
          border: 4px solid #ffffff;
          border-radius: 10px;
          width: 55%;
          display: table;
          margin: auto;
          color: #fff;
          font-size: 34px;
          text-align: center;
          font-weight: bold;
          padding: 6px;
        }
        // Tips CSS Ends..
      `}</style>
    </>
  );
}
export async function getServerSideProps(context) {
  return await impactShortProps(context);
}