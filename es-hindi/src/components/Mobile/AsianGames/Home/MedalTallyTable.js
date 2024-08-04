const MedalTallyTable = ({ medalTallyList }) => {
  return (
    <>
      <div id="medals-tally-widget">
        <div className="madel_tally vspacer20">
          <div className="madel_tally_top">
            <h2 className="page_title">
              पदक <span>तालिका</span>
            </h2>
          </div>
          {/* 
            <div className="medalTally_presenting">
              <p className="heading">Presenting Partner</p>
              <div className="MTpartnersSlider">
                <div className="track" data-glide-el="track">
                  <ul className="slides">
                    <li className="slide">partner logo</li>
                    <li className="slide">partner logo</li>
                    <li className="slide">partner logo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>
                  <div className="gold">
                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/gold-icon.svg" />
                  </div>
                </th>
                <th>
                  <div className="silver">
                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/silver.svg" />
                  </div>
                </th>
                <th>
                  <div className="bronze">
                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/olympics-2021/bronze-icon.svg" />
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
        // Medal Tally
        .madel_tally {
          background: #f6f6f6;
          margin-bottom: 20px;
        }
        .madel_tally table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        .madel_tally tr th {
          color: #ffffff;
          text-transform: uppercase;
          font-size: 12px;
          width: 30px;
          height: 33px;
        }
        .madel_tally thead {
          height: 30px;
          background: #001d42 0% 0% no-repeat padding-box;
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
        .madel_tally tbody tr:first-child td {
          font-weight: 600;
        }
        .madel_tally tbody tr .India{
          font-weight: 600;
          color: #ff0000;
        }
        .madel_tally tbody tr:nth-child(even) {
          background: #f6f6f6;
        }
        .madel_tally_top {
          background: #f5f5f5 0% 0% no-repeat padding-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 10px;
          margin-bottom: 2px;
        }
        .gold,
        .silver,
        .bronze {
          width: 28px;
          height: 26px;
          background: #ffffff 0% 0% no-repeat padding-box;
          border-radius: 0px 0px 4px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          font-size: 0;
          margin: auto;
        }
        .full_table {
          display: flex;
          align-items: center;
          background: #fff;
        }
        .full_table a {
          color: #ff0000;
          text-transform: uppercase;
          font-size: 11px;
          flex-shrink: 0;
          padding: 0 15px;
          text-decoration: underline;
        }
        .full_table::before,
        .full_table::after {
          content: "";
          background: #f5f5f5;
          width: 100%;
          height: 20px;
        }
        .medalTally_presenting {
          display: flex;
          align-items: center;
        }
        .medalTally_presenting .heading {
          font-size: 10px;
          font-weight: normal;
          color: #747474;
          text-decoration: underline;
          max-width: 54px;
          margin-right: 4px;
          line-height: normal;
          text-align: right;
        }
        .MTpartnersSlider {
          width: 94px;
        }
        .MTpartnersSlider .track {
          overflow: hidden;
        }
        .MTpartnersSlider .slides {
          display: flex;
        }
        .MTpartnersSlider li {
          background: #e3e3e3;
          border: 1px solid #e3e3e3;
          width: 94px;
          height: 40px;
        }
      `}</style>
    </>
  );
};

export default MedalTallyTable;
