import { memo, useState } from "react";
import Heading from "../common/Heading";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import ReadMore from "components/Desktop/common/ReadMore";
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import { TEXT } from "constant/global/Constant";

const BlogList = ({
    isMobile = false,
    isAmp = false,
    data = []
}) => {

    const [blog, setblog] = useState(data && data.length ? data : []);

    return (
        <>
            <div className="newglblhdwrap blogListWrapper">
                <Heading
                    categoryLink={publicRuntimeConfig.siteUrl+'blogs/'}
                    heading={`ब्लॉग`}
                />
                <ReadMore
                    link={publicRuntimeConfig.siteUrl+'blogs/'}
                    label={`और भी पढ़ें`}
                />
            </div>

            <ul className="newbloglist">
			{blog && blog.length > 0 && blog.map((news, i) => {
					let {
						image,
						weburl,
						weburl_r,
						headline,
						display_headline,
						author_byline
					} = news;

					const authorDetails = author_byline[0] || {};
					const designation = authorDetails?.designation ? authorDetails?.designation : '';
					const company = authorDetails?.company ? authorDetails.company : '';
					const authorName = authorDetails?.hindi_name || authorDetails?.english_name;
					let companyDesignation = `${designation}' | '${company}`;
					let slug = authorDetails?.slug?.toLowerCase()?.replace("_", "-") || '';
					slug = slug.replace(/_/g, "-");
					image = image ? image : `${publicRuntimeConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH}?impolicy=website&width=130`;
					const queryString = `blogs/${slug}-${authorDetails?.ID}`;
					const authorShareUrl = `${publicRuntimeConfig.siteUrl}${queryString}.html`;
					if (designation !== '' && company !== '') {
						companyDesignation = `${designation}' | '${company}`;
					} else if (designation !== '' && company === '') {
						companyDesignation = designation;
					} else {
						companyDesignation = company;
					}
					return (
						<li key={`blogListHome-`+i}>
                            <a href={authorShareUrl}>
                                {
									isAmp ?											
										<figure width={150} height={150}>
											<LazyLoadImage
												src={news?.images?.url}
												width={150}
												height={150}
												alt={display_headline || headline}
												title={display_headline || headline}
												isAmp={true}
											/>
										</figure>
										:
										<figure width={150} height={150}>
											<LazyLoadImage
												src={authorDetails?.avtar}
												width={150}
												height={150}
												alt={display_headline || headline}
												title={display_headline || headline}
											/>
										</figure>
								}
                                <figcaption>{authorName}<span>{companyDesignation}</span></figcaption>
                            </a>

                            <a href={getCompleteURL(weburl_r, weburl)}>
                                {isMobile ? (
									<h2>{display_headline || headline}</h2>
								) : (
									<h3>{display_headline || headline}</h3>
								)}
                                <p><em className="moretrndstroy">{TEXT.READ_MORE}</em></p>
                            </a>
                        </li>
					);
				})}
            </ul>
            <div className="vsp40 clearfix"></div>
            <style jsx global>{`
                .newbloglist{display: flex; gap: 20px}
                .newbloglist li{border: 1px solid #D3D3D3;width: 24%;border-radius: 4px; background-color: #f4f4f4; padding: 15px; text-align: center;}
                .newbloglist li a figure{background: #FFFFFF 0% 0% no-repeat padding-box;box-shadow: 0px 3px 6px #00000029;width: 125px;height: 125px;display: table;margin: auto;border-radius: 100%;border: 5px solid #fff;overflow: hidden;}  
                .newbloglist li a figure img{
					// width: 125px;height: 125px;
					 min-height: 100%;
					 width: 100%;
					 height: 100%;	
				} 
                .newbloglist li a figcaption{font-size: 21px;font-weight: bold;color: #000000;line-height: 30px;margin: 15px 0 10px 0;border-bottom: 2px solid #E1261C;padding-bottom: 10px; min-height: 102px;	max-height: 102px;}
                .newbloglist li a figcaption span{display: block;font-size: 15px;color: #505050;font-weight: normal;}
                .newbloglist li a h3{color: #444444;font-size: 15px;line-height: 22px; display: -webkit-box; -webkit-line-clamp: 2;	-webkit-box-orient: vertical; overflow: hidden; height:44px;}
                .newbloglist li a p{background: #ED2129 0% 0% no-repeat padding-box;box-shadow: 0px 3px 8px #90a4b73d;border: 1px solid #FFFFFF;border-radius: 15px;display: table;margin: auto;margin-top: 12px;padding: 3px 15px;}
                .newbloglist li a p em{font-style: normal;    filter: brightness(0) invert(1);}
				.blogListWrapper h2 { width: auto;}               
            `}</style>
        </>
    );
};

export default memo(BlogList);
