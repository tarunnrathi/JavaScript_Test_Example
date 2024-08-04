import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import React, { useState } from "react";
import dynamic from "next/dynamic";

const OutbrainWidget = dynamic(() =>
  import("widgets/Common/Responsive/Outbrain")
);

import "lazysizes";
// import { isEmpty } from 'underscore';
import { Waypoint } from "react-waypoint";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import ScoreRHS from "../Cards/ScoreRHS";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
  () => import("widgets/Common/Responsive/CrTopScoreWidget"),
  { ssr: false }
);

const ResultsComponent = (props) => {
  const { data = {}, pageAds = {} } = props;
  const pageurl = "https://www.hindi.news18.com/cricket/result/";

  const {
    RecentMatchresult = {},
  } = data;

  if (Object.keys(RecentMatchresult).length != 0) {
    const h1_tag_set = "मैच के नतीजे";

    const [updatedResults, setResults] = useState(RecentMatchresult);

    // var update_result_set = groupByKey(updatedResults, "seriesname");
    // var update_result_set_array = Object.entries(update_result_set);

    // var update_result_set_array_length = update_result_set_array.length;
    const update_result_set_array_length = updatedResults.length;
    const [hasMoreItems, setHasMoreItems] = useState(
      update_result_set_array_length
    );
    const [perPage, setPerPage] = useState(3);
    const [Page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);

    const base64First =
      "data:image/jpeg;base64,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";

    // team default image to show when teams natinal flag image is not present
    const team_default_image =
      "https://images.news18.com/static_news18/pix/ibnhome/news18/default-flag.jpg";

    const getMatchResultContent = (matchResultSet) => {
      const content = [];
      for (const idx in matchResultSet) {
        const item = matchResultSet[idx];

        // getting match id
        const match_id = item["matchfile"];

        let teama_innings = "";
        let teamb_innings = "";

        //teams flag
        const teama_flag = item["teamFlagA"];
        const teamb_flag = item["teamFlagB"];

        // getting team name in english and converting them to lowercase
        let teama_lower_name = item["teama_eng"]?.toLowerCase() || "";
        teama_lower_name = teama_lower_name.replace(/ /g, "-"); //returns my_name
        let teamb_lower_name = item["teamb_eng"]?.toLowerCase() || "";
        teamb_lower_name = teamb_lower_name.replace(/ /g, "-"); //returns my_name

        // Assigning URL
        item.Match_Full_ScoreCard = publicRuntimeConfig.siteUrl + "cricket/live-score/" + teama_lower_name + "-vs-" + teamb_lower_name + "-live-score-full-" + match_id + ".html";
        item.Match_Commentary = publicRuntimeConfig.siteUrl + "cricket/live-score/" + teama_lower_name + "-vs-" + teamb_lower_name + "-ball-by-ball-live-commentary-" + match_id + ".html";
        item.Match_Live_Blog = "/cricket/live-score/" + teama_lower_name + "-vs-" + teamb_lower_name + "-live-score-full-" + match_id + ".html";
        item.Match_Squads = publicRuntimeConfig.siteUrl + "cricket/live-score/team-squads/" + teama_lower_name + "-vs-" + teamb_lower_name + "-" + match_id + ".html";

        item.date = item["matchdate"];

        if (item?.matchtype == "टेस्ट") {
          teama_innings += "<p class='series_name'>" + item?.teama + "</p>";
          teamb_innings += "<p class='series_name'>" + item?.teamb + "</p>";
        } else {
          teama_innings += "<p class='series_name'>" + item?.teama + "</p>";
          teamb_innings += "<p class='series_name'>" + item?.teamb + "</p>";
        }

        if(item?.matchDetail?.matchresult !== 'मैच रद्द') {
          content.push(
            <div className="series_result">
              <div className="series_result_left">
                <h3 className="schedule-name">
                  {item?.teama} <span> vs </span>
                  {item?.teamb}
                  <span>,</span>
                  {item?.matchDetail?.matchnumber}, {item?.matchtype}
                </h3>
                <p className="schedule-info">
                  {item?.matchDetail?.matchdate} • {item?.venue}
                </p>

                <div className="series_result_info">
                  <div className="result_row">
                    <div className="result_flag_row">
                      <i className="flag_icons_result">
                        <object
                          data={teama_flag}
                          type="image/png"
                          style={{ width: "100%" }}
                        >
                          <img
                            src={team_default_image || base64First}
                            alt={item?.teama_full || " "}
                          />
                        </object>
                      </i>

                      <div
                        className="series_run_info"
                        dangerouslySetInnerHTML={{ __html: teama_innings }}
                      ></div>
                    </div>
                    <div className="result_flag_row">
                      <i className="vs">
                        <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/vs.svg" />
                      </i>
                      <i className="flag_icons_result">
                        <object
                          data={teamb_flag}
                          type="image/png"
                          style={{ width: "100%" }}
                        >
                          <img
                            src={team_default_image || base64First}
                            alt={item.teamb_full || " "}
                          />
                        </object>
                      </i>
                      <div
                        className="series_run_info"
                        dangerouslySetInnerHTML={{ __html: teamb_innings }}
                      ></div>
                    </div>
                  </div>
                  <span className="run_info"><span className="match_result">मैच रिजल्ट्स: </span>{item?.matchDetail?.matchresult}</span>
                </div>
              </div>
              <div className="series_result_right">
                <span>यह भी देखें:</span>
                <ul className="check_list">
                  <li>
                    <a href={item?.Match_Full_ScoreCard}>स्कोरकार्ड</a>
                  </li>
                  <li>
                    <a href={item?.Match_Commentary}>मैच कॉमेंट्री </a>
                  </li>

                  {item?.blog_url && (
                    <li>
                      <a href={item?.Match_Live_Blog ? item?.Match_Live_Blog : ''}>LIVE BLOG </a>
                    </li>
                  )}
                  <li>
                    <a href={item.Match_Squads}>स्क्वॉड</a>
                  </li>
                </ul>
              </div>
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
        <div className="wrapper">
          <div className="container">
            <div className="CN-pageCN-scoreCardsection">
              {/* <SiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props?.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}
              /> */}
              <NewSiteAd
                slotId="Desktop_ScoreCard_ad"
                adUnit={props?.pageAds?.ScoreCard_ad}
                sizes={[[1244, 60]]}
                width={1244}
                height={60}
                removeAdSpan={true}      
              />
              <div className="CN-scoreCardsection">
                <DynamicCrTopScoreWidgetWithNoSSR />
              </div>
            </div>
          </div>
          <div className="olympics-wrapper">
            <div className="olympics-left">
            <BreadcrumbCommon breadCrumbArray={[{value: "हिंदी समाचार", slug: "/" }, {value: "क्रिकेट", slug: "/cricket/" }, {value: "क्रिकेट मैच रिजल्ट" }]} />


              <div className="world-series-schedule">
                <div className="border_title">
                  <h1 className="page_title">
                    {h1_tag_set}
                    <span></span>
                  </h1>
                </div>
                <ul className="CN-result-tabs">
                  <li className="active">
                    <a>सीरीज के नतीजे</a>
                  </li>
                </ul>
                {updatedResults
                  .slice(totalPages, perPage)
                  .map((resultitem, i) => {
                    return (
                      <div
                        key={resultitem?._id}
                        className="schedule-row"
                      >
                        <h2 className="schedule-date">
                          {resultitem?.name || ""} <span></span>
                        </h2>
                        {getMatchResultContent(resultitem?.match) || ""}
                      </div>
                    );
                  })}

                {hasMoreItems ? <Waypoint onEnter={loadMore} /> : ""}
                <div className="vsp20 clearfix"></div>
                <p className="pageContent">
                  क्रिकेट (Cricket) का खेल दुनिया के हर हिस्से में खेला जाता है
                  और तकरीबन हर घंटे कहीं हार और कहीं जीत होती है. अधिकतर खेलों
                  में नतीजे हार और जीत के फॉर्म में ही आते हैं. क्रिकेट इस मामले
                  में कई खेलों से अलग है. इस खेल में हार-जीत के अलावा मैच टाई और
                  ड्रॉ भी होते हैं. वनडे और टी20 फॉर्मेट में तीन संभावित नतीजे
                  हो सकते हैं- जीत, हार और टाई. टेस्ट और प्रथमश्रेणी फॉर्मेट में
                  ड्रॉ के रूप में एक और नतीजा जुड़ जाता है. इस तरह क्रिकेट में
                  चार संभावित नतीजे हो सकते हैं- जीत, हार, टाई और ड्रॉ. क्रिकेट
                  मैचों के इन नतीजों (Results) को यहां देखा जा सकता है
                </p>
              </div>

              <div className="outbrain_row">
                <OutbrainWidget widgetId="AR_6" widgetSrc={pageurl} />
              </div>
            </div>
            <div className="CN-sec-r">
              <ScoreRHS
                pageAds={props.pageAds}
                isIpl=""
                isT20=""
                recent=""
                upcoming=""
                url={"/cricket/result/"}
                predictorData=""
              />
            </div>
            <div className="CN-sec-r">
              {typeof pageAds !== "undefined" &&
                typeof pageAds.PG_Slider_1x1 !== "undefined" ? (
                // <SiteAd
                //   slotId="PG_Slider_1x1"
                //   adUnit={pageAds.PG_Slider_1x1}
                //   sizes={[[1, 1]]}
                //   removeAdSpan={true}
                //   loadonScroll={true}
                // />
                <NewSiteAd
                  slotId="PG_Slider_1x1"
                  adUnit={pageAds.PG_Slider_1x1}
                  sizes={[[1, 1]]}
                  removeAdSpan={true}
                  loadOnScroll={true}      
                />
              ) : null}
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
            </div>
          </div>
        </div>

        <style jsx global>
          {`


	* {
		padding: 0;
		margin: 0;
		list-style: none;
		box-sizing: border-box;
		text-decoration: none;
	}	
  .match_result{
   color: #606060
  }

	.CN-pageCN-scoreCardsection {
		min-height: 60px;
		background: rgb(0 0 0 / 13%);
		margin-top: 10px;
		font-family: "Mukta", sans-serif;
  }
	  .CN-scoreCardsection {
		background: #f5f5f5;
		padding: 0 15px;
	  }
	  .CN-sec-r{
		width: 300px;
		min-width: 300px;
	  }
	  .CN-section .CN-sec-r {
		width: 300px;
		min-width: 300px;
	  }
	  
	  .vspacer20 {margin-top: 20px; }
.wrapper {width: 100%;overflow: hidden; }
.olympics-wrapper {width: 100%; display: flex; max-width: 1284px; margin:0px auto 0; font-family: 'Fira Sans';     background: #fff;
padding: 15px 20px;}
.olympics-left {width: 924px;min-width: 924px; margin-right: 20px; }
.olympics-right {width: 300px; }
.load_more{width: 100%; text-align: center; height: 20px; background: #F5F5F5; margin-top: 1px; }
.load_more a {color: #FF0000; }
.load_more span {background: #FFFFFF; padding: 3px 11px; font-size: 12px; text-transform: uppercase; font-weight: 600; }
.page_title {color: #E1261D;line-height: 27px;margin-bottom: 5px;text-transform: uppercase;font-size:22px;font-family: 'Fira Sans';}
.page_title span {color: #202020; font-weight: normal; }
.latest_photo {width: 447px; }
.most_run_left {width: 447px; }
.mostrun_section {width: 100%; display: flex; justify-content: space-between; }
.points_table_section {width: 100%; display: flex; justify-content: space-between; }
.border_title:after {width: 100%;height: 3px;background: #E1261D;content: "";position: absolute;left: 0;bottom: 10px;}
.border_title {width: 100%;position: relative;}
.world-series-schedule .border_title .page_title {background: #fff;}
.border_title .page_title {background: #f5f5f5;display: inline-block;position: relative;z-index: 1;padding-right: 7px;}
.series_result {background: #F5F5F5 0% 0% no-repeat padding-box; border: 1px #D8D8D8 solid; margin-bottom: 10px; padding: 15px 0; border-left: 4px #E1261D solid; display: flex; align-items: baseline; padding-left: 0; }
.series_result_left {width: 80%; height: 100%; border-right: 1px solid #D2D2D2; padding-right: 20px; }
.series_result_right {width: 20%; height: 100%; padding-left: 20px; }
ul.check_list li a {
  text-decoration:none !important;
}
.world-series-schedule .border_title .page_title {background: #fff; } 
.series_result_info { background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #D2D2D2; border-left: 0; padding: 15px 20px 0;     margin-top: 10px;}
.result_flag_row {display: flex; align-items: center;     width: 100%; }
.result_flag {display: flex; align-items: center; }
.flag_icons_result {width: 72px; height: 42px; background: #FFFFFF 0% 0% no-repeat padding-box; box-shadow: 0px 3px 6px #00000029; border: 1px solid #FFFFFF;    }
.flag_icons_result img { width:72px ,height:}
.series_name {letter-spacing: 0px; color: #7B7B7B; font-size: 18px; line-height: 15px;margin-top:0;color:black;font-weight:bold }
.series_run {color: #001D42; font-size: 20px; font-weight: bold; width: 100%;
  display: block;padding-top: 4px; }
.series_run sub {color: #606060; font-size: 12px; font-weight: normal; position: relative; top: -7px;    left: 5px; }
.result_flag .vs {padding-right: 20px; }
.result_row {width: 100%; display: flex; align-items: center; justify-content: start; border-bottom: 1px dashed #D5D5D5; padding-bottom: 20px; }
.result_row .result_flag_row:nth-child(odd) .series_run_info {padding-left: 15px; }
.result_row .result_flag_row:nth-child(even) .series_run_info {padding-left: 15px; }
.result_flag_row .vs {    padding: 0 15px;}
.run_info {letter-spacing: 0px; color: #E1261D; font-size: 14px; line-height: 25px; font-weight: bold; padding-top: 4px; display: block; }
ul.check_list li a {letter-spacing: 0px; color: #E1261D; text-transform: uppercase; font-size: 13px; line-height: 28px; text-decoration: underline; }
ul.check_list li {position: relative; padding-left: 12px; }
ul.check_list li:after {content: "";position: absolute;left: 0;top: 13px;background: #E1261D;font-size: 19px;width: 4px;height: 4px;border-radius: 100px;}
.series_result_right span {color: #606060; font-size: 11px; font-weight: bold; padding-bottom: 10px; display: block; }
.result_intrp {font-size: 13px; line-height: 20px; color: #292929; }
.schedule-date {letter-spacing: 0px; text-transform: uppercase; font-size: 17px; color: black; font-weight: bold; display: block; padding-left: 14px; position: relative; margin-bottom: 5px; }
.schedule-date:after {content: ''; border-bottom: 1px solid #000000; border-right: 1px solid #000000; width: 5px; height: 5px; transform: rotate(-45deg); position: absolute; left: 0; top: 5px; }
.schedule-date span {color: #202020; font-weight: normal; }
.schedule-box {background: #F5F5F5 0% 0% no-repeat padding-box; border: 1px #D8D8D8 solid; margin-bottom: 10px; padding: 10px; border-left: 4px #E1261D solid; display: flex; align-items: center; }
.schedule-name {font-size: 16px;color: #001D42;font-weight: bold;line-height: 25px;padding:0px 0 5px 15px ;}
.schedule-info {font-size: 14px;line-height: 25px;padding-left: 15px;color: #232323;}
.schedule-name span {font-weight: normal; padding: 0 5px; }
.schedule-row {margin-top: 20px;}
.filter_schedule {display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed #707070; margin: 22px 0; padding-bottom: 20px; }
.filter_left {display: flex; align-items: center; }
.filter_title {color: #464646; font-size: 13px; line-height: 15px; font-weight: bold; position: relative; margin-right: 10px; background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/filter-icon.svg); background-repeat: no-repeat; background-position: left center; padding-left: 20px; }
.filter_left select {background: #F5F5F5 0% 0% no-repeat padding-box; border: 1px solid #CCCCCC; border-radius: 5px; height: 30px; appearance: none; color: #202020; font-size: 13px; font-family: 'Fira Sans'; width: 120px; padding: 0 10px; background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/filter-arrow-icon.svg); background-position: 90%; margin-right: 10px; }
.filter_right {display: flex; align-items: center; }
.clear_filter {width: 120px; height: 22px; background: #E1261D 0% 0% no-repeat padding-box; border-radius: 20px; display: flex; align-items: center; justify-content: center; letter-spacing: 0px; color: #FFFFFF; text-transform: uppercase; font-size: 12px; font-weight: bold; margin-left: 10px; }
ul.filter_name {display: flex; align-items: center; }
ul.filter_name li a {color: #E1261D; font-size: 13px; }
ul.filter_name li {display: flex; align-items: center; padding-left: 10px; }
ul.filter_name li i {padding-right: 5px; cursor: pointer; }
.afghanistan {background-position: -6px 0;}
.england {background-position: -6px -170px;}
.namibia {background-position: -6px -341px;}
.oman {background-position: -6px -513px;}
.scotland {background-position: -6px -683px;}
.west-indies {background-position: -6px -855px;}
.australia {background-position: -6px -56px;}
.india {background-position: -6px -228px;}
.netherlands {background-position: -6px -398px;}
.pakistan {background-position: -6px -569px;}
.south-africa {background-position: -6px -741px;}
.bangladesh {background-position: -6px -114px;}
.ireland {background-position: -6px -285px;}
.new-zealand {background-position: -6px -456px;}
.papua-new-guinea {background-position: -6px -627px;}
.sri-lanka {background-position: -6px -798px;}

.CN-result-tabs {background: #F5F5F5; display: flex; border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; margin-top: 10px; }
.CN-result-tabs .active a {color: #E1261D; font-weight: bold; text-transform: uppercase; padding: 10px 0 7px 10px; display: inline-block; border-bottom: 3px #E1261D solid; }
.pageContent {
	font-size: 16px;
	line-height: 1.5;
	margin-top: 10px;
  }	
`}
        </style>
      </>
    );
  } else {
    return (
      <>
        <div className="wrapper">
          <div className="olympics-wrapper">
            <div className="olympics-left">
              <BreadcrumbCommon breadCrumbArray={[{value: "Home", slug: "/" }, {value: "CRICKET HOME", slug: "/cricket/" }]} />
              
              <div className="world-series-schedule">
                <div className="border_title">
                  <h1 className="page_title">
                    मैच के नतीजे<span></span>
                  </h1>
                </div>

                <div>No Match Found</div>
              </div>

              <div className="outbrain_row">
                <OutbrainWidget widgetId="AR_6" widgetSrc={pageurl} />
              </div>
            </div>
            <div className="CN-sec-r">
              <ScoreRHS
                pageAds={props.pageAds}
                isIpl=""
                isT20=""
                recent=""
                upcoming=""
                url={"/cricket/result/"}
                predictorData=""
              />
            </div>
          </div>
        </div>

        <style jsx global>
          {`
            .CN-sec-r {
              width: 300px;
              min-width: 300px;
            }
            .vspacer20 {
              margin-top: 20px;
            }
            .wrapper {
              width: 100%;
              background: #f5f5f5;
              overflow: hidden;
            }
            .olympics-wrapper {
              width: 100%;
              display: flex;
              max-width: 1284px;
              margin: 0px auto 0;
              font-family: "Fira Sans";
              background: #fff;
              padding: 15px 20px;
            }
            .olympics-left {
              width: 924px;
              margin-right: 20px;
            }
            .olympics-right {
              width: 300px;
            }
            .load_more {
              width: 100%;
              text-align: center;
              height: 20px;
              background: #f5f5f5;
              margin-top: 1px;
            }
            .load_more a {
              color: #ff0000;
            }
            .load_more span {
              background: #ffffff;
              padding: 3px 11px;
              font-size: 12px;
              text-transform: uppercase;
              font-weight: 600;
            }
            .page_title {
              color: #e1261d;
              line-height: 27px;
              margin-bottom: 5px;
              text-transform: uppercase;
              font-size: 22px;
              font-family: "Fira Sans";
            }
            .page_title span {
              color: #202020;
              font-weight: normal;
            }
            .latest_photo {
              width: 447px;
            }
            .most_run_left {
              width: 447px;
            }
            .mostrun_section {
              width: 100%;
              display: flex;
              justify-content: space-between;
            }
            .points_table_section {
              width: 100%;
              display: flex;
              justify-content: space-between;
            }
            .border_title:after {
              width: 100%;
              height: 3px;
              background: #e1261d;
              content: "";
              position: absolute;
              left: 0;
              bottom: 10px;
            }
            .border_title {
              width: 100%;
              position: relative;
            }
            .world-series-schedule .border_title .page_title {
              background: #fff;
            }
            .border_title .page_title {
              background: #f5f5f5;
              display: inline-block;
              position: relative;
              z-index: 1;
              padding-right: 7px;
            }
            .series_result {
              background: #f5f5f5 0% 0% no-repeat padding-box;
              border: 1px #d8d8d8 solid;
              margin-bottom: 10px;
              padding: 15px 0;
              border-left: 4px #e1261d solid;
              display: flex;
              align-items: baseline;
              padding-left: 0;
            }
            .series_result_left {
              width: 80%;
              height: 100%;
              border-right: 1px solid #d2d2d2;
              padding-right: 20px;
            }
            .series_result_right {
              width: 20%;
              height: 100%;
              padding-left: 20px;
            }
            .world-series-schedule .border_title .page_title {
              background: #fff;
            }
            .series_result_info {
              background: #ffffff 0% 0% no-repeat padding-box;
              border: 1px solid #d2d2d2;
              border-left: 0;
              padding: 15px 20px 0;
              margin-top: 10px;
            }
            .result_flag_row {
              display: flex;
              align-items: center;
              width: 100%;
            }
            .result_flag {
              display: flex;
              align-items: center;
            }
            .flag_icons_result {
              width: 72px;
              height: 49px;
              background: #ffffff 0% 0% no-repeat padding-box;
              box-shadow: 0px 3px 6px #00000029;
              border: 1px solid #ffffff;
              background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/all_flags_big.svg);
              background-position: -6px -912px;
            }
            .series_name {
              letter-spacing: 0px;
              color: #7b7b7b;
              font-size: 12px;
              line-height: 15px;
            }
            .series_run {
              color: #001d42;
              font-size: 20px;
              font-weight: bold;
              width: 100%;
              display: block;
              padding-top: 4px;
            }
            .series_run sub {
              color: #606060;
              font-size: 12px;
              font-weight: normal;
              position: relative;
              top: -7px;
            }
            .result_flag .vs {
              padding-right: 20px;
            }
            .result_row {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: start;
              border-bottom: 1px dashed #d5d5d5;
              padding-bottom: 20px;
            }
            .result_row .result_flag_row:nth-child(odd) .series_run_info {
              padding-left: 15px;
            }
            .result_row .result_flag_row:nth-child(even) .series_run_info {
              padding-left: 15px;
            }
            .result_flag_row .vs {
              padding: 0 15px;
            }
            .run_info {
              letter-spacing: 0px;
              color: #e1261d;
              font-size: 14px;
              line-height: 25px;
              font-weight: bold;
              padding-top: 4px;
              display: block;
            }
            ul.check_list li a {
              letter-spacing: 0px;
              color: #e1261d;
              text-transform: uppercase;
              font-size: 13px;
              line-height: 28px;
              text-decoration: underline;
            }
            ul.check_list li {
              position: relative;
              padding-left: 12px;
            }
            ul.check_list li:after {
              content: "";
              position: absolute;
              left: 0;
              top: 13px;
              background: #e1261d;
              font-size: 19px;
              width: 4px;
              height: 4px;
              border-radius: 100px;
            }
            .series_result_right span {
              color: #606060;
              font-size: 11px;
              font-weight: bold;
              padding-bottom: 10px;
              display: block;
            }
            .result_intrp {
              font-size: 13px;
              line-height: 20px;
              color: #292929;
            }
            .schedule-date {
              letter-spacing: 0px;
              text-transform: uppercase;
              font-size: 17px;
              color: #e1261d;
              font-weight: bold;
              display: block;
              padding-left: 14px;
              position: relative;
              margin-bottom: 5px;
            }
            .schedule-date:after {
              content: "";
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              width: 5px;
              height: 5px;
              transform: rotate(-45deg);
              position: absolute;
              left: 0;
              top: 9px;
            }
            .schedule-date span {
              color: #202020;
              font-weight: normal;
            }
            .schedule-box {
              background: #f5f5f5 0% 0% no-repeat padding-box;
              border: 1px #d8d8d8 solid;
              margin-bottom: 10px;
              padding: 10px;
              border-left: 4px #e1261d solid;
              display: flex;
              align-items: center;
            }
            .schedule-name {
              font-size: 16px;
              color: #001d42;
              font-weight: bold;
              line-height: 25px;
              padding: 0px 0 5px 15px;
            }
            .schedule-info {
              font-size: 14px;
              line-height: 25px;
              padding-left: 15px;
              color: #464646;
            }
            .schedule-name span {
              font-weight: normal;
              padding: 0 5px;
            }
            .schedule-row {
              margin-top: 20px;
            }
            .filter_schedule {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px dashed #707070;
              margin: 22px 0;
              padding-bottom: 20px;
            }
            .filter_left {
              display: flex;
              align-items: center;
            }
            .filter_title {
              color: #464646;
              font-size: 13px;
              line-height: 15px;
              font-weight: bold;
              position: relative;
              margin-right: 10px;
              background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/filter-icon.svg);
              background-repeat: no-repeat;
              background-position: left center;
              padding-left: 20px;
            }
            .filter_left select {
              background: #f5f5f5 0% 0% no-repeat padding-box;
              border: 1px solid #cccccc;
              border-radius: 5px;
              height: 30px;
              appearance: none;
              color: #202020;
              font-size: 13px;
              font-family: "Fira Sans";
              width: 120px;
              padding: 0 10px;
              background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/filter-arrow-icon.svg);
              background-position: 90%;
              margin-right: 10px;
            }
            .filter_right {
              display: flex;
              align-items: center;
            }
            .clear_filter {
              width: 120px;
              height: 22px;
              background: #e1261d 0% 0% no-repeat padding-box;
              border-radius: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              letter-spacing: 0px;
              color: #ffffff;
              text-transform: uppercase;
              font-size: 12px;
              font-weight: bold;
              margin-left: 10px;
            }
            ul.filter_name {
              display: flex;
              align-items: center;
            }
            ul.filter_name li a {
              color: #e1261d;
              font-size: 13px;
            }
            ul.filter_name li {
              display: flex;
              align-items: center;
              padding-left: 10px;
            }
            ul.filter_name li i {
              padding-right: 5px;
              cursor: pointer;
            }
            .afghanistan {
              background-position: -6px 0;
            }
            .england {
              background-position: -6px -170px;
            }
            .namibia {
              background-position: -6px -341px;
            }
            .oman {
              background-position: -6px -513px;
            }
            .scotland {
              background-position: -6px -683px;
            }
            .west-indies {
              background-position: -6px -855px;
            }
            .australia {
              background-position: -6px -56px;
            }
            .india {
              background-position: -6px -228px;
            }
            .netherlands {
              background-position: -6px -398px;
            }
            .pakistan {
              background-position: -6px -569px;
            }
            .south-africa {
              background-position: -6px -741px;
            }
            .bangladesh {
              background-position: -6px -114px;
            }
            .ireland {
              background-position: -6px -285px;
            }
            .new-zealand {
              background-position: -6px -456px;
            }
            .papua-new-guinea {
              background-position: -6px -627px;
            }
            .sri-lanka {
              background-position: -6px -798px;
            }
          `}
        </style>
      </>
    );
  }
};

export default ResultsComponent;
