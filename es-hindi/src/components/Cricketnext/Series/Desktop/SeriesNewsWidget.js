import React from "react";
import ImageFallback from "components/Common/ImageFallback";
import { CricketNextImgUrls } from "components/Cricketnext/CricketNextUtils";

const SeriesNewsWidget = ({ pageContent, seriesDisplayName }) => {
  const widgetLeftNews = pageContent.slice(0, 2);
  const widgetRightNews = pageContent.slice(2);

  return (
    <>
      <div className="cn-serieswidget">
        <div id="widgetWrap" className="widgetWrap">
          <div className="section__heading">
            <span className="section__heading--text">{seriesDisplayName}</span>
          </div>
          <div className="cn-serieswidgetMain">
            <div className="cn-serieswidget-box1 cnTabContent Videos">
              {pageContent && pageContent.length !== 0 ? (
                <>
                  <ul className="cn-series-list1">
                    {widgetLeftNews && widgetLeftNews.map((news) => {
                      const newsTitle = news.display_headline ? news.display_headline : news?.headline;
                      const newsArticleUrl = news?.weburl_r || "";
                      return (
                        <li key={news?.id}>
                          <a href={newsArticleUrl}>
                            <div className="imgwrap">
                              <ImageFallback
                                src={news?.images.url}
                                fallbackSrc={CricketNextImgUrls.newsFallbackUrl}
                                height={142}
                                width={214}
                                alt={newsTitle}
                                title={newsTitle}
                              />
                            </div>
                            <h3 className="series-head1">{newsTitle}</h3>
                            <p>{news?.intro}</p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="cn-series-list2">
                    {widgetRightNews && widgetRightNews.map((news) => {
                      const newsTitle = news.display_headline ? news.display_headline : news?.headline;
                      const newsArticleUrl = news?.weburl_r || "";
                      return (
                        <li>
                          <a href={newsArticleUrl}>
                            <div className="imagewrap">
                              <ImageFallback
                                src={news?.images.url}
                                fallbackSrc={CricketNextImgUrls.newsFallbackUrl}
                                height={60}
                                width={90}
                                alt={newsTitle}
                                title={newsTitle}
                              />
                            </div>
                            <div className="contentbox">
                              <h3 className="series-head2">{newsTitle}</h3>
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <p style={{ margin: "0 auto" }}> No stories found matching this criteria </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .cn-serieswidget a:hover {
            text-decoration: none;
            color: #232323 !important;
          }

          .cn-serieswidget {
            min-height: 405px;
            margin-top: 10px;
            margin-bottom: 25px;
            border: 5px solid #202020;
          }

          .cn-serieswidget .widgetWrap {
            padding: 12px;
            padding-top: 5px;
            background: #f5f5f5;
          }
          .cn-serieswidget-box1 {
            display: flex;
            justify-content: space-between;
          }
          .cn-series-list1 {
            width: 49.5%;
            display: flex;
            justify-content: space-between;
          }
          .cn-series-list1 li {
            width: 48.5%;
          }
          .cn-serieswidget-box1 .cn-series-list1 li a {
            display: block;
          }
          .cn-series-list1 li a .imgwrap {
            margin-bottom: 5px;
          }
          .cn-series-list1 li a .imgwrap img {
            min-height: 140px;
          }
          .cn-series-list1 li a .series-head1 {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .cn-series-list1 li a p {
            color: #323232;
            font-size: 13px;
            line-height: 20px;
            margin-bottom: 0;
          }
          .cn-series-list2 {
            width: 49%;
          }

          .cn-serieswidget-box1 .cn-series-list2 li {
            min-height: 60px;
            padding: 10px 0;
            border-bottom: 1px solid #dadada;
          }
          .cn-series-list2 li:first-child {
            padding-top: 0;
          }
          .cn-series-list2 li a {
            display: flex;
          }
          .cn-series-list2 li a .imagewrap {
            flex: 0 0 90px;
            margin-right: 10px;
            position: relative;
          }
          .cn-serieswidget-box1 .cn-series-list2 li a .imagewrap img {
            display: block;
          }
          .cn-serieswidget-box1
            .cn-series-list2
            li
            a
            .contentbox
            .series-head2 {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 5px;
            font-weight: 400;
          }
        `}
      </style>
    </>
  );
};

export default SeriesNewsWidget;
