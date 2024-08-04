import LazyLoadImage from "components/Common/CustomImage";
import React from "react";

const RamMandirWebstories = ( { webStoriesList }) => {
    return(<>
    <div className="rmwrp">
            <h2 className="rmgblhd">राम मंदिर की वेबस्टोरी</h2>
            <ul className="rmwbstry">
            {webStoriesList.map((itm,index) => (<li key={`${index}webstory`}>
                <a href={itm.web_url}>
                    <figure>
                    <LazyLoadImage alt={itm.blog_title} src={itm?.feature_img} width={200} height={248} /></figure>
                    <section>{itm.blog_title}</section>
                </a>
            </li>))}	
            </ul>
            <div className="moreseebtn"><a href={"/web-stories/uttar-pradesh/"}>और वेबस्टोरी देखें</a></div>
            </div>
            <style jsx>{`
                
                .rmwbstry{display: flex; justify-content: space-between;}
                .rmwbstry li{width: 15%; background: #FFFFFF ;box-shadow: 0px 3px 6px #00000029;border-radius: 6px; overflow: hidden; }
                .rmwbstry li a figure{width: 100%; position: relative; }
                .rmwbstry li a figure:before{content: "";background: rgba(0,0,0,.5);position: absolute;top: 8px;right: 8px;z-index: 1;width: 36px;height: 36px;border-radius: 100%;}
                .rmwbstry li a figure:after{content: "";width: 20px;height: 17px;background: url(/images/rammandir//webstoryicon.png) 0 0 no-repeat;top: 17px;right: 15px;position: absolute;z-index: 1;filter: brightness(0) invert(1);}
                .rmwbstry li a figure img{width: 100%; border-radius: 0;}
                .rmwbstry li a section{font-size: 14px;line-height: 20px;color: #000;font-weight: bold;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;margin: 10px; text-align: center;}
                @media (max-width: 769px){
                .rmwbstry {overflow: scroll;padding-left: 10px;}	
                .rmwbstry li {width: 172px;flex-shrink: 0; margin-right: 20px;}
                .rmgblhd:after { width: 320px !important; background-size: 320px;}
                }
                .moreseebtn{position: relative;margin: 30px 0;text-align: center;}
                .moreseebtn.notopspc{margin: -18px 0 30px 0;}
                .moreseebtn:before{content: ""; height: 1px; background: #ccc; position: absolute; left: 0; right: 0; top: 50%; }
                .moreseebtn a{height: 35px;line-height: 35px;color: #fff;background: transparent linear-gradient(180deg, #F37A1F 0%, #BC5405 100%) 0% 0% no-repeat padding-box;
                border-radius: 40px;font-size: 15px;padding: 0 30px;display: table;margin: auto;position: relative;}
            `}</style>
    </>)
};

export default RamMandirWebstories;