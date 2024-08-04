import { olympics_year } from "api/Constant";
import LazyLoadImage from "../CustomImage";
import { getArticleList } from "api/global/Common";
import { useState } from "react";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";
import { TaboolaList } from "includes/Tabola.helper";
import Taboola from "widgets/Common/Responsive/Taboola";

const LatestNews = (props) => {
  const [loadMoreData, setLoadMoreData] = useState(
    props?.latestNewsData?.length > 0 ? props?.latestNewsData : 0
  );
  const { rhs } = TaboolaList.homePage;
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const loadMore = async () => {
    const tempData = await getArticleList(
      {
        count: 8,
        offset: loadMoreData?.length > 0 ? loadMoreData?.length : 0,
        filter: { post_type: "photogallery", "tags.slug": `icc-t20-world-cup` },
        fields: "display_headline,weburl_r,images,weburl",
      },
      true
    );
    if (tempData?.length === 0) {
      setHideLoadMore(true);
    }
    setLoadMoreData([...loadMoreData, ...tempData]);
  };
  return (
    <>
      <div className="olympics-wrapper">
        <div className="olympics-left">
          <div className="latest-news">
            <div className="medalHopeHeadingInner">
              <h3 className="heading-1">Paris olympics {olympics_year}</h3>
              <h2 className="heading-2">ताजा खबरें</h2>
            </div>
            <ul className="latest_news_list">
              {loadMoreData?.map((item, index) => {
                return (
                  <li key={"latestNewsData_" + index}>
                    <a href={item.weburl_r}>
                      <figure>
                        <LazyLoadImage
                          src={item?.images?.url}
                          width={props?.isMobile ? 110 : 216}
                          height={props?.isMobile ? 73 : 154}
                          alt={item?.display_headline}
                          title={item?.display_headline}
                          isLazyLoad={true}
                        />
                      </figure>
                      <figcaption>
                        <h3 className="latestnewws_title">
                          {item?.display_headline}
                        </h3>
                      </figcaption>
                    </a>
                  </li>
                );
              })}
            </ul>
            {!hideLoadMore && (
              <div className="lnmorebox">
                <a onClick={loadMore} style={{ cursor: "pointer" }}>
                  और भी पढ़ें
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="olympics-right">
          {props?.isMobile && (
            <div className="add">
              <div className="addinner-box">
                <NewSiteAd
                  slotId="Mobile_BTF_300"
                  width={336}
                  height={280}
                  adUnit={props?.pageAds?.BTF_300}
                  sizes={[
                    [300, 250],
                    [336, 280],
                    [250, 250],
                  ]}
                  lazyload={true}
                ></NewSiteAd>
              </div>
            </div>
          )}
          <Taboola
          mode={rhs.mode}
          id={rhs.id}
          container={rhs.container}
          placement={rhs.placement}
        />
        </div>
        
      </div>
      <style jsx global>{`
            .latest_news_list {
               display: grid;
               grid-template-columns: 216px 216px 216px 216px;
               flex-wrap: wrap;
               justify-content: space-between;
               row-gap: 20px;
               margin-bottom: 20px
            }

            .latestnewws_title {
               font-size: 15px;
               color: #292929;
               line-height: 20px;
               font-weight: 400;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-line-clamp: 4;
               -webkit-box-orient: vertical;
               overflow: hidden
            }

            ul.latest_news_list li a {
               color: #292929
            }

            .latest_news_list li figcaption {
               padding: 10px
            }

            .latest_news_list li figure img {
               width: 100%;
               display: block
            }

            ul.latest_news_list li a figure,
            ul.latest_news_list li a figure img {
               height: 154px
            }

            .lnmorebox {
               height: 35px;
               background: #f4f4f2;
               display: flex;
               align-items: center;
               justify-content: center;
               text-align: center;
               border-bottom: 1px #dadada solid;
               margin-top: 30px;
               width: max-content;
               margin: 0 auto
            }

            .lnmorebox a {
               color: #E1261D;
               text-transform: uppercase;
               font-weight: 600;
               font-size: 12px;
               flex-shrink: 0;
               padding: 0 15px;
               text-decoration: underline
            }
            
            .medalHopeHeadingInner {
                text-align: left;
                margin: 0 auto;
                max-width: 45%;
                padding-top: 11px;
            }
            .medalHopeHeadingInner .heading-1 {
                color: red;
                font-weight: 400;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 3.7px;
                line-height: 12px;
            }
            .medalHopeHeadingInner .heading-2 {
                color: #001d42;
                font-size: 28px;
                font-weight: 600;
                border-bottom: 2px solid #d2d2d2;
                line-height: 33px;
                text-transform: uppercase;
            }

            .latest-news .medalHopeHeadingInner {
               max-width: 100%
            }
            
            @media (max-width:768px) {
               .latest-news {
                  padding: 0 10px;
               }

               .latest_news_list {
                  display: block;
               }

               ul.latest_news_list li a {
                  display: flex;
                  flex-direction: row-reverse;
                  justify-content: space-between;
               }

               ul.latest_news_list li {
                  padding: 15px 0;
                  border-bottom: 1px #dadada solid;
               }

               ul.latest_news_list li a figure,
               ul.latest_news_list li a figure img {
                  height: 66px;
                  width: 88px;
               }

               .latest_news_list li figcaption {
                  padding: 0;
                  width: calc(100% - 100px);
               }

               .medalHopeHeadingInner .heading-2 {
                  font-size: 22px;
                  line-height: 26px;
                          margin-bottom: 0;
               }
            }
      `}</style>
    </>
  );
};
export default LatestNews;
