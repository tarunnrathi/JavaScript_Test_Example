import { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { getArticles } from "api/individual/Home";
import Skeleton from "components/Common/CustomSkeleton";
import { getCompleteURL } from "util/global/Helper";
import HeadingWithoutContainer from "components/Mobile/HeadingWithoutContainer";
import { TEXT } from "constant/global/Constant";
import ReadMoreWhiteBg from "components/Desktop/common/ReadMoreWhiteBg";
import LazyLoadImage from "components/Common/CustomImage";

const GetSlider = ({
    categoryLink,
    heading,
    data = [],
    category,
    // buttonType = false,
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

        if (
          document.getElementsByClassName("newfood-slide-in").length &&
          document.querySelector(`#${category}`)
        ) {
          new Glide(document.querySelector(`#${category}`), {
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
                <HeadingWithoutContainer
                    heading={heading}
                    categoryLink={categoryLink}
                />
            </div>
            {
                getData && getData.length > 0 && isLoading ? (
                    <div className="newfood-slide mrg10">
                        <div className={`newfood-slide-in`} id={category}>
                            <div data-glide-el="track">
                                <ul>
                                    {
                                        getData.map((item, index) => {
                                            const title = item.display_headline || item.headline;
                                            let imageURL = item?.images?.url;
                                            return (
                                                <li key={category+`-`+index} className={item?.local18_video!==""?category:""}>
                                                    <a href={getCompleteURL(item?.weburl_r, item?.weburl_r)}>
                                                    {isAmp ? (
                                                        <figure className="expand" width={400} height={267}>                                                            
                                                            <LazyLoadImage
                                                                src={imageURL}
                                                                width={400}
                                                                height={267}
                                                                alt={title}
                                                                title={title}
                                                                isAmp={true}
                                                            />
                                                        </figure>
                                                    ) : (
                                                        <figure width={240} height={160}>
                                                            <LazyLoadImage
                                                                src={imageURL}
                                                                width={240}
                                                                height={160}
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
                        <ReadMoreWhiteBg
                            link={categoryLink}
                            label={TEXT.READ_MORE}
                        />
                    </div>
                ) : (
                    <Skeleton height={243} />
                )
            }

            <style jsx>{`
            button {
                cursor: pointer;
                font-size: 0;
                border: 0;
                outline: none;
            }
                .newfood-slide{position: relative;background: #F5F5F5; padding: 10px;}
                .newfood-slide-in{overflow: hidden; position: relative; z-index: 3;}
                .newfood-slide-in ul{display: flex; margin-bottom: 10px; padding: 25px 0; justify-content: center;}
                .newfood-slide-in ul li{background: #FFFFFF;box-shadow: 0px 0px 4px #0000001A;border: 1px solid #DBDBDB;border-radius: 6px; position: relative; transition: all .1s ease-in-out; filter: brightness(0.2);opacity: .8;overflow: hidden; flex-shrink: 0;}
                .newfood-slide-in ul li.glide__slide--active{transform: scale(1.2); z-index: 2; transition: all .1s ease-in-out;filter: brightness(1);opacity: 1;}
                .newfood-slide-in ul li a figure{width: 100%;height: 160px; border-radius: 4px 4px 0 0;}
                .newfood-slide-in ul li a figure img{width: 100%;height: 160px;border-radius: 4px 4px 0 0;}
                .newfood-slide-in ul li a h3{padding: 5px 10px 10px 10px;color: #000000;font-size: 15px;line-height: 22px;}
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
            `}</style>
        </>
    );
};

export default GetSlider;
