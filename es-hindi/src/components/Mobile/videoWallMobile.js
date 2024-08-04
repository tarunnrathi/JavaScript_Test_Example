import React, { useEffect } from "react";
import Head from "next/head";
import site_config from "config/site.config";

const videoWall =(props) => {
    useEffect(() => {
        new Glide(document.querySelector('#portraitSlider'), {
            autoplay: false,
            type: 'carousel',
            perView: 1.2,
            focusAt: 'center',
            gap: 0,
            slidesToScroll: 1,
            })?.mount();
    }, []);
    useEffect(() => {
        new Glide(document.querySelector('#landscapeSlider'), {
            autoplay: false,
            type: 'carousel',
            perView: 1.2,
            focusAt: 'center',
            gap: 0,
            slidesToScroll: 1,
            })?.mount();
    }, []);

    return(
        <>
            <Head>
                <script src="https://images.hindi.news18.com/ibnkhabar/uploads/assests/js/glide.min.js"></script>
            </Head>
            {props?.display_type==="portrait" && (
                 <div className="mnwvdswrap" style={{ padding: '15px;' }}>
                 <div className="globalhd large"><h2><a href="/short-videos">वीडियो</a></h2></div>
                 <div className="mnwvdsslide">
                 <div className="mnwvdsslide-in" id="portraitSlider">
                 <div data-glide-el="track">
                 <ul>
                    {props?.videowallPortraitData &&
                    props?.videowallPortraitData?.map((item, index) => {
                        return(
                            <li key={'portrait'+index}>
                                <a href={item?.url||'#'}>
                                    <figure style={{ height: '390px' }}>
                                        <img
                                            src={item?.thumbnail||site_config.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}
                                            alt={item?.title}
                                            style={{ height: '390px' }}
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
                <div className="mnwvdsar" data-glide-el="controls">
                <button data-glide-dir="<"></button>
                <button data-glide-dir=">"></button>
                </div>

                <div data-glide-el="controls[nav]" className="mnwvdsblt" style={{ margin: '60px auto 26px auto', maxWidth: '165px', overflow: 'hidden' }}>
                    {props?.videowallPortraitData &&
                        props?.videowallPortraitData?.map((item, index) => {
                            return(
                                <button type="button" key={"portrait"+index} data-glide-dir={`=${index}`}></button>
                            );
                        })
                    }
                </div>
                <div className="mnwvdsar" data-glide-el="controls">
                    <button data-glide-dir="<"></button>
                    <button data-glide-dir=">"></button>
                </div>
                </div>
                </div>
                <a href="/short-videos" className="maurbhi-button">सम्बंधित खबर<span></span></a>
             </div>

            )}

            {props?.display_type==="landscape" && (
                <div className="mnwvdswrap">
                 <div className="globalhd large"><h2><a href="/videos/originals/">वीडियो</a></h2></div>
                 <div className="mnwvdsslide">
                 <div className="mnwvdsslide-in" id="landscapeSlider">
                 <div data-glide-el="track">
                 <ul>
                    {props?.videowallLandscapeData &&
                    props?.videowallLandscapeData?.map((item, index) => {
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
                 <div className="mnwvdsar" data-glide-el="controls">
                    <button data-glide-dir="<"></button>
                    <button data-glide-dir=">"></button>
                </div>

                 <div data-glide-el="controls[nav]" className="mnwvdsblt">
                    {props?.videowallLandscapeData &&
                        props?.videowallLandscapeData?.map((item, index) => {
                            return(
                                <button type="button" key={"landscape"+index} data-glide-dir={`=${index}`}></button>
                            );
                        })
                    }
                 </div>
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
            .mnwvdsslide-in{overflow: hidden; margin: 0 10px;padding: 40px 0 0px 0;}
            .mnwvdsslide-in ul{display: flex; margin-bottom: 30px; justify-content: center;}
            .mnwvdsslide-in ul li{background: #000;box-shadow: 0px 3px 6px #00000029;border: 1px solid #D0D0D0;border-radius: 5px; overflow: hidden; transition: all .5s ease-in-out;opacity: .8;    filter: brightness(0.5);flex-shrink: 0;}
            .mnwvdsslide-in ul li.glide__slide--active{transform: scale(1.1);z-index: 2;transition: all .5s ease-in-out;filter: brightness(1);opacity: 1;}
            .mnwvdsslide-in ul li a figure{width: 100%;height: 475px; position: relative;}
            #landscapeSlider.mnwvdsslide-in ul li a figure,#landscapeSlider.mnwvdsslide-in ul li a figure img{height:135px;}
            .mnwvdsslide-in ul li a figure:before{content: "";width: 45px; height: 45px; position: absolute;top: 50%; left: 50%; z-index: 1; margin: -22px 0 0 -22px;cursor: pointer;background: url(/images/siteimages/video-iconnew.png) 0 0 no-repeat;}
            .mnwvdsslide-in ul li a figure img{width: 100%;height: 475px; border-radius: 5px 5px 0 0;}
            .mnwvdsslide-in ul li a h3{padding: 10px;font-size: 15px;line-height: 22px;color: #d0d0d0;}
            .mnwvdswrap .globalhd {border-bottom: 1px solid #D0D0D0; margin:0 20px 20px 20px;}
            .mnwvdswrap .globalhd h2, .mnwvdswrap .globalhd h2 a {color: #fff;}
            .mnwvdsar{position: absolute;bottom: 40px;left: 0;right: 0;width: 200px;margin: auto;}
            .mnwvdsar button{position: absolute;top: 50%;border: none;outline: none;background: none;width: 12px;height: 12px;border-top: 2px solid #A2A2A2;border-left: 2px solid #A2A2A2;transform: rotate(-45deg);margin-top: 6px;}
            .mnwvdsar button:last-child{right: 0px;left: auto;transform: rotate(135deg);}
            .mnwvdsblt{display: flex; gap:10px; justify-content: center; margin:60px 0 26px 0;}
            .mnwvdsblt button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; border: none; outline: none;}
            .mnwvdsblt button.glide__bullet--active{background: #ED1C24;}
            .maurbhi-button {background: #000;font-size: 14px;font-weight: 700;position: relative;border-radius: 20px;text-align: right;border: 1px solid #ED1C24;display: table;margin: auto;color: #E82D2E;height: 30px;line-height: 30px;padding: 0 20px;}
        `}</style>
        </>
    );

};
export default videoWall;
