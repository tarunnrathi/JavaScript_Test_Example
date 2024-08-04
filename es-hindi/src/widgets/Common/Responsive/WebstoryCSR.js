import { memo, useEffect, useState } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";
import LazyLoadImage from "components/Common/CustomImage";
import { getWebStories } from "api/global/Common";
import Heading from "components/Desktop/common/Heading";
import ReadMoreBtn from "components/Desktop/common/ReadMoreBtn";
import ReadMore from "components/Mobile/common/ReadMore";

const WebStory = ({
	isMobile = false,
	isAmp = false,
    section = "",
    filter = {}
}) => {
    const [webStories, setWebStories] = useState([]);
	useEffect(() => {
        getWebStories({
            count: 10,
            fields: 'blog_title,web_url_r,web_url,feature_img,categories',
            filter: { categories : section }
        }, true).then(res => {
            setWebStories(res);
        })
    }, []);
    useEffect(() => {

		if (document.getElementsByClassName('webseries-slide-in').length) {
			new Glide(document.querySelector(`.webseries-slide-in`), {
				autoplay: false,
				type: 'carousel',
				perView: isMobile ? 1.8 :5,
				gap: 10,
				slidesToScroll: 1,
			}).mount();
		}
	}, [webStories]);

    if(webStories.length === 0 ) {
        return null;
    }
	return (
		<>
			<div className="newglblhdwrap">
				<Heading
                    categoryLink={publicRuntimeConfig.siteUrl+'web-stories/' + section +"/"}
                    heading={`वेब स्टोरीज`}
                />
                {!isMobile && <ReadMoreBtn
                    link={publicRuntimeConfig.siteUrl+'web-stories/'+section +"/" }
                    label={`और भी पढ़ें`}
                />}
			</div>

			<div className="webseries-slide">
				<div className="webseries-slide-in">
					<div data-glide-el="track">
						<ul>
							{
								webStories && webStories.length > 0 && webStories.map((item, index) => {
									const width = 180;
									const height = 252;
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
												<h3>{blog_title}</h3>
											</a>
										</li>
									);
								})
							}

						</ul>
					</div>

					<div className="trndstorynewarw" data-glide-el="controls">
						<button key={"btn1"} data-glide-dir="<"></button>
						<button key={"btn2"} data-glide-dir=">"></button>
					</div>

					<div data-glide-el="controls[nav]" className="trndstorynewbullet">
						{
							webStories.map((item, index) => (
								<button key={item?.story_id || index} type="button" data-glide-dir={`=${index}`}></button>
							))
						}
					</div>

                    {isMobile && <ReadMore
                    categoryLink={publicRuntimeConfig.siteUrl + "web-stories/" + section + "/"}
                    heading={`और भी पढ़ें`}
                    buttonType={false}
                    />}
				</div>
			</div>

			<style jsx global>{`
                .webseries-slide {
					position: relative;
					background: #F5F5F5;
					padding-top: 15px;
				  }
				  .webseries-slide .moretrndstroy {
					color: #fff !important;
				  }
                  .newglblhdwrap {
                    margin-top: 35px;
                  }
				  .webseries-slide-in {
					overflow: hidden;
					margin: 0 10px;
				  }
			
				  .webseries-slide-in ul {
					display: flex;
					margin-bottom: 30px;
				  }
			
				  .webseries-slide-in ul li {
					background: #FFFFFF;
					box-shadow: 0px 0px 4px #0000001A;
					border: 1px solid #DBDBDB;
					border-radius: 4px;
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
					border-radius: 4px 4px 0 0;
				  }
			
				  .webseries-slide-in ul li a h3 {
					padding: 5px 10px 20px 10px;
					color: #000000;
					font-size: 15px;
					line-height: 22px;
				  }
			
				  .webseries-slide button {
					top: 50%;
					left: 0;
					margin-top: -16px;
					border: none;
					cursor: pointer;
				  }
			
				  .webseries-slide button:last-child {
					right: 0;
				  }

				  .trndstorynewarw button {
					position: absolute;
					width: 25px;
					height: 32px;
					background: #FF0000;
					left: 0px;
					border-radius: 0px 4px 4px 0px;
				  }

				  .trndstorynewarw button:last-child {
					right: 0px;
					left: auto;
					transform: rotate(180deg);
				  }
		  
				  .trndstorynewarw button:after,
				  .trndstorynewarw button:before {
					content: "";
					position: absolute;
					width: 5px;
					height: 5px;
					border-top: 1px solid #fff;
					border-left: 1px solid #fff;
					transform: rotate(-45deg);
					top: 13px;
				  }
		  
				  .trndstorynewarw button:after {
					left: 8px
				  }
				  .trndstorynewarw button {
					border: none;
				  }
				  .trndstorynewbullet {
					display: flex;
					gap: 10px;
					justify-content: center;
					margin-top: 5px;
				  }
		  
				  .trndstorynewbullet button {
					width: 20px;
					height: 4px;
					background: #D6D6D6;
					border-radius: 3px;
					display: block;
				  }
		  
				  .trndstorynewbullet button.glide__bullet--active {
					background: #ED1C24;
				  }
				         
            `}</style>
		</>
	);
};

export default memo(WebStory);
