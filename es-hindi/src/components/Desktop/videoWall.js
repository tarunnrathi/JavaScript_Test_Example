import React, { useEffect } from "react";
import Head from "next/head";
import site_config from "config/site.config";

const videoWall =(props) => {
    props?.videowallPortraitData?.length > 1 && useEffect(() => {
        new Glide(document.querySelector('#portraitSlider'), {
            autoplay: false,
            type: 'carousel',
            perView: 4,
            gap: 15,
            slidesToScroll: 1,
            })?.mount();
    }, []);
    props?.videowallLandscapeData?.length > 1 && useEffect(() => {
        new Glide(document.querySelector('#landscapeSlider'), {
            autoplay: false,
            type: 'carousel',
            perView: 3,
            gap: 15,
            slidesToScroll: 1,
            })?.mount();
    }, []);
    return(
        <>
            <Head>
                <script src="https://images.hindi.news18.com/ibnkhabar/uploads/assests/js/glide.min.js"></script>
            </Head>
            {props?.display_type==="portrait" && (
                <div className="nwvdswrap" style={{ height: '585px', width: '100%' }}>
                <div className="globalhd large"><h2><a href="/short-videos">वीडियो</a></h2></div>
                <div className="nwvdsslide" style={{ height: '479px' }}>
                <div className="nwvdsslide-in" id="portraitSlider">
                <div data-glide-el="track">
                <ul>
                    {props?.videowallPortraitData &&
                    props?.videowallPortraitData?.map((item, index) => {
                        return(
                            <li key={'videowall'+index}>
                                <a href={item?.url||'#'}>
                                    <figure>
                                        <img
                                            src={item?.thumbnail||site_config.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}
                                            alt={item?.title}
                                        />
                                    </figure>
                                    <h3>{item?.title}</h3>
                                </a>
                            </li>
                        );
                    })
                    }
                </ul>
                </div>
                <div className="nwvdsar" data-glide-el="controls">
                <button data-glide-dir="<"></button>
                <button data-glide-dir=">"></button>
                </div>

                <div data-glide-el="controls[nav]" className="nwvdsblt">
                    {props?.videowallPortraitData &&
                        props?.videowallPortraitData?.map((item, index) => {
                            return(
                                <button type="button" key={"portrait"+index} data-glide-dir={`=${index}`}></button>
                            );
                        })
                    }
                </div>
                </div>
                </div>
                <a href="/short-videos" className="aurbhi-button">सम्बंधित खबर<span></span></a>
                </div>
            )
            }
            {props?.display_type ==="landscape" && (
                <div className="nwvdswrap" style={{ height: '319px', width: '100%' }}>
                <div className="globalhd large"><h2><a href="/videos/originals/">वीडियो</a></h2></div>
                <div className="nwvdsslide"style={{ height: '213px' }}>
                <div className="nwvdsslide-in" id="landscapeSlider">
                <div data-glide-el="track">
                <ul>
                    {props?.videowallLandscapeData &&
                    props?.videowallLandscapeData?.map((item, index) => {
                        return(
                            <li key={'videowalllandscape'+index}>
                                <a href={item?.url||'#'}>
                                    <figure>
                                        <img
                                            src={item?.thumbnail||site_config.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}
                                            alt={item?.title}
                                        />
                                    </figure>
                                    <h3>{item?.title}</h3>
                                </a>
                            </li>
                        );
                    })
                    }
                </ul>
                </div>
                <div className="nwvdsar" data-glide-el="controls">
                <button data-glide-dir="<"></button>
                <button data-glide-dir=">"></button>
                </div>

                <div data-glide-el="controls[nav]" className="nwvdsblt">
                    {props?.videowallLandscapeData &&
                        props?.videowallLandscapeData?.map((item, index) => {
                            return(
                                <button type="button" key={"btnlandscape"+index} data-glide-dir={`=${index}`}></button>
                            );
                        })
                    }
                </div>
                </div>
                </div>
                <a href="/videos/originals/" className="aurbhi-button">सम्बंधित खबर<span></span></a>
                </div>
            )
            }

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
            .aurbhi-button {
                color: #001536;
                font-size: 14px;
                font-weight: 700;
                position: relative;
                padding-right: 5px;display: block;
                text-align: right;
            }
            .aurbhi-button span {
                background: rgb(237, 28, 36);
                width: 19px;
                height: 19px;
                border-radius: 100%;
                display: inline-block;
                position: relative;
                top: 3px;
                margin-left: 4px;
            }
            .aurbhi-button span::after, .aurbhi-button span::before {
                content: "";
                position: absolute;
                top: 7px;
                width: 4px;
                height: 4px;
                border-top: 1px solid rgb(255, 255, 255);
                border-right: 1px solid rgb(255, 255, 255);
                display: block;
                transform: rotate(45deg);
            }
            .aurbhi-button span::before {
                left: 4px;
            }
            .aurbhi-button span::after {
                left: 8px;
            }
            .nwvdswrap{width: 900px; background: #1F1F1F; padding:15px 0;}
            .nwvdsslide{position: relative; }
            .nwvdsslide-in{overflow: hidden; margin: 0 35px;}
            .nwvdsslide-in ul{display: flex; margin-bottom: 30px;}
            .nwvdsslide-in ul li{background: #000;box-shadow: 0px 3px 6px #00000029;border: 1px solid #707070;border-radius: 5px; overflow: hidden;flex-shrink: 0;}
            .nwvdsslide-in ul li a figure{width: 100%;height:335px; position: relative;}
            #landscapeSlider.nwvdsslide-in ul li a figure{height:135px;}

            .nwvdsslide-in ul li a figure:before{content: "";width: 45px; height: 45px; position: absolute;top: 50%; left: 50%; z-index: 1; margin: -22px 0 0 -22px;cursor: pointer;background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;}
            .nwvdsslide-in ul li a figure img{width: 100%;height: 335px; border-radius: 5px 5px 0 0;}
            .nwvdsslide-in ul li a h3{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0;}
            #landscapeSlider.nwvdsslide-in ul li a figure img{height:135px;}

            .nwvdswrap .globalhd {border-bottom: 1px solid #D0D0D0; margin:0 20px 20px 20px;}
            .nwvdswrap .globalhd h2, .nwvdswrap .globalhd h2 a {color: #fff;}

            .nwvdsar{}
            .nwvdsar button{position: absolute;top: 50%;width: 25px;height: 32px;background: #FF0000;left: 0px;border-radius: 0px 4px 4px 0px; border: none; outline: none;}
            .nwvdsar button:last-child{right: 0px;left: auto;transform: rotate(180deg);}
            .nwvdsar button:after, .nwvdsar button:before {content: "";position: absolute;width: 5px;height: 5px;border-top: 1px solid #fff;border-left: 1px solid #fff;transform: rotate(-45deg);top: 13px;}
            .nwvdsar button:after{left:8px}
            .nwvdsblt{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
            .nwvdsblt button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; border: none; outline: none;}
            .nwvdsblt button.glide__bullet--active{background: #ED1C24;}
            .nwvdswrap .aurbhi-button {
                color: #D0D0D0; padding-right: 20px;
            }
        `}</style>
        </>
    );

};
export default videoWall;
