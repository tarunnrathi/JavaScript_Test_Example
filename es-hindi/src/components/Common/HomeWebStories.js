import React from 'react';
import getConfig from 'next/config';
import { logEvent } from 'includes/googleAnalytic';
import Slider from 'react-slick/lib';
import ReactHtmlParser from 'html-react-parser';
import LazyLoadImage from "components/Common/LazyLoadImage";
import Heading from 'components/Desktop/common/Heading';
import { getCompleteURL } from 'util/global/Helper';

const { publicRuntimeConfig } = getConfig();

const HomeWebStories = ({ isMobile = false, isAmp = false, webStories = [] }) => {
	if(!webStories || webStories.length === 0) {
		return null;
	}
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
			<div className="web_stories mrg10">
				<div className="globalhd large">
					<Heading
						categoryLink={publicRuntimeConfig.siteUrl + "web-stories/"}
						heading={`वेब स्टोरीज`}
						isAmp={true}
					/>
				</div>
				{
					webStories && webStories.length > 0 &&
					<div className="gallery_details">
						<div id="tab1" className="tab_details tab-content-gallery active">
							<div className="slider slider-nav">
								<Slider className="slider  slider-nav" {...settings}>
									{webStories.map((item, index) => {
										const width = isMobile ? 241 : 211;
										const height = 356;
										const imageSrc = item.feature_img + "?im=Resize,width=241,aspect=fit,type=normal";
										return (
											<div className="slide" key={`webStories_`+index}>
												<a href={getCompleteURL(item.web_url_r, item.web_url)}
													onClick={() => logEvent("webstory", "Click-home", item.web_url)}
													target="_blank">
													{
														isAmp ?
															<figure>
																{/* <LazyLoadImage
																	src={imageSrc}
																	width={width}
																	height={height}
																	alt={item.blog_title || ''}
																	title={item.blog_title || ''}
																	//data-hero=""
																	isAMP={true}
																/> */}
																<amp-img
																	width={width}
																	height={height}
																	src={imageSrc}
																	alt={item.blog_title || ''}
																	title={item.blog_title || ''}
																	layout="responsive"
																></amp-img>
															</figure>
															:
															<LazyLoadImage
															    lazyLoad={true}
																width={width}
																height={height}
																src={imageSrc}
																alt={item.blog_title || ''}
																title={item.blog_title || ''}
																dontAlter={true}
															/>
													}
													<span className="videothumbhead">{ReactHtmlParser(item.blog_title.replace(/\\/g, ''))}</span>
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
        	.slick-slider{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;touch-action:pan-y;-webkit-tap-highlight-color:transparent}.slick-list,.slick-slider{position:relative;display:block}.slick-list{overflow:hidden;margin:0;padding:0}.slick-list:focus{outline:none}.slick-list.dragging{cursor:pointer;cursor:hand}.slick-slider .slick-list,.slick-slider .slick-track{-webkit-transform:translateZ(0);transform:translateZ(0)}.slick-track{position:relative;top:0;left:0;display:block;margin-left:auto;margin-right:auto}.slick-track:after,.slick-track:before{display:table;content:""}.slick-track:after{clear:both}.slick-loading .slick-track{visibility:hidden}.slick-slide{display:none;float:left;height:100%;min-height:1px}[dir=rtl] .slick-slide{float:right}.slick-slide img{display:block}.slick-slide.slick-loading img{display:none}.slick-slide.dragging img{pointer-events:none}.slick-initialized .slick-slide{display:block}.slick-loading .slick-slide{visibility:hidden}.slick-vertical .slick-slide{display:block;height:auto;border:1px solid transparent}.slick-arrow.slick-hidden{display:none}.slick-loading .slick-list{background:#fff url(/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif) 50% no-repeat}.slick-next,.slick-prev{font-size:0;line-height:0;position:absolute;top:50%;display:block;width:20px;height:20px;padding:0;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer;border:none}.slick-next,.slick-next:focus,.slick-next:hover,.slick-prev,.slick-prev:focus,.slick-prev:hover{color:transparent;outline:none;background:transparent}.slick-next:focus:before,.slick-next:hover:before,.slick-prev:focus:before,.slick-prev:hover:before{opacity:1}.slick-next.slick-disabled:before,.slick-prev.slick-disabled:before{opacity:.25}.slick-next:before,.slick-prev:before{font-family:slick;font-size:20px;line-height:1;opacity:.75;color:#fff;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-prev{left:-25px}[dir=rtl] .slick-prev{right:-25px;left:auto}.slick-prev:before{content:"←"}[dir=rtl] .slick-prev:before{content:"→"}.slick-next{right:-25px}[dir=rtl] .slick-next{right:auto;left:-25px}.slick-next:before{content:"→"}[dir=rtl] .slick-next:before{content:"←"}.slick-dotted.slick-slider{margin-bottom:30px}.slick-dots{position:absolute;bottom:-25px;display:block;width:100%;padding:0;margin:0;list-style:none;text-align:center}.slick-dots li{position:relative;display:inline-block;margin:0 5px;padding:0}.slick-dots li,.slick-dots li button{width:20px;height:20px;cursor:pointer}.slick-dots li button{font-size:0;line-height:0;display:block;padding:5px;color:transparent;border:0;outline:none;background:transparent}.slick-dots li button:focus,.slick-dots li button:hover{outline:none}.slick-dots li button:focus:before,.slick-dots li button:hover:before{opacity:1}.slick-dots li button:before{font-family:slick;font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;content:"•";text-align:center;opacity:.25;color:#000;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.slick-dots li.slick-active button:before{opacity:.75;color:#000}
			@media screen and (min-width: 768px) {
				.web_stories {margin: 30px 0;}
				.web_stories .slider-nav *{margin:0;padding:0;box-sizing:border-box;outline:none;}
				.web_stories .slide{position:relative;}
				${isAmp ? `.web_stories .slide .videothumbhead{position:absolute;background-color:rgba(33,33,37,0.8);padding:10px;bottom:10px;left:0;right:24px;font-size:14px;color:#fff;font-style:normal;line-height:20px;border-left:5px #E1261D solid;border-bottom-right-radius:8px;border-top-right-radius:8px;line-height:20px;}` : `.web_stories .slide .videothumbhead{position:absolute;background-color:rgba(33,33,37,0.8);padding:10px;bottom:10px;left:0;right:24px;font-size:14px;color:#fff;font-style:normal;line-height:20px;border-left:5px #E1261D solid;font-family:'Noto Sans', sans-serif;border-bottom-right-radius:8px;border-top-right-radius:8px;line-height:20px;}`}
				.web_stories .slick-slider{position:relative;display:block;}
				.web_stories .slick-list{position:relative;display:block;overflow:hidden;margin:0;padding:0;height:371px}
				.web_stories .slick-track{position:relative;top:0;left:0;display:block;margin-left:auto;margin-right:auto;}
				.web_stories .slick-loading .slick-track{visibility:hidden;}
				.web_stories .slick-slide{display:none;float:left;min-height:1px;}
				.web_stories .slick-slide img{display:block;}
				.web_stories .slick-slide.dragging img{pointer-events:none;}
				.web_stories .slick-initialized .slick-slide{display:block;margin:0 7px; width:211px  ${!isAmp ? '!important' : ''}}
				.web_stories .slick-loading .slick-slide{visibility:hidden;}
				.web_stories .slick-dotted.slick-slider{margin-bottom:30px;}
				.web_stories .slick-dots{position:absolute;bottom:-40px;display:block  ${!isAmp ? '!important' : ''};width:100%;padding:0;margin:0;list-style:none;text-align:center;}
				.web_stories .slick-dots li{position:relative;display:inline-block;height:20px;margin:0 5px;padding:0;cursor:pointer;}
				.web_stories .slick-dots li button{font-size:0;line-height:0;display:block;width:5px;height:5px;padding:3px;cursor:pointer;color:transparent;border:0;outline:none;background:#C7C7C7;border-radius:50%;}
				.web_stories .slick-dots li button:hover:before, .slick-dots li button:focus:before{opacity:1;}
				.web_stories .slick-dots li button:before{font-family:'slick';font-size:6px;line-height:20px;position:absolute;top:0;left:0;width:20px;height:20px;text-align:center;opacity:.25;color:white;}
				.web_stories .slick-dots li.slick-active button:before{opacity:.75;color: white;}
				.web_stories .slick-dots li.slick-active button{background-color:#f30909;padding:4px;}
				.web_stories .slider-nav .slick-slide img{    max-width: 100%;     margin: auto;     border-radius: 8px;     width: 100%;     height: 356px;}
				.web_stories ul{ list-style: none; margin:0; padding: 0; }
				.web_stories .slider-tab ul{display: flex; justify-content: flex-start; margin-bottom: 30px;}
				.web_stories .slider-tab li{ border-radius: 20px;margin-left: 15px;cursor: pointer;
				}
				.web_stories .slider-tab li a{ color: #000; text-decoration: none; border:1px #666666 solid; padding: 5px 25px;font-size: 18px; color: #2C2C2C;display: block; border-radius: 5px; font-weight: 400; ${isAmp ? "" : " font-family:'Noto Sans', sans-serif;"}}
				.web_stories .slider-tab li a.active{ background-color: #E1261D; color: #fff; border:none; box-shadow: 3px 3px 0px #00000029; position: relative; }
				.web_stories .slider-tab li a.active:after{content: '';position: absolute;bottom:-7px;left: 0;right: 0;margin: auto;width: 0; height: 0; border-left: 8px solid transparent;border-right: 8px solid transparent;border-top: 8px solid #E1261D;}
				.web_stories .tab_details.tab-content-gallery{ visibility: hidden; height: 0; }
				.web_stories .tab-content-gallery.active{ visibility: visible; height:auto; }
				.web_stories .gallery_details{ overflow: hidden;height:401px }
				.web_stories .slick-track {     margin: 0 -7px;     margin-top: 15px; }
				.web_stories .globalhd {border-bottom:1px solid #001536; padding-bottom:5px; margin-bottom:5px}
			}
			@media screen and (max-width: 768px) {
				.web_stories .slider-nav .slick-slide img {
					max-width: 100%;
					margin: auto;
					${isAmp ? "" : "border-radius: 8px;"}
					width: 100%;
					height: 356px;
				}
				.web_stories .slide{
					width: 100%  ${!isAmp ? '!important' : ''};
					box-sizing: border-box;
					padding-right: 14px;
					transform: translateX(${!isAmp ? '55%' : '0'})}
				}
				.web_stories .slide { position: relative;}
				${isAmp ? `.web_stories .slide .videothumbhead{position:absolute;background-color:rgba(33,33,37,0.8);padding:10px;bottom:10px;left:0;right:24px;font-size:16px;color:#fff;font-style:normal;line-height:21px;border-left:5px #E1261D solid;line-height:21px;}` : `.web_stories .slide .videothumbhead{position:absolute;background-color:rgba(33,33,37,0.8);padding:10px;bottom:10px;left:0;right:24px;font-size:14px;color:#fff;font-style:normal;line-height:20px;border-left:5px #E1261D solid;font-family:'Noto Sans', sans-serif;border-bottom-right-radius:8px;border-top-right-radius:8px;line-height:20px;}`}
				.slick-dots li {
					margin: 0;
				}
				.web_stories .slick-dots li.slick-active button:before {
					opacity: 1;
					color: #f30909;
					height: 10px;
					font-size: 9px;
					top: 10px;
    				left: 5px;
				}
				.web_stories .slick-dots {
					margin-top: 10px;
					position: static;
				}
				.web_stories .slick-dots li {
					width: 17px;
				}
				.web_stories .slick-dots li button:before {
					font-size: 7px;
				}
				.slick-track {${isAmp ? 'display : flex;' : ''}}
				.slick-dots li {${isAmp ? 'display : none;' : ''}}
				.slick-list {${isAmp ? 'width: 265%;' : ''}}
				.slick-list {${isAmp ? 'overflow: scroll;' : ''}}
			}
			// ${!isAmp ? "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=optional');" : ''}
  		`}</style>
		</>
	);
};

export default HomeWebStories;
