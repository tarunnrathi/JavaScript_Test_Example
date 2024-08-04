import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const IPLStats = ({ pageAds = {}, statsData }) => {
  const { bat = {}, bowl = {}, field = {} } = statsData;
  return (
    <>
      <div className="stats">
        <div className="total_runs">
          <div className="upper_sections">
            <img
              className=""
              loading="lazy"
              src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_1.png"
              data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_1.png"
              alt="ipl"
              width="307"
              height="261"
            />
            <p>
              <strong>{bat.runs_off_the_bat}</strong>
              <span>RUNS OFF THE BAT</span>
            </p>
          </div>
          <div className="ads_section">
            <SiteAd
              width={307}
              height={250}
              adUnit={pageAds.MTF_300_id}
              sizes={[[307, 90]]}
              lazyload={true}
            ></SiteAd>
          </div>
        </div>
        <div className="runs_sec">
          <div className="upper_sections">
            <div className="overs">
              <div className="run_in_overs">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_2.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_2.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.runs_in_all_pp_overs}</strong>
                  <span>
                    RUNS IN ALL <br />
                    PP OVERS
                  </span>
                </p>
              </div>
              <div className="run_in_boundries">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_3.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_3.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.runs_in_boundaries}</strong>
                  <span>
                    RUNS IN <br />
                    BOUNDARIES
                  </span>
                </p>
              </div>
            </div>
            <div className="hundreds">
              <img
                className=""
                loading="lazy"
                src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_4.png"
                data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_4.png"
                alt="ipl"
                width="153"
                height="261"
              />
              <p>
                <strong>{bat.hundreds}</strong>
                <span>HUNDREDS</span>
              </p>
            </div>
          </div>
          <div className="lowrr_sections">
            <div className="overs">
              <img
                className=""
                loading="lazy"
                src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_8.png"
                data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_8.png"
                alt="ipl"
                width="307"
                height="130"
              />
              <p>
                <strong>{field.catches_taken}</strong>
                <span>
                  CATCHES <br />
                  TAKEN
                </span>
              </p>
            </div>
            <div className="hundreds">
              <div className="run_in_overs">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_9.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_9.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.fours}</strong>
                  <span>FOURS</span>
                </p>
              </div>
              <div className="run_in_boundries">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_10.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_10.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.sixes}</strong>
                  <span>SIXES</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="wickets_sec">
          <div className="upper_sections">
            <div className="wickets_section_s">
              <img
                className=""
                loading="lazy"
                src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_5.png"
                data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_5.png"
                alt="ipl"
                width="307"
                height="130"
              />
              <p>
                <strong>{bowl.wickets}</strong>
                <span>WICKETS</span>
              </p>
            </div>
            <div className="fifties_sec">
              <div className="all_fifties">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_6.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_6.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.fifties}</strong>
                  <span>FIFTIES</span>
                </p>
              </div>
              <div className="dismissals">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_7.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_7.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bowl.duck_dismissals}</strong>
                  <span>
                    DUCK <br />
                    DISMISSALS
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="lower_sections">
            <div className="overs">
              <div className="run_in_overs">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_11.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_11.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.free_hits}</strong>
                  <span>FREE HITS</span>
                </p>
              </div>
              <div className="run_in_boundries">
                <img
                  className=""
                  loading="lazy"
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_12.png"
                  data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_12.png"
                  alt="ipl"
                  width="153"
                  height="130"
                />
                <p>
                  <strong>{bat.runs_of_free_hits}</strong>
                  <span>
                    RUNS OFF <br />
                    FREE HITS
                  </span>
                </p>
              </div>
            </div>
            <div className="hundreds">
              <img
                className=""
                loading="lazy"
                src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_13.png"
                data-src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/img_13.png"
                alt="ipl"
                width="153"
                height="261"
              />
              <p>
                <strong>{bowl.maiden_over}</strong>
                <span>MAIDEN OVER</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .wickets_section_s,
        .all_fifties,
        .dismissals {
          position: relative;
        }
        .lower_sections .hundreds {
          width: 153px;
          height: 261px;
          position: relative;
        }
        .wickets_sec .lower_sections {
          display: flex;
        }
        .fifties_sec {
          display: flex;
        }
        .lowrr_sections .hundreds .run_in_boundries {
          width: 153px;
          height: 130px;
        }
        .runs_sec .lowrr_sections .hundreds {
          display: flex;
        }
        .run_in_boundries {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          height: 130px;
        }
        .wickets_section_s {
          width: 307px;
          height: 130px;
          border-bottom: 1px solid #fff;
        }
        .all_fifties {
          width: 153px;
          height: 130px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
        }
        .fifties_sec {
          display: flex;
        }
        .lowrr_sections .overs {
          width: 307px;
          height: 130px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          position: relative;
        }
        .upper_sections .hundreds {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          height: 261px;
        }
        .run_in_overs {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          height: 130px;
        }
        .run_in_boundries {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          height: 130px;
        }
        .runs_sec .upper_sections {
          display: flex;
          max-height: 261px;
          border-bottom: 1px solid #fff;
        }
        .run_in_overs {
          position: relative;
          width: 153px;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
          height: 130px;
        }
        .ads_section {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
        .stats {
          display: flex;
        }
        .total_runs {
          position: relative;
          background: #202020;
        }
        .stats p {
          position: absolute;
          top: 20px;
          right: 20px;
          color: #fff;
          text-align: right;
        }
        .total_runs,
        .runs_sec,
        .wickets_sec {
          width: 307px;
          height: 521px;
          overflow: hidden;
          border-right: 1px solid #fff;
        }
        .stats .total_runs .upper_sections p strong {
          font-size: 58px;
          line-height: 58px;
        }
        .stats p strong {
          text-transform: uppercase;
        }
        .stats p strong,
        .stats p span {
          display: block;
        }
        .stats p strong {
          font-size: 34px;
          line-height: 34px;
          text-transform: uppercase;
        }
        .stats p span {
          font-size: 12px;
          line-height: 14px;
          text-transform: uppercase;
        }
        .stats .total_runs .upper_sections p span {
          font-size: 14px;
          line-height: 14px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

export default IPLStats;
