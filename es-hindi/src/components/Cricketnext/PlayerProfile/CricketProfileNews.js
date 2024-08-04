import React, { useState } from "react";
import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "../CricketNextUtils";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { getArticleList } from "api/global/Common";

const CricketProfileNews = ({ pageContent, paginationData, pageAds = {}, isMobile = false, isProfilePage = false, contentType = 'text', isPhotoPage = false, isVideoPage = false }) => {
  const pageProfileData = isProfilePage ? pageContent.news : pageContent;
  const imgHeight = isMobile ? 73: 144;
  const imgWidth = isMobile ? 110: 217;

  let { pageLimit, topicName } = paginationData;
  const [catPageLimit, setCatPageLimit] = useState(pageLimit);

  const [newsData, setNewsData] = useState(pageProfileData || []);

  pageLimit = !isProfilePage ? isMobile ? 27 : 22 : pageLimit;
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
      <ul className={`CN-latestStory-widget ${newsData.length <= 0 ? "removeGridLayout" : ""}`}>
        {newsData && newsData.length ? (
          newsData.map((news, index) => {
            const newsArticleUrl = news?.weburl_r || '';
            const newArticleHeadling = news?.display_headline || '';
            return (
              <>
                <li key={`map_${index}`}>
                  <a href={newsArticleUrl}>
                    <div className="image-box">
                      {isPhotoPage && <span className="article__icon"><img height="30" width="30" src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/Photo-Icon.svg" alt="News18 Hindi" title="News18 Hindi" /></span>}
                      {isVideoPage && <span className="article__icon"><img height="30" width="30" src="https://images.news18.com/static_news18/pix/ibnhome/news18/images/cricket/play-icon1.svg" alt="News18 Hindi" title="News18 Hindi" /></span>}
                      <ImageFallback
                        src={news?.images.url}
                        fallbackSrc={CricketNextImgUrls.teamFlagFallbackUrl}
                        height={imgHeight}
                        width={imgWidth}
                        alt={newArticleHeadling}
                        title={newArticleHeadling}
                      />
                    </div>
                    <p> {newArticleHeadling} </p>
                  </a>
                </li>
                {(isMobile && index === 3) && (
                  <div className="clearfix add">
                    <div className="addinner-box addinner_box_300x250">
                      <SiteAd
                        width={300}
                        height={250}
                        slotId={"mobileAdNew300x250_1"}
                        adUnit={pageAds?.ATF_300}
                        lazyload={true}
                        sizes={[[300, 250]]}
                      ></SiteAd>
                    </div>
                  </div>
                )}
              </>
            );
          })
        ) : (
          <p style={{ textAlign: "center" }}> No stories found matching this criteria </p>
        )}
      </ul>
      {newsData.length > 0 && hasMoreData && (
          <button
            onClick={() => loadNews()}
            className="load_more clearfix"
          >
            और पढ़ें
          </button>
        )}
    </>
  );
};

export default CricketProfileNews;
