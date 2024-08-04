import React, { useState } from 'react';
import WebStoriesSlider from 'components/Common/WebStoriesSlider';
import WebStoriesGrid from 'components/Common/WebStoriesGrid';
import RhsCommon from "widgets/Common/Desktop/RhsCommon";
import getConfig from "next/config";
import { fireVP } from "../../includes/article.util";
import { getWebstoryDataByCategory } from 'api/individual/webstories';
import BreadcrumbCommon from 'widgets/Common/Responsive/BreadcrumbCommon';

const { publicRuntimeConfig } = getConfig();

const Webstory = (props) => {
  const { currentUrl, urlParam, breadCrumbArray, categoryWiseData: categoryWiseDta, webstories: { menuArr = [], webStoryDataArr = {} } } = props.data;
  const { cat: category = "" } = urlParam;
  const [activeTab, setActiveTab] = useState(category ? category : "web-story");
  const [isTabActive, setTabActive] = useState(category ? category : "web-story");
  const [fired, setFired] = useState([category ? category : "All"]);
  const [categoryWiseData, setCategoryWiseData] = useState(categoryWiseDta || []);
  const updateUrl = (url) => {
    url.replace(publicRuntimeConfig.siteUrl, '/');
    history.replaceState({}, '', url);
  };

  const changeTab = (eachStory) => {
    setTabActive(eachStory);
    setActiveTab(eachStory);
    const url = `${publicRuntimeConfig.siteUrl}web-stories/${eachStory !== "web-story" ? eachStory + '/' : ''}`;
    updateUrl(url);

    // get Data from Backend and show
    const getData = async () => {
      const data = await getWebstoryDataByCategory({ categories: eachStory }, 0, 20, true);
      setCategoryWiseData(data);
    };
    getData();
    const head = eachStory === "web-story" ? "All" : eachStory;
    if (!fired.includes(head)) {
      fireVP(null, head, url);
      setFired((prev) => [...prev, head]);
    }
  };
  let newBreadCrmb = breadCrumbArray;
  if(category || isTabActive !== 'web-story') {
    newBreadCrmb = [...breadCrumbArray];
    newBreadCrmb.push({ value: isTabActive !== 'web-story' ? isTabActive : category});
  }
  return (
    <>
      <div className="container clearfix container_web">
        <div className="left_sec">
          <BreadcrumbCommon breadCrumbArray={newBreadCrmb} />
          <div className="web_stories_leftwrap">

            <div className="headline clearfix"><h1>वेब स्टोरीज (Web Stories)</h1></div>
            <div className="slider-tab">
              <ul id="web_scroll">
                <li key={`web-story`}><a onClick={(e) => changeTab("web-story", e)} className={activeTab === "web-story" ? "active" : ""}>{"सभी"}</a></li>
                {
                  menuArr && menuArr.length ?
                    (menuArr.map((eachStory, index) => {
                      return (
                        <li key={index}><a onClick={(e) => changeTab(eachStory.slug, e)} className={eachStory.slug === activeTab ? "active" : ""}>{eachStory?.title}</a></li>
                      );
                    }))
                    : ""
                }
              </ul>
            </div>
            {isTabActive !== "web-story" ? (
              <WebStoriesGrid isMobile={false} WebStories={categoryWiseData} webStoryName={isTabActive} />
            ) :
              (
                webStoryDataArr && webStoryDataArr.length > 0 ? (
                  (webStoryDataArr).map((eachData, index) => {
                    return (
                      eachData.webStory?.length ? <WebStoriesSlider isMobile={false} key={index} WebStories={eachData.webStory} webStoryName={eachData.title} /> : ""
                    );
                  })
                ) : ""
              )
            }
          </div>
        </div>

        <div className="right_sec">
          <RhsCommon
            pageAds={props.pageAds}
            photoStories={props.data.photoStories}
            topStories={props.data.topStories}
            astroStories={props.data.astroStories}
            section={'webStory'}
            currentURL={currentUrl}
            isAboutAd={true}
          />
        </div>
      </div>
      <style jsx global>{`
        .container_web {
          display: flex;
          justify-content: space-between;
          max-width: 1244px;
          margin: auto;
        }
        .container_web .left_sec {
          width: 70%;
          position: relative;
        }
        .container_web .right_sec {
          width: 300px;
          position: relative;
        }
        .web_stories_leftwrap .slider-tab ul {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 30px;
          flex-wrap: nowrap;
          overflow-x: scroll;
        }
        .web_stories_leftwrap ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .web_stories_leftwrap .slider-tab li {
          border-radius: 20px;
          margin-right: 15px;
          cursor: pointer;
          margin-bottom: 10px;
        }
        li {
          list-style: none;
        }
        .web_stories_leftwrap .slider-tab li a.active {
          background-color: #E1261D;
          color: #fff;
          border: none;
          box-shadow: 3px 3px 0px #00000029;
          position: relative;
        }
        .web_stories_leftwrap .slider-tab li a {
          color: #000;
          text-decoration: none;
          border: 1px #666666 solid;
          padding: 5px 25px;
          font-size: 18px;
          color: #2C2C2C;
          display: block;
          border-radius: 5px;
          font-weight: 400;
          font-family: 'Noto Sans', sans-serif;
          white-space: nowrap;
        }
        .web_stories_leftwrap .slider-tab li a.active:after {
          content: '';
          position: absolute;
          bottom: -7px;
          left: 0;
          right: 0;
          margin: auto;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #E1261D;
        }
        .web_stories_leftwrap .slider-tab li {
          border-radius: 20px;
          margin-right: 15px;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .web_stories_leftwrap .slider-tab li a {
          color: #000;
          text-decoration: none;
          border: 1px #666666 solid;
          padding: 5px 25px;
          font-size: 18px;
          color: #2C2C2C;
          display: block;
          border-radius: 5px;
          font-weight: 400;
          font-family: 'Noto Sans', sans-serif;
        }
        .middlead span, .sideTop span, .my-ad-rhs span {
          background: transparent;
          font-size: 12px;
          color: #444;
          padding: 3px 0 3px 0;
          text-align: center;
          min-height: 20px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
        .rhs_astro_slide {
          padding-top: 10px;
        }
        .SB_3.ob-widget.ob-ultra-strip-layout .ob-widget-header, .SB_3.ob-widget.ob-ultra-strip-layout .ob-dynamic-rec-container {
          font-family: "Noto Serif", 'Droid Serif', sans-serif !important;
        }
        .rhs_outbrain {
          padding-top: 10px;
        }
        figure img {
          width: 100%;
        }
        .rgtgallery li a h2 {
          font-size: 15px;
          line-height: 22px;
          margin-bottom: 10px;
          font-weight: 400;
          margin-top: 8px;
        }
        .gallery_img:after {
          transform: translateY(-50%) scale(1.5) !important;
        }
        .headline{
          margin : 70px 0 20px;
          font-family: 'Noto Sans',Roboto,sans-serif;
        }
        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer}

        #web_scroll::-webkit-scrollbar {
          width: 10px;
          background-color: #F5F5F5;
          height: 5px;
        }
        #web_scroll::-webkit-scrollbar-thumb {
            background-color: #000000;
            border: 0px solid #555555;
        }
        #web_scroll::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
            background-color: #F5F5F5;
        }
      `}</style>
    </>
  );
};

export default Webstory;
