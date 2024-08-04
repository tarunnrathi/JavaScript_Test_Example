import React from "react";
import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";
import OptionTab from "components/Common/OptionTab";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const HomeAjabGajab= (props) => {
	const MobileNews = props.data || [];
	const MobileNewsObject = {
		"key": "ajab-gajab",
		"value": "अजब-गजब",
		"colorClass": "bgclr-tech",
		"template": "one",
		"subCatDisplay": "1",
		'more-url': '/news/ajab-gajab/',
		'sub-list': [],
	};

	const onOptionClick = (title) => {
		const dataArray = [...MobileNewsObject['sub-list']];
		dataArray.map((eachData) => {
			if(eachData.value == title) {
				getData(eachData.key);
			}
		});
	};
	return (
		<>

			<div className="clearfix vsp20 "></div>
			<div className="mobile-tech-wrap">
			<OptionTab
				head={MobileNewsObject['value']}
				url={MobileNewsObject['more-url']}
				options={[...MobileNewsObject['sub-list'].map((eachOption) => { return { 'title': eachOption.value };})]}
				updateState={onOptionClick}
				component={MobileNewsObject['key']}
			/>
			{(
				<div className="techstories">
					<div className="bollywoodnews">
						<ul className="dflex justify-space-betwwen flex-wrap">
						{MobileNews && MobileNews.length && MobileNews.map((eachNews, index) => {
							const width = index < 2 ? 430 : 90;
							const height =index <0 ? 288 : 68;
							const imageSrc = imageLoader(eachNews.thumbnail, width, height);
								return(
									<>
										{index <8 ? (
											<li>
												<a href={eachNews.url ? eachNews.url.replace("https://hindi.news18.com/", publicRuntimeConfig.siteUrl) : ''}>
													<LazyImage
														width={index < 2 ? 430 : 90}
														height={index < 2 ? 266 : 68}
														src={imageSrc}
														alt={eachNews.display_headline || ''}
														title={eachNews.display_headline|| ''}
														unoptimized={true}
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
					<a href={MobileNewsObject["more-url"]}
					   className="aurbhi-button events_ana"
					   data-cat="aur_padhein_D"
					   data-label="Cricket">और भी पढ़ें <span></span></a>

				</div>
				</div>
			)}
			<style jsx global>{`
			.mobile-tech-wrap {
				background: #f5f5f5;
				padding: 20px 20px 45px;
			}
			.mobile-tech-wrap .globalhd {
				margin-top: 0;
			}
        .mobile-news-loader {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 600px;
            background-color: rgba(0,0,0,0.05);
            margin-top: 20px;
            border-radius: 10px;
        }
            .bollywoodnews-wrap {
                background: #f5f5f5;
                padding: 20px;
            }
            .bollywoodnews {
                margin-top: 20px;
            }
            .bollywoodnews ul li:first-child, .bollywoodnews ul li:nth-child(2) {
                width: 49%;
            }
            
            .bollywoodnews ul li {
                margin-bottom: 12px;
                width: 32%;
                border-bottom: 1px dashed #ccc;
                padding-bottom: 12px;
            }
            .bollywoodnews ul li {
                width: 49%;
            }
            .bollywoodnews ul li:first-child a, .bollywoodnews ul li:nth-child(2) a {
                flex-wrap: wrap;
            }
            .bollywoodnews ul li a {
                display: flex;
                font-weight: 700;
                color: #000;
            }
            .bollywoodnews ul li a h3 {
                font-size: 17px;
                font-weight: 400;
                line-height: 1.45;
            }

            .bollywoodnews ul li:first-child a h3, .bollywoodnews ul li:nth-child(2) a h3 {
                font-size: 20px;
                font-weight: 700;
                line-height: 1.45;
                padding: 10px 0 0 0;
            }
            .bollywoodnews ul li figure {
                width: 90px;
                margin-right: 12px;
                flex-shrink: 0;
            }
            .aurbhi-button {
                color: #001536;
                font-size: 14px;
                font-weight: 700;
                position: relative;
                float: right;
                padding-right: 5px;
            }
            .aurbhi-button span:after {
                left: 8px;
            }
            .aurbhi-button span:before {
                left: 4px;
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
                transform: rotate(
            45deg
            );
            }
            `}</style>
		</div>
		</>
	);
};

export default HomeAjabGajab;
