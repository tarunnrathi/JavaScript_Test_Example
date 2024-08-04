import { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import Heading from "../Heading";
import ReadMore from "./ReadMore";
import Skeleton from "components/Common/CustomSkeleton";
import { getArticleList } from "api/global/Common";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";

const GetVideoSlider = ({
    categoryLink,
    heading,
    data = [],
    isAmp = false,
    category,
    key
}) => {

    const [isLoading, setLoading] = useState(true);
    const [getData, setGetData] = useState(data.length > 0 ? data : []);

    const getDataSSR = async () => {
        setLoading(false);
        const data = await getArticleList({ count: 5, filter: { 'post_type': 'videos' }, fields: 'story_id,headline,images,display_headline,weburl,weburl_r,author_byline,post_type' }, true);
        setGetData(data);
        setLoading(true);
    };

    useEffect(() => {
        if (data.length === 0) {
            getDataSSR();
        }

        if (document.getElementsByClassName('newvideolist-slide-in').length) {
            new Glide(document.querySelector(`#newvideolist-slide-in-`+category), {
                autoplay: false,
                type: 'carousel',
                perView: 1.6,
                focusAt: 'center',
                gap: 15,
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
                    <div className="newvideolist-slide">
                        <div className="newvideolist-slide-in" id={`newvideolist-slide-in-${category}`}>
                            <div data-glide-el="track">
                                <ul>
                                    {
                                        getData.map((item, index) => {
                                            const title = item.display_headline || item.headline;
                                            return (
                                                <li key={category+`-`+index}>
                                                    <a href={getCompleteURL(item?.weburl_r, item?.weburl_r)}>
                                                        {isAmp ? (
                                                            <figure className="expand">
                                                                <LazyLoadImage
                                                                    src={item?.images?.url}
                                                                    width="227"
                                                                    height="119"
                                                                    alt={title}
                                                                    title={title}
                                                                    isAMP={true}
                                                                />                                                            
                                                            </figure>
                                                        ) : (
                                                            <figure>
                                                                <LazyLoadImage
                                                                    src={item?.images?.url}
                                                                    width={214}
                                                                    height={119}
                                                                    alt={title}
                                                                    title={title}
                                                                />
                                                            </figure>
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
                        <ReadMore
                            categoryLink={categoryLink}
                            heading={`और भी पढ़ें`}
                        />
                    </div>
                ) : (
                    <Skeleton height={243} />
                )
            }

            <style jsx global>{`
                .newvideolist-slide{position: relative;background: #2F2F2F; padding-bottom: 10px;}
                .newvideolist-slide-in{overflow: hidden; position: relative; z-index: 3;}
                .newvideolist-slide ul{display: flex; padding: 10px 0;}
                .newvideolist-slide ul li{border: 1px solid #5C5C5C;border-radius: 4px; background: #000000;}
                .newvideolist-slide ul li a figure{width: 100% !important; height: 150px; border-radius: 0;}
                .newvideolist-slide ul li a figure:after{position: absolute;top: 0;right: 0;bottom: 0;left: 0;background: #000000;border-radius: 4px 4px 0px 0px;opacity: 0.3;content: "";}
                .newvideolist-slide ul li a figure:before{content: "";position: absolute;top: 50%;left: 50%;background: url(/images/siteimages/videoicon_1669351679.svg) 0 0 no-repeat;width: 33px;height: 33px;margin: -16px 0 0 -16px; z-index: 1;}
                .newvideolist-slide ul li a figure img{width: 100% !important; height: 150px; border-radius: 4px 4px 0 0; border-bottom: 1px solid #5C5C5C;}
                .newvideolist-slide ul li a h3{color: #fff;font-size: 15px;line-height: 22px;padding: 10px;}	
                @media screen and (min-device-width: 480px) and (max-device-width: 1024px)  and (orientation: landscape) {
                    .newvideolist-slide ul li a figure {width: 100%!important; height: 300px !important;}
                    .newvideolist-slide ul li a figure img {width: 100%!important; height: 300px !important;}
                }
            `}</style>
        </>
    );
};

export default GetVideoSlider;
