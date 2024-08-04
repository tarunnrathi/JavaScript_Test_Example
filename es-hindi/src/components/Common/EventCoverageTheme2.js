import { REDIS_KEYS } from "api/Constant";
import { getRedisDataWithKey } from "api/global/Common";
import HomeLiveTv from "components/Mobile/home/HomeLiveTv";
import React, { useEffect, useState } from "react";
import FakeYTPlayer from "./FakeYTPlayer";
import { newVidgyorScript } from "includes/article.util";
import CustomSkeleton from "./CustomSkeleton";
import LazyLoadImage from "./CustomImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { LiveBlogSVGData, NewsSVGData, PhotoGallerySVGData, VideoSVGData, WebStorySVGData } from "includes/newsFeed.helper";

const EventCoverageTheme2 = (props) => {

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
    return (
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
    )
  }

  return (
    loader
      ? <CustomSkeleton height={500} />
      :
      <>
        {/* TOP BANNER START */}
        <div className="wchd_wrap">
          {eventCoverageData && eventCoverageData?.banner1identifier == "html" &&
            (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: eventCoverageData?.banner_desktop,
                  }}
                ></div>
              </>
            )}
          {eventCoverageData && eventCoverageData?.banner1identifier == "banner" &&
            <LazyLoadImage
              src={eventCoverageData?.banner_desktop}
              width={924}
              height={60}
              alt={""}
            />}
        </div>
        {/* TOP BANNER ENDS */}


        <div className={(video_OR_livetv_Check == "liveTV_ON" || video_OR_livetv_Check == "video_ON") ? "evlivtv_wrap" : "evth2stories"}>
          {/* 1st ul- 5 stories */}
          <ul>
            {eventCoverageData?.content_types?.slice(0, 5)?.map((item, index) => {
              return (
                <li id={item?.id} key={"content_types" + index}>
                  <a href={item?.weburl}>
                    <h3>{item?.headline || ""}</h3>
                  </a>
                  {item?.liveblog_switcher == 1 ? (
                    <LiveBlogSVGData />
                  ) : item?.post_type === "text" ? (
                    <NewsSVGData />
                  ) : item?.post_type === "photogallery" ? (
                    <PhotoGallerySVGData />
                  ) : item?.post_type === "videos" ? (
                    <VideoSVGData />
                  ) : item?.id?.includes("webstory") ? (
                    <WebStorySVGData />
                  )
                    : null}
                </li>
              )
            })}
          </ul>

          {/* 2nd ul - for LIVETV / VIDEO / Single Story */}
          <ul>
            {eventCoverageData?.livetvswitcher == "1"
              ? <>
                {video_OR_livetv_Check == "video_ON"
                  ?
                  <li>
                    <FakeYTPlayer playerId={"vidgyorPlayer101"} event={"Newsflash_Article"} className='' width="350" height="197" src={eventCoverageData?.video_id} headline={eventCoverageData?.headline} />
                    <div className="evsponsad">
                      <NewSiteAd
                        slotId={"event-coverage-widget"}
                        adUnit={"NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_350x80"}
                        sizes={[[350, 80]]}
                        width={350}
                        height={80}
                        lazyLoad={true}
                      ></NewSiteAd>
                    </div>
                  </li>
                  : video_OR_livetv_Check == "liveTV_ON" && props?.liveTvPosition?.live_tv != "true" ? <>
                    {/* LIVETV */}
                    <li>
                      <HomeLiveTv width="350" height="197" props={props?.data} />
                      <div className="evsponsad">
                        <NewSiteAd
                          slotId={"event-coverage-widget"}
                          adUnit={"NW18_HIND_Desktop/NW18_HIND_Home/NW18_HIND_Home_Home/NW18_HIND_HP_LIVTV_BTM_350x80"}
                          sizes={[[350, 80]]}
                          width={350}
                          height={80}
                          lazyLoad={true}></NewSiteAd>
                      </div>
                    </li>
                  </>
                    : showStory(eventCoverageData?.content_types?.[5])
                }
              </>
              : showStory(eventCoverageData?.content_types?.[5])
            }
          </ul>

          {/* 3rd ul - last story */}
          <ul>
            <li id={video_OR_livetv_Check ? eventCoverageData?.content_types?.[5]?.id : eventCoverageData?.content_types?.[6]?.id}>
              <a href={video_OR_livetv_Check ? eventCoverageData?.content_types?.[5]?.weburl : eventCoverageData?.content_types?.[6]?.weburl}>
                <figure width="180" height="120">
                  <LazyLoadImage
                    src={video_OR_livetv_Check ? eventCoverageData?.content_types?.[5]?.imagesurl : eventCoverageData?.content_types?.[6]?.imagesurl}
                    width={180}
                    height={120}
                    alt={video_OR_livetv_Check ? eventCoverageData?.content_types?.[5]?.headline : eventCoverageData?.content_types?.[6]?.headline}
                  />
                </figure>
                <h3>{video_OR_livetv_Check ? eventCoverageData?.content_types?.[5]?.headline : eventCoverageData?.content_types?.[6]?.headline}</h3>
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
          ` .wchd_wrap {
		border-top: 3px solid #EC2027;
		background: transparent linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%) 0% 0% no-repeat padding-box;
		display: flex;
		justify-content: space-between;
		height: 60px;
		overflow: hidden;
	}

	.evth2stories {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		padding-bottom: 25px;
		border-bottom: 3px solid #0E1F3F;
	}

	.evth2stories ul {
		flex-shrink: 0;
	}

	.evth2stories ul li {
		border-bottom: 1px solid #e0e0e0;
		padding: 10px 0;
		position: relative;
	}

	.evth2stories ul li:last-child {
		border-bottom: 0;
		padding-bottom: 0
	}

	.evth2stories ul li a {
		display: flex;
	}

	// .evth2stories ul li a figure{width: 80px; height: 53px; margin-right: 12px;box-shadow: 0px 2px 4px #0000001a; font-size: 0; box-shadow: 0px 3px 6px #00000033;}
	// .evth2stories ul li a figure img{width: 80px; height: 53px !important; border-radius: 4px !important;}
	.evth2stories ul a h3 {
		color: #000;
		font-size: 15px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 22px;
		max-height: 44px;
	}

	.evth2stories ul:nth-child(2) {
		width: 320px;
		padding: 0 20px;
		margin: 0 20px;
		border-left: 1px solid #e0e0e0;
		border-right: 1px solid #e0e0e0;
	}

	.evth2stories ul li:first-child {
		padding-top: 0;
	}

	.evth2stories ul:nth-child(2) li:first-child {
		padding: 0;
		border-bottom: 0;
	}

	.evth2stories ul:nth-child(2) li a {
		display: block;
	}

	.evth2stories ul:nth-child(2) li a figure {
		width: 280px;
		height: 186px;
		margin-bottom: 15px;
	}

	.evth2stories ul:nth-child(2) li a figure,
	.evth2stories ul:first-child li a figure img {
		width: 280px !important;
		height: 200px !important;
		border-radius: 4px !important;
		box-shadow: 0px 3px 6px #00000033;
	}

	.evth2stories ul:nth-child(2) li a h3 {
		color: #000;
		font-size: 18px;
		line-height: 26px;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-height: max-content;
	}

	.evth2stories ul:nth-child(2) li a p {
		color: #5F5F5F;
		line-height: 21px;
		font-size: 14px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.evth2stories ul:first-child {
		width: 380px;
		counter-reset: my-sec-counter;
	}

	.evth2stories ul:first-child li {
		display: flex;
		padding-left: 45px;
		position: relative;
		height: 65px;
	}

	.evth2stories ul:first-child li:before {
		counter-increment: my-sec-counter;
		content: "" counter(my-sec-counter)"";
		width: 35px;
		height: 40px;
		border-radius: 0px 4px 4px 0px;
		background-color: #F5F5F5;
		text-align: center;
		font-size: 24px;
		line-height: 22px;
		color: #EC2028;
		padding: 5px 0 0;
		position: absolute;
		left: 0;
	}

	.evth2stories ul:first-child li svg {
		position: absolute;
		right: 8px;
	}

	.evth2stories ul:first-child li a {
		padding-right: 25px;
	}


	.evth2stories ul:last-child {
		width: 180px;
	}

	.evth2stories ul:last-child li:first-child {
		height: 228px;
	}

	.evth2stories ul:last-child li:last-child {
		border: none;
		padding-bottom: 0;
	}

	.evth2stories ul:last-child li a {
		display: block;
	}

	.evth2stories ul:last-child li a figure {
		margin-bottom: 5px;
	}

	.evth2stories ul:last-child li a figure,
	.evth2stories ul:last-child li a figure img {
		width: 180px;
		height: 120px !important;
	}

	.evth2stories ul:last-child a h3 {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 22px;
	}


	@media (max-width:768px) {
		.evth2stories {
			display: block !important;
			margin-top: 0 !important;
		}

		.evth2stories ul:first-child {
			width: 100% !important;
		}

		.evth2stories ul li {
			padding: 12px 10px !important;
			position: relative;
			min-height: 90px;
		}

		.evth2stories ul:first-child li:first-child {
			padding-top: 0 !important;
			border-bottom: 1px solid#e0e0e0;
			padding-bottom: 6px !important;
			margin-top: 10px;
		}

		.evth2stories ul:first-child li a figure {
			width: 100% !important;
			height: 228px !important;
			float: none;
			margin-left: 0;
		}

		.evth2stories ul:first-child li a figure img {
			width: 100% !important;
			height: 228px !important;
		}

		.evth2stories ul:first-child li a h3 {
			color: #000;
			line-height: 26px !important;
			font-size: 18px !important;
		}

		.evth2stories ul:first-child li a p {
			display: none;
		}

		.evth2stories ul:nth-child(2) {
			width: 100% !important;
			padding: 0 !important;
			margin: 0 !important;
		}

		.evth2stories ul li a {
			display: block !important;
		}

		.evth2stories ul li a figure {
			float: right;
			display: inline-block;
			margin-left: 12px;
			margin-right: unset;
		}

		.evth2stories ul:last-child {
			width: 100% !important;
		}

		.evth2stories ul:last-child li:first-child {
			height: unset !important;
		}

		.evth2stories ul:last-child li a figure {
			width: 104px !important;
			height: 70px !important;
			margin-left: 12px !important;
			margin-bottom: 0 !important;
		}

		.evth2stories ul:last-child li a figure img {
			width: 104px !important;
			height: 70px !important;
		}

		.evth2stories ul:first-child li a figure {
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

		.evth2stories ul a h3 {
			margin-bottom: 3px;
		}

		.page_title_livetv {
			padding: 0 10px 0 26px;
		}

		.page_title_livetv:after,
		.page_title_livetv:before {
			left: 17px;
		}
	}

	.evlivtv_wrap ul:nth-child(2) li a .livetv .livetvhd {
		width: max-content;
	}

	.evlivtv_wrap {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		padding-bottom: 25px;
		border-bottom: 3px solid #0E1F3F;
	}
}

.evlivtv_wrap ul {
	flex-shrink: 0;
}

.evlivtv_wrap ul li {
	border-bottom: 1px solid #e0e0e0;
	padding: 10px 0;
	position: relative;
}

.evlivtv_wrap ul li:last-child {
	border-bottom: 0;
	padding-bottom: 0
}

.evlivtv_wrap ul li a {
	display: flex;
	padding-right: 20px;
}

.evlivtv_wrap ul li svg {
	position: absolute;
	top: 10px;
	right: 3px;
}

.evlivtv_wrap ul li:first-child svg {
	top: 0;
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
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-height: 44px;
}

.evlivtv_wrap ul li:first-child {
	padding-top: 0;
}

.evlivtv_wrap ul:nth-child(2) li a {
	display: block;
}

.evlivtv_wrap ul:first-child {
	width: 325px;
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
	margin-bottom: 15px;
}

.evlivtv_wrap ul:last-child li a figure,
.evlivtv_wrap ul:last-child li a figure img {
	width: 180px;
	height: 120px !important;
}

.evlivtv_wrap ul:last-child a h3 {
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
	line-height: 22px;
	max-height: max-content;
}

.evlivtv_wrap ul:nth-child(2) {
	width: 371px;
	padding: 0 20px 0 0;
	border-right: 1px solid #e0e0e0;
}

.evlivtv_wrap ul:nth-child(2) li a figure,
.evlivtv_wrap ul:nth-child(2) li a figure img {
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

.evlivtv_wrap ul:nth-child(2) li a .livetv-play iframe {
	width: 350px;
}

.evlivtv_wrap ul:nth-child(2) li a .livetv-hdr {
	width: 350px;
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

.evth2stories.evncovrg {
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

.evlivtv_wrap ul:first-child {
	counter-reset: my-sec-counter;
}

.evlivtv_wrap ul:first-child li {
	display: flex;
	padding-left: 45px;
	position: relative;
	height: 65px;
}

.evlivtv_wrap ul:first-child li:before {
	counter-increment: my-sec-counter;
	content: "" counter(my-sec-counter)"";
	width: 35px;
	height: 40px;
	border-radius: 0px 4px 4px 0px;
	background-color: #F5F5F5;
	text-align: center;
	font-size: 24px;
	line-height: 22px;
	color: #EC2028;
	padding: 5px 0 0;
	position: absolute;
	left: 0;
}

.evlivtv_wrap ul:first-child li svg {
	position: absolute;
	right: 8px;
}

.evlivtv_wrap ul:first-child li a {
	padding-right: 20px;
}

.livetv.forsponsores>div:nth-child(2) {
	display: none;
}

@media (max-width:768px) {
	.evlivtv_wrap {
		display: block !important;
		margin-top: 0 !important;
	}

	.evlivtv_wrap ul:nth-child(2) {
		width: 100% !important;
		padding: 0;
	}

	.evlivtv_wrap ul li {
		padding-left: 50px !important;
		position: relative;
	}

	.evlivtv_wrap ul:nth-child(2) li:first-child {
		padding: 0 10px !important;
	}

	.evlivtv_wrap ul:nth-child(2) li a figure {
		width: 100% !important;
		height: 191px !important;
		float: none;
		margin-left: 0;
	}

	.evlivtv_wrap ul:nth-child(2) li a figure img {
		width: 100% !important;
		height: 191px !important;
	}

	.evlivtv_wrap ul:nth-child(2) li a h3 {
		color: #000;
		line-height: 26px !important;
		font-size: 18px !important;
		margin-top: -8px;
		margin-bottom: 0;
	}

	.evlivtv_wrap ul:nth-child(2) li a p {
		display: none;
	}

	.evlivtv_wrap ul:first-child li:before {
		left: 7px;
	}

	.evlivtv_wrap ul li:first-child {
		padding-top: 10px;
	}

	.evlivtv_wrap ul li:last-child {
		border-bottom: 1px solid #e0e0e0
	}

	.evlivtv_wrap ul:first-child {
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

	.evlivtv_wrap ul:nth-child(2) li a figure {
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
}

.livetv-chanelhd .livetv-chanel-list {

	width: 164px;
	overflow: hidden;
}

.livetv-chanelhd .livetv-chanel-list li {
	height: unset !important;
	padding: 0 !important;
	border: 0;
}

.livetv-chanelhd .livetv-chanel-list li a {
	margin: 0 0 18px;
}

.livetv-chanelhd .livetv-chanel-list li:before {
	content: "";
	display: none;
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

export default EventCoverageTheme2;