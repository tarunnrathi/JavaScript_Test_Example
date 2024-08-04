import Head from "next/head";
// import Outbrain from "widgets/Common/Responsive/Outbrain";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/LazyLoadImage";
// import Pagination from "widgets/Common/Mobile/Pagination";
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
const cnNewsMobile = (props) => {

    const dataLength = 1000;
    const firstStory = (props?.data?.latestStories || []).slice(0, 1);
    const latestData = (props?.data?.latestStories || []).slice(1, dataLength);
    const pageLimit = props?.data?.pageLimit;

    const query_arr = { post_type: "text", "subsection.id": "29" };
    const { loadMore, categoryData, hasMoreData } = useLoadMore(latestData, pageLimit, dataLength, query_arr);

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
            <div className="CN-pageOutter CN-Mobile-HomeOuter">
                <div className="CN-pageWrapper">
                    <div style={{ minHeight: "60px", background: "#f5f5f5", textAlign: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                        {/* <SiteAd
                            slotId="Mobile_ScoreCard_ad"
                            adUnit={props.data.pageAds?.ScoreCard_ad}
                            sizes={[[320, 60]]}
                            width={360}
                            height={60}
                            removeAdSpan= {true}
                            lazyload={true}
                        /> */}
                        <NewSiteAd
                            slotId="Mobile_ScoreCard_ad"
                            adUnit={props.data.pageAds?.ScoreCard_ad}
                            sizes={[[320, 60]]}
                            width={360}
                            height={60}
                            removeAdSpan= {true}
                            lazyLoad={true}             
                        />
                    </div>
                    {/* scorecard component */}
                    <DynamicCrTopScoreWidgetWithNoSSR isMobile/>

                    {props.data.pageAds.header_ATF_320 ? (
                        <div className="ad-container">
                            <div className="addinner-box">
                                {/* <SiteAd
                                    width={336}
                                    height={280}
                                    slotId="mobileAdNew300x250_0"
                                    adUnit={props.data.pageAds.header_ATF_320}
                                    sizes={[[300, 250], [336, 280]]}
                                /> */}
                                <NewSiteAd
                                    width={336}
                                    height={280}
                                    slotId="mobileAdNew300x250_0"
                                    adUnit={props.data.pageAds.header_ATF_320}
                                    sizes={[[300, 250], [336, 280]]}            
                                />
                            </div>
                        </div>
                    ) : null}
                    <BreadcrumbCommon breadCrumbArray={[
                        { value: "हिंदी समाचार", slug: "/"},
                        { value: "Cricket", slug: "/cricket/"},
                        { value: "News"},
                    ]}/>

                    <div className="CN-pageCN-scoreCardsection">
                        <div className="CN-section">
                            <div className="CN-sec-l">
                                <div className="CN-heading-1">
                                    <h1 className="headinner">
                                        लेटेस्ट <span>क्रिकेट न्यूज</span>
                                    </h1>
                                    <div className="icon"></div>
                                </div>

                                {
                                    firstStory && firstStory.length ? (
                                        <div className="CN-LeadStory">
                                            <h2 className="CN-LeadHead">
                                                <a href={firstStory[0]['weburl_r']}>{firstStory[0]['display_headline']!='' ? firstStory[0]['display_headline'] : firstStory[0]['headline']}</a>
                                            </h2>
                                            <a href={firstStory[0]['weburl_r']}>
                                                <LazyLoadImage height="240" width="360" src={firstStory[0]?.images?.url} alt={firstStory[0]['display_headline']!='' ? firstStory[0]['display_headline'] : firstStory[0]['headline']} title={firstStory[0]['display_headline']!='' ? firstStory[0]['display_headline'] : firstStory[0]['headline']} />
                                            </a>
                                        </div>
                                    ):null
                                }
                                <div>
                                    <ul className="CN-Thumbstory-2">
                                        {
                                            categoryData && categoryData.length ? (
                                                categoryData.map((latest, index) => (
                                                    <>
                                                    {index==4 ? (
                                                        <>
                                                            {props.data.pageAds.ATF_300 ? (
                                                                <div className="ad-container" style={{ marginBottom: "10px" }}>
                                                                <div className="addinner-box">
                                                                    {/* <SiteAd
                                                                    width={336}
                                                                    height={280}
                                                                    slotId="mobileAdNew300x250_1"
                                                                    adUnit={props.data.pageAds.ATF_300}
                                                                    lazyload={true}
                                                                    sizes={[[300, 250], [336, 280]]}
                                                                    ></SiteAd> */}
                                                                    <NewSiteAd
                                                                        width={336}
                                                                        height={280}
                                                                        slotId="mobileAdNew300x250_1"
                                                                        adUnit={props.data.pageAds.ATF_300}
                                                                        lazyLoad={true}
                                                                        sizes={[[300, 250], [336, 280]]}           
                                                                    />
                                                                </div>
                                                                </div>
                                                            ) : null}
                                                        </>
                                                        ) : null
                                                    }
                                                    <li key={`map_${index}`}>
                                                        <a href={latest.weburl_r}>
                                                            <div className="text">
                                                                <p>{latest.display_headline!='' ? latest?.display_headline : latest?.headline}</p>
                                                            </div>
                                                            <div className="imgwrap">
                                                                <LazyLoadImage height="73" width="110" src={latest?.images?.url} alt={latest?.display_headline!='' ? latest?.display_headline : latest?.headline} title={latest?.display_headline!='' ? latest?.display_headline : latest?.headline} />
                                                            </div>
                                                        </a>
                                                    </li>
                                                    </>
                                                ))
                                            ) : null
                                        }
                                    </ul>
                                </div>
                                {hasMoreData && <button onClick={loadMore} className="load_more">Load More</button>}
                                {props.data.pageAds.BTF_300 ? (
                                        <div className="ad-container">
                                        <div className="addinner-box">
                                            {/* <SiteAd
                                            width={336}
                                            height={280}
                                            slotId="mobileAdNew300x250_2"
                                            adUnit={props.data.pageAds.BTF_300}
                                            sizes={[[300, 250], [336, 280]]}
                                            lazyload={true}
                                            ></SiteAd> */}
                                            <NewSiteAd
                                                width={336}
                                                height={280}
                                                slotId="mobileAdNew300x250_2"
                                                adUnit={props.data.pageAds.BTF_300}
                                                sizes={[[300, 250], [336, 280]]}
                                                lazyLoad={true}          
                                            />
                                        </div>
                                        </div>
                                    ) : null}
                                {/* <Pagination  curpage={props.data.pageNumber} TotalRecord={dataLength} limit={props.data.pageLimit} pageurl={props.data.NewsUrl} pageflag={false} /> */}
                                <p className="pageContent">क्रिकेट (Cricket) दुनिया में सबसे ज्यादा पसंद किए जाने वाले खेलों में से एक है. यह खेल दुनिया के हर हिस्से में और 100 से अधिक देशों में खेला जाता है. क्रिकेट के मैच तकरीबन हर घंटे खेले जाते हैं. हर घंटे हार-जीत और एनालिसिस. क्रिकेट में आंकड़ों का भी खूब प्रयोग होता है. इसी कारण इस खेल की न्यूज, एनालिसिस, मैच रिपोर्ट हर मिनट आ रही होती है. क्रिकेट से जुड़ी इन खबरों (news) को यहां देखा जा सकता है.</p>
                                {/* <div className="outbrain_row">
                                    <Outbrain widgetId="MB_2" widgetSrc="https://hindi.news18.com/cricket/news/" />
                                </div> */}
                                <Taboola
                                    mode={TaboolaList.category.bottom.mode}
                                    id={TaboolaList.category.bottom.id}
                                    container={TaboolaList.category.bottom.container}
                                    placement={TaboolaList.category.bottom.placement}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .outbrain_row{padding:10px;}
                .CN-breadcum h1, .CN-breadcum h2 {
                    font-size: 11px;
                    line-height: 13px;
                    color: #292929;
                    font-weight: 400;
                    display: inline-block;
                }
                .ad-container{
                    background: #dbdde3;
                    padding: 16px 0;
                    text-align: center;
                    height: 330px;
                    overflow: hidden;
                }
                .ad-container .addinner-box {
                    background: #e8e9ed;
                    min-width: 250px;
                    display: inline-block;
                    margin: 0 auto;
                    text-align: center;
                    min-height: 250px;
                    padding: 0;
                    box-sizing: border-box;
                }
                .ad-container span#vigyapan{
                    color: #797e90;
                    font-size: 11px;
                    text-align: center;
                    padding: 2px 0 0;
                    display: block;
                    line-height: 16px;
                }
                .CN-breadcum {
                    font-size: 13px;
                    font-family: 'Mukta',sans-serif;
                    line-height: 13px;
                    color: #292929;
                    text-transform: uppercase;
                    padding: 5px 0 5px 10px;
                    background: #f5f5f5;
                    border-top: 1px solid #a8a8a8;
                    border-bottom: 1px solid #d8d8d8;
                    margin-bottom: 5px;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    overflow: scroll;
                    white-space: nowrap;
                    -webkit-align-items: baseline;
                    -webkit-box-align: baseline;
                    -ms-flex-align: baseline;
                    align-items: baseline;
                }
                .CN-LeadStory{margin-bottom:10px}.CN-LeadStory .CN-LeadHead{font-size:18px;line-height:24px;background:#001e44;padding:20px 10px 15px 10px;position:relative}.CN-LeadStory .CN-LeadHead:before{content:'';position:absolute;width:40px;background:#e1261c;height:6px;top:10px;left:0}.CN-LeadStory .CN-LeadHead a{color:#fff;}.CN-LeadStory figure a{display:block;position:relative}.CN-LeadStory figure a img{width:100%;display:block}.CN-heading-1{font-family:'Fira Sans',sans-serif;font-weight:700;text-transform:uppercase;font-size:18px;color:#e1261c;padding:0 0 0 10px;display:flex;justify-content:space-between;align-items:center;background:url(https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/cn-heading-bg.png);background-repeat:repeat-x;background-position:center;position:relative}.CN-heading-1:after{content:'';position:absolute;background:#fff;width:22px;height:19px;right:0}.CN-heading-1 .headinner{background:#fff;padding:5px 5px 0 5px;font-family: 'Mukta',sans-serif;font-size: 33px;}.CN-heading-1 .headinner span{color:#001d42}.CN-heading-1 .icon{border:solid #000;border-width:0 2px 2px 0;display:inline-block;width:8px;height:8px;transform:rotate(-45deg);-webkit-transform:rotate(-45deg);margin-right:10px;z-index:1}.CN-Thumbstory-2{padding:0 10px}.CN-Thumbstory-2 li{padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #d7d7d7}.CN-Thumbstory-2 li:last-child{margin-bottom:0}.CN-Thumbstory-2 li a{display:flex;justify-content:space-between}.CN-Thumbstory-2 li a .imgwrap{flex:0 0 110px;margin-left:10px;height:73px;overflow:hidden;border-radius:5px;display:flex;align-items:center;justify-content:center}.CN-Thumbstory-2 li a .imgwrap>span{position:absolute;width:30px}.CN-Thumbstory-2 li a .imgwrap img{display:block}.CN-Thumbstory-2 li a .text p{color:#0a0a0a;font-size:13px;}.cn-serieswidget{margin-bottom:30px}
                body .worldcupHeader .tpnv {filter: brightness(0) invert(1); padding: 26px 10px 0 0;}
                body .worldcupHeader .st5 {fill: #fff;}
                body .scorecard_ad{padding-bottom: 10px; padding-top: 0!important; margin:0px!important; background: #f5f5f5!important;}
                body .wcTableWidget{margin: 30px 0}
                body .pointTable-inner .wc_heading{margin-bottom: -30px;}
                body .CN-PageWrap, body .CN-PageWrap *, .CNL1Menu, body .CN-scoreCardsection, body .CN-scoreCardsection *, body .CN-breadcum, body .CN-breadcum *, body .CN-schedule-main, body .CN-schedule-main *, body .CN-rankingWrap, body .CN-rankingWrap *, body .cn-serieswidget, body .cn-serieswidget *{font-family: 'Mukta',sans-serif!important;}
                body .CN-scoreCardsection{padding: 10px 0}
                body .page_title, body .wc_heading, body .page_title span{font-family:'khand',sans-serif !important;}
                body .CN-scoreCardsection:after, body .CN-scoreCardsection:before{display: none;}
                body header {padding: 0px 10px !important;}
                body .upperheader .biharelec-logo {padding-left: 0px;margin-left: 0px;}
                header .fr {align-items: center;}
                body .transparentbg.adclstrnsbg {z-index: 9999998;}
                body .chs-stct {margin: 0px 10px 0px 0px;font-size: 14px;}
                body .search_icon {font-size: 13px;}
                body .navigation li a span:before {display: none;}
                body .navigation li a span.icon-home {background: #F5F5F4 url(https://images.news18.com/static_news18/pix/ibnhome/news18/home-new.png) 12px 15px no-repeat !important}
                body .cn-seriesWidget-cont .cn-row-2 {font-size: 13px;}
                body .cn-seriesWidget-cont .cn-row-2 .teams-vs {font-size: 16px;}
                body .cn-seriesWidget-cont .cn-row-2 .date-text {color: #000;}
                body .cn-seriesWidget-cont .ftr .ftr-box2 { font-size: 13px;padding-bottom: 0px;color: #000;}
                body .cn-seriesWidget-cont .ftr .ftr-box2 span {font-weight: bold;font-size: 21px;line-height: 1.5;}
                body .CN-rankingWrap, body .pointTable-main, body .cn-serieswidget, body .CN-innersection{margin-top: 15px}
                body .CN-heading-1 {font-size: 22px;}
                body .CN-Sections .CN-listbox-1 li .CN-listwrap .text-1 {font-size: 16px;line-height: 1.5;color: #000;}
                body .CN-seriesSlider .glide__slide .heading {font-size: 16px;line-height: 1.5}
                body .CN-scoreCard .glide__slides .teamscoreWrap .scorebox .text .score-2 {line-height: 12px;}
                body .CN-Sections .CN-listbox-1 li p {font-size: 16px;line-height: 1.5;}
                body .CN-Thumbstory-2 li a .text p {font-size: 16px;line-height: 1.5;}
                body .CN-scoreCard .glide__slide{height: auto!important;background: rgb(45, 45, 45)!important;}
                body .CN-scoreCard .glide__slides .strip .match-date span{font-weight: bold;}
                body .CN-scoreCard .glide__slides .teamscoreWrap .scorebox .text .runrate {font-size: 10px; line-height: 14px;}
                body .CN-scoreCard .glide__slides .strip .match-status{font-weight: bold;}
                body .CN-scoreCard .glide__slides .score-ftr {font-size: 10px;line-height: 13px;}
                body .cn-serieswidget .widgetWrap .cn-serieswidgetHead li a {font-size: 16px;color:#000;}
                body .cn-serieswidget .widgetWrap .cn-serieswidgetHead li.active a { font-weight: bold;font-size: 16px;}	
                body .cn-serieswidget-box2 .cn-list-container .cn-row-2 .teams-vs {font-weight: bold;}
                body .cn-serieswidget-box2 .cn-list-container .ftr .ftr-box2 span {font-weight: bold;}
                body .cn-photoSlider a .content-box .counter {font-weight: bold;}
                body .cn-photoSlider a .content-box .heading {font-weight: bold;}
                body .cn-morebtn1 {font-weight: bold;}
                body .tmrnk-tbl tr td.flrnk {font-weight: bold;}
                body .top_links_element {margin-bottom: 5px;box-shadow: 0 0 10px #b6b6b6;align-items: initial;}
                body .top_links_element a.home-icon {padding: 9px 6px 0;position: relative;line-height: 21px;flex: 0 0 21px;text-align: center;box-shadow: 0 0 23px #33333340;}
                body .top_links_element > ul {font-size: 12px;overflow: auto;white-space: nowrap;display: flex;line-height: 1.3;margin-bottom: 0px;}
                body .top_links_element ul > li {display: inline-block;color: #fff;text-align: center;text-decoration: none;}
                body .top_links_element > ul > li > a {color: #000;text-transform: uppercase;padding: 10px;display: block;position: relative;}
                body .top_links_element ul > li.series-btn > a {color: #C6080F;}
                body .cn-dropdown {position: initial!important;cursor: pointer;}
                body .cn-dropdown>a::before {content: ''; position: absolute;display: inline-block;width: 0;height: 0;border-top: 4px dashed;border-right: 4px solid transparent;border-left: 4px solid transparent;left: 50%;bottom: 18%;transform: translateX(-50%);}
                body .cn-dropdown .drop-inner {display: none;position: absolute;z-index: 99;background: #fff;width: 252px;padding: 5px;box-sizing: border-box;font-size: 12px;box-shadow: 0 0 10px #00000066;line-height: initial;font-weight: 400;right: 2px;text-align: left;}
                body .cn-dropdown .drop-inner .dropdown-sec {max-height: 316px;overflow-y: auto;}
                body .cn-dropdown .drop-inner .dropdown-sec:last-child {border: 0;    width: 100%;}
                body .top_links_cont a {font-size: 15px;line-height: 1.3;border-right: none;}
                body li.cn-dropdown:hover .drop-inner {width: 140px;}
                body .cn-dropdown .drop-inner.current {display: flex;}
                body .top_links_cont {height: auto;overflow: initial !important;}
                body .dropdown-sec ul {display: block !important;}
                body .dropdown-sec ul li {display: block !important;text-align: left;}
                body .dropdown-sec ul li a {text-align: left;}
                body .top_links_element ul > li.current > a {color: #e1261c;}
                body .top_links_element ul > li.current > a:after {content: '';position: absolute;width: 100%;height: 2px;background: #e1261c;left: 0;bottom: 0;}
                body .CN-LeadStory .CN-LeadHead {font-size: 20px; line-height: 24px;background: none; padding: 10px; font-weight: bold;}
                body .CN-LeadStory .CN-LeadHead:before{display: none;}
                body .CN-LeadStory .CN-LeadHead a {line-height: 24px;color: #001d42;}
                body .CN-Thumbstory-2 li a .imgwrap{border-radius: 0}
                body .CN-storyWrap .CN-Topstory ul li a {font-size: 16px;line-height: 1.5;}
                body .CN-video-smallh li .caption p {font-size: 16px;line-height: 1.5;}
                body .tmrnk-tab li a {font-size: 16px;line-height: 33px;}
                body .tmrnk-tbl tr td.flrnk a {font-size: 13px;}
                body .CN-breadcum {font-size: 13px; background: none; border-top: none; border-bottom: 1px dashed rgb(147 147 147 / 57%); display: flex; overflow: scroll; padding: 8px 10px 5px 10px; margin-bottom: 0;}
                body .CN-breadcum a{padding: 0 4px; flex-shrink: 0}
                body .CN-breadcum a span{padding: 0 4px 0 0}
                body .schedule-tabs {font-size: 15px;}
                body .schedule-tabs li.active a {font-weight: bold;}
                body .CN-schedule-main .CN-resultTable tr th {font-size: 15px;}
                body .CN-schedule-main .CN-resultTable tr td .date2 {font-weight: bold;}
                body .CN-schedule-main .CN-resultTable tr td .teamMatch {font-weight: bold;line-height: 1.5;font-size: 14px;}
                body .CN-schedule-main .CN-resultTable tr td .seriesMatch {line-height: 1.5;font-size: 14px;}
                body .result-teamWrap .payer-thumb .teamName a {color: #000;}
                body .CN-schedule-main .CN-resultTable tr td .schedule-venue {line-height: 1.5;font-size: 13px;}

                body .CN-result-main .CN-result-row .CN-result-heading {font-weight: bold;font-size: 16px;}
                body .CN-result-main .CN-result-row .alsocheck li {font-size: 14px;}
                body .CN-result-main .CN-result-row .header .result-col-lWrap .cn-rsltHead1 { font-weight: bold;font-size: 15px;}
                body .CN-result-main .CN-result-row .header .result-col-lWrap .cn-rsltCont {color: #000; font-size: 14px;}
                body .result-teamWrap .payer-thumb .teamName {font-weight: bold;font-size: 15px;}
                body .result-teamWrap .payer-thumb .match-score .teamRun {font-weight: bold; font-size: 22px}
                body .result-teamWrap .vs {background: none; border: none; filter: brightness(0);}
                body .result-teamWrap .payer-thumb .teamflag{width: 55px}
                body .result-teamWrap .payer-thumb .teamflag img { height: auto;}
                body .CN-Thumbstory li a .text p {font-size: 16px; line-height: 1.5;}
                body .result-tabs li.active a {font-weight: bold;}
                body .result-tabs {font-size: 15px;}

                body .CN-Score-widget .socrebox .payer-thumb .teamName {font-weight: bold;font-size: 13px;}
                body .CN-Score-widget .socrebox .match-score .teamRun {font-weight: bold;}
                body .CN-Score-widget .final-resultbtn {font-weight: bold;}

                body .scoreCard-tabs {font-size: 15px;}
                body .scoreCard-tabs li.active a {font-weight: bold;}
                body .scoreCard-main {padding: 10px 10px 50px 10px;}
                body .scoreCard-main .commentary-team li a .commentary-btnwrap .teamname {font-weight: bold;}
                body .scoreCard-main .commentary-team li.active a .commentary-btnwrap .teamname span {font-weight: bold;}
                body .scoreCard-main .commentary-content .heading {font-weight: bold;}
                body .scoreCard-main .commentry-list ul > li .box-l .run {font-weight: bold;}
                body .rdmr {color: #fff;}
                body .CN-schedule-main .CN-schedule-row .CN-schedule-heading {font-weight: bold;font-size: 16px;}
                body .CN-schedule-main .CN-schedule-row .schedule-box .cn-rsltHead1 {font-weight: bold;}
                body .CN-schedule-main .CN-schedule-row .schedule-box .cn-rsltCont {font-size: 13px;}
                body .CN-schedule-main .CN-resultTable tr td .month {font-weight: bold;line-height: 1.5;}
                body .CN-schedule-main .CN-resultTable tr td .seriesLink {font-weight: bold;line-height: 1.5;}
                body .CN-schedule-main .CN-resultTable tr td .date {line-height: 1.5;}
                body .scoreCard-main .commentry-list ul > li .box-r p span {font-weight: bold;}
                body .scoreCard-main .top-performers > li a .content .player-name {font-weight: bold;}
                body .scoreCard-main .commentry-list .full-commentrybtn {font-size: 11px;}

                body .quickScore-wrap .qs-btnwrap .teamname {font-weight: bold;}
                body .quickScore-live .cs-table {font-size: 11px;}
                body .quickScore-live .cs-table tr th {font-size: 14px;}
                body .quickScore-live .cs-table tfoot tr .tfooter-wrap .ftr-cont .heading1 {font-weight: bold;font-size: 15px;}
                body .quickScore-live .cs-table tr td .playerbox a .txt .playername {font-size: 14px;font-weight: bold;}
                body .quickScore-wrap .inner-wrap .match-table {font-size: 12px;}
                body .quickScore-wrap .inner-wrap .match-table tr th {font-size: 14px;}
                body .quickScore-wrap .inner-wrap .match-table tr td .playerbox .txt .playername {font-size: 14px;font-weight: bold;}
                body .quickScore-wrap .inner-wrap .match-table tr.active td .playerbox .txt .playstatus {font-size: 14px;font-weight: bold;}
                body .quickScore-wrap .inner-wrap .extra-run .heading {font-size: 15px;font-weight: bold;}
                body .quickScore-wrap .inner-wrap .extra-run p {font-size: 13px;}
                body .quickScore-wrap .inner-wrap .totalwrap .box1 {font-size: 15px;font-weight: bold;}
                body .quickScore-wrap .inner-wrap .totalwrap .box2 {font-size: 20px;font-weight: bold;}
                body .quickScore-wrap .inner-wrap .scoreHeading2{font-size: 13px;font-weight: bold;}

                body .matchinfo-table tr th {font-size: 13px;font-weight: 400;}
                body .matchinfo-table tr td:first-child {font-size: 13px;font-weight: bold;}

                body .CN-accordion-content .squad-boxes ul li a .txt .playername {font-size: 12px;font-weight: bold;}
                body .CN-ranking-main .CN-rankingTable tr th {font-weight: bold;font-size: 14px;}
                body .CN-ranking-main .CN-rankingTable tr td {font-size: 14px;}
                body .CN-ranking-main .CN-rankingTable.teamRanking tr td .teambox a .teamrname {font-weight: bold !important;font-size: 14px;}

                body .rakings-tabs {font-size: 15px;}
                body .rakings-tabs li.active a {font-weight: bold;}

                body .CN-videosec-h .image-box .counter {font-size: 14px;}
                body .CN-team-wrap li a .player-discription .specality {}
                body .CN-team-wrap li a .player-discription .player-name {font-weight: bold;}

                body .CNL1Menu ul {font-size: 14px;}
                body .CNL1Menu>ul>li.series-navBtn>a {font-size: 12px;}
                body p.pageContent {padding: 10px 10px;font-size: 16px;line-height: 1.5;}
                body .CN-video-smallh li a .image-box {overflow: hidden;}

                body .CN-scoreCard .glide__slides .teamscoreWrap .scorebox {position: relative;}
                body .CN-scoreCard .glide__slides .teamscoreWrap .scorebox .heading {position: absolute;left: 0;top: 0px;font-size: 10px;line-height: 11px;color: #FF5148;text-transform: uppercase;}
                body .CN-scoreCard .glide__slides .teamscoreWrap .scorebox:first-child .heading {right: 0px;}

                body .CN-Thumbstory .CN-ThumbStory-col .text a {font-size: 16px;line-height: 1.5;}
                body .CN-Sections .CN-listbox-1 li .CN-listwrap .text-1.text-2 {font-weight: 600;}
                body .CN-scoreCard .glide__slides .strip * {color: #fff !important;}
                body .most-ran-table tr td .playerbox .txt .playername {font-weight: bold; text-decoration: none}
                body .most-ran-table tr th {font-weight: bold; background: #001d42!important;padding: 10px 0;}
                body .most-ran-table tr:last-child th{padding:6px 10px!important;}
                body .playerWidget .player-discription .player-name {font-size: 22px;}
                body .profile-tabs {font-size: 15px;}
                body .profile-tabs li.active a {font-weight: bold;}
                body .CN-profile-main .CN-profileTable tr th {font-weight: bold;}
                body .CN-profile-main .CN-profileTable tr td:first-child {font-weight: bold;}
                .CN-videosec-h-slider .glide__slides {display: flex;overflow: hidden;}
                .CN-videosec-h-slider .glide__track {overflow: hidden;}
                .custom_glide__slides {display: flex; justify-content: space-between;}

                body .news li a .content-box .discription {font-size: 15px;line-height: 1.5;font-weight: bold;}

                /* show hide css below (use below css while implementing) ******* */
                .read_less_containr {display: block;overflow: hidden;position: relative;height: 152px;margin-bottom: 0px!important;}
                .read_full_containr {height: auto !important;}
                .buttonGrp {position: relative; margin: 10px auto 10px;  background: linear-gradient(transparent, #fff, #fff); padding-top: 40px; margin-top: -40px;}
                .buttonGrp button {background-color: #EB3D3C; border: none;width: 135px; padding: 10px 15px 10px 0px; box-sizing: border-box; border-radius: 20px; cursor: pointer; color: #fff; font-size: 14px; line-height: 19px; font-weight: 400; outline: none; margin: auto; display: block;text-transform: capitalize;}
                .buttonGrp.rd_less .arrows {width: 13px;transform: rotate(-89deg);}
                .rd_less button {background-color: #707070;}
                .buttonGrp .arrows {position: absolute; top: 18px; right: 50%; width: 12px; height: 1px; background-color: #fff; margin-right: -52px;}
                .buttonGrp .arrows {width: 13px;transform: rotate(89deg);}
                .buttonGrp .arrows:before, .buttonGrp .arrows:after {content: "";position: absolute;width: 7px;height: 1px;top: -2px;right: -1px;background-color: #fff;transform: rotate(45deg);}
                .buttonGrp .arrows:after {top: 2px;transform: rotate(-45deg);}
                .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer;margin-top:14px;margin-bottom: 10px;}
            `}</style>
        </>
    );
};
export default cnNewsMobile;
