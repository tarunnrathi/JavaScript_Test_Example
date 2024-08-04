import Head from "next/head";
import Outbrain from "widgets/Common/Responsive/Outbrain";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/LazyLoadImage";
// import Pagination from "widgets/Common/Desktop/Pagination";
import dynamic from 'next/dynamic';
import useLoadMore from "hooks/useLoadMore";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import BreadcrumbCommon from "widgets/Common/Responsive/BreadcrumbCommon";

const DynamicCrTopScoreWidgetWithNoSSR = dynamic(
    () => import('widgets/Common/Responsive/CrTopScoreWidget'),
    { ssr: false }
);
const DynamicScoreRHSWithNoSSR = dynamic(
    () => import('../Cricketnext/Cards/ScoreRHS'),
    { ssr: false }
);

const cnNews = (props) => {
    const latestData = props.data.latestStories;
    // const dataLength = props.data.length;
    const { pageLimit } = props.data;
    const query_arr = { post_type: "text", "subsection.id": "29" };
    const dataLength = 1000;
    const { loadMore, categoryData, hasMoreData } = useLoadMore(latestData, pageLimit, dataLength, query_arr);

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
            <div className="CN-pageOutter CN-Desktop-HomeOuter">
                <div className="CN-pageWrapper">
                    <div style={{ minHeight: "60px", background: "#00000021", marginTop: "10px" }}>
                        {/* <SiteAd
                            slotId="Desktop_ScoreCard_ad"
                            adUnit={props.pageAds?.ScoreCard_ad}
                            sizes={[[1244, 60]]}
                            width={1244}
                            height={60}
                            removeAdSpan= {true}
                            lazyload={true}
                        /> */}
                        <NewSiteAd
                            slotId="Desktop_ScoreCard_ad"
                            adUnit={props.pageAds?.ScoreCard_ad}
                            sizes={[[1244, 60]]}
                            width={1244}
                            height={60}
                            removeAdSpan= {true}
                            lazyLoad={true}             
                        />
                    </div>
                    <div className="CN-pageCN-scoreCardsection">
                        <div className="CN-scoreCardsection">
                            {/* scorecard component */}
                            <DynamicCrTopScoreWidgetWithNoSSR />
                        </div>
                        <div className="CN-section">
                            <div className="CN-sec-l">
                            <BreadcrumbCommon breadCrumbArray={[
                                { value: "हिंदी समाचार", slug: "/"},
                                { value: "Cricket", slug: "/cricket/"},
                                { value: "News"},
                            ]}/>
                                <div className="CN-heading-1">
                                    <h1 className="headinner">
                                        लेटेस्ट क्रिकेट <span>न्यूज</span>
                                    </h1>
                                    <div className="icon"></div>
                                </div>

                                <ul className="CN-latestStory-widget">
                                    {
                                        categoryData && categoryData.length ? (
                                            categoryData.map((latest, index) => (
                                                <li key={`map_${index}`}>
                                                    <a href={latest.weburl_r}>
                                                    <div className="image-box">
                                                        <LazyLoadImage height="144" width="217" src={latest.images.url} alt={latest.display_headline!='' ? latest.display_headline : latest.headline} title={latest.display_headline!='' ? latest.display_headline : latest.headline} />
                                                    </div>
                                                    <p>{latest.display_headline!='' ? latest.display_headline : latest.headline}</p>
                                                    </a>
                                                </li>
                                            ))
                                        ) : null
                                    }
                                </ul>
                                {/* <Pagination curpage={props.data.pageNumber} TotalRecord={dataLength} limit={props.data.pageLimit} pageurl={props.data.NewsUrl} pageflag={false} /> */}
                                {hasMoreData && <button onClick={loadMore} className="load_more">Load More</button>}
                                <p className="pageContent">क्रिकेट (Cricket) दुनिया में सबसे ज्यादा पसंद किए जाने वाले खेलों में से एक है. यह खेल दुनिया के हर हिस्से में और 100 से अधिक देशों में खेला जाता है. क्रिकेट के मैच तकरीबन हर घंटे खेले जाते हैं. हर घंटे हार-जीत और एनालिसिस. क्रिकेट में आंकड़ों का भी खूब प्रयोग होता है. इसी कारण इस खेल की न्यूज, एनालिसिस, मैच रिपोर्ट हर मिनट आ रही होती है. क्रिकेट से जुड़ी इन खबरों (news) को यहां देखा जा सकता है.</p>
                                {/* <div className="outbrain_row">
                                    <Outbrain widgetId="AR_6" widgetSrc="https://hindi.news18.com/cricket/news/" />
                                </div> */}
                                 <Taboola
                                    mode={TaboolaList.category.bottom.mode}
                                    id={TaboolaList.category.bottom.id}
                                    container={TaboolaList.category.bottom.container}
                                    placement={TaboolaList.category.bottom.placement}
                                    />
                            </div>
                            <div className="CN-sec-r">
                                <DynamicScoreRHSWithNoSSR pageAds={props.pageAds} isIpl="" isT20="" recent="" upcoming="" url={props.data.currentUrl} predictorData="" taboola ={true} taboolaList={TaboolaList.category}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900&display=swap");
                .CN-pageOutter {
                    // background: #f5f5f5;
                    margin-bottom: 20px;
                    width: 100%;
                }
                .CN-pageWrapper {
                    max-width: 1244px;
                    margin: 0 auto;
                    background: #fff;
                    clear: both !important;
                }
                .CN-section .CN-sec-l {
                    width: 924px;
                    min-width: 924px;
                }
                .CN-section .CN-sec-r {
                    width: 300px;
                    min-width: 300px;
                }
                .cn-thumbnailwrap {
                    margin-bottom: 25px;
                    display: flex;
                    justify-content: space-between;
                }
                .CN-section {
                    display: flex;
                    justify-content: space-between;
                    font-family: 'Mukta',sans-serif;
                }
                .cn-mb-40 {
                    margin-bottom: 40px;
                }
                .CN-heading-1 {
                    border-bottom: 3px solid #e1261d;
                    margin-bottom: 10px;
                }
                .CN-heading-1 .headinner {
                    font-size: 22px;
                    line-height: 20px;
                    color: #e1261d;
                    background: #fff;
                    position: relative;
                    top: 10px;
                    padding-right: 4px;
                    display: inline-block;
                    font-family: 'Mukta',sans-serif;
                    text-transform: uppercase;
                    font-weight: bold;
                    border-bottom: 1px solid transparent;
                }
                .cn-smallstory-wrapper .cn-smallstory .text-box .heading-1 {
                    font-size: 16px;
                    line-height: 1.5;
                    font-weight: bold;
                }
                .CN-Desktop-HomeOuter .cn-thumbnailwrap .CN-Sections {
                    width: 48%;
                }
                .CN-breadcum {
                    font-family: 'Mukta',sans-serif !important;
                    font-size: 14px;
                    line-height: 13px;
                    color: #292929;
                    text-transform: uppercase;
                    padding: 4px 0;
                    border-bottom: 1px dotted #939393;
                    margin-bottom: 5px;
                }
                .CN-breadcum h1{
                    display: inline-block;
                    font-size: 14px;
                    line-height: 13px;
                    font-weight: normal;
                }
                .CN-section .CN-sec-l {
                    width: 924px;
                    min-width: 924px;
                }
                .CN-latestStory-widget {
                    display: grid;
                    grid-template-columns: 217px 217px 217px 217px;
                    column-gap: 19px;
                    row-gap: 20px;
                    padding-bottom: 20px;
                }
                .CN-latestStory-widget li {
                    border-bottom: 1px dotted #dadada;
                    font-weight:bold;
                    padding-bottom:15px;
                }
                .CN-latestStory-widget li a {
                    display: block;
                }
                .CN-latestStory-widget li a .image-box img {
                    display: block;
                    width: 100%;
                }
                .CN-latestStory-widget li a p {
                    margin: 0;
                    margin-top: 5px;
                    font-size: 16px;
                    line-height: 1.5;
                }
                .cn-morebtn1 {
                    background: #f5f5f5;
                    display: block;
                    text-align: center;
                    text-transform: uppercase;
                    color: #e1261d;
                    font-weight: bold;
                    font-size: 13px;
                    padding: 11px 0;
                }
                .CN-Mobile-HomeOuter .CN-latestStory-widget {
                    display: block;
                    padding: 0 10px;
                    border-bottom: none;
                }
                .CN-Mobile-HomeOuter .CN-latestStory-widget li {
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #d7d7d7;
                }
                .CN-Mobile-HomeOuter .CN-latestStory-widget li a {
                    display: flex;
                    flex-direction: row-reverse;
                }
                .CN-Mobile-HomeOuter .CN-latestStory-widget li .image-box {
                    flex: 0 0 110px;
                    margin-left: 10px;
                    overflow: hidden;
                    border-radius: 5px;
                }
                .CN-Mobile-HomeOuter .CN-latestStory-widget li a p {
                    width: 100%;
                    font-size: 16px;
                    line-height: 1.5;
                }
                .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer; margin-bottom: 14px;}
            `}</style>
        </>
    );
};
export default cnNews;
