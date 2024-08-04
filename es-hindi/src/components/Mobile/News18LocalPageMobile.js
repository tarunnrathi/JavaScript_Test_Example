import React from "react";
import PhotogalleryNews from "./districtWidget/photoGallery";
import ShortVideosList from "./districtWidget/shortVideosList";
// import TopNewsState from "./districtWidget/TopNewsState";
import TrendingNews from "./districtWidget/trendingNews";
import VideoWidget from "./districtWidget/videoWidget";
import WebStoryList from "./districtWidget/webstoryList";
import BestOfLocal18 from "./districtWidget/BestOfLocal18";
import StateDistrictSelect from "components/Desktop/districtWidget/StateDistrictSelect";
import StatesSlider from "components/Desktop/districtWidget/StatesSlider";
import TopNewsState from "components/Desktop/districtWidget/TopNewsState";
import TopNews from "./districtWidget/topNews";

const News18LocalPage = (props) => {
    const {
        topPriorityData,
        localVideosData,
        photogalleryNews,
        webStoriesNews,
        shortVideosList,
        trendingNews,
        bestOfLocal18,
    } = props.data;
    return(<>
        <div className="top_banr">
            <span className="lg_ani"><h1><img src="/images/districts/LOCAL18logo.png" width="217px" height="80px" alt="Local18" /></h1>
            <img className="img2" src="/images/logos/News18-Logo-black.svg" width="217px" height="80px" alt="News18" /></span>
            <p className="sub_ttl"><strong>NEWS18 LOCAL</strong><br/> RELIABLE AND ACCURATE NEWS FROM YOUR DISTRICT</p>
        </div>
        <div className="newcontainer clearfix">
            <StatesSlider isMobile={true} />
            <StateDistrictSelect />
            <TopNews currentURL="/news/" topPriorityData={topPriorityData || []} />
        </div>
	    <div className="newcontainer clearfix">
            <div className="newleftwrap">
                <VideoWidget aurPadheLink={`/videos/`} localVideosData={localVideosData} />
                <WebStoryList aurPadheLink={`/web-stories/`} data={webStoriesNews} />
                <ShortVideosList aurPadheLink="/videos/short-videos/" data={shortVideosList} />
                <PhotogalleryNews aurPadheLink={`/photogallery/`} data={photogalleryNews} />
                <TrendingNews aurPadheLink="/agency/local18/" data={trendingNews} />
            </div>
            <div className="newrightwrap">
                <BestOfLocal18 aurPadheLink={"/agency/local18/"} data={bestOfLocal18} />
            </div>
        </div>
        <style jsx global>{`
            body{margin:auto; background:#fff;  font-family:"Mukta",sans-serif}*{margin:0; padding:0; box-sizing:border-box}li{list-style:none}a{text-decoration:none}a img{border:none}.clearfix {clear: both;}.clearfix::after, .clearfix::before {content: "";display: block;clear: both;visibility: hidden;line-height: 0;height: 0px;}figure{position: relative; line-height: 0; flex-shrink: 0; overflow: hidden;}button{cursor: pointer;font-size: 0;border: 0;outline: none}
            figure img{border-radius: 4px;}

            .newcontainer{max-width:1244px; margin:auto}
            .vsp30{height: 30px;line-height: 0;}

            /* devanagari start*/
            @font-face {font-family:'Mukta';font-style:normal;font-weight:400;font-display:swap;src:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
            @font-face {font-family:'Mukta';font-style:normal;font-weight:700;font-display:swap;src:url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmc8WDm7Q_1669353264.woff2) format('woff2');unicode-range:U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB}
            /* devanagari end*/
            /* latin start*/
            @font-face {font-family: 'Mukta';font-style: normal;font-weight: 400;src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnBrXw_1669353352.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
            @font-face {font-family: 'Mukta';font-style: normal;font-weight: 700;src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWHBXyXfDDVXbF6iGmd8WA_1669353291.woff2) format('woff2');unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
            .top_banr{background: #F7F7F7 0% 0% no-repeat padding-box; box-shadow: 0px 3px 6px #00000029; text-align:center;border-top: 4px solid #FF0000;padding: 7px 0;}
            .top_banr .sub_ttl{letter-spacing: 3px; text-transform: uppercase;width: 100%; margin: 10px auto;}
            .top_banr .sub_ttl strong {font-size: 15px;line-height: 19px;}
            .top_banr p{letter-spacing: 0px;font-size: 14px; line-height: 19px; color: #101010;max-width: 100%;  padding: 0 10px;}
			.top_main a .desctp {font-size: 14px; line-height: 21px; color: #5F5F5F;}
            .lcheading {border-bottom: 1px solid #d9d9d9;position: relative;margin-bottom: 6px; display: flex; justify-content: space-between;align-items: baseline;}
            .lcheading .lcchild, .lcheading .lcchild a {font-size: 20px;line-height: 38px; color: #000; font-weight: bold;display: flex; align-items: baseline;}	
            .lcchild svg {margin-right: 5px;}
            
            .lg_ani {
                width: 217px;
                height: 80px;
                position: relative;
                display: block;
                margin: 0 auto;
            }
            .moretrndstroy {color: #fff !important;font-size: 14px;text-align: center;font-weight: bold;background: #E1261C;box-shadow: 0px 3px 6px #00000029;	border: 1px solid #FFFFFF;	border-radius: 16px;	display: table;margin: 15px auto 0;width: 140px;height: 32px;line-height: 32px;}
            .moretrndstroy:after {content: ""; background-image: url(img/Path114.svg);background-repeat: no-repeat;  width: 11px; height: 11px; display: inline-block; margin-left: 6px;filter: brightness(0) invert(1);}
            .lcheading{margin: 0 10px 6px;}

            @keyframes anim {
                0% {
                    -webkit-transform: rotateX(90deg);
                    -ms-transform: rotateX(90deg);
                    transform: rotateX(90deg)
                }
            
                25% {
                    -webkit-transform: rotateX(90deg);
                    -ms-transform: rotateX(90deg);
                    transform: rotateX(90deg)
                }
            
                30% {
                    -webkit-transform: rotateX(0deg);
                    -ms-transform: rotateX(0deg);
                    transform: rotateX(0deg)
                }
            
                70% {
                    -webkit-transform: rotateX(0deg);
                    -ms-transform: rotateX(0deg);
                    transform: rotateX(0deg)
                }
            
                75% {
                    -webkit-transform: rotateX(90deg);
                    -ms-transform: rotateX(90deg);
                    transform: rotateX(90deg)
                }
            
                100% {
                    -webkit-transform: rotateX(90deg);
                    -ms-transform: rotateX(90deg);
                    transform: rotateX(90deg)
                }
            }
            
            @keyframes anim2 {
                0% {
                    -webkit-transform: rotateX(0deg);
                    -ms-transform: rotateX(0deg);
                    transform: rotateX(0deg)
                }
            
                20% {
                    -webkit-transform: rotateX(0deg);
                    -ms-transform: rotateX(0deg);
                    transform: rotateX(0deg)
                }
            
                25% {
                    -webkit-transform: rotateX(90deg);
                    -ms-transform: rotateX(90deg);
                    transform: rotateX(90deg)
                }
            
                75% {
                    -webkit-transform: rotateX(90deg);
                    -ms-transform: rotateX(90deg);
                    transform: rotateX(90deg)
                }
            
                80% {
                    -webkit-transform: rotateX(0deg);
                    -ms-transform: rotateX(0deg);
                    transform: rotateX(0deg)
                }
            
                100% {
                    -webkit-transform: rotateX(0deg);
                    -ms-transform: rotateX(0deg);
                    transform: rotateX(0deg)
                }
            }
              
              /* The element to apply the animation to */
              .top_banr img {
                // animation-name: anim;
                position: absolute;
                animation: anim 8s infinite linear;
                top: 0;
                left: 0;
                right: 0;
              }
              .top_banr .img2 {
                // animation-name: anim;
                position: absolute;
                animation: anim2 8s infinite linear;
              }

        `}</style>
    </>)
};

export default News18LocalPage;