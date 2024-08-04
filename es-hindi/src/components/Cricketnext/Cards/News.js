import PlaceholderCard from "./PlaceholderCard";
import LazyImage from "components/Common/LazyLoadImage";
import { useEffect, useState } from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import { getArticleList } from "api/global/Common";

const News = ({ data = {}, isMobile, ta, tb, pageAds = {} }) => {
  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async() => {
    setNewsData((prev) => ({ ...prev, loading: true }));
    const getResult = await getArticleList({ count: 20, filter: { post_type: "text", "subsection.id": "29", "tags.slug": [ta, tb] }, fields: 'display_headline,weburl_r,images' }, true);
    if (getResult?.length) {
      setNewsData((prev) => ({
        ...prev,
        news: { length: prev.news.length || getResult?.length, result: [...prev.news.result, ...getResult] },
        start: 21,
        loading: false,
      }));
    }
  };

  const [newsData, setNewsData] = useState({
    news: {
      result: data.news || [],
      length: data.news?.length,
    },
    start: 21,
    loading: false,
  });

  const handleClick = async () => {
    setNewsData((prev) => ({ ...prev, loading: true }));

    const d = await getArticleList({ offset: `${newsData.start}`, count: 20, filter: { post_type: "text", "subsection.id": "29", "tags.slug": [ta, tb] }, fields: 'display_headline,weburl_r,images' }, true);

    if (d?.length) {
      setNewsData((prev) => ({
        ...prev,
        news: { length: prev.news.length || d.length, result: [...prev.news.result, ...d] },
        start: prev.start + 20,
        loading: false,
      }));
    }
  };

  return (
    <>
      {newsData?.news?.result?.length > 0 ? (
        <ul className="scorecard-news">
          {newsData?.news?.result.map((item, key) => {
            return (
              <>
                <li key={key} className={isMobile && key == 0 ? "lead-story" : ""}>
                  <a href={item.weburl_r}>
                    <div className="image-wrap">
                      <LazyImage
                        src={item.images?.url}
                        alt={item.display_headline}
                        title={item.display_headline}
                        height={isMobile ? (key == 0 ? "100%" : 73) : 144}
                        width={isMobile ? (key == 0 ? "100%" : 110) : 217}
                      />
                    </div>
                    <div className="content-box">
                      <p className="discription">{item.display_headline}</p>
                    </div>
                  </a>
                {pageAds?.ATF_300 && key == 3 ? (
                  <div className="ad-container">
                    <div className="addinner-box">
                      <SiteAd
                        width={300}
                        height={250}
                        slotId="mobileAdNew300x250_1"
                        adUnit={pageAds.ATF_300}
                        lazyload={true}
                        sizes={[
                          [300, 250]
                        ]}
                      ></SiteAd>
                    </div>
                  </div>
                ) : null}
                </li>
              </>
            );
          })}
        </ul>
      ) : (
        <PlaceholderCard />
      )}
      {newsData.news?.result?.length &&
      !newsData.loading &&
      newsData.news.result.length / 20 > 0 &&
      newsData?.news.length == 20 ? (
        <div className="score-cardbtnwrap">
          <a className="score-cardbtn-1 rdmr" href="javascript:void(0);" onClick={handleClick}>
            LOAD MORE
          </a>
        </div>
      ) : null}
      {pageAds?.BTF_300 ? (
        <div className="ad-container">
          <SiteAd
            slotId="cricket_next_ad"
            adUnit={pageAds.BTF_300}
            sizes={[
              [300, 250],
              [336, 280],
            ]}
            width={336}
            height={300}
            lazyload={true}
          />
        </div>
      ) : null}
      {newsData.loading ? <PlaceholderCard /> : null}
      <style jsx global>{`
        .scorecard-news {
          display: grid;
          grid-template-columns: 217px 217px 217px 217px;
          column-gap: 19px;
          row-gap: 40px;
          margin-bottom: 20px;
        }
        .scorecard-news li a {
          display: block;
        }

        .score-cardbtnwrap a:hover {
          color: white !important;
        }

        .scorecard-news li a .image-wrap {
          position: relative;
        }
        .scorecard-news li a .content-box {
          margin-top: 7px;
        }
        .scorecard-news li a .content-box .discription {
          font-size: 16px;
          font-family: 'Karma',serif !important;
          line-height: 1.5;
          color: #292929;
          margin-bottom: 0;
          font-weight: 300;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li a {
          display: flex;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d7d7d7;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li a .image-wrap {
          order: 2;
          margin-left: 10px;
          height: 73px;
          overflow: hidden;
          border-radius: 5px;
          min-width: 110px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li a .content-box .discription {
          color: #0a0a0a;
          font-size: 13px;
          font-family: "Segoe Pro Bold";
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li.lead-story {
          margin-left: -10px;
          margin-right: -10px;
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: 0;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li.lead-story a {
          flex-direction: column;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li.lead-story a .content-box {
          background: #001e44;
          padding: 20px 10px 15px 10px;
          position: relative;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li.lead-story a .content-box .discription {
          color: #fff;
          font-size: 18px;
          line-height: 24px;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li.lead-story .content-box:before {
          content: "";
          position: absolute;
          width: 40px;
          background: #e1261c;
          height: 6px;
          top: 10px;
          left: 0;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li.lead-story a .image-wrap {
          height: 100%;
          margin-left: 0;
        }

        .score-cardbtnwrap {
          display: flex;
          justify-content: center;
        }
        .score-cardbtn-1 {
          background: #e1261d;
          font-size: 12px;
          text-transform: uppercase;
          color: #fff;
          font-family: "Segoe Pro Bold";
          padding: 6px 14px;
          border-radius: 20px;
        }

        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news {
          display: flex;
          flex-direction: column;
          row-gap: 0;
          margin-bottom: 0;
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scorecard-news li a .content-box .discription {
          font-size: 16px;
          font-family: "Segoe Pro Regular";
        }
        .CN-PageWrap.CN-Mobile-PageWrap .scoreCardPage .score-cardbtnwrap {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default News;
