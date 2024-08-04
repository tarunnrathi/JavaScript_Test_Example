import React, { useState, useEffect } from "react";
import { loadTvfn } from "includes/article.util";
// import SiteAd from 'widgets/Common/Responsive/SiteAd';
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import MedalTally from "components/Common/Olympics/MedalTally";

const HomeLiveTv = ({
  props: { topHomeNews = {}, posterImage = null, isAmp,  medalTally=[], pageAds={}, isMobile=false },
  bottomAdSlot = "",
  height,
  width,
}) => {
  const skinning = topHomeNews?.skinning === 1;
  const isNotTopskinning = topHomeNews?.isNotTop;

  const [selectChannelActive, setSelectChannelActive] = useState(false);

  useEffect(() => {
    loadTvfn(posterImage ? posterImage : null);
  }, []);

  return (
    <>
      <div className={`livetv ${skinning ? "forsponsores" : ""}`}>
        <div className="livetv-hdr dflex justify-space-betwwen">
          <h2 className="livetvhd">
            <a href="/livetv/">लाइव टीवी</a>
          </h2>
          {!isAmp ? (
            <div
              className={`livetv-chanelhd ${
                selectChannelActive ? "acdcslvtvhd" : ""
              }`}
              onClick={() => setSelectChannelActive(!selectChannelActive)}
            >
              चैनल चुनें
              <ul className="livetv-chanel-list">
                <li>
                  <a
                    href="/livetv/news18-madhya-pradesh-chhattisgarh/"
                    data-cat="livetv_channel_switch_D"
                    className="events_ana"
                  >
                    News18 मध्य प्रदेश, छत्तीसगढ़
                  </a>
                </li>
                <li>
                  <a
                    href="/livetv/news18-bihar-jharkhand/"
                    data-cat="livetv_channel_switch_D"
                    className="events_ana"
                  >
                    News18 बिहार, झारखंड
                  </a>
                </li>
                <li>
                  <a
                    href="/livetv/news18-rajasthan/"
                    data-cat="livetv_channel_switch_D"
                    className="events_ana"
                  >
                    News18 राजस्थान
                  </a>
                </li>
                <li>
                  <a
                    href="/livetv/news18-uttar-pradesh-uttarakhand/"
                    data-cat="livetv_channel_switch_D"
                    className="events_ana"
                  >
                    News18 उत्तर प्रदेश, उत्तराखंड
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        {skinning && !isNotTopskinning ? (
          <NewSiteAd
            slotId={"Mobile_Static_Ad_Live_TV_TOP"}
            style={{ textAlign: "center", height: "60px" }}
            adUnit={
              "NW18_HIND_PWA/NW18_HIND_LIVETV_PWA/NW18_HIND_LIVETV_PWA_AS/NW18_HIND_LIVTV_AS_PWA_ROS_BAND_TOP_340"
            }
            sizes={[340, 60]}
            lazyLoad={true}
          ></NewSiteAd>
        ) : null}
        <div className={`livetv-play ${skinning ? "forsponsores" : ""}`}>
          {isAmp ? (
            <a href="https://hindi.news18.com/livetv/">
              <amp-img
                src={posterImage}
                layout="responsive"
                height={250}
                width={375}
                style={{ width: "100%", height: "250px" }}
              ></amp-img>
            </a>
          ) : null}
          <div id="vidgyor_parent" style={{ height: "212px", width: "100%" }}>
            <div
              style={{ height: "100%", width: "100%" }}
              id="vidgyor_container"
            >
              <div id="closeButtonContainer"></div>
            </div>
          </div>
        </div>
      </div>
      {skinning ? (
        <NewSiteAd
          slotId={"Desktop_Static_Ad_Live_TV_Bottom"}
          style={{ textAlign: "center", height: height ? height : "60px" }}
          adUnit={
            bottomAdSlot ||
            "NW18_HIND_PWA/NW18_HIND_LIVETV_PWA/NW18_HIND_LIVETV_PWA_AS/NW18_HIND_LIVTV_AS_PWA_ROS_BAND_BTM_340"
          }
          sizes={width && height ? [width, height] : [340, 60]}
          lazyLoad={true}
          removeAdSpan={true}
        ></NewSiteAd>
      ) : null}
      {!isAmp && (
        <div style={{ marginTop: "15px" }}>
          <MedalTally medalTally={medalTally} pageAds={pageAds} isMobile={isMobile} pageType="home" />
        </div>
      )}
      
      
      <style jsx global>{`
        .livetv {
          margin: 5px 0 10px 0;
        }
        .livetv-hdr {
          display: flex;
          justify-content: space-between;
          margin-right: 10px;
        }
        .livetvhd {
          color: #001536;
          font-size: 18px;
          text-transform: uppercase;
          border-bottom: 3px solid #ed1c24;
          width: 30%;
          font-weight: 700;
          padding-left: 10px;
        }
        .livetv-chanelhd {
          color: #ed1c24;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          height: 30px;
          line-height: 30px;
          padding: 0 18px 0 15px;
          position: relative;
        }
        .livetv-chanelhd:before {
          content: "";
          width: 6px;
          height: 6px;
          border-top: 1px solid #ed1c24;
          border-left: 1px solid #ed1c24;
          right: 2px;
          transform: rotate(-135deg);
          top: 10px;
          transition: all 0.5s ease-in-out;
          display: block;
          position: absolute;
        }
        .livetv-chanel-list {
          position: absolute;
          background: #f7f6f1;
          padding: 10px 12px 0 12px;
          top: 30px;
          z-index: 1;
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.4),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: none;
          right: 0;
          width: 164px;
          overflow: scroll;
        }
        .livetv-chanel-list li a {
          color: #555;
          font-size: 12px;
          font-weight: 700;
          position: relative;
          padding-left: 10px;
          display: block;
          line-height: 18px;
          margin-bottom: 18px;
        }
        .livetv-chanel-list li a:before {
          content: "";
          width: 3px;
          height: 16px;
          background: #ed1c24;
          position: absolute;
          top: 3px;
          left: 0;
        }
        .livetv-chanelhd.acdcslvtvhd {
          background: #ed1c24;
          color: #fff;
          padding: 0 30px 0 15px;
        }
        .livetv-chanelhd.acdcslvtvhd:before {
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          right: 15px;
        }
        .livetv-chanelhd.acdcslvtvhd .livetv-chanel-list {
          display: block;
        }
        #livetv-placeholder-img {
          width: 100%;
        }

        ${skinning
          ? `
          .forsponsores{
            margin-bottom: ${isAmp? "0px" :"0px !important"};
          }
          .skinningAdTop{
            text-align:center;
            margin-top:5px;
          }
          .skinningAdBottom{
            text-align:center;
            margin-bottom:10px;
          }
        .topnews-left.forsponsores{width: 42%}	
        .topnews-right.forsponsores{display: flex; flex-wrap: wrap; width: 56%;}
        .livetvsponsorbox{width: 100%; display: flex;}
        .livetvsponsorimg{text-align:center; max-width: 100%; flex-shrink: 0; margin-top: 0px;}
        .livetv.forsponsores{width: 98%; margin:0 1px;}
        .livetv-play.forsponsores{height: 212px;}
        .livetvsponsorimg.hindi_hp_page_left_ad, .livetvsponsorimg.hindi_hp_page_right_ad{margin-top: 30px;}
        .newlivetv-widget{width: 100%;}
        .lokmat_live_tv_skinning_wrap {width: 100%;}
        .topnews-right.forsponsores .lokmat_live_tv_skinning_wrap h2, .newlivetv-widget h2{margin-left: 79px;}
        .topnews-right.forsponsores .lokmat_live_tv_skinning_wrap .livetvsponsorbox .livetvsponsorimg{margin-top:0px; background: #eee;}
        .hindi_live_tv_pg_top_ad,
        .hindi_live_tv_pg_bottom_ad,
        {display: flex;justify-content: center;}
       
        `
          : ""}
      `}</style>
    </>
  );
};

export default HomeLiveTv;
