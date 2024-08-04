import React, { useState } from "react";
import Slider from "react-slick";
import LazyLoadImage from "components/Common/LazyLoadImage";
import { limitChar } from "includes/article.util";
import LazyLoadCustomImage from "components/Common/CustomImage";

const CnSeriesWidget = ({ homeSeriesData, isMobile, matchSchedule, matchResult }) => {
  const [activeState, setActiveState] = useState("schedule");

  const changeState = (e, state) => {
    setActiveState(state);
  };

  const { storiesListLeft = [], storiesListRight = [], cnWidgetCompleteScheduleUrl, cnWidgetCompleteResultUrl, enableCricketCreative, cnWidgetImage, cnWidgetHeadline, cricketCreativeUrl, matchDate } = homeSeriesData;

  const mobileStoriesSliderData = [...storiesListLeft, ...storiesListRight];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: false,
    centerMode: true,
  };

  return (
    <>
      {isMobile ? (
        <div className="cn-serieswidget CN-Sections">
          <div className="banner">
            {enableCricketCreative && <a href={cricketCreativeUrl}>
              <LazyLoadImage height={94} src={cnWidgetImage} alt={cnWidgetHeadline} title={cnWidgetHeadline} dontAlter />
            </a>}
          </div>
          <div className="widgetWrap">
            <ul className="cn-serieswidgetHead">
              <li className={`cnTabLinks ${activeState == "schedule" ? "active" : ""}`}>
                <a onClick={(e) => changeState(e, "schedule")}>शेड्यूल</a>
              </li>
              <li className={`cnTabLinks ${activeState == "result" ? "active" : ""}`}>
                <a onClick={(e) => changeState(e, "result")}>नतीजे</a>
              </li>
              <li className={`cnTabLinks ${activeState == "series" ? "active" : ""}`}>
                <a onClick={(e) => changeState(e, "series")}>सीरीज की खबरें</a>
              </li>
            </ul>
            <div className="cn-serieswidgetMain">
              <div className={`cn-serieswidget-box cnTabContent schedule ${activeState !== "schedule" ? "hide" : ""}`}>
                <div className="cn-list-container">
                  {matchSchedule &&
                    matchSchedule.length ?
                    matchSchedule.map((match, index) => {
                      const teamA = match?.teama_short || match?.teama;
                      const teamB = match?.teamb_short || match?.teamb;
                      return (
                        <div className="cn-row-2" key={"matchSchedule" + index}>
                          <div className="date-text">
                            {match?.matchType || match?.matchtype} | {match?.matchdate || matchDate} {isMobile && `| ${match?.venue}`}
                          </div>
                          <div className="teams-vs">
                            {teamA} <span>vs</span> {teamB}
                          </div>
                          {!isMobile && <div className="text-box dark">{match?.venue}</div>}
                        </div>
                      );
                    }) : null}
                  <div className="ftr">
                    <div className="ftr-box1 ftr-boximg2">
                      <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/schedule-bg1.png" alt="" />
                    </div>
                    <div className="ftr-box2">
                      <a href={cnWidgetCompleteScheduleUrl?.includes("icc-t20-world-cup") ? "/cricket/icc-t20-world-cup/schedule/" : cnWidgetCompleteScheduleUrl}>
                        पूरा देखें <span>शेड्यूल</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`cn-serieswidget-box cnTabContent result ${activeState !== "result" ? "hide" : ""}`}>
                <div className="cn-list-container">
                  {matchResult?.length ?
                    matchResult.map((result, index) => {
                      const date = result?.matchDetail?.matchdate;
                      const teamA = result?.matchDetail?.first?.team?.teama_short || result?.teama;
                      const teamB = result?.matchDetail?.second?.team?.teamb_short || result?.teamb;
                      return (
                        <div className="cn-row-2" key={"matchResult" + index}>
                          <div className="date-text">
                            {result?.matchType || result?.matchtype} | {date}
                          </div>
                          <div className="teams-vs">
                            {teamA} <span>vs</span> {teamB}
                          </div>
                          <div className="text-box">{result?.matchDetail?.matchresult}</div>
                        </div>
                      );
                    }) : null}
                  <div className="ftr">
                    <div className="ftr-box1 ftr-boximg2">
                      <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/schedule-bg1.png" alt="" />
                    </div>
                    <div className="ftr-box2">
                      <a href={cnWidgetCompleteResultUrl?.includes("icc-t20-world-cup") ? "/cricket/icc-t20-world-cup/results/" : cnWidgetCompleteResultUrl}>
                        पूरा देखें <span>नतीजे</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`cn-serieswidget-box cnTabContent series ${activeState !== "series" ? "hide" : ""}`}>
                {mobileStoriesSliderData?.length ? (
                  <Slider {...settings}>
                    {mobileStoriesSliderData.map((story, index) => (
                      <a href={story?.weburl_r} className="cn-series-list-mobile" key={"mobileStoriesSliderData" + index}>
                        <div className="imgwrap">
                          <LazyLoadCustomImage
                            src={story?.images?.url}
                            width={340}
                            height={230}
                            alt={story?.display_headline}
                            title={story?.display_headline}
                            defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                            isLazyLoad={true}
                          />
                        </div>
                        <p className="heading">{story?.display_headline}</p>
                      </a>
                    ))}
                  </Slider>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cn-serieswidget">
          <div className="banner">
            {enableCricketCreative ? <a href={cricketCreativeUrl}>
              <LazyLoadImage height={100} width={914} src={cnWidgetImage} alt={cnWidgetHeadline} title={cnWidgetHeadline} dontAlter />
            </a> : null}
          </div>
          <div className="widgetWrap">
            <ul className="cn-serieswidgetHead">
              <li className={`cnTabLinks ${activeState == "schedule" ? "active" : ""}`}>
                <a onClick={(e) => changeState(e, "schedule")}>सीरीज के शेड्यूल/नतीजे</a>
              </li>
              <li className={`cnTabLinks ${activeState == "series" ? "active" : ""}`}>
                <a onClick={(e) => changeState(e, "series")}>सीरीज की खबरें</a>
              </li>
            </ul>
            <div className="cn-serieswidgetMain">
              <div className={`cn-serieswidget-box cnTabContent Results ${activeState == "series" ? "hide" : ""}`}>
                {matchSchedule && matchSchedule?.length > 0 && (
                  <div className="cn-series-list3">
                    <h3 className="series-head-1">शेड्यूल</h3>
                    <div className="cn-list-container">
                      {matchSchedule &&
                        matchSchedule.length ?
                        matchSchedule.map((match, index) => {
                          const teamA = match?.teama_short || match?.teama;
                          const teamB = match?.teamb_short || match?.teamb;
                          return (
                            <div className="cn-row-2" key={"newMatchSchedule" + index}>
                              <div className="date-text">
                                {match?.matchType || match?.matchtype} | {match?.matchdate || matchDate}
                              </div>
                              <div className="teams-vs">
                                {teamA} <span>vs</span> {teamB}
                              </div>
                              <div className="text-box dark">{match?.venue}</div>
                            </div>
                          );
                        }) : null}
                      <div className="ftr">
                        <div className="ftr-box1 ftr-boximg2">
                          <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/schedule-bg2.png" alt="" />
                        </div>
                        <div className="ftr-box2">
                          <a href={cnWidgetCompleteScheduleUrl?.includes("icc-t20-world-cup") ? "/cricket/icc-t20-world-cup/schedule/" : cnWidgetCompleteScheduleUrl}>
                            पूरा देखें <span>शेड्यूल</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {matchResult && matchResult?.length > 0 && (
                  <div className="cn-series-list3">
                    <h3 className="series-head-1">नतीजे</h3>
                    <div className="cn-list-container">
                      {matchResult?.map((result) => {
                        const date = result?.matchDetail?.matchdate;
                        const teamA = result?.matchDetail?.first?.team?.teama_short || result?.teama;
                        const teamB = result?.matchDetail?.second?.team?.teamb_short || result?.teamb;
                        return (
                          <div className="cn-row-2">
                            <div className="date-text">
                              {result?.matchType || result?.matchtype} | {date}
                            </div>
                            <div className="teams-vs">
                              {teamA} <span>vs</span> {teamB}
                            </div>
                            <div className="text-box">{result?.matchDetail?.matchresult}</div>
                          </div>
                        );
                      }
                      )}
                      <div className="ftr">
                        <div className="ftr-box1 ftr-boximg2">
                          <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/schedule-bg3.png" alt="" />
                        </div>
                        <div className="ftr-box2">
                          <a href={cnWidgetCompleteResultUrl?.includes("icc-t20-world-cup") ? "/cricket/icc-t20-world-cup/results/" : cnWidgetCompleteResultUrl}>
                            पूरा देखें <span>नतीजे</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`cn-serieswidget-box1 cnTabContent Videos ${activeState == "schedule" ? "hide" : ""}`}>
                <ul className="cn-series-list1">
                  {storiesListLeft?.length ?
                    storiesListLeft.map((story) => {
                      return (
                        <li>
                          <a href={story?.weburl_r}>
                            <div className="imgwrap">
                              <LazyLoadCustomImage
                                src={story?.images?.url}
                                width={214}
                                height={142}
                                alt={story?.display_headline}
                                title={story?.display_headline}
                                defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                                isLazyLoad={true}
                              />
                            </div>
                            <h3 className="series-head1">{story?.display_headline}</h3>
                            <p>{limitChar(story?.intro, 107) || ""}</p>
                          </a>
                        </li>
                      );
                    }) : null}
                </ul>
                <ul className="cn-series-list2">
                  {storiesListRight?.length ?
                    storiesListRight.map((story) => {
                      return (
                        <li>
                          <a href={story?.weburl_r}>
                            <div className="imagewrap">
                              <LazyLoadCustomImage
                                src={story?.images?.url}
                                width={90}
                                height={60}
                                alt={story?.display_headline}
                                title={story?.display_headline}
                                defaultImageURL="https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg"
                                isLazyLoad={true}
                              />
                            </div>
                            <div className="contentbox">
                              <h3 className="series-head2">{story?.display_headline}</h3>
                            </div>
                          </a>
                        </li>
                      );
                    }) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .cn-serieswidget {
          margin-bottom: 25px;
          border: 5px solid #202020;
          font-family: 'Mukta',sans-serif;
        }
        .cn-serieswidget .banner img {
          display: block;
          width: 100%;
        }
        .cn-serieswidget .widgetWrap {
          padding: 12px;
          background: #f5f5f5;
        }
        .cn-serieswidget .widgetWrap .cn-serieswidgetHead {
          display: flex;
          background: #fff;
          margin-bottom: 12px;
          border-bottom: 1px solid #cccccc;
        }
        .cn-serieswidget .widgetWrap .cn-serieswidgetHead li.active a {
          font-weight: bold;
          color: #e1261c;
          position: relative;
        }
        .cn-serieswidget .widgetWrap .cn-serieswidgetHead li a {
          display: block;
          text-align: center;
          font-size: 18px;
          text-transform: uppercase;
          color: #202020;
          padding: 7px 15px;
          cursor: pointer;
        }
        .cn-serieswidget .widgetWrap .cn-serieswidgetHead li.active a:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #e1261c;
          bottom: 0;
          left: 0;
        }
        .cn-serieswidget-box {
          display: flex;
          justify-content: space-between;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box {
          display: block;
        }
        .cn-serieswidget-box .cn-series-list3 {
          width: 49.5%;
        }
        .cn-serieswidget-box .cn-series-list3 .series-head-1 {
          color: #909090;
          font-size: 24px;
          text-align: right;
          padding-right: 15px;
          font-weight: normal;
        }
        .cn-serieswidget-box .cn-list-container {
          border: 1px solid #cccccc;
          border-radius: 8px;
          padding: 10px;
          background: #ffffff;
          padding-bottom: 0;
          overflow: hidden;
        }
        .cn-serieswidget-box .cn-list-container .cn-row-2 {
          padding: 10px 0;
          color: #464646;
          font-size: 16px;
          border-bottom: 1px solid #d8d8d8;
          padding-left: 12px;
          background: #f5f5f5;
          position: relative;
          z-index: 2;
          line-height: 17px;
        }
        .cn-serieswidget-box .cn-list-container .cn-row-2:before {
          content: "";
          width: 4px;
          height: 100%;
          background: #e1261d;
          position: absolute;
          top: 0;
          left: 0;
        }
        .cn-serieswidget-box .cn-list-container .cn-row-2 .date-text {
          padding-bottom: 8px;
        }
        .cn-serieswidget-box .cn-list-container .cn-row-2 .teams-vs {
          font-weight: bold;
          color: #001d42;
          padding-bottom: 8px;
        }
        .cn-serieswidget-box .cn-list-container .cn-row-2 .text-box.dark {
          color: #464646;
        }
        .cn-serieswidget-box .cn-list-container .cn-row-2 .text-box {
          font-size: 13px;
          color: #E1261D; 
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box.result .cn-list-container .cn-row-2 .text-box {
          color: #E1261D; 
        }
        .cn-serieswidget-box .cn-list-container .ftr {
          display: flex;
          margin-left: -10px;
          margin-right: -10px;
          justify-content: space-between;
          align-items: flex-end;
        }
        .cn-serieswidget-box .cn-list-container .ftr .ftr-box1.ftr-boximg2 {
          height: 61px;
        }
        .cn-serieswidget-box .cn-list-container .ftr .ftr-box1 {
          width: 185px;
          height: 95px;
          position: relative;
        }
        .cn-serieswidget-box .cn-list-container .ftr .ftr-box1 img {
          display: block;
        }
        .cn-serieswidget-box .cn-list-container .ftr .ftr-box2 {
          color: #001d42;
          font-size: 15px;
          text-transform: uppercase;
          text-align: right;
          padding-right: 10px;
          padding-bottom: 5px;
          padding-top: 10px;
        }
        .cn-serieswidget-box .cn-list-container .ftr .ftr-box2 span {
          font-weight: bold;
        }
        .cn-serieswidget-box .cn-list-container .ftr .ftr-box2 span {
          display: block;
          color: #e1261d;
          font-size: 22px;
        }

        .cn-serieswidget-box1 {
          display: flex;
          justify-content: space-between;
        }
        .cn-serieswidget-box1 .cn-series-list1 {
          width: 49.5%;
          display: flex;
          justify-content: space-between;
        }
        .cn-serieswidget-box1 .cn-series-list1 li {
          width: 48.5%;
        }
        .cn-serieswidget-box1 .cn-series-list1 li a {
          display: block;
        }
        .cn-serieswidget-box1 .cn-series-list1 li a .imgwrap {
          margin-bottom: 5px;
        }
        .cn-serieswidget-box1 .cn-series-list1 li a .series-head1 {
          font-size: 16px;
          margin-bottom: 5px;
          line-height: 1.5;
        }
        .cn-serieswidget-box1 .cn-series-list1 li a:hover{
          color: #111;
        }
        .cn-serieswidget-box1 .cn-series-list1 li a p {
          color: #323232;
          font-size: 13px;
          line-height: 20px;
          margin-bottom: 0;
        }
        .cn-serieswidget-box1 .cn-series-list2 {
          width: 49%;
        }
        .cn-serieswidget-box1 .cn-series-list2 li:first-child {
          padding-top: 0;
        }
        .cn-serieswidget-box1 .cn-series-list2 li {
          padding: 10px 0;
          border-bottom: 1px solid #dadada;
        }
        .cn-serieswidget-box1 .cn-series-list2 li a {
          display: flex;
        }
        .cn-serieswidget-box1 .cn-series-list2 li a .imagewrap {
          flex: 0 0 90px;
          margin-right: 10px;
          position: relative;
        }
        .cn-serieswidget-box1 .cn-series-list2 li a .imagewrap img {
          display: block;
        }
        .cn-serieswidget-box1 .cn-series-list2 li a .contentbox .series-head2 {
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 5px;
          font-weight: normal;
        }
        .cnTabContent.hide {
          display: none;
        }

        .CN-Mobile-HomeOuter .cn-serieswidget .widgetWrap{
          padding: 0;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box.schedule,
        .CN-Mobile-HomeOuter .cn-serieswidget-box.result{
          margin: 10px;
          padding-bottom: 10px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box.series{
          padding-bottom: 30px;
          overflow: hidden;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .cn-list-container .cn-row-2 {
          font-size: 13px;
          padding: 5px 0 5px 12px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .cn-list-container .cn-row-2 .date-text {
          padding-bottom: 5px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .cn-list-container .cn-row-2 .teams-vs {
          font-weight: normal;
          font-size: 16px;
          padding-bottom: 5px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .cn-list-container .ftr .ftr-box1.ftr-boximg2 {
          height: 95px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .cn-list-container .ftr {
          margin-top: -38px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .cn-list-container .ftr .ftr-box2 {
          padding-bottom: 0;
        }
        .CN-Mobile-HomeOuter .cn-series-list-mobile {
          display: block;
          border: 1px solid #d7d7d7;
          border-radius: 5px;
          overflow: hidden;
        }
        .CN-Mobile-HomeOuter .cn-series-list-mobile .imgwrap {
          position: relative;
        }
        .CN-Mobile-HomeOuter .cn-series-list-mobile .heading {
          font-size: 16px;
          line-height: 1.5;
          color: #0a0a0a;
          padding: 7px 10px 10px;
          white-space: initial;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget{
          border: none;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box.series .slick-track {
          color: #fff;
          position: relative;
          width: 100%;
          list-style: none;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          touch-action: pan-Y;
          overflow: hidden;
          padding: 0;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
          will-change: transform;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box.series .slick-slide {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          margin-right: 5px;
          margin-left: 5px;
        }
        .CN-Mobile-HomeOuter .slick-slide:first-child {
          margin-right: 0px;
        }
        .CN-Mobile-HomeOuter .slick-slide a {
          user-select: none;
          -webkit-user-drag: none;
          -moz-user-select: none;
          -ms-user-select: none;
          color: #fff;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .slick-dots {
          background: #f5f5f5;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .slick-dots li button:before{
          content: '';
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .slick-dots li {
          width: 20px;
          height: 4px;
          border-radius: 20px;
          border: 0;
          background: #202020;
          padding: 0;
          margin: 0 2px;
        }
        .CN-Mobile-HomeOuter .cn-serieswidget-box .slick-dots li.slick-active {
          background: #e1261d;
        }
      `}</style>
    </>
  );
};

export default CnSeriesWidget;
