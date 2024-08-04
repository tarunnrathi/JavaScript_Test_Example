import { REDIS_KEYS } from "api/Constant";
import { getRedisDataWithKey } from "api/global/Common";
import HomeLiveTv from "components/Mobile/home/HomeLiveTv";
import React, { useEffect, useState } from "react";
import FakeYTPlayer from "./FakeYTPlayer";
import { newVidgyorScript } from "includes/article.util";
import CustomSkeleton from "./CustomSkeleton";
import LazyLoadImage from "./CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";


const EventCoverageTheme1 = (props) => {
  const isMobile = props?.isMobile ? true : false;
  const [eventCoverageData, setEventCoverageData] = useState({});
  const [loader, setLoader] = useState(true);
  const [video_OR_livetv_Check, setvideo_OR_livetv_Check] = useState("");

  useEffect(() => {
    getRedisDataWithKey(
      REDIS_KEYS.EVENT_COVERAGE_DETAIL,
      false,
      true
    ).then(response => {
      newVidgyorScript();
      const videoLiveTv =
        response?.livetvswitcher == "1"
          ? response?.video_type == "video_id"
            ? response?.video_id != "" && "video_ON"
            : (response?.video_type == "live_tv" && props?.liveTvPosition?.live_tv != "true")
              ? "liveTV_ON"
              : ""
          : "";
      setvideo_OR_livetv_Check(videoLiveTv);
      setEventCoverageData(response);
      setLoader(false);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const showStory = (item) => {
    return (<>
      <li>
        <a href={item?.weburl}>
          <figure width="280" height="200">
            <LazyLoadImage
              src={item?.imagesurl}
              width={280}
              height={200}
              alt={item?.headline || ""}
            />
          </figure>
          <h3>{item?.headline || ""}</h3>
        </a>
      </li>
      {!isMobile &&
        <div className="evsponsad">
          <NewSiteAd
            slotId={"event-coverage-widget"}
            adUnit={"NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_350x80"}
            sizes={[[350, 80]]}
            width={350}
            height={80}
            lazyLoad={true}></NewSiteAd>
        </div>
      }
    </>
    )
  }

  return (
    loader
      ? <CustomSkeleton height={500} />
      :
      <>
        {/* TOP BANNER START */}
        <div className="wchd_wrap">
          {eventCoverageData && (isMobile ? eventCoverageData?.banner2identifier == "html" : eventCoverageData?.banner1identifier == "html") &&
            (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: isMobile ? eventCoverageData?.banner2_mweb : eventCoverageData?.banner_desktop,
                  }}
                ></div>
              </>
            )}
          {eventCoverageData && (isMobile ? eventCoverageData?.banner2identifier == "banner" : eventCoverageData?.banner1identifier == "banner") &&
            <LazyLoadImage
              src={isMobile ? eventCoverageData?.banner2_mweb : eventCoverageData?.banner_desktop}
              width={924}
              height={60}
              alt={""}
            />}
        </div>
        {/* TOP BANNER ENDS */}

        <div className={(video_OR_livetv_Check == "liveTV_ON" || video_OR_livetv_Check == "video_ON") ? "evlivtv_wrap" : "evtheme1stories"}>

          {/* 1st ul for LIVETV / VIDEO / Single Story */}
          <ul>
            {eventCoverageData?.livetvswitcher == "1"
              ? <>
                {video_OR_livetv_Check == "video_ON"
                  ?
                  <li>
                    <FakeYTPlayer playerId={"vidgyorPlayer100"} event={"Newsflash_Article"} className='' width="350" height="197" src={eventCoverageData?.video_id} headline={eventCoverageData?.headline} />
                    <div className="evsponsad">
                      <NewSiteAd
                        slotId={"event-coverage-widget"}
                        adUnit={isMobile ? "NW18_HIND_PWA/NW18_HIND_HOME_PWA/NW18_HIND_HOME_HOME_PWA/NW18_HIND_PWA_HP_LIVTV_BTM_340x80" : "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_350x80"}
                        sizes={[[isMobile ? 340 : 350, 80]]}
                        width={isMobile ? 340 : 350}
                        height={80}
                        lazyLoad={true}></NewSiteAd>
                    </div>
                  </li>
                  : video_OR_livetv_Check == "liveTV_ON" && props?.liveTvPosition?.live_tv != "true" ?
                    <>
                      {/* LIVETV */}
                      <li>
                        <HomeLiveTv width="350" height="197" props={props?.data} />
                        <div className="evsponsad">
                          <NewSiteAd
                            slotId={"event-coverage-widget"}
                            adUnit={isMobile ? "NW18_HIND_PWA/NW18_HIND_HOME_PWA/NW18_HIND_HOME_HOME_PWA/NW18_HIND_PWA_HP_LIVTV_BTM_340x80" : "NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_350x80"}
                            sizes={[[isMobile ? 340 : 350, 80]]}
                            width={isMobile ? 340 : 350}
                            height={80}
                            lazyLoad={true}></NewSiteAd>
                        </div>
                      </li>
                    </>
                    : showStory(eventCoverageData?.content_types?.[0])
                }
              </>
              : showStory(eventCoverageData?.content_types?.[0])
            }
          </ul>

          {/*  2nd ul - 4 stories */}
          <ul>
            {eventCoverageData?.content_types?.slice(video_OR_livetv_Check ? 0 : 1, video_OR_livetv_Check ? 4 : 5)?.map((item, index) => {
              return (
                <li id={item?.id} key={"content_types" + index}>
                  <a href={item?.weburl}>
                    <figure width="80" height="53">
                      <LazyLoadImage
                        src={item?.imagesurl}
                        width={80}
                        height={53}
                        alt={item?.headline || ""}
                      />
                    </figure>
                    <h3>{item?.headline || ""}</h3>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* 3rd ul */}
          <ul>
            <li id={video_OR_livetv_Check ? eventCoverageData?.content_types?.[4]?.id : eventCoverageData?.content_types?.[5]?.id}>
              <a href={video_OR_livetv_Check ? eventCoverageData?.content_types?.[4]?.weburl : eventCoverageData?.content_types?.[5]?.weburl}>
                <figure width="180" height="120">
                  <LazyLoadImage
                    src={video_OR_livetv_Check ? eventCoverageData?.content_types?.[4]?.imagesurl : eventCoverageData?.content_types?.[5]?.imagesurl}
                    width={180}
                    height={120}
                    alt={video_OR_livetv_Check ? eventCoverageData?.content_types?.[4]?.headline : eventCoverageData?.content_types?.[5]?.headline}
                  />
                </figure>
                <h3>{video_OR_livetv_Check ? eventCoverageData?.content_types?.[4]?.headline : eventCoverageData?.content_types?.[5]?.headline}</h3>
              </a>
            </li>
            <li>
              <div className="moretrndstroygrey">
                <a href={eventCoverageData?.readmore} className="moretrndstroy">और भी पढ़ें</a>
              </div>
            </li>
          </ul>
        </div>
        <div className="vsp40 clearfix"></div>
        <style jsx global> {
          ` .evtheme1stories {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		padding-bottom: 25px;
		border-bottom: 3px solid #0E1F3F;
	}

	.evtheme1stories ul {
		flex-shrink: 0;
	}

	.evtheme1stories ul li {
		border-bottom: 1px solid #e0e0e0;
		padding: 15px 0;
		position: relative;
	}

	.evtheme1stories ul li:last-child {
		border-bottom: 0;
		padding-bottom: 0
	}

	.evtheme1stories ul li a {
		display: flex;
	}

	.evtheme1stories ul li a figure {
		width: 80px;
		height: 53px;
		margin-right: 12px;
		box-shadow: 0px 2px 4px #0000001a;
		font-size: 0;
		box-shadow: 0px 3px 6px #00000033;
	}

	.evtheme1stories ul li a figure img {
		width: 80px;
		height: 53px;
		border-radius: 4px !important;
	}

	.evtheme1stories ul a h3 {
		color: #000;
		font-size: 15px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 24px;

	}

	.evtheme1stories ul:first-child {
		width: 350px;
	}

	.evtheme1stories ul li:first-child {
		padding-top: 0;
	}

	.evtheme1stories ul:first-child li:first-child {
		padding: 0;
		border-bottom: 0;
	}

	.evtheme1stories ul:first-child li a {
		display: block;
	}

	.evtheme1stories ul:first-child li a figure {
		margin-bottom: 20px;
	}

	.evtheme1stories ul:first-child li a figure,
	.evtheme1stories ul:first-child li a figure img {
		width: 100% !important;
		height: auto !important;
		border-radius: 4px !important;
		box-shadow: 0px 3px 6px #00000033;
	}

	.evtheme1stories ul:first-child li a h3 {
		color: #000;
		font-size: 18px;
		line-height: 27px;
		margin-top: -6px;
		-webkit-line-clamp: 2;
	}

	.evtheme1stories ul:first-child li a p {
		color: #5F5F5F;
		line-height: 21px;
		font-size: 14px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.evtheme1stories ul:nth-child(2) {
		width: 350px;
		padding: 0 20px;
		margin: 0 20px;
		border-left: 1px solid #e0e0e0;
		border-right: 1px solid #e0e0e0;
	}

	.evtheme1stories ul:last-child {
		width: 180px;
	}

	.evtheme1stories ul:last-child li:first-child {
		height: 228px;
	}

	.evtheme1stories ul:last-child li:last-child {
		border: none;
		padding-bottom: 0;
	}

	.evtheme1stories ul:last-child li a {
		display: block;
	}

	.evtheme1stories ul:last-child li a figure {
		margin-bottom: 5px;
	}

	.evtheme1stories ul:last-child li a figure,
	.evtheme1stories ul:last-child li a figure img {
		width: 180px;
		height: 120px !important;
	}

	.evtheme1stories ul:last-child a h3 {
		-webkit-line-clamp: 4;
		max-height: max-content;
		margin-top: 8px;
	}

	@media (max-width:768px) {
		.evtheme1stories {
			display: block !important;
			margin-top: 0 !important;
		}

		.evtheme1stories ul:first-child {
			width: 100% !important;
		}

		.evtheme1stories ul li {
			padding: 12px 10px !important;
			position: relative;
			min-height: 90px;
		}

		.evtheme1stories ul:first-child li:first-child {
			padding-top: 0 !important;
			border-bottom: 1px solid#e0e0e0;
			padding-bottom: 6px !important;
			margin-top: 10px;
		}

		.evtheme1stories ul:first-child li a figure {
			width: 100% !important;
			height: 228px !important;
			float: none;
			margin-left: 0;
		}

		.evtheme1stories ul:first-child li a figure img {
			width: 100% !important;
			height: 228px !important;
		}

		.evtheme1stories ul:first-child li a h3 {
			color: #000;
			line-height: 26px !important;
			font-size: 18px !important;
		}

		.evtheme1stories ul:first-child li a p {
			display: none;
		}

		.evtheme1stories ul:nth-child(2) {
			width: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		.evtheme1stories ul li a {
			display: block !important;
		}

		.evtheme1stories ul li a figure {
			float: right;
			display: inline-block;
			margin-left: 12px;
			margin-right: unset;
		}

		.evtheme1stories ul:last-child {
			width: 100% !important;
		}

		.evtheme1stories ul:last-child li:first-child {
			height: unset !important;
		}

		.evtheme1stories ul:last-child li a figure {
			width: 80px !important;
			height: 53px !important;
			margin-left: 12px !important;
			margin-bottom: 0 !important;
		}

		.evtheme1stories ul:last-child li a figure img {
			width: 80px !important;
			height: 53px !important;
		}

		.evtheme1stories ul:first-child li a figure {
			margin-right: unset;
		}

		.moretrndstroygrey {
			background: none !important;
			border: 0 !important;
			height: auto !important;
		}

		.moretrndstroy {
			color: #fff;
			font-size: 14px;
			text-align: center;
			font-weight: bold;
			background: #E1261C;
			box-shadow: 0px 3px 6px #00000029;
			border: 1px solid #FFFFFF;
			border-radius: 16px;
			display: table;
			margin: 10px auto;
			width: 140px;
			height: 32px;
			line-height: 32px;
		}

		.evtheme1stories ul a h3 {
			margin-bottom: 3px;
		}

		.page_title_livetv {
			padding: 0 10px 0 26px;
		}

		.page_title_livetv:after,
		.page_title_livetv:before {
			left: 17px;
		}

		.evtheme1stories ul:last-child a h3 {
			margin-top: 0;
		}
	}

	.evlivtv_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		padding-bottom: 25px;
		border-bottom: 3px solid #0E1F3F;
	}

	.evlivtv_wrap ul {
		flex-shrink: 0;
	}

	.evlivtv_wrap ul li {
		border-bottom: 1px solid #e0e0e0;
		padding: 15px 0;
		position: relative;
	}

	.evlivtv_wrap ul li:last-child {
		border-bottom: 0;
		padding-bottom: 0
	}

	.evlivtv_wrap ul li a {
		display: flex;
	}

	.evlivtv_wrap ul li a figure {
		width: 80px;
		height: 53px;
		margin-right: 12px;
		box-shadow: 0px 2px 4px #0000001a;
		font-size: 0;
		box-shadow: 0px 3px 6px #00000033;
	}

	.evlivtv_wrap ul li a figure img {
		width: 80px;
		height: 53px !important;
		border-radius: 4px !important;
	}

	.evlivtv_wrap ul a h3 {
		color: #000;
		line-height: 22px;
		font-size: 15px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-height: 44px;
	}

	.evlivtv_wrap ul li:first-child {
		padding-top: 0;
	}

	.evlivtv_wrap ul:first-child li a {
		display: block;
	}

	.evlivtv_wrap ul:nth-child(2) {
		width: 420px;
		padding: 0 20px;
		margin: 0 20px;
		border-left: 1px solid #e0e0e0;
		border-right: 1px solid #e0e0e0;
	}

	.evlivtv_wrap ul:first-child li .livetv.forsponsores>div:nth-child(2) {
		display: none;
	}

	.evlivtv_wrap ul:last-child {
		width: 180px;
	}

	.evlivtv_wrap ul:last-child li:first-child {
		height: 228px;
	}

	.evlivtv_wrap ul:last-child li:last-child {
		border: none;
		padding-bottom: 0;
	}

	.evlivtv_wrap ul:last-child li a {
		display: block;
	}

	.evlivtv_wrap ul:last-child li a figure {
		margin-bottom: 5px;
	}

	.evlivtv_wrap ul:last-child li a figure,
	.evlivtv_wrap ul:last-child li a figure img {
		width: 180px;
		height: 120px !important;
	}

	.evlivtv_wrap ul:first-child {
		width: 350px;
	}

	.evlivtv_wrap ul:nth-child(2) {
		width: 349px;
	}

	.evlivtv_wrap ul:first-child li a figure,
	.evlivtv_wrap ul:first-child li a figure img {
		width: 350px !important;
		height: 197px !important;
		border-radius: 0 !important;
		box-shadow: unset;
	}

	.page_title_livetv {
		font-size: 11px;
		line-height: 20px;
		color: #fff;
		height: 20px;
		background: #ed1c24;
		padding: 0 10px 0 22px;
	}

	.page_title_livetv span {
		background: transparent !important;
		font-size: 11px;
		line-height: 10px;
		color: #fff;
	}

	.page_title_livetv:before {
		z-index: 2;
		animation: blinkit 2s infinite;
	}

	.page_title_livetv:after,
	.page_title_livetv:before {
		content: "";
		position: absolute;
		opacity: 0;
		box-sizing: border-box;
		top: 4px;
		left: 6px;
		width: 12px;
		height: 12px;
		border: 2px solid#fff;
		box-shadow: 0 0 10px#fff, inset 0 0 10px#fff;
		border-radius: 100px;
		background-clip: padding-box;
	}

	@-webkit-keyframes blinkit {
		0% {
			-webkit-transform: scale(0);
			opacity: 0
		}

		50% {
			opacity: 1
		}

		to {
			-webkit-transform: scale(1);
			opacity: 0
		}
	}

	@-moz-keyframes blinkit {
		0% {
			-webkit-transform: scale(0);
			opacity: 0
		}

		50% {
			opacity: 1
		}

		to {
			-webkit-transform: scale(1);
			opacity: 0
		}
	}

	@-o-keyframes blinkit {
		0% {
			-webkit-transform: scale(0);
			opacity: 0
		}

		50% {
			opacity: 1
		}

		to {
			-webkit-transform: scale(1);
			opacity: 0
		}
	}

	@keyframes blinkit {
		0% {
			-webkit-transform: scale(0);
			opacity: 0
		}

		50% {
			opacity: 1
		}

		to {
			-webkit-transform: scale(1);
			opacity: 0
		}
	}

	.evsponsad {
		background: #F7F7F7 0% 0% no-repeat padding-box;
		border: 1px solid #D6D6D6;
		height: 80px;
		margin-top: 10px;
	}

	.newsixstories.evncovrg {
		border-bottom: 3px solid #0E1F3F;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}

	.wchd_wrap {
		border-top: 3px solid #EC2027;
		background: transparent linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%) 0% 0% no-repeat padding-box;
		display: flex;
		justify-content: space-between;
		height: 60px;
		overflow: hidden;
	}

	@media (max-width:768px) {
		.evlivtv_wrap {
			display: block !important;
			margin-top: 0 !important;
		}

		.evlivtv_wrap ul:first-child {
			width: 100% !important;
		}

		.evlivtv_wrap ul li {
			padding: 12px 10px !important;
			position: relative;
			min-height: 90px;
		}

		.evlivtv_wrap ul:first-child li:first-child {
			padding-top: 0 !important;
			border-bottom: 1px solid#e0e0e0;
			padding-bottom: 6px !important;
			margin-top: 10px;
		}

		.evlivtv_wrap ul:first-child li a figure {
			width: 100% !important;
			height: 191px !important;
			float: none;
			margin-left: 0;
		}

		.evlivtv_wrap ul:first-child li a figure img {
			width: 100% !important;
			height: 191px !important;
		}

		.evlivtv_wrap ul:first-child li a h3 {
			color: #000;
			line-height: 26px !important;
			font-size: 18px !important;
			margin-top: -8px;
			margin-bottom: 0;
		}

		.evlivtv_wrap ul:first-child li a p {
			display: none;
		}

		.evlivtv_wrap ul:nth-child(2) {
			width: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		.evlivtv_wrap ul li a {
			display: block !important;
		}

		.evlivtv_wrap ul li a figure {
			float: right;
			display: inline-block;
			margin-left: 12px;
			margin-right: unset;
		}

		.evlivtv_wrap ul:last-child {
			width: 100% !important;
		}

		.evlivtv_wrap ul:last-child li:first-child {
			height: unset !important;
		}

		.evlivtv_wrap ul:last-child li a figure {
			width: 80px !important;
			height: 53px !important;
			margin-left: 12px !important;
			margin-bottom: 0 !important;
		}

		.evlivtv_wrap ul:last-child li a figure img {
			width: 80px !important;
			height: 53px !important;
		}

		.evlivtv_wrap ul:first-child li a figure {
			margin-right: unset;
		}

		.moretrndstroygrey {
			background: none !important;
			border: 0 !important;
			height: auto !important;
		}

		.moretrndstroy {
			color: #fff;
			font-size: 14px;
			text-align: center;
			font-weight: bold;
			background: #E1261C;
			box-shadow: 0px 3px 6px #00000029;
			border: 1px solid #FFFFFF;
			border-radius: 16px;
			display: table;
			margin: 10px auto;
			width: 140px;
			height: 32px;
			line-height: 32px;
		}

		.page_title_livetv {
			padding: 0 10px 0 26px;
		}

		.page_title_livetv:after,
		.page_title_livetv:before {
			left: 17px;
		}

		.evlivtv_wrap ul:nth-child(2) li:last-child,
		.evtheme1stories ul:nth-child(2) li:last-child {
			border-bottom: 1px solid #e0e0e0;
		}

		.evlivtv_wrap .livetv-chanelhd .livetv-chanel-list {
			width: 164px !important;
			overflow: hidden;
			padding: 10px 12px 0 12px !important;
		}

		.evlivtv_wrap .livetv-chanelhd .livetv-chanel-list li,
		.evlivtv_wrap .livetv-chanelhd .livetv-chanel-list li:first-child {
			height: unset !important;
			padding: 0 !important;
			border: 0;
			min-height: unset;
		}

		.evlivtv_wrap .livetv-chanelhd .livetv-chanel-list li a {
			margin: 0 0 18px;
		}
	}


	.evlivtv_wrap .livetv-chanelhd .livetv-chanel-list {
		width: 164px !important;
		overflow: hidden;
	}

	.livetv-chanelhd .livetv-chanel-list li {
		height: unset !important;
		padding: 0;
		border: 0;
	}

	.livetv-chanelhd .livetv-chanel-list li a {
		margin: 0 0 18px;
	}

	.wchd_wrap>div {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	`
        }

        </style>
      </>
  );
};

export default EventCoverageTheme1;
