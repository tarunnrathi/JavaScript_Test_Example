import { memo, useEffect } from "react";
import getConfig from "next/config";
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";
import ReadMore from "../common/ReadMore";
import HeadingWithoutContainer from "../HeadingWithoutContainer";
import GlideBtn from "components/Common/GlideBtn";
import LazyLoadImage from "components/Common/CustomImage";
const { publicRuntimeConfig } = getConfig();

const BlogList = ({
	//isMobile = false,
	isAmp = false,
	data = [],
	categoryLink
}) => {
	const blog = data && data.length ? data : [];
	useEffect(() => {
		if (document.getElementsByClassName('newbloglist-slide').length) {
			new Glide(document.querySelector('.newbloglist-slide'), {
				autoplay: false,
				type: 'carousel',
				perView: 1.5,
				focusAt: 'center',
				gap: 15,
				slidesToScroll: 1,
			}).mount();
		}
	}, []);
	return (
		<>
			<div className="newglblhdwrap">
				<HeadingWithoutContainer
					heading={`ब्लॉग`}
					categoryLink={categoryLink}
				/>
				<ReadMore
					// categoryLink={publicRuntimeConfig + 'blogs/'}
					heading={`और भी पढ़ें`}
					buttonType={true}
				/>
			</div>
			<div className="newbloglist-slide">
				<div data-glide-el="track">
					<ul>
						{blog && blog.length > 0 && blog.map((news, i) => {
							let {
								image,
								weburl,
								weburl_r,
								headline,
								display_headline,
								author_byline
							} = news;

							const authorDetails = author_byline?.[0] || {};
							const authorName = authorDetails?.hindi_name || authorDetails?.english_name;
							let companyDesignation = `${authorDetails?.designation || ""}' | '${authorDetails.company}`;
							let slug = authorDetails?.english_name?.toLowerCase()?.replace("_", "-") || '';
							slug = slug.replace(/_/g, "-");
							image = image ? image : `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy=website&width=130`;
							const queryString = `blogs/${slug}-${authorDetails?.ID}`;
							const authorShareUrl = `${publicRuntimeConfig.siteUrl}${queryString}.html`;
							const company = authorDetails.company ? authorDetails.company : '';
							const designation = authorDetails?.designation ? authorDetails?.designation : '';
							if (designation !== '' && company !== '') {
								companyDesignation = `${designation}' | '${company}`;
							} else if (designation !== '' && company === '') {
								companyDesignation = designation;
							} else {
								companyDesignation = company;
							}
							return (
								<li key={`blogListHome-` + i}>
									<a href={authorShareUrl}>
										<figure>
											{
												isAmp ?
													<LazyLoadImage
														src={news?.images?.url}
														width={150}
														height={150}
														alt={display_headline || headline}
														title={display_headline || headline}
														isAMP={true}
													/>
													:
													<LazyLoadImage
														src={authorDetails?.avtar}
														width={150}
														height={150}
														alt={display_headline || headline}
														title={display_headline || headline}
													/>
											}
										</figure>
										<figcaption>{authorName}<span>{companyDesignation}</span></figcaption>
									</a>
									<a href={getCompleteURL(weburl_r, weburl)}>
										<h3>{display_headline || headline}</h3>
										<p><em className="moretrndstroy2">और भी पढ़ें</em></p>
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<GlideBtn
					data={blog}
					className={`trndstorynewbullet`}
				/>
			</div>

			<style jsx global>{`
                .newbloglist-slide {
					position: relative;
					overflow: hidden;
					padding: 5px 10px 10px 10px;
				  }
			  
				  .newbloglist-slide ul {
					display: flex;
					margin-bottom: 15px;
				  }
			  
				  .newbloglist-slide ul li {
					border: 1px solid #D3D3D3;
					border-radius: 4px;
					background-color: #f4f4f4;
					padding: 15px;
					text-align: center;
				  }
			  
				  .newbloglist-slide ul li a figure {
					background: #FFFFFF 0% 0% no-repeat padding-box;
					box-shadow: 0px 3px 6px #00000029;
					width: 125px;
					height: 125px;
					display: table;
					margin: auto;
					border-radius: 100%;
					border: 5px solid #fff;
					overflow: hidden;
				  }
			  
				  .newbloglist-slide ul li a figure img {
					width: 125px;
					height: 125px;
				  }
			  
				  .newbloglist-slide ul li a figcaption {
					font-size: 21px;
					font-weight: bold;
					color: #000000;
					line-height: 30px;
					margin: 15px 0 10px 0;
					border-bottom: 2px solid #E1261C;
					padding-bottom: 10px;
				  }
			  
				  .newbloglist-slide ul li a figcaption span {
					display: block;
					font-size: 15px;
					color: #505050;
					font-weight: normal;
				  }
			  
				  .newbloglist-slide ul li a h3 {
					color: #444444;
					font-size: 15px;
					line-height: 22px;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					height: 44px;
				  }
			  
				  .newbloglist-slide ul li a p {
					background: #ED2129 0% 0% no-repeat padding-box;
					box-shadow: 0px 3px 8px #90a4b73d;
					border: 1px solid #FFFFFF;
					border-radius: 15px;
					display: table;
					margin: auto;
					margin-top: 12px;
					padding: 3px 15px;
				  }
			  
				  .newbloglist-slide ul li a p em {
					font-style: normal;
					filter: brightness(0) invert(1);
				  }
				  .newglblhd {width: 75% !important}
            `}</style>
		</>
	);
};

export default memo(BlogList);
