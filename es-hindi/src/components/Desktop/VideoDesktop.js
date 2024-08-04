import { useRef, useEffect, useState, useCallback, useContext } from "react";
import getConfig from "next/config";
import { useInView } from "react-intersection-observer";
import VideoDesktopStyles from "./VideoDesktop.module.css";
import VideoArticleCard from "widgets/Common/Responsive/VideoArticleCard";
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { pageEvents } from "includes/article.util";
import Head from "next/head";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import LazyLoadImage from "components/Common/CustomImage";
import { getArticleList, getHomeTopNews } from "api/global/Common";
import { getCompleteURL } from 'util/global/Helper';
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";
import LazyLoad from "react-lazyload";
import dynamic from "next/dynamic";
import HindiGlobalContext from "HindiGlobalContext";
const TopToolBar = dynamic(() => import("./common/TopToolBar"));


const featureTime = (fTime) => {
    const r = new Date(fTime);
    return (
        r.toLocaleDateString('en-us', { month: 'long', day: '2-digit' }) + "th, " + r.toLocaleDateString('en-us', { year: 'numeric' }) + ", " + ("0" + r.getHours()).slice(-2) + ':' + ("0" + r.getMinutes()).slice(-2) + ':' + ("0" + r.getSeconds()).slice(-2) + " IST"
    );
};

const getGalleryAd = (storyId, adInd) => {
    return (
        <div className="phtadd clearfix">
            <SiteAd
                slotId={`Desktop_Static_Ad_Btf_728x90_${storyId}_${adInd}`}
                adUnit="NW18_HIND_Desktop/NW18_HIND_VIDEO/NW18_HIND_VIDEO_AS/NW18_HIND_VID_AS_ROS_BTF_728"
                sizes={[[728, 90], [1, 1]]}
                width={728}
                height={90}
                loadonScroll={true}
            />
        </div>
    );
};

const VideoDesktop = (props) => {
    const { publicRuntimeConfig } = getConfig();
    const { isAjax = false } = props;
    const callFired = useRef(false);
    const { articleData = {}, category, paramObj, youtubeChannelPlaylist, youtubeChannel, video_category, photoStories = [], topStories = [], videoTitle, breadCrumbArray, finalURL } = props.topPriorityData || {};
    const {
        headline,
        author_byline: authorByline = {},
        publish_by: publishedBy = [],
        weburl = "",
        byline,
        fms_autopublished,
        section,
        auto_youtube_import,
        story_id: storyId,
        ff_source = "",
        ff_author_name,
        disclaimer,
    } = articleData;

    const { ref, inView, entry } = useInView({
        threshold: 0.5,
    });

    const [currentArticle, setCurrentArticle] = useState([]);
    const [topNewsData, setTopNewsData] = useState([]);
    const [tempScrollY, setScrollY] = useState(0);
    const { handleNotificatonOnScroll } = useContext(HindiGlobalContext);
    const setCurrentArticleId = (id) => {
        currentArticle != id && setCurrentArticle(id);
    };
    const outBrainUrl = (articleData.url || weburl).replace(/https:\/\/(stg|beta)?hindi.news18.com\//, publicRuntimeConfig.siteUrl);
    const { cd14Value, cd18Value, cd19value, cd20value } = props;
    const publishedByWithId = publishedBy.length ? publishedBy[0]?.english_name + "_" + publishedBy[0]?.ID : "";
    useEffect(() => {
        pageEvents({
            inView,
            entry,
            isAjax,
            authorByline,
            byline,
            fms_autopublished,
            section,
            callFired,
            url: outBrainUrl,
            headline,
            storyId,
            ff_source,
            ff_author_name,
            publishedBy: publishedBy.length ? publishedBy[0]?.english_name : '',
            articleData,
            cd14Value,
            cd18Value,
            cd19value,
            cd20value,
            publishedByWithId: publishedByWithId,
        });
        props.setCurrentArticle(storyId);
    }, [inView]);

    const videoData = async () => {
        const category_videos = { "categories.slug": `entertainment`, "post_type": "videos" };
        setTimeout(() => {
            Promise.all([
                getHomeTopNews({ count: 4, fields: 'story_id,display_headline,images,weburl_r,updated_at' }, true),
                getArticleList({ count: 4, offset: 0, filter: category_videos, fields: `story_id,display_headline,images,weburl_r,updated_at` }, true),
            ]).then((item) => {
                const tempTopNewsData = [item[0].stories, item[1]];
                setTopNewsData(tempTopNewsData);
            });
        }, 1000)

    };
    const onScroll = useCallback(() => {
        const box = document.querySelector("#video_start");
        const rect = box?.getBoundingClientRect() || {};
        const isInViewport =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        const totalHeight =
            document.querySelector("#video_content")?.clientHeight - 205;
        if (!isInViewport) {
            const totalScroll = document.documentElement.scrollTop - 215;
            if (totalHeight >= totalScroll) {
                const percentage = Math.ceil((totalScroll / totalHeight) * 100);
                if (
                    document.getElementsByClassName("fixtb_wrap")?.[0] &&
                    document.getElementsByClassName("prog_bar")?.[0]
                ) {
                    document.getElementsByClassName("fixtb_wrap")[0].style.display =
                        percentage > 0 ? "flex" : "none";
                    document.getElementsByClassName("prog_bar")[0].style.width =
                        percentage >= 0 ? percentage + "%" : "0%";
                    if (document.getElementsByClassName("prog_bar")[0].style.width =
                        percentage >= 0) {
                        handleNotificatonOnScroll(false);
                    }
                }
            }
        } else {
            if (
                document.getElementsByClassName("fixtb_wrap")?.[0] &&
                document.getElementsByClassName("prog_bar")?.[0]
            ) {
                document.getElementsByClassName("fixtb_wrap")[0].style.display = "none";
                document.getElementsByClassName("prog_bar")[0].style.width = "0%";
                handleNotificatonOnScroll(true);
            }
        }
        const { pageYOffset } = window;
        setScrollY(pageYOffset);
    }, []);

    useEffect(() => {
        let checkTopNewsData = 0;

        const addClass = () => {
            const windowOffset = parseInt(window.pageYOffset);
            if (windowOffset >= 100 && checkTopNewsData == 0) {
                videoData();
                checkTopNewsData = checkTopNewsData + 1;
            }
        };
        document.addEventListener('scroll', addClass);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll, { passive: true });
        };
    }, [tempScrollY]);

    const relatedPlaylist = youtubeChannelPlaylist;
    let relatedstories = [];
    if (relatedPlaylist?.playlist?.total > 0) {
        relatedstories = relatedPlaylist.playlist.stories.filter((story) => {
            return story.id != storyId;
        }).map((story) => {
            return {
                id: story.id,
                headline: story.title,
                posturl: story.url,
                thumbnail: story.thumbnail
            };
        });
    }

    let catValue = '';
    const allSlashSplitted = weburl?.split('/');

    if (allSlashSplitted?.[3] === 'news') {
        catValue = allSlashSplitted?.[4];
    } else if (allSlashSplitted?.[3] === 'photogallery') {
        catValue = allSlashSplitted?.[4];
    } else if (allSlashSplitted?.[3] === 'videos') {
        catValue = allSlashSplitted?.[4];
    } else if (allSlashSplitted?.length === 4 && !allSlashSplitted[1]) {
        catValue = "Home";
    } else {
        catValue = props?.data?.category;
    }

    if (!isAjax) {
        return (
            <>
                <Head>
                    <meta name="robots" content="max-image-preview:large" />
                </Head>
                <TopToolBar
                    headline={headline}
                    url={ outBrainUrl || finalURL}
                    articleId={storyId}
                    pageType="videos"
                />
                <div className={VideoDesktopStyles.video_page}>
                    <div className={VideoDesktopStyles.container}>
                        <div className={VideoDesktopStyles.video_container}>
                            <div className={VideoDesktopStyles.video_page_left}>
                                <BreadcrumbCommon breadCrumbArray={breadCrumbArray} />
                                <div onMouseOver={() => { setCurrentArticleId(storyId); }} ref={ref} id="video_content">
                                    <div id="video_start"></div>
                                    <VideoArticleCard
                                        articleData={articleData}
                                        isMobile={false}
                                        channelLogo={youtubeChannel?.channel?.thumbnail?.url || articleData?.auto_youtube_import?.nw_auto_yt_feed_channel_thumbnail || articleData?.video_encode?.thumbnail_url}
                                        categoryName={paramObj?.subCat}
                                        catVideoTrack={props?.catVideoTrack}
                                        videoTitle={videoTitle}
                                        videoId={auto_youtube_import?.nw_auto_yt_feed_id || articleData?.video_details?.video_id}
                                        pageAds={props.pageAds}
                                    />
                                </div>
                                <div className="disclaimerText">
                                    {disclaimer}
                                </div>

                                {/* Advertisement BTF_728*/}
                                <div className={VideoDesktopStyles.middlead}><LazyLoad once offset={300}>{getGalleryAd(storyId, 1)}</LazyLoad> </div>

                                {/* Infinitescroll videos start */}
                                {/* {typeof auto_youtube_import != "undefined" && relatedstories.length > 0 && (
                                    <LazyLoad once>
                                        <ArticleAjax
                                            key={"infinite"}
                                            articles={relatedstories}
                                            pageAds={props.pageAds}
                                            setCurrentArticle={props.setCurrentArticle}
                                            comp={VideoDesktop}
                                            cat={category}
                                            isMobile={false}
                                            dtype={"video"}
                                            cd14Value={cd14Value}
                                            cd18Value={cd18Value}
                                            cd19value={cd19value}
                                            cd20value={cd20value}
                                        />
                                    </LazyLoad>
                                )} */}
                                {/* Infinitescroll videos ends */}

                                {/* Outbrain start here */}
                                {/* {<Outbrain widgetId="AR_6" widgetSrc={outBrainUrl} />} */}
                                {/* Outbrain end here */}
                                <div className="ost_outer">
                                    <LazyLoad once offset={500}>
                                        {topNewsData.length > 0 && topNewsData.map(
                                            (dataArraySecond, index) =>
                                                dataArraySecond?.length < 1 ? (
                                                    ""
                                                ) : (
                                                    <>
                                                        <div className="ost_heading">
                                                            <h2 >
                                                                {index !== 0 ? <a
                                                                    href={video_category[index]["slug"]}
                                                                    className="ost_mttl"
                                                                >
                                                                    {video_category[index]["title"]}
                                                                </a> : <span className="ost_mttl">TOP HINDI NEWS</span>}
                                                            </h2>
                                                            {index !== 0 && <a
                                                                href={"/videos/" + video_category[index]["slug"]}
                                                                target="_blank"
                                                                className="read_more_links_top"
                                                            >
                                                                {" "}
                                                                और भी देखें<div className="arrows"></div>
                                                            </a>}
                                                        </div>
                                                        <ul className="slides">
                                                            {dataArraySecond?.length > 0 && dataArraySecond.slice(0, 4)?.map((storyArraySecond, index) => (
                                                                <li className="slide">
                                                                    <a
                                                                        href={getCompleteURL(storyArraySecond["weburl_r"], storyArraySecond["weburl"])}
                                                                        className="ost_thumb"
                                                                    >
                                                                        <div className="ost_img">
                                                                            <LazyLoadImage
                                                                                src={storyArraySecond?.images?.url}
                                                                                width={210}
                                                                                height={140}
                                                                                alt={storyArraySecond["display_headline"] || storyArraySecond["headline"]}
                                                                                title={storyArraySecond["display_headline"] || storyArraySecond["headline"]}
                                                                                isLazyLoad={true}
                                                                            />
                                                                            <div className="v_icon"></div>
                                                                        </div>
                                                                        <div className="ost_pdate">
                                                                            {featureTime(storyArraySecond?.updated_at)}
                                                                        </div>
                                                                        <div className="ost_copy">
                                                                            {storyArraySecond["display_headline"]}
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )
                                        )}
                                    </LazyLoad>
                                </div>
                                <Taboola mode={TaboolaList.videoPage.bottom.mode}
                                    id={TaboolaList.videoPage.bottom.id}
                                    container={TaboolaList.videoPage.bottom.container}
                                    placement={TaboolaList.videoPage.bottom.placement}
                                    isMobile={false}
                                />
                            </div>
                            {/* Side bar start here */}
                            <LazyLoad once offset={100} height={200}>
                                <RhsCommon section="video" pageAds={props.pageAds} currentURL={outBrainUrl} photoStories={photoStories} topStories={topStories} taboolaList={TaboolaList.videoPage} />
                            </LazyLoad>
                            {/* Side bar end here */}
                        </div>
                    </div>
                </div>
                <style jsx global>
                    {`
                        .disclaimerText { padding: 10px; color:#000; font-weight: bold; font-style: italic;  }
                        .outer{
                            margin: auto;
                            max-width: 1245px;
                            padding: 0 10px;
                            position: relative;
                            z-index: 1;
                        }
                        .brade_crum {
                            font-size: 14px;
                            color: #404040;
                            text-transform: uppercase;
                            line-height: 18px;
                            font-weight: 700;
                            position: relative;
                        }
                        .brade_crum a {
                            color: #404040;
                            font-weight: 400;
                        }
                        .video_black_cont {
                            width: 100%;
                            background: #101010;
                            padding: 15px;
                            box-sizing: border-box;
                            margin-bottom: 20px;
                            box-shadow: 0 0 8px 2px rgb(0 0 0 / 10%);
                            position: relative;
                            z-index: 1;
                        }
                        .video_top_play {
                            float: left;
                            width: 865px;
                            position: relative;
                        }
                        .video_top_discription {
                            float: right;
                            width: 325px;
                            color: #fff;
                            position: relative;
                            height: 500px;
                        } 
                        .video_top_discription .meta {
                            font-size: 12px;
                            line-height: 1.2;
                            color: #aaa;
                            text-transform: uppercase;
                            padding: 8px 0 16px 0;
                        }
                        .video_top_discription .meta span, .video_top_discription .meta span a {
                            color: #ee1b21;
                        }
                        .parascrl {
                            height: 70px;
                            overflow: hidden;
                        }
                        .parascrl h2 {
                            position: relative;
                            overflow: auto;
                            font-size: 16px;
                            line-height: 24px;
                            width: 104%;
                            height: 70px;
                        }
                        .autorcont {
                            color: #ee1b21;
                            font-size: 13px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin: 10px 0 5px 0;
                        }
                        .autorcont .author {
                            color: #ee1b21;
                            font-size: 13px;
                        }
                        .autorcont .webshare {
                            display: flex;
                            align-items: center;
                        }
                        .autorcont .webshare a {
                            margin-left: 10px;
                            transform: scale(.8);
                        }

                        .section-blog-left {
                            width: calc(100% - 325px);
                            float: left;
                        }
                        .post_control {
                            border-bottom: solid 1px #eee;
                            padding-bottom: 8px;
                            margin-bottom: 20px;
                            z-index: 99;
                            position: relative;
                        }
                        .justify-space-betwwen {
                            justify-content: space-between;
                        }
                        .dflex {
                            display: flex;
                        }
                        .post_control-btn a {
                            display: inline-block;
                            padding: 12px 25px;
                            color: #ffe7e4;
                            font-size: 14px;
                            font-weight: 700;
                            text-transform: uppercase;
                            background: #e20a17;
                        }
                        .post_control-btn a:last-child {
                            background: #ccc!important;
                            color: #000!important;
                        }
                        .post_control-btn a {
                            display: inline-block;
                            padding: 12px 25px;
                            color: #ffe7e4;
                            font-size: 14px;
                            font-weight: 700;
                            text-transform: uppercase;
                            background: #e20a17;
                        }
                        .droplist {
                            display: inline-block;
                            position: absolute;
                            right: 0;
                            top: 0;
                            cursor: pointer;
                            display: inline-block;
                            padding: 12px 35px 12px 25px;
                            color: #000;
                            font-size: 14px;
                            font-weight: 700;
                            text-transform: uppercase;
                            background: #ccc;
                        }
                        .droplist ul {
                            background: #fff;
                            width: 100%;
                            position: absolute;
                            top: 40px;
                            left: 0;
                            z-index: 2;
                            line-height: 20px;
                            border-bottom: 5px solid #ee1b24;
                            box-shadow: 1px 2px 4px #767676;
                            display: none;
                        }
                        .droplist ul li a {
                            color: #000;
                            font-size: 14px;
                            line-height: 1.4;
                            padding: 12px 10px;
                            display: block;
                        }
                        .data-list-cat {
                            position: relative;
                            margin: 0 1% 25px 1%;
                            width: 23.2%;
                            height: 220px;
                            overflow: hidden;
                            float: left;
                        }
                        .data-list-cat figure {
                            position: relative;
                            line-height: 0;
                            overflow: hidden;
                        }
                        .data-list-cat figure img {
                            width: 100%;
                        }
                        .data-list-cat h6 {
                            padding: 10px 0 5px 0;
                            font-size: 14px;
                            text-transform: uppercase;
                        }
                        .data-list-cat h6 a {
                            color: #e20a17;
                        }
                        .data-list-cat p {
                            font-size: 16px;
                            line-height: 1.45;
                        }
                        .data-list-cat p a {
                            color: #232323;
                        }
                        .ost_outer {
                            display: block;
                            position: relative;
                            margin-bottom: 30px;
                            height:640px;
                          }
                          .ost_heading {
                            display: flex;
                            justify-content: space-between;
                            height: 27px;
                            border-bottom: #e1261d solid 3px;
                            position: relative;
                            margin-bottom: 16px;
                          }
                          .ost_mttl {
                            font-size: 22px;
                            line-height: 27px;
                            font-weight: bold;
                            color: #e1261d;
                            text-transform: uppercase;
                            display: inline-block;
                            background: white;
                            padding-right: 6px;
                            position: absolute;
                            bottom: -9px;
                            left: 0;
                            margin: 0;
                          }
                          .ost_sldr {
                            position: relative;
                          }
                          .ost_sldr .track {
                            overflow: hidden;
                            margin-bottom: 10px;
                          }
                          .slides {
                            display: flex;
                            margin: 0;
                            padding: 0;
                            justify-content: space-between;
                          }
                          .slides li {
                            width:210px;
                            flex-shrink:0;
                          }
                            .v_icon {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: url("https://images.news18.com/static_news18/pix/ibnhome/news18/images/v-icon.svg")
                              no-repeat center center;
                            z-index: 1;
                          }
                          .ost_thumb {
                            display: block;
                            background: #f4f4f2;
                            border-bottom: #d2d2d2 solid 1px;
                            width: 100%;
                            height: 100%;
                          }
                          .ost_img {
                            position: relative;
                            margin-bottom: 10px;
                            overflow:hidden;
                            line-height:0;
                          }
                          .ost_img img {
                            width: 100%;
                          }
                          .ost_img:before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: #000000;
                            opacity: 0.3;
                          }
                          .ost_img .v_icon {
                            background-size: 42px;
                          }
                          .ost_pdate {
                            font-size: 11px;
                            line-height: 22px;
                            color: #7b7b7b;
                            padding: 0 10px;
                            margin-bottom: 5px;
                          }
                          .ost_copy {
                            font-size: 14px;
                            line-height: 22px;
                            font-weight: bold;
                            color: #282828;
                            padding: 0 10px 15px;
                          }
                          .ost_sldr .arrow {
                            width: 25px;
                            height: 33px;
                            background: #e1261d;
                            box-shadow: 0px 3px 6px #00000029;
                            border: none;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0;
                            padding: 0;
                            cursor: pointer;
                            position: absolute;
                            top: 49px;
                            z-index: 1;
                          }
                          .read_more_links,.read_more_links_top{font-size:14px;line-height:19px;font-weight:500;color:#eb3d3c;width:130px;position:relative;letter-spacing:-.28px;cursor:pointer;text-align:center}.video_breadcrumbs ul{font-family:'Noto Sans',sans-serif;display:flex;color:#085085;align-items:center;font-size:15px}.video_breadcrumbs ul li:first-child,ul.furthered-news-content li:first-child{padding-left:0}.video_breadcrumbs ul li{padding:0 8px}.video_breadcrumbs ul li h1{font-size:15px}.video_breadcrumbs ul li a{color:#8e8e8e;text-decoration:none}.read_more_links{display:block;font-family:"Noto Sans",devanagari;margin:10px auto}.read_more_links .arrows,.read_more_links_top .arrows{position:absolute;top:10px;right:15px;width:12px;height:1px;background-color:#eb3d3c}.read_more_links .arrows:after,.read_more_links .arrows:before,.read_more_links_top .arrows:after,.read_more_links_top .arrows:before{content:"";position:absolute;width:7px;height:1px;top:-2px;right:-1px;background-color:#eb3d3c;transform:rotate(45deg)}.read_more_links .arrows:after,.read_more_links_top .arrows:after{top:2px;transform:rotate(-45deg)}.read_more_links_top{display:block}
                       
                        
                    `}
                </style>
            </>
        )
    } else {
        return (
            <>
                {typeof auto_youtube_import !== "undefined" ?
                    <div onMouseOver={() => { setCurrentArticleId(storyId); }} ref={ref} >
                        <VideoArticleCard
                            articleData={articleData}
                            isMobile={false}
                            channelLogo={articleData?.auto_youtube_import?.w_auto_yt_feed_channel_thumbnail ||
                                articleData?.video_encode?.thumbnail_url
                            }
                            categoryName={paramObj?.subCat}
                            catVideoTrack={props?.catVideoTrack || catValue}
                            videoTitle={videoTitle || articleData?.display_headline}
                            videoId={articleData?.video_encode?.mongo_id || auto_youtube_import?.nw_auto_yt_feed_id}
                        />
                    </div>
                    : ""
                }
                {/* <Taboola mode={TaboolaList.videoPage.bottom.mode}
                 id ={TaboolaList.videoPage.bottom.id}
                 container={TaboolaList.videoPage.bottom.container}
                  placement = {TaboolaList.videoPage.bottom.placement}
                /> */}
            </>
        )
    }
};

export default VideoDesktop;
