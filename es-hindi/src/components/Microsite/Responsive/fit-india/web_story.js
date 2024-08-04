import { React, useEffect } from "react";
import dynamic from "next/dynamic";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import ReactHtmlParser from 'html-react-parser';
import "slick-carousel/slick/slick.css";
import { imageLoader } from 'includes/article.util';

const INIT_OOP_Manager = dynamic(() =>
import("components/Common/INIT_OOP_Manager"));
const ScriptManager = dynamic(() =>
  import("components/Common/ScriptManager")
);
import Header from "./Header";

const FitIndiaWebstory = (props) => {
  const { webstories: webstoriesData, sponsorData, pageSeo, pageAds, isMobile } = props.data;

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
              <h2 className="banner-ttl">वेब स्टोरी</h2>
              <div className="brought-logo">
                <span className="b-ttl">brought to you by</span>
                <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/b-logo.png" className="b-logo" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="banner-footer">
          <div className="max-width-class">
            <div className="banner-bottom">
              <h3 className="banner-desc">इस सेक्शन में शानदार तस्वीरों, वीडियो, और ऐनिमेशन के माध्यम से विभिन्न विषयों पर उपयोगी और बेहतरीन कहानी कही जाती है.
              इस सेक्शन की वेब कहानियां लाइफस्टाइल (जीवनशैली) से जुड़ी हैं.</h3>
              <img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/fit-india/images/inner-banner-img.png" className="inner-b-img" alt="" />
            </div>
          </div>
        </div>
        <section className="article-sect iner-art-sect">
          <div className="max-width-class">
            <div className="article-f">
              <div className="a-leftt">
                <div className="story-flex inner-story-flex">

                  {
                    webstoriesData !== '' && webstoriesData !== undefined ? webstoriesData.slice(0, 8).map((item, j) => {

                      const width = 213;
                      const height = 320;
                      const filterOut = (item.feature_img || '').includes("storyasset.link") || (item.feature_img || '').includes("images.news18.com");
                      const imageSrc = filterOut ? item.feature_img : imageLoader(item.feature_img, width, height);
                      return (
                        <div className="story-div" key={j}>
                          <div className="story-slider story-slide">
                            <a href={item.web_url ? item.web_url : ''} target="_blank">
                              <figure>
                                <img style={{ maxWidth: "213" }} src={imageSrc} alt={item.title} width="213" height="320" className="story-img" />
                              </figure>
                              <div className="story-text">
                                <h2 className="story-ttl">{ReactHtmlParser((item.blog_title || "")?.replace(/\\/g, ''))}</h2>
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    }) : ''
                  }

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
                <div className="story-flex inner-story-flex">

                  {
                    webstoriesData !== '' && webstoriesData !== undefined ? webstoriesData.slice(8, 16).map((item, j) => {

                      const width = 213;
                      const height = 320;
                      const filterOut = (item.feature_img || '').includes("storyasset.link") || (item.feature_img || '').includes("images.news18.com");
                      const imageSrc = filterOut ? item.feature_img : imageLoader(item.feature_img, width, height);
                      return (
                        <div className="story-div" key={j}>
                          <div className="story-slider story-slide">
                            <a href={item.web_url ? item.web_url : ''} target="_blank">
                              <figure>
                                <img style={{ maxWidth: "213" }} src={imageSrc} alt={item.title} width="213" height="320" className="story-img" />
                              </figure>
                              <div className="story-text">
                                <h2 className="story-ttl">{ReactHtmlParser((item.blog_title || "")?.replace(/\\/g, ''))}</h2>
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    }) : ''
                  }

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
                <div className="story-flex inner-story-flex">

                  {
                    webstoriesData !== '' && webstoriesData !== undefined ? webstoriesData.slice(16, 24).map((item, j) => {
                      const width = 213;
                      const height = 320;
                      const filterOut = (item.feature_img || '').includes("storyasset.link") || (item.feature_img || '').includes("images.news18.com");
                      const imageSrc = filterOut ? item.feature_img : imageLoader(item.feature_img, width, height);
                      return (
                        <div className="story-div" key={j}>
                          <div className="story-slider story-slide">
                            <a href={item.web_url ? item.web_url : ''} target="_blank">
                              <figure>
                                <img style={{ maxWidth: "213" }} src={imageSrc} alt={item.title} width="213" height="320" className="story-img" />
                              </figure>
                              <div className="story-text">
                                <h2 className="story-ttl">{item.blog_title}</h2>
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    }) : ''
                  }

                </div>
              </div>
              <a href="https://hindi.news18.com/web-stories/lifestyle/" className="view-btn" title="" target="_blank">View more  </a>
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
                <a className="privacy-policy" href="https://www.news18.com/privacy_policy/" target="_blank">Disclaimer  |</a>
                <a className="privacy-policy" href="https://www.news18.com/privacy_policy/" target="_blank">Privacy Statement  |</a>
                <a className="privacy-policy" href="https://www.news18.com/privacy_policy/" target="_blank">Terms of Use </a>
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

export default FitIndiaWebstory;
