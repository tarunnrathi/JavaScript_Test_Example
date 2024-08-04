import { imageLoader } from "includes/article.util";
import { memo, useEffect, useState } from "react";
import Heading from "../common/Heading";
import ReadMore from "components/Desktop/common/ReadMore";
import { getCompleteURL } from "util/global/Helper";
import { TEXT } from "constant/global/Constant";
import Skeleton from "components/Common/CustomSkeleton";
import { getArticles } from "api/individual/Home";
import LazyLoadImage from "components/Common/CustomImage";

const ImageWithListRHS = ({
	data = [],
	heading = null,
	count = 4,
	category,
	categoryLink
}) => {
	const [list, setList] = useState(data.length > 0 ? data : []);
	const [loading, setLoading] = useState(data.length > 0 ? false : true);

	const getData = async () => {
		const result = await getArticles({ count: count || 4, category: category }, true);
		if (result.length > 0) {
			setLoading(false);
			setList(result);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="newglblhdwrap">
				<Heading
					categoryLink={categoryLink}
					heading={heading}
				/>
			</div>
			<div className="newnaukriwrap">
				{
					!loading ? (
						<ul className="newbottomsectionlist">
							{
								list && list.length > 0 && list.map((item, index) => {
									const width = 278;
									const height = 185;
									const imageSrc = item.images.url;
									const title = item.headline || item.display_headline;
									return index < count && (
										<li>
											<a href={getCompleteURL(item?.weburl_r, item?.weburl)}>
												{
													index === 0 && (
														<figure width={width} height={height}>														
															<LazyLoadImage
																src={imageSrc}
																width={width}
																height={height}
																alt={title}
																title={title}
															/>
														</figure>
													)
												}
												<h3>{title}</h3>
											</a>
										</li>
									);
								})
							}
						</ul>
					) : (
						<Skeleton height={358} />
					)
				}

				<div className="newpwhitebgbtn">
					<ReadMore
						link={categoryLink}
						label={TEXT.READ_MORE}
					/>
				</div>
			</div>
			<style jsx>{`
                .newnaukriwrap {
					background: #F5F5F5;
					padding: 10px;
					height: 473px;
					position: relative;
				}
				.newbottomsectionlist li {
				  padding: 10px 15px;
				  border-bottom: 1px solid #e0e0e0;
				  position: relative;
				}
		  
				.newbottomsectionlist li:before {
				  content: "";
				  background: #707071;
				  width: 5px;
				  height: 5px;
				  position: absolute;
				  top: 20px;
				  left: 0;
				  border-radius: 100%;
				}
				.newbottomsectionlist li:first-child:before {
					content: "";
					display:none;
					background-color: transparent;
				  }
				 
				.newbottomsectionlist li a figure {
				  width: 100%;
				  height: 183px;
				}
		  
				.newbottomsectionlist li a figure img {
				  width: 100%;
				}
		  
				.newbottomsectionlist li a h3 {
				  font-size: 15px;
				  line-height: 22px;
				  color: #000000;
				  height: 42px;
				  overflow: hidden;
				  font-weight: normal;
				  display: -webkit-box;
				  -webkit-line-clamp: 2;
				  -webkit-box-orient: vertical;
				  overflow: hidden;
				}
		  
				.newbottomsectionlist li:first-child {
				  padding: 0;
				  background: #FFFFFF 0% 0% no-repeat padding-box;
				  border: 1px solid #D6D6D6;
				  border-radius: 4px;
				}
		  
				.newbottomsectionlist li:first-child a h3 {
				  padding: 7px 10px 0;
				  height: 53px;
				  font-weight: bold;
				}
		  
				.newbottomsectionlist li:first-child a figure img {
				  border-radius: 4px 4px 0 0;
				}
				.newbottomsectionlist li a figure img {
					height: 100% !important;
				}
				.newpwhitebgbtn {
					background: #fff;
					padding: 5px 0 0 0;
					margin-top: 12px;
					position: absolute;
    				width: 93%;
					bottom: 2%;
				  }
				  .newglblhdwrap .newglblhd, .newglblhdwrap .newglblhd a {
					font-size: 20px;
					line-height: 38px;
					color: #000;
					font-weight: bold;
					display: flex;
					align-items: end;
				}
            `}</style>
		</>
	);
};

export default memo(ImageWithListRHS);
