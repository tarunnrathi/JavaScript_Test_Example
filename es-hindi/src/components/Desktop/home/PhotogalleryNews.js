import React, { useState } from "react";
import LazyImage from "components/Common/LazyImage";
import { imageLoader, setDefaultImage } from "includes/article.util";
import Skeleton from "components/Common/CustomSkeleton";
import OptionTab from "components/Common/OptionTab";
import { getArticlesByPriorityData } from "api/individual/Home";
import { getCompleteURL } from "util/global/Helper";

const HomePhotogalleryNews = ({ data }) => {

  const [photogalleryNews, setPhotogellaryNews] = useState(data);
  const [isLoading, setLoading] = useState(false);
  const [activeTabUrl, setActiveTabUrl] = useState('/news/business/');

  const photogalleryObj = {
    "key": "photogallery",
    "value": "फोटो",
    "colorClass": "bgclr-photos",
    "template": "four",
    "subCatDisplay": "1",
    'more-url': '/photogallery/',
    'sub-list': [
      {
        'key': 'photogallery',
        'value': 'सभी',
        'more-url': '/photogallery/'
      },
      {
        'key': 'photogallery__entertainment',
        'value': 'मनोरंजन',
        'more-url': '/photogallery/manoranjan/'
      },
      {
        'key': 'photogallery__cricket',
        'value': 'क्रिकेट',
        'more-url': '/photogallery/sports/cricket/'
      },
      {
        'key': 'photogallery__tech',
        'value': 'मोबाइल-टेक',
        'more-url': '/photogallery/tech/'
      },
      {
        'key': 'photogallery__auto',
        'value': 'ऑटो',
        'more-url': '/photogallery/auto/'
      },
      {
        'key': 'photogallery__lifestyle',
        'value': 'लाइफ़',
        'more-url': '/photogallery/lifestyle/'
      }
    ]
  };

  const getData = async (cat) => {
    setLoading(true);
    const photogalleryData = await getArticlesByPriorityData({ count: 6, subSection: cat, filter: { 'post_type': 'photogallery' } }, true);

    if(photogalleryData && photogalleryData.length) {
      setPhotogellaryNews(photogalleryData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const onOptionClick = (title) => {
    const dataArray = [...photogalleryObj['sub-list']];

    dataArray.map((eachData) => {
      if(eachData.value == title && activeTabUrl !== eachData["more-url"]) {
        getData(eachData.key);
        setActiveTabUrl(eachData["more-url"]);
      }
    });
  };

  return (
    <>
      <div className="clearfix vsp60" />
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
                        <h3>{ index > 2 && title ? title.slice(0, 80) : title ? title : title ? title.slice(0, 80) : eachPhoto.intro ? eachPhoto.intro.slice(0, 80) : '' }</h3>
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
      )}

      <style jsx global>{`
        .photography-news-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 480px;
          background-color: rgba(0,0,0,0.05);
          margin-top: 20px;
          border-radius: 10px;
        }
        .clearfix {
          clear: both;
        }
        .vsp30 {
          margin-top: 60px;
        }
        .clearfix:after, .clearfix:before {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .superhitgalley {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(5,1fr);
          grid-gap: 1px;
        }
        .superhitgalley li {
          position: relative;
        }
        .superhitgalley li:first-child {
          grid-column: 1/3;
          grid-row: 1/3;
        }
        .superhitgalley li:nth-child(2) h3 {
          font-size: 20px;
          font-weight: normal;
        }
        .superhitgalley li a figure {
          width: 100%;
        }
        .photoicon {
          width: 32px;
          height: 32px;
          background: rgba(0,0,0,.7);
          position: absolute;
          z-index: 1;
          top: 10px;
          right: 10px;
          border: 2px solid #fff;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .photoicon:before {
          content: "";
          background: url(https://images.news18.com/ibnkhabar/uploads/2019/09/news18hindi-sprite.png) -102px 0 no-repeat;
          width: 17px;
          height: 17px;
        }
        .superhitgalley li:first-child a figure figcaption, .superhitgalley li:nth-child(2) a figure figcaption {
          padding: 30px 15px 10px 15px;
          font-size: 20px;
          line-height: 1.45;
        }
        .superhitgalley li a figure figcaption {
          position: absolute;
          bottom: 0;
          font-size: 16px;
          line-height: 1.45;
          color: #fff;
          left: 0;
          right: 0;
          padding: 20px 10px 10px 10px;
          background: linear-gradient(transparent,#000);
        }
        .superhitgalley li:first-child h3 {
          font-size: 20px;
          font-weight: normal;
        }
        .superhitgalley li a figure figcaption h3 {
          font-size: 16px;
          font-weight: normal;
        }
        .superhitgalley li:nth-child(3) {
          grid-column: 3/6;
          grid-row: 1/4;
        }
        .superhitgalley li:nth-child(3) a figure figcaption {
          padding: 10px 20px;
          font-size: 22px;
          line-height: 1.45;
          background: rgba(0,0,0,.8);
        }
        .superhitgalley li a figure figcaption {
          position: absolute;
          bottom: 0;
          font-size: 16px;
          line-height: 1.45;
          color: #fff;
          left: 0;
          right: 0;
          padding: 20px 10px 10px 10px;
          background: linear-gradient(transparent,#000);
        }
        .superhitgalley li:nth-child(3) a figure figcaption h3 {
          font-size: 22px;
        }
        .superhitgalley li:nth-child(2) {
          grid-column: 1/3;
          grid-row: 3/5;
        }
        .superhitgalley li:nth-child(4) {
          grid-column: 3/4;
          grid-row: 4/5;
        }
        .superhitgalley li:nth-child(5) {
          grid-column: 4/5;
          grid-row: 4/5;
        }
        .superhitgalley li:nth-child(4) .photoicon, .superhitgalley li:nth-child(5) .photoicon, .superhitgalley li:nth-child(6) .photoicon {
          transform: scale(.8);
          top: 5px;
          right: 5px;
        }
        
      `}</style>
    </>
  );
};

export default HomePhotogalleryNews;
