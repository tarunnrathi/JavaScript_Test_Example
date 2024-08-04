import LazyLoadImage from "components/Common/CustomImage";
import React from "react";

const RamMandirVideos = ( { videoStories }) => {
    return(<>
    <div className="rmwrp">
            <h2 className="rmgblhd">राम मंदिर के वीडियो</h2>
            <ul className="rmvds">
            {videoStories.map((itm,index) => (<li key={`${index}video`}>
                <a href={itm.weburl}>
                    <figure>
                    <LazyLoadImage alt={itm.display_headline} src={itm?.images?.url} width={231} height={154} /></figure>
                    <section>{itm.display_headline}</section>
                </a>
            </li>))}	
            </ul>
            <div className="moreseebtn"><a href={"/tag/ram-mandir/videos/"}>और वीडियो देखें</a></div>
            </div>
            <style jsx>{`
            
                .rmvds{display: flex;    justify-content: space-between;}
                .rmvds li{width: 20%;padding: 0 15px;border-left: 1px solid #ccc;}
                .rmvds li:first-child{ padding: 0 15px 0 0;border-left: none;}
                .rmvds li a figure{width: 100%;border: 1px solid #707070;border-radius: 5px;position: relative; }
                .rmvds li a figure:before{content: "";background: url(/images/rammandir/videoicon.png) 0 0 no-repeat;position: absolute;bottom: 10px;right: 10px;z-index: 1;width: 24px;height: 24px;filter: brightness(0) invert(1);}
                .rmvds li a figure img{width: 100%;}
                .rmvds li a section{font-size: 16px;line-height: 24px;color: #000;font-weight: normal;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;overflow: hidden;margin-top: 10px;}
                .moreseebtn{position: relative;margin: 30px 0;text-align: center;}
                .moreseebtn.notopspc{margin: -18px 0 30px 0;}
                .moreseebtn:before{content: ""; height: 1px; background: #ccc; position: absolute; left: 0; right: 0; top: 50%; }
                .moreseebtn a{height: 35px;line-height: 35px;color: #fff;background: transparent linear-gradient(180deg, #F37A1F 0%, #BC5405 100%) 0% 0% no-repeat padding-box;
                border-radius: 40px;font-size: 15px;padding: 0 30px;display: table;margin: auto;position: relative;}

                @media (max-width: 769px){
                .rmvds {overflow: scroll;padding-left: 10px;}	
                .rmgblhd:after { width: 320px !important; background-size: 320px;}
                .rmvds li {width: 230px;flex-shrink: 0;}
                }
            `}</style>
    </>)
};

export default RamMandirVideos;