import { siteUrl } from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";
import { getRelativeURL } from "util/global/Helper";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const CricketHomeAmp = (props) => {
    const stories = props.data.topStories;
    const slicedCount = 3;
    const restStories = (stories?.length && [...stories.slice(slicedCount, stories.length)]) || [];

    const latestData = props.data.latestStories;
    const updatedLatestData = latestData?.length && [...latestData.slice(1, latestData.length)] || [];

    return (
        <>
            <div className="ad-container">
                <amp-ad
                    width={320}
                    height={50}
                    type="doubleclick"
                    data-slot="/1039154/CRINXT_HIND_AMP/CRINXT_HIND_HOME_AMP/CRINXT_HIND_HOME_AMP/CRINXT_HIND_HP_AMP_HP_ATF_320"
                    data-multi-size="250x250,300x250,336x280"
                    data-multi-size-validation="false"
                    i-amphtml-layout="fixed"
                    data-amp-slot-index="0"
                    data-a4a-upgrade-type="amp-ad-network-doubleclick-impl"
                ></amp-ad>
            </div>
            <div>
            <BreadcrumbCommon breadCrumbArray={[
                  { value: "हिंदी समाचार", slug: "/"},
                  { value: "Cricket"},
                ]}/>
                {/* Main Content */}
                <div className="MainContent">
                    <div className="CN-Sections">
                        <div className="CN-storyWrap">

                            {/* Cricket News Section*/}
                            <h1 className="cricket-heading" style={{ fontSize: '20px', paddingLeft: '10px' }}>Cricket News</h1>
                            <div>
                                {stories?.length && (
                                    <div className="CN-LeadStory">
                                        <h2 className="CN-LeadHead">
                                            <a href={getRelativeURL(true, stories[0]?.weburl) || ""} title={stories[0]?.headline}>
                                                {stories[0]?.headline}
                                            </a>
                                        </h2>
                                        <figure>
                                            <a href={getRelativeURL(true, stories[0]?.weburl)}>
                                                <LazyLoadImage
                                                    width={390}
                                                    height={260}
                                                    src={stories[0]?.thumbnail}
                                                    alt={stories[0]?.headline || ""}
                                                    title={stories[0]?.headline || ""}
                                                    isAMP={true}
                                                />
                                            </a>
                                        </figure>
                                    </div>
                                )}
                                {stories?.length >= 3 && (
                                    <div className="CN-Thumbstory">
                                        <div className="CN-ThumbStory-col">
                                            <div className="imgwrap">
                                                <a href={getRelativeURL(true, stories[1]?.weburl)}>
                                                    <LazyLoadImage height={129} width={194} src={stories[1]?.thumbnail} alt={stories[1]?.headline || ""} title={stories[1]?.headline || ""} isAMP={true}/>
                                                </a>
                                            </div>
                                            <div className="text">
                                                <a href={getRelativeURL(true, stories[1]?.weburl)} title={stories[1]?.headline}>
                                                    {stories[1]?.headline}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="CN-ThumbStory-col">
                                            <div className="imgwrap">
                                                <a href={getRelativeURL(true, stories[2]?.weburl)}>
                                                    <LazyLoadImage height={129} width={194} src={stories[2]?.thumbnail} alt={stories[2]?.headline || ""} title={stories[2]?.headline || ""} isAMP={true}/>
                                                </a>
                                            </div>
                                            <div className="text">
                                                <a href={getRelativeURL(true, stories[2]?.weburl)} title={stories[2]?.headline}>
                                                    {stories[2]?.headline}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="CN-Topstory">
                                    <ul>
                                        {restStories.map((story) => (
                                            <li>
                                                <a href={getRelativeURL(true, story?.weburl)}>{story?.headline}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <a href={siteUrl + "cricket/news/"} className="CN-morestory-round-btn">
                                    और भी...
                                </a>
                            </div>

                            {/* Latest News Section*/}
                            <div className="CN-heading-1">
                                <h2 className="headinner">
                                    लेटेस्ट <span>न्यूज</span>
                                </h2>
                                <div className="icon"></div>
                            </div>
                            {latestData?.length ? (
                                <div className="CN-LeadStory">
                                    <h2 className="CN-LeadHead">
                                        <a href={getRelativeURL(true, latestData[0].weburl)|| ""} title={latestData[0].display_headline}>
                                            {latestData[0].display_headline}
                                        </a>
                                    </h2>
                                    <figure>
                                        <a href={latestData[0].weburl}>
                                            <LazyLoadImage src={latestData[0].images.url} alt={latestData[0].display_headline} title={latestData[0].display_headline} width={390} height={260} isAMP={true}/>
                                        </a>
                                    </figure>
                                </div>
                            ) : null}
                            <ul className="CN-latestStory-widget">
                                {updatedLatestData && updatedLatestData.length && (
                                    updatedLatestData.map((latest, index) => (
                                        <li key={`map_${index}`}>
                                            <a href={getRelativeURL(true, latest.weburl)}>
                                                <div className="image-box">
                                                    <LazyLoadImage height={73} width={110} src={latest.images.url} alt={latest.display_headline} title={latest.display_headline} isAMP={true} />
                                                </div>
                                                <div>
                                                    <p className="description">{latest.display_headline}</p>
                                                </div>
                                            </a>
                                        </li>
                                    ))
                                )}
                            </ul>
                            {latestData && latestData.length ?
                                (<a href={siteUrl + "cricket/news/"} className="CN-morestory-round-btn">
                                    और भी...
                                </a>)
                                : null}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .ad-container {
                    display: flex;
                    justify-content: center;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    background: #dbdde3;
                }
                a {
                    color: #282828;
                }
                .CN-Sections {
                    border-bottom: 6px solid #eee;
                    margin-bottom: 30px;
                }
                .CN-storyWrap h1.cricket-heading {
                    font-weight: 700;
                    color: #e1261d;
                    font-size: 25px;
                    margin-bottom: 5px;
                    font-family: "Mukta",sans-serif;
                }
                .CN-LeadStory {
                    margin-bottom: 10px;
                }
                .CN-LeadStory .CN-LeadHead {
                    font-size: 20px;
                    line-height: 28px;
                    background: #001e44;
                    padding: 20px 10px 15px 10px;
                    position: relative;
                }
                .CN-LeadStory .CN-LeadHead:before {
                    content: '';
                    position: absolute;
                    width: 40px;
                    background: #e1261c;
                    height: 6px;
                    top: 10px;
                    left: 0;
                }
                .CN-LeadStory .CN-LeadHead a {
                    color: #fff;
                    display: block;
                }
                article, aside, figure, section {
                    display: block;
                }
                .CN-LeadStory figure a {
                    display: block;
                    position: relative;
                }
                .CN-LeadStory figure a LazyLoadImage {
                    width: 100%;
                    display: block;
                }
                .CN-Thumbstory {
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 10px;
                }
                .CN-Thumbstory .CN-ThumbStory-col {
                    width: 48.5%;
                    border: 1px solid #d7d7d7;
                    border-radius: 5px;
                    overflow: hidden;
                }
                .CN-Thumbstory .CN-ThumbStory-col .imgwrap a, .CN-Thumbstory .CN-ThumbStory-col .imgwrap LazyLoadImage {
                    display: block;
                    width: 100%;
                }
                .CN-Thumbstory .CN-ThumbStory-col .imgwrap a {
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                    overflow: hidden;
                }
                .CN-Thumbstory .CN-ThumbStory-col .text {
                    padding: 10px;
                }
                .CN-Thumbstory .CN-ThumbStory-col .text a {
                    font-size: 16px;
                    line-height: 1.5;
                    display: block;
                    color: #0a0a0a;
                }
                .CN-Thumbstory .CN-ThumbStory-col .text h2 {
                    font-size: 16px;
                    line-height: 24px;
                }
                .CN-storyWrap .CN-Topstory {
                    background: #f5f5f5;
                    padding: 0 10px;
                }
                .CN-storyWrap .CN-Topstory ul {
                    border-top: 1px solid #d7d7d7;
                    border-bottom: 1px solid #d7d7d7;
                    padding: 15px 0px;
                }
                .CN-storyWrap .CN-Topstory ul li {
                    margin-bottom: 20px;
                    padding-left: 15px;
                    position: relative;
                }
                .CN-storyWrap .CN-Topstory ul li::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    position: absolute;
                    background: #e1261c;
                    border-radius: 50%;
                    left: 0;
                    top: 6px;
                }
                .CN-storyWrap .CN-Topstory ul li a {
                    color: #0a0a0a;
                    font-size: 16px;
                    line-height: 24px;
                }
                .CN-morestory-round-btn {
                    font-family: "Mukta",sans-serif;
                    font-weight: 600;
                    text-align: center;
                    display: table;
                    color: #e1261c;
                    border: 2px solid#e1261c;
                    padding: 5px 8px;
                    text-transform: uppercase;
                    margin: 10px auto;
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                    width: 240px;
                    font-size: 13px;
                }
                .CN-heading-1 {
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 18px;
                    color: #e1261c;
                    padding: 0 0 0 10px;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg.png);
                    background-repeat: repeat-x;
                    background-position: center;
                    position: relative;
                }
                .CN-heading-1 .headinner {
                    font-size: 22px;
                    line-height: 24px;
                }
                .CN-heading-1 .headinner {
                    background: #fff;
                    padding: 0 5px;
                    border-bottom: 1px dotted #d7d7d7;
                }
                .CN-heading-1 .headinner {
                    font-family: 'Khand', sans-serif;
                    font-size: 22px;
                    line-height: 24px;
                }
                .CN-heading-1 .icon {
                    border: solid #000;
                    border-width: 0 2px 2px 0;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    margin-right: 10px;
                    z-index: 1;
                }
                .CN-heading-1:after {
                    content: '';
                    position: absolute;
                    background: #fff;
                    width: 22px;
                    height: 19px;
                    right: 0;
                }
                .CN-LeadStory {
                    margin-bottom: 10px;
                    overflow: hidden;
                }
                .CN-LeadStory .CN-LeadHead {
                    font-size: 18px;
                    line-height: 24px;
                    background: #001e44;
                    padding: 20px 10px 15px 10px;
                    position: relative;
                }
                .CN-LeadStory .CN-LeadHead:before {
                    content: "";
                    position: absolute;
                    width: 40px;
                    background: #e1261c;
                    height: 6px;
                    top: 10px;
                    left: 0;
                }
                .CN-LeadStory .CN-LeadHead a {
                    color: #fff;
                    font-family: "Mukta",sans-serif;
                }
                .CN-LeadStory figure, .CN-Thumbstory figure {
                    margin: auto;
                }
                .CN-LeadStory figure a {
                    display: block;
                    position: relative;
                }
                .CN-latestStory-widget {
                    display: block;
                    padding: 0 10px;
                    border-bottom: none;
                }
                .CN-latestStory-widget li {
                    margin-bottom: 10px;
                    border-bottom: 1px solid#d7d7d7;
                }
                .CN-latestStory-widget li a {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -moz-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: horizontal;
                    -webkit-box-direction: reverse;
                    -webkit-flex-direction: row-reverse;
                    -moz-box-orient: horizontal;
                    -moz-box-direction: reverse;
                    -ms-flex-direction: row-reverse;
                    flex-direction: row-reverse;
                }
                .description {
                    font-family: "Mukta",sans-serif;
                    font-size: 16px;
                    color: #282828;
                    line-height: 24px;
                    font-family: "Fira Sans";
                    font-weight: bold;
                    -o-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    margin-top: 10px;
                }
                .CN-latestStory-widget li .image-box {
                    -webkit-box-flex: 0;
                    -webkit-flex: 0 0 110px;
                    -moz-box-flex: 0;
                    -ms-flex: 0 0 110px;
                    flex: 0 0 110px;
                    margin-left: 10px;
                    overflow: hidden;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                }
                .CN-latestStory-widget li a p {
                    width: 100%;
                    font-size: 16px;
                    line-height: 1.5;
                }
            `}</style>
        </>
    );
};

export default CricketHomeAmp;
