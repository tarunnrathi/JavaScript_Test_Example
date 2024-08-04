import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import LazyImage from 'components/Common/LazyImage';
import { imageLoader } from 'includes/article.util';
import ReactHtmlParser from 'html-react-parser';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getWebstoryDataByCategory } from 'api/individual/webstories';
const { publicRuntimeConfig } = getConfig();

const HomeWebStories = ({ isMobile = false, isAmp = false, WebStories = [], webStoryName = "" }) => {
	const [loadMore, setLoadMore] = useState(1);
	const [webStories, setWebStories] = useState(WebStories);
	useEffect(() => {
		if (WebStories.length) {
			setWebStories([...WebStories.slice(0, 40)]);
		}
	}, [WebStories]);
	const loadPosts = async (d) => {
		if (d) {
			const currentLoadMore = d;
			const offset = currentLoadMore * (isMobile ? 16 :WebStories?.length);
			const data = await getWebstoryDataByCategory({ categories: webStoryName }, offset, isMobile ? 16 : 20, true);
			if (data?.length) {
				setLoadMore(currentLoadMore + 1);
				setWebStories((ev) => ([...ev, ...data]));
			} else {
				setLoadMore(false);
			}
		}
	};
	return (
		<>
			<div className="web_stories">
				<div className="globalhd large">
					<h2 className='my-class'><a href={`${publicRuntimeConfig.siteUrl}web-stories/${(webStoryName).toLowerCase().trim().replace(" ", "-") + "/"}`}>{webStoryName || "वेब स्टोरीज"}</a></h2>
				</div>
				{
					webStories && webStories.length  > 0 && (
						<div className="listing_row">
							{
								webStories.map((item) => {
									const filterOut = (item.feature_img || '').includes("storyasset.link") || (item.feature_img || '').includes("images.news18.com");
									const imageSrc = filterOut ? item.feature_img : imageLoader(item.feature_img, 220, isMobile ? 300 : 274);
									const dontAlter = filterOut;
									return (<>
										<div className="slide">
											<a href={item.web_url_r ? item.web_url_r : ''} target="_blank">
												{isAmp ?
													<figure>
														<amp-img
															width={220}
															height={300}
															src={imageSrc}
															alt={item.blog_title || ''}
															title={item.blog_title || ''}
															layout="responsive"
														></amp-img>
													</figure> :
													<LazyImage
														width={220}
														height={isMobile ? 300 : 274}
														src={imageSrc}
														alt={item.blog_title || ''}
														title={item.blog_title || ''}
														isRes={isMobile ? false : true}
														unoptimized={true}
														filterOut={filterOut}
														dontAlter={dontAlter}
													/>}
												<span className="videothumbhead">{ReactHtmlParser((item.blog_title || "")?.replace(/\\/g, ''))}</span>
											</a>
										</div>
									</>);
								})
							}
						</div> 
				)}
			</div>
			{
				loadMore && !isAmp && <button type="button" className='load_more clearfix'
				 onClick={() => loadPosts(loadMore)}>Load More</button>

			}
			<style jsx global>{`
				.web_stories .globalhd {border-bottom:1px solid #001536; padding-bottom:5px;}
				.web_stories .globalhd {
					border-bottom: 1px solid #bababa;
					padding-bottom: 4px;
					position: relative;
					margin-left: 6px;
					margin-bottom: 17px;
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
					font-family:'Noto Sans', sans-serif;
				}
				.listing_row {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				}
				.listing_row .slide {
					width: calc(25% - 10px);
					margin: 0 5px;
					margin-bottom: 10px;
				}
				.web_stories .slide {
					position: relative;
				}
				.listing_row .slide img {
					width: 100%;
					display: block;
					height: 300px;
				}
				a img {
					border: none;
				}
				.web_stories {
					margin-bottom: 15px;
				}
				.web_stories .slide .videothumbhead {
					position: absolute;
					background-color: rgba(33,33,37,0.8);
					padding: 10px;
					bottom: 10px;
					left: 0;
					right: 24px;
					font-size: 14px;
					color: #fff;
					font-style: normal;
					line-height: 20px;
					border-left: 5px #E1261D solid;
					font-family: 'Noto Sans', sans-serif;
					border-bottom-right-radius: 8px;
					border-top-right-radius: 8px;
					line-height: 20px;
				}

			@media screen and (max-width: 768px) {
				.listing_row .slide {
					width: calc(50% - 10px);
					margin: 0 5px;
					margin-bottom: 10px;
				}
				.slide figure {
					width : ${isAmp ? "100%" : "100% !important"};
				}
				.slide figure > div{
					width : ${isAmp ? "100%" : "100% !important"};
				}
			}
			${!isAmp ? "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=optional');" : ''}
  		`}</style>
		</>
	);
};

export default HomeWebStories;
