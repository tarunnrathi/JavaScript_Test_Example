import { useState } from "react";
import PageNavigations from "components/Common/Olympics/PageNavigations";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import { olympics_year } from "api/Constant";
import EventDateWidgetDesktop from "components/Common/Olympics/EventDateWidgetDesktop";
import LazyLoadImage from "components/Common/CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import EventDateWidgetMobile from "components/Common/Olympics/EventDateWidgetMobile";

const Results = (props) => {
  const {
    breadCrumbArray,
    lomp_sdl_with_date,
    date,
    results,
    isMobile,
    olympics_medals,
    pageAds,
  } = props?.data;
  const [medals, setMedals] = useState("Gold");
  const [selectIndex, setSelectIndex] = useState("");
  const [indiaEvent /* setIndiaEvent */] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const arr1 = olympics_medals?.medals?.filter(x=>x.country !== "India");
  const arr2 = olympics_medals?.medals?.filter(x=>x.country === "India");
  const medalsList = [...arr2, ...arr1];
  const medaleClick = (medalName = "", index) => {
    setMedals(medalName);
    setSelectIndex(index);
  };
  // const IndiaEvent = (value, index) => {
  //   setIndiaEvent(value);
  //   setSelectIndex(index);
  // }
  const handleDropDown = (index) => {
    setSelectIndex(index);
    setShowDropDown(!showDropDown);
  };

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

          <PageNavigations title="नतीजे" />
          {results?.map((item, index) => {
            const medalsArray = indiaEvent
              ? selectIndex === index
                ? item?.medals?.filter((x) => x.indianEvent === true)
                : item?.medals
              : item?.medals;
            return (
              <>
                <div
                  className="jumpolypschedule_box"
                  id={`${item?.title}`}
                ></div>
                <div className="schdlheading">
                  <div className="medalHopeHeadingInner olpschdl">
                    {index === 0 ? (
                      <h1 className="heading-1">
                        Paris olympics {olympics_year} Results
                      </h1>
                    ) : (
                      <h3 className="heading-1">
                        Paris olympics {olympics_year} Results
                      </h3>
                    )}
                    <div className="schldhead">
                      <ul className="gamesIcon">
                        <li className={item?.title}></li>
                      </ul>
                      <h2 className="heading-2">{item?.title}</h2>
                    </div>
                  </div>
                  <div className="scheduledrp">
                    <div className="scheduledn">
                      <div
                        className="schedulednval"
                        onClick={() => handleDropDown(index)}
                      >
                        Select Sport
                      </div>
                      <ul
                        className="schedulednBox"
                        style={
                          showDropDown && selectIndex === index
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        {results?.map((itm, index) => {
                          return (
                            <li
                              key={itm?.title + "_" + index}
                              onClick={() => setShowDropDown(false)}
                            >
                              <a
                                data-value="Archery"
                                href={`/sports/olympics/results/#${itm?.title}`}
                              >
                                {itm?.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="olypschedule_box">
                  <div className="medal ">
                    <div
                      className={`medal_row ${
                        selectIndex === index
                          ? medals === "Gold"
                            ? "active"
                            : ""
                          : "active"
                      }`}
                      onClick={() => medaleClick("Gold", index)}
                    >
                      <i className="gold"></i>
                      <p>Gold</p>
                    </div>
                    <div
                      className={`medal_row ${
                        selectIndex === index
                          ? medals === "Silver"
                            ? "active"
                            : ""
                          : ""
                      }`}
                      onClick={() => medaleClick("Silver", index)}
                    >
                      <i className="silver"></i>
                      <p>Silver</p>
                    </div>
                    <div
                      className={`medal_row ${
                        selectIndex === index
                          ? medals === "Bronze"
                            ? "active"
                            : ""
                          : ""
                      }`}
                      onClick={() => medaleClick("Bronze", index)}
                    >
                      <i className="bronze"></i>
                      <p>Bronze</p>
                    </div>
                  </div>
                  {/* <div className="rhtp"><span onClick={() => IndiaEvent(true, index)}>INDIA EVENTS</span></div> */}
                  <div className="schedule_table">
                    <div className="schedule_table_row result_table">
                      {!isMobile ? (
                        <table className="olmdesktb">
                          <thead>
                            <tr>
                              <th>Sport</th>
                              <th>Team</th>
                              <th>Player</th>
                              <th>Record</th>
                            </tr>
                          </thead>
                          <tbody>
                            {medalsArray?.map((im, ind) => {
                              const team_name = im?.team
                                ?.replace(" ", "_")
                                .toLowerCase();
                              return (
                                <tr
                                  className="medal-Gold"
                                  style={
                                    selectIndex === index
                                      ? medals === im?.medal
                                        ? { display: "table-row" }
                                        : { display: "none" }
                                      : im?.medal === "Gold"
                                      ? { display: "table-row" }
                                      : { display: "none" }
                                  }
                                  key={im?.medal + "_" + ind}
                                >
                                  <td className="result_sport">
                                    {im?.eventName}
                                  </td>
                                  <td>
                                    <div className="team_name">
                                      <i>
                                        <LazyLoadImage
                                          width={43}
                                          height={24}
                                          src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${team_name}_flag.png`}
                                          isLazyLoad={true}
                                          defaultImageURL={
                                            "https://images.hindi.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/germany_flag.png"
                                          }
                                        />
                                      </i>
                                      <p>{im?.team}</p>
                                    </div>
                                  </td>
                                  <td className="result_player">
                                    {im?.player}
                                  </td>
                                  <td className="result_round">{im?.record}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <table className="olmdmobtb">
                          <thead>
                            <tr>
                              <th>
                                <p>Sport</p>Team / Player / Record
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {medalsArray?.map((im, ind) => {
                              const team_name = im?.team
                                ?.replace(" ", "_")
                                .toLowerCase();
                              return (
                                <tr
                                  className="medal-Gold"
                                  style={
                                    selectIndex === index
                                      ? medals === im?.medal
                                        ? { display: "table-row" }
                                        : { display: "none" }
                                      : im?.medal === "Gold"
                                      ? { display: "table-row" }
                                      : { display: "none" }
                                  }
                                  key={im?.medal + "_" + ind}
                                >
                                  <td>
                                    <span className="result_sport">
                                      {im?.eventName}
                                    </span>
                                    <div className="team_name">
                                      <i>
                                        <LazyLoadImage
                                          width={43}
                                          height={24}
                                          src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${team_name}_flag.png`}
                                          isLazyLoad={true}
                                          defaultImageURL={
                                            "https://images.hindi.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/germany_flag.png"
                                          }
                                        />
                                      </i>
                                      <div className="flglhs">
                                        <p>{im?.team}</p>
                                        <span className="result_player">
                                          {im?.player}
                                        </span>
                                        <span className="result_round">
                                          {im?.record}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="olympics-right">
          {!isMobile && (
            <NewSiteAd
              slotId={"ATF_300_id"}
              adUnit={props?.pageAds?.ATF_300_id}
              sizes={[
                [300, 250],
                [300, 600],
              ]}
              width={300}
              // removeAdSpan={true}
              height={250}
              lazyLoad={true}
            />
          )}
          <div id="medals-tally-widget">
            <div className="madel_tally vspacer20">
              <div className="madel_tally_top">
                <div className="medalHopeHeadingInner">
                  <h3 className="heading-1">Paris olympics {olympics_year}</h3>
                  <h2 className="heading-2">पदक तालिका</h2>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Gold</th>
                    <th>Silver</th>
                    <th>Bronze</th>
                  </tr>
                </thead>
                <tbody>
                  {medalsList?.map((medal, index) => {
                    const team_name = medal?.country
                      ?.replace(" ", "_")
                      .toLowerCase();
                    return (
                      <tr
                        className="medal-Gold"
                        style={index === 0 ?{ display: "table-row",backgroundColor:"#ef4e37" }:{display: "table-row"}}
                        key={medal?.country + index}
                      >
                        <td>
                          <div className="team_name">
                            <i>
                              <LazyLoadImage
                                width={43}
                                height={24}
                                src={`https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/${team_name}_flag.png`}
                                isLazyLoad={true}
                                defaultImageURL={
                                  "https://images.news18.com/static_news18/ibnlive/pix/ibnhome/cricketnext/microsite/teamsicon/refugee_olympic_team_flag.png?im=Resize,width=50,aspect=fit,type=normal"
                                }
                              />
                            </i>
                            &nbsp;&nbsp;
                            <p>{medal?.country}</p>
                          </div>
                        </td>
                        <td className="result_player">{medal?.gold}</td>
                        <td className="result_round">{medal?.silver}</td>
                        <td className="result_round">{medal?.bronze}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="full_table">
                <a href="/sports/olympics/medals-tally/">FULL TABLE [+]</a>
              </div>
            </div>
            <div class="olympics-right">
              {/* {!isMobile &&
                <NewSiteAd
                  slotId={"MTF_728_id"}
                  adUnit={
                    pageAds?.MTF_728
                  }
                  sizes={[
                    [300, 250],
                    [300, 600],
                  ]}
                  width={300}
                  // removeAdSpan={true}
                  height={250}
                  lazyLoad={true}
                />} */}

              {isMobile && (
                <div className="add">
                  <div className="addinner-box">
                    <NewSiteAd
                      slotId="Mobile_ATF_300_id"
                      width={336}
                      height={280}
                      adUnit={pageAds?.ATF_300}
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
          </div>
        </div>
      </div>
      <style jsx global>{`
        .add {
          text-align: center;
          margin: 15px 0;
        }
        .olympics-wrapper {
          width: 100%;
          display: flex;
          max-width: 1244px;
          margin: auto;
          margin-bottom: 30px;
          margin-top: 10px;
          margin-top: 10px;
        }
        .olympics-left {
          width: 924px;
          margin-right: 20px;
        }
        .olympics-right {
          width: 300px;
        }
        .page_title {
          color: #e1261d;
          font-family: "Oswald";
          line-height: 27px;
          margin-bottom: 5px;
          text-transform: uppercase;
          font-size: 22px;
        }
        .page_title span {
          color: #202020;
          font-weight: 400;
        }
        @media (max-width: 768px) {
          .olympics-wrapper {
            max-width: 100%;
            display: block;
          }
          .olympics-left,
          .olympics-right {
            width: 100%;
            margin: 0;
          }
        }

        .vspacer20 {
          margin-top: 20px;
        }

        *::-webkit-scrollbar {
          width: 2px;
          height: 2px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *:hover::-webkit-scrollbar-thumb {
          background: #ddd;
          border: 2px solid #a8a8a8;
        }
        .olpschdl.medalHopeHeadingInner {
          text-align: left;
          max-width: 100%;
          padding-top: 11px;
        }
        .medalHopeHeadingInner .heading-1 {
          color: red;
          font-weight: 400;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 3.7px;
          line-height: 12px;
        }
        .medalHopeHeadingInner .heading-2 {
          color: #001d42;
          font-size: 28px;
          font-weight: 600;
          padding: 0 0 6px;
          line-height: 33px;
          text-transform: uppercase;
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
        }
        .olpschdl.medalHopeHeadingInner .heading-2 {
          color: #000;
          font-size: 28px;
          font-weight: 700;
          line-height: 33px;
          text-transform: uppercase;
        }
        .schldhead {
          display: flex;
          align-items: center;
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

        .result_player,
        .result_sport {
          font-weight: 700;
        }
        .result_player,
        .result_round,
        .result_sport,
        .team_name {
          color: #111;
          font-size: 13px;
        }
        .schedule_table table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
        }
        .schedule_table table tr th {
          height: 50px;
          background: #222;
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          text-align: left;
        }
        .schedule_table {
          width: 100%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
        }
        .schedule_table_row {
          width: 100%;
        }
        .schedule_table table tbody tr {
          height: 43px;
          background: #fff;
          border-bottom: 1px solid #dadada;
        }
        .schedule_table table tr th:first-child {
          padding-left: 10px;
        }
        .medal {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
          margin: 0 0 13px;
          border-bottom: 1px solid #d2d2d2;
          height: 50px;
        }
        .medal_row {
          width: 70px;
          background: #e9e9e9;
          margin: 0 1px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          padding: 6px 0;
          border-bottom: 5px solid #cfcece;
          height: 50px;
        }
        .medal_row i {
          width: 11px;
          height: 21px;
          background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/otherIcons/medalIcon-2.png)
            0 0/68px no-repeat;
          margin-bottom: 2px;
        }
        .medal_row p {
          letter-spacing: 0;
          color: #747474;
          text-transform: uppercase;
          font-size: 13px;
          line-height: 14px;
          width: 100%;
        }
        .medal_row.active {
          width: 80px;
          height: 50px;
          background: #fff;
          border-color: #e1261d;
        }
        .medal_row.active i.gold {
          background-position: -19px 0;
        }
        .medal_row.active i.silver {
          background-position: -38px 0;
        }
        .medal_row.active i.bronze {
          background-position: -57px 0;
        }
        .medal_row.active p {
          color: #001d42;
          font-size: 15px;
          font-weight: 700;
        }
        .result_sport {
          padding-left: 10px;
        }
        .team_name {
          display: flex;
          align-items: center;
        }
        .team_name i {
          width: 43px;
          height: 24px;
          margin-right: 10px;
        }
        table.olmdmobtb {
          display: none;
        }
        table.olmdesktb {
          display: table;
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

          .schedule_table table tbody tr td {
            padding: 10px;
          }
          .result_sport {
            text-transform: uppercase;
            padding: 0;
          }
          .team_name {
            align-items: flex-start;
            margin-top: 4px;
          }
          .flglhs {
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 18px;
          }
          table.olmdmobtb {
            display: table;
          }
          table.olmdesktb {
            display: none;
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
        .gamesIcon li {
          width: 40px;
          height: 40px;
          background-color: #0a2036;
          background-image: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/olympic-d-white-icon.png);
          margin: 5px 9px 5px 0;
          border-radius: 50%;
        }
        .gamesIcon li a {
          display: block;
          width: 40px;
          height: 40px;
        }
        .gamesIcon li.Archery {
          background-position: -57px 0px;
        }
        .gamesIcon li.Artistic_Gymnastics {
          background-position: -114px 0px;
        }
        .gamesIcon li.Artistic_Swimming {
          background-position: -171px 0px;
        }
        .gamesIcon li.Athletics {
          background-position: -228px 0px;
        }
        .gamesIcon li.Badminton {
          background-position: -283px 0px;
        }
        .gamesIcon li.Baseball_Softball {
          background-position: -342px 0px;
        }
        .gamesIcon li.Basketball {
          background-position: -399px 0px;
        }
        .gamesIcon li.Beach_Volleyball {
          background-position: -456px 0px;
        }
        .gamesIcon li.Boxing {
          background-position: -509px 0px;
        }
        .gamesIcon li.Canoe_Slalom {
          background-position: -566px 0px;
        }
        .gamesIcon li.Canoe_Sprint {
          background-position: -627px 0px;
        }
        .gamesIcon li.Cycling_BMX_Freestyle {
          background-position: -679px 0px;
        }
        .gamesIcon li.Cycling_BMX_Racing {
          background-position: -735px 0px;
        }
        .gamesIcon li.Cycling_Mountain_Bike {
          background-position: -795px 0px;
        }
        .gamesIcon li.Cycling_Road {
          background-position: -852px 0px;
        }
        .gamesIcon li.Cycling_Track {
          background-position: -907px 0px;
        }
        .gamesIcon li.Diving {
          background-position: -963px 0px;
        }
        .gamesIcon li.Equestrian {
          background-position: -1022px 0px;
        }
        .gamesIcon li.Fencing {
          background-position: -1080px 0px;
        }
        .gamesIcon li.Football {
          background-position: -1135px 0px;
        }
        .gamesIcon li.Golf {
          background-position: -1190px 0px;
        }
        .gamesIcon li.Handball {
          background-position: -1245px 0px;
        }
        .gamesIcon li.Hockey {
          background-position: 0px -54px;
        }
        .gamesIcon li.Judo {
          background-position: -57px -54px;
        }
        .gamesIcon li.Karate {
          background-position: -114px -54px;
        }
        .gamesIcon li.Marathon_Swimming {
          background-position: -171px -54px;
        }
        .gamesIcon li.Modern_Pentathlon {
          background-position: -228px -54px;
        }
        .gamesIcon li.Rhythmic_Gymnastics {
          background-position: -283px -54px;
        }
        .gamesIcon li.Rowing {
          background-position: -342px -54px;
        }
        .gamesIcon li.Rugby {
          background-position: -399px -54px;
        }
        .gamesIcon li.Sailing {
          background-position: -456px -54px;
        }
        .gamesIcon li.Shooting {
          background-position: -509px -54px;
        }
        .gamesIcon li.Skateboarding {
          background-position: -566px -54px;
        }
        .gamesIcon li.Sport_Climbing {
          background-position: -627px -54px;
        }
        .gamesIcon li.Surfing {
          background-position: -679px -54px;
        }
        .gamesIcon li.Swimming {
          background-position: -735px -54px;
        }
        .gamesIcon li.Table_Tennis {
          background-position: -795px -54px;
        }
        .gamesIcon li.Taekwondo {
          background-position: -852px -54px;
        }
        .gamesIcon li.Tennis {
          background-position: -907px -54px;
        }
        .gamesIcon li.Trampoline_Gymnastics {
          background-position: -963px -54px;
        }
        .gamesIcon li.Triathlon {
          background-position: -1022px -54px;
        }
        .gamesIcon li.Volleyball {
          background-position: -1080px -54px;
        }
        .gamesIcon li.Water_Polo {
          background-position: -1135px -54px;
        }
        .gamesIcon li.Weightlifting {
          background-position: -1190px -54px;
        }
        .gamesIcon li.Wrestling {
          background-position: -1245px -54px;
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
};
export default Results;
