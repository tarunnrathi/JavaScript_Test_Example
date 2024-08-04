import Heading from "../Heading";
import Skeleton from "components/Common/CustomSkeleton";
import { getArticles } from "api/individual/Home";
import { useEffect, useState } from "react";
import { getCompleteURL } from "util/global/Helper";
import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";
import ArticleListTopNav from "./ArticleListTopNav";
import ReadMore from "../common/ReadMore";

const GetArticleSideBar = ({
    heading,
    isSubMenu,
    category,
    isAmp = false,
    categoryLink,
    data = []
}) => {

    const [isLoading, setLoading] = useState(false);
    const [getData, setGetData] = useState(data);
    // const [getGategory, setGetGategory] = useState(category);
    const [active, setActive] = useState(category);
    const [dataList, setDataList] = useState({
        top: getData.slice(0, 1),
        bottom: getData.slice(1, 5),
    });

    const filterDataByCategory = async(slug) => {
        setActive(slug);
        setLoading(true);
        const result = await getArticles({ count: 5, category: slug }, true);
        if(result.length > 0) {
            setGetData(result);
            setDataList({
                top: result.slice(0, 1),
                bottom: result.slice(1, 5)
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if(data.length === 0) {
            filterDataByCategory(category);
        }
    }, []);

    const topMenu = [
        {
            'id': 1,
            'url': 'सभी',
            'slug': category,
            'label': 'सभी'
        },
        {
            'id': 3,
            'url': '/news/sarkari-naukri/',
            'slug': 'sarkari-naukri',
            'label': 'सरकारी नौकरी'
        },
        {
            'id': 4,
            'url': '/news/bank-vacancy/',
            'slug': 'bank-vacancy',
            'label': 'बैंकिंग'
        },
        {
            'id': 5,
            'url': '/news/indian-army-vacancy/',
            'slug': 'indian-army-vacancy',
            'label': 'आर्मी'
        },
        {
            'id': 6,
            'url': '/news/teacher-vacancy/',
            'slug': 'teacher-vacancy',
            'label': 'टीचिंग'
        },
        {
            'id': 7,
            'url': '/news/railway-vacancy/',
            'slug': 'railway-vacancy',
            'label': 'रेलवे'
        }
    ];

    return (
        <>
            <Heading
                heading={heading}
                categoryLink={categoryLink}
            />
            {
                isSubMenu && (
                    <ArticleListTopNav
                        topMenu = {topMenu?.length > 0 && topMenu}
                        active={active}
                        filterDataByCategory={filterDataByCategory}
                    />
                )
            }
            {!isLoading && (getData && getData.length > 0) ? (

            <div className="greybg with10pdng">
                <ul className="nwnewsstorieswithphoto forfirststorylarge withwhitebg">
                    {
                        dataList.top && dataList.top.length === 1 && dataList.top.map((item, index) => {
                            const title = item.display_headline || item.headline;
                            return (
                                <li key={heading.replace(/ /g, '')+`top`+index}>
                                    <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                                        <h2>{item.display_headline}</h2>
                                        {
                                            isAmp ?
                                                <figure>
                                                    <amp-img
                                                        src={imageLoader(item?.images?.url, 159, 106)}
                                                        alt={title}
                                                        title={title}
                                                        width={159}
                                                        height={106}
                                                        layout="responsive"
                                                    ></amp-img>
                                                </figure>
                                            :
                                                <LazyImage
                                                    width={320}
                                                    height={220}
                                                    src={imageLoader(item?.images?.url, 320, 220)}
                                                    alt={title}
                                                    title={title}
                                                    unoptimized={true}
                                                    isRes={true}
                                                    className={"globalmgbox"}
                                                />
                                        }
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>

                <ul className="nwdotstorieslist">
                {
                        dataList.bottom && dataList.bottom.length > 1 && dataList.bottom.map((item, index) => {
                            const title = item.display_headline || item.headline;
                            return (
                                <li key={heading.replace(/ /g, '')+`bottom`+index}>
                                    <a href={getCompleteURL(item.weburl_r, item.weburl)}>
                                        <h3>{title}</h3>
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
                <ReadMore
                    categoryLink={categoryLink}
                    heading={`और भी पढ़ें`}
                    buttonType={false}
                />
            </div>
            ) : (
                <Skeleton height={320} />
            )}
            <style jsx global>{`
                .mrg10 {margin: 10px;}
                .greybg{background: #F3F3F3}
                .with10pdng{padding: 10px;}
                .nwnewsstorieswithphoto li{border-top: 1px solid #e0e0e0;padding: 12px 10px; position: relative;}
                .nwnewsstorieswithphoto li:first-child{border-top: none;}
                .nwnewsstorieswithphoto li:last-child{border-bottom: 1px solid #e0e0e0;}
                .nwnewsstorieswithphoto li a{display: flex;}
                .nwnewsstorieswithphoto li a figure{width: 104px; height: 70px; margin-left: 12px;}
                .nwnewsstorieswithphoto li a figure img{width: 104px; height: 70px;}
                .nwnewsstorieswithphoto li a h2, .nwnewsstorieswithphoto li a h3{color: #000;line-height: 22px;font-size: 15px; width: calc(100% - 104px);}
                .nwnewsstorieswithphoto.fortopstories li a h2, .nwnewsstorieswithphoto.fortopstories li a h3{color: #000;line-height: 24px;font-size: 17px}
                .nwnewsstorieswithphoto.forfirststorylarge li:first-child{border-top: 0px solid #e0e0e0;    padding-top: 0;}
.nwnewsstorieswithphoto.forfirststorylarge li:first-child a{flex-wrap: wrap; flex-direction: column-reverse;}
.nwnewsstorieswithphoto.forfirststorylarge li:first-child a figure{width: 100%; height: 228px; margin-left: 0;margin-bottom: 5px;}
.nwnewsstorieswithphoto.forfirststorylarge li:first-child a figure img{width: 100%; height: 228px;     border-radius: 4px !important;}
.nwnewsstorieswithphoto.forfirststorylarge li:first-child a h2, .nwnewsstorieswithphoto li:first-child a h3{color: #000;line-height: 26px;font-size: 18px}

.nwnewsstorieswithphoto.forfirststorylarge.withwhitebg{}
.nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li{padding: 12px 0;}
.nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child{padding-top: 0; background: #fff; border: 1px solid #D6D6D6; border-radius: 4px;}
.nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child a h2, .nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child a h3{line-height: 22px; font-size: 15px; padding: 5px 10px 0 10px; width: 100%;}
.nwnewsstorieswithphoto.forfirststorylarge.withwhitebg li:first-child a figure{margin-bottom: 0;}
.nwdotstorieslist li{padding: 10px 15px;border-bottom: 1px solid #e0e0e0;position: relative;}
.nwdotstorieslist li:before{content: "";background: #707071;width: 5px;height: 5px;position: absolute;top: 20px;margin-top: -3px;left: 0;border-radius: 100%;}
.nwdotstorieslist li a h3{font-size: 15px;line-height: 22px;color: #000000;font-weight: normal;}      
            `}</style>
        </>
    );
};

export default GetArticleSideBar;
