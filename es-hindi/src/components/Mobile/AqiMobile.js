import { useState } from "react";
import AirPollution from "components/Common/AqiTable";
import { arrayOnly } from "includes/article.util";
import { getStatus, trans, gDesc } from "includes/aqi.helper";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
const Aqi = ({ topPriorityData = {} }) => {
  const [tabBtn, setTabBtn] = useState("tab-1");
  const [toggel, setToggle] = useState(false);
  const [citydetailsInfo, setcitydetailsInfo] = useState([]);
  const {
    aqiData: { data: statesData = {} },
    cityName,
    stories,
    pageAds,    
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
        <div className="breadcum_outter">
          {pageAds?.ATF_300 && (
            <div className="add_secton">
              <div className="ad-container">
                <div className="addinner-box">
                  <NewSiteAd
                    width={300}
                    height={280}
                    slotId="mobileAdNew300x250_1"
                    adUnit={pageAds.ATF_300}
                    lazyLoad={true}
                    sizes={[
                      [300, 250],
                      [336, 280],
                    ]}
                    removeAdSpan={true}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="breadcum">
            <a href="/">Home</a> »
            {!citydetails ? (
              <h1 className="bredcrum_heading">Aqi India</h1>
            ) : (
              <>
                <a>Aqi India</a>»
                <h1 className="bredcrum_heading">
                  Aqi in {citydetails?.locationName || "India"}
                </h1>
              </>
            )}
          </div>
        </div>
        <div className="aqiBannerWrapper">
          <div className="mainInner">
            <div className="aqiBannerTop">
              <div className="aqiBannerIcon">
                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/aqi-india/mobile-aqi_bannerimg.jpg" />
              </div>
              <div className="aqiBannerInner">
                <div className="headingWrap">
                  <h2 className="heading">
                    {citydetails?.locationName
                      ? `${trans(
                          citydetails?.locationName
                        )} का एयर क्वालिटी इंडेक्स`
                      : "भारत में एयर क्वालिटी इंडेक्स"}
                  </h2>
                </div>
                {/* <div className="searchBar">
                                    <input type="text" placeholder="Search any city for AQI update" />
                                    <button type="submit"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/aqi-india/search-icon.png" /></button>
                                </div> */}
              </div>
            </div>
            <div className="aqiBannerMain">
              <div className="maintop">
                {mainStatus && mainSensor && (
                  <div className="counterWrapper">
                    <div className="counterBox">
                      <span className={`number ${mainStatus}`}>
                        {mainSensor}
                      </span>
                      <span className="txt">AQI-US</span>
                    </div>
                    <div className="avatar">
                      <img
                        src={`/images/aqi/${mainStatus}${
                          mainStatus == "good" &&
                          mainSensor <= 100 &&
                          mainSensor >= 51
                            ? "-two"
                            : ""
                        }.png`}
                      />
                    </div>
                  </div>
                )}
                <div className="discWraper">
                  <div className="discHeader">
                    {mainStatus && (
                      <div className={`airStatus ${mainStatus}-back`}>
                        {mainStatus}
                      </div>
                    )}
                    {mainStatus && (
                      <div className="timeStamp">
                        Last Updated: {citydetails?.formatdate}
                      </div>
                    )}
                  </div>
                  <div className="discription">
                    {gDesc(citydetails?.locationName || "India", citydetails)}
                  </div>
                  {/* <a href="#" className="discLink">More About Aqi in {listing?.main?.locationName}</a> */}
                </div>
              </div>
            </div>
          </div>
          {mainStatus && (
            <div className="majorPollutionStrip">
              <div className="avtart">
                <img
                  alt="aqi-avatar"
                  src="/images/aqi/majorAirPollutant.svg"
                  className=""
                />
                <div className="text">
                  MAJOR AIR POLLUTANTS
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
                  <div className="numberbox moderate">{majorAirPol?.pm10}</div>
                  <div className="numberboxText">(PM10)</div>
                </div>
                <div className="numberboxWrap">
                  <div className="numberbox severe">{majorAirPol?.so2}</div>
                  <div className="numberboxText">(SO2)</div>
                </div>
                <div className="numberboxWrap">
                  <div className=" numberbox unhealthy">{majorAirPol?.o3}</div>
                  <div className=" numberboxText">(OZONE)</div>
                </div>
                <div className=" numberboxWrap">
                  <div className=" numberbox good">{majorAirPol?.no2}</div>
                  <div className=" numberboxText">(NO2)</div>
                </div>
              </div>
            </div>
          )}
          <div className="mainFtr">
            <div className="sponserbox">
              <div className="heading">
                <span>Powered By</span>
              </div>
              <a href={"https://www.aqi.in/dashboard/india"}>
                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/aqi-india/aqi-sponsor-logo.jpg" />
              </a>
            </div>
          </div>
        </div>
        <div className="aqiTableWrapper">
          <div className="tableTabsWrapper">
            <ul className="tableTabs">
              <li
                className={tabBtn === "tab-1" ? "active" : ""}
                onClick={() => {
                  updateTab("tab-1", cityListInfo);
                }}
              >
                <div className="heading">AIR POLLUTION</div>
                <div className="subHeading">LEVEL IN {"INDIA"}</div>
              </li>
              <li
                className={tabBtn === "tab-2" ? "active" : ""}
                onClick={() => {
                  updateTab("tab-2", cityListInfo);
                }}
              >
                <div className="heading">MOST POLLUTED</div>
                <div className="subHeading">CITIES IN {"INDIA"}</div>
              </li>
              <li
                className={tabBtn === "tab-3" ? "active" : ""}
                onClick={() => {
                  updateTab("tab-3", cityListInfo);
                }}
              >
                <div className="heading">LEAST POLLUTED</div>
                <div className="subHeading">CITIES IN {"INDIA"}</div>
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
          </div>
          <div className="aqTableWrapper">
            <AirPollution
              data={toggel ? citydetailsInfo : cityListInfo}
              toggel={toggel}
            />
          </div>
        </div>
        {pageAds?.BTF_300 && (
          <div className="add_secton">
            <div className="ad-container">
              <div className="addinner-box">
                <NewSiteAd
                  width={300}
                  height={250}
                  slotId={"mobileAdNew"}
                  adUnit={pageAds.BTF_300}
                  sizes={[
                    [300, 250],
                    [336, 280],
                  ]}
                  removeAdSpan={true}
                  lazyLoad={true}
                />
              </div>
            </div>
          </div>
        )}
        {/* <div className="faqSection">
          <h3 className="faqHeading">FAQs (Frequently Asked Questions)</h3>
          <h4 className="faqSubHead">
            Tired of gasping for breath? Breathe pure.
          </h4>
          <ul className="faqAccordian">
            {faq.map((data, i) => {
              return (
                <li onClick={(e) => faqAccordianHandler(e, i)} key={i}>
                  <h4 className={accordBtn === i ? "active" : ""}>
                    {data.title}
                  </h4>
                  <div
                    className={`faqAccordianContent ${
                      accordBtn === i ? "active" : ""
                    }`}
                  >
                    <p>{data.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div> */}
        <div className="latestNews">
          <div className="heading_titleh2">
            <h2>Latest Stories</h2>
          </div>
          <div className="top_first_story">
            <figure>
              <a href={stories[0]?.weburl}>
                <figcaption>
                  <h2 className="top_first_title">
                    {stories[0]?.display_headline || ""}
                  </h2>
                </figcaption>
                <LazyLoadImage
                  src={stories[0]?.images?.url}
                  width={300}
                  height={200}
                  isLazyLoad={true}
                />
              </a>
            </figure>
          </div>
          <ul className="top_story_list">
            {stories?.slice(1)?.map((item) => (
              <li>
                <a href={item.weburl}>
                  <div className="story_title">
                    <h3 className="story_title_h3">
                      {item?.display_headline || ""}
                    </h3>
                  </div>
                  <div className="stroy_img">
                    <LazyLoadImage
                      src={item?.images?.url}
                      width={110}
                      height={73}
                      isLazyLoad={true}
                    />
                  </div>
                </a>
              </li>
            ))}
            <div className="more_story">
              <a href="/tag/aqi/">
                <span>More Stories</span>
              </a>
            </div>
          </ul>
        </div>
        {typeof pageAds !== "undefined" &&
          typeof pageAds.PG_1x1 !== "undefined" &&
          pageAds.PG_1x1 !== "" && (
            <NewSiteAd
              slotId="PG_1x1"
              adUnit={pageAds.PG_1x1}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true}
            />
          )}
        {typeof pageAds !== "undefined" &&
          typeof pageAds.PG_Slider_1x1 !== "undefined" &&
          pageAds.PG_Slider_1x1 !== "" && (
            <NewSiteAd
              slotId="PG_Slider_1x1"
              adUnit={pageAds?.PG_Slider_1x1}
              sizes={[[1, 1]]}
              removeAdSpan={true}
              loadOnScroll={true}
            />
          )}
        {typeof pageAds.PG_1x1_2 !== "undefined" && pageAds.PG_1x1_2 !== "" && (
          <NewSiteAd
            slotId="PG_1x1_2"
            adUnit={pageAds.PG_1x1_2}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            lazyLoad={false}
          />
        )}
        {typeof pageAds.PG_1x1_3 !== "undefined" && pageAds.PG_1x1_3 !== "" && (
          <NewSiteAd
            slotId="PG_1x1_3"
            adUnit={pageAds.PG_1x1_3}
            sizes={[[1, 1]]}
            removeAdSpan={true}
            loadonScroll={true}
          />
        )}
      </div>
      <style jsx global>{`
        .breadcum_outter {
          padding: 8px 10px;
        }
        .breadcum {
          font-family: "Recursive", sans-serif;
          text-transform: uppercase;
          min-height: 20px;
          overflow: auto;
          white-space: nowrap;
          font-size: 13px;
        }
        .breadcum a {
          color: #5a5a5a;
          font-size: 100%;
          min-height: 20px;
          margin: 0 8px;
        }
        .breadcum a:first-child {
          margin-left: 0;
        }
        .bredcrum_heading {
          display: inline-block;
          color: #5a5a5a;
          font-size: 100%;
          font-weight: normal;
          margin-left: 8px;
        }
        .aqiBannerWrapper {
          padding: 0 10px;
          margin-bottom: 20px;
        }
        .mainInner {
          border: 1px solid #e6e6e6;
          overflow: hidden;
          border-radius: 5px;
        }
        .aqiBannerTop {
          display: flex;
          position: relative;
          position: relative;
          justify-content: flex-end;
          height: 120px;
          align-items: center;
          margin-bottom: 8px;
        }
        .aqiBannerIcon {
          position: absolute;
          left: 0;
        }
        .aqiBannerIcon::after {
          content: "";
          width: 100%;
          height: 120px;
          background: -webkit-linear-gradient(
            left,
            transparent 0%,
            #ffffff 100%
          );
          position: absolute;
          bottom: 0;
        }
        .aqiBannerIcon img {
          display: block;
        }
        .aqiBannerInner {
          width: calc(100% - 85px);
          position: relative;
          z-index: 1;
        }
        .aqiBannerInner .headingWrap {
          margin-bottom: 10px;
          margin-left: 15px;
        }
        .aqiBannerInner .headingWrap .heading {
          font-size: 24px;
          line-height: 30px;
          color: #001d42;
        }
        .aqiBannerInner .headingWrap .subheading {
          font-size: 12px;
          line-height: 16px;
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
        .aqiBannerMain .maintop {
          display: flex;
        }
        .counterWrapper {
          width: 80px;
          flex-shrink: 0;
          margin-right: 10px;
        }
        .counterWrapper .counterBox {
          margin-bottom: 10px;
        }
        .counterWrapper .number {
          display: block;
          font-size: 34px;
          font-weight: bold;
          position: relative;
          padding-bottom: 6px;
          margin-bottom: 7px;
          line-height: 38px;
          text-align: center;
        }
        .counterWrapper .number::after {
          content: "";
          width: 50px;
          height: 5px;
          display: table;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 30px;
        }
        .counterWrapper .txt {
          font-size: 12px;
          line-height: 14px;
          color: #464646;
          display: block;
          text-align: center;
        }
        .discHeader {
          margin-bottom: 12px;
        }
        .discription {
          color: #464646;
          line-height: 19px;
          margin-bottom: 8px;
        }
        .discHeader .airStatus {
          width: 110px;
          height: 28px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          margin-bottom: 12px;
          text-transform: uppercase;
          font-weight: bold;
        }
        .discHeader .timeStamp {
          color: #7e7e7e;
          font-size: 12px;
          border-bottom: 1px solid #7e7e7e;
          display: table;
        }
         {
          color: #464646;
          font-size: 13px;
          line-height: 19px;
        }
        .discLink {
          color: #e1261c;
          font-weight: bold;
          text-decoration: underline;
          text-transform: uppercase;
        }
        .aqiBannerWrapper .mainFtr {
          display: flex;
          justify-content: center;
          margin-top: 15px;
          padding-top: 6px;
          border-top: 1px solid #e6e6e6;
        }
        .sponserbox .heading {
          color: #7e7e7e;
          font-size: 9px;
          text-transform: uppercase;
          line-height: 10px;
          display: flex;
          align-items: center;
        }
        .sponserbox .heading span {
          flex-shrink: 0;
        }
        .sponserbox .heading::before,
        .sponserbox .heading::after {
          content: "";
          width: 100%;
          height: 1px;
          background: #e6e6e6;
          display: block;
        }
        .aqiTableWrapper {
          margin-bottom: 25px;
        }
        .tableTabsWrapper {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          overflow-x: scroll;
        }
        .tableTabs {
          display: flex;
          margin-bottom: 10px;
        }
        .tableTabs li {
          margin-right: 10px;
          padding: 0 8px;
          width: 130px;
          height: 42px;
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
        .tableTabs li .heading {
          width: 100%;
          display: block;
          font-size: 12px;
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
        .aqTableWrapper {
          overflow-x: auto;
        }
        .aqiTable {
          width: 100%;
          border-collapse: collapse;
        }
        .tableHeading {
          display: flex;
          align-items: center;
          justify-content: center;
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
          white-space: nowrap;
        }
        .aqiTable tr th:nth-child(1) {
          text-align: left;
          width: 300px;
        }
        .aqiTable tr th:nth-child(1) .tableHeading {
          justify-content: flex-start;
        }
        .aqiTable tr td {
          text-align: center;
          font-size: 13px;
          padding: 8px;
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
          white-space: nowrap;
        }
        .aqiTable tr td.aqi_us {
          position: relative;
        }
        .aqiTable tr td.aqi_us::after {
          content: "";
          width: 50px;
          height: 6px;
          background: #8b8b8b;
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50px;
        }
        .aqiTable tr td.aqi_us.poor::after {
          background: #ffa500;
        }
        .aqiTable tr td.aqi_us.moderate::after {
          background: #d4cc0f;
        }
        .aqiTable tr td.aqi_us.severe::after {
          background: #d4cc0f;
        }
        .aqiTable tr td.aqi_us.unhealthy::after {
          background: #ff69b4;
        }
        .aqiTable tr td.aqi_us.good::after {
          background: #34a12b;
        }
        .faqSection {
          margin-bottom: 30px;
        }
        .faqSection .faqHeading {
          font-size: 13px;
          text-align: center;
          font-weight: normal;
          text-transform: uppercase;
          color: #fff;
          background: #e1261d;
          padding: 7px;
        }
        .faqSection .faqSubHead {
          color: #464646;
          font-size: 13px;
          font-weight: normal;
          line-height: 15px;
          border-bottom: 1px solid #d8d8d8;
          text-align: center;
          background: #f5f5f5;
          padding: 8px 0;
        }
        .faqAccordian li {
          padding: 6px 10px;
          cursor: pointer;
          background: #f5f5f5;
          margin-bottom: 5px;
        }
        .faqAccordian li h4 {
          font-size: 16px;
          color: #001d42;
          position: relative;
          padding-right: 35px;
          line-height: 20px;
        }
        .faqAccordian li h4::after {
          content: "";
          border-top: 2px solid #001d42;
          border-left: 2px solid #001d42;
          width: 8px;
          height: 8px;
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
          font-size: 13px;
          line-height: 19px;
          margin-top: 5px;
        }
        .faqAccordian li h4.active::after {
          transform: rotate(47deg);
          top: 8px;
        }
        .heading_titleh2 {
          width: 100%;
          height: 32px;
          background: #e1261d 0% 0% no-repeat padding-box;
          text-align: center;
          line-height: 32px;
          letter-spacing: 0px;
          color: #ffffff;
          font-size: 13px;
          text-transform: uppercase;
          font-family: "Recursive", sans-serif;
        }
        .heading_titleh2 h2 {
          font-size: 13px;
        }
        .top_first_story {
          background: #f5f5f5;
          padding: 10px;
          margin-bottom: 5px;
        }
        .top_first_story figure a {
          display: block;
        }
        .top_first_title {
          font-family: "Playfair Display", serif;
          font-weight: 900;
          font-size: 18px;
          line-height: 24px;
          padding: 0px 0 10px;
        }
        .top_first_story img {
          width: 100%;
          display: block;
        }
        .latestNews {
          margin-bottom: 20px;
        }
        .top_story .top_story_list {
          margin-bottom: 15px;
        }
        .top_story_list li {
          background: #f5f5f5;
          margin-bottom: 5px;
          padding: 10px;
        }
        .top_story_list li a {
          display: flex;
          align-items: flex-start;
        }
        .story_title {
          width: calc(100% - 110px);
          letter-spacing: -0.28px;
          color: #282828;
          font-size: 14px;
          line-height: 18px;
          font-family: "Recursive", sans-serif;
          font-weight: 600;
          padding-right: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .story_title_h3 {
          letter-spacing: -0.28px;
          color: #282828;
          font-size: 14px;
          line-height: 18px;
          font-family: "Recursive", sans-serif;
          font-weight: 600;
          padding-right: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .stroy_img {
          width: 110px;
          height: 73px;
        }
        .stroy_img img {
          width: 100%;
          display: block;
        }
        .more_story {
          background: #f5f5f5;
          margin-bottom: 5px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .more_story a {
          display: flex;
          height: 48px;
          align-items: center;
        }
        .more_story a span {
          height: 32px;
          background: #ffffff 0% 0% no-repeat padding-box;
          border: 2px solid #e1261c;
          border-radius: 30px;
          line-height: 32px;
          letter-spacing: 0px;
          color: #e1261c;
          text-transform: uppercase;
          font-size: 13px;
          font-family: "Recursive", sans-serif;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
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
        .avatar img {
          width: 170px;
          right: 40px;
          position: relative;
        }
        .majorPollutionStrip {
          padding-top: 10px;
          border: 1px solid #e6e6e6;
          border-bottom: 2px solid #001d42;
        }
        .majorPollutionStrip .avtart {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          padding: 9px 0;
        }
        .majorPollutionStrip .avtart img {
          width: 42px;
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
        .majorPollutionStrip .pollutionNumber {
          width: 100%;
          display: grid;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 12px;
          padding-bottom: 10px;
          background: #f1f1f1;
        }
        .majorPollutionStrip .pollutionNumber .numberboxWrap {
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-right: 1px solid #d8d8d8;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          padding: 10px 0;
        }
        .majorPollutionStrip .pollutionNumber .numberboxWrap .numberbox {
          font-size: 24px;
          font-weight: bold;
          margin-right: 5px;
          position: relative;
          padding-bottom: 12px;
        }
        .majorPollutionStrip .pollutionNumber .numberboxWrap .numberboxText {
          color: #464646;
          font-size: 12px;
          text-transform: uppercase;
        }
        .add_secton,
        .middlead,
        .ad_cntainer {
          margin: 0px 0px 30px 0px;
          padding: 10px 0px 10px;
          text-align: center;
          display: flex;
          overflow: hidden;
          background: #f5f5f5;
          justify-content: center;
          height: 300px;
        }
      `}</style>
    </>
  );
};
export default Aqi;