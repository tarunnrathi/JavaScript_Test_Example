import { useState } from "react";
import { getStatus, trans, gDesc } from "includes/aqi.helper";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import { arrayOnly } from "includes/article.util";
import AirPollution from "components/Common/AqiTable";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import LazyLoadImage from "components/Common/CustomImage";

const Aqi = ({ topPriorityData = {} }) => {
  const [tabBtn, setTabBtn] = useState("tab-1");
  const [toggel, setToggle] = useState(false);
  const [citydetailsInfo, setcitydetailsInfo] = useState([]);
  const {
    aqiData: { data: statesData = {} },
    cityName,
    stories,
    pageAds,
    photoStories,
    topStories,
  } = topPriorityData || {};
  let citydetails = {};
  let cityListInfo = [];
  const stateList = Object.keys(statesData);
  stateList?.map((item) => {
    const stateDetails = statesData[item];
    cityListInfo = cityListInfo?.concat(stateDetails);
    if (Object?.keys(citydetails || {})?.length > 0) {
      return true;
    } else {
      citydetails = stateDetails?.find((cityInfo) => {
        if (cityInfo?.locationName?.toLowerCase() === cityName.toLowerCase()) {
          citydetails = cityInfo;
          return true;
        }
      });
    }
  });
  if (tabBtn === "tab-1") {
    cityListInfo = cityListInfo.sort((a, b) => {
      if (a.locationName < b.locationName) {
        return -1;
      }
    });
  }
  const updateTab = (tab, data) => {
    if (tab === "tab-1") {
      data = cityListInfo.sort((a, b) => {
        if (a.locationName < b.locationName) {
          return -1;
        }
      });
      setToggle(true);
      setTabBtn(tab);
      setcitydetailsInfo([...data]);
    }
    if (tab === "tab-2") {
      data.sort((a, b) => {
        return (
          parseInt(
            b?.airComponents[0]?.sensorData || b?.airComponents[1]?.sensorData
          ) -
          parseInt(
            a?.airComponents[0]?.sensorData || a?.airComponents[1]?.sensorData
          )
        );
      });
      setToggle(true);
      setTabBtn(tab);
      setcitydetailsInfo([...data]);
    }
    if (tab === "tab-3") {
      data.sort((a, b) => {
        return (
          parseInt(
            a?.airComponents[0]?.sensorData || a?.airComponents[1]?.sensorData
          ) -
          parseInt(
            b?.airComponents[0]?.sensorData || b?.airComponents[1]?.sensorData
          )
        );
      });
      setToggle(true);
      setTabBtn(tab);
      setcitydetailsInfo([...data]);
    }
    if (tab === "tab-4") {
      const majorCities = [
        "Ahmedabad",
        "Bangalore",
        "Chennai",
        "Hyderabad",
        "Kolkata",
        "Mumbai",
        "New Delhi",
        "Pune",
      ];
      const filterMajorCities = cityListInfo?.filter((e) =>
        majorCities.includes(e?.locationName)
      );
      setToggle(true);
      setTabBtn(tab);
      setcitydetailsInfo([...filterMajorCities]);
    }
  };
  const mainSensor = arrayOnly(citydetails?.airComponents)?.find(
    (i) => i.sensorUnit == "AQI-US"
  )?.sensorData;
  const mainStatus = getStatus(mainSensor);
  let majorAirPol = {};
  arrayOnly(citydetails?.airComponents)?.forEach((li) => {
    majorAirPol[li.sensorName] = li.sensorData;
  });
  return (
    <>
      <div className="wrapper">
        <div className="innercontainer">
          <div className="pageLeft">
            <div className="brade_crum">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>{" "}
                »
                {!citydetails ? (
                  <li>
                    <h1>Aqi India</h1>
                  </li>
                ) : (
                  <>
                    <li>
                        Aqi India
                    </li>
                    »
                    <li>
                      <h1>Aqi in {citydetails?.locationName || "India"}</h1>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="aqiBannerOutter">
              <div className="aqiBannerWrapper">
                <div className="aqiBannerIcon">
                  <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/aqi-india/aqi_bannerimg.jpg" />
                </div>
                <div className="aqiBannerInner">
                  <div className="aqiBannerHead">
                    <div className="headingWrap">
                      <h2 className="heading">
                        {citydetails?.locationName
                          ? `${trans(
                              citydetails?.locationName
                            )} का एयर क्वालिटी इंडेक्स`
                          : "भारत में एयर क्वालिटी इंडेक्स"}
                      </h2>
                      {/* <h3 className="subheading">
                        Real-time Air Quality Index (AQI) & air pollution level
                      </h3> */}
                    </div>
                    {/* <div className="searchBar">
                      <input type="text" placeholder="Search any city for AQI update" />
                      <button type="submit">
                        <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/aqi-india/search-icon.png" />
                      </button>
                    </div> */}
                  </div>
                  <div className="aqiBannerMain">
                    {Object.keys(citydetails || {}).length > 0 && (
                      <div className="counterBox">
                        <span className={`number ${mainStatus}`}>
                          {mainSensor}
                        </span>
                        <span className="txt">AQI-US</span>
                      </div>
                    )}
                    <div className="discWraper">
                      {Object.keys(citydetails || {}).length > 0 && (
                        <div className="discHeader">
                          <div className={`airStatus ${mainStatus}-back`}>
                            {mainStatus}
                          </div>
                          <div className="timeStamp">
                            Last Updated: {citydetails?.formatdate}
                          </div>
                        </div>
                      )}
                      <div className="discription">
                        {gDesc(
                          citydetails?.locationName || "India",
                          citydetails
                        )}
                      </div>
                      {Object.keys(citydetails || {}).length > 0 && (
                        <div className="avatar">
                          <img
                            src={`/images/aqi/${mainStatus}${
                              mainStatus == "good" &&
                              mainSensor <= 100 &&
                              mainSensor >= 51
                                ? "-two"
                                : ""
                            }.png`}
                            width={125}
                            height={133}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {Object.keys(citydetails || {}).length > 0 && (
                <div className="majorPollutionStrip">
                  <div className="avtart">
                    <img
                      alt="avatar"
                      src="/images/aqi/majorAirPollutant.svg"
                      className=""
                    />
                    <div className="text">
                      MAJOR
                      <br className="" />
                      AIR POLLUTANTS{" "}
                      <span className="">
                        In {citydetails?.locationName || "India"}
                      </span>
                    </div>
                  </div>
                  <div className="pollutionNumber">
                    <div className="numberboxWrap">
                      <div className="numberbox poor">{majorAirPol?.pm25}</div>
                      <div className="numberboxText">(PM2.5)</div>
                    </div>
                    <div className="numberboxWrap">
                      <div className=" numberbox moderate">
                        {majorAirPol?.pm10}
                      </div>
                      <div className="numberboxText">(PM10)</div>
                    </div>
                    <div className="numberboxWrap">
                      <div className="numberbox severe">{majorAirPol?.so2}</div>
                      <div className="numberboxText">(SO2)</div>
                    </div>
                    <div className="numberboxWrap">
                      <div className="numberbox unhealthy">
                        {majorAirPol?.o3}
                      </div>
                      <div className="numberboxText">(OZONE)</div>
                    </div>
                    <div className="numberboxWrap">
                      <div className="numberbox good">{majorAirPol?.no2}</div>
                      <div className="numberboxText">(NO2)</div>
                    </div>
                  </div>
                </div>
              )}
              <div className="aqiTableWrapper">
                <div className="tableTabsWrapper">
                  <ul className="tableTabs">
                    <li
                      className={tabBtn === "tab-1" ? "active" : ""}
                      onClick={() => {
                        updateTab("tab-1", cityListInfo);
                      }}
                    >
                      <div className="heading">AIR POLLUTION LEVEL</div>
                      <div className="subHeading">IN {"INDIA"}</div>
                    </li>
                    <li
                      className={tabBtn === "tab-2" ? "active" : ""}
                      onClick={() => {
                        updateTab("tab-2", cityListInfo);
                      }}
                    >
                      <div className="heading">MOST POLLUTED CITIES</div>
                      <div className="subHeading">IN {"INDIA"}</div>
                    </li>
                    <li
                      className={tabBtn === "tab-3" ? "active" : ""}
                      onClick={() => {
                        updateTab("tab-3", cityListInfo);
                      }}
                    >
                      <div className="heading">LEAST POLLUTED CITIES</div>
                      <div className="subHeading">IN {"INDIA"}</div>
                    </li>
                    <li
                      className={tabBtn === "tab-4" ? "active" : ""}
                      onClick={() => {
                        updateTab("tab-4", cityListInfo);
                      }}
                    >
                      <div className="heading">MAJOR CITIES</div>
                      <div className="subHeading">IN {"INDIA"}</div>
                    </li>
                  </ul>
                  <div className="sponserbox">
                    <div className="heading">Powered By</div>
                    <a href={"https://www.aqi.in/dashboard/india"}>
                      <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/aqi-india/aqi-sponsor-logo.jpg" />
                    </a>
                  </div>
                </div>
                <AirPollution
                  data={toggel ? citydetailsInfo : cityListInfo}
                  toggel={toggel}
                />
              </div>
              <div className="latestStoryWrapper">
                <div className="heading_title">
                  <h2>Latest Stories</h2>
                </div>
                <div className="latestStoryInner">
                  <div className="full_coverage">
                    <div className="full_coverage_top">
                      <a href={stories[0]?.weburl}>
                        <figure>
                          <LazyLoadImage
                            src={stories[0]?.images?.url}
                            width={331}
                            height={221}
                            isLazyLoad={true}
                          />
                          <h2 className="coverage_title">
                            {stories[0]?.display_headline || ""}
                          </h2>
                        </figure>
                      </a>{" "}
                      <a
                        href={stories[0]?.weburl}
                        className="full_coverage_link"
                      >
                        FULL COVERAGE
                      </a>
                    </div>
                    <div className="listing_row">
                      <a href={stories[1]?.weburl}>
                        <figure>
                          <div className="list_img">
                            <LazyLoadImage
                              src={stories[1]?.images?.url}
                              width={100}
                              height={67}
                              isLazyLoad={true}
                            />
                          </div>
                          <h2 className="listing_title">
                            {stories[1]?.display_headline || ""}
                          </h2>
                        </figure>
                      </a>
                    </div>{" "}
                  </div>
                  <div className="listing_news">
                    {stories?.slice(2, 7)?.map((item) => (
                      <div className="listing_row">
                        <a href={item.weburl}>
                          <figure>
                            <div className="list_img">
                              <LazyLoadImage
                                src={item?.images?.url}
                                width={100}
                                height={67}
                                isLazyLoad={true}
                              />
                            </div>
                            <h2 className="listing_title">
                              {item?.display_headline || ""}
                            </h2>
                          </figure>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="right_news">
                    {stories?.slice(7)?.map((item) => (
                      <div className="right_news_row">
                        <a href={item.weburl}>
                          <figure>
                            <div className="list_img">
                              <LazyLoadImage
                                src={item?.images?.url}
                                width={203}
                                height={136}
                                isLazyLoad={true}
                              />
                            </div>
                            <h2 className="listing_title">
                              {item?.display_headline || ""}
                            </h2>
                          </figure>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="more_story">
                    <a href="/tag/aqi/">
                      <span>MORE LATEST STORIES</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "18px" }}>
            <RhsCommon
              photoStories={photoStories}
              topStories={topStories}
              pageAds={pageAds}
              hideAstro={true}
              section={"aqi"}
            />
          </div>
          {typeof pageAds !== "undefined" &&
            typeof pageAds.Shosh_OOP_id !== "undefined" && (
              <NewSiteAd
                slotId="Shosh_OOP_id"
                adUnit={pageAds.Shosh_OOP_id}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                loadOnScroll={true}
              />
            )}
          {typeof pageAds.PG_1x1_2 !== "undefined" &&
            pageAds.PG_1x1_2 !== "" && (
              <NewSiteAd
                slotId="PG_1x1_2"
                adUnit={pageAds.PG_1x1_2}
                sizes={[[1, 1]]}
                removeAdSpan={true}
                loadOnScroll={true}
              />
            )}
        </div>
      </div>
      <style jsx global>{`
        .wrapper {
          width: 100%;
          background: #f5f5f5;
          overflow: hidden;
        }
        .innercontainer {
          max-width: 1284px;
          background: #fff;
          margin: auto;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
        }
        .pageLeft {
          // font-family: "mukta";
          width: 924px;
        }
        .RHS {
          width: 300px;
        }
        .brade_crum {
          position: relative;
          width: 924px;
        }
        .brade_crum ul {
          display: flex;
          padding-bottom: 5px;
          color: #969696;
          align-items: center;
          border-bottom: 1px #ccc dotted;
          //font-family: "mukta";
          margin-bottom: 15px;
        }
        .brade_crum li {
          text-transform: uppercase;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 11px;
          padding: 0 4px;
          color: #282828;
        }
        .brade_crum li:first-child {
          padding-left: 0;
        }
        .brade_crum li a {
          color: #969696;
          text-decoration: none;
        }
        .brade_crum li h1 {
          font-weight: 600;
          font-size: 11px;
        }
        // .aqiBannerWrapper {
        //   display: flex;
        //   justify-content: flex-end;
        //   position: relative;
        //   height: 230px;
        //   align-items: center;
        //   border: 1px solid #e6e6e6;
        //   overflow: hidden;
        // }
        .aqiBannerWrapper .aqiBannerIcon {
          position: absolute;
          left: 0;
        }
        .aqiBannerWrapper .aqiBannerIcon::after {
          content: "";
          width: 100%;
          height: 230px;
          background: -webkit-linear-gradient(
            left,
            transparent 0%,
            #ffffff 100%
          );
          position: absolute;
          bottom: 0;
        }
        .aqiBannerWrapper .aqiBannerIcon img {
          display: block;
        }
        .aqiBannerInner {
          width: calc(100% - 252px);
          position: relative;
          z-index: 1;
          padding-right: 20px;
          padding-top: 14px;
        }
        .aqiTableWrapper {
          margin-bottom: 25px;
        }
        .aqiBannerHead {
          display: flex;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .headingWrap .heading {
          font-size: 30px;
          line-height: 30px;
          color: #001d42;
        }
        .headingWrap .subheading {
          font-size: 13px;
          line-height: 20px;
          color: #464646;
          font-weight: normal;
        }
        .searchBar {
          width: 250px;
          border-radius: 5px;
          border: 1px solid #d8d8d8;
          display: flex;
          box-shadow: 0 5px 10px #00000029;
        }
        .searchBar input {
          border: 0;
          width: 100%;
          border-right: 1px solid #d8d8d8;
          padding: 10px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .searchBar input:focus {
          outline: 0;
        }
        .searchBar button {
          border: 0;
          width: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          cursor: pointer;
        }
        .aqiBannerMain {
          display: flex;
        }
        .aqiBannerMain .counterBox {
          margin-right: 26px;
        }
        .aqiBannerMain .counterBox span.number {
          display: block;
          font-size: 60px;
          font-weight: bold;
          position: relative;
          padding-bottom: 6px;
          margin-bottom: 10px;
        }
        .aqiBannerMain .counterBox span.number::after {
          content: "";
          width: 50px;
          height: 6px;
          display: table;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .aqiBannerMain .counterBox span.txt {
          font-size: 12px;
          line-height: 14px;
          color: #464646;
          display: block;
          text-align: center;
        }
        .aqiBannerMain .discWraper {
          margin-right: 26px;
        }
        .discHeader {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .discHeader .airStatus {
          width: 110px;
          height: 28px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-transform: capitalize;
        }
        .discHeader .timeStamp {
          margin-left: 12px;
          color: #7e7e7e;
          font-size: 12px;
          border-bottom: 1px solid #7e7e7e;
        }
        .aqiBannerMain .discWraper .discription {
          color: #464646;
          font-size: 13px;
          line-height: 21px;
        }
        .tableTabsWrapper {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .tableTabs {
          display: flex;
          margin-bottom: 10px;
        }
        .tableTabs li {
          margin-right: 15px;
          padding: 0 8px;
          width: 167px;
          height: 50px;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          position: relative;
          cursor: pointer;
        }
        .tableTabs li::after {
          content: "";
          width: 100%;
          height: 1px;
          background: #202020;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .tableTabs li:hover {
          background: #f5f5f5;
        }
        .tableTabs li .heading {
          width: 100%;
          display: block;
          font-size: 14px;
          color: #202020;
          font-weight: bold;
          text-align: center;
        }
        .tableTabs li .subHeading {
          width: 100%;
          display: block;
          text-align: center;
          font-size: 11px;
          line-height: 15px;
          text-transform: capitalize;
        }
        .tableTabs li.active {
          color: #e1261c;
          background: #f5f5f5;
        }
        .tableTabs li.active .heading {
          color: #e1261c;
        }
        .tableTabs li.active::after {
          background: #e1261c;
          height: 3px;
        }
        .tableTabs li.active::before {
          content: "";
          width: 0px;
          height: 0px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #e1261c;
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
        }
        .tableTabs li:last-child {
          margin-right: 0;
        }
        .sponserbox img {
          display: block;
        }
        .sponserbox .heading {
          font-size: 9px;
          color: #7e7e7e;
          text-transform: uppercase;
          letter-spacing: 8px;
          text-align: center;
        }
        .aqiTable {
          width: 100%;
          border-collapse: collapse;
        }
        .tableHeading {
          display: flex;
          align-items: center;
        }
        .tableHeading .filterIcon {
          width: 8px;
        }
        .tableHeading .txt {
          line-height: 10px;
          margin-right: 5px;
        }
        .tableHeading .filterIcon button {
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          width: 5px;
          height: 5px;
          transform: rotate(47deg);
          display: block;
          cursor: pointer;
        }
        .tableHeading .filterIcon button:last-child {
          transform: rotate(225deg);
        }
        .aqiTable tr th {
          background: #001d42;
          color: #fff;
          font-weight: normal;
          text-transform: uppercase;
          font-size: 12px;
          padding: 8px;
          height: 24px;
        }
        .aqiTable tr th:nth-child(1) {
          text-align: left;
          width: 240px;
        }
        .aqiTable tr td {
          font-size: 14px;
          padding: 13px;
          height: 34px;
          color: #202020;
        }
        .aqiTable tr td:nth-child(1) {
          text-align: left;
          color: #001d42;
          font-weight: bold;
        }
        .aqiTable tbody tr {
          border-bottom: 1px solid #d8d8d8;
        }
        .aqiTable tbody tr:nth-child(even) {
          background: #f5f5f5;
        }
        .aqiTable tr td a {
          color: #001d42;
          font-weight: bold;
          text-decoration: underline;
        }
        .aqiTable tr td.aqi_us {
          position: relative;
          font-weight: 600;
        }
        .aqiTable tr td.aqi_us::after {
          content: "";
          width: 50px;
          height: 6px;
          background: #8b8b8b;
          display: block;
          position: absolute;
          bottom: 5px;
          left: 19%;
          transform: translateX(-50%);
          border-radius: 50px;
        }
        .aqiTable tr td.aqi_us.poor::after,
        .poor::after,
        .poor-back {
          background: #ffa500;
        }
        .poor {
          color: #ffa500 !important;
        }
        .aqiTable tr td.aqi_us.moderate::after,
        .moderate::after,
        .moderate-back {
          background: #d4cc0f;
        }
        .moderate {
          color: #d4cc0f;
        }
        .aqiTable tr td.aqi_us.severe::after,
        .severe::after,
        .severe-back {
          background: #d4cc0f;
        }
        .severe {
          color: #d4cc0f;
        }
        .aqiTable tr td.aqi_us.unhealthy::after,
        .unhealthy::after,
        .unhealthy-back {
          background: #ff69b4;
        }
        .unhealthy {
          color: #ff69b4;
        }
        .aqiTable tr td.aqi_us.good::after,
        .good::after,
        .good-back {
          background: #34a12b;
        }
        .good {
          color: #34a12b;
        }
        .faqSection {
          margin-bottom: 30px;
        }
        .faqSection .faqHeading {
          color: #e1261d;
          font-size: 22px;
          margin-bottom: 5px;
        }
        .faqSection .faqSubHead {
          color: #464646;
          font-size: 13px;
          font-weight: normal;
          line-height: 15px;
          border-bottom: 1px solid #d8d8d8;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .faqAccordian li {
          border-bottom: 1px dotted #d8d8d8;
          padding: 12px 0;
          cursor: pointer;
        }
        .faqAccordian li h4 {
          font-size: 18px;
          color: #001d42;
          position: relative;
        }
        .faqAccordian li h4::after {
          content: "";
          border-top: 1px solid #001d42;
          border-left: 1px solid #001d42;
          width: 12px;
          height: 12px;
          transform: rotate(225deg);
          position: absolute;
          right: 3px;
          top: 0;
          transition: all 0.5s;
        }
        .faqAccordian li .faqAccordianContent {
          height: 0;
          transition: height 0.5s;
          overflow: hidden;
        }
        .faqAccordian li .faqAccordianContent.active {
          height: auto;
        }
        .faqAccordian li .faqAccordianContent p {
          color: #636363;
          font-size: 14px;
          line-height: 29px;
        }
        .faqAccordian li h4.active::after {
          transform: rotate(47deg);
          top: 8px;
        }
        .latestStoryInner {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          clear: both;
          flex-wrap: wrap;
        }
        .full_coverage {
          width: 355px;
        }
        .right_news {
          width: 213px;
        }
        .right_news_row img {
          width: 100%;
          display: block;
        }
        .full_coverage_top {
          width: 100%;
          border-bottom: 2px #e3e3e2 solid;
          padding-bottom: 5px;
          margin-bottom: 15px;
        }
        .full_coverage_top img {
          width: 100%;
          display: block;
        }
        .listing_news {
          width: 330px;
        }
        .listing_row img {
          width: 100%;
          display: block;
        }
        .listing_row a {
          color: #333333;
          text-decoration: none;
        }
        .listing_row figure {
          display: flex;
          align-items: flex-start;
        }
        .listing_row figure .list_img {
          width: 100px;
        }
        .listing_title {
          width: calc(100% - 100px);
          color: #333333;
          font-size: 13px;
          line-height: 19px;
          padding-left: 15px;
          //font-family: "mukta";
          font-weight: 400;
        }
        .listing_row {
          width: 100%;
          background: #f4f4f2;
          padding: 10px;
          margin-bottom: 15px;
          border-bottom: 2px #e3e3e2 solid;
        }
        .coverage_title {
          letter-spacing: -0.44px;
          color: #001d42;
          //font-family: "mukta";
          line-height: 28px;
          padding: 10px 0;
          font-size: 24px;
          min-height: 149px;
        }
        .full_coverage_top a {
          text-decoration: none;
        }
        .full_coverage_link {
          color: #f3352f;
          font-size: 13px;
          font-weight: bold;
          //font-family: "mukta";
          background-repeat: no-repeat;
          background-position: right center;
          padding-right: 25px;
          position: relative;
        }
        .full_coverage_link:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/link_arrow_1609601606.svg);
          content: "";
          position: absolute;
          right: 0;
          width: 18px;
          height: 18px;
          background-size: 18px;
          top: -1px;
        }
        .right_news_row .listing_title {
          width: 100%;
          padding: 10px;
          min-height: 106px;
        }
        .right_news_row {
          width: 100%;
          background: #f4f4f2;
          margin-bottom: 15px;
          border-bottom: 2px #e3e3e2 solid;
        }
        .right_news_row a {
          text-decoration: none;
        }
        .more_story {
          width: 100%;
          text-align: center;
          height: 10px;
          line-height: 5px;
        }
        .more_story a {
          background: #fff;
          padding: 0 12px;
          font-size: 12px;
          text-transform: uppercase;
          color: #e33a0f;
          font-weight: bold;
          //font-family: "mukta";
          text-decoration: none;
        }
        .more_story a span {
          border-bottom: 1px #e33a0f solid;
        }
        .latestStoryWrapper .heading_title {
          font-weight: normal;
          padding: 0;
          position: relative;
          margin-bottom: 5px;
          font-size: 22px;
          color: #e1261d;
        }
        .latestStoryWrapper .heading_title:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 3px;
          background: #ff0000;
          bottom: 4px;
          left: 0;
        }
        .latestStoryWrapper .heading_title h2 {
          background: #fff;
          position: relative;
          z-index: 1;
          display: inline-block;
          padding-right: 5px;
          // font-family: "mukta";
          font-weight: 600;
          font-size: 22px;
          text-transform: uppercase;
        }
        .majorPollutionStrip {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          padding-top: 10px;
          background: #f7f7f7;
          border: 1px solid #e6e6e6;
          margin-bottom: 30px;
        }
        .majorPollutionStrip .avtart {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-shrink: 0;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-right: 60px;
        }
        .majorPollutionStrip .pollutionNumber {
          width: 100%;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          margin-bottom: 10px;
        }
        .majorPollutionStrip .avtart .text {
          color: #001d42;
          font-weight: bold;
          font-size: 16px;
          text-transform: uppercase;
          margin-left: 5px;
        }
        .majorPollutionStrip .avtart .text span {
          display: block;
          color: #464646;
          font-size: 13px;
          font-weight: normal;
        }
        .majorPollutionStrip .pollutionNumber .numberboxWrap {
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          padding: 0 25px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-left: 1px solid #d8d8d8;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
        .majorPollutionStrip .pollutionNumber .numberboxWrap .numberbox {
          font-size: 30px;
          font-weight: bold;
          margin-right: 5px;
          position: relative;
          padding-bottom: 6px;
        }
        .majorPollutionStrip .pollutionNumber .numberboxWrap .numberboxText {
          color: #464646;
          font-size: 12px;
          text-transform: uppercase;
        }
        //new aqi widget css
        .aqiBannerWrapper {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: end;
          -webkit-justify-content: flex-end;
          -ms-flex-pack: end;
          justify-content: flex-end;
          position: relative;
          min-height: 230px;
          border: 1px solid #e6e6e6;
          overflow: hidden;
          padding-bottom: 20px;
        }
        .aqiBannerWrapper .aqiBannerIcon {
          position: absolute;
          left: 0;
          height: 100%;
        }
        .aqiBannerWrapper .aqiBannerIcon img {
          display: block;
          height: 100%;
        }
        .aqiBannerWrapper .aqiBannerIcon::after {
          content: "";
          width: 100%;
          height: 100%;
          background: -webkit-linear-gradient(
            left,
            transparent 0%,
            #ffffff 100%
          );
          position: absolute;
          bottom: 0;
        }
        .aqiBannerInner {
          width: calc(100% - 300px);
          position: relative;
          z-index: 1;
          padding-right: 20px;
          padding-top: 14px;
        }
        .aqiBannerHead {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .aqiBannerMain {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
        }
        .headingWrap .heading {
          font-size: 30px;
          line-height: 30px;
          color: #001d42;
        }
        .aqiBannerOutter {
          margin-bottom: 30px;
        }
      `}</style>
    </>
  );
};
export default Aqi;
