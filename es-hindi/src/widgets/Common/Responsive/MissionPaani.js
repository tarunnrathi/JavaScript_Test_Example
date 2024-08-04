import { memo } from "react";
// import { Helmet } from 'react-helmet';

const MissionPaani = (props) => {
    const mission_paani_desktop_banner=true;
    const mission_paani_mobile_banner =true;
    const device = props.name;

    return (
        <>
            {
                (mission_paani_desktop_banner==true && device=='desktop') ? (
                    <>
                        <div className="pani-banner">
                            <a href="https://www.news18.com/mission-paani/" target="_blank">
                                <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mission_paani_desktop_1605161915.jpg" alt="Mission Paani" />
                            </a>
                        </div>
                        <div className="vsp10 clearfix"></div>
                        <style jsx>
                            {`
                                .paani-footer .time-counts span{padding-top: 0px;}
                                .pani-banner {
                                    display: block;
                                    text-align: center;
                                    background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mission_paani_desktop_1605161915.jpg) center no-repeat;
                                    height: 86px;
                                }
                            `}
                        </style>
                    </>
                ): (mission_paani_mobile_banner== true && device=='mobile') ? (
                    <>
                        <div className="pani-banner">
                            <a href="https://www.news18.com/mission-paani/" target="_blank">
                                <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/mission_paani_mobile_1605161938.jpg" alt="Mission Paani" />
                            </a>
                        </div>
                        <div className="vsp10 clearfix"></div>
                        <style jsx>
                            {`
                                .paani-footer .time-counts span{padding-top: 0px;}
                                .pani-banner {
                                    display: block;
                                    text-align: center;
                                }
                            `}
                        </style>
                    </>
                ) : (mission_paani_desktop_banner== true && device=='desktop-rhs') ? (
                    <>
                        {/* <div className="pani-wid">
                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/mission-paani/pani-header1.jpg" />
                            <div className="embedcode">
                                <div className="pd-embeded" id="iframe-container">
                                    <iframe src="https://news18.survey.fm/mission-paani-take-pledge?iframe=https%3A%2F%2Fhindi.news18.com%2Fmission-paani%2F&ft=1" width={"100%"} height={"300px"}></iframe>
                                </div>
                            </div>
                            <div className="paani-footer">
                                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/mission-paani/pani-footer.jpg" />
                                <div className="time-counts">
                                    <span id="div_counter_5">0</span><span id="div_counter_4">0</span><span id="div_counter_3">0</span><span id="div_counter_2">0</span><span id="div_counter_1">0</span>
                                </div>
                            </div>
                        </div>
                        <style>
                            {`
                                .pani-wid {border: 1px solid #199ce8; width: 300px; margin: 0px auto; margin-top:15px; margin-bottom:0px;}
                                .paani-footer{position:relative;}
                                .paani-footer img{display:block;}
                                .paani-footer{position:relative;}
                                .time-counts{position:absolute;top:26px;left:130px; font-size:24px; color:#ff1800; font-weight:bold;}
                                .time-counts span {padding-right: 20px;padding-top: 3px;display: inline-block;padding-left: 1px;}
                                .time-counts span:last-child {padding-right:0px;}
                                .embedcode{padding:0 20px;}
                                @media screen and (max-width:720px){
                                    .pani-wid {width: 100%; margin-bottom: 15px;  box-sizing: border-box;max-width: 300px;}
                                }
                            `}
                        </style> */}
                    </>
                ) :null
            }
        </>
    );
};
export default memo(MissionPaani);
