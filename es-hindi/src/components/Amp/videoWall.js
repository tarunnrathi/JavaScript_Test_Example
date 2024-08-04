import React from "react";
// import Head from "next/head";
// import site_config from "config/site.config";

const videoWall =(props) => {
    return(
        <>
            {props?.display_type==="portrait" && (
                <div className="mnwvdswrap">
                <div className="globalhd large"><h2><a href="/short-videos">वीडियो</a></h2></div>
                    <div className="mnwvdsslide">
                        <div className="mnwvdsslide-in">
                        <ul>
                        {props?.videowallPortraitData &&
                                    props?.videowallPortraitData?.map((item, index) => {
                                        return(
                                            <li key={"portrait"+index}>
                                                <a href={item?.url||'#'} key={"portrait"+index}>
                                                    <figure style={{ width: '100%', height: '600px' }}>
                                                        <amp-img
                                                        src={item?.thumbnail||''}
                                                        width={320}
                                                        height={600}
                                                        layout="responsive"
                                                        >
                                                        </amp-img>
                                                    </figure>
                                                    <h3>{item?.title}</h3>
                                                </a>
                                            </li>
                                        );
                                })}
                        </ul>
                        </div>
                    </div>
                    <a href="/short-videos" className="maurbhi-button">सम्बंधित खबर<span></span></a>
                </div>
            )}
            {props?.display_type==="landscape" && (
                <div className="mnwvdswrap">
                <div className="globalhd large"><h2><a href="/videos/originals/">वीडियो</a></h2></div>
                    <div className="mnwvdsslide">
                        <div className="mnwvdsslide-in" id="portraitSlider">
                                <ul>
                                {props?.videowallLandscapeData &&
                                        props?.videowallLandscapeData?.map((item, index) => {
                                        return(
                                            <li key={"landscape"+index}>
                                                <a href={item?.url||'#'} key={"landscape"+index}>
                                                    <figure style={{ width: '100%', height: '250px' }}>
                                                        <amp-img
                                                            src={item?.thumbnail||''}
                                                            alt={item?.content_type}
                                                            width={320}
                                                            height={250}
                                                            layout="responsive"
                                                        ></amp-img>
                                                    </figure>
                                                    <h3>{item?.title}</h3>
                                                </a>
                                            </li>
                                        );
                                    })
                                    }
                                </ul>
                        </div>
                    </div>
                    <a href="/videos/originals/" className="maurbhi-button">सम्बंधित खबर<span></span></a>
                </div>
            )}
            <style jsx global>{`
                body{margin:auto; font-family:'Noto Sans Kannada UI',sans-serif;}*{margin:0; padding:0}li{list-style:none}a{text-decoration:none}a img{border:none}*{box-sizing:border-box}.clearfix {clear: both;}
                @font-face{font-family:'Noto Sans Kannada UI';font-style:normal;font-weight:400;src:url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/NotoSansKannadaUI_Regular_1663242087.woff2) format('woff2');}
                .globalhd {
                    border-bottom: 1px solid #001536;
                    padding-bottom: 4px;
                    position: relative;
                }
                .globalhd.large h2 {
                    font-size: 18px;
                    line-height: 28px;
                }
                .globalhd h2 a {
                    color: #001536;
                }
                .globalhd::after {
                    content: "";
                    width: 25px;
                    height: 4px;
                    position: absolute;
                    bottom: -2px;
                    left: 0px;
                    background: rgb(237, 28, 36);
                }
                .mnwvdswrap{background: #1F1F1F; padding:15px 0;}
                .mnwvdsslide{position: relative; }
                .mnwvdsslide-in{overflow: hidden; margin: 0 10px;}
                .mnwvdsslide-in ul{display: flex; margin-bottom: 30px; justify-content: space-between; overflow:scroll;}
                .mnwvdsslide-in ul li{background: #000;box-shadow: 0px 3px 6px #00000029;border: 1px solid #D0D0D0;border-radius: 5px; overflow: hidden;  flex-shrink: 0; width:320px; margin-right:10px;}                
                .mnwvdsslide-in ul li a figure{position: relative;overflow: hidden; width:100%;}               
                .mnwvdsslide-in ul li a figure:before{content: "";width: 45px; height: 45px; position: absolute;top: 50%; left: 50%; z-index: 1; margin: -22px 0 0 -22px;cursor: pointer;background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;}                
                .mnwvdsslide-in ul li a h3{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0;}
                .mnwvdswrap .globalhd {border-bottom: 1px solid #D0D0D0; margin:0 20px 20px 20px;}
                .mnwvdswrap .globalhd h2, .mnwvdswrap .globalhd h2 a {color: #fff;}
                .maurbhi-button {background: #000;font-size: 14px;font-weight: 700;position: relative;border-radius: 20px;text-align: right;border: 1px solid #ED1C24;display: table;margin: auto;color: #E82D2E;height: 30px;line-height: 30px;padding: 0 20px;top: 10px;}            
            `}</style>
        </>
    );

};
export default videoWall;
