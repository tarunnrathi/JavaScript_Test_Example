import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import React, { useEffect } from "react";
import { getCompleteURL } from "util/global/Helper";

const ShortVideosList = ({ data, aurPadheLink }) => {
    useEffect(() => {
        document.getElementById('shorts-slide') && new Glide(document.getElementById('shorts-slide'), {
            autoplay: false,
            type: 'carousel',
            perView: 5,
            gap: 15,
            slidesToScroll: 1,
        }).mount();
    }, []);
    if (data.length === 0) {
        return null;
    }
    return (<>
        <div className="locshort-slide">
            <div className="lcheading">
                <h2 className="lcchild">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.607" height="12.378" viewBox="0 0 18.607 12.378">
                        <g id="Group_2178" data-name="Group 2178" transform="translate(-338 -461.622)">
                            <path id="Path_20627" data-name="Path 20627" d="M6.607,2.622h5L5,15H0Z" transform="translate(338 459)" fill="#fc0f00" />
                            <path id="Path_20628" data-name="Path 20628" d="M6.607,2.622h5L5,15H0Z" transform="translate(345 459)" fill="#fc0f00" />
                        </g>
                    </svg>
                    लोकल शॉर्ट्स
                </h2>
                <a href={aurPadheLink} className="moretrndstroy">और भी पढ़ें</a>
            </div>
            <div className="locshort-slide-in" id="shorts-slide">
                <div data-glide-el="track">
                    <ul>
                        {data.map((item, index) => {
                            const width = 162;
                            const height = 300;
                            const imageSrc = item?.images?.url + "?im=Resize,width=162,aspect=fit,type=normal";
                            return (
                                <li key={`shrt-${index}`}>
                                    <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                                        <figure>
                                            <LazyLoadImage
                                                isLazyLoad={true}
                                                width={width}
                                                height={height}
                                                src={imageSrc}
                                                alt={item.blog_title || ''}
                                                title={item.blog_title || ''}
                                            />
                                        </figure>
                                        <div className="div-short">
                                            <span>{item?.categories?.length > 0
                                                ? item?.categories[0]?.name?.replace("&amp;", "&")
                                                : "News"}</span>
                                            <section>{item.display_headline || item.headline}</section>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="locshortarr" data-glide-el="controls">
                    <button data-glide-dir="<"></button>
                    <button data-glide-dir=">"></button>
                </div>
                <div data-glide-el="controls[nav]" className="locshortbullet">
                    {data.map((itm, index) => (<button type="button" key={`btn-${index}`} data-glide-dir={`=${index}`}></button>))}
                </div>
            </div>
        </div>
        <style jsx global>{`
    .locshort-slide{position: relative; background: #1F1F1F; padding-top: 12px; border-radius: 4px; margin-bottom: 30px;}
    .locshort-slide .lcheading {margin: 0 18px 10px; border-bottom: 1px solid #4D4D4D;}
    .locshort-slide .lcheading .lcchild, .locshort-slide .lcheading .lcchild a, .locshort-slide .moretrndstroy{color: #fff;}
    .locshort-slide .moretrndstroy:after{filter: brightness(0) invert(1);}
    .locshort-slide-in{overflow: hidden; margin: 0 18px;}
    .locshort-slide-in ul{display: flex; margin-bottom: 30px;}
    .locshort-slide-in ul li{box-shadow: 0px 0px 4px #0000001A;border: 1px solid #4D4D4D; border-radius: 4px; position: relative;}
    
    .locshort-slide-in ul li a figure{width: 100%;height: 300px}
    .locshort-slide-in ul li a figure img{width: 100%;height: 300px; object-fit: cover;}
    .locshort-slide-in ul li a section{padding: 5px 10px 0 10px; font-weight: 600;color: #ffffff;font-size: 16px;line-height: 22px;    text-align: center;border-radius: 4px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 9px 0 3px 0;}
    .div-short span {background-color: #fff; box-shadow: 0px 3px 6px #00000029;   border-radius: 15px;height: 25px; color: #FF0000;
        font-size: 14px; line-height: 20px; padding: 2px 15px;   font-weight: bold; margin-bottom: 13px;}
    .div-short {position: absolute; bottom: 0;background: -webkit-linear-gradient(top,transparent 30%,#000 100%);
         line-height: 22px; z-index: 1111; width: 100%; height: auto;text-align: center;}
    .locshort-slide button{top: 50%;left: 0;margin-top: -16px;}
    .locshort-slide button:last-child{right: 0;}
    
    .locshortarr button{position: absolute;top: 50%;width: 25px;height: 32px;background: #FF0000; left: 0px; border-radius: 0px 4px 4px 0px; border: 0;}
    .locshortarr button:last-child{right: 0px;left: auto;transform: rotate(180deg);}
    .locshortarr button:after, .locshortarr button:before {content: "";position: absolute;width: 5px;height: 5px;border-top: 1px solid #fff;border-left: 1px solid #fff;transform: rotate(-45deg);top: 13px;}
    .locshortarr button:after{left:8px}
    .locshortbullet{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
    .locshortbullet button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block; border: 0;}
    .locshortbullet button.glide__bullet--active{background: #ED1C24;}
    `}</style>
    </>);
};

export default ShortVideosList;