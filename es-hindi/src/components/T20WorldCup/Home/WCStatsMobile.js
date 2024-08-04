import React from "react";
import LazyLoadImage from "components/Common/CustomImage";

const WCStatsMobile = ({ isAmp = false, statsData }) => {
  const { bat = [], bowl = [], field = [] } = statsData;
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
              <LazyLoadImage isAMP={isAmp}
                src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_1.png"
                alt="t20"
                height={70}
                width={83}
                isLazyLoad={true}
              />
              <p>
                <span>
                  बल्ले से बने <span> रन</span>
                </span>
                <strong>{bat[0]?.title_value || 0}</strong>
              </p>
            </div>
            <div className="total_runs_section pp_boundries">
              <div className="pp_overs">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_2.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[1]?.title_value || 0}</strong>
                  <span>पावरप्ले में कुल रन</span>
                </p>
              </div>
              <div className="boundries">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_3.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[4]?.title_value || 0}</strong>
                  <span>बाउंड्री से बने रन </span>
                </p>
              </div>
            </div>
            <div className="total_runs_section hundred_wkts">
              <div className="pp_overs">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_4.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[8]?.title_value || 0}</strong>
                  <span>शतक</span>
                </p>
              </div>
              <div className="boundries">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_5.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bowl[9]?.title_value || 0}</strong>
                  <span>विकेट</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section fifti_es">
              <div className="pp_overs">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_6.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[7]?.title_value || 0}</strong>
                  <span>अर्धशतक</span>
                </p>
              </div>
              <div className="boundries">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_7.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bowl[1]?.title_value || 0}</strong>
                  <span>0 पर आउट</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section catches_taken">
              <div className="pp_overs">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_8.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{field[0]?.title_value || 0}</strong>
                  <span>कैच पकड़े</span>
                </p>
              </div>
              <div className="boundries">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_9.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[9]?.title_value || 0}</strong>
                  <span>चौके</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section six_es">
              <div className="pp_overs">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_10.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[10]?.title_value || 0}</strong>
                  <span>छक्के</span>
                </p>
              </div>
              <div className="boundries">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_11.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[5]?.title_value || 0}</strong>
                  <span>फ्री हिट</span>
                </p>
              </div>
            </div>
            <div className="total_runs_section free_hits">
              <div className="pp_overs">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_12.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bat[6]?.title_value || 0}</strong>
                  <span>फ्री हिट पर बने रन </span>
                </p>
              </div>
              <div className="boundries">
                <LazyLoadImage isAMP={isAmp}
                  src="https://static.hindi.news18.com/ibnkhabar/uploads/assets/images/mobile-img_13.png"
                  alt="t20"
                  height={70}
                  width={83}
                  isLazyLoad={true}
                />
                <p>
                  <strong>{bowl[10]?.title_value || 0}</strong>
                  <span>मेडन ओवर</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
			.world_cup_stats { margin-top: 40px; }
      .WcStatsWrap {padding: 10px;background: #F5F5F5;border-top: 1px solid #E5E5E5;border-bottom: 1px solid #E5E5E5;}
      .WcStatsWrap .wc_heading { padding-left: 0px;}
      .page_title { color: #E1261D; font-size: 24px; line-height: 22px; font-weight: 700; width: auto!important; border: none!important;}
      .page_title span {color: #001D42; padding-left: 4px;}
      .stats .runs_of_beat {position: relative; background: #540032; border-bottom: 1px solid #fff;}
      .stats .runs_of_beat p {position: absolute; top: 15px; right: 15px; color: #fff; text-align: right;	font-family: "Mukta",sans-serif;}
      .stats .runs_of_beat p > span {font-size: 14px;line-height: 14px; text-transform: uppercase; display: inline-block; text-align: right;margin-right: 8px;}
      .stats .runs_of_beat p > span span {display: block;}
      .stats .runs_of_beat p strong {font-size: 38px; line-height: 38px; font-weight: bold;}
      .total_runs_section {display: flex; min-height: 77px;}
      .stats .pp_boundries .pp_overs {background-color: #2E112D;}
      .stats .total_runs_section .pp_overs, .stats .total_runs_section .boundries {width: 50%;}
      .stats .pp_overs {border-right: 1px solid #fff; border-bottom: 1px solid #fff;}
      .stats .pp_overs, .stats .boundries {position: relative;}
      .stats .pp_overs p, .stats .boundries p {position: absolute; top: 15px; right: 15px; color: #fff; text-align: right; font-family: "Mukta",sans-serif}
      .stats .pp_overs p strong, .stats .boundries p strong {font-size: 28px; line-height: 28px; text-transform: uppercase; display: block; font-weight: bold;}
      .stats .pp_overs p span, .stats .boundries p span {font-size: 11px; line-height: 14px; text-transform: uppercase; display: block;}
      .stats .pp_boundries .boundries {background-color: #C9283E;}
      .stats .boundries {border-bottom: 1px solid #fff;}
      .stats .hundred_wkts .pp_overs {background-color: #910026;}
      .stats .hundred_wkts .boundries {background-color: #F0433A;}
      .stats .fifti_es .pp_overs {background-color: #DE2C44;}
      .stats .fifti_es .boundries {background-color: #910026;}
      .stats .catches_taken .pp_overs {background-color: #F0433A;}
      .stats .catches_taken .boundries {background-color: #910026;}
      .stats .six_es .pp_overs {background-color: #C9283E;}
      .stats .six_es .boundries {background-color: #910026;}
      .stats .free_hits .pp_overs {background-color: #2E112D;}
      .stats .free_hits .boundries {background-color: #540032;}
		`}
      </style>
    </>
  );
};

export default WCStatsMobile;
