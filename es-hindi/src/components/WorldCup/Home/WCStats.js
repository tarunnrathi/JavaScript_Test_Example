import React from "react";

const WCStats = ({ statsData }) => {
  const { bat = {}, bowl = {}, field = {} } = statsData;
  return (
    <>
      <div className="world_cup_stats vspacer20">
        <h2 className="page_title">
          वर्ल्ड कप के <span> स्टैट्स </span>
        </h2>
        <div className="stats">
          <div className="total_runs">
            <div className="upper_sections">
              <p>
                <strong>{bat.runs_off_the_bat}</strong>
                <span>बल्ले से बने रन</span>
              </p>
            </div>
            <div className="ads_section"></div>
          </div>
          <div className="runs_sec">
            <div className="upper_sections">
              <div className="overs">
                <div className="run_in_overs">
                  <p>
                    <strong>{bat.runs_in_all_pp_overs}</strong>
                    <span>पावरप्ले में कुल रन</span>
                  </p>
                </div>
                <div className="run_in_boundries">
                  <p>
                    <strong>{bat.runs_in_boundaries}</strong>
                    <span>बाउंड्री से बने रन </span>
                  </p>
                </div>
              </div>
              <div className="hundreds">
                <p>
                  <strong>{bat.hundreds}</strong>
                  <span>शतक</span>
                </p>
              </div>
            </div>
            <div className="lowrr_sections">
              <div className="overs">
                <p>
                  <strong>{field.catches_taken}</strong>
                  <span>कैच पकड़े</span>
                </p>
              </div>
              <div className="hundreds">
                <div className="run_in_overs">
                  <p>
                    <strong>{bat.fours}</strong>
                    <span>चौके</span>
                  </p>
                </div>
                <div className="run_in_boundries">
                  <p>
                    <strong>{bat.sixes}</strong>
                    <span>छक्के</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="wickets_sec">
            <div className="upper_sections">
              <div className="wickets_section_s">
                <p>
                  <strong>{bowl.wickets}</strong>
                  <span>विकेट</span>
                </p>
              </div>
              <div className="fifties_sec">
                <div className="all_fifties">
                  <p>
                    <strong>{bat.fifties}</strong>
                    <span>अर्धशतक</span>
                  </p>
                </div>
                <div className="dismissals">
                  <p>
                    <strong>{bowl.duck_dismissals}</strong>
                    <span>0 पर आउट</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="lower_sections">
              <div className="overs">
                <div className="run_in_overs">
                  <p>
                    <strong>{bat.free_hits}</strong>
                    <span>फ्री हिट</span>
                  </p>
                </div>
                <div className="run_in_boundries">
                  <p>
                    <strong>{bat.runs_of_free_hits}</strong>
                    <span>फ्री हिट पर बने रन</span>
                  </p>
                </div>
              </div>
              <div className="hundreds">
                <p>
                  <strong>{bowl.maiden_over}</strong>
                  <span>मेडन ओवर</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .world_cup_stats {
            margin-top: 40px !important;
          }
          .stats {
            display: flex;
            background: #111
              url(https://images.news18.com/static_news18/pix/ibnhome/news18/stats_bg_d.png);
            background-size: cover;
          }
          .total_runs {
            position: relative;
          }
          .total_runs,
          .runs_sec,
          .wickets_sec {
            width: 307px;
            height: 521px;
            overflow: hidden;
            border-right: 1px solid #fff;
          }
          .stats p {
            position: absolute;
            top: 5px;
            right: 10px;
            color: #fff;
            text-align: right;
          }
          .stats .total_runs .upper_sections p strong {
            font-size: 58px;
            line-height: 58px;
          }
          .stats p strong {
            font-size: 34px;
            line-height: 34px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .stats p strong,
          .stats p span {
            display: block;
          }
          .stats .total_runs .upper_sections p span {
            font-size: 14px;
            line-height: 14px;
            text-transform: uppercase;
          }
          .ads_section {
            padding: 4px 3px 0 3px;
          }
          .total_runs,
          .runs_sec,
          .wickets_sec {
            width: 307px;
            height: 521px;
            overflow: hidden;
            border-right: 1px solid #fff;
          }
          .runs_sec .upper_sections {
            max-height: 261px;
            border-bottom: 1px solid #fff;
          }
          .runs_sec .upper_sections {
            display: flex;
            flex: 1;
          }
          .run_in_overs {
            position: relative;
            width: 153px;
            border-bottom: 1px solid #fff;
            border-right: 1px solid #fff;
            height: 130px;
          }
        `}
      </style>
    </>
  );
};

export default WCStats;
