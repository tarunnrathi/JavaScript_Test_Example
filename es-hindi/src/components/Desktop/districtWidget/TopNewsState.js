import LazyLoadImage from 'components/Common/CustomImage';
import { imageLoader } from 'includes/article.util';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticleList } from 'api/global/Common';
import { formatText } from 'includes/_app.util';
import NewSiteAd from 'widgets/Common/Responsive/NewSiteAd';

const TopNewsState = ({ topPriorityData: initialData }) => {

    let [topPriorityData, setTopPriorityData] = useState({
        leftCat: initialData.leftCat,
        rightCat: initialData.rightCat,
        rightCatThird: initialData.rightCatThird,
    });
    const router = useRouter();
    const { state, city } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (state) {
                const fields = "story_id,categories,section,subsection,intro,display_headline,created_at,headline,post_type,images,images_all_sizes,weburl,weburl_r,ff_source,gallery_count,agency";
                let storyList = {};
                try {
                    storyList = await getArticleList({
                        count: 6,
                        offset: 0,
                        fields,
                        filter: {
                            "categories.slug": formatText(city),
                            agency: "Local18"
                        }
                    }, true);
                    if (storyList && storyList.length < 6) {
                        storyList = await getArticleList({
                            count: 6,
                            offset: 0,
                            fields,
                            filter: {
                                "categories.slug": formatText(city)
                            }
                        }, true);
                    }
                    setTopPriorityData({
                        leftCat: storyList.slice(0, 2),
                        rightCat: storyList.slice(2, 3),
                        rightCatThird: storyList.slice(3, 6)
                    });

                } catch (error) {
                    console.error("Failed to fetch articles:", error);
                }
            }
        };

        fetchData();
    }, [state, city]);

    const { leftCat, rightCat, rightCatThird } = topPriorityData;

    return (
        <>
            <div className="lcheading">
                <h2 className="lcchild">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.607" height="12.378" viewBox="0 0 18.607 12.378">
                        <g id="Group_2178" data-name="Group 2178" transform="translate(-338 -461.622)">
                            <path id="Path_20627" data-name="Path 20627" d="M6.607,2.622h5L5,15H0Z" transform="translate(338 459)" fill="#fc0f00" />
                            <path id="Path_20628" data-name="Path 20628" d="M6.607,2.622h5L5,15H0Z" transform="translate(345 459)" fill="#fc0f00" />
                        </g>
                    </svg>
                    ताज़ा खबरें
                </h2>
                <a href={`/news/`} className="moretrndstroy">और भी पढ़ें</a>
            </div>
            <div className="top_newswrap">
                <ul className="top_nwlft">
                    {
                        leftCat?.map((item, index) => {
                            const {
                                categories,
                                images,
                                display_headline,
                                headline,
                                weburl_r,
                                created_at,
                                // intro,
                                // gallery,
                                post_type,
                                // ff_source,
                                // local18_video,
                            } = item.article_details || item || {};
                            return (
                                <li key={`pl-${index}`}>
                                    <a href={weburl_r}>
                                        <figure>
                                            <LazyLoadImage
                                                src={imageLoader(images?.url, 281, 187)}
                                                alt={display_headline || headline || ""}
                                                title={display_headline || headline || ""}
                                                width={300}
                                                height={187}
                                            />
                                            {(post_type === "photogallery") ? <img className="vid" src="/images/districts/Photo.svg" title="" alt="" /> : ""}
                                            {(post_type === "videos") ? <img className="vid" src="/images/districts/Group2202.svg" title="" alt="" /> : ""}
                                        </figure>
                                        <figcaption>
                                            <p>{categories.length > 0
                                                ? categories[0].name.replace("&amp;", "&")
                                                : "News"} <span>| {created_at && moment(created_at).format('DD MMMM YYYY')}</span></p>
                                            <section className="cricketwallah_title">{display_headline || headline}</section>
                                        </figcaption>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="top_nwmdl">
                    {
                        rightCat?.map((item, index) => {
                            const {
                                categories,
                                display_headline,
                                headline,
                                weburl_r,
                                created_at,
                                intro,
                                images,
                                // gallery,
                                post_type,
                                // ff_source,
                                // local18_video,
                            } = item.article_details || item || {};
                            return (

                                <li key={`lrdd-${index}`}>
                                    <a href={weburl_r}>
                                        <figure>
                                            <LazyLoadImage
                                                src={imageLoader(images?.url, 602, 401)}
                                                alt={display_headline || headline || ""}
                                                title={display_headline || headline || ""}
                                                width={560}
                                                height={401}
                                            />
                                            {(post_type === "videos") ? <img className="vid" src="/images/districts/Group2202.svg" title="" alt="" /> : ""}
                                            {(post_type === "photogallery") ? <img className="vid" src="/images/districts/Photo.svg" title="" alt="" /> : ""}

                                        </figure>
                                        <figcaption>
                                            <p>{categories.length > 0
                                                ? categories[0].name.replace("&amp;", "&")
                                                : "News"}
                                                <span>| {created_at && moment(created_at).format('DD MMMM YYYY')}</span></p>
                                            <section className="cricketwallah_title">{display_headline || headline}</section>
                                            <span className='desctp'>{intro}</span>
                                        </figcaption>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="top_nwrgt">
                    <li style={{height:"270px",marginTop:"10px"}}>
                        <NewSiteAd
                            slotId={"local18_ATF_300_Desktop"}
                            adUnit={"NW18_HIND_Desktop/NW18_HIND_LOCAL18_NEWS/NW18_HIND_LOCAL18_NEWS_AL/NW18_HIND_LOCAL18_NWS_AL_ROS_ATF_300"}
                            sizes={[[300, 250]]}
                            width={300}
                            height={250}
                            lazyLoad={true}
                        >
                        </NewSiteAd>
                    </li>
                    {
                        rightCatThird?.map((item, index) => {
                            const {
                                categories,
                                display_headline,
                                headline,
                                weburl_r,
                                created_at,
                                intro,
                                images,
                                // gallery,
                                post_type,
                                // ff_source,
                                // local18_video,
                            } = item.article_details || item || {};
                            return (
                                <li key={`lrddds-${index}`}>
                                    <a href={weburl_r}>
                                        <p>{categories.length > 0
                                            ? categories[0].name.replace("&amp;", "&")
                                            : "News"}
                                            <span>| {created_at && moment(created_at).format('DD MMMM YYYY')}</span></p>
                                        <section className="cricketwallah_title">{display_headline || headline}</section>
                                        {post_type === "photogallery" && <svg id="Photo" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                            <rect id="Rectangle_1563" data-name="Rectangle 1563" width="15" height="15" fill="#fff" />
                                            <path id="Path_30" data-name="Path 30" d="M15,9.415c-.022.078-.043.157-.068.235a1.4,1.4,0,0,1-1.278.968l-.19,0c-3.137,0-6.275-.006-9.412.005A1.5,1.5,0,0,1,2.6,9.734a1.427,1.427,0,0,1-.078-.613q-.008-3.486,0-6.971a2.356,2.356,0,0,1,.018-.291A1.4,1.4,0,0,1,3.855.645c.068,0,.136,0,.2,0h9.4A1.408,1.408,0,0,1,14.982,1.82c0,.008.012.015.018.022Zm-.941-2.427c0-.063.005-.09.005-.118q0-2.4,0-4.795a.471.471,0,0,0-.523-.5q-4.779,0-9.56,0a.474.474,0,0,0-.523.527q0,3.077,0,6.154c0,.035.007.07.013.124.051-.048.086-.081.12-.115q.936-.935,1.872-1.87a1.1,1.1,0,0,1,1.614,0c.235.238.473.474.717.718l.6-.718q.837-1,1.673-2.011a1.119,1.119,0,0,1,1.171-.414,1.215,1.215,0,0,1,.648.473c.715.837,1.432,1.672,2.173,2.536M3.626,9.567a.512.512,0,0,0,.4.119H12.77c.273,0,.546,0,.819,0a.459.459,0,0,0,.475-.483c0-.2-.007-.4,0-.6a.4.4,0,0,0-.112-.3q-1.411-1.639-2.817-3.284c-.156-.182-.222-.181-.378.007Q9.5,6.541,8.235,8.057a.481.481,0,0,1-.8.032q-.5-.5-.992-.992c-.163-.164-.191-.164-.353,0L3.724,9.462c-.033.033-.065.069-.1.105" fill="#ed1c24" />
                                            <path id="Path_31" data-name="Path 31" d="M10.93,14.363c-.208-.051-.547-.131-.885-.222Q5.592,12.95,1.138,11.756A1.41,1.41,0,0,1,.086,9.984Q.6,7.99,1.122,6a.47.47,0,0,1,.429-.395.433.433,0,0,1,.466.3.679.679,0,0,1,0,.341q-.5,1.95-1.011,3.9c-.1.4.013.611.411.717L10.892,13.4a.472.472,0,0,0,.648-.38c.1-.4.2-.811.3-1.217a.468.468,0,1,1,.907.22c-.1.435-.208.87-.324,1.3a1.439,1.439,0,0,1-1.495,1.039" fill="#ed1c24" />
                                            <path id="Path_34" data-name="Path 34" d="M5.648,5.006A1.246,1.246,0,1,1,6.891,3.76,1.25,1.25,0,0,1,5.648,5.006m0-.937a.309.309,0,0,0,.311-.3.312.312,0,0,0-.623-.014.31.31,0,0,0,.312.315" fill="#ed1c24" />
                                        </svg>}
                                        {
                                            post_type === "videos" && <svg id="Video1_D" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                                <rect id="Rectangle_1564" data-name="Rectangle 1564" width="15" height="15" fill="#fff" />
                                                <path id="Path_36" data-name="Path 36" d="M15,3.72v7.559a.508.508,0,0,0-.028.08,2.191,2.191,0,0,1-2.165,1.853q-5.307,0-10.614,0A2.194,2.194,0,0,1,.072,11.574c-.026-.1-.048-.2-.072-.3V3.72a.5.5,0,0,0,.027-.08A2.19,2.19,0,0,1,2.178,1.788q5.322-.006,10.644,0a2.184,2.184,0,0,1,2.1,1.61c.03.107.055.215.082.322M7.485,12.334h5.243a1.321,1.321,0,0,0,1.393-1.385q0-3.449,0-6.9a1.321,1.321,0,0,0-1.392-1.385H2.271a1.321,1.321,0,0,0-1.392,1.4v6.87a1.322,1.322,0,0,0,1.407,1.4h5.2" fill="#ed1c24" />
                                                <path id="Path_40" data-name="Path 40" d="M5.742,7.5c0-.708,0-1.416,0-2.124a.471.471,0,0,1,.23-.457.463.463,0,0,1,.508.048Q8.164,6.025,9.852,7.079a.452.452,0,0,1,0,.841Q8.167,8.976,6.479,10.03a.463.463,0,0,1-.508.05.47.47,0,0,1-.231-.456c0-.707,0-1.415,0-2.123m.886,1.4,2.24-1.4L6.628,6.1Z" fill="#ed1c24" />
                                            </svg>
                                        }
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <style jsx>{`
            .lcheading {border-bottom: 1px solid #d9d9d9;position: relative;margin-bottom: 6px; display: flex; justify-content: space-between;align-items: baseline;}
            .lcheading .lcchild, .lcheading .lcchild a {font-size: 20px;line-height: 38px; color: #000; font-weight: bold;display: flex; align-items: baseline;}	
            .lcchild svg {margin-right: 5px;}
            .moretrndstroy {color: #E82D2E; font-size: 14px; display: block; text-align: center; line-height: 24px; font-weight: bold;}
            .moretrndstroy:after {content: ""; background-image: url(/images/districts/Path114.svg);background-repeat: no-repeat; width: 11px;height: 11px; display: inline-block; margin-left: 6px;}

            .top_newswrap{display: flex;width: 100%; justify-content: space-between; margin-bottom: 30px;}
            .top_newswrap a {color: #101010;}
            .top_nwlft, .top_nwrgt {width: 300px;}
            .top_nwmdl{width: 610px; padding: 0 20px; border-left: 1px solid #C7C7C7; border-right: 1px solid #C7C7C7; text-align: center;}
            .top_nwlft li{width: 100%; display: block; border-bottom: 1px #dadada solid; margin-bottom: 20px;}			
            .top_nwlft li figure, .top_nwlft li figure img { width: 100%; height: 187px;box-shadow: 0px 2px 4px #0000003b;}
            .top_nwlft li figure {position: relative;}
            .top_nwlft li a section {font-size: 18px; font-weight: 600; line-height: 26px; letter-spacing: -0.36px; margin: 4px 0 8px;}
            .top_newswrap li a p {color: #FC0F00; font-size: 14px; line-height: 22px; margin-top: 7px;}
            .top_newswrap li a p span {color: #908E8E; margin-left: 4px;}			
            .top_nwmdl li img {width: 100%;height: 401px;}
            .top_nwmdl a section {font-size: 26px; font-weight: 600; line-height: 34px; font-weight: bold;margin: 7px 0;}
            .top_nwmdl a .desctp {font-size: 14px; line-height: 21px; color: #5F5F5F;}
            .top_nwrgt li {border-bottom: 1px solid #C7C7C7; padding: 7px 20px 8px 0; position: relative;}
            .top_nwrgt a section { font-size: 16px; font-weight: 600; line-height: 26px;}
            .top_nwrgt a svg { position: absolute;  right: 0; top: 43%;}
            .top_newswrap a section {display: -webkit-box; font-weight: 600; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;}
            .top_nwlft li:last-child {margin-bottom: 0;}
            .top_nwrgt li:last-child {margin-bottom: 0;}
            .top_nwlft li:last-child, .top_nwrgt li:last-child {border-bottom: 0;}
            .top_newswrap a .vid {position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: 0 auto;
                width: 35px!important;
                height: auto !important;
                box-shadow: none !important;
                margin: auto;
            }
            .top_nwrgt li:first-child {
                padding: 0;
            }
        `}</style>
        </>
    )
};

export default TopNewsState;