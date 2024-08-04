import React, { useEffect, useState } from 'react';
import LazyLoadImage from './CustomImage';
import { getRedisDataByKey } from 'api/global/Common';
import { logEvent } from 'includes/googleAnalytic';
import VideoImage from './VideoImage';
import { newVidgyorScript } from 'includes/article.util';
import FakeYTPlayer from './FakeYTPlayer';

var interval = "";

const FlashWidget = ({ utm = "", isMobile, currentUrl }) => {
    const [currentStory, setCurrentStory] = useState({});
    const [heading, setHeading] = useState("");
    const [close, setClose] = useState(false);
    const [timer, setTimer] = useState(isMobile ? 14 : 0);
    const [videoDetail, setVideoDetail] = useState(false);

    const handleClick = async (itm) => {
        const readStoryList = JSON.parse(sessionStorage.getItem("lastReadStoryId") || "[]");
        readStoryList.push(itm.url);
        sessionStorage.setItem("lastReadStoryId", JSON.stringify(readStoryList));
        // logEvent("newsflash", isMobile? "mobile" : "desktop", itm.url + "?" + utm);

        if(itm.target === 1) {
           await callApi();
        }// push(itm.url + "?" + utm);
        const a = document.createElement('a');

        a.href = itm.url + "?" + utm;
        a.target = itm.target === 1 ? "_blank" : "";
        document.body.appendChild(a);
        a.click();
    };

    const handleClose = () => {
        const readStoryList = JSON.parse(sessionStorage.getItem("lastReadStoryId") || "[]");
        readStoryList.push(currentStory.url);
        sessionStorage.setItem("lastReadStoryId", JSON.stringify(readStoryList));
        logEvent("newsflash", isMobile? "mobile" : "desktop", currentStory.url + "?" + utm);
        setClose(true);
        setVideoDetail({});
    };

    const handleVideoClose = () => {
        logEvent("newsflash", isMobile? "mobile" : "desktop", videoDetail?.video_url+ "?"+utm );
        setClose(true);
        sessionStorage.setItem("videoClosed", "1");

        setVideoDetail({});
    }

    const callApi = async () => {
        const flashData = await getRedisDataByKey("Newsflash", false, true);
        const { heading: headng = "", news = [], status = 1, video_detail: { video_status = 0, video_id = "", video_title = "", video_url = "" } = {} } = flashData;
        if (status === 0 || sessionStorage.getItem("videoClosed") == "1") {
            setClose(true);
        } else if(video_status === 1 && sessionStorage.getItem("videoClosed") != "1") {
            setVideoDetail({
                video_id,
                video_url,
                video_title
            })
            setHeading(headng);
            setCurrentStory({ url: video_title})
        } else {
            setVideoDetail({});
            setHeading(headng);
            const readStoryList = JSON.parse(sessionStorage.getItem("lastReadStoryId") || "[]");
            const filteredData = news.filter((element) => readStoryList.indexOf(element.url) === -1);
            setCurrentStory(filteredData[0]);
        }
    };
    useEffect(() => {
        // api call and save data
        (() => {
            setTimeout(async () => {
                await callApi();
            }, 5000);
        })();
    }, []);
    useEffect(() => {

        if(videoDetail.video_id) {
            newVidgyorScript();
        } 
    }, [videoDetail])
    
    useEffect(() => {
    
        if(videoDetail.video_id && isMobile) {
            timer === 0 && clearInterval(interval)
            if(timer === 14) {
                interval = setInterval(() => {
                    setTimer(timer => (timer-1))
                }, 1000)
            }
        } 
        }, [timer, videoDetail])
    if (!currentStory?.url || close) {
        return <div id="flash_hide"></div>;
    }
    return (<>
        <div className={`flwgd ${videoDetail.video_id ? "wd" : ""}`}>
            {videoDetail.video_id ? <> {timer !== 0 ? <span className="timbtn">{timer}</span> : <span className="clbtn" onClick={handleVideoClose} ></span>}</> : <span className="closebtn" onClick={handleClose}></span> }
            {videoDetail?.video_id ? <> 
                <FakeYTPlayer playerId={"vidgyorPlayer99"} event={"Newsflash_Article"} controls={isMobile} className='' marginBottom={0} width={ isMobile? 179 : 298} height= { isMobile? 100 : 168} src={videoDetail.video_id} headline={videoDetail.video_title} />
                {videoDetail.video_url ? <a  className="wdcap" href={videoDetail.video_url + "?" + utm} title={videoDetail.video_title}><span>{heading}</span>{videoDetail.video_title}</a> : <h2>{videoDetail.video_title}</h2>}
            </> :
                
            <><h1><marquee>{heading}</marquee></h1>
            <div className="descr" onClick={() => handleClick(currentStory)}>
                <span>{currentStory.title}</span>
                <div>
                    <LazyLoadImage
                        src={currentStory?.img_url}
                        width={90}
                        height={80}
                        alt={currentStory?.title}
                        title={currentStory?.title}
                    />
                </div>
            </div>
            <h2 onClick={() => handleClick(currentStory)} className="cta1">और पढ़ें</h2>
            </>}
        </div>

        <style jsx global>{`
        iframe {
            overflow-y: hidden;
            min-width: 0px !important;
        }
        .flwgd {
            width: 316px;
            border: 1px solid #DBDBDB;
            border-radius: 6px 6px 6px 6px;
            padding: 8px;
            position: fixed;
            right: ${isMobile ? "1px" : "3.5%"};
            top: 40%;
            background-color: #fff;
            z-index: 1111;
            animation: slideInFromRight 1s ease 0s 1 normal forwards;
        }
        @keyframes slideInFromRight {
            0% {transform: scale(0); transform-origin: 100% 50%;}    
            100% {transform: scale(1); transform-origin: 100% 50%;}
        }
        .flwgd h1 {
            background-color: #D93A34;
            color: #fff;
            font-size: 14px;
            line-height: 16px;
            font-weight: bold;
            padding: 5px 10px;
        }
    .descr {
        display: flex;
        align-items: center;
        margin-top: 5px;
        cursor: pointer;
    }
    .descr span {
        width: calc(100% - 90px);
        padding-right: 10px;
        white-space: break-spaces;
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
    }
    .flwgd .clbtn {
        width: 20px;
        height: 20px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #B4B4B4;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: -2px;
        right: -2px;
        cursor: pointer;
    }
    .timbtn {
        width: 25px;
        height: 25px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #F50101;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: -7px;
        right: -6px;
        cursor: pointer;
        padding: 1px 4px;
        font-size: 12px;
        line-height: 20px;
        color: #F50101;
        text-align: center;
    }
    .clbtn:after, .clbtn:before {
        content: "";
        width: 2px;
        height: 12px;
        left: 50%;
        background: #000;
        display: block;
        position: absolute;
        margin-left: -1px;
        transform: rotate(135deg);
        top: 3px;
        border-radius: 4px;
    }
    .clbtn:before {
        transform: rotate(45deg);
    }
    .flwgd .closebtn {
        width: 20px;
        height: 20px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #B4B4B4;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: -2px;
        right: -2px;
        cursor: pointer;
    }
    .closebtn:after, .closebtn:before {
        content: "";
        width: 2px;
        height: 12px;
        left: 50%;
        background: #000;
        display: block;
        position: absolute;
        margin-left: -1px;
        transform: rotate(135deg);
        top: 3px;
        border-radius: 4px;
    }
    .closebtn:before {
        transform: rotate(45deg);
    }
    .flwgd .cta1 {
        width: 74px;
        background-color: #EDEDED;
        border: 1px solid #D1D1D1;
        border-radius: 12px;
        font-size: 12px;
        line-height: 22px;
        color: #D93A34;
        text-align: center;
    }
    .flwgd h1 marquee {
        margin: auto;
        display: block;
    }
    .wd{
        width: 300px;
        border: 1px solid #DBDBDB;
        border-radius: 0;
        padding: 0;
        position: fixed;
        right: ${isMobile ? "1px" : "3.5%"};
        top: 40%;
        background-color: #fff;
        z-index: 1111;
        animation: slideInFromRight 1s ease 0s 1 normal forwards;
        box-shadow: 0px 13px 16px #7171716F;
    }
    .wd .clbtn {
        top: -7px;
        right: -6px;
        width: 25px;
        height: 25px;
        background-color: #F50101;
        border: 1px solid #fff;
    }
    .wd .clbtn:before, .wd .clbtn:after {
        background-color: #fff;
        height: 13px;
        left: 52%;
        top: 5px;
    }
    .localvideopl .closevdsnew{display:none;}
    .wdcap {
        font-size: 12px;
        line-height: 20px;
        color: #000;
        padding: 5px 10px;
        display: block;
        font-weight: bold;
    }
    .wdcap span {
        width: 100%;
        display: block;
        color: #F50101;
    }
    .wdcap:hover {
        color: #000;
    }
    @media (max-width:768px){
        .flwgd{
            bottom: 145px;
            top: unset;
            left: 0;
            margin: auto;
            width: auto;
            animation: slideInFromBottm 1s ease 0s 1 normal forwards;
        }
        @keyframes slideInFromBottm {
            0% { transform: scale(0); transform-origin: 50% 100%;}        
            100% { transform: scale(1); transform-origin: 50% 100%;}
        }
        .wd{
            display: flex;
            box-shadow: 0px 3px 6px #00000029;
            top: 0;
            bottom: unset;
            right: 0;
            padding: 15px;
            border: 0;
            z-index: 99999;
        }
        // .localvideopl.diss1 {
        //     width: 100px;
        //     height: 56px;
        //     margin-right: 10px;
        // }
        .wdcap {
            width: calc(100% - 90px);
            margin-left:10px;
            padding: 0 24px 0 0;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .wdcap span{ margin-bottom: 0px;
            height: 21px;
            margin-top: 0px;
            overflow: hidden;
            font-size: 14px;
        }
        .wd .clbtn, .wd .timbtn {
            position: absolute;
            top: 6px;
            right: 10px;
            box-shadow: none;
        }
    }
`}</style>
    </>
    );
};

export default FlashWidget;
