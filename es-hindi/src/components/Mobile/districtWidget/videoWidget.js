import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader } from "includes/article.util";
import moment from "moment";
import React, { useEffect } from "react";

const VideoWidget = ({ localVideosData = [], aurPadheLink = "" }) => {

    useEffect(() => {
        localVideosData.length > 0 && new Glide(document.getElementById('localVideosData'), {
            autoplay: false,
            type: 'carousel',
            focusAt: 'center',
            perView: 1.5,
            gap: 7,
            slidesToScroll: 1,
            }).mount();
    }, []);
    if(localVideosData.length === 0) {
        return null;
    }
    return (<>
    <div className="locvd-slide">
					<div className="lcheading">
                    <h2 className="lcchild">
					<svg xmlns="http://www.w3.org/2000/svg" width="18.607" height="12.378" viewBox="0 0 18.607 12.378">
					  <g id="Group_2178" data-name="Group 2178" transform="translate(-338 -461.622)">
						<path id="Path_20627" data-name="Path 20627" d="M6.607,2.622h5L5,15H0Z" transform="translate(338 459)" fill="#fc0f00"/>
						<path id="Path_20628" data-name="Path 20628" d="M6.607,2.622h5L5,15H0Z" transform="translate(345 459)" fill="#fc0f00"/>
					  </g>
					</svg>
					लोकल विडियो
				</h2>
					</div>
					<div className="locvd-slide-in" id="localVideosData">
						<div data-glide-el="track">
							<ul>
							{localVideosData.map((item, index) => {
                                const {
                                    categories,
                                    display_headline,
                                    headline,
                                    weburl,
                                    created_at,
                                    images,
                                    // ff_source,
                                    // local18_video,
                                } = item.article_details || item || {};
 
                            return (<li key={`bfbfg-${index}`}>
                                <a href={weburl}>
							    <figure>
                                    <LazyLoadImage
                                        src={imageLoader(images?.url, 264, 132)}
                                        alt={display_headline || headline || ""}
                                        title={display_headline || headline || ""}
                                        width={264}
                                        height={132}
                                    />
                                </figure>
							    <div>
                                    <section>{display_headline || headline}</section>
                                    <p>
                                    {categories?.length > 0
                                            ? categories[0].name.replace("&amp;", "&")
                                            : "News"} <span>| &nbsp; { created_at && moment(created_at).format('DD MMMM YYYY')}</span>
                                        <span className="tme">{created_at && moment(created_at).format('HH:MM')}</span>
                                    </p>
                                </div>
							    </a>
                            </li>);})}
							</ul>
						</div>

						<div className="locvdarr" data-glide-el="controls">
                            <button data-glide-dir="<"></button>
                            <button data-glide-dir=">"></button>
						</div>

						<div data-glide-el="controls[nav]" className="locvdbullt">
						<button type="button" data-glide-dir="=0"></button>
						<button type="button" data-glide-dir="=1"></button>
						<button type="button" data-glide-dir="=2"></button>
						<button type="button" data-glide-dir="=3"></button>
						<button type="button" data-glide-dir="=4"></button>
						<button type="button" data-glide-dir="=5"></button>
						<button type="button" data-glide-dir="=6"></button>
						</div>

					</div>
                    <a href={aurPadheLink} className="moretrndstroy">और देखें</a>

				</div>
    <style jsx>{`
        .locvd-slide{position: relative; background: #101010; padding: 12px 0 20px; border: 1px solid #D9CFC3;    border-radius: 4px; margin-bottom: 20px;}
		.locvd-slide .lcheading {margin: 0 18px 10px;}
		.locvd-slide .lcheading {margin: 0 18px 10px; border-bottom: 1px solid #4D4D4D;}
		.locvd-slide .lcheading .lcchild, .locvd-slide .lcheading .lcchild a, .locvd-slide .moretrndstroy{color: #fff;}
		.moretrndstroy {
            color: #fff !important;
            font-size: 14px;
            text-align: center;
            font-weight: bold;
            background: #E1261C;
            box-shadow: 0px 3px 6px #00000029;
            border: 1px solid #FFFFFF;
            border-radius: 16px;
            display: table;
            margin: 15px auto 0;
            width: 140px;
            height: 32px;
            line-height: 32px;
        }
        .moretrndstroy:after{filter: brightness(0) invert(1);}
		.locvd-slide-in{overflow: hidden; margin: 0 18px;}
		.locvd-slide-in ul{display: flex; margin-bottom: 30px;}
		.locvd-slide-in ul li{box-shadow: 0px 0px 4px #0000001A;border: 1px solid #4D4D4D; border-radius: 4px; position: relative;opacity: 0.2;background-color: #363232; mix-blend-mode: multiply;height: 265px;}
		.locvd-slide-in ul li.glide__slide--active {opacity: 1;}				
		.locvd-slide-in ul li a figure{width: 100%;height: 100%;position: relative;}
		.locvd-slide-in ul li a figure img{width: 100%;height: 100%;}
		.locvd-slide-in ul li a figure:after {content: "";background-image: url(/images/districts/Group2202.svg); position: absolute; top: 0; width: 42px; height: 42px; left: 0; right: 0; bottom: 0; margin: auto;background-size: 42px; background-repeat: no-repeat;}
		.locvd-slide-in ul li a div { position: absolute;bottom: 16px; width: 85%;height: 104px;background: #000000ab; background-blend-mode: multiply;padding: 10px; border-left: 5px solid #FC0100;}
		.locvd-slide-in ul li a section{color: #ffffff;font-weight:600;font-size: 18px; line-height: 28px;width: 100%;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;}
		.locvd-slide-in ul li a p {color: #D8D9DB;font-size: 14px;line-height: 22px;position: relative;font-weight: bold;margin-top: 8px;}
		.locvd-slide-in ul li a p span {margin-left: 5px;font-weight: normal;}
		.locvd-slide-in ul li a p span.tme {position: absolute; right: 0; color: #FC0F00;font-weight: bold;}
		.locvd-slide button{top: 50%;left: 0;margin-top: -16px;}
		.locvd-slide button:last-child{right: 0;}
		
		.locvdarr button{position: absolute;top: 50%;width: 25px;height: 32px;background: #FF0000; left: 0px; border-radius: 0px 4px 4px 0px;}
		.locvdarr button:last-child{right: 0px;left: auto;transform: rotate(180deg);}
		.locvdarr button:after, .locvdarr button:before {content: "";position: absolute;width: 5px;height: 5px;border-top: 1px solid #fff;border-left: 1px solid #fff;transform: rotate(-45deg);top: 13px;}
		.locvdarr button:after{left:8px}
		.locvdbullt{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
		.locvdbullt button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; border: 0}
		.locvdbullt button.glide__bullet--active{background: #ED1C24;}
		
		@media (max-width:768px){
			.locvd-slide-in ul li{opacity:1;}
			.locvd-slide-in ul li a figure, .locvd-slide-in ul li a figure img{height: 132px;}
			.locvd-slide-in ul li a div{width: 100%; position: relative; border: 0; height: 130px; bottom: unset;padding: 11px 10px;}
			.locvd-slide-in ul li a section{font-size: 16px; line-height: 26px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;  overflow: hidden;}
            .locvd-slide-in ul li a p{padding-right: 35px; line-height: 15px;}
            .locvd-slide-in ul li a p span.tme {top: 0;}
		}
    `}</style>
    </>)
};

export default VideoWidget;