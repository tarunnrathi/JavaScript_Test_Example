import LazyLoadImage from "components/Common/CustomImage";
import { loadTvfn, newVidgyorScript } from "includes/article.util";
import React, { useEffect } from "react";
import NewSiteAd from "../Responsive/NewSiteAd";
import FakeYTPlayer from "components/Common/FakeYTPlayer";
import VideoImage from "components/Common/VideoImage";

const RamMandirTopNews = (props) => {
    const { topNewsStories = [], isMobile = false, liveTvFlag : { widget : { is_live = "", livetv = ""} = {}} = {}} = props;
    const second = topNewsStories.slice(0,1)?.[0] || {};
    const third = topNewsStories.slice(1,2)?.[0] || {};
    const last = topNewsStories.slice(2,6) || {};
    
    return (<>
        
        <div className="rmwrp rmtpin" style={{ paddingTop: "10px" }}>
            {!isMobile && <h2 className="rmgblhd">राम मंदिर की ताजा खबरें</h2>}
            {!isMobile && <h2 className="rmgblhd2 rmgblhd" style={{ width: "30%"}}>मैं भी अयोध्या</h2>}

            <div className="rmtpnws">
                {isMobile && <div className="rmtpnwsr" style={{ margin: "auto", marginBottom: "25px", textAlign: "center"}}>
                    {isMobile && <h2 className="rmgblhd">मैं भी अयोध्या</h2>}
                    <a href="https://hindi.news18.com/short-news/ayodhya/">
                    <LazyLoadImage src="https://images.news18.com/ibnkhabar/uploads/2024/01/AYODHYA-GIF-2024-01-0cb6f23ccd8470de3642d278cd8042aa.gif" width={300} height={380}/>
                    </a>
                </div>}
                {isMobile && <h2 className="rmgblhd">राम मंदिर की ताजा खबरें</h2>}
                <div className="rmtpnwsl">
                    <div className="rmtpnwswrp">
                    
                        <div className="rmtpnwsitml">
                        <a href={second.weburl} className="rmstryuponhd">
                        <figure>
                            <LazyLoadImage alt={second.display_headline} src={second?.images?.url} width={410} height={273}/>
                        </figure>
                        <span>
                        {second.display_headline}</span>	
                        </a>
                        <a href={third.weburl} className="rmstrythmb">
                        <figure>
                            <LazyLoadImage alt={third.display_headline} src={third?.images?.url} width={105} height={70}/>
                        </figure>
                        <span>
                            {third.post_type === "videos" && <LazyLoadImage alt={third.display_headline} src="/images/rammandir/videoicon.png" width={23} height={22}/>}
                            {third.post_type === "webstory" && <LazyLoadImage alt={third.display_headline} src="/images/rammandir/webstoryicon.png" width={20} height={17}/>}
                            {third.display_headline}</span>	
                        </a>
                        </div>
                        <ul className="rmtpnwsitmr">
                        {last.map((itm, index) => (
                            <li key={index + "rmtpnwsitmr"}>
                            <a href={itm.weburl} className="rmstrythmb">
                            <figure>
                                <LazyLoadImage alt={itm.display_headline} src={itm?.images?.url} width={105} height={70}/>
                            </figure>
                            <span>
                            {itm.post_type === "videos" && <LazyLoadImage alt={itm.display_headline} src="/images/rammandir/videoicon.png" width={23} height={22}/>}
                            {itm.post_type === "webstory" && <LazyLoadImage alt={itm.display_headline} src="/images/rammandir/webstoryicon.png" width={20} height={17}/>}
                                {itm.display_headline}</span>
                            </a>	
                            </li>
                        ))}
                        </ul>

                    </div>	
                </div>
                {!isMobile && <div className="rmtpnwsr" style={{ margin: "auto", textAlign: "center"}}>
                    <a href="https://hindi.news18.com/short-news/ayodhya/">
                    <LazyLoadImage src="https://images.news18.com/ibnkhabar/uploads/2024/01/AYODHYA-GIF-2024-01-0cb6f23ccd8470de3642d278cd8042aa.gif" width={300} height={380}/>
                    </a>
                </div>}
            </div>        
            <div className="vwmdl">
                <div className="vwmdlbx"><a href={"/tag/ram-mandir/"} className="rmvwscls">+</a><img src="/images/rammandir/viewimg.png" alt="" /></div>	
            </div>
            <div className="moreseebtn"><a href={"/tag/ram-mandir/"}>और लोड करें</a></div>
        </div>
        <style jsx global>
            {` .rmgblhd : { margin: auto; padding: 30px; } 
            .moreseebtn a {
                margin-left: 35%;
            }
            .rmgblhd2:after {
                    background-size: 300px;
                    width: 300px;
            }
            @media (max-width: 769px) {
                .rmgblhd:after {
                    width: 320px !important;
                    -webkit-background-size: 320px;
                    -moz-background-size: 320px;
                    -o-background-size: 320px;
                    background-size: 320px;
                    
                }
                .rmtpnwsitml .rmstrythmb span, .rmtpnwsitml .rmstrythmb span {
                    font-weight: normal;
                    font-size: 16px;
                }
            }
            `}
        </style>
    </>)
};

export default RamMandirTopNews;