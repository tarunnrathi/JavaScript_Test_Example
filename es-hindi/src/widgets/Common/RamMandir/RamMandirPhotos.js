import LazyLoadImage from "components/Common/CustomImage";
import React from "react";
import NewSiteAd from "../Responsive/NewSiteAd";

const RamMandirPhotos = ({ photoStories = [], isMobile = false, pageAds }) => {
    const first = photoStories.slice(0, 1)?.[0] || {}
    const second = photoStories.slice(1, 2)?.[0] || {}
    const last = photoStories.slice(isMobile ? 1: 2, 7)
    return (<>
        <div className="rmpht">
            <h2 className="rmgblhd">राम मंदिर की तस्वीरें</h2>
            <div className="rmwrp">
                <div className="rmphtl">
                    <div className="rmphtwrp">
                        <div className="rmphtnwsl">
                            <a href={first.weburl}>
                                <figure>
                                    <LazyLoadImage alt={first.display_headline} src={first?.images?.url} width={448} height={300} />
                                </figure>
                                <figcaption><span><img src="/images/rammandir/photoicon.svg" alt="" /> +{first.gallery_count} फोटो</span><section>{first.display_headline}</section>	</figcaption>
                            </a>
                            {!isMobile && <div className="rmphtnwml">
                                <a href={second.weburl}>
                                    <figure>
                                        <LazyLoadImage alt={second.display_headline} src={second?.images?.url} width={144} height={96} />
                                    </figure>
                                    <figcaption>
                                        <section>{second.display_headline}</section><span><img src="/images/rammandir/photoicon.svg" alt="" /> +{second.gallery_count} फोटो</span>	</figcaption>
                                </a>
                            </div>}
                        </div>
                        <ul className="rmphtnwsr">
                            {last.map((itm, index) => (
                                <li key={index + "rmttmr"}>
                                    <a href={itm.weburl} className="rmstrythmb">
                                        <figure>
                                            <LazyLoadImage alt={itm.display_headline} src={itm?.images?.url} width={144} height={96} />
                                        </figure>
                                        <figcaption>
                                            <section>
                                                {itm.display_headline}</section>
                                            <span><img src="/images/rammandir/photoicon.svg" alt="" /> +{itm.gallery_count} फोटो</span>
                                        </figcaption>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="rmphtr">
                    {!isMobile && <NewSiteAd 
                        slotId="BTF_300_1"
                        adUnit={pageAds?.BTF_300}
                        sizes={[[300, 600]]}
                        loadOnScroll={true}
                        style={{textAlign: "center"}}
                    />}
                </div>

            </div>
        </div>
        <div className="moreseebtn notopspc"><a href="/tag/ram-mandir/photogallery/">और तस्वीरें देखें</a></div>
        <style jsx>{`.rmpht{background: #FFEDDF; padding: 20px 0;}
.rmpht .rmwrp{display: flex; justify-content: space-between;}
.rmphtl{width: calc(100% - 325px)}
.rmphtwrp{display: flex; justify-content: space-between;}
.rmphtnwsl{width: 49%; background: #FFFFFF;box-shadow: 0px 3px 6px #00000029;border: 1px solid #E3E3E3;border-radius: 5px;}
.rmphtnwsl a figure img{width:100%;}
.rmphtnwsl a figcaption{margin: 25px}
.rmphtnwsl a figcaption h2, .rmphtnwsl a figcaption section{color: #000000; font-size: 20px; line-height: 34px;  display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;}
.rmphtnwsl a figcaption span{color: #F37A1F; font-size: 15px; font-weight: bold; line-height:20px;     display: block; margin-bottom: 10px;}
.rmphtnwsl a figcaption span img{display: inline-block;vertical-align: top;margin-right: 5px;}

.rmphtnwml{ background: #FFFFFF;}
.rmphtnwml {padding: 12px 0;border-top: 1px solid #ccc;}
.rmphtnwml {padding-top: 0;border: none;}
.rmphtnwml a{display: flex; justify-content: space-between;}
.rmphtnwml a figure {width: 144px; height: 95px; border-radius: 5px; flex-shrink: 0; margin-right: 12px;}
.rmphtnwml a figure img{width:100%; border-radius: 5px;}
.rmphtnwml a figcaption{width: 100%; margin: 0px;}
.rmphtnwml a figcaption h2, .rmphtnwsr a figcaption section{font-size: 15px; line-height: 24px;  color: #000;   display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;}
.rmphtnwml a figcaption span{color: #F37A1F; font-size: 15px; font-weight: bold; line-height:20px;    display: block; margin-top: 5px;}
.rmphtnwml a figcaption span img{display: inline-block;vertical-align: top;margin-right: 5px;}


.rmphtnwsr{width: 49%;background: #FFFFFF;box-shadow: 0px 3px 6px #00000029;border: 1px solid #E3E3E3;border-radius: 5px;padding: 10px 50px 10px 10px;}
.rmphtnwsr li{padding: 12px 0;b]order-top: 1px solid #ccc;}
.rmphtnwsr li:first-child {padding-top: 0;border: none;}
.rmphtnwsr a{display: flex; justify-content: space-between;}
.rmphtnwsr a figure{width: 144px; height: 95px; border-radius: 5px; flex-shrink: 0; margin-right: 12px;}
.rmphtnwsr a figure img{width:100%;}
.rmphtnwsr a figcaption{width: 100%;}
.rmphtnwsr a figcaption h2, .rmphtnwsr a figcaption section{font-size: 15px; line-height: 24px;  color: #000;   display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;}
.rmphtnwsr a figcaption span{color: #F37A1F; font-size: 15px; font-weight: bold; line-height:20px;    display: block; margin-top: 5px;}
.rmphtnwsr a figcaption span img{display: inline-block;vertical-align: top;margin-right: 5px;}

.rmphtr{width: 300px; flex-shrink: 0;}
.rrgtad{margin-bottom: 20px; text-align: center;}
.moreseebtn{position: relative;margin: 30px 0;text-align: center;}
.moreseebtn.notopspc{margin: 4px 0 30px 0;}
.moreseebtn:before{content: ""; height: 1px; background: #ccc; position: absolute; left: 0; right: 0; top: 50%; }
.moreseebtn a{height: 35px;line-height: 35px;color: #fff;background: transparent linear-gradient(180deg, #F37A1F 0%, #BC5405 100%) 0% 0% no-repeat padding-box;
border-radius: 40px;font-size: 15px;padding: 0 30px;display: table;margin: auto;position: relative;}
.rmphtnwml:last-child a {
    padding: 0 10px;
}
.rmphtnwml:last-child a figcaption section {
    font-size: 15px !important;
    line-height: 24px !important;
}

@media (max-width: 769px){
.rmpht {padding: 20px 10px;}	
.rmpht .rmwrp, .rmphtwrp{display: block;}
.rmphtl, .rmphtr, .rmphtnwsl, .rmphtnwsr{width: 100%;}
.rmphtnwsl, .rmphtl{margin-bottom: 20px;}
.rmphtnwsr a figure{width: 120px; height: 80px;}
.rmgblhd:after { width: 320px !important; background-size: 320px;}
}
`}</style>
    </>)
};

export default RamMandirPhotos;