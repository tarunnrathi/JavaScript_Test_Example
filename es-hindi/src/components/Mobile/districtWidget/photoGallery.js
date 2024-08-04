import React, { useEffect, useState } from "react";
import LazyImage from "components/Common/LazyImage";
import { imageLoader, setDefaultImage } from "includes/article.util";
import Skeleton from "components/Common/CustomSkeleton";
import OptionTab from "components/Common/OptionTab";
import { getArticlesByPriorityData } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";
import Glide from "@glidejs/glide";

const PhotogalleryNews = ({ data, aurPadheLink }) => {
  if(data.length === 0) {
      return null;
  }

  useEffect(() => {
    document.querySelector('.nwphoto-slide-in') && new Glide(document.querySelector('.nwphoto-slide-in'),{
      autoplay:false,
      type:'carousel',
      perView:1.5,
      focusAt: 'center',
      gap:15,
      slidesToScroll:1,
      }).mount();
  }, []);
  return (
    <>
    <div className="lcheading">
					<h2 className="lcchild">
						<svg xmlns="http://www.w3.org/2000/svg" width="18.607" height="12.378" viewBox="0 0 18.607 12.378">
						  <g id="Group_2178" data-name="Group 2178" transform="translate(-338 -461.622)">
							<path id="Path_20627" data-name="Path 20627" d="M6.607,2.622h5L5,15H0Z" transform="translate(338 459)" fill="#fc0f00"/>
							<path id="Path_20628" data-name="Path 20628" d="M6.607,2.622h5L5,15H0Z" transform="translate(345 459)" fill="#fc0f00"/>
						  </g>
						</svg>
						फोटो
					</h2>
				</div>
        <div className="nwphoto-slide">

        <div className="nwphoto-slide-in"> 
          <div data-glide-el="track">

				<ul>
                    {data.map((eachPhoto, index) => {
                        const Width = 269;
                        const Height = 179;
                        const title = eachPhoto?.display_headline || eachPhoto?.headline;
                        return (
                            <li key={`pghg-${index}`}>
                                <a href={getCompleteURL(eachPhoto?.weburl_r, eachPhoto?.weburl)}>
                                    <figure>
                                    <LazyImage
                                        width={Width}
                                        height={Height}
                                        src={imageLoader(eachPhoto?.images?.url, Width, Height)}
                                        alt={title}
                                        title={title}
                                        isRes={true}
                                        unoptimized={true}
                                        filterOut={true}
                                        onError={setDefaultImage}
                                    />
                                    </figure>
                                    <figcaption>
                                        <div>
                                            <span>
                                                <img src="/images/districts/newphotoicon.png" alt=""/>{`+${eachPhoto.gallery_count}`} Photos</span><span>{eachPhoto?.categories.length > 0
                                            ? eachPhoto.categories[0]?.name.replace("&amp;", "&")
                                            : "News"}
                                            </span>
                                        </div>
                                        <section>{title ? title.slice(0, 80) : title ? title : title ? title.slice(0, 80) : eachPhoto.intro ? eachPhoto.intro.slice(0, 80) : '' }</section>
                                    </figcaption>
                                    </a>
                            </li>
                        )
                    })}
				</ul>
        </div>

          <div data-glide-el="controls[nav]" className="trndstorynewbullet">
            <button type="button" data-glide-dir="=0"></button>
            <button type="button" data-glide-dir="=1"></button>
            <button type="button" data-glide-dir="=2"></button>
            <button type="button" data-glide-dir="=3"></button>
            <button type="button" data-glide-dir="=4"></button>
            <button type="button" data-glide-dir="=5"></button>
            <button type="button" data-glide-dir="=6"></button>
          </div>
        </div>
        <a href={aurPadheLink} className="moretrndstroy">और भी पढ़ें</a>
        </div>
				

      <style jsx global>{`
        .trndstorynewbullet{display: flex; gap:10px; justify-content: center; margin-top: 5px;}
        .trndstorynewbullet button{width: 20px;height: 4px;background: #D6D6D6;border-radius: 3px; display: block;}
        .trndstorynewbullet button.glide__bullet--active{background: #ED1C24;}
        
        .nwphoto-slide{position: relative;padding-bottom: 10px;}
        .nwphoto-slide-in{overflow: hidden; position: relative; z-index: 3;}
        .nwphoto-slide-in ul{display: flex; margin-bottom: 10px; padding: 10px 0;}
        .nwphoto-slide-in ul li {position: relative;background: #FFFFFF;box-shadow: 0px 3px 6px #00000029;border-radius: 4px;border: 1px solid #D6D6D6;}
        .nwphoto-slide-in ul li a figure{width: 100%;}
        .nwphoto-slide-in ul li a figure img{width: 100%; border-radius: 4px 4px 0 0;}
        .nwphoto-slide-in ul li a figcaption{padding: 5px 10px 10px 10px;}
        .nwphoto-slide-in ul li a figcaption section{color: #000;font-weight:600;line-height: 22px;font-size: 15px;display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;}
        .nwphoto-slide-in ul li a figcaption div{margin-bottom: 5px;}
        .nwphoto-slide-in ul li a figcaption div span{color: #EC2028; font-size: 13px; line-height: 16px; display: inline-block;margin-right: 10px;}
        .nwphoto-slide-in li a figcaption div span:last-child:before{content: "";width: 4px;height: 4px;background: #A5A5A5;display: inline-block;position: relative;margin-right: 10px;top: -3px;border-radius: 100%;}
        .nwphoto-slide-in li a figcaption div span img{vertical-align: sub; display: inline-block; margin-right: 5px; }
        .newpwhitebgbtn {margin: 10px 10px 0 10px;}  
      `}</style>
    </>
  );
};

export default PhotogalleryNews;
