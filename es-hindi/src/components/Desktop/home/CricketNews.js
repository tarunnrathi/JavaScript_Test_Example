import React from "react";
import getConfig from "next/config";
import LazyLoadImage from 'components/Common/LazyLoadImage';
import { imageLoader, DynamicBanner } from "includes/article.util";
import OptionTab from "components/Common/OptionTab";

const { publicRuntimeConfig } = getConfig();

const HomeSports= ({ sportsNews = [], banner }) => {
	if(!sportsNews.length) {
		return null;
	}

	const sportsObject = {
		"key": "cricket",
		"value": "क्रिकेट",
		"colorClass": "bgclr-career",
		"template": "one",
		"subCatDisplay": "1",
		'more-url': '/news/sports/cricket/',
		'sub-list': [],
	};

	return (
		<>
			<div className="clearfix vsp20 "></div>
			<div className="home-sports cricket-news-widget">
			<OptionTab
				head={sportsObject['value']}
				url={sportsObject['more-url']}
				options={[]}
				updateState={() => {}}
				component={sportsObject['key']}
			/>
			<div>
            	{/* <a href={publicRuntimeConfig.siteUrl + "cricket/"}>
					<img
						src="https://images.news18.com/ibnkhabar/uploads/CRICKET-DHAMAAL-HINDI-BANNER-01.jpg"
						alt="cricket dhamal"
						title="cricket dhamal"
						id="cricket-dhamal-banner"
						loading="lazy"
					/>
				</a> */}
				<DynamicBanner data={banner} obkey={"On-Cricket-Widget"} isMobile={false}/>
			</div>
			<div className="sportstories">
				<ul className="khelnews">
					{sportsNews && sportsNews.length && sportsNews.map((eachNews, index) => {

						const Width = index == 0 ? 430 : 100;
						const Height = index == 0 ? 266 : 68;
						const Src = eachNews.thumbnail ? imageLoader(eachNews.thumbnail, Width, Height) : '';

						return(
							<>
							{index <5 ? (
								<li>
									<a href={eachNews.url ? eachNews.url : ''}>
										<LazyLoadImage once height={Height} offset={150}
											width={Width}
											height={Height}
											src={Src}
											alt={eachNews.display_headline || ''}
											title={eachNews.display_headline|| ''}
											/>
										<figcaption>
											<h3>{eachNews.display_headline || eachNews.title}</h3>
										</figcaption>
									</a>
								</li>
							): null

							}
							</>
							);
						}
					)}
				</ul>
				<a href={sportsObject['more-url']}
				   className="aurbhi-button events_ana"
				   data-cat="aur_padhein_D"
				   data-label="Cricket">और भी पढ़ें <span></span></a>

				<div className="clearfix vsp20 "></div>
			</div>
			</div>
			<style jsx global>{`
			.cricket-news-widget .global-sub-nav { display: none; }
			.home-sports .globalhd {
				margin-top: 40px;
			}
			.sports-news-skeleton {
				display : flex;
				flex-direction : row;
				justify-content: space-between;
				margin-top: 15px;
			}
			.sports-news-skeleton .left-side {
				width : 48%;
			}
			.sports-news-skeleton .right-side {
				width : 50%;
			}
			.sports-news-skeleton .left-side li {
				margin: 5px 0;
			}
			.sports-news-skeleton .right-side li {
				margin: 5px 0;
			}
			.sport-news-loader {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 362px;
				background-color: rgba(0,0,0,0.05);
				margin-top: 20px;
				border-radius: 10px;
			}
			.khelnews li:first-child a h3 {font-size: 20px;font-weight: 700;line-height: 1.45;padding: 5px 0 0 0;}
			.khelnews li a h3 {font-size: 17px;font-weight: 400;line-height: 1.45;}
			.khelnews{display:grid;grid-template-columns:repeat(2,1fr);border-bottom:1px dashed #ccc;margin-bottom:10px}
			.khelnews li{border-bottom:1px dashed #ccc;padding:15px 0}
			.khelnews li a{display:flex;font-weight:700;color:#000}
			.khelnews li figure{width:100px;margin-right:12px;flex-shrink:0}
			.khelnews li a h2{font-size:17px;font-weight:400;line-height:1.45}
			.khelnews li a h2:hover{color:#ed1c24}
			.khelnews li:first-child{grid-column:1/2;grid-row:1/8;margin-right:20px}
			.khelnews li:first-child a{flex-wrap:wrap}.khelnews li:first-child figure{width:100%;margin:0;margin-bottom:5px}
			.khelnews li:first-child a h2{font-size:20px;font-weight:700;line-height:1.45;padding:5px 0 0 0}
			.khelnews li:first-child,.khelnews li:last-child{border:none}
			.aurbhi-button {
				color: #001536;
				font-size: 14px;
				font-weight: 700;
				position: relative;
				float: right;
				padding-right: 5px;
				}
				.aurbhi-button span {
				background: #ed1c24;
				width: 19px;
				height: 19px;
				border-radius: 100%;
				display: inline-block;
				position: relative;
				top: 3px;
				margin-left: 4px;
				}
				.aurbhi-button span:after, .aurbhi-button span:before {
				content: "";
				position: absolute;
				top: 7px;
				width: 4px;
				height: 4px;
				border-top: 1px solid #fff;
				border-right: 1px solid #fff;
				display: block;
				transform: rotate(45deg);
				}
				.aurbhi-button span:before {
				left: 4px;
				}
				.aurbhi-button span:after {
				left: 8px;
				}

				#cricket-dhamal-banner {
					margin-top : 10px;
				}
				
		`}</style>
		</>
	);
};

export default HomeSports;
