import React, { useState } from "react";
import dynamic from "next/dynamic";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
// import { isEmpty } from 'underscore';
import { Waypoint } from "react-waypoint";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const OutbrainWidget = dynamic(() =>
  import("widgets/Common/Responsive/Outbrain")
);

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const IMAGEURL = "https://images.news18.com/static_news18/pix/ibnhome/news18/";
const defaultImg64_110x73 =
  "data:image/jpeg;base64,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";
const ResultsComponent = (props) => {
  const { data = {}, pageAds = {} } = props;

  //Current page URL
  const pageurl = "https://www.hindi.news18.com/cricket/result/";

  const {
    isIPL2022,
    recentMatchData,
    upcommingMatchData,
    predictorData,
    RecentMatchresult = {},
  } = data;

  if (Object.keys(props.data?.RecentMatchresult).length != 0) {

    // If  recent matches found
    const h1_tag_set = "मैच के नतीजे";
    const [updatedResults, setResults] = useState(RecentMatchresult);

    // grouping the matches according to seriesname
    // var update_result_set = groupByKey(updatedResults, "seriesname");
    // var update_result_set_array = Object.entries(update_result_set);

    const update_result_set_array_length = updatedResults.length;
    const [hasMoreItems, setHasMoreItems] = useState(
      update_result_set_array_length
    );
    const [perPage, setPerPage] = useState(3);
    const [Page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);

    const team_default_image =
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/DefaultFlag-90x50-new.png";
    const league_type = "";
    const TEAMICON =
      "https://xmlns.cricketnext.com/cktnxt/scorecard/crk_player_images/flags/160x90/";

    const getMatchResultContent = (matchResultSet) => {
      const content = [];
      for (const idx in matchResultSet) {
        const item = matchResultSet[idx];
        const match_id = item["matchfile"];

        // getting team name in english and converting them to lowercase
        let teama_lower_name = item["teama_eng"]?.toLowerCase() || "";
        teama_lower_name = teama_lower_name.replace(/ /g, "-"); //returns my_name
        let teamb_lower_name = item["teamb_eng"]?.toLowerCase() || "";
        teamb_lower_name = teamb_lower_name.replace(/ /g, "-"); //returns my_name

        // Assigning URL
        item.Match_Full_ScoreCard = publicRuntimeConfig.siteUrl + "cricket/live-score/" + teama_lower_name + "-vs-" + teamb_lower_name + "-live-score-full-" + match_id + ".html";
        item.Match_Commentary = publicRuntimeConfig.siteUrl + "cricket/live-score/" + teama_lower_name + "-vs-" + teamb_lower_name + "-ball-by-ball-live-commentary-" + match_id + ".html";
        item.Match_Live_Blog = "/cricket/live-score/" + teama_lower_name + "-vs-" + teamb_lower_name + "-live-score-full-" + match_id + ".html";
        item.Match_Squads = publicRuntimeConfig.siteUrl + "cricket/live-score/team-squads/" + teama_lower_name + "-vs-" + teamb_lower_name + "-" + match_id +".html";

        let teama_innings = "";
        let teamb_innings = "";

        // Getting teams flag image
        const teama_flag = item["teamFlagA"];
        const teamb_flag = item["teamFlagB"];

        item.date = item["matchdate"];

        if (item.matchtype == "टेस्ट") {
          teama_innings += "<p class='series_name'>" + item?.teama + "</p>";
          teamb_innings += "<p class='series_name'>" + item?.teamb + "</p>";
        } else {
          teama_innings += "<p class='series_name'>" + item?.teama + "</p>";
          teamb_innings += "<p class='series_name'>" + item?.teamb + "</p>";
        }
        if(item?.matchDetail?.matchresult !== 'Match Abandoned') {
          content.push(
            <div className="result-box">
            <h3 className="cn-rsltHead1">
              {item?.teama} <span> vs </span>
              {item?.teamb}
             , {" "}
             {item?.matchDetail?.matchnumber}
            </h3>
            <p className="cn-rsltCont">
              • {item?.matchDetail?.matchdate} • {item?.['matchTime']} <br/> • {item?.venue}
              <br />
              <span className="status">
                <i>•</i> {item?.matchDetail?.matchresult}
              </span>
            </p>
            <div className="resultTeamOuter">
              <div className="result-col-r">
                <div className="teamBox">
                  <h4 className={`teamName`}>{item?.teama}</h4>

                  <div className="flag">
                    <object
                      data={teama_flag}
                      type="image/png"
                      style={{ width: "100%" }}
                    >
                      <img
                        src={team_default_image}
                        width="58"
                        height="33"
                        alt={item?.teama || ""}
                      />
                    </object>
                  </div>
                </div>
                <div className="vs">
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Schedule-vs.png"
                    width="15"
                    height="22"
                    alt={item?.teamb || ""}
                  />
                </div>
                <div className="teamBox">
                  <h4 className="teamName">{item?.teamb}</h4>

                  <div className="flag">
                    {/*<img src={item.teamb_flag} alt={item.teamb_full} /> */}
                    <object
                      data={teamb_flag}
                      type="image/png"
                      style={{ width: "100%" }}
                    >
                      <img
                        src={team_default_image}
                        width="58"
                        height="33"
                        alt={item?.teamb || ""}
                      />
                    </object>
                  </div>
                </div>
              </div>
            </div>
            <ul className="reslutOtherLinks">
              <li>
                <a href={`${item.Match_Full_ScoreCard}`}>स्कोरकार्ड </a>
              </li>
              {/* <li><a href={`${item.live_blog_url}`}>LIVE BLOG </a></li> */}
              {item?.blog_url && (
                <li>
                  <a href={`${item.blog_url}`}>LIVE BLOG </a>
                </li>
              )}
              <li>
                <a href={`${item.Match_Commentary}`}>मैच कॉमेंट्री </a>
              </li>
              <li>
                <a href={`${item.Match_Squads}`}>स्क्वॉड</a>
              </li>
            </ul>

            </div>
          );
        }

      }
      return content;
    };

    const loadMore = (e) => {
      if (hasMoreItems) {
        setPerPage(perPage + 3);
        setPage(Page + 1);
      }
    };

    return (
      <>
        <div className="T20Wrapper">
          <div className="CN-pageCN-scoreCardsection">
            <div className="bet__ad">
              {/* <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              /> */}
              <NewSiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyLoad={true}      
              />
            </div>
            <div className="CN__scoreCardsection">
              {/* scorecard component */}
              <DynamicCrTopScoreWidgetWithNoSSR isMobile />
            </div>
          </div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd> */}
              <NewSiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}     
              />
            </div>
          </div>
          <BreadcrumbCommon breadCrumbArray={[
                { value: "हिंदी समाचार", slug: "/"},
                { value: "क्रिकेट", slug: "/cricket/"},
                { value: "क्रिकेट मैच रिजल्ट"},
              ]} />
          
          <div className="wc_heading">
            <h1 className="page_title">
              {`${h1_tag_set}`}
              <span></span>
            </h1>
            <ul className="CN-result-tabs">
              <li className="active">
                <a>सीरीज के नतीजे</a>
              </li>
            </ul>
          </div>

          {updatedResults
              .slice(totalPages, perPage)
              .map((resultitem, i) => {
              return (
                <>
                  <div className="wcResultOuter" key={resultitem?._id}>
                    <h2 className="resultHeading">
                      {resultitem?.name || ""}
                      <span></span>
                    </h2>

                    {getMatchResultContent(resultitem?.match)}

                  </div>
                </>
              );
            })}
          <div className="vsp20 clearfix"></div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds?.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                lazyload={true}
              ></SiteAd> */}
              <NewSiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds?.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                lazyLoad={true}    
              />
            </div>
          </div>

          <div className="vsp20 clearfix"></div>
          <p className="pageContent">
            क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता है और
            तकरीबन हर घंटे कहीं हार और कहीं जीत होती है. अधिकतर खेलों में नतीजे
            हार और जीत के फॉर्म में ही आते हैं. क्रिकेट इस मामले में कई खेलों से
            अलग है. इस खेल में हार-जीत के अलावा मैच टाई और ड्रॉ भी होते हैं.
            वनडे और टी20 फॉर्मेट में तीन संभावित नतीजे हो सकते हैं- जीत, हार और
            टाई. टेस्ट और प्रथमश्रेणी फॉर्मेट में ड्रॉ के रूप में एक और नतीजा
            जुड़ जाता है. इस तरह क्रिकेट में चार संभावित नतीजे हो सकते हैं- जीत,
            हार, टाई और ड्रॉ. क्रिकेट मैचों के इन नतीजों (Results) को यहां देखा
            जा सकता है
          </p>
          {typeof pageAds.PG_1x1_2 !== "undefined" &&
          pageAds.PG_1x1_2 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_2"
            //   adUnit={pageAds.PG_1x1_2}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_2"
              adUnit={pageAds.PG_1x1_2}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={false}  
            />
          ) : null}
          {typeof pageAds.PG_1x1_3 !== "undefined" &&
          pageAds.PG_1x1_3 !== "" ? (
            // <SiteAd
            //   slotId="PG_1x1_3"
            //   adUnit={pageAds.PG_1x1_3}
            //   sizes={[[1, 1]]}
            //   removeAdSpan={true}
            //   loadonScroll={true}
            // />
            <NewSiteAd
              slotId="PG_1x1_3"
              adUnit={pageAds.PG_1x1_3}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true} 
            />
          ) : null}
          {hasMoreItems ? <Waypoint onEnter={loadMore} /> : ""}
        </div>
        <style jsx global>
          {`
          
         .series_run_info {
          text-align: center;
          font-weight: bold;
      }
      .CN-pageCN-scoreCardsection {
        min-height: 115px;
        background: rgb(0 0 0 / 13%);
      }

      .bet__ad {
        background: #fff;
      }

      .CN-pageCN-scoreCardsection .adunitContainer {
        display: flex;
        justify-content: center;
      }
      .CN__scoreCardsection {
        // padding: 0 5px;
        margin-right: 10px;
      }
       
      .clearfix {
        clear: both;
      }
      .add {
        background: #dbdde3;
        position: relative;
        padding: 16px 0;
        line-height: 0;
        text-align: center;
        margin-bottom: 10px;
        display: inline-block;
        width: 100%;
        z-index: 1;
        color: #797e90 !important;
        //height: 300px;
        overflow: hidden;
      }
      .addinner-box {
        //background: #e8e9ed;
        background: #dbdde3;
        min-width: 250px;
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        min-height: auto;
        padding: 0;
        box-sizing: border-box;
        color: #797e90 !important;
        font-size: 11px;
        line-height: 16px;
      }
      // div.addinner_box_300x250 {
      //   height: 268px;
      //   width: 300px;
      // }
     
      .vsp20 {
        margin-top: 20px;
      }


      .series_run_info > div:nth-child(2), .series_run_info > div:nth-child(5) {
          font-weight: normal;
          font-size: 11px;
      }
     

         .wc_heading {padding: 0 10px;margin:10px 0;}
         .page_title {color: #282828; font-family: "Recursive", sans-serif; line-height: 27px; text-transform: uppercase; font-size: 22px; font-weight: bold; border-bottom: 1px solid #D8D8D8;}
         .page_title span{color:#202020;font-weight: normal;padding-left: 4px;display: inline-block;}
        
         .resultHeading {padding-left:10px;color: #282828;font-family: "Recursive", sans-serif;line-height: 17px;text-transform: uppercase;font-size: 16px;font-weight: bold;position: relative;    padding-bottom: 5px;}
         .resultHeading::before {content: '';border-bottom: 1px solid #000000;border-right: 1px solid #000000;width: 5px;height: 5px;transform: rotate(-45deg);position: absolute;left: 0;top: 6px;}
         .resultHeading span{color:#202020;font-weight:normal;}
         
         .filterWrapper {margin: 0 10px;margin-bottom: 15px;padding-bottom: 10px;border-bottom: 1px dotted #707070;}
         .filterHeading {font-size: 13px;color: #464646;padding-left: 19px;margin-bottom: 10px;position: relative;}
         .filterHeading::before {content: '';width: 16px;height: 16px;position: absolute;left: 0;background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/t20-worldcup/images/filter-icon.png);}
         .filterDropWrap {display:flex; justify-content: space-between;align-items: flex-end;}
         .filterDropWrap .dropDown{position: relative;}
         .filterDropWrap .icon{width: 8px;height: 17px;position: absolute;right: 6px;background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/t20-worldcup/images/filter-icon.png);top: 8px;background-position: -37px 0px;background-repeat: no-repeat;}
         .filterDropWrap .dropDown select {width: 120px; border: 1px solid #CCCCCC; background: #F5F5F5; font-family: 'Recursive'; font-size: 12px; text-transform: uppercase; padding: 6px; border-radius: 5px;-webkit-appearance: none;-moz-appearance: none;appearance: none;}
         .filterDropWrap .clearFilter{font-size: 11px;color: #E1261D;text-transform: uppercase;text-decoration: underline;}
         
         .wcResultOuter {margin-bottom:16px;padding: 0 10px;}
         .result-box {position: relative;padding:10px 10px 0 6px;margin-bottom: 20px;border-bottom: 1px solid #D8D8D8;background: #F5F5F5;}
         
         .result-box .cn-rsltHead1{font-size: 15px;color: #001D42;text-transform: uppercase;    display: flex;}
         .result-box .cn-rsltHead1 span{text-transform: lowercase;font-weight: normal;    margin: 0 10px;}
         .result-box .cn-rsltCont{font-size: 13px;margin: 0;line-height: 25px;color: #464646;margin-bottom: 10px;}
         .result-box .cn-rsltCont span.round{color: #001D42;}
         .result-box .cn-rsltCont span.status{color: #E1261D;font-weight: bold;display: flex;}
         .result-box .cn-rsltCont span.status i {padding-right: 5px;}
         .result-box::before{content: '';position: absolute;width: 100%;height: 4px;background: #E1261D;left: 0;top: 0;}
         .result-box .resultTeamOuter {background: #fff;margin-left: -25px;margin-right: -25px;padding: 10px 0;border-top: 1px solid #D2D2D2;border-bottom: 1px solid #D2D2D2;margin-bottom: 10px;}
         .result-box .result-col-r{display:flex;justify-content: center;}
         .result-box .result-col-r .teamBox {width: 124px;}
         .result-box .result-col-r .teamBox .teamName {color: #282828;font-size: 13px;text-transform: uppercase;font-weight: normal;text-align: center;margin-bottom: 6px;line-height: 14px;}
         .result-box .result-col-r .teamBox .runs{font-size: 20px;color: #001D42;text-align: center;font-weight: bold;margin-bottom:6px;}
         .result-box .result-col-r .teamBox .overs{color: #606060;font-size: 12px;text-align: center;line-height: 13px;}
         .result-box .result-col-r .vs{width:55px;text-align:center;display: flex;align-items: center;justify-content: center;sfi-ukni-jcu}
         .result-box .result-col-r .vs img{width:15px;}
         .result-box .result-col-r .flag{width: 60px;height: 32px;border: 1px solid #fff;box-shadow: 0 0 6px #00000029;display: table;margin: 0 auto;margin-bottom:6px;}
         .result-box .result-col-r .flag img{width:100%}
		 .result-box .result-col-r .flag.afghanistan {background-position: -3px 0;}
         .reslutOtherLinks{
          display:flex;
          flex-wrap:wrap;
         }
         .reslutOtherLinks li{width:49%;position: relative;padding-left:13px;margin-bottom:8px;}
         .reslutOtherLinks li:last-child{margin-bottom:0;}
         .reslutOtherLinks li::before {
          content: '';
          width: 4px;
          height: 4px;
          background: #aaaaaa;
          position: absolute;
          border-radius: 50%;
          left: 0;
          top: 10px;}
         .reslutOtherLinks li a{text-decoration:none!important; color: #E1261D;font-size: 13px;text-transform: uppercase;display:inline-block;padding: 3px 0;position:relative;}
         .resultContent {font-size:13px;font-family:'Recursive', sans-serif;line-height:20px;padding: 0 10px;margin-bottom: 15px;}         
         .CN-result-tabs {background: #F5F5F5; display: flex; border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; margin-top: 10px; }
.CN-result-tabs .active a {color: #E1261D; font-weight: bold; text-transform: uppercase; padding: 10px 0 7px 10px; display: inline-block; border-bottom: 3px #E1261D solid; }
.pageContent {
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 5px;
  
  } 
        `}
        </style>
      </>
    );
  } else {
    return (
      <>
        <div className="T20Wrapper">
          <div className="CN-pageCN-scoreCardsection">
            <div className="bet__ad">
              {/* <SiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props?.pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyload={true}
              /> */}
              <NewSiteAd
                slotId="Mobile_ScoreCard_ad"
                adUnit={props?.pageAds?.ScoreCard_ad}
                sizes={[[320, 60]]}
                width={320}
                height={60}
                removeAdSpan={true}
                lazyLoad={true}
              />
            </div>
            <div className="CN__scoreCardsection">
              {/* scorecard component */}
              <DynamicCrTopScoreWidgetWithNoSSR isMobile />
            </div>
          </div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              ></SiteAd> */}
              <NewSiteAd
                width={336}
                height={280}
                slotId={"mobileAdNew300x250_0"}
                adUnit={pageAds?.ATF_320}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
              />
            </div>
          </div>
          <div className="breadcum">
            <a href="https://www.hindi.news18.com/">NEWS18 HINDI /</a>
            <a href="https://www.hindi.news18.com/cricket/">Cricket</a>
            <div className="brdcumTitle">CRICKET MATCH RESULT</div>
          </div>
          <div className="wc_heading ">
            <h1 className="page_title">
              CRICKET MATCH RESULT
              <span></span>
            </h1>
          </div>

          <div>No Match Found</div>
          <div className="vsp20 clearfix"></div>
          <div className="clearfix add">
            <div className="addinner-box addinner_box_300x250">
              {/* <SiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds?.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                lazyload={true}
              ></SiteAd> */}
              <NewSiteAd
                width={300}
                height={250}
                slotId={"mobileAdNew300x250_1"}
                adUnit={pageAds?.BTF_300}
                sizes={[
                  [300, 250],
                  [336, 280],
                ]}
                loadOnScroll={true}
              />
            </div>
          </div>
          <div className="vsp20 clearfix"></div>
          <p className="pageContent">
            क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता है और
            तकरीबन हर घंटे कहीं हार और कहीं जीत होती है. अधिकतर खेलों में नतीजे
            हार और जीत के फॉर्म में ही आते हैं. क्रिकेट इस मामले में कई खेलों से
            अलग है. इस खेल में हार-जीत के अलावा मैच टाई और ड्रॉ भी होते हैं.
            वनडे और टी20 फॉर्मेट में तीन संभावित नतीजे हो सकते हैं- जीत, हार और
            टाई. टेस्ट और प्रथमश्रेणी फॉर्मेट में ड्रॉ के रूप में एक और नतीजा
            जुड़ जाता है. इस तरह क्रिकेट में चार संभावित नतीजे हो सकते हैं- जीत,
            हार, टाई और ड्रॉ. क्रिकेट मैचों के इन नतीजों (Results) को यहां देखा
            जा सकता है
          </p>

          {/* <OutbrainWidget widgetId="MB_6" widgetSrc={pageurl} /> */}
        </div>
        <style jsx>
          {`
            .wc_heading {
              padding: 0 10px;
              margin: 10px 0;
            }
            .CN-pageCN-scoreCardsection {
              min-height: 115px;
              background: rgb(0 0 0 / 13%);
            }

            .bet__ad {
              background: #fff;
            }

            .CN-pageCN-scoreCardsection .adunitContainer {
              display: flex;
              justify-content: center;
            }
            .CN__scoreCardsection {
              // padding: 0 5px;
              margin-right: 10px;
            }

            .clearfix {
              clear: both;
            }
            .add {
              background: #dbdde3;
              position: relative;
              padding: 16px 0;
              line-height: 0;
              text-align: center;
              margin-bottom: 10px;
              display: inline-block;
              width: 100%;
              z-index: 1;
              color: #797e90 !important;
              height: 300px;
              overflow: hidden;
            }
            .addinner-box {
              //background: #e8e9ed;
              background: #dbdde3;
              min-width: 250px;
              display: inline-block;
              margin: 0 auto;
              text-align: center;
              min-height: auto;
              padding: 0;
              box-sizing: border-box;
              color: #797e90 !important;
              font-size: 11px;
              line-height: 16px;
            }
            div.addinner_box_300x250 {
              height: 268px;
              width: 300px;
            }

            .page_title {
              color: #e1261d;
              font-family: "Recursive", sans-serif;
              line-height: 27px;
              text-transform: uppercase;
              font-size: 22px;
              font-weight: bold;
              border-bottom: 1px solid #d8d8d8;
              padding-bottom: 5px;
            }
            .page_title span {
              color: #202020;
              font-weight: normal;
              padding-left: 4px;
              display: inline-block;
            }
            .resultHeading {
              padding-left: 10px;
              color: #282828;
              font-family: "Recursive", sans-serif;
              line-height: 17px;
              text-transform: uppercase;
              font-size: 16px;
              font-weight: bold;
              position: relative;
              padding-bottom: 5px;
            }
            .resultHeading::before {
              content: "";
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              width: 5px;
              height: 5px;
              transform: rotate(-45deg);
              position: absolute;
              left: 0;
              top: 6px;
            }
            .resultHeading span {
              color: #202020;
              font-weight: normal;
            }

            .filterWrapper {
              margin: 0 10px;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 1px dotted #707070;
            }
            .filterHeading {
              font-size: 13px;
              color: #464646;
              padding-left: 19px;
              margin-bottom: 10px;
              position: relative;
            }
            .filterHeading::before {
              content: "";
              width: 16px;
              height: 16px;
              position: absolute;
              left: 0;
              background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/t20-worldcup/images/filter-icon.png);
            }
            .filterDropWrap {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .filterDropWrap .dropDown {
              position: relative;
            }
            .filterDropWrap .icon {
              width: 8px;
              height: 17px;
              position: absolute;
              right: 6px;
              background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/t20-worldcup/images/filter-icon.png);
              top: 8px;
              background-position: -37px 0px;
              background-repeat: no-repeat;
            }
            .filterDropWrap .dropDown select {
              width: 120px;
              border: 1px solid #cccccc;
              background: #f5f5f5;
              font-family: "Recursive";
              font-size: 12px;
              text-transform: uppercase;
              padding: 6px;
              border-radius: 5px;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }
            .filterDropWrap .clearFilter {
              font-size: 11px;
              color: #e1261d;
              text-transform: uppercase;
              text-decoration: underline;
            }

            .wcResultOuter {
              margin-bottom: 16px;
              padding: 0 10px;
            }
            .result-box {
              position: relative;
              padding: 15px;
              margin-bottom: 20px;
              border-bottom: 1px solid #d8d8d8;
              background: #f5f5f5;
            }

            .result-box .cn-rsltHead1 {
              font-size: 15px;
              color: #001d42;
              margin-bottom: 5px;
              text-transform: uppercase;
              display: flex;
            }
            .result-box .cn-rsltHead1 span {
              text-transform: lowercase;
              font-weight: normal;
              margin: 0 10px;
            }
            .result-box .cn-rsltCont {
              font-size: 13px;
              margin: 0;
              line-height: 25px;
              color: #464646;
              margin-bottom: 10px;
            }
            .result-box .cn-rsltCont span.round {
              color: #001d42;
            }
            .result-box .cn-rsltCont span.status {
              color: #e1261d;
              font-weight: bold;
              display: flex;
            }
            .result-box .cn-rsltCont span.status i {
              padding-right: 5px;
            }
            .result-box::before {
              content: "";
              position: absolute;
              width: 100%;
              height: 4px;
              background: #e1261d;
              left: 0;
              top: 0;
            }
            .result-box .resultTeamOuter {
              background: #fff;
              margin-left: -25px;
              margin-right: -25px;
              padding: 10px 0;
              border-top: 1px solid #d2d2d2;
              border-bottom: 1px solid #d2d2d2;
              margin-bottom: 10px;
            }
            .result-box .result-col-r {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .result-box .result-col-r .teamBox {
              width: 124px;
            }
            .result-box .result-col-r .teamBox .teamName {
              color: #7b7b7b;
              font-size: 13px;
              text-transform: uppercase;
              font-weight: normal;
              text-align: center;
              margin-bottom: 6px;
              line-height: 14px;
            }
            .result-box .result-col-r .teamBox .runs {
              font-size: 20px;
              color: #001d42;
              text-align: center;
              font-weight: bold;
              margin-bottom: 6px;
            }
            .result-box .result-col-r .teamBox .overs {
              color: #606060;
              font-size: 12px;
              text-align: center;
              line-height: 13px;
            }
            .result-box .result-col-r .vs {
              width: 55px;
              text-align: center;
            }
            .result-box .result-col-r .vs img {
              width: 15px;
            }
            .result-box .result-col-r .flag {
              width: 45px;
              height: 30px;
              border: 1px solid #fff;
              box-shadow: 0 0 6px #00000029;
              background-position: -3px -1124px;
              background-size: 49px;
              display: table;
              margin: 0 auto;
              margin-bottom: 6px;
            }
            .result-box .result-col-r .flag.afghanistan {
              background-position: -3px 0;
            }
            .result-box .result-col-r .flag.england {
              background-position: -3px -103px;
            }
            .result-box .result-col-r .flag.namibia {
              background-position: -3px -205px;
            }
            .result-box .result-col-r .flag.oman {
              background-position: -3px -308px;
            }
            .result-box .result-col-r .flag.scotland {
              background-position: -3px -411px;
            }
            .result-box .result-col-r .flag.west-indies {
              background-position: -3px -1090px;
            }
            .result-box .result-col-r .flag.australia {
              background-position: -3px -34px;
            }
            .result-box .result-col-r .flag.india {
              background-position: -3px -137px;
            }
            .result-box .result-col-r .flag.netherlands {
              background-position: -3px -240px;
            }
            .result-box .result-col-r .flag.pakistan {
              background-position: -3px -343px;
            }
            .result-box .result-col-r .flag.south-africa {
              background-position: -3px -445px;
            }
            .result-box .result-col-r .flag.bangladesh {
              background-position: -3px -69px;
            }
            .result-box .result-col-r .flag.ireland {
              background-position: -3px -171px;
            }
            .result-box .result-col-r .flag.new-zealand {
              background-position: -3px -274px;
            }
            .result-box .result-col-r .flag.papua-new-guinea {
              background-position: -3px -377px;
            }
            .result-box .result-col-r .flag.sri-lanka {
              background-position: -3px -480px;
            }
            .reslutOtherLinks li {
              position: relative;
              padding-left: 13px;
              margin-bottom: 4px;
            }
            .reslutOtherLinks li:last-child {
              margin-bottom: 0;
            }
            .reslutOtherLinks li::before {
              content: "";
              width: 5px;
              height: 5px;
              background: #e1261d;
              position: absolute;
              border-radius: 50%;
              left: 0;
              top: 8px;
            }
            .reslutOtherLinks li a {
              color: #e1261d;
              font-size: 13px;
              text-transform: uppercase;
              border-bottom: 1px solid;
            }
            .resultContent {
              font-size: 13px;
              font-family: "Recursive", sans-serif;
              line-height: 20px;
              padding: 0 10px;
              margin-bottom: 15px;
            }
            .pageContent {
              font-size: 16px;
              line-height: 1.5;
              margin-top: 10px;
            }
          `}
        </style>
      </>
    );
  }
};
export default ResultsComponent;
