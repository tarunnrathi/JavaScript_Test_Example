import LazyLoadImage from "components/Common/CustomImage";
import PageNavigations from "components/Common/Olympics/PageNavigations";
import dynamic from "next/dynamic";
import React from "react";
import RhsTopStory from "widgets/Common/Desktop/RhsTopStory";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { olympics_year } from "api/Constant";
import { TaboolaList } from "includes/Tabola.helper";
import Taboola from "widgets/Common/Responsive/Taboola";

const EventDateWidgetDesktop = dynamic(() =>
  import("components/Common/Olympics/EventDateWidgetDesktop")
);
const EventDateWidgetMobile = dynamic(() =>
  import("components/Common/Olympics/EventDateWidgetMobile")
);

export default function MetalTally({ data = {} }) {
  const {
    lomp_sdl_with_date,
    date,
    isMobile,
    breadCrumbArray,
    olympics_medals,
    // results,
    pageAds = {},
    topStoriesData = [],
  } = data;
  
  const arr1 = olympics_medals?.medals?.filter(x=>x.country !== "India");
  const arr2 = olympics_medals?.medals?.filter(x=>x.country === "India");
  const medals = [...arr2, ...arr1];
  // const resultSliceData = results.slice(0, 34);
  const { rhs } = TaboolaList.homePage;
  return (
    <>
      {isMobile ? (
        <EventDateWidgetMobile
          lomp_sdl_with_date={lomp_sdl_with_date}
          date={date}
        />
      ) : (
        <EventDateWidgetDesktop
          lomp_sdl_with_date={lomp_sdl_with_date}
          date={date}
        />
      )}
      <div className="olympics-wrapper">
        <div className="olympics-left">
          {isMobile && (
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="Mobile_ATF_320_ad"
                  width={336}
                  height={280}
                  adUnit={pageAds?.ATF_320}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></NewSiteAd>
              </div>
            </div>
          )}
          <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
          <PageNavigations title={`पदक तालिका`} />
          <div className="schdlheading">
            <div className="medalHopeHeadingInner olpschdl">
              <h1 className="heading-1">
                Paris olympics {olympics_year}  
              </h1>
              <h2 className="heading-2">पदक तालिका</h2>
            </div>
          </div>
          <div className="olypschedule_box">
            <div className="madel_tally_table">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Country</th>
                    <th>
                      <div className="gold">
                        <img alt="Gold" src="/images/olympics/mtgold.png" />
                        Gold
                      </div>
                    </th>
                    <th>
                      <div className="silver">
                        <img alt="Silver" src="/images/olympics/mtsilver.png" />
                        Silver
                      </div>
                    </th>
                    <th>
                      <div className="bronze">
                        <img alt="Bronze" src="/images/olympics/mtbronze.png" />
                        Bronze
                      </div>
                    </th>
                    <th>
                      <span>Total</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medals.map((medal, index) => {
                    const team_name = medal?.country
                      ?.replace(" ", "_")
                      .toLowerCase();
                    return (
                      <tr key={medal.team_id} style={index === 0? {backgroundColor:"#ef4e37"} : {}}>
                        <td>{medal?.rank||""}</td>
                        <td>
                          <i>
                            <LazyLoadImage
                              width={43}
                              height={24}
                              src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${team_name}_flag.png`}
                              isLazyLoad={true}
                              defaultImageURL={"https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/refugee_olympic_team_flag.png?im=Resize,width=50,aspect=fit,type=normal"}
                            />
                            {/* <img src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${team_name}_flag.png`} /> */}
                          </i>
                          {medal.country}
                        </td>
                        <td>{medal.gold}</td>
                        <td>{medal.silver}</td>
                        <td>{medal.bronze}</td>
                        <td>{medal.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="olympics-right">
            <div style={{ marginTop: "15px" }}>
              {!isMobile && (
                <div className="add">
                  <div className="addinner-box">
                    <NewSiteAd
                      slotId="Mobile_ATF_300_2"
                      width={336}
                      height={280}
                      adUnit={pageAds?.ATF_300_id}
                      sizes={[
                        [300, 250],
                        [336, 280],
                        [250, 250],
                      ]}
                      lazyload={true}
                    ></NewSiteAd>
                  </div>
                </div>
              )}
            </div>
            {!isMobile && (
              <div className="cn-add-section-2" style={{ minHeight: 519 }}>
                <div className="vsp20"></div>
                <RhsTopStory
                  topStories={topStoriesData}
                  articleData={{}}
                  relatedStories={{}}
                  isRss={false}
                />
              </div>
            )}
            <div style={{ marginTop: "-50px" }}>
              {!isMobile && (
                <div className="add">
                  <div className="addinner-box">
                    <NewSiteAd
                      slotId="Mobile_BTF_300_2"
                      width={336}
                      height={280}
                      adUnit={pageAds?.BTF_300_id}
                      sizes={[
                        [300, 250],
                        [336, 280],
                        [250, 250],
                      ]}
                      lazyload={true}
                    ></NewSiteAd>
                  </div>
                </div>
              )}
            </div>
            <Taboola
              mode={rhs.mode}
              id={rhs.id}
              container={rhs.container}
              placement={rhs.placement}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .add {
          text-align: center;
          margin: 15px 0;
        }
        * {
          box-sizing: border-box;
        }
        body {
          font-family: "Fira Sans", sans-serif;
          font-size: 15px;
          line-height: 1.1;
          margin: 0;
          padding: 0;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
        }
        img {
          vertical-align: top;
        }
        a {
          text-decoration: none;
        }
        li {
          list-style: none;
        }
        ul,
        p,
        button {
          margin: 0;
          padding: 0;
        }
        figure {
          margin: 0;
          padding: 0;
        }
        .olpschdl.medalHopeHeadingInner {
          text-align: left;
          max-width: 100%;
          padding-top: 11px;
        }
        .olpschdl.medalHopeHeadingInner .heading-1 {
          color: #f00;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.6px;
          line-height: 12px;
          margin-bottom: 3px;
        }
        .olpschdl.medalHopeHeadingInner .heading-2 {
          color: #000;
          font-size: 28px;
          font-weight: 700;
          line-height: 33px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .olypschedule_box {
          border: 1px solid #c0c0c0;
          background: #f4f4f4;
          margin-bottom: 30px;
          padding: 30px;
          position: relative;
        }

        .scheduledrpWrap {
          display: flex;
          align-items: center;
          padding: 0 10px;
        }
        .scheduledrp {
          height: 30px;
          width: 160px;
          display: flex;
          background: #fff;
          border: 1px solid #c0c0c0;
          background-color: #f6f6f6;
          color: #fff;
          margin-bottom: 12px;
          border-radius: 4px;
        }
        .scheduledrp .scheduledn {
          width: 180px;
          position: relative;
        }
        .scheduledrp .scheduledn:after {
          content: "";
          position: absolute;
          width: 10px;
          height: 14px;
          display: block;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/dropdown-icon.png);
          background-repeat: no-repeat;
          background-position: right 1px center;
          filter: invert(1);
          top: 7px;
          right: 4px;
        }
        .scheduledrp .scheduledn .schedulednval {
          height: 100%;
          padding-left: 10px;
          font-size: 12px;
          text-align: left;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #333;
          font-weight: 700;
        }
        .schedulednBox {
          width: 100%;
          position: absolute;
          top: 22px;
          font-size: 11px;
          background: #e8e8e8;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          border: 1px solid #d0d0d0;
          border-top: 0;
          display: none;
          z-index: 99;
          height: 250px;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .schedulednBox.active {
          display: block;
        }
        .schedulednBox li:last-child {
          margin-bottom: 0;
        }
        .schedulednBox li a {
          position: relative;
          color: #001d42;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          display: block;
          padding: 7px 7px 7px 23px;
        }
        .schedulednBox li a:hover {
          background: #e1261d;
          color: #fff;
        }
        .schedulednBox li a::before {
          content: "-";
          position: absolute;
          left: 10px;
          font-size: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
        .schedulednBox li.active {
          background: #e1261d;
        }
        .schedulednBox li.active a {
          color: #fff;
        }
        .schdlheading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .madel_tally_table {
          width: 100%;
        }
        .madel_tally_table table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .madel_tally_table table thead {
          height: 50px;
          background: #222;
        }
        .madel_tally_table table thead th:nth-child(2) {
          text-align: left;
          padding-left: 10px;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          width: 40%;
        }
        .madel_tally_table table thead th:last-child {
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
        }
        .bronze,
        .gold,
        .silver {
          width: 80px;
          height: 50px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          font-size: 11px;
          margin: auto;
          font-weight: 400;
          flex-direction: column;
        }
        .olypschedule_box .madel_tally_table table thead img {
          padding-right: 0;
        }
        .gold {
          color: orange;
        }
        .silver {
          color: #acacac;
        }
        .bronze {
          color: #df622d;
        }
        .madel_tally_table table thead th {
          vertical-align: middle;
          width: 10%;
          color: #fff;
          font-size: 12px;
          text-transform: uppercase;
        }
        .madel_tally_table table thead th:first-child {
          width: 5%;
        }
        .madel_tally_table table tbody {
          text-align: center;
          font-size: 14px;
          color: #202020;
        }
        .madel_tally_table table tbody td:nth-child(2) {
          text-align: left;
          padding-left: 10px;
          display: flex;
          align-items: center;
        }
        .madel_tally_table table tbody td:nth-child(2) i {
          width: 43px;
          height: 24px;
          margin-right: 15px;
        }
        .madel_tally_table table tbody td {
          height: 40px;
        }
        .madel_tally_table table tbody tr {
          height: 40px;
          border-bottom: 1px solid #d8d8d8;
          background: #fff;
        }
        .madel_tally_table table thead th:last-child span {
          width: 80px;
          background-color: #000;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .madel_tally_table table tbody tr.active {
          background: #efefef;
          font-size: 16px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .schdlheading {
            flex-direction: column;
            padding: 10px;
            margin-top: 10px;
          }
          .scheduledrp {
            margin: 12px auto 0;
          }
          .olypschedule_box {
            padding: 10px;
          }
          .olpschdl.medalHopeHeadingInner {
            border-bottom: 1px solid #ddd;
            width: 100%;
          }

          .team_name {
            align-items: flex-start;
            margin-top: 7px;
          }
          .flglhs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
          }

          .madel_tally_table table tbody {
            text-align: center;
          }
          .madel_tally_table table tbody td:nth-child(2) img {
            display: none;
          }
          .madel_tally_table table tbody tr {
            height: 40px;
            border-bottom: 1px solid #d8d8d8;
            background: #fff;
          }
          .bronze,
          .gold,
          .silver {
            width: 34px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0;
          }
          .madel_tally_table table thead th:last-child span {
            width: auto;
          }
          .madel_tally_table table thead {
            height: 45px;
          }
          .madel_tally_table table thead th:first-child,
          .madel_tally_table table tbody td:first-child {
           // display: none;
           padding: 0 5px;
           text-align: center;
          }
        }
        .madel_tally .page_title {
          margin-bottom: 0;
        }
        .madel_tally table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
          margin-bottom: 10px;
        }
        .madel_tally tr th {
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          width: 30px;
          height: 50px;
        }
        .madel_tally thead {
          height: 50px;
          background: #222;
        }
        .madel_tally tr th:first-child {
          text-align: left;
          padding-left: 10px;
          width: 100px;
        }
        .madel_tally tr td {
          text-align: center;
          font-size: 13px;
          color: #111;
          height: 40px;
        }
        .madel_tally tr td:first-child {
          text-align: left;
          padding-left: 10px;
        }
        .madel_tally tbody tr {
          border-bottom: 1px #d8d8d8 solid;
          background: #fff;
        }
        .madel_tally_top {
          background: #fff;
        }
        .madel_tally_top .medalHopeHeadingInner {
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        .madel_tally_top .medalHopeHeadingInner .heading-2 {
          margin: 0;
          padding: 0;
        }
        .madel_tally_table table thead img {
          padding-right: 7px;
        }
        .full_table {
          display: flex;
          align-items: center;
          background: #fff;
        }
        .full_table::before,
        .full_table::after {
          content: "";
          background: #f5f5f5;
          width: 100%;
          height: 20px;
        }
        .full_table a {
          color: red;
          text-transform: uppercase;
          font-size: 11px;
          flex-shrink: 0;
          padding: 0 15px;
        }
        .madel_tally tr th img {
          max-height: 46px;
          transform: scale(1.3);
          padding: 10px 0 0;
        }
        .madel_tally tbody tr.active {
          background: #efefef;
          font-weight: 700;
        }
        .madel_tally tbody {
          border: 1px solid #d8d8d8;
        }
        @media (max-width: 768px) {
          #medals-tally-widget {
            padding: 0 10px;
          }
          .madel_tally thead {
            border: 1px solid #222222;
          }
          .full_table {
            border: 1px solid #c0c0c0;
            background-color: #f4f4f4;
            height: 36px;
          }
          .full_table a {
            font-size: 12px;
            color: #e1261d;
            text-decoration: none;
          }
        }
      `}</style>
    </>
  );
}
