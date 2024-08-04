import { React, useState } from "react";

import Head from "next/head";
import getConfig from "next/config";
import dynamic from "next/dynamic";
import siteConfig from "config/site.config";
import ReactHtmlParser from "html-react-parser";
import { imageLoader } from "includes/article.util";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";

const ScriptManager = dynamic(() => import("components/Common/ScriptManager"));
const { publicRuntimeConfig } = getConfig();
const video_slider = {
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,

  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        dots: false,
        slidesToScroll: 1,
      },
    },
  ],
};
const article_slider = {
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,

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
const ElectralHydrationTemp = (props) => {
  const {
    tagResult: electralArticleDataList,
    electralVideoData: electralVideoDataList,
    pageSeo,
  } = props.data;
  const electralArticleDataCount = props.data.tagResult.length;
  const [showMenu, setShowMenu] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const showMenuBar = () => {
    setShowMenu(!showMenu);
  };
  const showSurveyModal = () => {
    setShowSurvey(!showSurvey);
  };
  const [vvideo, setVvideo] = useState(["", "", "", "", ""]);
  const [openbutton, setButton] = useState(false);
  const engSiteUrl= publicRuntimeConfig.EnglishSiteUrl;

  function videoClick(e, videolink, videoimg, videotil, videodes) {
    e.preventDefault();
    setVvideo([videolink, videoimg, videotil, videodes]);
  }
  function Popup(element) {
    return element.trigger ? (
      <div className="popup">
        <div className="popup-inner">{element.children}</div>
      </div>
    ) : (
      ""
    );
  }

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
          content={pageSeo.description ? pageSeo.description : ""}
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
          content={pageSeo.og_image_alt ? pageSeo.og_image_alt : ""}
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
          content={pageSeo.description ? pageSeo.description : ""}
        />
        <meta name="twitter:site" content="@cnnnews18" />
        <meta name="twitter:creator" content="@cnnnews18" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content={
            pageSeo.canonical ? pageSeo.canonical.replace("amp/", "") : ""
          }
        />
        <meta
          name="twitter:image"
          content={
            pageSeo.image
              ? pageSeo.image
              : "https://images.news18.com/static_news18/pix/ibnhome/news18/news18-main.png"
          }
        />
        <meta
          name="twitter:image:alt"
          content={pageSeo.og_image_alt ? pageSeo.og_image_alt : ""}
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
          rel="stylesheet"
          type="text/css"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/css/slick.css"
        />
        {/* <link rel="stylesheet" type="text/css" href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/css/electral_hindi.css" /> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/css/electral_hindi-new.css?version=25"
        />
      </Head>
      <div>
        <ScriptManager />
        <div className="elhead">
          <div className="maxwidth headtop">
            <div className="h-left-div">
              <img
                src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/images/elogo.png"
                alt="Electral"
                width="191"
                height="53"
              />
            </div>
            <div className="h-right-div">
              <div className="back-to-link">
                <a href={engSiteUrl} title="" target="_blank">
                  <span className="back-txt">Back to</span>
                  <img
                    src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/images/nlogo.png"
                    alt="news18"
                    width="96"
                    height="36"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <header className="elnav">
          <div className="maxwidth">
            <div onClick={showMenuBar} className="menu-toggle">
              {showMenu ? (
                <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              ) : (
                <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              )}
            </div>
            <nav className={showMenu ? "main-menu active" : "main-menu"}>
              <ul onClick={showMenuBar}>
                <li>
                  <a href="#overview" title="">
                    overview
                  </a>
                </li>
                <li>
                  <a href="#speaker" title="">
                    Discussions
                  </a>
                </li>
                <li>
                  <a href="#speakerlist" title="">
                    speakers
                  </a>
                </li>
                <li>
                  <a href="#videos" title="">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#HydrationforHealth" title="">
                    Articles
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="banner-section">
          <img
            src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/images/electrical-hyd-banner.png"
            alt="Electral"
            className="banner_i m-banner"
          />
          <img
            src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/images/electral-desktop.jpg"
            alt="Electral"
            className="banner_i d-banner"
          />
        </div>
        <section
          className="survey survey-ban"
          id="survey"
          onClick={showSurveyModal}
        ></section>

        <section className="camp" id="overview">
          <div className="maxwidth">
            <h2 className="sec-ttl">
              <span>Campaign Overview</span>
            </h2>
            <div className="campflex">
              <div className="campcontent">
                शरीर में पानी की सही मात्रा हमेशा ज़रूरी होती है. हर दिन, शरीर
                को 2-3 लीटर पानी की ज़रूरत होती है. क्या सिर्फ़ पीने का पानी
                शरीर के लिए ज़रूरी पानी की मात्रा को पूरा कर सकता है? स्वस्थ
                शरीर के लिए पानी की सही मात्रा चाहिए, इसके लिए ज़रूरी है कि तरल
                और इलेक्ट्रोलाइट्स की पूर्ति थोड़ी-थोड़ी देर में होती रहे.
                डिहाइड्रेशन की परेशानी से बचने के लिए सबसे अच्छा तरीका है कि ओरल
                रिहाइड्रेशन सॉल्यूशन का सेवन किया जाए. इससे शरीर को ज़रूरी नमक
                (इलेक्ट्रोलाइट्स) और ग्लूकोज़ की मात्रा मिलती है. एक बात का
                ज़रूर ध्यान रखें कि जब डिहाइड्रेशन हो, तो जितना हो सके अधिक मीठे
                ड्रिंक्स और कोल्ड ड्रिंक्स से बचा जाए. ज़्यादा जानने के लिए
                Electral और Network 18 की ‘हाइड्रेशन फ़ॉर हेल्थ’ मुहिम से
                जुड़ें.
              </div>
              <div className="overiframe">
                <img
                  src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/microsite/electral/images/electral.gif"
                  alt="Electral"
                  width={560}
                  height={315}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="speaker" id="speaker">
          <div className="maxwidth">
            <h2 className="sec-ttl">
              <span>Panel Discussion</span>
            </h2>
            <div className="speakimax">
              {electralVideoDataList
                ? (electralVideoDataList?.data['NEWS18:microsite_data_video_157']?.data?.[1]?.videodata || [])
                    .slice(0, 1)
                    .map((dataItem, j) => {
                      const videolink =
                        "https://www.youtube.com/embed/" + dataItem.vid;
                      return (
                        <div className="speakframe" key={j}>
                          <iframe
                            width="560"
                            height="315"
                            src={videolink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      );
                    })
                : ""}
            </div>
            <Slider {...video_slider} className="speakslide">
              {electralVideoDataList
                ? (electralVideoDataList?.data['NEWS18:microsite_data_video_157']?.data?.[1]?.videodata || [])
                    .slice(1, 7)
                    .map((dataItem, j) => {
                      return (
                        <div className="speakwrap" id="speakerlist" key={j}>
                          <Image
                            src={dataItem.thumb}
                            alt=""
                            width={170}
                            height={170}
                          />

                          <h3 className="speakname">{dataItem.title}</h3>
                          <div className="speakdeg">
                            {dataItem.vid}
                            <br />
                            {dataItem.description}
                          </div>
                        </div>
                      );
                    })
                : ""}
            </Slider>
          </div>
        </section>
        <Popup trigger={openbutton} setTrigger={setButton}>
          <section className="modal__bg">
            <div className="modal__align">
              <div className="modal__content">
                <div onClick={() => setButton(false)} className="modal__close">
                  x
                </div>
                <div className="modal__video-align">
                  {electralVideoDataList
                    ? (electralVideoDataList?.data['NEWS18:microsite_data_video_157']?.data?.[0]?.videodata || []).map(
                        (dataItem, j) => {
                          const videolink =
                            "https://www.youtube.com/embed/" + dataItem.vid;
                          return (
                            <section
                              className="video_section container woman"
                              id="video"
                              key={j}
                            >
                              {j === 0 ? (
                                <div className="row mtb">
                                  <div className="modal__video-style">
                                    <iframe
                                      width="700"
                                      height="400"
                                      src={
                                        vvideo[0] === "" ? videolink : vvideo[0]
                                      }
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                  <div className="video_details">
                                    <div className="video_pra">
                                      <div className="arttil">
                                        {vvideo[1] === ""
                                          ? dataItem.title
                                          : vvideo[1]}
                                      </div>
                                      <p className="artdis">
                                        {vvideo[2] === ""
                                          ? dataItem.description
                                          : vvideo[2]}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </section>
                          );
                        },
                      )
                    : ""}
                </div>
              </div>
            </div>
          </section>
        </Popup>

        <div className="waterbg">
          <section className="videos" id="videos">
            <div className="maxwidth">
              <h2 className="sec-ttl">
                <span>videos</span>
              </h2>
              <Slider {...video_slider} className="vdowrap">
                {electralVideoDataList
                  ? (electralVideoDataList?.data['NEWS18:microsite_data_video_157']?.data?.[0]?.videodata || []).map(
                      (item, i) => {
                        const videoimg =
                          "https://img.youtube.com/vi/" +
                          item.vid +
                          "/hqdefault.jpg";
                        const videolink =
                          "https://www.youtube.com/embed/" + item.vid;
                        return (
                          <>
                            <div className="artwrap">
                              <a
                                href="#"
                                key={i}
                                onClick={(e) =>
                                  videoClick(
                                    e,
                                    videolink,
                                    item.title,
                                    item.description,
                                    videoimg,
                                  )
                                }
                                title=""
                                target="_blank"
                              >
                                <div onClick={() => setButton(true)}>
                                  <div className="icon">
                                    <svg
                                      fill="#fff"
                                      width="50"
                                      height="50"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373
                                                                     12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 18v-12l10 6-10 6z"
                                      />
                                    </svg>
                                    <Image
                                      src={videoimg}
                                      alt=""
                                      width={470}
                                      height={270}
                                    />
                                  </div>
                                  <div className="arttil">{item.title}</div>
                                  <div className="artdis">
                                    {item.description}
                                  </div>
                                </div>
                              </a>
                            </div>
                          </>
                        );
                      },
                    )
                  : ""}
              </Slider>
            </div>
          </section>
        </div>

        {electralArticleDataCount ? (
          <section className="articles" id="HydrationforHealth">
            <div className="maxwidth">
              <h2 className="sec-ttl">
                <span>articles</span>
              </h2>
              <Slider {...article_slider} className="artslide">
                {electralArticleDataList.map((topic, index) => {
                  if (typeof topic === "object") {
                    const webUrl =
                      typeof topic.weburl !== "undefined"
                        ? topic.weburl
                            .replace("/news//", "/news/reviews/")
                            .replace(
                              "http://www.hindi.news18.com/",
                              "https://www.hindi.news18.com/",
                            )
                        : "#";
                    const imageUrl =
                      typeof topic.images.url !== "undefined" &&
                      topic.images.url !== ""
                        ? imageLoader(topic.images.url, 219, 147, false, true)
                        : siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH +
                          "images/default-218x145.jpg";
                    const title =
                      typeof topic.display_headline !== "undefined"
                        ? topic.display_headline
                        : "";
                    const key = topic.id || index;
                    const { term_image_data } = topic;
                    const imageAlt = term_image_data ? term_image_data : title;
                    let titleWithAnchor = false;
                    if (title.indexOf("<a") !== -1) {
                      titleWithAnchor = true;
                    }
                    if (index < 12) {
                      return (
                        <>
                          <div className="artwrap" key={key}>
                            <Image
                              src={`${imageUrl}`}
                              alt={`${imageAlt}`}
                              title={`${title}`}
                              width={470}
                              height={270}
                            />
                            <div className="arttil">
                              {titleWithAnchor ? ReactHtmlParser(title) : title}
                            </div>
                            <div className="artdis">
                              {topic.intro.substring(0, 120) + "..."}
                            </div>
                            <div className="readmore">
                              <a href={`${webUrl}`} target="_blank">
                                Read More
                              </a>
                            </div>
                          </div>
                        </>
                      );
                    }
                  }
                  return "";
                })}
              </Slider>
            </div>
          </section>
        ) : (
          ""
        )}

        <footer>
          <div className="maxwidth">
            <p className="copywrite">©Network18. All rights reserved.</p>
          </div>
        </footer>
        <div className={showSurvey ? "survey-modal show" : "survey-modal"}>
          <span
            className="close-modal"
            onClick={() => setShowSurvey(false)}
          ></span>
          <iframe
            frameBorder="0"
            width="100%"
            height="600"
            scrolling="auto"
            allowtransparency="true"
            src="https://news18.survey.fm/electral-hindi-survey?iframe=1"
          ></iframe>
        </div>
      </div>
    </>
  );
};
export default ElectralHydrationTemp;
