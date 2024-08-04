import React, { useState } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/LazyLoadImage";
import { getArticleList } from "api/global/Common";

const SeriesMediaListingMobile = ({ pageContent, paginationData, pageAds = {}, contentType = "text", isPhotoPage = false, isVideoPage = false }) => {
  const { pageLimit, topicName } = paginationData;
  const [catPageLimit, setCatPageLimit] = useState(pageLimit);

  const [newsData, setNewsData] = useState(pageContent || []);

  const [hasMoreData, setHasMoreData] = useState(newsData.length >= pageLimit);

  const loadNews = async() => {
      const newsData = await getArticleList({ count: pageLimit, offset: catPageLimit, filter: { post_type: contentType, 'tags.slug': topicName }, fields: 'display_headline,weburl_r,images' }, true) || [];
      setNewsData((prev) => [...prev, ...newsData]);
      const isData = newsData.length >= pageLimit;
      setHasMoreData(isData);
      setCatPageLimit((prev) => prev + pageLimit);
  };

  return (
    <>
      <div>
        {newsData && newsData.length ? (
          newsData.map((news, index) => {
            const newsArticleUrl = news?.weburl_r || "";
            const newsArticleHeadling = news.display_headline ? news.display_headline : news?.headline;
            return (
              <>
                <div className={`article__wrapper`} key={`map_${index}`}>
                  <div><a href={newsArticleUrl} className="article__heading">{newsArticleHeadling}</a></div>
                  <div className="article__img--wrapper">
                    <a href={newsArticleUrl}>
                      {isPhotoPage && <span className="thumbnail__icon"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Photo-Icon.svg" alt="" title="" /></span>}
                      {isVideoPage && <span className="thumbnail__icon"><img src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/play-icon1.svg" alt="" title="" /></span>}
                      <LazyLoadImage
                        width="100%"
                        src={news?.images?.url}
                        alt={newsArticleHeadling}
                        title={newsArticleHeadling}
                      />
                    </a>
                  </div>
                </div>
                {index === 3 && (
                  <div className="clearfix add">
                    <div className="addinner-box addinner_box_300x250">
                      <SiteAd
                        width={300}
                        height={280}
                        slotId={"mobileAdNew300x250_1"}
                        adUnit={pageAds?.ATF_300}
                        lazyload={true}
                        sizes={[[300, 250], [336, 280]]}
                      ></SiteAd>
                    </div>
                  </div>
                )}
              </>
            );
          })
        ) : (
          <p className="noContentFound"> No stories found matching this criteria </p>
        )}
      </div>
      {newsData?.length > 0 && hasMoreData && (
        <button onClick={() => loadNews()} className="load_more clearfix"> और पढ़ें </button>
      )}
      <style jsx global>
        {`
          .article__wrapper {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            padding: 10px 10px 0;
            margin-bottom: 30px;
          }

          .article__wrapper:before {
            content: "";
            position: absolute;
            width: 40px;
            background: #e1261c;
            height: 6px;
            top: 0;
            left: 0;
          }
          
          .article__heading {
            margin-bottom: 5px;
            display: block;
            font-size: 16px;
            line-height: 22px;
            color: #fff;
          }

          .article__img--wrapper {
            position: relative;
          }

          .article__img--wrapper a {
            display: block;
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid #707070;
          }

           .article__img--wrapper a img {
            display: block;
            width: 100%;
          }

          .thumbnail__icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
          }

          .noContentFound { 
            text-align: center;
            color: #fff 
          }

        `}
      </style>
    </>
  );
};

export default SeriesMediaListingMobile;
