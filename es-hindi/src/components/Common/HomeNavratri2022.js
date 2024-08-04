import React, { Fragment, useEffect, useState } from 'react';
// import SiteAd from 'widgets/Common/Responsive/SiteAd';
import { holaPlayer, scriptLoader } from 'includes/article.util';
import ReactHtmlParser from 'react-html-parser';
import NewSiteAd from 'widgets/Common/Responsive/NewSiteAd';

const HomeNavratri2022 = ({ navratriFlags = {}, navratriStreaming = {}, isMobile = false }) => {
  const tab_data = navratriStreaming.Navratri_puja_21?.data;
  const skinning = navratriFlags.streaming?.skinning_ads == "on" ? 1 : 0;
  const articleData = { videoId: "" };
  let holaa = 0;
  Object.keys(tab_data).map((key, index) => { 
    if (index == 0) {
      holaa = tab_data[key].is_hola;
    }
  });
  const [openTab, setOpenTab] = useState(0);
  const [checkHola, setHola] = useState(holaa);

  useEffect(() => {
    setTimeout(() => {
      scriptLoader(
        "https://cdnjs.cloudflare.com/ajax/libs/hola_player/1.1.4/hola_player.js",
        () => {
          Object.keys(tab_data).map((key, index) => {
            if (
              tab_data[key].embedded_code &&
              tab_data[key].status == "1" &&
              tab_data[key].is_hola == "1"
            ) {
              articleData.headline = tab_data[key].title;
              articleData.story_id = index;
              holaPlayer(articleData, tab_data[key].embedded_code, isMobile);
            }
          });
        }
      );
    }, 4000);
  });

  return (
    <>
    <div className="durga_puja">
      <h2 className="headlinehm"><span>{navratriFlags.streaming?.headline}</span></h2>
    <ul className="tabshm">
        {
          Object.keys(tab_data).map((key, index) => {
            if(tab_data[key].embedded_code && tab_data[key].status=="1")
            {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    setOpenTab(index);
                    setHola(tab_data[key].is_hola);
                  }}
                  className={openTab === index ? " current" : ""}
                  data-tab={index}
                >
                  {tab_data[key].temple_name != "" ? tab_data[key].title : ""}
                </li>
              );
            }
						})
					}

        </ul>

        <div className="video_wrapper">
          {skinning && checkHola=="1" && !isMobile ? (
            <div className="slogoimghm">
                  {/* <SiteAd
                    slotId={'Desktop_Static_Ad_Navratri_LEFT'}
                    adUnit={
                      'NW18_HIND_Desktop/NW18_HIND_FESTIVAL/NW18_HIND_FESTIVAL_AL/NW18_HIND_FSTVL_AL_ROS_Skin_LEFT'
                    }
                    sizes={[100, 400]}
                    className={'skinningAdLeft'}
                    width={100}
                    height={400}
                    removeAdSpan={true}
                    lazyload={true}
                  /> */}
                  <NewSiteAd          
                    slotId={"Desktop_Static_Ad_Navratri_LEFT"}
                    adUnit={"NW18_HIND_Desktop/NW18_HIND_FESTIVAL/NW18_HIND_FESTIVAL_AL/NW18_HIND_FSTVL_AL_ROS_Skin_LEFT"}
                    sizes={[100, 400]}
                    width={100}
                    height={400}
                    lazyload={true}
                    removeAdSpan={true}
                    className={'skinningAdLeft'}
                  ></NewSiteAd>
                  </div>
                ) : null}

          {skinning && checkHola=="1" && isMobile ? (
            <div className="slogoimgmobilehm">
                  {/* <SiteAd
                    slotId={'Mobile_Static_Ad_Navratri_Top'}
                    adUnit={
                      'NW18_HIND_PWA/NW18_HIND_FESTIVAL_PWA/NW18_HIND_FESTIVAL_PWA_AL/NW18_HIND_FSTVL_AL_PWA_ROS_Skin_Top'
                    }
                    sizes={[360, 60]}
                    className={'skinningAdTop'}
                    width={360}
                    height={60}
                    removeAdSpan={true}
                    lazyload={true}
                  /> */}
                  <NewSiteAd          
                    slotId={"Mobile_Static_Ad_Navratri_Top"}
                    adUnit={"NW18_HIND_PWA/NW18_HIND_FESTIVAL_PWA/NW18_HIND_FESTIVAL_PWA_AL/NW18_HIND_FSTVL_AL_PWA_ROS_Skin_Top"}
                    sizes={[360, 60]}
                    width={360}
                    height={60}
                    lazyload={true}
                    removeAdSpan={true}
                    className={'skinningAdTop'}
                  ></NewSiteAd>
                  </div>
                ) : null}

      {

          Object.keys(tab_data).map((key, index) => {
            if(tab_data[key].embedded_code && tab_data[key].status=="1") {
                  return (<Fragment key={index}>
                    <div className={"left_frame tab-content"+ (openTab === index
                            ? " current"
                            : "")}>
                {tab_data[key].is_hola=="1"?<div
                    id={'holaPlayerContainer_' + index}
                    className='holaPlayerContainer'
                  ></div>:ReactHtmlParser(tab_data[key].embedded_code)}
                </div>
                  </Fragment>);
            }
        })
      }

        {skinning && checkHola=="1" && !isMobile? (
            <div className="slogoimghm">
                  {/* <SiteAd
                    slotId={'Desktop_Static_Ad_Navratri_RIGHT'}
                    adUnit={
                      'NW18_HIND_Desktop/NW18_HIND_FESTIVAL/NW18_HIND_FESTIVAL_AL/NW18_HIND_FSTVL_AL_ROS_Skin_Right'
                    }
                    sizes={[100, 400]}
                    className={'skinningAdRight'}
                    width={100}
                    height={400}
                    removeAdSpan={true}
                    lazyload={true}
                  /> */}
                  <NewSiteAd          
                    slotId={"Desktop_Static_Ad_Navratri_RIGHT"}
                    adUnit={"NW18_HIND_Desktop/NW18_HIND_FESTIVAL/NW18_HIND_FESTIVAL_AL/NW18_HIND_FSTVL_AL_ROS_Skin_Right"}
                    sizes={[100, 400]}
                    width={100}
                    height={400}
                    lazyload={true}
                    removeAdSpan={true}
                    className={'skinningAdRight'}
                  ></NewSiteAd>
                  </div>
                ) : null}

            {skinning && checkHola=="1" && isMobile ? (
            <div className="slogoimgmobilehm">
                  {/* <SiteAd
                    slotId={'Mobile_Static_Ad_Navratri_Bottom'}
                    adUnit={
                      'NW18_HIND_PWA/NW18_HIND_FESTIVAL_PWA/NW18_HIND_FESTIVAL_PWA_AL/NW18_HIND_FSTVL_AL_PWA_ROS_Skin_Bottom'
                    }
                    sizes={[360, 60]}
                    className={'skinningAdBottom'}
                    width={360}
                    height={60}
                    removeAdSpan={true}
                    lazyload={true}
                  /> */}
                  <NewSiteAd          
                    slotId={"Mobile_Static_Ad_Navratri_Bottom"}
                    adUnit={"NW18_HIND_PWA/NW18_HIND_FESTIVAL_PWA/NW18_HIND_FESTIVAL_PWA_AL/NW18_HIND_FSTVL_AL_PWA_ROS_Skin_Bottom"}
                    sizes={[360, 60]}
                    width={360}
                    height={60}
                    lazyload={true}
                    removeAdSpan={true}
                    className={'skinningAdBottom'}
                  ></NewSiteAd>
                  </div>
                ) : null}
        </div>

    </div>
    <div className="clearfix"></div>

      <style jsx global>{`
.durga_puja{margin-bottom:10px;}
.headlinehm {
  color: #EE1C25;
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 10px 0px;
}
.headlinehm:before {
  content: "";
  position: absolute;
  border-bottom: 1px #EE1C25 solid;
  top: 50%;
  left: 0;
  right: 0;
}
.headlinehm span{font-size: 30px;line-height:24px;background:#fff;padding:0px 20px;position:relative;}
.durga_puja .forsponsor {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  align-items: center;
}
${isMobile==false
  ?`.durga_puja .video_wrapper {
  display: flex;
  justify-content: space-between;
  background: #000;
}`
: ''}

.slogoimghm {  
  background: #ccc;
  width:100px;
  height:400px;
}
.slogoimgmobilehm{
  background: #ccc;
  height:60px;
  display:flex;
  justify-content:center;
}
a.tab_active {
  background: #E1261D;
  color: #fff;
}
.tab-content{display: none;width: 100%;}

.tab-content.current{
display: inherit;
}

.tabshm {
    display: flex;
    background: #f5f5f5;
    padding: 10px;
}

.tabshm li {
  font-size: 15px;
    padding: 10px 0;
    text-transform: uppercase;
    margin-bottom: 10px;
    cursor: pointer;
    border-bottom: 1px #BEBEBE solid;
    margin-right: 30px;
}

.tabshm li.current {
  color: #E1261D;
  border-bottom: 1px #E1261D solid;
  font-weight:bold;
}
.video_wrapper iframe{width: 100%;height: 400px;}
.add_box_second {background: #ccc; display: flex; justify-content: center; margin-bottom: 5px;}
@media (max-width:650px) {.durga_puja{margin:20px 10px;}.video_wrapper iframe{height: 210px;}.headlinehm span{font-size: 22px;line-height:22px;}}

       
      `}</style>
    </>
  );
};

export default HomeNavratri2022;
