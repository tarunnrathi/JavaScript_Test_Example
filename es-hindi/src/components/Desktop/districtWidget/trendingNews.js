import { getArticleList } from "api/global/Common";
import LazyLoadImage from "components/Common/CustomImage";
import { imageLoader } from "includes/article.util";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const topSlider = [
    { label: "मनी 18", key: "money18" },
    { label: "फ़ूड 18", key: "food18" },
    { label: "लाइफ़ 18", key: "life18" },
    { label: "रिलिजियन 18", key: "religion18" },
    { label: "ट्रैवेल 18", key: "travel18" },
    { label: "जॉब्स 18", key: "jobs18" },
];
const TrendingNews = ({ data, aurPadheLink }) => {
    const [active, setActive] = useState(0);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const filterDataByCategory = async(slug, index) => { 
        setActive(index);
        setLoading(true)
        const result = await getArticleList({ count: 6, offset: 0,
            filter: { "tags.slug": slug, /*"categories.slug": subsection*/ }, fields: `story_id,intro,display_headline,headline,images,categories,images,weburl_r,weburl`}, true);     
        if(result.length > 0) {
            setDataList(result);
            setLoading(false);
        }
    };

    useEffect(() => {
        setDataList(data);
    }, [data]);
    if(data.length === 0) {
        return null;
    }
    const first = dataList.slice(0, 1);
    const second = dataList.slice(1, 5);
    const third = dataList.slice(5, 6);
    return (<>
    <div className="lcheading">
					<h2 className="lcchild">
						<svg xmlns="http://www.w3.org/2000/svg" width="18.607" height="12.378" viewBox="0 0 18.607 12.378">
						  <g id="Group_2178" data-name="Group 2178" transform="translate(-338 -461.622)">
							<path id="Path_20627" data-name="Path 20627" d="M6.607,2.622h5L5,15H0Z" transform="translate(338 459)" fill="#fc0f00"/>
							<path id="Path_20628" data-name="Path 20628" d="M6.607,2.622h5L5,15H0Z" transform="translate(345 459)" fill="#fc0f00"/>
						  </g>
						</svg>
						TRENDING NEWS
					</h2>
					<div className="newbuttonlist gry">
                        {topSlider.map((itm, index) => (
                            <span key={index} onClick={() => filterDataByCategory(itm.key, index)}  className={active === index ? "active" : ""}>{itm.label}</span>
                        ))}
					</div>
				</div>
				{!isLoading ? <div className="lctrnews">
					<ul>
                    {first.map((item, index) => {
                                const {
                                    images,
                                    display_headline,
                                    headline,
                                    weburl,
                                    intro,
                                    // intro,
                                    // gallery,
                                    post_type,
                                    // ff_source,
                                    // local18_video,
                                  } = item.article_details || item || {};
                                return (<li key={`fcd-${index}`}>
                                    <a href={weburl}>
                                    <figure>
                                        <LazyLoadImage
                                                src={
                                                index === 0
                                                    ? imageLoader(images?.url, 281, 186)
                                                    : imageLoader(images?.url, 81, 53)
                                                }
                                                alt={display_headline || headline || ""}
                                                title={display_headline || headline || ""}
                                                width={index === 0 ? 281 : 80}
                                                height={index === 0 ? 186 : 53}
                                            />
                                        {post_type === "videos" && <img className="phvid" src="/images/districts/Group2202.svg" title="" alt="" />}
                                        {post_type === "photogallery" && <img className="phvid ph" src="districts/PhotoIcn.svg" title="" alt="" />}
                                    </figure>
                                    <span>{display_headline || headline}</span>
                                    {index === 0 && <p>{intro}</p>}
                                </a>
                                </li>)
                            })}
					</ul>

                    <ul>
							{second.map((item, index) => {
                                const {
                                    images,
                                    display_headline,
                                    headline,
                                    weburl,
                                    // intro,
                                    // gallery,
                                    post_type,
                                    // ff_source,
                                    // local18_video,
                                  } = item.article_details || item || {};
                                return (<li key={`fdd-${index}`}>
                                    <a href={weburl}>
                                    <figure>
                                        <LazyLoadImage
                                                src={imageLoader(images?.url, 80, 53)}
                                                alt={display_headline || headline || ""}
                                                title={display_headline || headline || ""}
                                                width={80}
                                                height={53}
                                            />
                                        {post_type === "videos" && <svg id="Video1_D" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                            <rect id="Rectangle_1564" data-name="Rectangle 1564" width="15" height="15" fill="#fff"/>
                                            <path id="Path_36" data-name="Path 36" d="M15,3.72v7.559a.508.508,0,0,0-.028.08,2.191,2.191,0,0,1-2.165,1.853q-5.307,0-10.614,0A2.194,2.194,0,0,1,.072,11.574c-.026-.1-.048-.2-.072-.3V3.72a.5.5,0,0,0,.027-.08A2.19,2.19,0,0,1,2.178,1.788q5.322-.006,10.644,0a2.184,2.184,0,0,1,2.1,1.61c.03.107.055.215.082.322M7.485,12.334h5.243a1.321,1.321,0,0,0,1.393-1.385q0-3.449,0-6.9a1.321,1.321,0,0,0-1.392-1.385H2.271a1.321,1.321,0,0,0-1.392,1.4v6.87a1.322,1.322,0,0,0,1.407,1.4h5.2" fill="#ed1c24"/>
                                            <path id="Path_40" data-name="Path 40" d="M5.742,7.5c0-.708,0-1.416,0-2.124a.471.471,0,0,1,.23-.457.463.463,0,0,1,.508.048Q8.164,6.025,9.852,7.079a.452.452,0,0,1,0,.841Q8.167,8.976,6.479,10.03a.463.463,0,0,1-.508.05.47.47,0,0,1-.231-.456c0-.707,0-1.415,0-2.123m.886,1.4,2.24-1.4L6.628,6.1Z" fill="#ed1c24"/>
                                            </svg>}
                                        {post_type === "photogallery" && <svg id="Photo" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                            <rect id="Rectangle_1563" data-name="Rectangle 1563" width="15" height="15" fill="#fff"/>
                                            <path id="Path_30" data-name="Path 30" d="M15,9.415c-.022.078-.043.157-.068.235a1.4,1.4,0,0,1-1.278.968l-.19,0c-3.137,0-6.275-.006-9.412.005A1.5,1.5,0,0,1,2.6,9.734a1.427,1.427,0,0,1-.078-.613q-.008-3.486,0-6.971a2.356,2.356,0,0,1,.018-.291A1.4,1.4,0,0,1,3.855.645c.068,0,.136,0,.2,0h9.4A1.408,1.408,0,0,1,14.982,1.82c0,.008.012.015.018.022Zm-.941-2.427c0-.063.005-.09.005-.118q0-2.4,0-4.795a.471.471,0,0,0-.523-.5q-4.779,0-9.56,0a.474.474,0,0,0-.523.527q0,3.077,0,6.154c0,.035.007.07.013.124.051-.048.086-.081.12-.115q.936-.935,1.872-1.87a1.1,1.1,0,0,1,1.614,0c.235.238.473.474.717.718l.6-.718q.837-1,1.673-2.011a1.119,1.119,0,0,1,1.171-.414,1.215,1.215,0,0,1,.648.473c.715.837,1.432,1.672,2.173,2.536M3.626,9.567a.512.512,0,0,0,.4.119H12.77c.273,0,.546,0,.819,0a.459.459,0,0,0,.475-.483c0-.2-.007-.4,0-.6a.4.4,0,0,0-.112-.3q-1.411-1.639-2.817-3.284c-.156-.182-.222-.181-.378.007Q9.5,6.541,8.235,8.057a.481.481,0,0,1-.8.032q-.5-.5-.992-.992c-.163-.164-.191-.164-.353,0L3.724,9.462c-.033.033-.065.069-.1.105" fill="#ed1c24"/>
                                            <path id="Path_31" data-name="Path 31" d="M10.93,14.363c-.208-.051-.547-.131-.885-.222Q5.592,12.95,1.138,11.756A1.41,1.41,0,0,1,.086,9.984Q.6,7.99,1.122,6a.47.47,0,0,1,.429-.395.433.433,0,0,1,.466.3.679.679,0,0,1,0,.341q-.5,1.95-1.011,3.9c-.1.4.013.611.411.717L10.892,13.4a.472.472,0,0,0,.648-.38c.1-.4.2-.811.3-1.217a.468.468,0,1,1,.907.22c-.1.435-.208.87-.324,1.3a1.439,1.439,0,0,1-1.495,1.039" fill="#ed1c24"/>
                                            <path id="Path_34" data-name="Path 34" d="M5.648,5.006A1.246,1.246,0,1,1,6.891,3.76,1.25,1.25,0,0,1,5.648,5.006m0-.937a.309.309,0,0,0,.311-.3.312.312,0,0,0-.623-.014.31.31,0,0,0,.312.315" fill="#ed1c24"/>
                                            </svg>}
                                    </figure>
                                    <span>{display_headline || headline}</span>
                                </a>
                                </li>)
                            })}
						</ul>
                        <ul>
                    {third.map((item, index) => {
                                const {
                                    images,
                                    display_headline,
                                    headline,
                                    weburl,
                                    // intro,
                                    // gallery,
                                    post_type,
                                    // ff_source,
                                    // local18_video,
                                  } = item.article_details || item || {};
                                return (<li key={`cdct-${index}`}>
                                    <a href={weburl}>
                                    <figure>
                                        <LazyLoadImage
                                                src={imageLoader(images?.url, 180, 120)}
                                                alt={display_headline || headline || ""}
                                                title={display_headline || headline || ""}
                                                width={180}
                                                height={120}
                                            />
                                        {post_type === "videos" && <img className="phvid" src="/images/districts/Group2202.svg" title="" alt="" />}
                                        {post_type === "photogallery" && <img className="phvid ph" src="districts/PhotoIcn.svg" title="" alt="" />}
                                    </figure>
                                    <span>{display_headline || headline}</span>
                                </a>
                                </li>)
                            })}
	    			       <li><a href={aurPadheLink} className="moretrndstroygrey"><span className="moretrndstroy">और भी पढ़ें</span></a></li>
					</ul>
				</div>: <Skeleton height={320} />}
                <style jsx>{`
                .lctrnews{display: flex; justify-content: space-between; margin-top: 10px;} 
				.lctrnews ul{flex-shrink: 0;}
				.lctrnews ul li{border-bottom: 1px solid #e0e0e0;padding: 12px 0; position: relative;}
				.lctrnews ul li a{display: flex;}
				.lctrnews ul li a figure{width: 80px; height: 54px; margin-right: 12px;box-shadow: 0px 2px 4px #0000001a;}
				.lctrnews ul li a figure img{width: 80px; height: 54px;}
				.lctrnews ul a span{color: #000;line-height: 22px; font-weight: 600;font-size: 15px; display: -webkit-box;   -webkit-line-clamp: 2;  -webkit-box-orient: vertical;  overflow: hidden;}
				.lctrnews ul:first-child{width: 280px;}
				.lctrnews ul li:first-child{padding-top: 0}
				.lctrnews ul:first-child li:first-child{padding: 0;border: none;}
				.lctrnews ul:first-child li a{display: block;}
				.lctrnews ul:first-child li a figure{width: 280px;height: 186px; margin-bottom: 5px;}
				.lctrnews ul:first-child li a figure, .lctrnews ul:first-child li a figure img{width: 280px;height: 186px;}
				.lctrnews ul:first-child li a span{color: #000; font-weight: 600; line-height: 26px;font-size: 18px; display: -webkit-box;   -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;}
				.lctrnews ul:first-child li a p{color: #5F5F5F;line-height: 21px;font-size: 14px; display: -webkit-box;  -webkit-line-clamp: 2; -webkit-box-orient: vertical;overflow: hidden;}
				.lctrnews ul:nth-child(2){width: 420px; padding: 0 20px; margin: 0 20px;border-left: 1px solid #e0e0e0;border-right: 1px solid #e0e0e0;}
				.lctrnews ul:last-child{width: 180px;}
				.lctrnews ul:last-child li:first-child{height: 228px;}
				.lctrnews ul:last-child li a{display: block;}
				.lctrnews ul:last-child li:last-child{border: none; padding-bottom: 0px;}
				.lctrnews ul:last-child li a figure{margin-bottom: 5px;}
				.lctrnews ul:last-child li a figure, .lctrnews ul:last-child li a figure img{width: 180px;height: 120px;}
				.lctrnews ul:last-child a span { display: -webkit-box; font-weight: 600; -webkit-line-clamp: 3; -webkit-box-orient: vertical;overflow: hidden;}
				.moretrndstroygrey{height: 70px;background: #F3F3F3;border: 1px solid #DBDBDB;border-radius: 4px; display: flex!important; align-items: center; justify-content: center;}
				`}</style>
    </>);
};

export default TrendingNews;