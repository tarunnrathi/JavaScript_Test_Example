import { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import Heading from "../Heading";
import { getArticlesByPriorityData } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";
import ReadMore from "../common/ReadMore";
import Skeleton from "components/Common/CustomSkeleton";
import GlideBtn from "components/Common/GlideBtn";
import { SUBCATEGORYS } from "api/Constant";
import LazyLoadImage from "components/Common/CustomImage";

const PhotoGallery = ({
    categoryLink,
    heading,
    data = [],
    category,
    // buttonType = false,
    isAmp = false
}) => {
    const [photogalleryNews, setPhotogellaryNews] = useState(data.length > 0 ? data : []);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(category);

    const filterDataByCategory = async (cat) => {
        setActive(cat);
        setLoading(true);
        let categorySlug = '';
        let subSection = 'photogallery';
        let section = "home";
        if(cat !== 'photogallery') {
        categorySlug = { 'post_type': 'photogallery', 'categories.slug': cat }
        subSection = cat;
        section = "photogallery";
        } else {
        categorySlug = { 'post_type': 'photogallery' }      
        }
        const photogalleryData = await getArticlesByPriorityData({ count: 5, section: section, subSection: subSection, filter: categorySlug }, true);
        if (photogalleryData && photogalleryData.length) {
            setPhotogellaryNews(photogalleryData);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (document.getElementsByClassName('nwphoto-slide-in').length) {
            new Glide(document.querySelector('.nwphoto-slide-in'), {
                autoplay: false,
                type: 'carousel',
                perView: 1.5,
                focusAt: 'center',
                gap: 15,
                slidesToScroll: 1,
            }).mount();
        }
    }, [photogalleryNews]);

    const getSubMenus = category => {
        const result = SUBCATEGORYS[category];
        if(result?.children && result?.children.length > 0) {
            return result?.children;
        }
      };

    const topMenu = getSubMenus(category);

    return (
        <>
            <Heading
                heading={heading}
                categoryLink={categoryLink}
            />

            <ul className="listnavitem">
                {
                    topMenu && topMenu.length > 0 && topMenu.map((item, index) => {
                        return (
                            <li className={active === item.slug ? 'active' : ''} key={`photogalleryNav-` + index} onClick={() => filterDataByCategory(item.slug)} ><a>{item.label}</a></li>
                        );
                    })
                }
            </ul>

            <div className="nwphoto-slide">
                <div className="nwphoto-slide-in">
                    <div data-glide-el="track">
                        {
                            !loading ? (
                                <ul>
                                    {
                                        photogalleryNews.map((item, index) => {
                                            const width = 245;
                                            const height = 163;
                                            const imageSrc = item?.images?.url;
                                            const title = item?.display_headline || item?.headline;
                                            return (
                                                <li key={`photogalleryItem-` + index}>
                                                    <a href={getCompleteURL(item?.weburl_r, item?.weburl)}>
                                                        {
                                                            isAmp ?
                                                                <figure>
                                                                    <amp-img
                                                                        width={width}
                                                                        height={height}
                                                                        src={imageSrc}
                                                                        alt={title}
                                                                        title={title}
                                                                        layout="responsive"
                                                                    ></amp-img>
                                                                </figure>
                                                                :
                                                                <figure>
                                                                    <LazyLoadImage
                                                                        width={width}
                                                                        height={height}
                                                                        src={imageSrc}
                                                                        alt={title}
                                                                        title={title}
                                                                    />
                                                                </figure>
                                                        }
                                                        <figcaption>
                                                            <div>
                                                                <span>
                                                                    <img src="/images/siteimages/newphotoicon_1669352291.png" alt="" />
                                                                    +{item?.gallery_count} Photos
                                                                </span>
                                                                <span>{active.replace("photogallery__", "").toUpperCase()}</span>
                                                            </div>
                                                            <h3>{title}</h3>
                                                        </figcaption>
                                                    </a>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            ) : (
                                <Skeleton height={312} />
                            )
                        }
                    </div>
                    <GlideBtn
                        data={data}
                        className={`trndstorynewbullet`}
                    />
                </div>
                <div className="newpwhitebgbtn">
                    <ReadMore
                        categoryLink={categoryLink}
                        heading={`और भी पढ़ें`}
                        buttonType={true}
                    />
                </div>
            </div>

            <div className="vsp20 clearfix"></div>
            <style jsx global>{`
                    .newpwhitebgbtn {
                        margin: 10px 10px 0 10px;
                    }
                    .newpwhitebgbtn {
                        background: #fff;
                        padding: 5px 0 0 0;
                    }
                    .vsp20 {
                        height: 20px;
                        line-height: 0;
                    }
                   .nwphoto-slide {
                     position: relative;
                     background: #F5F5F5;
                     padding-bottom: 10px;
                   }
               
                   .nwphoto-slide-in {
                     overflow: hidden;
                     position: relative;
                     z-index: 3;
                   }
               
                   .nwphoto-slide-in ul {
                     display: flex;
                     margin-bottom: 10px;
                     padding: 10px 0;
                   }
               
                   .nwphoto-slide-in ul li {
                     position: relative;
                     background: #FFFFFF;
                     box-shadow: 0px 3px 6px #00000029;
                     border-radius: 4px;
                   }
               
                   .nwphoto-slide-in ul li a figure {
                     width: 100% !important;
                   }
               
                   .nwphoto-slide-in ul li a figure img {
                     width: 100% !important;
                     height: 100% !important;
                     border-radius: 4px 4px 0 0;
                     height: 100% !important;
                   }
               
                   .nwphoto-slide-in ul li a figcaption {
                     padding: 5px 10px 10px 10px;
                   }
               
                   .nwphoto-slide-in ul li a figcaption h3 {
                     color: #000;
                     line-height: 22px;
                     font-size: 15px;
                     height: 42px;
                     overflow: hidden;
                   }
               
                   .nwphoto-slide-in ul li a figcaption div {
                     margin-bottom: 5px;
                   }
               
                   .nwphoto-slide-in ul li a figcaption div span {
                     color: #EC2028;
                     font-size: 13px;
                     line-height: 16px;
                     display: inline-block;
                     margin-right: 10px;
                   }
               
                   .nwphoto-slide-in li a figcaption div span:last-child:before {
                     content: "";
                     width: 4px;
                     height: 4px;
                     background: #A5A5A5;
                     display: inline-block;
                     position: relative;
                     margin-right: 10px;
                     top: -3px;
                     border-radius: 100%;
                   }
               
                   .nwphoto-slide-in li a figcaption div span img {
                     vertical-align: sub;
                     display: inline-block;
                     margin-right: 5px;
                   }
               
                   .newpwhitebgbtn {
                     margin: 10px 10px 0 10px;
                   }
                   .trndstorynewbullet {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    margin-top: 5px;
                  }
              
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
                  .nwphoto-slide-in ul li a figcaption div span {
                    color: #EC2028;
                    font-size: 13px;
                    line-height: 16px;
                    display: inline-block;
                    margin-right: 10px;
                }
                @media screen and (min-device-width: 480px) and (max-device-width: 1024px)  and (orientation: landscape) {
                    .nwphoto-slide-in ul li a figure {
                        width: 100%!important;
                        height: 300px !important;
                    }
                    .nwphoto-slide-in ul li a figure img {
                        width: 100%!important;
                        height: 300px !important;
                    }
                }
            `}</style>
        </>
    );
};

export default PhotoGallery;
