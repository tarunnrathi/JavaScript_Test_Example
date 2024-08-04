import React, { useEffect, useState } from "react";
import LazyLoadImage from "components/Common/CustomImage";
import Skeleton from "components/Common/CustomSkeleton";
import { getArticlesByPriorityData } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";
import ReadMore from "components/Desktop/common/ReadMore";
import getConfig from "next/config";
import { TEXT } from "constant/global/Constant";
import Heading from "../common/Heading";
import ArticleListTopNav from "./ArticleListTopNav";
import { SUBCATEGORYS } from "api/Constant";

const { publicRuntimeConfig } = getConfig();

const HomePhotogalleryNews = ({ data, categoryLink, category }) => {

  const [photogalleryNews, setPhotogellaryNews] = useState(data);
  const [isLoading, setLoading] = useState(false);
  const [active, setActive] = useState('photogallery');
  const [subCategory, setSubCategory] = useState([]);

  const getData = async (cat) => {
    setLoading(true);
    setActive(cat);
    let categorySlug = '';
    let subSection = 'photogallery';
    let section = "home";
    if(cat !== 'photogallery') {
      categorySlug = { 'post_type': 'photogallery', 'categories.slug': cat }
      subSection = cat;
      section = "photogallery";
    } else {
      categorySlug = { 'post_type': 'photogallery' }      
    }
    const photogalleryData = await getArticlesByPriorityData({ count: 6, section: section, subSection: subSection, filter: categorySlug }, true);

    if (photogalleryData && photogalleryData.length) {
      setPhotogellaryNews(photogalleryData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getSubMenus = async(category) => {
    const result = SUBCATEGORYS[category];
    if(result?.children && result?.children.length > 0) {
        setSubCategory(result?.children);
    }
  };

  useEffect(() => {    
      getSubMenus(category)    
  }, []);

  return (
    <>
        <div className="clearfix vsp60" />      
      
        <div className="newglblhdwrap">
              <Heading
                  categoryLink={categoryLink}
                  heading={`फोटो`}
              />
              {subCategory && subCategory.length > 0 && (
                  <ArticleListTopNav
                      topMenu = {subCategory?.length > 0 && subCategory}
                      filterDataByCategory={getData}
                      active={active}
                  />
              )}
        </div>


      {!isLoading && (photogalleryNews && photogalleryNews.length > 0) ? (
        <>
        <ul className="newphotoslist">
          {photogalleryNews.map((eachPhoto, index) => {
            const Width = index < 2 ? 371 : index == 2 ? 558 : index > 2 ? 185 : 0;
            const Height = index < 2 ? 248 : index == 2 ? 372 : index > 2 ? 123 : 0;
            const title = eachPhoto?.display_headline || eachPhoto?.headline;
            return (
              <li key={`homePagePhogalleryList-`+index}>
                  <a href={getCompleteURL(eachPhoto?.weburl_r, eachPhoto?.weburl)}>
                    <figure width={Width} height={Height}>
                      <LazyLoadImage
                          src={eachPhoto?.images?.url}
                          width={Width}
                          className={`photochild-${index}`}
                          height={Height}
                          alt={title}
                          title={title}
                      />
                    </figure>
                    <figcaption>
                        <div><span><img src="/images/siteimages/newphotoicon_1669352291.png" alt="" />+{eachPhoto?.gallery_count} Photos</span></div>
                        <h3>{ index > 2 && title ? title.slice(0, 80) : title ? title : title ? title.slice(0, 80) : eachPhoto.intro ? eachPhoto.intro.slice(0, 80) : '' }</h3>
                      </figcaption>
                  </a>
                </li>
            );
          })}
        </ul>
        <div className="newpradeshbtn">
            <ReadMore
                link={publicRuntimeConfig.siteUrl+'photogallery/'}
                label={TEXT.READ_MORE}
            />
        </div>
        </>
      ) : (
        <Skeleton height={675} />
      )}

      <style jsx>{`
        .newphotoslist{display: grid;grid-template-columns: repeat(5,1fr);grid-gap: 10px; margin-top:7px;}
        .newphotoslist li {position: relative;background: #FFFFFF;box-shadow: 0px 3px 6px #00000029;border-radius: 4px; overflow: hidden;}
        .newphotoslist li a figure{width: 100%;}
        .newphotoslist li a figure img{width: 100%; border-radius: 4px 4px 0 0;}
        .newphotoslist li a figcaption{padding:5px 10px 10px 10px;}
        .newphotoslist li a figcaption h3{color: #000;line-height: 22px;font-size: 15px;height: 42px;overflow: hidden;}
        .newphotoslist li a figcaption div{margin-bottom: 5px;}
        .newphotoslist li a figcaption div span{color: #EC2028; font-size: 11.5px; line-height: 16px; display: inline-block; margin-right: 10px; text-transform: lowercase;}
        // .newphotoslist li a figcaption div span:last-child:before{content: "";width: 4px;height: 4px;background: #A5A5A5;display: inline-block;position: relative;margin-right: 10px;top: -3px;border-radius: 100%;}
        .newphotoslist li a figcaption div span img{vertical-align: sub; display: inline-block; margin-right: 5px; width: auto}
        .newphotoslist li:first-child {grid-column: 1/3;grid-row: 1/3; width: 306px; min-height: 204px;}
        .newphotoslist li:nth-child(2) {grid-column: 1/3;grid-row: 3/5;width: 306px; min-height: 204px;}
        .newphotoslist li:nth-child(3) {grid-column: 3/6;grid-row: 1/4; width: 605px;box-shadow: none;}
        .newphotoslist li:nth-child(3) a figcaption{position: absolute;bottom: 0;left: 0;right: 0;margin: 5px 5px 10px 5px;background: #FFFFFF 0% 0% no-repeat padding-box;box-shadow: 0px 3px 6px #00000029;border-radius: 4px;}
        .newphotoslist li:nth-child(3) a figcaption h3{line-height: 26px; font-size: 18px;height: auto;}
        .newphotoslist li:nth-child(4) {grid-column: 3/4;grid-row: 4/5;}
        .newphotoslist li:nth-child(5) {grid-column: 4/5;grid-row: 4/5;}
        .globalhd {border-bottom: 1px solid #d9d9d9;}
        .newpradeshbtn{background: #F6F7F7;padding: 5px 0 0 0;margin-top: 12px;} 
        .newphotoslist li figure figure {
          min-height: auto;
          background-color: #ddd;
          font-size: 0;
          }
         .newphotoslist li:first-child figure figure, .newphotoslist li:nth-child(2) figure figure {
          height: 248px;
        }
        .newphotoslist li:nth-child(3) figure figure {height: 372px;}
        .newphotoslist li:nth-child(4) figure figure, .newphotoslist li:nth-child(5) figure figure, .newphotoslist li:nth-child(6) figure figure {height: 123px;}

        .newphotoslist li:nth-child(3) a figure {
          height: 100%;
          }
          
        
      `}</style>
    </>
  );
};

export default HomePhotogalleryNews;
