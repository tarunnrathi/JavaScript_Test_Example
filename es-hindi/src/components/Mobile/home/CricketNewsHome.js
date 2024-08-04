import React, { Fragment, useEffect } from "react";
import LazyLoadImage from 'components/Common/LazyLoadImage';
import Glide from '@glidejs/glide';
import { imageLoader } from 'includes/article.util';

const HomeSports= ({ sportsNews = [], isAmp = false, sponsors = {} }) => {
	let { storiesListLeft = [], storiesListRight = [], banner, data } = sportsNews;
	storiesListLeft = [...storiesListLeft.filter(Boolean)];
	storiesListRight = [...storiesListRight.filter(Boolean)];
	const combineSponsors = [];

	if (sponsors && typeof sponsors === "object" && Object.keys(sponsors).length) {
    Object.keys(sponsors).map(
      (eachData) =>
        sponsors[eachData] &&
        sponsors[eachData].length &&
        sponsors[eachData].map((eachSpon) => combineSponsors.push(eachSpon))
    );
  }

	useEffect(() => {
		new Glide('.cricket-next-slider', {
			perView: 1.2,
			gap: 0,
			slidesToShow: 1,
		}).mount();

		if(combineSponsors && combineSponsors.length > 1) {
			document.querySelector(`.glide_sponsors_container`) && new Glide(`.glide_sponsors_container`, {
			  type: 'carousel',
			  perView: 1,
			  autoplay: 2000,
			  gap: 0,
			})?.mount();
		}
	});

	return (
		<>
		<div id="cricket_widget_div_ajax" className="vspacer30">
			<div className="cricketnet-box">
				<div className="cntop-box">
						{
							combineSponsors &&
							combineSponsors.length && !isAmp ?
							<div className={'glide_sponsors_container'}>
								<div data-glide-el="track" className="glide__track">
									<ul className="glide__slides">
										{
											combineSponsors.map((eachSponsor, dex) => {
												return <li className="glide__slide" key={`sponsor${dex}`}>
													<span className={'title'}>{eachSponsor.sponser_name?.replace(/-/, ' ')?.toUpperCase() || ''}</span>
													<a rel="nofollow" href={eachSponsor.click_tracker_sponser} target="_blank" style={{ marginRight: "5px" }}>
														<img
															src={eachSponsor.mobile_img}
															alt={eachSponsor.sponser_name}
															title=""
														/>
													</a>
												</li>;
											})
										}
									</ul>
								</div>
							</div> : combineSponsors && combineSponsors.length && isAmp ?
							<div className="sponsor-div" style={{ position: 'absolute', zIndex: '1', width: '120px', height: '68px', right: '30px', top: '50%', transform: 'translateY(-60%)' }}>
								<div className="spnsrd-slider">
									<amp-carousel
										width="105"
										height="70"
										layout="responsive"
										autoplay="2000"
										type="slides"
										delay="2000"
										role="region"
										aria-label="Carousel with autoplay"
									>
										{
											combineSponsors.map((eachSponsor, dex) => {
												return <div className="glide__slide" key={`sponsor${dex}`}>
													<span className={'title'}>{eachSponsor.sponser_name?.replace(/-/, ' ')?.toUpperCase() || ''}</span>
													<a rel="nofollow" href={eachSponsor.click_tracker_sponser} target="_blank" style={{ marginRight: "5px" }}>
														<amp-img
															src={eachSponsor.mobile_img}
															alt={eachSponsor.sponser_name}
															title={eachSponsor.sponser_name}
															width="105"
															height="45"
															layout="responsive"
														></amp-img>
													</a>
												</div>;
											})
										}
									</amp-carousel>
								</div>
							</div> : ''
						}
						<a href={data[0]['url']}>
							{
								isAmp ? (
									<figure className="expand">
									  <amp-img
										src={banner.mobile_image_url}
										height="99"
										alt={'banner'}
										title={'banner'}
									  ></amp-img>
									</figure>
								) : (
									<LazyLoadImage
										once
										height={99}
										dontAlter={true}
										src={banner.mobile_image_url}
										alt={'banner'}
										title={'banner'}
									/>
								)
							}
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

					<div className="ipl-pwa-glide glide--ltr glide--carousel glide--swipeable cricket-next-slider">
						<div className="glide__track" data-glide-el="track">
							<ul className="ipl-pwa-slider">
								{storiesListLeft && storiesListLeft.length ? storiesListLeft.map((eachStory, index) => {
									return (
										<Fragment key={index}>
										<li>
											<a href={isAmp ? eachStory.url?.replace('.com/', '.com/amp/') : eachStory.url} title={eachStory.title}>
											{
												isAmp ? (
													<figure className="expand">
														<amp-img
															src={imageLoader(eachStory.thumbnail, 360, 253, false, true) || ''}
															height={185}
															alt={eachStory.title}
															title={eachStory.title}
														></amp-img>
													</figure>
												) : (
													<LazyLoadImage
														once
														dontAlter={true}
														src={imageLoader(eachStory.thumbnail, 360, 253, false, true) || ''}
														alt={eachStory.title}
														title={eachStory.title}
														isRes={true}
													/>
												)
											}
												<h3>{eachStory.title}</h3>
											</a>
										</li>
										</Fragment>
									);
								}) : ''}
								{storiesListRight && storiesListRight.length ? storiesListRight.map((eachStory, index) => {
									return (
										<Fragment key={index}>
										<li>
											<a href={isAmp ? eachStory.url?.replace('.com/', '.com/amp/') : eachStory.url} title={eachStory.title}>
											{
												isAmp ? (
													<figure className="expand">
														<amp-img
															src={imageLoader(eachStory.thumbnail, 360, 253, false, true) || ''}
															height={185}
															alt={eachStory.title}
															title={eachStory.title}
														></amp-img>
													</figure>
												) : (
													<LazyLoadImage
														once
														dontAlter={true}
														src={imageLoader(eachStory.thumbnail, 360, 253, false, true) || ''}
														alt={eachStory.title}
														title={eachStory.title}
														isRes={true}
													/>
												)
											}
												<h3>{eachStory.title}</h3>
											</a>
										</li>
										</Fragment>
									);
								}) : ''}
							</ul>
						</div>
						<div className="glide__bullets" data-glide-el="controls[nav]">
							<button className="glide__bullet glide__bullet--active" data-glide-dir="=0"></button>
							<button className="glide__bullet" data-glide-dir="=1"></button>
							<button className="glide__bullet" data-glide-dir="=2"></button>
							<button className="glide__bullet" data-glide-dir="=3"></button>
							<button className="glide__bullet" data-glide-dir="=4"></button>
							<button className="glide__bullet" data-glide-dir="=5"></button>
						</div>
					</div>
				</div>
			</div>
			<style jsx global>{`
				.cricketnet-box {background: #00686a;padding: 4px}
				.cricketnet-box .cntop-box {padding: 5px 5px 8px}
				.cricketnet-box .cntop-box h2 {font-size: 20px;color: #ffe400}
				.cricketnet-box .cntop-box span {display: block;padding: 4px 0;color: #fff;font-size: 12px}
				.cricketnet-box .cntop-box .cntab a {display: inline-block;background: #00494b;padding: 8px 10px;font-size: 12px;text-transform: uppercase;color: #fff496;margin-right: 2px}
				.cricketnet-box ul {background: #fff;padding: 0 6px}
				.cricketnet-box ul li {border-bottom: 1px dotted #939393;padding: 12px 0}
				${!isAmp ? '.cricketnet-box ul li:first-child {padding-top: 5px}' : ''}
				.cricketnet-box ul li:first-child img {width: 100%}
				.cricketnet-box ul li:first-child, ul.section li:first-child {font-size: 15px;line-height: 22px;font-weight: 700}
				// .cricketnet-box ul li:last-child, ul.story03 li:last-child {border: 0}
				.cricketnet-box .pby {font-size: 9px;text-transform: uppercase;color: #fff;padding: 2px 10px 4px}
				.cricketnet-box .pby img {position: relative;top: 5px}
				ul.ipl-pwa-slider {display: flex; }
				${isAmp ? "ul.ipl-pwa-slider {width : 475%;}" : ""}
				.ipl-pwa-glide {width: 100%;overflow: ${isAmp ? "scroll" : "hidden"};    margin-left: 15px;}
				.cricketnet-box ul li h3, .cricketnet-box ul li h4 {font-size: 16px; line-height: 22px; font-weight: bold; font-family: Lato,sans-serif; padding: 0px 10px 10px; }
				ul.ipl-pwa-slider li {background: #FFFFFF 0% 0% no-repeat padding-box; border: 1px solid #D7D7D7; border-radius: 5px; padding:0 ${!isAmp ? "!important" : "" }; overflow: hidden; margin: 0 5px ${!isAmp ? "!important" : "" };}
				.cricketnet-box {background: #F5F5F5 ${!isAmp ? "!important" : "" }; margin: 0 -10px; overflow: hidden; border-bottom: 6px #EEEEEE solid; padding: 0 0 20px ${!isAmp ? "!important" : "" }; } 
				.co-partners-slider .glide__slides {display: flex; overflow: hidden; }
				.co-partners-slider {  overflow: hidden;    width: 105px; }
				.add_div img {max-width: 100%;max-width: 100%;
					width: auto ${!isAmp ? "!important" : "" }; }
				.cricketnet-box ul.fwcw-links {display: flex; align-items: center; padding: 0px 10px; justify-content: space-between; margin-bottom: 10px; border-top: 1px #e2e2e2 solid; border-bottom: 1px #e2e2e2 solid; }
				.cricketnet-box ul.fwcw-links li {padding: 0; font-weight: normal ${!isAmp ? "!important" : "" }; border: 0; text-transform: uppercase; line-height: 20px; border-bottom: 3px #fff solid ${!isAmp ? "!important" : "" }; padding: 0 ${!isAmp ? "!important" : "" }; }
				.cricketnet-box .cntop-box {padding: 0 ${!isAmp ? "!important" : "" }; }
				.cricketnet-box .cntop-box img {width: 100%;display: block;}
				.cricketnet-box ul.fwcw-links li span {display: block; font-size: 9px; color: #FF0000; line-height: 5px; position: absolute; top: 4px; }
				.cricketnet-box ul.fwcw-links li a {color: #202020; font-size: 13px; position: relative; display: block; line-height: 30px; padding-top: 5px; }
				ul.fwcw-links li.active {border-color: #FF0000 ${!isAmp ? "!important" : "" };    font-weight: bold ${!isAmp ? "!important" : "" }; } 
				ul.fwcw-links li.active a {color: #E1261D; } 
				.fwcw-bg-title {    position: absolute; right: 10px; display: flex; align-items: center; top: 10px;overflow: hidden;}
				.fwcw-title h3 {letter-spacing: 0px; color: #FFFFFF; text-shadow: 0px 3px 6px #00000029; font-size: 26px; padding-bottom: 7px; border-bottom: 3px #FF0000 solid; text-transform: uppercase; margin-bottom: 8px; }
				.fwcw-title {margin-right: 25px; position: relative; top: 5px; }
				.fwcw-title span {line-height: 10px; }
				.cntop-box .fwcw-partner-slider span {padding: 0; margin: 0; text-align: center; text-transform: uppercase; font-size: 9px ${!isAmp ? "!important" : "" }; border-bottom: 1px #fff solid; display: inline-block ${!isAmp ? "!important" : "" }; margin-bottom: 5px; line-height: 14px; padding: 0 ${!isAmp ? "!important" : "" }; }
				.fwcw-partner-slider {width: 100%; text-align: center; }
				.cricketnet-box .cntop-box {position: relative; }
			
				.fwcw-partner {
					width: 105px;
					overflow: hidden;
					text-align: center;
				}
				.ipl-pwa-glide .glide__bullets {display: flex; align-items: center; justify-content: center; margin-top: 16px; }
				${isAmp ? '.ipl-pwa-glide .glide__bullets {display: none;}' : ''}
				.ipl-pwa-glide button.glide__bullet {width: 30px; height: 4px; background: #989898 0% 0% no-repeat padding-box; border-radius: 6px; border: 0; outline: none; appearance: none; margin: 0 4px; }
				.ipl-pwa-glide button.glide__bullet.glide__bullet--active {background: #E1261C; } 
				.fwcw-bg-title {overflow: initial;}
				.fwcw-title {position: absolute; right: 63px; width: 170px; top: 19px; }
				.fwcw-title h3 {display: inline-block; }

				.cntop-box {
					position : relative;
				}
				.glide_sponsors_container {
					position : absolute;
					z-index : 1;
					right: 10px;
					top: 5px;
					overflow: hidden;
					width: 140px;
					height: 90px;
				}
				.glide_sponsors_container ul {
					background: transparent;
				}
				.glide_sponsors_container .glide__slides {
					width : 715px ${!isAmp ? "!important" : "" };
				}
				.glide_sponsors_container ul.glide__slides li:first-child,
				.glide_sponsors_container ul li {
					padding: 0 0 0 10px;
					font-weight: 400;
					display: inline-block;
					margin-left: 0;
					transform: translateX(-10px);
				}
				.glide_sponsors_container ul li img {
					width: 130px;
					height: 47px;
				}

				.i-amphtml-carousel-arrows {
					display: ${isAmp ? 'none' : ''}
				}

			`}</style>
		</>
	);
};

export default HomeSports;
