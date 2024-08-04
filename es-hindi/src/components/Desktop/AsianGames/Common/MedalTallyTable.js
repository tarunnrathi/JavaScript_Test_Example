// import Glide from "@glidejs/glide";
// import { useEffect } from "react";

const MedalTallyTable = ({ medalTallyList = [],heading }) => {
  if (!medalTallyList.length) return null;
  // useEffect(() => {
  //   if (document.querySelector(".partnersSliderRhs")) {
  //     new Glide(document.querySelector(".partnersSliderRhs"), {
  //       type: "carousel",
  //       autoplay: 2000,
  //       perView: 1,
  //       slidesToScroll: 1,
  //     }).mount();
  //   }
  // }, []);

  return (
    <>
      <div id="medals-tally-widget">
        <div className="madel_tally vspacer20">
          <div className="madel_tally_top">
            <h2 className="page_title">
              { heading ? heading : <>पदक <span>तालिका</span></>}              
            </h2>
            {/* <div className="presenting_partner_rhs">
              <p className="partner_ttl">Presenting Partner</p>
              <div className="partnersSliderRhs">
                <div className="track" data-glide-el="track">
                  <ul className="slides">
                    <li className="slide">0</li>
                    <li className="slide">1</li>
                    <li className="slide">2</li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th valign="top">
                  <div className="gold">
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/gold-icon.svg"
                      width={11}
                      height={21}
                    />
                  </div>
                </th>
                <th valign="top">
                  <div className="silver">
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/silver.svg"
                      width={11}
                      height={21}
                    />
                  </div>
                </th>
                <th valign="top">
                  <div className="bronze">
                    <img
                      src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/bronze-icon.svg"
                      width={11}
                      height={21}
                    />
                  </div>
                </th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {medalTallyList.map((data, index) => (
                <tr className={data.team_name} key={data.team_id}>
                  <td className={data.team_name}>
                    {index + 1}. {data.team_name}
                  </td>
                  <td className={data.team_name}>{data.gold_count}</td>
                  <td className={data.team_name}>{data.silver_count}</td>
                  <td className={data.team_name}>{data.bronze_count}</td>
                  <td className={data.team_name}>{data.medals_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="full_table">
            <a href="/sports/asian-games/medal-tally/">FULL TABLE [+]</a>
          </div>
        </div>
      </div>
      <style jsx>{`
        // Medal tally and olympics-right Ads
        .madel_tally {
          background: #f6f6f6;
          margin-bottom: 20px;
        }
        .madel_tally .page_title {
          margin-bottom: 0;
        }
        .madel_tally table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .madel_tally tr th {
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          width: 30px;
          height: 33px;
        }
        .madel_tally thead {
          height: 30px;
          background: #001d42 0 0 no-repeat padding-box;
        }
        .madel_tally .gold,
        .madel_tally .silver,
        .madel_tally .bronze {
          width: 28px;
          height: 26px;
        }
        .madel_tally tr th:first-child {
          text-align: left;
          padding-left: 10px;
          width: 100px;
        }
        .madel_tally tr td {
          text-align: center;
          font-size: 13px;
          color: #202020;
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
        .madel_tally tbody tr .India{
          font-weight: 600;
          color: #ff0000;
        }
        .madel_tally tbody tr:nth-child(even) {
          background: #f6f6f6;
        }
        .madel_tally tbody tr:first-child td {
          font-weight: 600;
        }
        .madel_tally_top {
          height: 43px;
          background: #f5f5f5 0 0 no-repeat padding-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 10px;
        }
        .gold,
        .silver,
        .bronze {
          width: 80px;
          height: 41px;
          background: #fff 0 0 no-repeat padding-box;
          border-radius: 0 0 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          font-size: 12px;
          margin: 0;
        }
        .madel_tally_table table thead img {
          padding-right: 7px;
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
        .presenting_partner_rhs .partner_ttl {
          font-size: 10px;
          font-weight: normal;
          margin-right: 4px;
          color: #747474;
          line-height: 15px;
          text-decoration: underline;
          text-align: right;
          align-items: center;
          display: flex;
          width: 49px;
        }
        .presenting_partner_rhs .slides {
          display: flex;
        }
        .presenting_partner_rhs .track {
          overflow: hidden;
        }
        .presenting_partner_rhs {
          display: flex;
        }
        .presenting_partner_rhs .partnersSliderRhs {
          width: 95px;
        }
        .presenting_partner_rhs .slide {
          width: 94px;
          height: 40px;
          background: #747474;
        }
      `}</style>
    </>
  );
};

export default MedalTallyTable;
