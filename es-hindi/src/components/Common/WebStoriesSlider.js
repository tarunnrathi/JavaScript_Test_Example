import React from 'react';
import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import LazyImage from 'components/Common/LazyImage';
import { imageLoader } from 'includes/article.util';
import { logEvent } from 'includes/googleAnalytic';
import Slider from 'react-slick/lib';
import ReactHtmlParser from 'html-react-parser';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { publicRuntimeConfig } = getConfig();

const HomeWebStories= ({ isMobile = false, isAmp = false, WebStories = [], webStoryName = "" }) => {
	const sliderSkelton = [
		{
			web_url_r: "",
			blog_title: "....",
			feature_img: `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy&width=216&height=356`,
		},
		{
			web_url_r: "",
			blog_title: "....",
			feature_img: `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy&width=216&height=356`,
		},
		{
			web_url_r: "",
			blog_title: "....",
			feature_img: `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy&width=216&height=356`,

		},
		{
			web_url_r: "",
			blog_title: "....",
			feature_img: `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy&width=216&height=356`,
		},
		{
			web_url_r: "",
			blog_title: "....",
			feature_img: `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy&width=216&height=356`,
		},
	];
	const [webStories, setWebStories] = useState(WebStories && WebStories.length ? [...WebStories] : [...sliderSkelton]);
	const [slideHeight, setSlideHeight] = useState(300);
	useEffect(() => {
		setWebStories(WebStories && WebStories.length ? [...WebStories] : [...sliderSkelton]);
		if(isMobile) {
			setTimeout(() => {
				const slickSlideHeight = document.querySelector('.slick-list .slide').offsetHeight;
				setSlideHeight(slickSlideHeight + 10);
			}, 3000);
		}
	}, [WebStories]);

	const settings = {
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
		focusOnSelect: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true,
					infinite: true,
					slidesToShow: 1.55,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000,
				}
			}
		]
	};
	return (
		<>
		<div className="web_stories">
			<div className="globalhd large">
				<h2><a href={publicRuntimeConfig.siteUrl + (isAmp ? "amp/" : "") +"web-stories/"+(webStoryName).toLowerCase().trim().replace(" ", "-")+"/"}>{webStoryName || "वेब स्टोरीज"}</a></h2>
			</div>
			{
				webStories && webStories.length &&
				<div className="gallery_details">
					<div id="tab1" className="tab_details tab-content-gallery active">
						<div className="slider slider-nav">
							<Slider className={`slider  slider-nav ${webStories.length < 3 ? 'low-slide' : ''}`} {...settings}>
							{webStories.map((item) => {
								const width = isMobile ? 241 : 211;
								const height = 356;
								const filterOut = (item.feature_img || '').includes("storyasset.link") || (item.feature_img || '').includes("images.news18.com");
								const dontAlter = filterOut;
								const imageSrc = filterOut ? item.feature_img : imageLoader(item.feature_img, width, height);
								return (
									<div className="slide">
										<a href={item.web_url_r ? item.web_url_r : ''}
										   onClick={() => logEvent("webstory", "Click-home", item.web_url_r)}
										   target="_blank">
											   {
												   isAmp ?
													<figure>
														<amp-img
															width={ width}
															height={ height}
															src={imageSrc}
															alt={item.blog_title || ''}
															title={item.blog_title || ''}
															layout="responsive"
														></amp-img>
													</figure>
												   :
													<LazyImage
														width={ width}
														height={ height}
														src={imageSrc}
														alt={item.blog_title || ''}
														title={item.blog_title || ''}
														isRes={true}
														unoptimized={true}
														filterOut={filterOut}
														dontAlter={dontAlter}
													/>
											   }
												<div className="topdv">
													<span className="catrgy">{item?.categories||""}</span>
													<span className="videothumbhead">{ReactHtmlParser((item.blog_title || "")?.replace(/\\/g, ''))}</span>
												</div>
											</a>
									</div>
								);
							})
							}
							</Slider>
						</div>
					</div>
				</div>
			}
		</div>
			<style jsx global>{`

			@media screen and (min-width: 768px) {
				
				.web_stories {margin: 10px 0;}
				.web_stories .slider-nav {margin:0;padding:0;box-sizing:border-box;outline:none;}
				.web_stories .slide{position:relative;}
				.web_stories .slide .videothumbhead{background-color:rgba(33,33,37,0.8);padding:10px;font-size:14px;color:#fff;font-style:normal;line-height:20px;border-left:5px #E1261D solid;font-family:'Noto Sans', sans-serif;border-bottom-right-radius:8px;border-top-right-radius:8px;line-height:20px;}
				.web_stories .slick-slider{position:relative;display:block;}
				.web_stories .slick-list{position:relative;display:block;overflow:hidden;margin:0;padding:0;}
				.web_stories .slick-track{position:relative;top:0;left:0;display:block;margin-left:auto;margin-right:auto;}
				.web_stories .slick-loading .slick-track{visibility:hidden;}
				.web_stories .slick-slide{float:left;min-height:1px;}
				.web_stories .slick-slide img{display:block;}
				.web_stories .slick-slide.dragging img{pointer-events:none;}
				.web_stories .slick-initialized .slick-slide > div {margin-right: 10px;}
				.web_stories .slick-loading .slick-slide{visibility:hidden;}
				.web_stories .slick-dotted.slick-slider{margin-bottom:30px;}
				.web_stories .slick-dots{position:absolute;bottom:-40px;display:flex  ${!isAmp ? '!important' : ''};width:99%;padding:0;margin:0;list-style:none;text-align:center;justify-content: center;overflow: hidden;flex-wrap: nowrap;}
				.web_stories .slick-dots li{margin-left: 5px; position:relative;display:inline-block;padding:0;cursor:pointer; width: 6px;}
				.web_stories .slick-dots li button{font-size:0;line-height:0;display:block;width:5px;height:5px;padding:3px;cursor:pointer;color:transparent;border:0;outline:none;background:#C7C7C7;border-radius:50%;}
				.web_stories .slick-dots li button:hover:before, .slick-dots li button:focus:before{opacity:1;}
				.web_stories .slick-dots li button:before{font-family:'slick';font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;text-align:center;opacity:.25;color:white;}
				.web_stories .slick-dots li.slick-active button:before{opacity:.75;color: white; display: none}
				.web_stories .slick-dots li.slick-active button{background-color:#f30909;padding:4px;}
				.web_stories .slider-nav .slick-slide img{    max-width: 100%;     margin: auto;     border-radius: 8px;     width: 100%;     height: 356px;}
				.web_stories ul{ list-style: none; margin:0; padding: 0; }
				.web_stories .slider-tab ul{display: flex; justify-content: flex-start; margin-bottom: 30px;}
				.web_stories .slider-tab li{ border-radius: 20px;margin-left: 15px;cursor: pointer;
				}
				.web_stories .slider-tab li a{ color: #000; text-decoration: none; border:1px #666666 solid; padding: 5px 25px;font-size: 18px; color: #2C2C2C;display: block; border-radius: 5px; font-weight: 400; font-family:'Noto Sans', sans-serif;}
				.web_stories .slider-tab li a.active{ background-color: #E1261D; color: #fff; border:none; box-shadow: 3px 3px 0px #00000029; position: relative; }
				.web_stories .slider-tab li a.active:after{content: '';position: absolute;bottom:-7px;left: 0;right: 0;margin: auto;width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid #E1261D;}
				.web_stories .tab_details.tab-content-gallery{ visibility: hidden; height: 0; }
				.web_stories .tab-content-gallery.active{ visibility: visible; height:auto; }
				// .web_stories .gallery_details{height:401px }
				.web_stories .slick-track { margin: 0;     margin-top: 15px; height: 320px; overflow: hidden; }
				.web_stories .globalhd {border-bottom:1px solid #001536; padding-bottom:5px;}
				.web_stories .globalhd {
					border-bottom: 1px solid #bababa;
					padding-bottom: 4px;
					position: relative;
					margin-left: 6px;
				}
				.web_stories .globalhd:after {
					content: "";
					width: 34px;
					height: 3px;
					position: absolute;
					bottom: -2px;
					left: 0;
					background: #ed1c24;
				}
				.web_stories .globalhd h2 {
					color: #111;
					font-size: 18px;
					font-weight: 700;
					line-height: 28px;
					flex-shrink: 0;
					margin-right: 20px;
					text-transform: uppercase;
					font-family:'Noto Sans',Roboto,sans-serif;
				}
			}
			@media screen and (max-width: 768px) {
				.web_stories {
					width : 105%;
					margin-bottom: 10px;
				}
				.web_stories .globalhd {border-bottom:1px solid #d9d9d9; padding-bottom:5px;}
				.web_stories .globalhd {
					border-bottom: 1px solid #bababa;
					padding-bottom: 4px;
					position: relative;
					margin-bottom: 13px;
				}
				.web_stories .globalhd:after {
					content: "";
					width: 34px;
					height: 3px;
					position: absolute;
					bottom: -2px;
					left: 0;
					background: #ed1c24;
				}
				.web_stories .globalhd h2 {
					color: #111;
					font-size: 18px;
					font-weight: 700;
					line-height: 28px;
					flex-shrink: 0;
					margin-right: 20px;
					text-transform: uppercase;
					font-family:'Noto Sans',Roboto,sans-serif;
				}
				.web_stories .slider-nav .slick-slide img {
					max-width: 100%;
					margin: auto;
					border-radius: 8px;
					width: 100%;
					height: 356px;
				}
				.web_stories .slide{
					width: 100%  ${!isAmp ? '!important' : ''};
					box-sizing: border-box;
					padding-right: 14px;
					transform: translateX(${!isAmp ? '55%' : '0'})}
				}
				.web_stories .low-slide  .slide {
					transform: translateX(0);
				}
				.web_stories .slide { position: relative;}
				.web_stories .slide .videothumbhead{background-color:rgba(33,33,37,0.8);padding:10px;bottom:${isAmp ? "50px" : ""};font-size:14px;color:#fff;font-style:normal;line-height:20px;border-left:5px #E1261D solid;font-family:'Noto Sans', sans-serif;border-bottom-right-radius:8px;border-top-right-radius:8px;line-height:20px;}
				.web_stories .slide .topdv {
					bottom: 10px;
					left: 0;
					right: 24px;
					position: absolute;
					display: flex;
					flex-wrap: wrap;
				}
				.web_stories .slide .topdv .catrgy {
					background-color: #e1261d;
					color: #fff;
					font-size: 12px;
					padding: 5px;
					margin-bottom: 3px;
					border-bottom-right-radius: 4px;
					border-top-right-radius: 4px;
				}
				.slick-dots li {
					margin: 0;
					width: 10px;
				}
				.web_stories .slick-dots li.slick-active button:before {
					opacity: 1;
					color: #f30909;
					height: 10px;
					font-size: 9px;
					top: 0px;
    				left: 0px;
				}
				.web_stories .slick-dots {
					// margin-top: 10px;
					position: static;
					${isMobile ? 'padding-right: 15px;' : ''}
					display: flex ${!isAmp ? '!important' : '' };
					justify-content: center;
					flex-wrap: nowrap;
				}
				.web_stories .slick-dots li {
					// width: 17px;
				}
				.web_stories .slick-dots li button:before {
					font-size: 7px;
				}
				.slick-track { height : ${isAmp ? "" : `${slideHeight}px`}; overflow-y : hidden;  ${isAmp ? 'display : flex;' : ''}}
				.web_stories .low-slide .slick-track{margin-left:initial;}
				.slick-dots li {${isAmp ? 'display : none;' : ''}}
				.slick-list {${isAmp ? 'width: 265%;' : ''}}
				.slick-slider {${isAmp ? 'overflow: scroll;' : ''}}
			}
			${!isAmp ? "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=optional');" : '' }

			
  		`}</style>
		</>
	);
};

export default HomeWebStories;
