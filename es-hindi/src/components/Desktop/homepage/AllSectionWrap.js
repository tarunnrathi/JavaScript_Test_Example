import React, { useEffect, useState } from "react";
import fetchUtility from "includes/sFetchUtility";
import Skeleton from "components/Common/CustomSkeleton";
import { getArticleListAPIUrl } from "api/individual/Home";
import { getRedisDataWithKey } from "api/global/Common";
import dynamic from "next/dynamic";

const ImageWithListRHS = dynamic(() =>
  import("components/Desktop/homepage/ImageWithListRHS")
);

const HomeAllSectionWrapNews = () => {
  const [allSectionWrapNews, setAllSectionWrapNews] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allSectionWrapNewsData, setAllSectionWrapNewsData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    let [allSectionWrap = {}, cats = {}] = await Promise.all([
      getRedisDataWithKey("KHABARN18:SECTION_PRIORITY", false, true),
      getRedisDataWithKey("KHABAR:CATEGORIES", false, true),
    ]);

    allSectionWrap = allSectionWrap.filter((item) => {
      return item.parent == 0;
    });

    if (allSectionWrap && Object.keys(allSectionWrap).length > 0) {
      setCategories(cats);
      const apiUrls = [
        ...Object.keys(allSectionWrap).map((e) => getArticleListAPIUrl(6, allSectionWrap[e]["slug"], true)),
      ];

      await Promise.all([...apiUrls.map((e) => fetchUtility(e, []))])
        .then((eachData) => {
          setAllSectionWrapNewsData(eachData);
          setAllSectionWrapNews([
            ...Object.keys(allSectionWrap).map((eachSection, i) => {
              return {
                ...allSectionWrap[eachSection],
                data: eachData[i] && eachData[i].length ? [...eachData[i]] : [],
              };
            }),
          ]);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="allsectionwarp container ">
        {!isLoading && allSectionWrapNews && allSectionWrapNews.length && allSectionWrapNewsData && allSectionWrapNewsData.length ?
          allSectionWrapNews.map((eachData, dataIndex) => {
            const { data } = eachData;
            let url = `/news/${eachData['slug']}/`, name = '';

            if(Object.keys(categories).length > 0) {
              Object.keys(categories).map((c) => {
                if(eachData['parent'] != 0 && eachData['parent'] == categories[c]['id']) {
                  url = `/news/${c}/${eachData['slug']}/`;
                  name = `${categories[c]['name']}`;
                } else if(eachData['parent'] == 0 && eachData['id'] == categories[c]['id']) {
                  name = `${categories[c]['name']}`;
                }
              });
            }
            return data && data.length > 0 && dataIndex < 8 && (
              <div className="section-box">
                <ImageWithListRHS
                  heading={name}
                  category={eachData['slug']}
                  categoryLink={url}
                  data={data}
                  key={dataIndex}
                  count={4}
                />
               </div>
            );
          })
        : (
				  <div className="skeleton-background allsection-news-skeleton">
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
            <ul className="skeletonContainer">
              <li><Skeleton height={198}/><Skeleton count={2} height={25}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li><li><Skeleton height={55}/></li>
            </ul>
          </div>
        )}
      </div>

      <style jsx global>{`
      .skeletonContainer {
        width: 24% !important;
        
      }
      .skeletonContainer li {
        width: 100% !important;
      }
        .allsection-news-skeleton {
          width: 100%;
          display : flex;
          flex-wrap: wrap;
          justify-content : space-between
        }
        .allsection-news-skeleton ul {
          width : 24%;
        }
        .allsection-news-skeleton ul li{
          margin : 5px 0;
        }
        .allsection-news-loader {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1156px;
          background-color: rgba(0,0,0,0.05);
          margin-top: 20px;
          border-radius: 10px;
        }
        .container {
          width: 100%;
          position: relative;
          margin: 0 auto;
        }
        .flex-wrap {
          flex-wrap: wrap;
        }
        .justify-space-betwwen {
          justify-content: space-between;
        }
        .dflex {
          display: flex;
        }
        .container {
          margin: auto;
          max-width: 1244px;
          position: relative;
          padding: 0 !important;
        }
        .section-box {
          padding-bottom: 40px;
          margin-bottom: 30px;
          position: relative;
          float: left;
          display: grid;
          width: 23% !important;
          margin: 1%;
          min-height: 582px;
        }
        .globalhd {
          border-bottom: 1px solid #001536;
          padding-bottom: 4px;
          position: relative;
        }
        .globalhd.large h2 {
          font-size: 18px;
          line-height: 28px;
        }
        .globalhd h2 {
          color: #111;
          font-size: 16px;
          font-weight: 700;
          line-height: 28px;
          flex-shrink: 0;
          margin-right: 20px;
          text-transform: uppercase;
        }
        .globalhd h2 a {
          color: #001536;
        }
        .globalhd:after {
          content: "";
          width: 25px;
          height: 4px;
          position: absolute;
          bottom: -2px;
          left: 0;
          background: #ed1c24;
        }
        .section-box-story {
          margin-top: 15px;
        }
        .section-box-story li:first-child {
          font-size: 18px;
          line-height: 1.45;
          font-weight: 700;
          padding-top: 0;
        }
        .section-box-story li {
          font-size: 17px;
          line-height: 1.45;
          color: #111;
          border-bottom: 1px dashed #ccc;
          padding: 10px 0;
        }
        .section-box-story li:first-child a {
          height: 260px;
        }
        .section-box-story li a {
          color: #111;
          display: block;
          height: 42px;
          overflow: hidden;
        }
        .section-box-story li figure {
          width: 100%;
          line-height: 0;
          margin-bottom: 12px;
        }
        .section-box-story li figure img {
          width: 100%;
        }
        .section-box-story li:first-child h3 {
          font-weight: 700;
          line-height: 26px;
        }
        .section-box-story li h3 {
          font-size: 17px;
          font-weight: normal;
        }
        .clearfix {
          clear: both;
        }
        .vsp15 {
          margin-top: 15px;
        }
        .clearfix:after, .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .aurbhi-button.smal {
          font-size: 12px;
        }
        .allsectionwarp .aurbhi-button {
          color: #001536;
          font-size: 14px;
          font-weight: 700;
          position: relative;
          float: right;
          padding-right: 5px;
          position: absolute !important;
          bottom: 0;
          right: 0;
        }
        .aurbhi-button.smal span {
          top: 3px;
        }
        .aurbhi-button span::before {
          left: 4px;
        }
        .aurbhi-button span::after, .aurbhi-button span::before {
          content: "";
          position: absolute;
          top: 7px;
          width: 4px;
          height: 4px;
          border-top: 1px solid #fff;
          border-right: 1px solid #fff;
          display: block;
          transform: rotate(45deg);
        }
        .aurbhi-button span::after {
          left: 8px;
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
        .section-box .section-box-story li a:hover {
          color: #ed1c24 !important;
        }
        .allsectionwarp.container {
          grid-template-columns: 299px 299px 299px 299px;
          -webkit-column-gap: 19px;
          column-gap: 19px;
          row-gap: 20px;
      }
      .newbottomsectionlist li a figure img {
        height: 100% !important;
    }
      `}</style>
    </>
  );
};

export default HomeAllSectionWrapNews;
9083215770