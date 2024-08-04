import React, { memo, useEffect, useState } from "react";
import Heading from "../Desktop/common/Heading";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import ReadMore from "components/Desktop/common/ReadMore";
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import GlideBtn from "components/Common/GlideBtn";
import { logEvent } from "includes/googleAnalytic";

const HomeShortVideos = ({
	//isMobile = false,
	isAmp = false,
	isMobile = false,
	shortVideos = []
}) => {

	useEffect(() => {

		if (document.getElementsByClassName('short-stories-slide-in').length) {
			new Glide(document.querySelector(`.short-stories-slide-in`), {
				autoplay: false,
				type: 'carousel',
				perView: isMobile ? 2.5 : 6,
				gap: isMobile ? 8 : 18,
				slidesToScroll: 1,
			}).mount();
		}
	}, [shortVideos]);

    return (
		<>
			<div className="newglblhdwrap">
				<Heading
                    categoryLink={publicRuntimeConfig.siteUrl+'short-videos/'}
                    heading={`शॉर्ट वीडियो`}
                />
				{isMobile ? <a href={publicRuntimeConfig.siteUrl+'short-videos/'} className="moretrndstroy2">और देखें</a> : <ReadMore
                    link={publicRuntimeConfig.siteUrl+'short-videos/'}
                    label={`और देखें`}
                />}

				{/* Note: Use className="moretrndstroy2" for ReadMore in MWeb */}
			</div>

			<div className="short-stories-slide">
				<div className="short-stories-slide-in">
					<div data-glide-el="track">
						<ul>
							{
								shortVideos && shortVideos.length > 0 && shortVideos.map((item, index) => {
									const width = isMobile ? 140 : 259;
									const height = isMobile ? 246 : 334;
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
											
												<div className="webcap1"><h3>{display_headline || headline}</h3></div>
											</a>
										</li>
									);
								})
							}

						</ul>
					</div>

					<GlideBtn
						data={shortVideos}
						className={`trndstorynewbullet`}
					/>

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

				.newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{width: auto;}

				.webcap1 {
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
				@media (max-width:768px){
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
						font-weight: normal;
					}
					.short-stories-slide-in ul li{height: auto;}
					// .short-stories-slide-in ul li a figure img{width: 100%;	height: 100%;}
					.trndstorynewbullet{margin: 20px !important;}
					.short-stories-slide-in ul li a h3{ font-size: 12px;line-height: 20px; -webkit-line-clamp: 3;font-weight: normal}
					.short-stories-slide-in ul li a figure:before{width: 20px;height: 20px;	background-size: 100%;}
					.short-stories-slide-in ul{padding-bottom: 0px;}
				}
            `}</style>
		</>
	);
};

export default memo(HomeShortVideos);
