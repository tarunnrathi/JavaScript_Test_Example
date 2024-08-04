import LazyLoadImage from "components/Common/CustomImage";
import { loadTvfn, newVidgyorScript } from "includes/article.util";
import React, { useEffect, useState } from "react";
import NewSiteAd from "../Responsive/NewSiteAd";
import FakeYTPlayer from "components/Common/FakeYTPlayer";
import VideoImage from "components/Common/VideoImage";

const TopPriorityData = (props) => {
    const { topPriorityData = [], isMobile = false, liveTvFlag : { widget : { is_live = "", livetv = ""} = {}} = {}} = props;
    const first = topPriorityData.slice(0,1)?.[0] || {};
    const second = topPriorityData.slice(1,2)?.[0] || {};
    const third = topPriorityData.slice(2,3)?.[0] || {};
    const last = topPriorityData.slice(3,8) || {};
    const [ timer, setTimer] = useState(new Date('Jan 22, 2024 12:20:00').getTime() <= new Date().getTime());
    useEffect(() => {
        is_live == 1 ? loadTvfn() : newVidgyorScript()

        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let countDown = new Date('Jan 22, 2024 12:20:00').getTime(),
            x = setInterval(function () {
                let now = new Date().getTime(),
                    distance = countDown - now;
                if(distance <= 0) {
                    setTimer(true);
                } else {
                    if(document.getElementById('days')) {
                        document.getElementById('days').innerText = Math.floor(distance / (day)),
                        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
                        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
                        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
                    }
                }
            }, second);
            timer && clearInterval(x)
    }, [is_live]);
    return (<>
        <div className="rmtp">
            <div className="rmwrp rmtpin">
                <div className="rmptitle">
                    <div className="rmtplg">
                        <section><span className="frst">श्री</span>राम मन्दिर <span className="lst">अयोध्या</span> <img src="/images/rammandir/diya.png" alt="" /></section>
                        
                        {/* <img src="/images/rammandir/rammandirayodhya-logo.png" alt="" /> */}
                    </div>
                </div>
                {!isMobile && <div class="banner1"> <LazyLoadImage src={"https://images.news18.com/ibnkhabar/uploads/2024/01/COVERAGE-BANNER-GIF-2024-01-7cab1e9b31cdd29590b6114a948622f1.gif"} width={400} height={60}/></div>}
                <a href={first.weburl} className="rmtphd">
                    <figure>
                        <LazyLoadImage alt={first.display_headline} src={first?.images?.url} width={isMobile ? 366 :224} height={isMobile ? 244 : 132}/>
                        {/* <img src="https://images.news18.com/ibnkhabar/uploads/2023/12/ram-mandir-2023-12-4770cdd615bec5388455c450b176e9ae.jpg" alt="" /> */}
                    </figure>
                    <h1>{first.display_headline} <span>LIVE</span></h1>
                </a>
                <div className="rmtplvtv">
                {isMobile && <div style={{ textAlign: "center"}}>
                        <LazyLoadImage src={"https://images.news18.com/ibnkhabar/uploads/2024/01/COVERAGE-BANNER-GIF-2024-01-7cab1e9b31cdd29590b6114a948622f1.gif"} width={335} height={60}/>
                    </div>}
                    <div className="rmtplvtvbx">
                    {is_live != 1 ? <>
                        <FakeYTPlayer width={isMobile ? 360 : 380} height={220} src={livetv} headline={"Ram Mandir"} />
                    </> : <div
                        id="vidgyor_parent"
                        style={{
                        height: "220px",
                        width: "100%",
                        }}
                    >
                        <img
                        id="tvposterhome"
                        src="https://images.news18.com/ibnkhabar/uploads/2019/09/livetv.jpg?impolicy=website&width=407&height=229"
                        alt="News18 India Livetv"
                        title="News18 India Livetv"
                        />
                        <div
                        style={{ height: "100%", width: "100%" }}
                        id="vidgyor_container"
                        >
                        <div id="closeButtonContainer"></div>
                        </div>
                    </div>}
                    </div>
                    {isMobile ? <div style={{ minHeight: "65px",padding: "10px"}}>
                        <NewSiteAd 
                            slotId="BAND_TOP"
                            adUnit={"NW18_HIND_PWA/NW18_HIND_EVENT_PWA/NW18_HIND_EVENT_PWA_AL/NW18_HIND_EVNT_AL_PWA_ROS_BAND_BTM_340x60"}
                            sizes={[[340, 60]]}
                            style={{ textAlign: "center" }}
                            loadOnScroll={false}
                        />
                    </div> : <div style={{ minHeight: "65px"}}>
                        <NewSiteAd 
                            slotId="BAND_TOP"
                            adUnit={"NW18_HIND_Desktop/NW18_HIND_EVENT/NW18_HIND_EVENT_AL/NW18_HIND_EVNT_AL_ROS_BAND_BTM_380x65"}
                            sizes={[[380, 65]]}
                            style={{ textAlign: "center" }}
                            loadOnScroll={false}
                        />
                    </div>}
                </div>
            </div>
        </div>
        
        <div className="rmwrp rmtpin">
            <div className="rmtpnws">
                <div className="rmtpnwsl">
                    <div className="rmtpnwswrp">
                    {isMobile && <div style={{ minHeight: "300px"}}>
                        <NewSiteAd 
                            slotId="ATF_300"
                            adUnit={props.pageAds?.ATF_300}
                            sizes={[
                                [320, 250],
                                [300, 250],
                                [336, 280],]}
                            style={{ textAlign: "center" }}
                            loadOnScroll={true}
                        /></div>}
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
                {isMobile && <div className="moreseebtn"><a href={"/tag/ram-mandir/"}>और लोड करें</a></div>}

                <div className="rmtpnwsr">
                    {!isMobile && <div className="rmtpnwsrad">
                        <NewSiteAd 
                            slotId="ATF_300_id_1"
                            adUnit={props.pageAds?.ATF_300_id}
                            sizes={[
                                [320, 250],
                                [300, 250],
                                [336, 280],]}
                            style={{ textAlign: "center" }}
                            loadOnScroll={true}
                        />
                    </div>}
                        {!timer ?
                    <div className="timer">
                            <p>घड़ियां बाकी</p>
                            <ul className="rmcntdn">
                                <li><span id="days"></span>days</li>
                                <li className="dflt">:</li>
                                <li><span id="hours"></span>Hours</li>
                                <li className="dflt">:</li>
                                <li><span id="minutes"></span>Minutes</li>
                                <li className="dflt">:</li>
                                <li><span id="seconds"></span>Seconds</li>
                            </ul>
                            </div>
                         : <div style={{margin:"auto", backgroundColor: "#fff"}} className="timer">
                            <a href="/short-news/ayodhya/" title="ram mandir shorts"><LazyLoadImage width={isMobile ? 340 : 325} height={105} src="https://images.news18.com/ibnkhabar/uploads/2024/01/Ayodhya-gif-banner-2024-01-60e3e2659964d313bee694dd265f4f0a.gif" />
                            </a></div>
                        }
                </div>
            </div>        
            <div className="vwmdl">
                <div className="vwmdlbx"><a href={"/tag/ram-mandir/"} className="rmvwscls">+</a><img src="/images/rammandir/viewimg.png" alt="" /></div>	
            </div>
            {!isMobile && <div className="moreseebtn"><a href={"/tag/ram-mandir/"}>और लोड करें</a></div>}
        </div>
        <style jsx global>

            {`
                .rmgblhd{text-align: center;color: #000000;font-size: 30px;line-height: 22px; margin-bottom: 30px;}	
                .rmgblhd:before, .rmgblhd:after{content: ""; display: block; margin: auto;}
                .rmgblhd:before{background: url(/images/rammandir/flag.png) 0 0 no-repeat; width: 36px; height: 38px; margin-bottom: 15px;}
                .rmgblhd:after{background: url(/images/rammandir/hdbtmarw.svg) 0 0 no-repeat; width: 398px; height: 10px; margin-top: 10px;}
            
                .rmwrp{margin: auto;position: relative;max-width: 1244px; }	
                .rmtp{width: 100%; overflow: hidden; background: #f07920 url(/images/rammandir/rammandirbg.png) bottom left no-repeat; position: relative; margin-bottom: 45px;}
                .rmtp:before{content: "";position: absolute;top: 0;right: 0;bottom: 0;left: 0;background: linear-gradient(45deg, rgba(105,21,5,1), rgba(105,21,5,.5),#f07920, #f07920);}
                .rmtp .rmwrp{z-index: 1;}
                .rmtplg { width: 100%; text-align: right; display: flex; justify-content: space-between; flex-direction: row; position: relative;}
                .rmtplg section {color: #fff;padding: 25px 0 19px; position: relative; margin-right: 150px;   text-shadow: 4px 3px 13px rgb(25 25 25 / 80%) ; font-family: "Noto Sans";
                font-weight: bold;
                font-size: 70px;
                line-height: 85px;}
                .rmtplg section .frst {font-size: 30px; position: absolute; left: -37px; top: 3px;color: #f8ff97;}
                .rmtplg section .lst { font-size: 30px; position: absolute;right: -92px; bottom: -10px; color: #f8ff97;}
                .rmtplg img {bottom: 0px; width: 45px; height: 45px; position: absolute; right: -142px;}
                .rmtpin{display: flex; justify-content: space-between; flex-wrap: wrap; align-items: end;padding-bottom: 15px;}
                .rmtphd{display: flex; width: 720px; flex-shrink: 0; }
                .rmtphd figure{width: 232px; height: 132px;border: 4px solid #fff; margin-right: 20px;}
                .rmtphd figure img{width: 100%; height: 132px;}
                .rmtphd h1, .rmtphd span{font-size: 40px;line-height: 50px;color: #fff;text-shadow: 0px 2px 3px #000;position: relative;top: -10px;}
                .rmtphd h1 span, .rmtphd span span{font-size: 18px;background: #ED1C24;height: 24px;display: inline-block;line-height: 26px;padding: 0 10px;text-shadow: none;position: relative;top: -8px;margin-left: 5px;}
                .rmtphd h1 span:before, .rmtphd span span:before{content: "";width: 10px;height: 10px;display: inline-block;background: #fff;border-radius: 100%;margin-right: 5px; animation: rmlvdt .5s infinite;}
                @keyframes rmlvdt{from{background: #ED1C24; opacity: 0;}to{background: #fff; opacity: 1;}}
                .rmtplvtv{background: #B91208; width: 400px; padding: 10px;}
                .rmtplvtvbx{width: 380px; overflow: hidden; line-height: 0; flex-shrink: 0; }
                .rmtplvtvbx img{width: 100%; height: 270px;}
                .timer {background-color: #b91208; width: 100%;     margin: 20px 0;}
                .rmcntdn{display: flex;justify-content: center;gap: 12px;align-items: center; }
                .rmcntdn li{flex-shrink: 0;color: #fff;text-align: center;font-size: 12px;text-transform: uppercase;font-weight: bold;margin: 0 0 15px;}
                .rmcntdn li span{display: block;font-size: 40px;line-height: 34px; margin-bottom: 7px;}
                .rmcntdn li.dflt{font-size: 30px;}
                .rmtpnwsrad{min-height: 240px;}
                .banner1 {
                    width: 400px;
                    height: 60px;
                    background-color: #ddd;
                    margin-bottom: 10px;
                }
                .rmptitle{margin-left: 30px;}
                
                @media (max-width: 769px){
                .rmtpin{display: block; padding-bottom: 0;}
                .rmtplg{padding: 0 10px; justify-content: space-evenly;}
                .rmtphd {display: block;width: 100%; padding: 0 10px;}	
                .rmtphd figure {width: 100%;height: auto;border: 2px solid #fff;margin-right: 0;}
                .rmtphd figure img {height: auto;}
                .rmtphd h1, .rmtphd span {font-size: 20px;line-height: 30px;text-shadow: none;top: 0;margin-top: 10px;}
                .rmtphd h1 span, .rmtphd span span {font-size: 12px;height: 18px;display: table;text-shadow: none;top: 0;margin: 5px 0 10px 0;}
                .rmtplvtv{width: 100%;}
                .rmtplvtvbx, .rmtplvtvbx img{width: 100%;height: 220px;}
                .rmcntdn {gap: 15px;}
                .rmcntdn li span {font-size: 35px;line-height: 30px;}
                .rmtplg section{font-size: 45px; margin-right: 75px;}
                .rmtplg section .frst{font-size: 25px; left: -31px;}
                .rmtplg section .lst{font-size: 25px; right: -77px; bottom: -5px;}
                .rmtplg img {right: -121px; bottom: 0;}
                .rmptitle{margin-left: 0;}
                }

        .rmtpnws{display: flex; justify-content: space-between;}
.rmtpnwsl{width: calc(100% - 350px);}
.rmtpnwswrp{display: flex; justify-content: space-between; width: 100%;}
.rmtpnwsitml{width: 410px; flex-shrink: 0; margin-right: 20px;}
.rmtpnwsitml .rmstrythmb span, .rmtpnwsitml .rmstrythmb span{font-weight: bold; font-size: 16px;}
.rmtpnwsitml .rmstrythmb span img, .rmtpnwsitml .rmstrythmb span img{    position: relative;
    top: 4px;
    margin-right: 5px;}
.rmtpnwsitmr{width: 100%;}
.rmtpnwsitmr li{padding: 12px 0; border-top: 1px solid #ccc}
.rmtpnwsitmr li:first-child{padding-top: 0; border: none;}
.rmstryuponhd{position: relative;border-radius: 8px;overflow: hidden;display: block; margin-bottom: 20px;}
.rmstryuponhd img{width: 100%;}
.rmstryuponhd span{position: absolute;bottom: 0;background: linear-gradient(transparent, #000);padding: 10px 20px;color: #fff;font-size: 26px;line-height: 38px;}
.rmstrythmb{position: relative;border-radius: 8px;overflow: hidden;display: flex; justify-content: space-between;}
.rmstrythmb figure{width: 105px; height: 70px; border-radius: 8px;overflow: hidden;display: block; margin-right: 15px; flex-shrink: 0;}
.rmstrythmb figure img{width: 100%;}
.rmstrythmb span, .rmstrythmb span{width: 100%;color: #555;font-size: 15px;line-height: 24px;font-weight: normal;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;}
.rmstrythmb span img, .rmstrythmb span img{position: relative; top: 4px;margin-right: 5px;}
.rmtpnwsr {width: 325px; flex-shrink: 0;     border-radius: 15px; height: 380px;}
// .rmtpnwsr:before{content: "";position: absolute;top: 0;right: 0;bottom: 0;left: 0;background: rgba(108,0,0,.9);}	
.rmtpnwsr figure{ height: 250px;text-align: center;width: 300px;margin: 30px auto;}
.rmtpnwsr figure img{max-width: 100%;}
.rmvws{display: flex;width: 100%;justify-content: space-between;padding: 0 20px;position: relative;color: #fff;text-decoration: underline;font-size: 25px;line-height: 20px;align-items: center;}
.rmvws svg{}
.vwmdl{position: fixed;top: 0;right: 0;bottom: 0;left: 0;display: flex;justify-content: center;align-items: center;z-index: 99;background: rgba(225,225,225,.9);overflow: hidden; visibility: hidden;}
.vwmdl.adcls{visibility: visible;}
.vwmdlbx{width: 700px;height: 500px;background: url(/images/rammandir/view.png) 0 0 no-repeat;background-size: cover;position: relative;display: flex;justify-content: center;align-items: center;}
.vwmdlbx:before{content: "";position: absolute;top: 0;right: 0;bottom: 0;left: 0;background: rgba(108,0,0,.9);}
.vwmdlbx img{min-width: 520px;max-width: 100%;position: relative;}
.rmvwscls{position: absolute;top: -15px;right: 8px;color: #fff;font-size: 40px;font-weight: bold;transform: rotate(45deg);}
body.adcls{overflow: hidden;}
.moreseebtn{position: relative;margin: 30px 0;text-align: center; width: 100%;}
.moreseebtn.notopspc{margin: -18px 0 30px 0;}
.moreseebtn:before{content: ""; height: 1px; background: #ccc; position: absolute; left: 0; right: 0; top: 50%; }
.moreseebtn a{height: 35px;line-height: 35px;color: #fff;background: transparent linear-gradient(180deg, #F37A1F 0%, #BC5405 100%) 0% 0% no-repeat padding-box;
border-radius: 40px;font-size: 15px;padding: 0 30px;display: table;margin: auto;position: relative;}
@media (max-width: 769px){
 .rmtpnwsr { height: auto; }   
.rmtpnws{display: block; padding: 0 10px}	
.rmtpnwsl, .rmtpnwsr{width: 100%;}
.rmtpnwswrp{display: block;}
.rmtpnwsitml {width: 100%;margin-right: 0; margin-bottom: 12px; border-bottom: 1px solid #ccc; padding-bottom: 12px;}
    .rmgblhd:after {
        width: 100% !important;
        background-size: 320px;
    }
    }
    .timer p {
        text-align: center;
        color: #fff;
        padding: 4px 0;
    }
  
`}
        </style>
    </>)
};

export default TopPriorityData;