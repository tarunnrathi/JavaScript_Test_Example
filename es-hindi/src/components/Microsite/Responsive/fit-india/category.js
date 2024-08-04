import { React, useEffect } from "react";
import dynamic from "next/dynamic";

// import SiteAd from 'widgets/Common/Responsive/SiteAd';
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import "slick-carousel/slick/slick.css";
import siteConfig from 'config/site.config';
import ReactHtmlParser from 'html-react-parser';
import { imageLoader } from 'includes/article.util';
import Header from "./Header";

const INIT_OOP_Manager = dynamic(() =>
import("components/Common/INIT_OOP_Manager"));
const ScriptManager = dynamic(() =>
    import("components/Common/ScriptManager")
);

const FitIndiaCategory = (props) => {
    const { articleTagResult: fitIndiaArtDataList, categoryTitle, categoryDescription, isMobile, pageSeo, topic: category, pageAds, sponsorData } = props.data;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/js/health.js?v5";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            < Header sponsorData={sponsorData} pageSeo={pageSeo} />
            <div>
                <ScriptManager />
                <INIT_OOP_Manager pageAds={pageAds}/>
                <div className="inner-banner">
                    <div className="max-width-class">
                        <div className="banner-header">
                            <h2 className="banner-ttl">{categoryTitle}</h2>
                            <div className="brought-logo">
                                <span className="b-ttl">brought to you by</span>
                                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/b-logo.png" className="b-logo" alt="b-logo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="banner-footer">
                    <div className="max-width-class">
                        <div className="banner-bottom">
                            <h3 className="banner-desc">{categoryDescription}</h3>
                            <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/inner-banner-img.png" className="inner-b-img" alt="" />
                        </div>
                    </div>
                </div>
                <section className="article-sect iner-art-sect">
                    <div className="max-width-class">
                        <div className="article-f">
                            <div className="a-leftt">
                                <div className="art-inner-flex">
                                    {fitIndiaArtDataList && fitIndiaArtDataList !== undefined ?
                                        fitIndiaArtDataList.slice(0, 6).map((topic, index) => {
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
                                                if (index < 6) {
                                                    return (
                                                        <>

                                                            <div className="art-div art-in" key={key} >
                                                                <img src={`${imageUrl}`} alt={`${imageAlt}`} title={`${title}`} width={361} height={204} />
                                                                <h2 className="art-ttl">{titleWithAnchor ? ReactHtmlParser(title) : title}</h2>
                                                                <p className="art-desc"> {topic.intro.substring(0, 120) + "..."}</p>
                                                                <a href={`${webUrl}`} target="_blank" className="rm-txt">Read More</a>
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            }
                                            return "";
                                        }) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="middle-add">
                    <div className="max-width-class">
                        {(isMobile) ? <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                            <div className='mobile_ad_728x90 ad_center'>
                                <NewSiteAd
                                    width={300}
                                    height={250}
                                    slotId={'NW18_HIND_HLTH_FTNS_AL_PWA_ROS_MTF_320'}
                                    adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_HLTH_FTNS_AL_PWA_ROS_MTF_320"}
                                    sizes={[300, 250]}
                                ></NewSiteAd>
                            </div>
                        </div>
                            :
                            <div className='ad_center' style={{ 'marginTop': '10px' }}>
                                <div className='ad_728x90 ad_center'>
                                    <NewSiteAd
                                        width={728}
                                        height={90}
                                        slotId={'NW18_HIND_HLTH_FTNS_AL_ROS_MTF_728'}
                                        adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_MTF_728"}
                                        sizes={[728, 90]}
                                    ></NewSiteAd>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <section className="article-sect iner-art-sect">
                    <div className="max-width-class">
                        <div className="article-f">
                            <div className="a-leftt">
                                <div className="art-inner-flex">
                                    {fitIndiaArtDataList && fitIndiaArtDataList !== undefined ?
                                        fitIndiaArtDataList.slice(6, 12).map((topic, index) => {
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
                                                if (index < 6) {
                                                    return (
                                                        <>

                                                            <div className="art-div art-in" key={key} >
                                                                <img src={`${imageUrl}`} alt={`${imageAlt}`} title={`${title}`} width={361} height={204} />
                                                                <h2 className="art-ttl">{titleWithAnchor ? ReactHtmlParser(title) : title}</h2>
                                                                <p className="art-desc"> {topic.intro.substring(0, 120) + "..."}</p>
                                                                <a href={`${webUrl}`} target="_blank" className="rm-txt">Read More</a>
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            }
                                            return "";
                                        }) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="middle-add">
                    <div className="max-width-class">
                        {(isMobile) ? <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
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
                            <div className='ad_center' style={{ 'marginTop': '10px' }}>
                                <div className='ad_728x90 ad_center'>
                                    <NewSiteAd
                                        width={728}
                                        height={90}
                                        slotId={'NW18_HIND_HLTH_FTNS_AL_ROS_BTF_728'}
                                        adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_HLTH_FTNS_AL_ROS_BTF_728"}
                                        sizes={[728, 90]}
                                    ></NewSiteAd>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <section className="article-sect iner-art-sect">
                    <div className="max-width-class">
                        <div className="article-f">
                            <div className="a-leftt">
                                <div className="art-inner-flex">
                                    {fitIndiaArtDataList && fitIndiaArtDataList !== undefined ?
                                        fitIndiaArtDataList.slice(12, 18).map((topic, index) => {
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
                                                if (index < 6) {
                                                    return (
                                                        <>

                                                            <div className="art-div art-in" key={key} >
                                                                <img src={`${imageUrl}`} alt={`${imageAlt}`} title={`${title}`} width={361} height={204} />
                                                                <h2 className="art-ttl">{titleWithAnchor ? ReactHtmlParser(title) : title}</h2>
                                                                <p className="art-desc"> {topic.intro.substring(0, 120) + "..."}</p>
                                                                <a href={`${webUrl}`} target="_blank" className="rm-txt">Read More</a>
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            }
                                            return "";
                                        }) : null}
                                </div>
                            </div>
                            <a href={`/tag/${category}`} className="view-btn" title="" target="_blank">View more </a>
                        </div>
                    </div>
                </section>
                {(isMobile) ?
                    <div className='mobile_ad_center' style={{ 'marginTop': '10px' }}>
                        <div className='mobile_ad_728x90 ad_center'>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_1x1'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_PG_SLIDER_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_SHOSH_OOP'}
                                adUnit={"NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_SHOSH_OOP"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_PWA/NW18_HIND_HEALTH_FITNESS_PWA/NW18_HIND_HEALTH_FITNESS_PWA_AL/NW18_HIND_AL_PWA_ROS_SKIN_OOP'}
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
                                slotId={'NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_PG_1x1'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_PG_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_PG_SLIDER_1x1"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_Shosh_OOP'}
                                adUnit={"NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_Shosh_OOP"}
                                sizes={[1, 1]}
                            ></NewSiteAd>
                            <NewSiteAd
                                width={1}
                                height={1}
                                slotId={'NW18_HIND_Desktop/NW18_HIND_HEALTH_FITNESS/NW18_HIND_HEALTH_FITNESS_AL/NW18_HIND_ROS_AL_Skin_OOP'}
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
            </div>
        </>
    );
};

export default FitIndiaCategory;
