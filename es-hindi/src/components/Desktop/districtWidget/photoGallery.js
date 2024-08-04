import React, { useState } from "react";
import LazyImage from "components/Common/LazyImage";
import { imageLoader, setDefaultImage } from "includes/article.util";
import Skeleton from "components/Common/CustomSkeleton";
import OptionTab from "components/Common/OptionTab";
import { getArticlesByPriorityData } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";

const PhotogalleryNews = ({ data, aurPadheLink }) => {
  if(data.length === 0) {
      return null;
  }
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
				<ul className="newphotoslist">
                    {data.map((eachPhoto, index) => {
                        const Width = index < 2 ? 371 : index === 2 ? 558 : index > 2 ? 185 : 0;
                        const Height = index < 2 ? 248 : index === 2 ? 372 : index > 2 ? 123 : 0;
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
                                        <p>{ index > 2 && title ? title.slice(0, 80) : title ? title : title ? title.slice(0, 80) : eachPhoto.intro ? eachPhoto.intro.slice(0, 80) : '' }</p> 
                                    </figcaption>
                                    </a>
                            </li>
                        )
                    })}
				</ul>
				<div className="mrst"><a href={aurPadheLink} className="moretrndstroy">और भी पढ़ें</a></div>
      {/* <div className="clearfix vsp60" />
      <OptionTab
        head={photogalleryObj['value']}
        url={photogalleryObj['more-url']}
        options={[...photogalleryObj['sub-list'].map((eachOption) => { return { 'title': eachOption.value };})]}
        updateState={onOptionClick}
        component={photogalleryObj['key']}
      />

      {!isLoading && (photogalleryNews && photogalleryNews.length > 0) ? (
			  <ul className="superhitgalley photogallerystories">
          {photogalleryNews.map((eachPhoto, index) => {

            const Width = index < 2 ? 371 : index == 2 ? 558 : index > 2 ? 185 : 0;
            const Height = index < 2 ? 248 : index == 2 ? 372 : index > 2 ? 123 : 0;
            const title = eachPhoto?.display_headline || eachPhoto?.headline;
            return (
              index < 6 ?
                <li key={`homePagePhogalleryList-`+index}>
                  <a href={getCompleteURL(eachPhoto?.weburl_r, eachPhoto?.weburl)}>
                    <figure>
                      <span className="photoicon"></span>
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
                      <figcaption>
                        <p></p>
                      </figcaption>
                    </figure>
                  </a>
                </li>
              : ''
            );
          })}
        </ul>
      ) : (
				<div className="skeleton-background photogallery-news-skeleton">
          <ul className="superhitgalley photogallerystories">
            <li>
              <Skeleton height={232}/>
            </li>
            <li>
              <Skeleton height={232}/>
            </li>
            <li>
              <Skeleton height={352}/>
            </li>
            <li>
              <Skeleton height={115}/>
            </li>
            <li>
              <Skeleton height={115}/>
            </li>
            <li>
              <Skeleton height={115}/>
            </li>
          </ul>
        </div>
      )} */}

      <style jsx global>{`
        .newphotoslist{display: grid;grid-template-columns: repeat(5,1fr);grid-gap: 10px;}
        .newphotoslist li {position: relative;background: #FFFFFF;box-shadow: 0px 3px 6px #00000029;border-radius: 4px; overflow: hidden;}
        .newphotoslist li a figure{width: 100%;}
        .newphotoslist li a figure img{width: 100%; border-radius: 4px 4px 0 0;}
        .newphotoslist li a figcaption{padding:5px 10px 10px 10px;}
        .newphotoslist li a figcaption p{color: #000; font-weight: 600;line-height: 22px;font-size: 15px;height: 42px;overflow: hidden;display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
        .newphotoslist li a figcaption div{margin-bottom: 5px;}
        .newphotoslist li a figcaption div span{color: #EC2028; font-size: 13px; line-height: 16px;    display: inline-block;
        margin-right: 10px;}
        .newphotoslist li a figcaption div span:last-child:before{content: "";
        width: 4px;height: 4px;background: #A5A5A5;display: inline-block;position: relative;margin-right: 10px;top: -3px;border-radius: 100%;}
        .newphotoslist li a figcaption div span img{vertical-align: sub; display: inline-block; margin-right: 5px; }
        .newphotoslist li:first-child {grid-column: 1/3;grid-row: 1/3; width: 306px}
        .newphotoslist li:nth-child(2) {grid-column: 1/3;grid-row: 3/5;width: 306px}
        .newphotoslist li:nth-child(3) {grid-column: 3/6;grid-row: 1/4; width: 605px;box-shadow: none;}
        .newphotoslist li:nth-child(3) a figcaption{position: absolute;bottom: 0;left: 0;
            right: 0;margin: 5px;background: #FFFFFF 0% 0% no-repeat padding-box;box-shadow: 0px 3px 6px #00000029;border-radius: 4px;}
        .newphotoslist li:nth-child(3) a figcaption p{line-height: 26px;  font-weight: 600;font-size: 18px;height: auto;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical;overflow: hidden;}
        .newphotoslist li:nth-child(4) {grid-column: 3/4;grid-row: 4/5;}
        .newphotoslist li:nth-child(5) {grid-column: 4/5;grid-row: 4/5;}
        .mrst{background: #F6F7F7;padding: 5px 0 0 0;margin: 12px 0 30px;}    
      `}</style>
    </>
  );
};

export default PhotogalleryNews;
