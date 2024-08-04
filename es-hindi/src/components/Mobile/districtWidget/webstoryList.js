import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect } from "react";
import { getCompleteURL } from "util/global/Helper";

const WebStoryList = ({ data, aurPadheLink }) => {

    useEffect(() => {
        document.querySelector('.webseries-slide-in') && new Glide(document.querySelector('.webseries-slide-in'), {
            autoplay: false,
            type: 'carousel',
            perView: 2.3,
            gap: 16,
            slidesToScroll: 1,
            }).mount();
    }, []);
    if(data.length === 0) {
        return null;
    }
    return(<>
    <div className="webseries-slide">
					<div className="lcheading">
						<h2 className="lcchild">
							<svg xmlns="http://www.w3.org/2000/svg" width="18.607" height="12.378" viewBox="0 0 18.607 12.378">
							  <g id="Group_2178" data-name="Group 2178" transform="translate(-338 -461.622)">
								<path id="Path_20627" data-name="Path 20627" d="M6.607,2.622h5L5,15H0Z" transform="translate(338 459)" fill="#fc0f00"/>
								<path id="Path_20628" data-name="Path 20628" d="M6.607,2.622h5L5,15H0Z" transform="translate(345 459)" fill="#fc0f00"/>
							  </g>
							</svg>
							वेब स्टोरीज
						</h2>
					</div>
					<div className="webseries-slide-in">
						<div data-glide-el="track">
							<ul>
                            {data.map((item, index) => {
                                const width = 152;
                                const height = 248;
                                const imageSrc = item.feature_img + "?im=Resize,width=162,aspect=fit,type=normal";
                                return (
                                    <li key={`webs-${index}`}><a href={getCompleteURL(item.web_url_r, item.web_url)}>
                                    <figure>
                                    <LazyLoadImage
                                        lazyLoad={true}
                                        width={width}
                                        height={height}
                                        src={imageSrc}
                                        alt={item.blog_title || ''}
                                        title={item.blog_title || ''}
                                    />
                                    </figure>
                                    <section>{item.blog_title}</section>
                                    </a></li>
                                );
                            })}
							</ul>
						</div>

						<div className="trndstorynewarw" data-glide-el="controls">
						<button data-glide-dir="<"></button>
						<button data-glide-dir=">"></button>
						</div>

						<div data-glide-el="controls[nav]" className="trndstorynewbullet">
                            {data.map((itm, index) => (<button type="button" key={`btn-${index}`} data-glide-dir={`=${index}`}></button>))}
						</div>

					</div>
						<a href={aurPadheLink} className="moretrndstroy">और भी पढ़ें</a>

				</div>
    <style jsx>{`
    .webseries-slide{position: relative; background: #F2EDE7; padding: 12px 0 20px; border: 1px solid #D9CFC3;    border-radius: 4px;margin-bottom: 20px;}
    .webseries-slide .lcheading {margin: 0 18px 10px;}
    .webseries-slide-in{overflow: hidden; margin: 0 18px;}
    .webseries-slide-in ul{display: flex; margin-bottom: 30px;}
    .webseries-slide-in ul li{box-shadow: 0px 0px 4px #0000001A;border: 1px solid #fff; border-radius: 4px; position: relative;}
    .webseries-slide-in ul li:after {content: "";width: 100%;height: 5px; background-color: #FC0100; position: absolute; bottom: 0; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;}
    .webseries-slide-in ul li a figure{width: 100%;height: 300px}
    .webseries-slide-in ul li a figure img{width: 100%;height: 300px;}
    .webseries-slide-in ul li a section{padding: 5px 10px 11px 10px;font-weight:600;color: #ffffff;font-size: 16px;line-height: 22px;position: absolute;bottom: 0; background: -webkit-linear-gradient(top,transparent 30%,#000 100%); text-align: center;border-radius: 4px; width: 100%;}
    .webseries-slide button{top: 50%;left: 0;margin-top: -16px;}
    .webseries-slide button:last-child{right: 0;}
    
    .trndstorynewarw button{position: absolute;top: 50%;width: 25px;height: 32px;background: #FF0000; left: 0px; border-radius: 0px 4px 4px 0px;}
    .trndstorynewarw button:last-child{right: 0px;left: auto;transform: rotate(180deg);}
    .trndstorynewarw button:after, .trndstorynewarw button:before {content: "";position: absolute;width: 5px;height: 5px;border-top: 1px solid #fff;border-left: 1px solid #fff;transform: rotate(-45deg);top: 13px;}
    .trndstorynewarw button:after{left:8px}
    .trndstorynewbullet{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
    .trndstorynewbullet button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
    .trndstorynewbullet button.glide__bullet--active{background: #ED1C24;}
    
    @media (max-width:768px){					
        .webseries-slide-in ul li a figure, .webseries-slide-in ul li a figure img{height: 248px;}
        .webseries-slide-in ul li a section{line-height: 25px;font-weight:600; padding-bottom:6px; display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical;overflow: hidden;}
        .webseries-slide-in ul li:after{height: 4px;}
    }
    
    `}</style>
    </>);
};

export default WebStoryList;