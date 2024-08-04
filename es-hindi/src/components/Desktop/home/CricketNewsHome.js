import React, { Fragment, useEffect } from "react";
import Glide from '@glidejs/glide';
import LazyLoadImage from "components/Common/CustomImage";

const HomeSports= ({ sportsNews = [], sponsors = {} }) => {
	let {
    storiesListLeft = [],
    storiesListRight = [],
    banner,
    data,
  } = sportsNews;
  storiesListLeft = [...storiesListLeft.filter(Boolean)];
  storiesListRight = [...storiesListRight.filter(Boolean)];

	useEffect(() => {
		if(sponsors && typeof sponsors === 'object' && Object.keys(sponsors).length) {
			Object.keys(sponsors).map((eachData, index) => {
				if(sponsors[eachData].length > 1) {
					document.querySelector(`.glide${index}`) && new Glide(`.glide${index}`, {
					  type: 'carousel',
					  perView: 1,
					  autoplay: 2000,
					  gap: 0,
					})?.mount();
				}
			});
		}
	}, []);

	return (
		<>
			<div id="cricket_widget_div_ajax">
				<div className="series-widget vspacer30">
					<div className="fwcw-bg">
						{
							sponsors &&
							typeof sponsors === 'object' &&
							Object.keys(sponsors).length ?
							<ul className={'sponsors_container'}>
								{
									Object.keys(sponsors).map((eachData, index) => {
										if(sponsors[eachData].length) {
											return <li key={index} className={`glide${index}`}>
												<span className={'title'}>{eachData.replace(/-/, ' ').toUpperCase()}</span>
												<div data-glide-el="track" className="glide__track">
													<ul className="glide__slides">
														{
															sponsors[eachData].map((eachSponsor, dex) => {
																return <li className="glide__slide" key={`sponsor${index}${dex}`}>
																	<a rel="nofollow" href={eachSponsor.click_tracker_sponser} target="_blank" style={{ marginRight: "5px" }}>
																		<img
																			src={eachSponsor.desktop_img}
																			alt={eachSponsor.sponser_name}
																			title=""
																		/>
																	</a>
																</li>;
															})
														}
													</ul>
												</div>
											</li>;
										} else {
											return '';
										}
									})
								}
							</ul> : ''
						}
						<a href={data[0]['url']}>							
							<figure height={99}>									
								<LazyLoadImage
									src={banner.desktop_image_url}
									width={100}
									height={144}
									alt={'banner'}
									title={'banner'}
								/>
							</figure>
						</a>
					</div>
					<ul className="fwcw-links">
						{data && data.length ? data.map((eachData, index) => {
							return (
								<Fragment key={index}>
									<li className={index == 0 ? "active" : ''}>
										<a href={eachData.url} data-min-enable="hp-series-widget" data-min-method="true" data-min-anchor="true">{eachData.text || ""}</a>
									</li>
								</Fragment>
							);
						}) : ''}
					</ul>
					<div className="swinner">
						<ul className="sw-lbox">
							{storiesListLeft && storiesListLeft.length ? storiesListLeft.map((eachStory, index) => {
								return (
									<Fragment key={`lbox-${index}`}>
									<li>
										<a href={eachStory.url} title={eachStory.title}>											
											<figure height={144}>									
												<LazyLoadImage
													src={eachStory.thumbnail}
													width={100}
													height={144}
													alt={eachStory.title}
													title={eachStory.title}
												/>
											</figure>
										</a>
										<h3>
											<a href={eachStory.url} title={eachStory.title}>{eachStory.display_headline}</a>
										</h3>
											{eachStory.title}
									</li>
									</Fragment>
								);
							}) : ''}
						</ul>
						<ul className="sw-rbox">
							{storiesListRight && storiesListRight.length ? storiesListRight.map((eachStory, index) => {
								return (
									<Fragment key={`rbox-${index}`}>
									<li className="rightli">
										<a href={eachStory.url} title={eachStory.title}>
											<figure width={100} height={64}>												
												<LazyLoadImage
													src={eachStory.thumbnail}
													width={100}
													height={64}
													alt={eachStory.title}
													title={eachStory.title}
												/>
											</figure>
										</a>
											<a href={eachStory.url} title={eachStory.title}>{eachStory.display_headline}</a>
									</li>
									</Fragment>
								);
							}):''}
						</ul>
					</div>
				</div>
			</div>
			<style jsx global>{`
				.series-widget {font-family: Lato,sans-serif; border: 5px solid #202020;background: #F5F5F5; }
				.series-widget .swinner {font-family: Lato,sans-serif; padding: 15px;}
				.fwcw-bg-title {font-family: Lato,sans-serif; position: absolute; color: #fff; display: flex; align-items: center; height: 100%; justify-content: flex-end; width: 100%;  overflow: hidden;} 
				.fwcw-bg {font-family: Lato,sans-serif; position: relative; }
				.fwcw-title h3 {letter-spacing: 0px; color: #FFFFFF; text-shadow: 0px 3px 6px #00000029; font-size: 38px; font-family: Oswald; font-weight: 600; margin-bottom: 48px; position: relative; top: 24px; }
				.fwcw-title span {width: 236px; text-align: center;height: 24px; background: #FF0000 0% 0% no-repeat padding-box; border-radius: 5px 5px 0px 0px; font-size: 13px; font-family: Lato,sans-serif; display: inline-block; line-height: 24px; }
				.fwcw-title { text-align: left; }
				.fwcw-partner {display: flex; padding-left:40px;     align-items: center;position: relative;top: -7px;} 
				ul.fwcw-links {display: flex; align-items: center; width: calc(100% - 30px); margin: auto; background: #FFFFFF; border-top: 1px #e2e2e2 solid; border-bottom: 1px #e2e2e2 solid;    margin-top: 10px; }
				ul.fwcw-links li a span {font-family: Lato,sans-serif; display: block; font-size: 9px; color: #FF0000; line-height: 5px; }
				ul.fwcw-links li.active {border-color: #FF0000; } 
				ul.fwcw-links li.active a {font-family: Lato,sans-serif; color: #E1261D; } 
				ul.fwcw-links li {    padding: 0 13px;border-bottom: 3px #fff solid;margin: 0 4px;}
				ul.fwcw-links li a {font-family: Lato,sans-serif; color: #202020; font-size: 13px; font-weight: 500; padding: 7px 0; display: block; text-transform: uppercase; }
				ul.fwcw-links li:hover {border-color: #FF0000; }
				ul.fwcw-links li:hover a {font-family: Lato,sans-serif; color: #E1261D; } 
				.co-partners-slider .glide__slides {display: flex; overflow: hidden; }
				.co-partners-slider {width: 105px; height: 45px; overflow: hidden; }
				.add_div {background: #fff; width: 105px; height: 45px; } 
				.associate-partners-slider .glide__slides {display: flex; overflow: hidden; }
				.associate-partners-slider {width: 105px; height: 45px; overflow: hidden; }
				.fwcw-partner-slider span {font-size: 9px; text-align: center; display: initial; text-transform: uppercase; border-bottom: 1px #ababab solid; margin: auto; }
				.fwcw-partner-slider {margin: 0 9px; text-align: center; }
				.fwcw-title {    position: absolute;    right: 280px;}
				.fwcw-title span:empty {    display: none;}
				.series-widget ul.sw-lbox {
					width: 48.9177489177%;
					display: flex;
					padding-top: 4px;
					justify-content: space-between;
				}
				.series-widget ul.sw-lbox li {
					width: 48.0088495575%;
					font-size: 13px;
					color: #4b4b4b;
					line-height: 22px;
				}
				.series-widget ul.sw-lbox li h3 {
					font-size: 15px;
					line-height: 22px;
					padding-bottom: 8px;
					font-family: Lato,sans-serif; 
				}
				.series-widget ul.sw-rbox {
					width: 48.9177489177%;
					margin-top: 4px;
				}
				.series-widget ul.sw-rbox li:first-child {
					padding-top: 0;
					font-family: Lato,sans-serif; 
				}
				.series-widget ul.sw-rbox li {
					padding: 10px 0 7px;
					border-bottom: 1px dotted #939393;
					display: flex;
					font-family: Lato,sans-serif; 
				}
				.series-widget .swinner {
					display: flex;
					justify-content: space-between;
					padding: 15px;
					font-family: Lato,sans-serif; 
				}
				.series-widget ul.sw-lbox a,
				.fwcw-bg a {
					display: block;
					font-family: Lato,sans-serif; 
				}
				.series-widget ul.sw-lbox a img,
				.fwcw-bg a img {
					width: 100%;
					font-family: Lato,sans-serif; 
				}
				.series-widget .swinner, .series-widget ul.sw-rbox li {
					justify-content: space-between;
					font-family: Lato,sans-serif; 
				}
				.rightli a:first-child {
					margin-right: 10px;
					font-family: Lato,sans-serif; 
				}

				.fwcw-bg {
					position: relative;
				}
				.sponsors_container {
					position: absolute;
					z-index: 1;
					display: flex;
					right: 20px;
					top: 50%;
    				transform: translateY(-57%);
				}
				.sponsors_container > li {
					margin-left : 10px;
					width : 115px;
					height: 70px;
					overflow: hidden;
				}

				.sponsors_container .glide__slides {
					margin-top: 5px;
				}

				.sponsors_container .glide__slides img {
					width : 110px;
					height: 47px;
				}
				.sponsors_container .glide__slides li {
					display: inline-block;
				}
				.sponsors_container span.title {
					color: white;
					font-size: 8px;
				}

			`}</style>
		</>
	);
};

export default HomeSports;
