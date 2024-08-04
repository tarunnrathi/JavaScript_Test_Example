import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import Script from "next/script";

const ExitPollWidget = (props) => {
    const width = props.isMobile ? 360 : 1244;
    const height = props.isMobile ? 50 : 60;
    const adUnit = props.isMobile ? 'NW18_HIND_PWA/NW18_HIND_Election_PWA/NW18_HIND_Election_EXITPOLL_PWA/NW18_HIND_ELECT_EXTPOL_PWA_ROS_ATF_LOGO' : 'NW18_HIND_Desktop/NW18_HIND_Election/NW18_HIND_Election_HOME/NW18_HIND_ELECT_HOM_ATF_LOGO';
    const slotId = props.isMobile ? 'as_el_2022_ad_exitpoll_pwa_strip' : 'as_el_2022_ad_exitpoll_desktop_strip';
    if(props?.exitPollFlag) {
        // useEffect(() => {
        //     setTimeout(() => {
        //         //Start exitPollScript Script
        //         let script = document.createElement("script");
        //         script.type = "text/javascript";
        //         script.src = "https://images.newjss18.com/static_news18/js/revamp/glide.min.";
        //         document.head.appendChild(script);
        //         var exitPollScript = document.createElement('script');
        //         exitPollScript.src = "https://images.news18.com/static_news18/pix/ibnhome/news18/election-logo/FinalExitPollWidget2022.js";
        //         exitPollScript.defer =  true;
        //         document.body.appendChild(exitPollScript)
        //         //End exitPollScript Script
        //     }, 10);
        // }, [])
    }
    return (
        <>
            {
                props.exitPollSponserFlag ?
                    <>
                        <div className="home_strip_ad exit_poll">
                            <SiteAd
                                slotId={slotId}
                                adUnit={adUnit}
                                sizes={[[width, height]]}
                                width={width}
                                height={height}
                                removeAdSpan={true}
                            />
                        </div>
                    </>
                : ""
            }
            { props.exitPollFlag ?
                <>
                    <Script src='https://images.news18.com/dlxczavtqcctuei/news18/stg/FinalExitPollWidgetDec2022.js' strategy="afterInteractive"></Script>
                    <div id="ExitPoll2022Widget" style={{ minHeight: "70px" }}>
                        <div className="exitpoll-skltn-wrap">
                            <div className="exitpoll-skltn-hd">
                                <div className="exitpoll-skltn-hd-in">
                                    <div className="three-bounce">
                                        <div className="one"></div>
                                        <div className="two"></div>
                                        <div className="three"></div>
                                    </div>
                                </div>
                                <div className="exitpoll-skltn-hd-in">
                                    <div className="three-bounce">
                                        <div className="one"></div>
                                        <div className="two"></div>
                                        <div className="three"></div>
                                    </div>
                                </div>
                            </div>
                            <ul className="exitpoll-skltn-items">
                                <li>
                                    <div className="exitpoll-skltn-items-hd">
                                        <div className="exitpoll-skltn-items-hd-left">
                                        <div className="three-bounce">
                                            <div className="one"></div>
                                            <div className="two"></div>
                                            <div className="three"></div>
                                        </div>
                                        </div>
                                        <div className="exitpoll-skltn-items-hd-right">
                                        <div className="three-bounce">
                                            <div className="one"></div>
                                            <div className="two"></div>
                                            <div className="three"></div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="exitpoll-skltn-table">
                                        <table>
                                        <tbody>
                                            <tr>
                                                <th style={{ backgroundColor: "#83C700" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#F97D09" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#B80D2E" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#464646" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: "#83C700" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#F97D09" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#B80D2E" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#464646" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    <div className="exitpoll-skltn-seats">
                                        <div className="three-bounce">
                                        <div className="one"></div>
                                        <div className="two"></div>
                                        <div className="three"></div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="exitpoll-skltn-items-hd">
                                        <div className="exitpoll-skltn-items-hd-left">
                                        <div className="three-bounce">
                                            <div className="one"></div>
                                            <div className="two"></div>
                                            <div className="three"></div>
                                        </div>
                                        </div>
                                        <div className="exitpoll-skltn-items-hd-right">
                                        <div className="three-bounce">
                                            <div className="one"></div>
                                            <div className="two"></div>
                                            <div className="three"></div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="exitpoll-skltn-table">
                                        <table>
                                        <tbody>
                                            <tr>
                                                <th style={{ backgroundColor: "#83C700" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#F97D09" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#B80D2E" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#464646" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: "#83C700" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#F97D09" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#B80D2E" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#464646" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    <div className="exitpoll-skltn-seats">
                                        <div className="three-bounce">
                                        <div className="one"></div>
                                        <div className="two"></div>
                                        <div className="three"></div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="exitpoll-skltn-items-hd">
                                        <div className="exitpoll-skltn-items-hd-left">
                                        <div className="three-bounce">
                                            <div className="one"></div>
                                            <div className="two"></div>
                                            <div className="three"></div>
                                        </div>
                                        </div>
                                        <div className="exitpoll-skltn-items-hd-right">
                                        <div className="three-bounce">
                                            <div className="one"></div>
                                            <div className="two"></div>
                                            <div className="three"></div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="exitpoll-skltn-table">
                                        <table>
                                        <tbody>
                                            <tr>
                                                <th style={{ backgroundColor: "#83C700" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#F97D09" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#B80D2E" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                                <th style={{ backgroundColor: "#464646" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: "#83C700" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#F97D09" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#B80D2E" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                                <td style={{ backgroundColor: "#464646" }}>
                                                    <div className="three-bounce">
                                                    <div className="one"></div>
                                                    <div className="two"></div>
                                                    <div className="three"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    <div className="exitpoll-skltn-seats">
                                        <div className="three-bounce">
                                        <div className="one"></div>
                                        <div className="two"></div>
                                        <div className="three"></div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            : "" }
            <style jsx global>{`
                .home_strip_ad { background: #e5e3e3; max-width: 1244px; height: 60px; margin-bottom: 1px; margin: auto; margin-top: 10px; text-align: center;}
                @keyframes bouncedelay {0%, 80%, 100% {-webkit-transform: scale(0);transform: scale(0)}
                40% {transform: scale(1);-webkit-transform: scale(1)}}
                .three-bounce {right: 0;z-index: 10;display: flex;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);justify-content: space-between;width: 35px;opacity: 0.5;}
                .three-bounce>div {width: 10px;height: 10px;border-radius: 100%;background-color: #fff;-webkit-animation: bouncedelay 1.4s infinite ease-in-out both;animation: bouncedelay 1.4s infinite ease-in-out both;}
                .three-bounce .one {-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}
                .three-bounce .two {-webkit-animation-delay: -0.16s;animation-delay: -0.16s;} 
                .exitpoll-skltn-spnsr{max-width: 1244px;height: 60px;background: #333;color: #fff;text-align: center;margin:auto; display:flex; justify-content:space-between; padding: 0 10px; box-sizing: border-box;}
                .exitpoll-skltn-spnsr-div{position: relative; margin:0 20px;}
                .exitpoll-skltn-wrap{max-width: 1244px;margin: auto;background: #f6f6f6;border: 1px solid #d7d7d7;box-sizing: border-box;padding: 10px;position: relative;}
                .exitpoll-skltn-hd{display: flex; justify-content:space-between; align-items:flex-end;}
                .exitpoll-skltn-hd-in{height: 30px; background: #031d40; width:30%;position: relative;}
                .exitpoll-skltn-items{display: flex; justify-content:space-between; margin:0; padding: 0; margin-top:10px}
                .exitpoll-skltn-items li{width: 32.5%;background: #fff;border: 1px solid #d6d6d6;overflow: hidden; box-sizing: border-box;padding: 10px;list-style: none;}
                .exitpoll-skltn-items-hd{display: flex; justify-content:space-between; align-items:flex-end;}
                .exitpoll-skltn-items-hd-left{height: 20px; width:40px;position: relative; filter: brightness(0);}
                .exitpoll-skltn-items-hd-right{height: 20px; background: #031d40; width:30%;position: relative;border-radius: 20px;}
                .exitpoll-skltn-table{margin:5px 0;}
                .exitpoll-skltn-table table{border-collapse:collapse; border-spacing: 0;  width: 100%;}
                .exitpoll-skltn-table table th, .exitpoll-skltn-table table td{position:relative;letter-spacing:-0.28px;color:#fff;vertical-align:middle; border:1px #fff solid; text-transform:uppercase; text-align:center;}
                .exitpoll-skltn-table table th{ height: 27px;  font-size: 14px;  font-weight: 500;  background:#ccc;}
                .exitpoll-skltn-table table td{background:#999; height: 52px; font-size: 20px;}
                .exitpoll-skltn-seats{height: 27px; width:40px;position: relative; filter: brightness(0);}
                @media screen and (max-width: 600px){
                .exitpoll-skltn-items{overflow: scroll;}.exitpoll-skltn-items li{width: 100%; flex-shrink: 0;}
                
            `}
            </style>
        </>
    );
};
export default ExitPollWidget;
