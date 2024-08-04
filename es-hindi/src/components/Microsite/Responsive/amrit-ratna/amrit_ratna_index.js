import { React, useState } from "react";
import Head from "next/head";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import dynamic from "next/dynamic";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

const INIT_OOP_Manager = dynamic(() =>
import("components/Common/INIT_OOP_Manager"));
const ScriptManager = dynamic(() =>
  import("components/Common/ScriptManager")
);
import { imageLoader } from 'includes/article.util';

const video_slider = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1
      }
    }
  ]
};
const speaker_slider = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 1
      }
    }
  ]
};
const article_slider = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1
      }
    }
  ]
};
const sponsor_slider = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
};
const AmritRatnaTemp = (props) => {
  const { articleTagResult: AmritRatnaArticleDataList, videosTagResult: AmritRatnaVideosDataList, photogallaryTagResult: AmritRatnaPhotogallaryDataList,
     amritRatnaRedisData: amritRatnaRedisDataList, amritRatnaAjendaData: amritRatnaAjendaDataList, amritRatnaOverviewData: amritRatnaOverviewDataList, pageSeo, pageAds } = props.data;
  const menuArr = [{ name: "होम", activeTab: "home", url: "#banner-section" },
  { name: "परिचय", activeTab: "overview", url: "#overview" },
  { name: "SPEAKERS", activeTab: "speakers", url: "#speakers" },
  { name: "AGENDA", activeTab: "agenda", url: "#agenda" },
  { name: "विडियो", activeTab: "video", url: "#videos" },
  { name: "फोटो गैलरी", activeTab: "photo", url: "#photogallery" },
  { name: "आर्टिकल", activeTab: "articles", url: "#articles" }];
  const [activeItem, setActiveItem] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const showMenuBar = () => {
    setShowMenu(!showMenu);
  };
  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <Head>
        <title>{pageSeo.title}</title>
        <meta name="description" content={pageSeo.description} />
        <meta name="keywords" content={pageSeo.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="max-image-preview:large" key="robot" />
        <meta httpEquiv="X-UA-Compatible" content="IE7, IE8, IE9" />
        <meta property="fb:admins" content="503334673" />
        <meta property="fb:pages" content="31867849201" />
        <meta
          property="fb:page_id"
          content="31867849201, 187957574620134, 126166140913489, 784667114916040,1075464282525405, 312128074436"
        />
        <meta property="og:image" content={pageSeo.image} />
        <meta property="fb:app_id" content="115930713951815" />
        <meta
          property="og:title"
          content={pageSeo.title ? pageSeo.title : ""}
        />
        <meta
          property="og:description"
          content={
            pageSeo.description
              ? pageSeo.description
              : ""
          }
        />
        <meta
          property="og:image"
          content={
            pageSeo.ogImage
              ? pageSeo.ogImage
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          property="og:image:alt"
          content={
            pageSeo.og_image_alt
              ? pageSeo.og_image_alt
              : ""
          }
        />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="900" />
        <meta property="og:locale" content="en_US" />

        <meta property="og:site_name" content="News18" />
        <meta
          property="og:url"
          content={pageSeo.weburl ? pageSeo.weburl : ""}
        />

        <meta
          name="tweetmeme-title"
          content={pageSeo.title ? pageSeo.title : ""}
        />
        <meta
          name="twitter:title"
          content={pageSeo.title ? pageSeo.title : ""}
        />
        <meta
          name="twitter:description"
          content={
            pageSeo.description
              ? pageSeo.description
              : ""
          }
        />
        <meta name="twitter:site" content="@cnnnews18" />
        <meta name="twitter:creator" content="@cnnnews18" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={
            pageSeo.canonical
              ? pageSeo.canonical.replace("amp/", "")
              : ""
          }
        />
        <meta
          name="twitter:image"
          content={
            pageSeo.image ? pageSeo.image : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          name="twitter:image:alt"
          content={
            pageSeo.og_image_alt ? pageSeo.og_image_alt : ""
          }
        />

        <meta
          itemprop="image"
          content={
            pageSeo.itemPropImage
              ? pageSeo.itemPropImage
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Raleway:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/amrit-ratna/css/amrit-ratna.css?v=0.83"
        />
      </Head>
      <div>
        <ScriptManager />
        <INIT_OOP_Manager pageAds={pageAds}/>
        {/* <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>  */}
        <header className="amrit-header">
          <div className="max-width-class">
            <div className="header-inner">
              <div className={showMenu ? 'hamburger-container change' : 'hamburger-container'} onClick={showMenuBar}>
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
              </div>
              <ul className={showMenu ? 'nav-list open-nav' : 'nav-list'} id="nav-menus" onClick={showMenuBar}>
                {
                  menuArr ? menuArr.map((item, index) => {
                    return (
                      <>
                        <li className="nav-menus" key={index}><a href={item.url} className={activeItem === item.activeTab ? 'nav-links active' : 'nav-links'}
                          onClick={() => handleClick(item.activeTab)}>{item.name}</a></li>
                      </>
                    );
                  }) : ""
                }
              </ul>
              <div className="backto-link">
                <a
                  href="https://hindi.news18.com/"
                  target="_blank"
                  className="backto-nw18"
                >
                  <span> News18india.com</span>  पर जाएँ
                </a>
              </div>
            </div>
          </div>
        </header>
        <section className="banner" id="banner-section">
          <div className="max-width-class-banner">
            <div className="banner-content">
              <div className="date-time">
                {
                  amritRatnaRedisDataList ? (amritRatnaRedisDataList?.data['NEWS18:microsite_data_speaker_290']?.data?.[1]?.data || []).map((item, index) => {
                    if (index < 1) {
                      if (item.status === "1") {
                        return (
                          <>
                            <div className="event-date">
                              <p className="e-date">
                                {item.designation}
                              </p>
                            </div>
                            <div className="event-time">
                              <p className="ev-txt">{item.company}</p>
                            </div>

                          </>
                        );
                      }
                    } return "";
                  }) : ""
                }
              </div>
            </div>
          </div>
          <div className="max-width-class-banner">
            <div className="sponsor-div">
              {/* <h2 className="sponsor-ttl">Sponsored by</h2> */}
              <Slider className="sponsor-slider" {...sponsor_slider}>
                {
                  amritRatnaRedisDataList ? (amritRatnaRedisDataList?.data['NEWS18:microsite_data_speaker_290']?.data?.[0]?.data || []).map((item, index) => {
                    if (item.status === "1") {
                      return (
                        <>

                          <a className="spon-slider" key={index} href={item.designation} target="_blank">
                            <h2 className="sponsor-ttl">{item.company}</h2>
                            <img
                              src={item.thumb}
                              className="spon-img"
                              alt={item.name}
                            />
                          </a>
                        </>
                      );
                    } return "";
                  }) : ""
                }
              </Slider>
            </div>
          </div>
        </section>
        <section className="overview" id="overview">
          <div className="overview-inner">
            <div className="max-width-class">
              <h2 className="sec-ttl">परिचय</h2>
              <div className="overview-content">
                {
                  amritRatnaRedisDataList ? (amritRatnaRedisDataList?.data['NEWS18:microsite_data_speaker_290']?.data?.[1]?.data || []).map((item, index) => {
                    if (index < 1) {
                      const youtubeUrl = "https://www.youtube.com/embed/" + item.thumb + "?autoplay=1&mute=1";
                      if (item.status === "1") {
                        return (
                          <>
                            <div className="overview-video" key={index}>
                              <iframe width={560} height={300} src={youtubeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write;
                               encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                            </div>
                          </>
                        );
                      }
                    } return "";
                  }) : ""
                }

                <div className="overview-text">
                  {
                    amritRatnaOverviewDataList ? (amritRatnaOverviewDataList.data['NEWS18:tata_power_conclave_event_1695081600'] || []).map((item) => {

                      if (item.status === "active") {
                        return (
                          <>
                            <div dangerouslySetInnerHTML={{ __html: item.data }}>
                            </div>

                          </>
                        );
                      } return "";
                    }) : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="speakers" id="speakers">
          <div className="max-width-class">
            <h2 className="sec-gold-ttl">SPEAKERS</h2>
            <div className="speakers-inner">
              <Slider className="speaker-slider" {...speaker_slider}>
                {
                  amritRatnaRedisDataList ? (amritRatnaRedisDataList?.data['NEWS18:microsite_data_speaker_290']?.data?.[2]?.data || []).map((item, index) => {
                    if (item.status === "1") {
                      return (
                        <>
                          <div className="speaker-slide" key={index}>
                            <img
                              src={item.thumb}
                              alt={item.name}
                              className="speaker-img"
                            />
                            <h2 className="speaker-name">{item.name}</h2>
                            <p className="speakr-desig">{item.designation}</p>
                          </div>
                        </>
                      );
                    } return "";
                  }) : ""
                }
              </Slider>
            </div>
          </div>
        </section>
        <section className="agenda" id="agenda">
          <div className="max-width-class">
            <h2 className="sec-ttl">AGENDA</h2>
            <div className="agenda-inner">
              <div className="agenda-container">
                {
                  amritRatnaAjendaDataList ? amritRatnaAjendaDataList.data['NEWS18:tata_power_conclave_event_1693180800'].map((item, index) => {
                    return (
                      <>
                        <div className="agenda-timeline-block" key={index}>
                          <div className="agenda-timeline-img agenda-picture"></div>
                          <div className="agenda-timeline-content">
                            <span dangerouslySetInnerHTML={{ __html: item.data }}></span>
                            <span className="agenda-date">{item.stime}</span>
                          </div>
                        </div>
                      </>
                    );
                  }) : ""
                }
              </div>
            </div>
          </div>
        </section>
        <section className="videos" id="videos">
          <div className="max-width-class">
            <h2 className="sec-gold-ttl">विडियो</h2>
            <div className="speakers-inner">
              <Slider className="video-slider" {...video_slider}>
                {
                  AmritRatnaVideosDataList ? AmritRatnaVideosDataList.map((topic, index) => {
                    if (typeof topic === "object") {
                      const webUrl = topic.weburl ? topic.weburl.replace('/news//', '/news/reviews/').replace('http://www.hindi.news18.com/', 'https://www.hindi.news18.com/') : '#';
                      const imageUrl = topic.images.url !== 'undefined' && topic.images.url !== '' ?
                        imageLoader(topic.images.url, 324, 194, false, true) : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH + 'images/default-218x145.jpg';
                      const title = typeof topic.display_headline !== 'undefined' ? topic.display_headline : '';
                      return (
                        <>
                          <a href={webUrl} className="video-slide" key={index} target="_blank">
                            <div className="video-imgs">
                              <img
                                src={imageUrl}
                                alt={title}
                                className="video-img"
                              />
                              <img
                                src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/amrit-ratna/images/play-icon.png"
                                alt="play-icon"
                                className="play-icon"
                              />
                            </div>
                            <div className="video-desc">
                              <h2 className="video-text">{title}</h2>
                            </div>
                          </a>
                        </>
                      );
                    } return "";
                  }) : ""
                }
              </Slider>
            </div>
          </div>
        </section>
        <section className="photogallery" id="photogallery">
          <div className="max-width-class">
            <h2 className="sec-ttl">फोटो गैलरी</h2>
            <div className="photogallery-inner">
              {
                AmritRatnaPhotogallaryDataList ? AmritRatnaPhotogallaryDataList.map((item, index) => {
                  const imageUrl = item.images.url !== 'undefined' && item.images.url !== '' ?
                    imageLoader(item.images.url, 450, 300, false, true) : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH + 'images/default-218x145.jpg';
                  return (
                    <>
                      <div className="photo-card" key={index}>
                        <a className="photo-link" href={item.weburl} target="_blank">
                          <img
                            src={imageUrl}
                            className="photo-img"
                            alt={item.display_headline}
                            width={450}
                            height={300}
                          />
                          <div className="p-caption">{item.display_headline}</div>
                        </a>
                      </div>
                    </>
                  );
                }) : ""
              }
            </div>
          </div>
        </section>
        <section className="articles" id="articles">
          <div className="max-width-class">
            <h2 className="sec-gold-ttl">आर्टिकल</h2>
            <div className="speakers-inner">
              <Slider className="article-slider" {...article_slider}>
                {
                  AmritRatnaArticleDataList ? AmritRatnaArticleDataList.map((item, index) => {
                    return (
                      <>
                        <div className="article-slide" key={index}>
                          <a href={item.weburl} className="article-link" target="_blank">
                            <div className="video-imgs">
                              <img
                                src={item.images.url}
                                alt={item.display_headline}
                                className="video-img"
                              />
                            </div>
                            <div className="video-desc">
                              <h2 className="article-text">{item.display_headline}</h2>
                            </div>
                          </a>
                        </div>
                      </>
                    );
                  }) : ""
                }
              </Slider>
            </div>
          </div>
        </section>
        <footer className="amrit-footer">
          <div className="max-width-class">
            <div className="footer-inner">
              <div className="copyright">©NETWORK18 ALL RIGHTS RESERVED.</div>
              <ul className="social-media">
                <li className="footer-link">Follow Us:</li>
                <li className="footer-link">
                  <a href="https://twitter.com/News18India" target="_blank" className="f-links tw">
                    {" "}
                  </a>
                </li>
                <li className="footer-link">
                  <a href="https://www.facebook.com/News18India/" target="_blank" className="f-links f-lnk fb">
                    {" "}
                  </a>
                </li>
                <li className="footer-link">
                  <a href="https://www.instagram.com/news18hindi/" target="_blank" className="f-links f-lnk insta">
                    {" "}
                  </a>
                </li>
                <li className="footer-link">
                  <a href="https://www.youtube.com/@news18India" target="_blank" className="f-links f-lnk yt">
                    {" "}
                  </a>
                </li>
              </ul>
              <ul className="footer-links">
                <li className="footer-link">
                  <a
                    href="https://www.news18.com/disclaimer/"
                    target="_blank"
                    className="f-links"
                  >
                    Disclaimer
                  </a>
                </li>
                <li className="footer-link">
                  <a
                    href="https://www.news18.com/disclaimer/"
                    target="_blank"
                    className="f-links"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="footer-link">
                  <a
                    href="https://www.news18.com/privacy_policy/"
                    target="_blank"
                    className="f-links"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        <div className="hind_lic_tracker">
        <NewSiteAd
        width={1}
        height={1}
        slotId={'NW18_HIND_LIC_IMP_TRACKER'}
        adUnit={"NW18_HIND_Desktop/NW18_HIND_TRACKERS/NW18_HIND_LIC_IMP_TRACKER"}
        sizes={[1, 1]} lazyload={true}></NewSiteAd>
      </div>
      </div>
    </>
  );
};
export default AmritRatnaTemp;
