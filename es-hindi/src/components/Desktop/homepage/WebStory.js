import React, { memo, useEffect, useState } from "react";
import Heading from "../common/Heading";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import ReadMore from "components/Desktop/common/ReadMore";
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { SUBCATEGORYS } from "api/Constant";
import { getWebstoryData, getWebstoryDataByCategory } from "api/individual/webstories";
import Skeleton from "react-loading-skeleton";
import GlideBtn from "components/Common/GlideBtn";

const WebStory = ({
	//isMobile = false,
	isAmp = false,
	isMobile = false,
	webStories = []
}) => {
	const [active, setActive] = React.useState("all");
	const [loading, setLoading] = React.useState(false);
    const [subCategory, setSubCategory] = React.useState([]);
	const [webStoriesData, setWebStoriesData] = useState(webStories);

    const filterDataByCategory = async(slug) => { 
		setActive(slug)
		setLoading(true);
		getWebstoryDataByCategory(slug === "all" ? {} : { categories: slug }, 0 , 10, true).then((res) => {
			setWebStoriesData(res);
			setLoading(false);

		})
	};
	useEffect(() => {

		if (document.getElementsByClassName('webseries-slide-in').length) {
			new Glide(document.querySelector(`.webseries-slide-in`), {
				autoplay: false,
				type: 'carousel',
				perView: isMobile ? 2.2 : 6,
				gap: isMobile ? 8 : 18,
				slidesToScroll: 1,
			}).mount();
		}
	}, [webStoriesData, loading]);

	useEffect(() => {

		if (document.getElementsByClassName('partnersSliderRhs').length && subCategory.length && !isMobile) {
			new Glide(document.querySelector(`.partnersSliderRhs`), {
				autoplay: false,
				// type: 'carousel',
				bound: true,
				startAt: 0,
				perView: 7,
				gap: 5,
			}).mount();
		}
	}, [subCategory])
    const getSubMenus = async() => {
        const result = SUBCATEGORYS["webstory"];
        getWebstoryData(true).then((res) => {
			setSubCategory([{
				id: "4064dds",
				label: "सभी",
				slug: "all",
				link: "filter"
			  },...(res?.menuArr || []).map((itm, key) => ({
				id: "webs"+key,
				label: itm.title,
				slug: itm.slug,
				link: "filter"
			}))])
		})
    };

    useEffect(() => {
		getSubMenus()
    }, []);
	return (
		<>
			<div className="newglblhdwrap">
				<Heading
                    categoryLink={publicRuntimeConfig.siteUrl+'web-stories/'}
                    heading={`वेब स्टोरीज`}
                />
				{!isMobile && <div className="webnav_wrap">
					{subCategory.length > 0 && <div className="partnersSliderRhs">
						<div className="track" data-glide-el="track">
						<ul className="slides">
							{subCategory.map((itm, index) => (
								<li key={itm.id} onClick={() => filterDataByCategory(itm.slug)} className={`slide ${active === itm.slug ? 'active' : ''}`}><span>{itm.label}</span></li>
							))}
						</ul>
						<div className="shvar" data-glide-el="controls">
							<button data-glide-dir="<"></button>
							<button data-glide-dir=">"></button>
						</div>
						</div>
					</div>}
				</div>}
				{isMobile ? <a href={publicRuntimeConfig.siteUrl+'web-stories/'} className="moretrndstroy2">और भी पढ़ें</a> : <ReadMore
                    link={publicRuntimeConfig.siteUrl+'web-stories/'}
                    label={`और भी पढ़ें`}
                />}

				{/* Note: Use className="moretrndstroy2" for ReadMore in MWeb */}
			</div>
			{isMobile && <div className="webnavmob">
				<ul className="slides">
					{subCategory.map((itm, index) => (
						<li key={itm.id} onClick={() => filterDataByCategory(itm.slug)} className={`slide ${active === itm.slug ? 'active' : ''}`}>{itm.label}</li>
					))}
				</ul>
			</div>}

			<div className="webseries-slide">
				{!loading ? <div className="webseries-slide-in">
					<div data-glide-el="track">
						<ul>
							{
								webStoriesData && webStoriesData.length > 0 && webStoriesData.map((item, index) => {
									const width = isMobile ? 180 : 260;
									const height = isMobile ? 250 : 347;
									const imageSrc = item.feature_img;
									const { blog_title } = item;
									return (
										<li key={`webStories_`+index}>
											<a href={getCompleteURL(item.web_url_r, item.web_url)} onClick={() => logEvent("webstory", "Click-home", item.web_url)} target="_blank">
											{
												isAmp ?
													<figure width={width} height={height}>														
														<LazyLoadImage
															src={imageSrc}
															width={width}
															height={height}
															alt={blog_title}
															title={blog_title}
															isAmp={true}
														/>
													</figure>
													:
													<figure width={width} height={height}>
														<LazyLoadImage
															src={imageSrc}
															width={width}
															height={height}
															alt={blog_title}
															title={blog_title}
														/>
													</figure>
											}
												<div className="webcap"><h3>{blog_title}</h3></div>
											</a>
										</li>
									);
								})
							}

						</ul>
					</div>

					<GlideBtn
						data={webStoriesData}
						className={`trndstorynewbullet`}
					/>

				</div>: <Skeleton height={350} />}
			</div>

			<style jsx global>{`
                .webseries-slide {
					position: relative;
					padding-top: 15px;
					margin: 0px 7px;
				  }
			
				  .webseries-slide-in {
					overflow: hidden;
					margin: 0 10px;
				  }
			
				  .webseries-slide-in ul {
					display: flex;
					padding-bottom: 20px
				  }
			
				  .webseries-slide-in ul li {
					background: #FFFFFF;
					// box-shadow: 0px 0px 4px #0000001A;
					// border: 1px solid #DBDBDB;
					border-radius: 4px;
					height: 280px;
				  }
			
				  .webseries-slide-in ul li a figure {
					width: 100%;
					height: 252px;
					background-color: #dbdbdb;
					font-size: 0;
					border-radius: 4px;
				  }
				  
				  .webseries-slide-in ul li a figure img {
					width: 100%;
					height: 252px;
					border-radius: 4px 4px 4px 4px;
				  }
			
				  .webseries-slide-in ul li a h3 {
					padding: 5px 10px 20px 10px;
					color: #000000;
					font-size: 15px;
					line-height: 22px;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					padding-bottom: 0;
				  }
			
				//   .webseries-slide button {
				// 	top: 50%;
				// 	left: 0;
				// 	margin-top: -16px;
				// 	border: none;
				// 	cursor: pointer;
				//   }
			
				  .webseries-slide button:last-child {
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

				  .webnav_wrap{max-width: 75%; padding: 4px 25px;}

				.partnersSliderRhs .slides{display: flex;padding: 10px 0 0;}
				.partnersSliderRhs .track{overflow: hidden;}
				.partnersSliderRhs{display: flex; position: relative;}
				.partnersSliderRhs .partnersSliderRhs{width: 95px;}
				.partnersSliderRhs .slide{width: max-content !important;height: 30px; cursor: pointer;}
				.shvar button{position: absolute;
					top: 4%;
					height: 30px;
					left: -33px;
					border-radius: 100%;
					border: none;
					outline: none;
					cursor: pointer;}
				.shvar button:last-child{right: -32px;left: auto;transform: rotate(180deg);top: 31%;}
				.shvar button:after{    content: "";
				position: absolute;
				width: 8px;
				height: 8px;
				border-top: 2px solid#696969;
				border-left: 2px solid#696969;
				transform: rotate(-45deg);
				top: 15px;}
				.shvar button:after{left:14px}
				.partnersSliderRhs .track ul li span {
					color: #2F2F2F;
					font-size: 14px;
					line-height: 23px;
					white-space: nowrap;
					padding: 6px 11px;
					text-transform: uppercase;
				}
				         
				.partnersSliderRhs .track ul li.active span, .webnavmob ul li.active {
					border-radius: 40px;
					background-color: #E1261D;
					height: auto !important;
					color: #fff;
				}
				.newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a{width: auto;}

				.webcap {
					position: absolute;
					background-color: #fff;
					width: 90%;
					margin: 0 auto;
					left: 0;
					right: 0;
					top: 220px;
					padding: 7px 10px;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					bottom: -42px;
    				height: 90px;
				}
				.webseries-slide-in ul li a {
					position: relative;
					display: block;
    				height: 100%;
				}
				@media (max-width:768px){
					.webseries-slide-in{
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
					.webseries-slide-in ul li{height: auto; margin-bottom: 30px;}
					.webseries-slide-in ul li a figure img{width: 100%;	height: 100%; object-fit: cover;}
					.trndstorynewbullet{margin: 20px !important;}

					.webnavmob {padding-left: 4px;margin: 15px 0 0px;}
					.webnavmob ul {display: flex;flex-direction: row;align-items: center;overflow-y: hidden;overflow-x: auto;}
					.webnavmob ul li {margin: 0 10px 0 0;white-space: nowrap;font-size: 14px;line-height: 23px;	padding: 0 10px; text-transform: uppercase;}
					.webnavmob ul li.active {padding: 0 10px;}
				}
            `}</style>
		</>
	);
};

export default memo(WebStory);
