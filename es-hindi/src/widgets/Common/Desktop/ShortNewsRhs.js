import { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { shortDateConversion } from "../../../../helper/global";

const ShortNewsRhs = ({
    short_news_rhs:data = [],
    category = ""
}) => {
    if(!data || data.length  < 5) {
        return null;
    }

    useEffect(() => {
        if (
          document.getElementsByClassName("newfood-slide-in").length &&
          document.querySelector(`#short-news`)
        ) {
          new Glide(document.querySelector(`#short-news`), {
            autoplay: false,
            type: "carousel",
            perView: 1.4,
            focusAt: "center",
            gap: 0,
            slidesToScroll: 1,
          }).mount();
        }
    }, []);
    return (
        <>

            <div className="newglblhdwrap newsml">
                <h2><a href={`/short-news?utm_source=rhs&utm_medium=desktop_widget&utm_campaign=impact_shorts_discovery`}><img src="/images/impactShort/Impactshorts.svg?impolicy=website&amp;width=140&amp;height=50" width={"60px"}/></a></h2>
                <a href={`/short-news/${category}?utm_source=rhs&utm_medium=desktop_widget_viewall&utm_campaign=impact_shorts_discovery`} className="moretrndstroy">और पढ़ें</a>
            </div>
            <div className="newfood-slide mrg10">
                <div className={`newfood-slide-in`} id={"short-news"}>
                    <div data-glide-el="track">
                        <ul>
                            {
                                data.map((item, index) => {
                                    const title = item.display_headline || item.headline;
                                    let imageURL = item?.images?.url;
                                    return (
                                        <li key={"short-news"+`-`+index} className={item?.local18_video!==""?"short-news":""}>
                                            <div>
                                               <figure width={240} height={140}>
                                                    <LazyLoadImage
                                                        src={imageURL}
                                                        width={240}
                                                        height={140}
                                                        alt={title}
                                                        title={title}
                                                    />
                                                    <span className="sndate">{shortDateConversion(item.created_at)}</span>
                                                </figure>
                                                <div className="sncaption">
                                                <h3>{title}</h3>
                                                {item.shorts_bulletin?.map((bullets, index) => (
                                                    <div className="bullt" key={index}>
                                                        <span className="btn-blt"></span>
                                                        <h2>{bullets}</h2>
                                                    </div>
                                                ))}
                                                <a className="snrmore" href={"/short-news/" + item.weburl_short+"?utm_source=rhs&utm_medium=impact_short_cta&utm_campaign=impact_shorts_discovery"}>शॉर्ट न्यूज़ पढ़ें</a>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }

                        </ul>
                    </div>
                    

                    {/* <div data-glide-el="controls[nav]" className="trndstorynewbullet">
                        {
                            data.map((item, index) => (
                                <button key={item?.story_id} type="button" data-glide-dir={`=${index}`}></button>
                            ))
                        }
                    </div> */}
                    <div className="sncontr" data-glide-el="controls">
                    <button data-glide-dir="<"></button>
                    <button data-glide-dir=">"></button>
                </div>
                </div>
                
                
            </div>
                

            <style jsx global>{`
            @font-face {
                font-family: "Mukta";
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
                  format(url("woff2"));
                src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)
                  format("woff2");
                unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
                  U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
              }
            button {
                cursor: pointer;
                font-size: 0;
                border: 0;
                outline: none;
            }
                .newfood-slide{position: relative;background: #F5F5F5; padding: 10px 20px;}
                .newfood-slide-in{ position: relative; z-index: 3;}
                .newfood-slide-in > div {  overflow: hidden; }
                .newfood-slide-in ul{display: flex; margin-bottom: 10px; padding: 35px 0; justify-content: center;}
                .newfood-slide-in ul li{background: #FFFFFF; height: 330px;border-radius: 6px; position: relative; transition: all .1s ease-in-out; filter: brightness(0.2);opacity: .8;overflow: hidden; flex-shrink: 0;cursor:pointer;}
                .newfood-slide-in ul li.glide__slide--active{transform: scale(1.2); z-index: 2; transition: all .1s ease-in-out;filter: brightness(1);opacity: 1;}
                // .newfood-slide-in ul li figure{width: 100%;height: 160px; border-radius: 4px 4px 0 0;}
                // .newfood-slide-in ul li figure img{width: 100%;height: 160px;border-radius: 4px 4px 0 0;}
                .newfood-slide-in ul li h3{padding: 5px 5px 0;
                    color: #000;
                    font-size: 14px;
                    line-height: 19px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-bottom: 5px;}
                .recipe a figure:before{content: "";position: absolute;top: 35%;left: 50%;background: url(/images/siteimages/videoicon_1669351679.svg) 0 0 no-repeat;width: 32px;height: 32px;margin: -16px 0 0 -16px; z-index: 1;}
                
                .trndstorynewbullet{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
                .trndstorynewbullet button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
                .trndstorynewbullet button.glide__bullet--active{background: #ED1C24;}                
                  .trndstorynewbullet button {
                    width: 20px;
                    height: 4px;
                    background: #D6D6D6;
                    border-radius: 3px;
                    display: block;
                }
                .trndstorynewbullet button.glide__bullet--active {
                    background: #ED1C24;
                }
                .bullt {
                    margin: 0 0 5px;
                    padding: 0 15px 0 0;
                    position: relative;
                    display: flex;
                  }
                  .bullt h2 {
                    color: #000;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 15px;
                    position: relative;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                  .btn-blt {
                    left: 0;
                    box-sizing: border-box;
                    position: relative;
                    display: block;
                    transform: scale(var(--ggs,1));
                    height: 17px;
                    border: 2px solid transparent;
                    border-radius: 100px;
                    margin: 0 0px 0 20px;
                    color: #EC2028;
                }
                .btn-blt:before {
                    content: "";
                    display: block;
                    box-sizing: border-box;
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-bottom: 1px solid;
                    border-right: 1px solid;
                    transform: rotate(-45deg);
                    right: 6px;
                    top: 4px;
                }
                  .newfood-slide-in ul li figure{position: relative;height: 140px; border-radius: 6px 6px 0px 0px;}
                  .newfood-slide-in ul li figure img{transform: scale(1); border-radius: 6px 6px 0px 0px;}
                  .newfood-slide-in ul li .sndate{position: absolute;bottom: 5px; left: 10px;font-size: 9px;
                    line-height: 15px;
                    color: #5C6B88;
                    background-color: #F4F4F4;
                    padding: 1px 10px;
                    border-radius: 8px;
                    height: 15px;}
                .snrmore{
                    width: 84px;
                    background-color: #f04b46;
                    box-shadow: 0px 3px 6px#00000029;
                    border: 1px solid#fff;
                    border-radius: 15px;
                    text-decoration: none;
                    color: #fff;
                    display: block;
                    font-size: 10.9px;
                    line-height: 16px;
                    font-weight: bold;
                    padding: 3px 0;
                    position: relative;
                    text-align: center;
                    margin: 2px auto 0;
                    height: 22px;
                }
                    .snrmore:hover{ color: #fff;}
                    .newfood-slide-in ul li:hover img {
                        transform: scale(1);
                    }
                    .sncontr button {
                        position: absolute;
                        top: 45%;
                        width: 24px;
                        height: 24px;
                        background: #EC2028;
                        left: -15px;
                        border-radius: 100%;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        color: #fff;  
                        z-index: 9;
                        font-family: "Mukta";
                    }
                    .sncontr button:last-child{right: -15px;left: auto;transform: rotate(180deg);}
                    .sncontr button:after, .shvar button:before {content: "";position: absolute;width: 8px;height: 8px;border-top: 2px solid #fff;border-left: 2px solid #fff;transform: rotate(-45deg);top: 7px;}
                    .sncontr button:after{left:9px}
                    .sncaption {
                        box-shadow: 0px 0px 4px#0000001a;
                        border: 1px solid#dbdbdb;
                        height: 190px;
                        border-radius: 0 0 6px 6px;
                        border-top: 0;
                    }
                    .moretrndstroy {
                        color: #e82d2e;
                        font-size: 14px;
                        display: block;
                        text-align: center;
                        line-height: 24px;
                        margin: 5px 0;
                        font-weight: bold;
                    }
                    .moretrndstroy:after {
                        content: "";
                        background: url(/images/siteimages/newiconsprite_1669351342.svg)-164px 0px no-repeat;
                        width: 11px;
                        height: 11px;
                        display: inline-block;
                        margin-left: 6px;
                    }
            `}</style>
        </>
    );
};

export default ShortNewsRhs;
