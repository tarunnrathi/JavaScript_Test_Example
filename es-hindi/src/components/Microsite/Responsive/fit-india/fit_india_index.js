import { React, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const INIT_OOP_Manager = dynamic(() =>
import("components/Common/INIT_OOP_Manager"));

const ScriptManager = dynamic(() =>
    import("components/Common/ScriptManager")
);
const { publicRuntimeConfig } = getConfig();
import getConfig from "next/config";
import siteConfig from 'config/site.config';
import ReactHtmlParser from 'html-react-parser';
import { imageLoader } from 'includes/article.util';
import AQIWidget from "./AQIWidget";
import Header from "./Header";

const article_slider = {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    centerMode: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                dots: false,
                slidesToScroll: 1,

            },
        },
    ],
};

const FitIndiaTemp = (props) => {
    const { articleTagResult: fitIndiaArtDataList, photogallaryTagResult: photogallaryDataList, bannerTagResult: bannerDataList,
         eventDayData: eventData, podcastData: podcastDataList, aqiData: aqiDataSsr, sponsorData, isMobile, pageSeo, pageAds } = props.data;
    const [vvideo, setVvideo] = useState(['', '', '', '', '']);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/js/health.js?v3";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    function videoClick(e, name, intro, youtube, logo) {
        e.preventDefault();
        setVvideo([name, intro, youtube, logo]);
    }
    const eventUrl = publicRuntimeConfig.siteUrl + "fit-india-hit-india/";
    return (
        <>
            < Header sponsorData={sponsorData} pageSeo={pageSeo} />
            <div>
                <ScriptManager />
                <INIT_OOP_Manager pageAds={pageAds}/>
                <div className="add-section">
                    <div className="max-width-class">
                        <div className="add-img" >
                            {(isMobile) ?
                                <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                                    <div className='mobile_ad_728x90 ad_center'>
                                        <NewSiteAd
                                            width={360}
                                            height={50}
                                            slotId={'NW18_HIND_HLTH_FTNS_AL_PWA_ROS_ATF_360x50'}
                                            adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_HLTH_FTNS_AL_PWA_ROS_ATF_360x50"}
                                            sizes={[360, 50]}
                                        ></NewSiteAd>
                                    </div>
                                </div>
                                :
                                <div className='ad_center' style={{ 'marginTop': '10px' }}>
                                    <div className='ad_728x90 ad_center'>
                                        <NewSiteAd
                                            width={1244}
                                            height={70}
                                            slotId={'NW18_HIND_HLTH_FTNS_AL_ROS_ATF_1244x70'}
                                            adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_ATF_1244x70"}
                                            sizes={[1244, 70]}
                                        ></NewSiteAd>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <section className="food-nutrition">
                    <div className="fn-flex">
                        <div className="fn-left">
                            {bannerDataList && bannerDataList !== undefined ?
                                bannerDataList.slice(0, 1).map((topic, index) => {
                                    if (typeof topic === "object") {
                                        const webUrl = typeof topic.weburl !== 'undefined' ?
                                         topic.weburl.replace('/news//', '/news/reviews/').replace('http://www.hindi.news18.com/', 'https://www.hindi.news18.com/') : '#';
                                        const imageUrl = typeof topic.images.url !== 'undefined' && topic.images.url !== '' ?
                                         imageLoader(topic.images.url, 848, 400, false, true) : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH + 'images/default-218x145.jpg';
                                        const title = typeof topic.display_headline !== 'undefined' ? topic.display_headline : '';
                                        const key = topic.id || index;
                                        const { term_image_data } = topic;
                                        const imageAlt = term_image_data ? term_image_data : title;
                                        let titleWithAnchor = false;
                                        if (title.indexOf("<a") !== -1) {
                                            titleWithAnchor = true;
                                        }
                                        if (index < 1) {
                                            return (
                                                 <div className="fn-inner" key={key}>
                                                    <img src={`${imageUrl}`} alt={`${imageAlt}`} title={`${title}`} width={848} height={400} className="res-img" />
                                                    <div className="fn-text">
                                                        <span className="fn-ttl">{titleWithAnchor ? ReactHtmlParser(title) : title}</span>
                                                        <h2 className="fn-title">{topic.intro.substring(0, 120) + "..."}</h2>
                                                        <a className="rd-more" href={`${webUrl}`} target="_blank">Read More</a>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                    return "";
                                })
                                : null}

                        </div>
                        <div className="fn-right">
                            <ul className="art-points">
                                {bannerDataList && bannerDataList !== undefined ?
                                    bannerDataList.slice(1, 4).map((topic, index) => {
                                        if (typeof topic === "object") {
                                            const webUrl = typeof topic.weburl !== 'undefined' ?
                                            topic.weburl.replace('/news//', '/news/reviews/').replace('http://www.hindi.news18.com/', 'https://www.hindi.news18.com/') : '#';
                                            const title = typeof topic.display_headline !== 'undefined' ? topic.display_headline : '';
                                            const key = topic.id || index;
                                            let titleWithAnchor = false;
                                            if (title.indexOf("<a") !== -1) {
                                                titleWithAnchor = true;
                                            }
                                            if (index < 3) {
                                                return (
                                                    <>
                                                        <li className="art-point" key={key}>
                                                            <a className="art-link" href={`${webUrl}`} target="_blank">
                                                                <h2 className="point-ttl">{titleWithAnchor ? ReactHtmlParser(title) : title}</h2>
                                                                <p className="point-desc">{topic.intro.substring(0, 120) + "..."}</p>
                                                            </a>
                                                        </li>
                                                    </>
                                                );
                                            }
                                        }
                                        return "";
                                    })
                                    : null}
                            </ul>
                        </div>
                    </div>
                </section>
                {(isMobile) ?
                    <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                        <div className='mobile_ad_728x90 ad_center'>
                            <NewSiteAd
                                width={300}
                                height={250}
                                slotId={'NW18_HIND_HLTH_FTNS_AL_PWA_ROS_ATF_300'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_HLTH_FTNS_AL_PWA_ROS_ATF_300"}
                                sizes={[300, 250]}
                            ></NewSiteAd>
                        </div>
                    </div>
                    : " "
                }
                <section className="explore-sect">
                    <div className="max-width-class">
                        <h2 className="main-ttl">एक्सप्लोर</h2>
                        <div className="explore-flex">
                            <div className="explore-left">
                                <div className="tips-flex">
                                    <div className="health-exercise">
                                        <a href="#quize">
                                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/quiz.png" className="exercise-img" alt=" " />
                                            <div className="ex-names">
                                                <h2 className="ex-ttl">क्विज़</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="health-exercise">
                                        <a href="#poll">
                                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/poll_icon_new_img.jpg" className="exercise-img" alt=" " />
                                            <div className="ex-names">
                                                <h2 className="ex-ttl">पोल</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="health-exercise">
                                        <a href="#photogallery">
                                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/photogallery_icon_new.jpg"
                                             className="exercise-img" alt="photogallary-icon" />
                                            <div className="ex-names">
                                                <h2 className="ex-ttl">फोटोगैलरी</h2>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="health-exercise">
                                        <a href="/fit-india-hit-india/ayurveda/">
                                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/ayur.png" className="exercise-img" alt=" " />
                                            <div className="ex-names">
                                                <h2 className="ex-ttl">आयुर्वेद</h2>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="explore-right">
                                <div className="explore-widget">
                                    {
                                        eventData ? (eventData?.data['NEWS18:microsite_data_speaker_85']?.data?.[0]?.data || []).map((item, index) => {
                                            // console.log(item);
                                            const eventDayUrl = eventUrl + item.designation + "/";
                                            if (item.status === "1") {
                                                return (
                                                    <>
                                                        <a href={eventDayUrl} className="explore-link" key={index}>
                                                            <img src={item.thumb} className="exp-wid" alt={item.name} />
                                                        </a>
                                                    </>
                                                );
                                            } return "";
                                        }) : ""
                                    }
                                </div>
                                <div className="explore-widget">
                                    <div className="explore-link">
                                        {(isMobile) ?
                                            <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                                                <div className='mobile_ad_728x90 ad_center'>
                                                    <NewSiteAd
                                                        width={300}
                                                        height={100}
                                                        slotId={'NW18_HIND_HLTH_FTNS_AL_PWA_ROS_ATF_300x100'}
                                                        adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_HLTH_FTNS_AL_PWA_ROS_ATF_300x100"}
                                                        sizes={[300, 100]}
                                                    ></NewSiteAd>
                                                </div>
                                            </div>
                                            :
                                            <div className='ad_center' style={{ 'marginTop': '10px' }}>
                                                <div className='ad_728x90 ad_center'>
                                                    <NewSiteAd
                                                        width={300}
                                                        height={150}
                                                        slotId={'NW18_HIND_HLTH_FTNS_AL_ROS_ATF_300x150'}
                                                        adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_ATF_300x150"}
                                                        sizes={[300, 150]}
                                                    ></NewSiteAd>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="web-sect">
                        <div className="max-width-class">
                            <h2 className="main-ttl">वेब स्टोरी </h2>
                            <div className="web-flex">
                                <div className="w-left">
                                    <div className="story-flex">
                                        {
                                            eventData && eventData !== undefined ? (eventData?.data['NEWS18:microsite_data_speaker_85']?.data?.[1]?.data || []).map((item) => {

                                                if (item.status === "1") {
                                                    return (
                                                            <div className="story-div" key={item.number}>
                                                                <div className="story-slide">
                                                                    <a href={item.designation} target="_blank">
                                                                        <figure>
                                                                            <img style={{ maxWidth: "190px" }} src={item.thumb} alt={item.title} width="190px" height="320px" className="story-img" />
                                                                        </figure>
                                                                        <div className="story-text">
                                                                            <h2 className="story-ttl">{item.name}</h2>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                    );
                                                } return "";
                                            }) : ""
                                        }

                                    </div>
                                    <div className="seemore_Wrp">
                                        <a href="https://hindi.news18.com/web-stories/lifestyle/" className="see_more" target="_blank">see more </a>
                                    </div>
                                </div>
                                <div className="w-right">
                                    <div className="ex-add">
                                        <div className="add-link">
                                            {(isMobile) ?
                                                <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                                                    <div className='mobile_ad_728x90 ad_center'>
                                                        <NewSiteAd
                                                            width={300}
                                                            height={250}
                                                            slotId={'NW18_HIND_HLTH_FTNS_AL_PWA_ROS_MTF_300'}
                                                            adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_HLTH_FTNS_AL_PWA_ROS_MTF_300"}
                                                            sizes={[300, 250]}
                                                        ></NewSiteAd>
                                                    </div>
                                                </div>

                                                :
                                                <div className='ad_center' style={{ 'marginTop': '10px' }}>
                                                    <div className='ad_728x90 ad_center'>
                                                        <NewSiteAd
                                                            width={300}
                                                            height={250}
                                                            slotId={'NW18_HIND_HLTH_FTNS_AL_ROS_ATF_300'}
                                                            adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_ATF_300"}
                                                            sizes={[300, 250]}
                                                        ></NewSiteAd>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="videos-sect">
                    <div className="max-width-class">
                        <h2 className="main-ttl">वीडियो</h2>
                    </div>
                    <div className="inner-vid-sect">
                        <div className="max-width-class">
                            <div className="videos-flex">
                                <div className="v-left">
                                    {eventData ? (eventData?.data['NEWS18:microsite_data_speaker_85']?.data?.[2]?.data || []).map((dataItem, j) => {
                                            const youtubeurl = "https://www.youtube.com/embed/" + dataItem.designation;
                                            // console.log(youtubeurl)
                                            return (
                                                <div className="inner-video" id="video" key={j}>

                                                    {j === 0 ?
                                                        <div className="row mtb" >
                                                            <div className="hero_video" id="iframe-w">
                                                                <iframe width="700" height="400" src={vvideo[2] === '' ? youtubeurl : vvideo[2]} title="YouTube video player" frameBorder="0" allow=
                                                                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="video-img"></iframe>
                                                            </div>
                                                            <div>
                                                                <div className="video-desc">
                                                                    <span className="vid-ttl">{vvideo[0] === '' ? dataItem.name : vvideo[0]}</span>
                                                                    <p className="vid-text">{vvideo[1] ==='' ? dataItem.company : vvideo[1]}</p>
                                                                </div>
                                                            </div>
                                                        </div> : null
                                                    }
                                                </div>
                                            );
                                        })
                                        : null}

                                </div>
                                <div className="v-right">
                                    <ul className="video-list">
                                        {eventData ? (eventData?.data['NEWS18:microsite_data_speaker_85']?.data?.[2]?.data || []).map((item, i) => {
                                                const youtubeurl = "https://www.youtube.com/embed/" + item.designation;
                                                return (
                                                    <li className="v-list" key={i} onClick={(e) => videoClick(e, item.name, item.company, youtubeurl, item.thumb)}
                                                    >
                                                        <a href="#video" className="vid-link">

                                                            <img className="vlist-img" src={item.thumb} alt="thumnail"/>
                                                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/play-cion.png"
                                                             className="small-play" alt="play-icon"></img>
                                                            <div className="vlist-data">
                                                                <h2 className="vlist-ttl">{item.name}</h2>
                                                                <p className="vlist-desc">{item.company} </p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                );
                                            })
                                            : null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="article-sect">
                    <div className="max-width-class">
                        <h2 className="main-ttl">लेख</h2>
                    </div>
                    <div className="max-width-class">
                        <div className="article-flex">
                            <div className="a-left" >
                                <Slider {...article_slider} className="article-slider">
                                    {fitIndiaArtDataList && fitIndiaArtDataList !== undefined ?
                                        fitIndiaArtDataList.slice(0, 8).map((topic, index) => {
                                            if (typeof topic === "object") {
                                                const webUrl = typeof topic.weburl !== 'undefined' ?
                                                topic.weburl.replace('/news//', '/news/reviews/').replace('http://www.hindi.news18.com/', 'https://www.hindi.news18.com/') : '#';
                                                const imageUrl = typeof topic.images.url !== 'undefined' && topic.images.url !== '' ?
                                                imageLoader(topic.images.url, 361, 204, false, true) : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH + 'images/default-218x145.jpg';
                                                const title = typeof topic.display_headline !== 'undefined' ? topic.display_headline : '';
                                                const key = topic.id || index;
                                                const { term_image_data } = topic;
                                                const imageAlt = term_image_data ? term_image_data : title;
                                                let titleWithAnchor = false;
                                                if (title.indexOf("<a") !== -1) {
                                                    titleWithAnchor = true;
                                                }
                                                if (index < 7) {
                                                    return (
                                                            <div className="art-div" key={key} >
                                                                <img src={`${imageUrl}`} alt={`${imageAlt}`} title={`${title}`} width={361} height={204} />
                                                                <h2 className="art-ttl">{titleWithAnchor ? ReactHtmlParser(title) : title}</h2>
                                                                <p className="art-desc"> {topic.intro.substring(0, 120) + "..."}</p>
                                                                <a href={`${webUrl}`} target="_blank" className="rm-txt">Read More</a>
                                                            </div>
                                                    );
                                                }
                                            }
                                            return "";
                                        }) : null}
                                </Slider>
                            </div>
                            <div className="a-right">
                                <div className="right-add">
                                    {(isMobile) ?
                                        <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                                            <div className='mobile_ad_728x90 ad_center'>
                                                <NewSiteAd
                                                    width={300}
                                                    height={250}
                                                    slotId={'NW18_HIND_HLTH_FTNS_AL_PWA_ROS_BTF_320'}
                                                    adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_HLTH_FTNS_AL_PWA_ROS_BTF_320"}
                                                    sizes={[300, 250]}
                                                ></NewSiteAd>
                                            </div>
                                        </div>
                                        :
                                        <div className='ad_center' style={{ 'marginBottom': '30px' }}>
                                            <div className='ad_728x90 ad_center'>
                                                <NewSiteAd
                                                    width={300}
                                                    height={250}
                                                    slotId={'NW18_HIND_HLTH_FTNS_AL_ROS_BTF_300'}
                                                    adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_BTF_300"}
                                                    sizes={[300, 250]}
                                                ></NewSiteAd>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="art-books-flex">
                            <div className="art-book" id="quize">
                                <h2 className="ttle-poll"> प्रश्नों के उत्तर दें</h2>
                                <div className="qframe">
                                    <iframe frameBorder="0" width="400px" height="500px" scrolling="auto" allowtransparency="true" src="https://news18.survey.fm/fit-india-hindi-quiz?iframe=1"></iframe>
                                </div>
                            </div>
                            <div className="art-book">
                                <AQIWidget aqiData={aqiDataSsr} />
                            </div>
                            <div className="art-book" id="poll">
                                <h2 className="ttle-poll">पोल के उत्तर दें</h2>
                                <iframe src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/poll-hindi.html" width="400" height="500"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="middle-add">
                    <div className="max-width-class">
                        {(isMobile) ? '' :
                            <div className='ad_center' style={{ 'marginTop': '10px' }}>
                                <div className='ad_728x90 ad_center'>
                                    <NewSiteAd
                                        width={728}
                                        height={90}
                                        slotId={'NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_BTF_728'}
                                        adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_BTF_728"}
                                        sizes={[728, 90]}
                                    ></NewSiteAd>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* <section className="newsletter-sect">
                    <div className="max-width-class">
                        <h2 className="main-ttl">Subscribe To Our Newsletter </h2>
                        <div className="news-form">
                            <p className="frm-ttl">Get your Daily Dose in your Inbox !</p>
                            <form>
                                <div className="form-flex">
                                    <div className="form-ip">
                                        <input typr="text" placeholder="First Name" className="ip-field" />
                                    </div>
                                    <div className="form-ip">
                                        <input typr="text" placeholder="Last Name" className="ip-field" />
                                    </div>
                                </div>
                                <div className="form-flex">
                                    <div className="form-ip">
                                        <input typr="text" placeholder="EmailID" className="ip-field" />
                                    </div>
                                    <div className="form-ip">
                                        <input typr="text" placeholder="Phone Number" className="ip-field" />
                                    </div>
                                </div>
                                <div className="terms">
                                    <input type="checkbox" className="ip-check" /> <span className="terms-txt">T&c</span>
                                </div>
                                <button type="submit" className="submit-btn">SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </section> */}
                <section className="pod-cast">
                    <div className="max-width-class">
                        <h2 className="main-ttl">पॉडकास्ट</h2>
                        <div className="padcast-contain">
                            {(podcastDataList !== '' && podcastDataList !== undefined) ?
                                podcastDataList.slice(0, 8).map(
                                    (item, index) => {
                                        const object = item?.podcast_embed;
                                        const title = item?.display_headline;
                                        return (
                                            <div className="podcast" key={index}>
                                                <figure className="pod-img">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: object,
                                                        }}
                                                    ></div>
                                                </figure>
                                                <h2 className="podcast-ttl" style={{ marginTop: 10 }}>
                                                    {title}
                                                </h2>
                                                <div className="read_more">
                                                    <a href={item?.weburl}>और भी पढ़ें</a>
                                                </div>
                                            </div>
                                        );
                                    }
                                ) : ""}
                        </div>

                    </div>
                </section>
                {photogallaryDataList && photogallaryDataList !== undefined ?
                    <section className="photo-gallary" id="photogallery">
                        <div className="max-width-class">
                            <h2 className="main-ttl">फोटोगैलरी</h2>
                            <div className="phto-content">
                                <ul className="tab_gallary tabs-nav">
                                </ul>
                                <div className="gallary-details tab-content" id="tab1">
                                    <div className="gallary-tabs">
                                        <div className="gallary-main">
                                            {
                                                photogallaryDataList && photogallaryDataList !== undefined ? photogallaryDataList.map((topic, index) => {
                                                    if (typeof topic === "object") {
                                                        const webUrl = typeof topic.weburl !== 'undefined' ?
                                                        topic.weburl.replace('/news//', '/news/reviews/').replace('http://www.hindi.news18.com/', 'https://www.hindi.news18.com/') : '#';
                                                        const thumbnailUrl = typeof topic.images.url !== 'undefined' && topic.images.url !== '' ?
                                                         imageLoader(topic.images.url, 450, 300, false, true) : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH + 'images/default-218x145.jpg';
                                                        const title = typeof topic.display_headline !== 'undefined' ? topic.display_headline : '';
                                                        const { term_image_data } = topic;
                                                        const imageAlt = term_image_data ? term_image_data : title;
                                                        let titleWithAnchor = false;
                                                        if (title.indexOf("<a") !== -1) {
                                                            titleWithAnchor = true;
                                                        }
                                                        return (
                                                                <div className="img-first" key={index}>
                                                                    <a href={`${webUrl}`} target="_blank">
                                                                        <img src={`${thumbnailUrl}`} width={450} height={300} alt={imageAlt} />
                                                                        <div className="caption">{titleWithAnchor ? ReactHtmlParser(title) : title}</div>
                                                                    </a>
                                                                </div>
                                                        );
                                                    }
                                                    return "";
                                                }) : ''
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section> : null}

                {/* 1x1 ad codes */}

                {(isMobile) ?
                    <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                        <div className='mobile_ad_728x90 ad_center'>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_AL_PWA_ROS_PG_1x1'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_AL_PWA_ROS_SHOSH_OOP'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_SHOSH_OOP"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_AL_PWA_ROS_SKIN_OOP'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_SKIN_OOP"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                        </div>
                    </div>
                    :
                    <div className='ad_center' style={{ 'marginTop': '10px' }}>
                        <div className='ad_728x90 ad_center'>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_ROS_AL_PG_1x1'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_PG_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_ROS_AL_PG_SLIDER_1x1'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_ROS_AL_Shosh_OOP'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_Shosh_OOP"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_ROS_AL_Skin_OOP'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_Skin_OOP"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                        </div>
                    </div>
                }

                <footer className="health-footer">
                    <div className="max-width-class">
                        <div className="footer-flex">
                            <span className="copyright">©Network18. All rights reserved.</span>
                            <div className="privacy">
                                <a className="privacy-policy" target="_blank" href="https://www.news18.com/privacy_policy/">Disclaimer  |</a>
                                <a className="privacy-policy" target="_blank" href="https://www.news18.com/privacy_policy/">Privacy Statement  |</a>
                                <a className="privacy-policy" target="_blank" href="https://www.news18.com/privacy_policy/">Terms of Use </a>
                            </div>
                            <div className="social-share">
                                <span className="copyright connect">Connect @</span>
                                <a className="soc-icon" target="_blank" href=" https://instagram.com/cnnnews18?igshid=YmMyMTA2M2Y=">
                                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/isnta.png" className="soc-img" alt="" /></a>
                                <a className="soc-icon" target="_blank" href="https://www.facebook.com/cnnnews18/">
                                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/fb.png" className="soc-img" alt="" /></a>
                                <a className="soc-icon" target="_blank" href="https://twitter.com/CNNnews18">
                                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/tw.png" className="soc-img" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* <div className="chat-bot">
                    <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/chat-bot.png" class="bot-img" alt=" " />
                </div> */}
            </div>
        </>
    );
};

export default FitIndiaTemp;
