import { IPL_YEAR } from "includes/ipl.helper";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const IPLStats = ({ pageAds = {}, statsData }) => {
    const { bat = {}, bowl = {}, field = {} } = statsData;
    return (
    <>
        <h2 className="ipl-globahd">
            आईपीएल {IPL_YEAR}  <span>स्टैट्स</span>
        </h2>
        <div className="ipl_stats_section CN-Sections">
            <div className="stats">
                <div className="runs_of_beat">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_1.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_1.png" alt="ipl" width="83" height="70" />
                    <p>
                        <span>RUNS <span> OFF THE BAT</span></span>
                        <strong>{bat.runs_off_the_bat}</strong>
                    </p>
                </div>
                <div className="total_runs_section pp_boundries">
                    <div className="pp_overs">
                        <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_2.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_2.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bat.runs_in_all_pp_overs}</strong>
                            <span>RUNS IN ALL PP OVERS</span>
                        </p>
                    </div>
                    <div className="boundries">
                        <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_3.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_3.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bat.runs_in_boundaries}</strong>
                            <span>RUNS IN BOUNDARIES</span>
                        </p>
                    </div>
                </div>
                <div className="total_runs_section hundred_wkts">
                    <div className="pp_overs">
                        <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_4.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_4.png" alt="ipl" width="42" height="70" />
                        <p>
                            <strong>{bat.hundreds}</strong>
                            <span>HUNDREDS</span>
                        </p>
                    </div>
                    <div className="boundries">
                        <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_5.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_5.png" alt="ipl" width="166" height="70" />
                        <p>
                            <strong>{bowl.wickets}</strong>
                            <span>WICKETS</span>
                        </p>
                    </div>
                </div>
                <div className="total_runs_section fifti_es">
                    <div className="pp_overs">
                        <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_6.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_6.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bat.fifties}</strong>
                            <span>FIFTIES</span>
                        </p>
                    </div>
                    <div className="boundries">
                        <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_7.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_7.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bowl.duck_dismissals}</strong>
                            <span>DUCK DISMISSALS</span>
                        </p>
                    </div>
                </div>
                {pageAds.BTF_300 ? (
                <div className="clearfix add">
                    <div className="addinner-box">
                    <SiteAd
                        width={336}
                        height={280}
                        adUnit={pageAds.BTF_300}
                        sizes={[[300, 250], [336, 280]]}
                        lazyload={true}
                        ></SiteAd>
                    </div>
                </div>
                ) : null}
                <div className="total_runs_section catches_taken">
                    <div className="pp_overs">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_8.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_8.png" alt="ipl" width="166" height="70" />
                        <p className="jsx-368f318d0d58248">
                            <strong className="jsx-368f318d0d58248">{field.catches_taken}</strong>
                            <span className="jsx-368f318d0d58248">CATCHES TAKEN</span>
                        </p>
                    </div>
                    <div className="boundries">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_9.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_9.png" alt="ipl" width="83" height="70" />
                        <p className="jsx-368f318d0d58248">
                            <strong className="jsx-368f318d0d58248">{bat.fours}</strong>
                            <span className="jsx-368f318d0d58248">FOURS</span>
                        </p>
                    </div>
                </div>
                <div className="total_runs_section six_es">
                    <div className="pp_overs">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_10.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_10.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bat.sixes}</strong>
                            <span>SIXES</span>
                        </p>
                    </div>
                    <div className="boundries">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_11.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_11.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bat.free_hits}</strong>
                            <span>FREE HITS</span>
                        </p>
                    </div>
                </div>
                <div className="total_runs_section free_hits">
                    <div className="pp_overs">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_12.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_12.png" alt="ipl" width="83" height="70" />
                        <p>
                            <strong>{bat.runs_of_free_hits}</strong>
                            <span>RUNS OFF FREE HITS</span>
                        </p>
                    </div>
                    <div className="boundries">
                    <img loading="lazy" src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_13.png" data-src="https://static.hindi.news18.com//ibnkhabar/uploads/assets/images/mobile-img_13.png" alt="ipl" width="42" height="70" />
                        <p>
                            <strong>{bowl.maiden_over}</strong>
                            <span>MAIDEN OVER</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <style jsx global>{`
        .ipl-globahd {
            font-size: 24px;
            color: #eb3d3c;
            line-height: 20px;
            padding: 20px 10px 0 10px;
        }
        // .ipl-globahd a {
        //     color: #eb3d3c;
        // }
        .ipl-globahd  span {
            color: #001d42;
        }
        .ipl_stats_section {
            margin-top: 10px;            
        }
        .ipl_stats_section .runs_of_beat {
            position: relative;
            background: #540032;
            border-bottom: 1px solid #fff;
        }
        .ipl_stats_section .runs_of_beat img {
            max-width: 100%;
            border: 0;
        }
        .ipl_stats_section .runs_of_beat p {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            text-align: right;
        }
        .ipl_stats_section .runs_of_beat p span {
            font-size: 14px;
            line-height: 14px;
            text-transform: uppercase;
            display: inline-block;
            text-align: left;
            margin-right: 8px;
        }
        .ipl_stats_section .runs_of_beat p span span {
            display: block;
        }
        .ipl_stats_section .runs_of_beat p strong {
            font-size: 38px;
            line-height: 38px;
        }
        .ipl_stats_section .boundries p strong, .ipl_stats_section .pp_overs p strong {
            font-size: 28px;
            line-height: 28px;
            text-transform: uppercase;
            display: block;
        }
        .ipl_stats_section .boundries p span, .ipl_stats_section .pp_overs p span {
            font-size: 11px;
            line-height: 14px;
            text-transform: uppercase;
            display: block;
        }
        .total_runs_section {
            display: flex;
        }
        .ipl_stats_section .pp_boundries .pp_overs {
            background-color: #2e112d;
        }
        .ipl_stats_section .boundries p, .ipl_stats_section .pp_overs p {
            position: absolute;
            top: 20px;
            right: 20px;
            color: #fff;
            text-align: right;
        }
        .ipl_stats_section .pp_boundries .boundries {
            background-color: #c9283e;
        }
        .ipl_stats_section .total_runs_section .boundries, .ipl_stats_section .total_runs_section .pp_overs {
            width: 50%;
        }
        .ipl_stats_section .pp_overs {
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
        }
        .ipl_stats_section .boundries, .ipl_stats_section .pp_overs {
            position: relative;
        }
        .ipl_stats_section .hundred_wkts .pp_overs {
            background-color: #910026;
        }
        .ipl_stats_section .hundred_wkts .boundries {
            background-color: #f0433a;
        }
        .ipl_stats_section .fifti_es .pp_overs {
            background-color: #de2c44;
        }
        .ipl_stats_section .fifti_es .boundries {
            background-color: #910026;
        }
        .ipl_stats_section .catches_taken .pp_overs {
            background-color: #f0433a;
        }
        .ipl_stats_section .catches_taken .boundries {
            background-color: #910026;
        }
        .ipl_stats_section .six_es .pp_overs {
            background-color: #c9283e;
        }
        .ipl_stats_section .six_es .boundries {
            background-color: #910026;
        }
        .ipl_stats_section .free_hits .pp_overs {
            background-color: #2e112d;
        }
        .ipl_stats_section .free_hits .boundries {
            background-color: #540032;
        }
        .ipl_stats_section .boundries {
            border-bottom: 1px solid #fff;
        }
        `}</style>
    </>
  );

};

export default IPLStats;
