import React, { useState } from 'react';
import WebStoriesSlider from 'components/Common/WebStoriesSlider';
import WebStoriesGrid from 'components/Common/WebStoriesGrid';
// import getConfig from "next/config";
// import { fireVP } from "../../includes/article.util";
// import SiteAd from 'widgets/Common/Responsive/SiteAd';
// import { getWebstoryDataByCategory } from 'api/individual/webstories';
import Head from 'next/head';

const Webstory = (props) => {
  const { urlParam, categoryWiseData = [], webstories: { menuArr = [], webStoryDataArr = [] } } = props.data;
  const { cat: category = "" } = urlParam;
  const [activeTab, setActiveTab] = useState(category ? category : "web-story");
  const [isTabActive, setTabActive] = useState(category ? category : "web-story");

  return (
    <>
    <Head>
        <meta name="robots" content="max-image-preview:large" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async src="https://cdn.ampproject.org/v0/validator.js"></script>
      </Head>

      <div className="clearfix add">
        <div className="addinner-box">
            <div className="ad-container go">
                <amp-ad width={336} height={280} type="doubleclick" data-slot={props.data.pageAds.ATF_320} data-multi-size="300x250" data-enable-refresh="30" data-lazy-fetch="true"
                        data-loading-strategy="1">
                </amp-ad>
            </div>
        </div>
      </div>
      <div className="container clearfix container_web">
            <div className="brdacrum">
              <a href="/">News18 Hindi</a> »
              <a href="/web-stories/" style={{ "fontWeight": 400 }}>Web Stories</a>{category || isTabActive !== 'web-story' ? <> » <a style={{ "fontWeight": 400 }}>{isTabActive !== 'web-story' ? isTabActive : category}</a></> : ''}
            </div>
          <div className="web_stories_leftwrap">

            <div className="headline clearfix"><h1>वेब स्टोरीज (Web Stories)</h1></div>
            <div className="slider-tab">
              <ul>
                <li key={`web-story`}><a href={"/web-stories"} className={activeTab == "web-story" ? "active" : ""}>{"सभी"}</a></li>
                {
                  menuArr && menuArr.length ?
                    (menuArr.map((eachStory, index) => {
                      return (
                        <li key={index}><a href={"/amp/web-stories/" + eachStory.slug} className={eachStory.slug == activeTab ? "active" : ""}>{eachStory?.title}</a></li>
                      );
                    }))
                  : ""
                }
              </ul>
            </div>
            {isTabActive !== "web-story" ? (
              <WebStoriesGrid isMobile={true} isAmp={true} WebStories={categoryWiseData} webStoryName={isTabActive}/>
            ) :
              (
                webStoryDataArr && webStoryDataArr.length > 0 ? (
                  (webStoryDataArr).map((eachData, index) => {
                    return (
                      eachData.webStory?.length ? <WebStoriesSlider isAmp={true} isMobile={true} key={index} WebStories={eachData.webStory} webStoryName={eachData.title}/> : ""
                    );
                  })
                ) : ""
              )
            }
          </div>
      </div>
      <style jsx global>{`
				
        .brdacrum{font-family: 'Noto Sans', sans-serif;font-size:10px;color:#404040;text-transform:uppercase;line-height:18px;font-weight:700;margin:5px 0 15px 0}.brdacrum h1{display:inline-block;font-size:14px;}.brdacrum a{color:#404040;font-weight:400;margin:5px}
        // .container_web {
        //   display: flex;
        //   justify-content: space-between;
        //   max-width: 1244px;
        //   margin: auto;
        // }
        // .container_web .left_sec {
        //   width: 70%;
        //   position: relative;
        // }
        // .container_web .right_sec {
        //   width: 300px;
        //   position: relative;
        // }
        .container_web {
          padding : 0 15px; 
          overflow: hidden;
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
          padding: 4px 20px;
          font-size: 18px;
          color: #2C2C2C;
          display: block;
          border-radius: 5px;
          font-weight: 700;
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
          margin-right: 10px;
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
          font-weight: 700;
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
          font-family: "Noto Serif", 'Droid Serif', sans-serif;
        }
        .rhs_outbrain {
          padding-top: 10px;
        }
        figure img {
          width: 100%;
        }
        .headline{
          margin : 20px 0;
          font-family: 'Noto Sans',Roboto,sans-serif;
        }
        .load_more{width:130px;height:38px;background: #ED1C24;border-radius: 19px;font-size:17px;color: #FFFFFF;line-height:38px;border: none;display: table; margin: auto;cursor:pointer;margin-bottom: 10px;}
        .add {
          background: #dbdde3;
          position: relative;
          padding: 16px 0;
          line-height: 0;
          text-align: center;
          margin-bottom: 10px;
          display: inline-block;
          width: 100%;
          z-index: 1;
          color: #797e90;
        }
        .addinner-box {
          //background: #e8e9ed;
          background: #dbdde3;
          min-width: 250px;
          display: inline-block;
          margin: 0 auto;
          text-align: center;
          min-height: auto;
          padding: 0;
          box-sizing: border-box;
          color: #797e90;
          font-size: 11px;
          line-height: 16px;
        }
        div.addinner_box_300x250 {
          height: 250px;
        }
        .clearfix {
          clear: both;
        }
      `}</style>
    </>
  );
};

export default React.memo(Webstory);
