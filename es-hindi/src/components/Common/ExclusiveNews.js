import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const ExclusiveNews = ({ exnews = {}, isMobile = false, isAmp = false }) => {

  if (!exnews || !exnews?.widget || !exnews?.widget?.title) {
    return null;
  }

  const news = exnews.widget;

  return (
    <>
      {isMobile ? (
        <>
          <div className="exclusive-news">
            <div className="tpall">
              <span className="tpc">{news?.title}</span>
            </div>
            <a
              href={
                news?.url
                  ? news?.url.replace(
                      "https://hindi.news18.com/",
                      publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`
                    )
                  : ""
              }
              className="header_breaking_news"
            >
              {news?.headline}
            </a>
          </div>
          <style jsx global>{`
            .exclusive-news {
              position: relative;
              ${isAmp ? "padding: 6px 10px;" : "padding: 10px 15px;"}
              text-align: center;
              background: #eaeaea;
              border-radius: 10px;
              ${isAmp ? "margin: 10px 15px 0 15px;" : "margin: 10px;"}
              box-shadow: 0 0 5px #eee;
            }
            .exclusive-news .tpall {
              margin-bottom: 10px;
            }
            .exclusive-news .tpall .tpc {
              background: #444;
              color: #fff;
              font-size: 12px;
              ${
                isAmp
                  ? `
              border-radius: 15px;
              padding: 2px 10px;
              text-transform: uppercase;`
                  : `
              border-radius: 10px;
              padding: 4px 8px 3px 8px;`
              }
            }
            .exclusive-news a {
              color: #111;
              font-size: 18px;
              line-height: ${isAmp ? "24px;" : "22px;"}
              font-weight: 700;
            }             
          `}</style>
        </>
      ) : (
        <>
          <div className="fullwidth exclusivenews">
            <div className="container dflex">
              <h2>
                <span>{news?.title}</span>
                <a
                  href={
                    news?.url
                      ? news?.url.replace("https://hindi.news18.com", "")
                      : ""
                  }
                  className="header_breaking_news"
                >
                  {news?.headline}
                </a>
              </h2>
            </div>
          </div>
          <style jsx global>{`
            .exclusivenews {
              background: #f2f2f2;
              padding: 5px 0;
              margin-bottom: 5px;
            }            
            .exclusivenews h2 {
              font-weight: bold;
            }
            .exclusivenews h2,
            .exclusivenews h3 {
              font-size: 20px;
              line-height: 1.45;
            }
            .exclusivenews h2 span,
            .exclusivenews h3 span {
              background: #ed1c24;
              color: #fff;
              display: inline-block;
              padding: 4px 20px;
              margin-right: 10px;
            }
            .exclusivenews h2 a,
            .exclusivenews h3 a {
              color: #000;
            }
            .exclusivenews h2:hover a,
            .exclusivenews h3:hover a {
              color: #ed1c24;
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default ExclusiveNews;
