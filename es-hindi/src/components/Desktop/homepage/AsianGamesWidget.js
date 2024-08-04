import ReadMoreBtn from "../common/ReadMoreBtn";
import ArticleListTopNav from "./ArticleListTopNav";
import { memo, useEffect, useState } from "react";
import Heading from "../common/Heading";
import Skeleton from "components/Common/CustomSkeleton";
import getConfig from "next/config";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import { getArticleList } from "api/global/Common";
import { SUBCATEGORYS } from "api/Constant";

const { publicRuntimeConfig } = getConfig();

const AsianGamesWidget = ({
    heading,
    isSubMenu = false,
    data = [],
    categoryLink,
    category,
    isMobile = false
}) => {
    if(data && data.length === 0) {
        return null;
    }
    const [isLoading, setLoading] = useState(false);
    const [getData, setGetData] = useState(data);
    const [active, setActive] = useState(category);
    const [subCategory, setSubCategory] = useState([]);

    const [dataList, setDataList] = useState({
        first: getData.slice(0, 1),
        second: getData.slice(1, 5),
        third: getData.slice(5, 6)
    });

    const filterDataByCategory = async(slug) => {        
        setActive(slug);
        setLoading(true);
        let post_type = 'text';
        if(slug === 'photogallery__entertainment') {
            post_type = 'photogallery';
            slug = 'entertainment';
        } else if(slug === 'videos__entertainment') {
            post_type = 'videos';
            slug = 'entertainment';
        }
        const result = await getArticleList({
            count: 6,
            offset: 0,
            filter: { post_type: post_type, 'categories.slug': slug },
            fields: `story_id,headline,images,display_headline,weburl,intro,post_type,gallery,gallery_count,weburl_r,author_byline`
        }, true);     
        if(result.length > 0) {
            setGetData(result);
            setDataList({
                first: result.slice(0, 1),
                second: result.slice(1, 5),
                third: result.slice(5, 6)
            });
        }
        setLoading(false);
    };

    const getSubMenus = async(category) => {        
        const result = SUBCATEGORYS[category];
        if(result?.children && result?.children.length > 0) {
            setSubCategory(result?.children);
        }
    };

    useEffect(() => {        
        if(isSubMenu) {
            getSubMenus(category)
        }
    }, []);

    return (
        <>
            <div className="newglblhdwrap">
                {
                    heading && (
                        <Heading
                            categoryLink={categoryLink}
                            heading={heading}
                        />
                    )
                }
                {!isMobile && isSubMenu && subCategory && subCategory.length > 0 && (
                    <ArticleListTopNav
                        topMenu = {subCategory?.length > 0 && subCategory}
                        filterDataByCategory={filterDataByCategory}
                        active={active}
                    />
                )}
            </div>
            {isMobile && isSubMenu && subCategory && subCategory.length > 0 && (
                <ArticleListTopNav
                    topMenu = {subCategory?.length > 0 && subCategory}
                    filterDataByCategory={filterDataByCategory}
                    active={active}
                />
            )}
            {!isLoading && (getData && getData.length > 0) ? (
                <div className="newsixstories">
                <ul>
                    {
                        dataList.first && dataList.first.length === 1 && dataList.first.map((firstItem, index) =>
                            <li key={heading.replace(/ /g, '')+`first`+index}>
                                <a href={getCompleteURL(firstItem?.article_details?.weburl_r, firstItem?.article_details?.weburl)}>
                                    {
                                        firstItem?.article_details?.images?.url && (
                                            <figure width={280} height={186}>
                                                <LazyLoadImage
                                                    src={firstItem?.article_details?.images?.url}
                                                    width={280}
                                                    height={186}
                                                    alt={firstItem?.article_details?.display_headline}
                                                    title={firstItem?.article_details?.display_headline}
                                                />
                                            </figure>
                                        )
                                    }
                                    <h3>{firstItem?.article_details?.display_headline}</h3>
                                    <p>{firstItem?.article_details?.headline}</p>
                                </a>
                            </li>
                        )
                    }
                </ul>

                <ul>
                    {
                        dataList.second && dataList.second.length === 4 && dataList.second.map((item, index) =>
                            <li key={heading.replace(/ /g, '')+`second`+index}>
                                <a href={getCompleteURL(item?.article_details?.weburl_r, item?.article_details?.weburl)}>
                                    {
                                        item?.article_details?.images?.url && (
                                            <figure width={80} height={54}>
                                                <LazyLoadImage
                                                    src={item?.article_details?.images?.url}
                                                    width={80}
                                                    height={54}
                                                    alt={item?.article_details?.display_headline}
                                                    title={item?.article_details?.display_headline}
                                                />
                                            </figure>
                                        )
                                    }
                                    <h3>{item?.article_details?.display_headline}</h3>
                                </a>
                            </li>
                        )
                    }
                </ul>
                <ul>
                    {
                        dataList.third && dataList.third.length === 1 && dataList.third.map((item, index) =>
                            <li key={heading.replace(/ /g, '')+`third`+index}>
                                <a href={getCompleteURL(item?.article_details?.weburl_r, item?.article_details?.weburl)}>
                                    {
                                        item?.article_details?.images?.url && (
                                            <figure width={180} height={120}>
                                                <LazyLoadImage
                                                    src={item?.article_details?.images?.url}
                                                    width={180}
                                                    height={120}
                                                    alt={item.article_details?.display_headline}
                                                    title={item.article_details?.display_headline}
                                                />
                                            </figure>
                                        )
                                    }
                                    <h3>{item?.article_details?.display_headline}</h3>
                                </a>
                            </li>
                        )
                    }
                    <li>
                        <ReadMoreBtn
                            className="moretrndstroygrey"
                            link={categoryLink}
                            label="और भी पढ़ें"
                        />
                    </li>
                </ul>
            </div>
            ) : (        
                isMobile ? (
                    <div className="newsixstories">
                        <ul>
                            <li><Skeleton height={550} /></li>
                        </ul>
                    </div>
                ) : (
                    <Skeleton height={320} />
                )
            )}

            <style jsx global>{`
                .newglblhdwrap{border-bottom: 1px solid #d9d9d9; position: relative; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: baseline;}
                .newglblhdwrap:before{content: ""; background: #ED1C24; width: 25px; height: 4px; position: absolute; left: 0; bottom: 0;}
                
                .newsixstories{display: flex; justify-content: space-between; margin-top: 10px;} 
                .newsixstories ul{flex-shrink: 0;}
                .newsixstories ul li{border-bottom: 1px solid #e0e0e0;padding: 12px 0; position: relative;}
                .newsixstories ul li a{display: flex;}
                .newsixstories ul li a figure{width: 80px; height: 54px; margin-right: 12px;box-shadow: 0px 2px 4px #0000001a; font-size: 0;}
                .newsixstories ul li a figure img{width: 80px; height: 54px !important; border-radius: 4px !important;}
                .newsixstories ul a h3{color: #000;line-height: 22px;font-size: 15px}
                .newsixstories ul:first-child{width: 280px;}
                .newsixstories ul li:first-child{padding-top: 0;}
                .newsixstories ul:first-child li:first-child{padding: 0; border-bottom:0;}
                .newsixstories ul:first-child li a{display: block;}
                .newsixstories ul:first-child li a figure{width: 280px;height: 186px; margin-bottom: 5px;}
                .newsixstories ul:first-child li a figure, .newsixstories ul:first-child li a figure img{width: 280px; height: 186px !important; border-radius: 4px !important;}
                .newsixstories ul:first-child li a h3{color: #000;line-height: 26px;font-size: 18px}
                .newsixstories ul:first-child li a p{color: #5F5F5F;line-height: 21px;font-size: 14px; display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;}
                .newsixstories ul:nth-child(2){width: 420px; padding: 0 20px; margin: 0 20px;border-left: 1px solid #e0e0e0;border-right: 1px solid #e0e0e0;}
                .newsixstories ul:last-child{width: 180px;}
                .newsixstories ul:last-child li:first-child{height: 228px; }
                .newsixstories ul:last-child li:last-child {border: none; padding-bottom: 0;}
                .newsixstories ul:last-child li a{display: block;}
                .newsixstories ul:last-child li a figure{margin-bottom: 5px;}
                .newsixstories ul:last-child li a figure, .newsixstories ul:last-child li a figure img{width: 180px;height: 120px !important;}
                .newglblhdwrap h2 a[href="${publicRuntimeConfig.siteUrl}news/sports/cricket/"] {
                    width: 100%;
                    background: url(/images/siteimages/cricket_silhouette_1669351903.svg) no-repeat 50% 50%;
                    height: 40px;
                    display: block;
                    background-position: right;
                }
                .newglblhdwrap h2, .newglblhdwrap h2 a{width:100%;}
                .moneySection {width:auto !important}
                @media (max-width:768px){
                    .newglblhdwrap{ margin:10px 10px 6px 10px; align-items: center;}
                    .newsixstories { display: block !important; margin-top: 0 !important; } .newsixstories ul:first-child { width: 100% !important; } .newsixstories ul li { padding: 12px 10px !important; position: relative; min-height: 77px;} .newsixstories ul:first-child li:first-child {padding-top: 0 !important;border-bottom: 1px solid#e0e0e0; padding-bottom: 6px !important;margin-top: 10px;} .newsixstories ul:first-child li a figure{width: 100% !important; height: 228px !important; float: none; margin-left: 0;} .newsixstories ul:first-child li a figure img{width: 100% !important; height: 228px !important;} .newsixstories ul:first-child li a h3{color: #000; line-height: 26px !important; font-size: 18px !important; margin-top: -8px; margin-bottom: 0;} .newsixstories ul:first-child li a p{display:none;} .newsixstories ul:nth-child(2) { width: 100% !important; padding: 0 !important; margin: 0 !important; } .newsixstories ul li a{display: block !important;} .newsixstories ul li a figure{float: right; display: inline-block; margin-left: 12px; margin-right: unset;} .newsixstories ul:last-child { width: 100% !important; } .newsixstories ul:last-child li:first-child{height: unset !important;} .newsixstories ul:last-child li a figure { width: 80px !important; height: 54px !important; margin-left: 12px !important; margin-bottom: 0 !important; } .newsixstories ul:last-child li a figure img { width: 80px !important; height: 54px !important; } .newsixstories ul:first-child li a figure{margin-right: unset;} .moretrndstroygrey { background: none !important; border: 0 !important; height: auto !important; }
                    .moretrndstroy{color: #fff;font-size: 14px;text-align: center;font-weight: bold;background: #E1261C;box-shadow: 0px 3px 6px #00000029;border: 1px solid #FFFFFF;border-radius: 16px;display: table;margin: 10px auto;width: 140px;height: 32px;line-height: 32px;}
                    .moretrndstroy:after{content: "";background: url(images/newiconsprite.png) -164px 0px no-repeat;width: 11px;height: 11px;display: inline-block;margin-left: 8px; filter: brightness(0) invert(1);}
                    .newglblhdwrap h2 a[href="${publicRuntimeConfig.siteUrl}news/sports/cricket/"] {                        
                        background: url(/images/siteimages/cricket_silhouette_1669351903.svg) no-repeat -25% 50%;
                    }

                    .newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a {
                        font-size: 20px;
                        line-height: 38px;
                        color: #000;
                        font-weight: bold;
                        display: flex;
                        align-items: end;
                    }
                    .newbuttonlist {
                        display: flex;
                        height: 40px;
                        background: #F4F4F4;
                        overflow: scroll;
                        align-items: center;
                        border-bottom: 1px solid #D3D2D2;
                        position: relative !important;
                        margin-bottom: 10px;
                        margin-top: 15px;
                    }
                    .newbuttonlist a {flex-shrink: 0;}
                    .newsixstories ul a h3{min-height: 44px;}
                    .moneySection em {top:0px !important}
                }
                @media screen and (min-device-width: 480px) and (max-device-width: 1024px)  and (orientation: landscape) {
                    .newbuttonlist {display: flex; height: 40px; background: #f4f4f4; overflow: scroll; align-items: center; border-bottom: 1px solid #d3d2d2;position: relative!important; margin-bottom: 10px;}
                }
            `}</style>
        </>
    );
};

export default memo(AsianGamesWidget);
