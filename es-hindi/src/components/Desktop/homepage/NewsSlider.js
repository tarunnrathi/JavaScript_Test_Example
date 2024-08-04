import React from "react";
import { useState, useEffect } from "react";
import Skeleton from "components/Common/CustomSkeleton";
import { imageLoader } from "includes/article.util";
import LazyImage from "components/Common/LazyImage";
import Glide from "@glidejs/glide";
import { getArticles } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";

const HomeNewsSlider = ({ slider, cat, url, data = [] }) => {
	const [sliderData, setSliderData] = useState(data && data.length ? data : []);

	useEffect(() => {
		if (data && !data.length) getfoodData();
		else callSlider();
	}, []);

	const getfoodData = () => {
		(async () => {
			const data = await getArticles({ count: 7, category: cat ? cat : 'recipe' }, true);
			setSliderData(data);
			callSlider();
		})();
	};
	function callSlider () {
		if(document.getElementsByClassName(slider == 'human-stories' ? 'right-humanstory-slider' : slider == 'cartoon-corner' ? 'cartoon-corner-view' : 'right-food-slider').length) {
			new Glide(`${slider == 'human-stories' ? '.right-humanstory-slider' : slider == 'cartoon-corner' ? '.cartoon-corner-view' : '.right-food-slider'}`, {
				autoplay: 2000,
				slidesToShow: 1,
				slidesToScroll: 1,
			}).mount();
		}
	}
	return (
		<>
			<div className="clearfix vsp20"></div>
			{sliderData && sliderData.length ?
			<div className={
						`${
							slider === 'human-stories' ?
							'right-humanstory-slider' :
							slider === 'cartoon-corner' ?
							'cartoon-corner-view' :
							'right-food-slider'
						} news-story`
					}
			>
				<div className="globalhd  dflex justify-space-betwwen">
					<h2><a href={url ? url : "/news/lifestyle/recipe/"}>{slider === 'human-stories' ? 'ह्यूमन स्टोरी' : slider === 'cartoon-corner' ? 'कॉर्टून कार्नर' : 'फूड'}</a></h2>
				</div>
					<div data-glide-el="track">
						<ul className={`${slider === 'human-stories' ? "right-humanstory dflex" : slider === 'cartoon-corner' ? 'cartoon-corners dflex' : "right-food dflex"} right-news`}>
							{sliderData?.map((item, index) => {
								const width = 300;
								const height = 200;
								const imageSrc = imageLoader(item.images.url, width, height);
								const title = item.headline || item.display_headline;
								return(
									<li key={`rhsbar-`+slider+index} className="glide__slide">
										<a href={getCompleteURL(item.weburl_r, item.weburl)}>
											<LazyImage
												src={imageSrc}
												alt={title}
												title={title}
												width={width}
												height={height}
											/>
											<figcaption>
												<h3>{title}</h3>
											</figcaption>
										</a>
									</li>
								);
							})}
						</ul>
						{slider !== 'cartoon-corner' ?
							<div className="global-round-arrowwarp dflex justify-space-betwwen" data-glide-el="controls">
							<button id="hmr" aria-label="hm-right" className="global-round-arrow prevs hmnstry-prev"
									data-glide-dir="<"></button>
							<button id="hml" aria-label="hm-left" className="global-round-arrow hmnstry-next"
									data-glide-dir=">"></button>
							</div>
						: ''}

					</div>
				</div>
					: <Skeleton height={243}/>
				}
			<style jsx global>{`
				.vsp20 {
					margin-bottom: 20px;
				}
				.news-slider-loader {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 243px;
					background-color: rgba(0,0,0,0.05);
					margin-top: 20px;
					border-radius: 10px;
				}
				.news-story{overflow:hidden;position:relative}
				.news-story .globalhd{margin-top:0;}
				.right-news{margin-top:10px;position:relative;overflow:hidden}
				.right-news .glider-track{display:flex}.right-news li{width:100%}
				.right-news li a figure{width:100%}
				.right-news li a figure figcaption{position:absolute;bottom:0;padding:7px 15px;left:20px;background:rgba(0,0,0,.7);font-size:16px;line-height:24px;color:#fff}
				.news-story .global-round-arrowwarp{width: 46px;position:absolute;top:0;right:0}
				.global-round-arrow {
					width: 22px;
					height: 22px;
					outline: 0;
					cursor: pointer;
					position: relative;
					display: flex;
					align-items: center;
					border-radius: 100%;
					background: #011f45;
					border: 1px solid #011f45;
					justify-content: center;
				}
				.global-round-arrow:before {
					content: "";
					width: 5px;
					height: 5px;
					border-top: 2px solid #fff;
					border-right: 2px solid #fff;
					display: block;
					right: 2px;
					transform: rotate(45deg);
					position: relative
				}
				.global-round-arrow:hover{background:#ed1c24; border-color: #ed1c24}

				.global-round-arrow.prevs {
					transform: rotate(-180deg)
				}

				.global-round-arrow.disabled {
					background: #fff;
					border-color: #b8b8b8
				}

				.global-round-arrow.disabled:before {
					border-top: 2px solid #b8b8b8;
					border-right: 2px solid #b8b8b8
				}
				.right-news li { position : relative; }
				.right-news li a figcaption {
					position: absolute;
					bottom: 0;
					padding: 7px 15px;
					left: 20px;
					background: rgba(0,0,0,.7);
					font-size: 16px;
					line-height: 24px;
					color: #fff;
				}
				.cartoon-corners li {
					margin-top: 15px;
				}
				.cartoon-corners li a figcaption {
					position:absolute;
					bottom:0;
					padding:7px 15px;
					left:0;
					right:0;
					background:linear-gradient(transparent,#000);
					font-size:16px;
					line-height:24px;
					color:#fff
				}
      		`}</style>
		</>
	);
};

export default HomeNewsSlider;
