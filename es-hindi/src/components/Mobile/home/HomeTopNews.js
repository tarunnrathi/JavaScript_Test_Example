import { logEvent } from "includes/googleAnalytic";
import parser from "html-react-parser";
import getConfig from "next/config";
import Glide from "@glidejs/glide";
import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import TrendStoryMob from 'components/Mobile/home/TrendStoryMob';
import HeadingH1 from "components/Mobile/HeadingH1";
import { getCompleteURL } from "util/global/Helper";
import Heading from "../Heading";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { getImage, getTitle } from "util/individual/Home";
import HomeStoryRefresh from "components/Common/HomeStoryRefresh";
import HomeLiveTv from "./HomeLiveTv";
import LazyLoad from "react-lazyload";

const { publicRuntimeConfig } = getConfig();
const topKhabare = (right, pageAds, isAmp = false, targetting, toggleRelatedArticle, trendStory={}, currentUrl='', { props = {}}, isBudget = false) => {
  useEffect(() => {
    setTimeout(() => {
      callSlider();
    }, 7000);
  }, []);
  const callSlider = () => {
    if (document.getElementsByClassName("ads-slider").length) {
      new Glide(".ads-slider", {
        autoplay: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
      }).mount();
    }
  };

  let checkLiveTvPoistion= props?.liveTvPosition != {} && props?.liveTvPosition?.live_tv == "true" && props?.liveTvPosition?.top_block_slot2 == true && !isBudget ? true :false;
  
  return (
    <div className="">
      <Heading
          categoryLink={publicRuntimeConfig.siteUrl+`news/`}
          heading={`ताज़ा समाचार`}
      />
      <div className="newstrendvideo-box">
        <ul className="global-storylist">
          {right?.length > 0 && right?.map((eachNews, index) => {
            //  const gifImg = eachNews?.gif_n18_images_s ? JSON.parse(eachNews?.gif_n18_images_s):"";
            //  const lazyImg =(gifImg != '' && gifImg != null && gifImg?.url) ? gifImg?.url : eachNews?.images.url;
            const lazyImg = getImage(eachNews);
             const second_image = "";
            return (
              <>
                <li
                  key={`mobileBottomList-` + index + `-` + eachNews?.story_id}
                >
                  <a
                    href={getCompleteURL(
                      eachNews.weburl_r || eachNews.web_url_r,
                      eachNews.weburl || eachNews.web_url,
                      isAmp
                    )}
                  >
                    <h3>
                      {eachNews?.liveblog_switcher ? (
                        <span className="livenow_btn">Live</span>
                      ) : null}
                      {getTitle(eachNews)} {eachNews.isNew ? <span className="just-in">JUST IN</span> : ""}
                    </h3>
                    {isAmp ? (
                      <figure>
                        {eachNews?.ff_source &&
                        eachNews?.ff_source == "Hyperlocal" ? (
                          <span className="nwvideoicon"></span>
                        ) : (
                          ""
                        )}
                        <LazyLoadImage
                          src={lazyImg}
                          width={104}
                          height={70}
                          alt={getTitle(eachNews)}
                          title={getTitle(eachNews)}
                          isAMP={true}
                        />
                      </figure>
                    ) : (
                      <div style={{ position: "relative" }}>
                        {eachNews?.ff_source &&
                        eachNews?.ff_source == "Hyperlocal" ? (
                          <span className="nwvideoicon"></span>
                        ) : (
                          ""
                        )}
                        <div className="globalmgbox">
                          <figure>
                            <LazyLoadImage
                              src={lazyImg}
                              width={104}
                              height={70}
                              alt={getTitle(eachNews)}
                              title={getTitle(eachNews)}
                            />
                          </figure>
                        </div>
                      </div>
                    )}
                    {second_image}
                  </a>
                  {eachNews?.showRelatedArticle &&
                    eachNews?.related_story &&
                    Array.isArray(eachNews?.related_story) &&
                    eachNews?.related_story?.length > 0 && (
                      <>
                        <div
                          id={`right${index}`}
                          className="rltdnwsclick"
                          onClick={() =>
                            toggleRelatedArticle(
                              `right${index}`,
                              getTitle(eachNews),
                              eachNews.story_id
                            )
                          }
                          role="button"
                          tabIndex={"0"}
                          on={`tap:relatedContentR${index}.toggleClass(class="active-related-article")`}
                        >
                          संबंधित खबरें
                        </div>
                        <div
                          className="rltdnws-content"
                          id={"relatedContentR" + index}
                        >
                          <div className="rltdnws">
                            {(eachNews?.related_story).map(
                              (eachItem, index) => {
                                return (
                                  <>
                                    {eachItem && (
                                      <a
                                        key={
                                          `eachIte-${index}` +
                                          eachItem?.story_id
                                        }
                                        href={`${eachItem?.url}?ref=hp_related_stories`}
                                        id={`eachRelItem`}
                                        onClick={() =>
                                          logEvent(
                                            "hp_related_story",
                                            "click",
                                            eachItem?.url
                                          )
                                        }
                                      >
                                        {parser(eachItem?.title || "")}
                                      </a>
                                    )}
                                  </>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </>
                    )}
                </li>
                {index == 4 && (
                  <>
                    {!isAmp ? (
                      <>
                        <li
                          style={{ height: "85px" }}
                          key={`mobileBottomListAdd1-` + index}
                        >
                          <NewSiteAd                                    
                            slotId={"mobileAdNew300x250_2"}
                            adUnit={pageAds.mobile_third}
                            sizes={[["fluid"]]}                                    
                            loadOnScroll={true}
                            removeAdSpan={true}
                          ></NewSiteAd>
                        </li>
                        <li style={checkLiveTvPoistion ? { display : "block" } : { display : "none" }}>
                        {checkLiveTvPoistion &&
                          <LazyLoad height={598} once>
                            <HomeLiveTv props={props} />
                          </LazyLoad>
                        }
                        </li>
                         <li
                          style={{ textAlign: "center", padding: 0 }}
                          key={`mobileBottomListAdd2-` + index}
                        >
                          <div className="ads-slider">
                            <div data-glide-el="track">
                              <ul>
                                <li className="glide__slide">
                                  <NewSiteAd
                                    slotId={"NW18_HIND_HP_ATF_SLUG_300"}
                                    adUnit={pageAds.ATF_SLUG_300_id}
                                    sizes={[[300, 100]]}
                                    width={300}
                                    lazyLoad={true}
                                    removeAdSpan={true}
                                  ></NewSiteAd>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>                        
                      </>
                    ) : (
                      <>
                        <li
                          style={{ minHeight: "85px" ,width: "100%"}}
                          key={`mobileBottomListAdd3-` + index}
                        >
                          <amp-ad
                            height={85}
                            type="doubleclick"
                            data-lazy-fetch="true"
                            data-loading-strategy="1"
                            data-multi-size-validation="false"
                            data-slot={`/1039154/${pageAds.mobile_third}`}
                            data-multi-size="fluid"
                            className={"mobile_native"}
                            json={JSON.stringify(targetting || "")}
                            rtc-config='{
                              "vendors": {
                                  "openwrap": {
                                      "PROFILE_ID" : "2059",
                                      "PUB_ID" : "113941"
                                  },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
                              },
                              "timeoutMillis": 1000
                           }'
                          ></amp-ad>
                        </li>
                        {/* <li
                          style={{ minHeight: "200px" ,width: "250px"}}
                          key={`mobileBottomListAdd3-` + index}
                        >
                          <amp-ad
                            height={200}
                            type="doubleclick"
                            data-lazy-fetch="true"
                            data-loading-strategy="1"
                            data-multi-size-validation="false"
                            data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_HOME_AMP/NW18_HIND_HOME_HOME_AMP/NW18_HIND_AMP_HP_NAT1"
                            //data-slot={`/1039154/${pageAds.mobile_third}`}
                            data-multi-size="fluid"
                            className={"mobile_native"}
                            json={JSON.stringify(targetting || "")}
                            rtc-config='{
                              "vendors": {
                                  "openwrap": {
                                      "PROFILE_ID" : "2059",
                                      "PUB_ID" : "113941"
                                  }
                              },
                              "timeoutMillis": 1000
                           }'
                          ></amp-ad>
                        </li> */}
                        <li className="ad">
                          <amp-ad
                            width={300}
                            height={100}
                            type="doubleclick"
                            data-loading-strategy="prefer-viewability-over-views"
                            data-multi-size-validation="false"
                            data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_HOME_AMP/NW18_HIND_HOME_HOME_AMP/NW18_HIND_AMP_HP_ATF_SLUG_300"
                            data-multi-size="300x100"
                            json={JSON.stringify(targetting || "")}
                            rtc-config='{
                                  "vendors": {
                                      "openwrap": {
                                          "PROFILE_ID" : "2059",
                                          "PUB_ID" : "113941"
                                      },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
                                  },
                                  "timeoutMillis": 1000
                              }'
                          ></amp-ad>
                        </li>
                      </>
                    )}
                  </>
                )}
              </>
            );
          })}
        </ul>
        <a href={publicRuntimeConfig.siteUrl +"news/"} className="aurparhenbtn" onClick={() => ga('send', 'event',  "NEWS18 Hindi Trending", 'Click',"Read more")}>
          और भी पढ़ें
        </a>
      </div>
      <TrendStoryMob trendStory ={trendStory} currentUrl={currentUrl} isAmp={true}/>
      {!isAmp && (<InView
      as="div"
      threshold={0.1}
      onChange={(inView, _, entry) =>
        inView &&
        logEvent('WhatsApp Banner', 'Impression', `WhatsApp Banner – Homepage`)
      }
      >
      </InView>)}
      <div id="minis_ajax_div"></div>
    </div>
  );
};

const HomeTopNews = (props) => {
  const {
    props: { topHomeNews, pageAds },
    isAmp = false,
    adTwo,
    isBudget = false
  } = props;
  const [getTopNews, setGetTopNews] = useState(topHomeNews?.stories || [])

  useEffect(() => {
    setGetTopNews(topHomeNews?.stories || []);
  }, [topHomeNews])

  const topStoryLoadCB = (data) => {
    setGetTopNews(data?.stories || [])
  }

  let previous = '';
  const toggleRelatedArticle = (e, slug='', story_id='') => {
    ga('send', 'event', 'related_news', 'click', slug+","+story_id.split("-")[1]);
    if (previous && previous !== e) {
      document.getElementById(`${previous}`).classList.remove('adcls');
      document.getElementById(`${previous}`).nextElementSibling?.classList?.remove("active-related-article");
    }
    previous = e;
    document.getElementById(`${e}`).classList.toggle('adcls');
    document.getElementById(`${e}`).nextElementSibling?.classList?.toggle("active-related-article");
  };
  let left = getTopNews?.length >0 ? getTopNews?.slice(0, 1): [];
  const right = getTopNews?.length >0 ? getTopNews?.slice(1, 13) : [];
  const targetting = {
    targeting: pageAds.setTargetingValues,
  };
  left = left.filter(Boolean);
  const src = getImage(left[0]);

  return (
    <>
      {!isAmp && <HomeStoryRefresh storyCount={13} isMobile={true} topHomeNews={{stories: getTopNews}} topStoryLoadCB={topStoryLoadCB}/>}

      {
        left && left.length === 1 && (
          <>
            <HeadingH1
                heading={`TOP HINDI NEWS`}
            />
            <div className="bigstory" id="hometopnews" key="hindiTopNews">
              <a
                href={getCompleteURL(left[0].weburl_r || left[0].web_url_r, left[0].weburl || left[0].web_url, isAmp)}
              >
                <div className="topimage" style={isAmp ? { width: "100%", background: "#eee" } : { background: "#eee" }}>
                  {isAmp ? (
                    <figure>
                      <LazyLoadImage
                        src={getImage(left[0])}
                        width={420}
                        height={267}
                        alt={getTitle(left[0])}
                        title={getTitle(left[0])}
                        isAMP={true}
                      />
                    </figure>
                  ) : (
                    <span>
                      {(left[0]?.ff_source && left[0]?.ff_source=='Hyperlocal') && <span className="nwvideoicon"></span>}
                      <LazyLoadImage
                          src={src}
                          width={420}
                          height={267}
                          alt={getTitle(left[0])}
                          title={getTitle(left[0])}
                        />
                    </span>
                  )}
                </div>
              </a>
              <h2>
                <a href={getCompleteURL(left[0].weburl_r || left[0].web_url_r, left[0].weburl || left[0].web_url, isAmp)}>
                  {left[0]?.liveblog_switcher === 1 && <span className='livenow_btn'>Live</span>}
                  {getTitle(left[0])} {left[0].isNew ? <span className="just-in">JUST IN</span> : ""}
                </a>
                {
                  left[0]?.showRelatedArticle && left[0]?.related_story && Array.isArray(left[0]?.related_story) && left[0]?.related_story?.length &&
                    <>
                      <div id={`idx`} className="rltdnwsclick" onClick={() => toggleRelatedArticle(`idx`, getTitle(left[0]), left[0].story_id)} role="button" tabIndex={'0'} on={`tap:relatedContentR.toggleClass(class="active-related-article")`}>संबंधित खबरें</div>
                      <div className="rltdnws-content" id={"relatedContentR"}>
                        <div className="rltdnws first-li">
                          {
                            (left[0]?.related_story).map((eachItem, index) => {
                              return <React.Fragment key={`eachItem-${index}`+eachItem?.story_id}>
                                {eachItem &&
                                  <a key={`eachItem-${index}`+eachItem?.story_id} href={`${eachItem?.url}?ref=hp_related_stories`} onClick={() => logEvent('hp_related_story', 'click', eachItem?.url)} >{parser(eachItem?.title || '')}    </a>}
                              </React.Fragment>;
                            })
                          }
                        </div>
                      </div>
                    </>                    
                }
              </h2>
            </div>
            {!isAmp ? (
              adTwo
            ) : (
              <div className="clearfix add">
                <div className="addinner-box addinner_box_300x250">
                  <span id="first">विज्ञापन</span>
                  <amp-ad
                    width={336}
                    height={280}
                    type="doubleclick"
                    data-lazy-fetch="true"
                    data-loading-strategy="1"
                    data-multi-size-validation="false"
                    data-slot="/1039154/NW18_HIND_AMP/NW18_HIND_HOME_AMP/NW18_HIND_HOME_HOME_AMP/NW18_HIND_AMP_HP_ATF_320"
                    data-multi-size="300x250"
                    json={JSON.stringify(targetting || "")}
                    rtc-config='{
                        "vendors": {
                            "openwrap": {
                                "PROFILE_ID" : "2059",
                                "PUB_ID" : "113941"
                            },"aps":{
                  "PUB_ID": "600",
                  "PUB_UUID":"779bdaf2-7955-402f-9476-b0a531d45eaa",
                  "PARAMS":{"amp":"1"}
                  }
                        },
                        "timeoutMillis": 1000
                    }'
                  ></amp-ad>
                </div>
              </div>
            )}
          </>
        )
      }
      {right.length && topKhabare(right, pageAds, isAmp, targetting, toggleRelatedArticle, props.trendStory, props.currentUrl, props, isBudget)}
      <style jsx global>{`
        .rltdnws.first-li{border: none;}
        .rltdnws-content{max-height: 0px; overflow: hidden; margin-top: 5px;transition: 0.3s ease-in-out;}
        .rltdnwsclick{cursor: pointer;color: #ed1c24;text-align: center;text-transform: uppercase;font-size: 11px;font-family: arial;font-weight: bold;padding-top: 2px;}
        .rltdnwsclick:before{content: "";border-left: 2px solid #ed1c24;border-bottom: 2px solid #ed1c24;width: 4px;height: 4px;display: inline-block;position: relative;top: -2px;transform: rotate(-45deg);margin-right: 5px;}
        .rltdnwsclick.adcls:before{transform: rotate(-225deg);top: 0px;}
        .rltdnws{border: 1px solid #777;border-bottom-width: 3px;border-right-width: 4px;background: #fff;padding: 8px 10px 0  10px;box-shadow: 0px 2px 4px #ccc;}
        .rltdnws a{position: relative;font-size: 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width:450px; display: block${isAmp ? "" : "!important"};color: #333${isAmp ? "" : "!important"};margin-bottom: 5px;line-height: 18px;}
        .rltdnws a:before{content: "";width: 5px;height: 5px;background: #ed1c24;display: inline-block;border-radius: 100%;position: relative;top: -2px;margin-right: 8px;}
        .rltdnws a:hover{color: #ed1c24 ${isAmp ? "" : "!important"};}
        .topnews-left-list li:first-child .rltdnws {margin: 0px 15px 0 50px;}
        .topnews-left-list li:first-child .rltdnws a{width: 410px;}
        .top-kharein li .rltdnws a{width: 380px}
        .topnews-left-list li:last-child {padding-bottom: 5px;}
        .rltdnws-content.active-related-article {max-height: 150px; transition: 0.3s ease-in-out; }
        .just-in {
          background: #f3f3f3;
          color: #ed1c25;
          font: normal normal bold 11px / 18px Mukta;
          padding: 0px 6px;
          border-radius: 4px;
          vertical-align: top;      
        }
        .rltdnws-content .rltdnws a{
          white-space: pre-wrap;
          width: 100%;
        }
        .expand {
          left: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
          right: 50%;
          width: 100vw;
          position: relative;
        }
        .hd_heading {
          font-size: 20px;
          font-weight: bold;
          display: block;
          width: 100%;
          background: #fff;
          ${isAmp ? "padding: 10px;" : "padding: 6px 14px 0;"}
          line-height: 18px;
          box-sizing: border-box;
          ${isAmp ? "" : "margin: 6px 0;"}
        }
        .hd_heading h1 {
          font-weight: bold;
          font-size: 20px;
          display: inline-block;
        }
        .bigstory {
          clear: both;
          background: #f3f3f3;
          position: relative;
          min-height: 267px;
        }
        .bigstory > span {
          background: #dc2c33;
          color: #fff;
          font-size: 14px;
          top: 5px;
          position: absolute;
          z-index: 1;
          left: 5px;
          padding: 4px 15px 1px 15px;
        }
        .bigstory figure {
          position: relative;
          overflow: hidden;
          line-height: 0;
          width: 100%;
        }
        .bigstory figure img{
          width: 100%;
        }
        .bigstory h1,
        .bigstory h2 {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, #111, #000);
          background: -webkit-linear-gradient(transparent, #111, #000);
          background: -moz-linear-gradient(transparent, #111, #000);
          padding: ${isAmp ? "45px 15px 10px" : "45px 20px 10px 20px"};
          z-index : 99
        }
        .bigstory h1 a,
        .bigstory h2 a {
          display: block;
          font-size: 18px;
          line-height: 24px;
          color: #fff;
          font-weight: 700;
        }
        .myupchar_logo {
          position: absolute;
          right: 0;
          background: #fff;
          border-radius: 0px 0px 0px 10px;
          top: 0;
          padding: 7px 5px;
          width: 105px;
          box-sizing: border-box;
        }
        .myupchar_logo img {
          width: 100%;
          display: block;
        }
        .container {
          padding: ${isAmp ? "10px 15px" : "0 10px"};
          position: relative;
        }
        .globalhd-nav {
          border-bottom: 1px solid #001536;
          position: relative;
          display: flex;
          width: 100%;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .jstcntspcbtwn {
          justify-content: space-between;
        }
        .globalhd-nav li.active,
        .globalhd-nav li.active a {
          color: #ef3038;
          font-weight: 700;
          font-size: 18px;
        }
        /* width: 33.33%; */
        .globalhd-nav li {
          position: relative;
          top: 5px;
          line-height: 30px;
          text-align: center;
          color: #555;
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          flex-shrink: 0;
        }
        .globalhd-nav li.active:before {
          content: "";
          height: 3px;
          background: #ef3038;
          position: absolute;
          left: 0;
          bottom: -2px;
          right: 0;
        }
        .newstrendvideo-box {
          display: block;
        }
        .global-storylist {
          margin-bottom: 10px;
        }
        ul.global-storylist li {
          position: relative;
        }
        .global-storylist li {
          font-size: 16px;
          ${isAmp ? `line-height: 21px; font-weight: bold;` : `line-height: 20px;`}
          padding: 12px 10px;
          width: 100%;
          border-bottom: 1px solid #ccc;
        }
        .global-storylist li a {
          display: flex;
          ${isAmp ? "align-items: flex-start; font-weight: bold;" : "align-items: center;"}
          color: #222;
          font-weight: bold;
        }
        .global-storylist li figure amp-img {border-radius: 4px; width:80px;}
        .global-storylist li figure {
          position:relative;
          width: 104px;
          height: 70px;
          background: #eee;
          flex-shrink: 0;
          border-radius: 4px;
          margin-right: 10px;
          ${isAmp ? "margin-left: 10px;" : "margin-right: 0;"}
          
        }
        .globalmgbox {
          position: relative;
          overflow: hidden;
          line-height: 0;
        }
        ul.global-storylist li h3 {
          font-size: 16px;
          ${isAmp ? "line-height: 21px;" : ""}
          font-weight: normal;
          width: calc(100% - 80px);
          padding-right: 5px;
          white-space: break-spaces;
        }
        .aurparhenbtn {
          color: #ed1c24;
          border: 1px solid #ed1c24;
          border-radius: 20px;
          height: 26px;
          line-height: 26px;
          font-weight: 700;
          font-size: 14px;
          outline: 0;
          box-sizing: border-box;
          display: block;
          margin: ${isAmp ? "15px auto 30px auto" : "15px auto 20px auto"};
          width: 105px;
          overflow: hidden;
          text-align: center;
        }
        .bigstory > span.pb4 {
          padding: 4px 15px 4px 15px;
        }
        .add {
          background: #dbdde3 ${!isAmp ? "!important" : ""};
        }
        .add,
        .add2 {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          z-index: 1;
        }
        .clearfix:after,
        .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .addinner-box {
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
        }
        .addinner-box span {
          color: #797e90;
          font-size: 11px;
          text-align: center;
          padding: 2px 0 0;
          display: block;
          line-height: 16px;
        }
        .mobile_native {
          width: 331px;
          max-height: 91px;
          overflow: hidden;
          margin: 0 auto;
        }
        #newstrendvideo h2 {
          font-size: 18px;
          font-weight: bold;
        }

        .ads-slider {
            overflow: hidden;
            position: relative;
            height:120px;
        }
        .ads-slider ul {
            margin-top: 10px;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
        }
        .ads-slider ul li{
            border-bottom: none;
            padding: 0;
        }
        .livenow_btn {
          background: #ED1C24;
          color: #fff;
          border-radius: 2px;
          font-size: 11px;
          text-transform: uppercase;
          padding: 3px 7px 2px 23px;
          font-weight: bold;
          margin-right: 5px;
          position: relative;
          bottom: 2px;
        }
        .livenow_btn:after, .livenow_btn:before {
          content: "";
          position: absolute;
          opacity: 0;
          box-sizing: border-box;
          top: ${isAmp ? '6px' : '5px'};
          left: 6px;
          width: 12px;
          height: 12px;
          border: 2px solid #fff;
          box-shadow: 0 0 10px #fff, inset 0 0 10px #fff;
          border-radius: 100px;
          background-clip: padding-box;
        }
        .livenow_btn:before {
          z-index: 2;
          -webkit-animation: blinker 2s infinite;
          animation: blinker 2s infinite;
        }
        .liveadj {bottom: 7px;}
          .livenow_btn:after {
            z-index: 1;
            -webkit-animation: blinker 2s infinite 1s;
            animation: blinker 2s infinite 1s;
          }
          @keyframes blinker{0%{-webkit-transform:scale(0);opacity:0;}50%{opacity:1;}to{-webkit-transform:scale(1);opacity:0;}}

          .bigstory h2 .rltdnws-content a {
            color : ${isAmp ? '#222' : ''}; 
          }
          .global-storylist li .rltdnws-content a {
            flex-direction : ${isAmp ? 'row' : ''};
          }

          .rltdnws-content .rltdnws a:before {
            top : ${isAmp ? '6px' : ''};
          }

          #whatsappBanner{
           width: 100%;
          }
          .nwvideoicon {
            width: 45px;
            height: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            margin: -22px 0 0 -22px;
            cursor: pointer;
            opacity: .8;
            background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;
            transform:scale(.7)
          }
          .topimage img {width: 100%}
          .ad amp-ad{margin: 0 auto; display:block}
      `}</style>
    </>
  );
};

export default HomeTopNews;
