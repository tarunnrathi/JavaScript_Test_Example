import { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import Heading from "../Heading";
import ReadMore from "./ReadMore";
import { getArticles } from "api/individual/Home";
import Skeleton from "components/Common/CustomSkeleton";
import { getCompleteURL } from "util/global/Helper";
import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";

const GetSlider = ({
    categoryLink,
    heading,
    data = [],
    category,
    buttonType = false,
    isAmp = false
}) => {

    if(!data || data.length === 0) {
        return null;
    }

    const [isLoading, setLoading] = useState(true);
    const [getData, setGetData] = useState(data.length > 0 ? data : []);

    const getDataSSR = async() => {
        setLoading(false);
        const data = await getArticles({ count: 5, category: category, fields: "story_id,headline,images,display_headline,weburl,weburl_r,local18_video" }, true);
		setGetData(data);
        setLoading(true);
    };

    useEffect(() => {
        if(data.length === 0) {
            getDataSSR();
        }

        if (document.getElementsByClassName('newfood-slide-in').length) {
            new Glide(document.querySelector(`#${category}`), {
                autoplay: false,
                type: 'carousel',
                perView: 1.4,
                focusAt: 'center',
                gap: 0,
                slidesToScroll: 1,
            }).mount();
        }
    }, []);

    return (
        <>
            <Heading
                heading={heading}
                categoryLink={categoryLink}
            />
            {
                getData && getData.length > 0 && isLoading ? (
                    <div className="newfood-slide mrg10">
                        <div className={`newfood-slide-in`} id={category}>
                            <div data-glide-el="track">
                                <ul>
                                    {
                                        getData.map((item, index) => {
                                            const title = item.display_headline || item.headline;
                                            return (
                                                <li key={category+`-`+index} className={item?.local18_video!==""?category:""}>
                                                    <a href={getCompleteURL(item?.weburl_r, item?.weburl_r)}>
                                                    {isAmp ? (
                                                        <figure className="expand">
                                                            <amp-img
                                                                src={item?.images?.url}
                                                                width="400"
                                                                height="267"
                                                                alt={title}
                                                                title={title}
                                                                layout="responsive"
                                                                data-hero=""
                                                            ></amp-img>
                                                        </figure>
                                                    ) : (
                                                        <LazyImage
                                                            width={250}
                                                            height={160}
                                                            src={item?.images?.url}
                                                            alt={title}
                                                            title={title}
                                                            unoptimized={true}
                                                        />
                                                    )}
                                                        <h3>{title}</h3>
                                                    </a>
                                                </li>
                                            );
                                        })
                                    }

                                </ul>
                            </div>

                            <div data-glide-el="controls[nav]" className="trndstorynewbullet">
                                {
                                    getData.map((item, index) => (
                                        <button key={item?.story_id} type="button" data-glide-dir={`=${index}`}></button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="newpwhitebgbtn">
                            <ReadMore
                                categoryLink={categoryLink}
                                heading={`और भी पढ़ें`}
                                buttonType={buttonType}
                            />
                        </div>
                    </div>
                ) : (
                    <Skeleton height={243} />
                )
            }

            <style jsx global>{`
                .newfood-slide{position: relative;background: #F5F5F5; padding: 10px;}
                .newfood-slide-in{overflow: hidden; position: relative; z-index: 3;}
                .newfood-slide-in ul{display: flex; margin-bottom: 10px; padding: 25px 0; justify-content: center;}
                .newfood-slide-in ul li{background: #FFFFFF;box-shadow: 0px 0px 4px #0000001A;border: 1px solid #DBDBDB;border-radius: 6px; position: relative; transition: all .1s ease-in-out; filter: brightness(0.2);opacity: .8;overflow: hidden; flex-shrink: 0;}
                .newfood-slide-in ul li.glide__slide--active{transform: scale(1.2); z-index: 2; transition: all .1s ease-in-out;filter: brightness(1);opacity: 1;}
                .newfood-slide-in ul li a figure{width: 100% !important;height: 160px; border-radius: 4px 4px 0 0;}
                .newfood-slide-in ul li a figure img{width: 100% !important;height: 160px;border-radius: 4px 4px 0 0;}
                .newfood-slide-in ul li a h3{padding: 5px 10px 10px 10px;color: #000000;font-size: 15px;line-height: 22px;}
                .recipe a figure:before{content: "";position: absolute;top: 52%;left: 50%;background: url(/images/siteimages/videoicon_1669351679.svg) 0 0 no-repeat;width: 32px;height: 32px;margin: -16px 0 0 -16px; z-index: 1;}

                .newpwhitebgbtn {background: #fff;padding: 5px 0 0 0;margin-top: 12px;}
                .trndstorynewbullet{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
                .trndstorynewbullet button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
                .trndstorynewbullet button.glide__bullet--active{background: #ED1C24;}  
                @media screen and (min-device-width: 480px) and (max-device-width: 1024px)  and (orientation: landscape) {
                    .newfood-slide-in ul li a figure {width: 100% !important; height: 300px !important;}
                    .newfood-slide-in ul li a figure img {width: 100% !important; height: 300px !important;}
                    .trndstorynewbullet{margin-top: 25px;}
                }               
            `}</style>
        </>
    );
};

export default GetSlider;
