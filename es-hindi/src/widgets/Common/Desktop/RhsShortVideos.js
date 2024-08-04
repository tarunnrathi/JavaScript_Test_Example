
import React, { memo, useEffect, useState } from "react";
import Heading from "components/Desktop/common/Heading";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import ReadMore from "components/Desktop/common/ReadMore";
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import GlideBtn from "components/Common/GlideBtn";
import { logEvent } from "includes/googleAnalytic";
import { getArticleList } from "api/global/Common";

const HomeShortVideos = () => {
    const [isLoading, setLoading] = useState(true);
    const [getData, setGetData] = useState([]);

    const getDataSSR = async() => {
        setLoading(false);
        getArticleList({
            count: 10,
            filter: { nw_auto_yt_video_type: "shorts" },
            fields: `display_headline,headline,images,blog_title,images,weburl_r,weburl`,
          }, true).then(res=> {
              setGetData(res);
              setLoading(true);
          });
    };

    useEffect(() => {
        getDataSSR();

    }, []);
	useEffect(() => {

		if (document.getElementsByClassName('short-stories-slide-in').length && getData.length > 0) {
			new Glide(document.querySelector(`.short-stories-slide-in`), {
				autoplay: false,
				type: 'carousel',
				perView: 2.4,
				gap: 8,
				slidesToScroll: 1,
			}).mount();
		}
	}, [getData]);

    return (
		<>
            <div style={{ minHeight: "306px"}}>
			<div className="newglblhdwrap">
				<Heading
                    categoryLink={publicRuntimeConfig.siteUrl+'short-videos/'}
                    heading={`शॉर्ट वीडियो`}
                />
				<a href={publicRuntimeConfig.siteUrl+'short-videos/'} className="moretrndstroy2">और देखें</a>

				{/* Note: Use className="moretrndstroy2" for ReadMore in MWeb */}
			</div>

			<div className="short-stories-slide">
				<div className="short-stories-slide-in">
					<div data-glide-el="track">
						<ul>
							{
								getData && getData.length > 0 && getData.map((item, index) => {
									const width = 140;
									const height = 246;
									const imageSrc = item.images?.url;
									const { display_headline, headline } = item;
									return (
										<li key={`shortVideos_`+index}>
											<a href={item.weburl} onClick={() => logEvent("short-video", "Click-home", item.web_url)} target="_blank">
											
													<figure width={width} height={height}>
														<LazyLoadImage
															src={imageSrc}
															width={width}
															height={height}
															isPolicy={false}
															alt={display_headline || headline}
															title={display_headline || headline}
														/>
													</figure>
											
												<div className="webcap"><h3>{display_headline || headline}</h3></div>
											</a>
										</li>
									);
								})
							}

						</ul>
					</div>

					<GlideBtn
						data={getData}
						className={`trndstorynewbullet`}
					/>

				</div>
			</div>
            </div>
			<style jsx global>{`
				@font-face {
					font-family: "Mukta";
					font-style: normal;
					font-weight: 400;
					font-display: swap;
					src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)format(url("woff2"));
					src: url(https://images.hindi.news18.com/ibnkhabar/uploads/assets/event/common/others/iJWKBXyXfDDVXbnArXyi0A_1669353317.woff2)format("woff2");
					unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB
				}
                .short-stories-slide {
					position: relative;
					padding-top: 15px;
					margin: 0px 7px 20px;
				  }
			
				  .short-stories-slide-in {
					overflow: hidden;
					margin: 0 10px;
				  }
			
				  .short-stories-slide-in ul {
					display: flex;
					padding-bottom: 15px
				  }
			
				  .short-stories-slide-in ul li {
					background: #FFFFFF;
					// box-shadow: 0px 0px 4px #0000001A;
					// border: 1px solid #DBDBDB;
					border-radius: 10px;
					// height: 280px;
				  }
			
				  .short-stories-slide-in ul li a figure {
					width: 100%;
					// height: 252px;
					background-color: #dbdbdb;
					font-size: 0;
					border-radius: 10px;
				  }
				  .short-stories-slide-in ul li a figure:before{content: "";position: absolute;top: 4%;right: 4%;background: url(/images/siteimages/videoiconshorts.svg) 0 0 no-repeat;width: 42px;height: 49px; z-index: 1;}
                
				  .short-stories-slide-in ul li a figure img {
					width: 100%;
					// height: 252px;
					border-radius: 10px;
					object-fit: cover;
				  }
			
				  .short-stories-slide-in ul li a h3 {
					color: #ffff;
					font-size: 16px;
					line-height: 27px;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					overflow: hidden;
				  }
			
				//   .short-stories-slide button {
				// 	top: 50%;
				// 	left: 0;
				// 	margin-top: -16px;
				// 	border: none;
				// 	cursor: pointer;
				//   }
			
				  .short-stories-slide button:last-child {
					right: 0;
				  }
				  .trndstorynewbullet {
					display: flex;
					gap: 10px;
					justify-content: center;
					margin-top: 20px;
					z-index: 9999;
				  }
		  
				  .trndstorynewbullet button {
					width: 20px;
					height: 4px;
					background: #D6D6D6;
					border-radius: 3px;
					display: block;
					border: 0;
				  }
		  
				  .trndstorynewbullet button.glide__bullet--active {
					background: #ED1C24;
				  }

				  .webnav_wrap{max-width: 75%; padding: 0 25px;}

				  .newglblhdwrap {
					border-bottom: 1px solid #d9d9d9;
					position: relative;
					margin-bottom: 6px;
					display: flex;
					justify-content: space-between;
					align-items: baseline;
				  }
				  .newglblhdwrap:before {
					content: "";
					background: #ed1c24;
					width: 25px;
					height: 4px;
					position: absolute;
					left: 0;
					bottom: 0;
				  }
				.newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{width: auto;}

				.webcap {
					width: 100%;
					margin: 0 auto;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					background: transparent linear-gradient(180deg, #00000014 0%, #000000 100%) 0% 0% no-repeat padding-box;
					height: 100%;
					display: flex;
					align-items: flex-end;
					border-radius: 10px;
					padding: 10px;
				}
				.short-stories-slide-in ul li a {
					position: relative;
					display: block;
    				height: 100%;
				}
					.short-stories-slide-in{
						margin: 0;
						margin-bottom: 20px;
						border-bottom: 1px solid#d9d9d9;
					}
					.moretrndstroy2 {
						color: #e82d2e;
						font-size: 14px;
						display: block;
						text-align: center;
						line-height: 24px;
						font-weight: bold;
					}
				
					.moretrndstroy2:after {
						content: "";
						background: url(/images/siteimages/newiconsprite_1669351342.svg)-164px 0px no-repeat;
						width: 11px;
						height: 11px;
						display: inline-block;
						margin-left: 6px;
						vertical-align: middle;
					}
					.short-stories-slide-in ul li{height: auto;}
					// .short-stories-slide-in ul li a figure img{width: 100%;	height: 100%;}
					.trndstorynewbullet{margin: 20px !important;}
					.short-stories-slide-in ul li a h3{ font-size: 12px;line-height: 20px; -webkit-line-clamp: 3;font-weight: normal}
					.short-stories-slide-in ul li a figure:before{width: 20px;height: 20px;	background-size: 100%;}
					.short-stories-slide-in ul{padding-bottom: 0px;}
            `}</style>
		</>
	);
};

export default memo(HomeShortVideos);
