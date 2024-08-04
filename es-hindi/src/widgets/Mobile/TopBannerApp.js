import { logEventNew } from "includes/googleAnalytic";
import React, { useEffect, useState } from "react";

const TopBannerApp = (props) => {

    const [closed, setClosed] = useState(false);

    const handleLogs = () => {
        logEventNew('APPdownload_Mweb', 'Click', `Mobile Header`);
        window.location.href = "https://www.news18.com/app-download-hindi/";
    };

    useEffect(() => {
        setTimeout(() => {
            logEventNew('APPdownload_Mweb', 'Impression', `Mobile Header`);
        }, 1000);
    }, [props]);
    if(closed) {
        return null;
    }
    return (<>
        <div className="opnap" onClick={handleLogs}>
            <span className="clsap" onClick={() => setClosed(true)}></span>
                <span onClick={() => handleLogs()} className="opnaptxt">
                <img src="https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/openappicon_1676275003.png" alt=""/>
                <p>News18 हिंदी: ताजा और ब्रेकिंग न्यूज<span>प्ले स्टोर से ऐप डाउनलोड करें</span></p>
                <div className="instap">इंस्टॉल करें</div>
            </span>
        </div>
        <style jsx>{`
                .opnap{background: #001D42;height: 50px;display: flex;justify-content: space-between;width: 100%;align-items: center;box-sizing: border-box;font-family: "Mukta",sans-serif;padding: 0 15px;}
                .clsap{width:14px; height:14px; background:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/appcloseicon_1676367940.png) 0 0 no-repeat; flex-shrink: 0;}
                .instap{width: 72px;height: 28px;line-height: 28px;color: #011536;text-align: center;font-size: 14px;font-weight: bold;flex-shrink: 0;background: #fff;border: 1px solid #707070;border-radius: 30px; position: absolute;right: 0;}
                .opnaptxt{width:100%;display: flex;padding-left: 20px; box-sizing: border-box; position:relative; align-items: center;}
                .opnaptxt img{flex-shrink: 0;margin-right: 10px;width: 36px;height: 36px;}
                .opnaptxt p{color: #FFFFFF;font-size: 12px;line-height: 20px;font-weight: bold;}
                .opnaptxt p span{display: block; font-weight:normal}
        `}</style>
      </>
    );
};

export default TopBannerApp;
