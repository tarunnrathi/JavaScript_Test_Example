import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const WCStatsMobile = ({ isAmp = false, statsData }) => {
  const { bat = {}, bowl = {}, field = {} } = statsData;
  return (
    <>
      <div className="WcStatsWrap">
        <div className="wc_heading ">
          <h3 className="page_title">
            वर्ल्ड कप के <span>स्टैट्स</span>
          </h3>
        </div>
        <div className="ipl_stats_section CN-Sections">
          <div className="stats">
            <div className="runs_of_beat">
              {isAmp ? (
                <LazyLoadImage
                  isAMP={true}
                  src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_1.png"
                  alt="ipl"
                  height={70}
                  width={83}
                />
              ) : (
                <img
                  src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_1.png"
                  alt="ipl"
                />
              )}

              <p>
                <span>
                  बल्ले से बने <span> रन</span>
                </span>
                <strong>{bat.runs_off_the_bat}</strong>
              </p>
            </div>
            <div className="total_runs_section pp_boundries">
              <div className="pp_overs">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_2.png"
                    alt="ipl"
                    height={70}
                    width={83}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_2.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.runs_in_all_pp_overs}</strong>
                  <span>पावरप्ले में कुल रन</span>
                </p>
              </div>
              <div className="boundries">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_3.png"
                    alt="ipl"
                    height={70}
                    width={83}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_3.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.runs_in_boundaries}</strong>
                  <span>बाउंड्री से बने रन </span>
                </p>
              </div>
            </div>
            <div className="total_runs_section hundred_wkts">
              <div className="pp_overs">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_4.png"
                    alt="ipl"
                    height={70}
                    width={42}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_4.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.hundreds}</strong>
                  <span>शतक</span>
                </p>
              </div>
              <div className="boundries">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_5.png"
                    alt="ipl"
                    height={70}
                    width={166}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_5.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bowl.wickets}</strong>
                  <span>विकेट</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section fifti_es">
              <div className="pp_overs">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_6.png"
                    alt="ipl"
                    height={70}
                    width={83}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_6.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.fifties}</strong>
                  <span>अर्धशतक</span>
                </p>
              </div>
              <div className="boundries">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_7.png"
                    alt="ipl"
                    height={70}
                    width={83}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_7.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bowl.duck_dismissals}</strong>
                  <span>0 पर आउट</span>
                </p>
              </div>
            </div>
            {/*<div class="topadd">
									</div>*/}
            <div className="total_runs_section catches_taken">
              <div className="pp_overs">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_8.png"
                    alt="ipl"
                    height={70}
                    width={166}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_8.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{field.catches_taken}</strong>
                  <span>पकड़े</span>
                </p>
              </div>
              <div className="boundries">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_9.png"
                    alt="ipl"
                    height={70}
                    width={83}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_9.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.fours}</strong>
                  <span>चौके</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section six_es">
              <div className="pp_overs">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_10.png"
                    alt="ipl"
                    height={83}
                    width={70}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_10.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.sixes}</strong>
                  <span>छक्के</span>
                </p>
              </div>
              <div className="boundries">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_11.png"
                    alt="ipl"
                    height={83}
                    width={70}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_11.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.free_hits}</strong>
                  <span>फ्री हिट</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section free_hits">
              <div className="pp_overs">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_12.png"
                    alt="ipl"
                    height={83}
                    width={70}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_12.png"
                    alt="ipl"
                  />
                )}
                <p>
                  <strong>{bat.runs_of_free_hits}</strong>
                  <span>फ्री हिट पर बने रन </span>
                </p>
              </div>
              <div className="boundries">
                {isAmp ? (
                  <LazyLoadImage
                    isAMP={true}
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_13.png"
                    alt="ipl"
                    height={70}
                    width={83}
                  />
                ) : (
                  <img
                    src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_13.png"
                    alt="ipl"
                  />
                )}
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
            margin-top: 40px;
          }
          .WcStatsWrap {
            padding: 10px;
            background: #f5f5f5;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
          }
          .WcStatsWrap .wc_heading {
            padding-left: 0px;
          }
          .page_title {
            color: #e1261d;
            font-size: 24px;
            line-height: 22px;
            font-weight: 700;
            ${!isAmp ? "width: auto !important" : "width: auto"};
            ${!isAmp ? "border: none !important" : "border: none"};
          }
          .page_title span {
            color: #001d42;
            padding-left: 4px;
          }
          .stats .runs_of_beat {
            position: relative;
            background: #540032;
            border-bottom: 1px solid #fff;
          }
          .stats .runs_of_beat p {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #fff;
            text-align: right;
            font-family: "Mukta", sans-serif;
          }
          .stats .runs_of_beat p > span {
            font-size: 14px;
            line-height: 14px;
            text-transform: uppercase;
            display: inline-block;
            text-align: right;
            margin-right: 8px;
          }
          .stats .runs_of_beat p > span span {
            display: block;
          }
          .stats .runs_of_beat p strong {
            font-size: 38px;
            line-height: 38px;
            font-weight: bold;
          }
          .total_runs_section {
            display: flex;
            min-height: 77px;
          }
          .stats .pp_boundries .pp_overs {
            background-color: #2e112d;
          }
          .stats .total_runs_section .pp_overs,
          .stats .total_runs_section .boundries {
            width: 50%;
          }
          .stats .pp_overs {
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
          }
          .stats .pp_overs,
          .stats .boundries {
            position: relative;
          }
          .stats .pp_overs p,
          .stats .boundries p {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #fff;
            text-align: right;
            font-family: "Mukta", sans-serif;
          }
          .stats .pp_overs p strong,
          .stats .boundries p strong {
            font-size: 28px;
            line-height: 28px;
            text-transform: uppercase;
            display: block;
            font-weight: bold;
          }
          .stats .pp_overs p span,
          .stats .boundries p span {
            font-size: 11px;
            line-height: 14px;
            text-transform: uppercase;
            display: block;
          }
          .stats .pp_boundries .boundries {
            background-color: #c9283e;
          }
          .stats .boundries {
            border-bottom: 1px solid #fff;
          }
          .stats .hundred_wkts .pp_overs {
            background-color: #910026;
          }
          .stats .hundred_wkts .boundries {
            background-color: #f0433a;
          }
          .stats .fifti_es .pp_overs {
            background-color: #de2c44;
          }
          .stats .fifti_es .boundries {
            background-color: #910026;
          }
          .stats .catches_taken .pp_overs {
            background-color: #f0433a;
          }
          .stats .catches_taken .boundries {
            background-color: #910026;
          }
          .stats .six_es .pp_overs {
            background-color: #c9283e;
          }
          .stats .six_es .boundries {
            background-color: #910026;
          }
          .stats .free_hits .pp_overs {
            background-color: #2e112d;
          }
          .stats .free_hits .boundries {
            background-color: #540032;
          }
        `}
      </style>
    </>
  );
};

export default WCStatsMobile;
