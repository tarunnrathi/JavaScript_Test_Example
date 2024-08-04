import React, { useEffect, useState } from "react";
import LazyImage from "components/Common/LazyImage";
import { imageLoader } from "includes/article.util";
import { getArticleList } from "api/global/Common";
import { getCompleteURL } from "util/global/Helper";

// const { publicRuntimeConfig } = getConfig();

const HomeVideogalleryNews = ({
  videogallerySsr = [],
  heading = "टॉप वीडियो",
}) => {
  const [videogalleryNews, setVideogellaryNews] = useState(
    videogallerySsr && videogallerySsr.length ? videogallerySsr : null,
  );
  const [isLoading, setLoading] = useState(true);
  // const [activeTabUrl, setActiveTabUrl] = useState("/videos/");

  // const videogalleryObj = {
  //   key: "videos",
  //   value: "वीडियो",
  //   colorClass: "bgclr-videos",
  //   template: "four",
  //   subCatDisplay: "1",
  //   "more-url": "/videos/",
  //   "sub-list": [],
  // };

  const getData = async () => {
    setLoading(true);

    const videogalleryData = await getArticleList({
      count: 6,
      offset: 0,
      fields:
        "story_id,display_headline,title,images,categories,post_type,weburl_r,weburl,intro",
      filter: { post_type: "videos" },
    }, true);

    // console.log({videogalleryData})

    if (videogalleryData && videogalleryData.length) {
      setVideogellaryNews(videogalleryData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // const onOptionClick = (title) => {
  //   const dataArray = [...videogalleryObj["sub-list"]];

  //   dataArray.map((eachData) => {
  //     if (eachData.value == title && activeTabUrl !== eachData["more-url"]) {
  //       getData(eachData.key);
  //       setActiveTabUrl(eachData["more-url"]);
  //     }
  //   });
  // };

  useEffect(() => {
    if (videogallerySsr && !videogallerySsr.length) {
      getData("videos");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="clearfix" />
      <div className="video-gallery">
        {/* <OptionTab
          head={videogalleryObj["value"]}
          url={videogalleryObj["more-url"]}
          options={[
            ...videogalleryObj["sub-list"].map((eachOption) => {
              return { title: eachOption.value };
            }),
          ]}
          updateState={onOptionClick}
          component={videogalleryObj["key"]}
        /> */}
        {!isLoading && videogalleryNews && videogalleryNews.length ? (
          <div className="newvdwdgt">
            <div className="globalhd large dflex justify-space-betwwen">
              <h2>
                <a href="/videos/">{heading}</a>
              </h2>
            </div>
            <div className="newvdwdgt-story">
              <ul>
                {/* <ul className="dflex justify-space-betwwen flex-wrap videosnews videostories"> */}
                {videogalleryNews.map((eachVideo, index) => {
                  const Width = index === 0 ? 430 : index === 3 ? 210 : 204;
                  const Height = index === 0 ? 290 : index === 3 ? 140 : 136;
                  const Src = eachVideo.images.url
                    ? imageLoader(eachVideo.images.url || "", Width, Height)
                    : "";

                  return index <= 10 ? (
                    <li>
                      <a
                        href={getCompleteURL(
                          eachVideo?.weburl_r,
                          eachVideo?.weburl,
                        )}
                      >
                        <figure>
                          <LazyImage
                            src={Src}
                            alt={eachVideo?.display_headline || ""}
                            title={eachVideo?.display_headline || ""}
                            lazyLoad={true}
                            width={Width}
                            height={Height}
                          />
                        </figure>
                        <h2>{eachVideo?.display_headline}</h2>
                      </a>
                    </li>
                  ) : (
                    ""
                  );
                })}
              </ul>
            </div>
            <a href="/videos/" className="newvdwdgtbtn">
              और भी वीडियो देखें
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
      <style jsx global>{`
        .video-gallery li {
          overflow: hidden;
        }
        .videogallery-news-skeleton ul li:first-child {
          display: block !important;
        }
        .newvdwdgt .globalhd h2,.newvdwdgt .globalhd h2 a{color: #fff;}
        .newvdwdgt {
          margin-top: 15px;
          padding: 10px 20px;
          background: #212121;
        }
        .newvdwdgt .globalhd {
          border-bottom: 1px solid #585858;
          margin-top: 0px;
        }
        .newvdwdgt-story {
          margin: 15px 0;
        }
        .newvdwdgt-story ul {
          display: flex;
          justify-content: space-between;
          
          flex-wrap: wrap;
          border-bottom: 1px dotted #5c5c5c;
          padding-bottom: 15px;
        }
        .newvdwdgt-story ul li {
          position: relative;
          background: #000;
          border: 1px solid #5c5c5c;
          box-shadow: 0px 0px 8px #111;
          width: 204px;
          flex-shrink: 0;
          height: 215px;
          margin-bottom:20px;
        }
        .newvdwdgt-story ul li a figure {
          width:204px;
          height:136px;
          position: relative;
          overflow: hidden;
          line-height: 0;
          border-bottom: 1px solid #5c5c5c;
        }
        .newvdwdgt-story ul li a figure:before {
          content: "";
          background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/others/newwdgt_video_icon_1654592513.svg)
            top center no-repeat;
          position: absolute;
          width: 32px;
          height: 32px;
          top: 50%;
          left: 50%;
          background-size: 38px;
          margin: -16px 0 0 -16px;
          z-index: 1;
        }
        .newvdwdgt-story ul li a figure img {
          height:136px;
          filter: brightness(0.7);
        }
        .newvdwdgt-story ul li a h2 {
          color: #ffffff;
          text-shadow: 0px 3px 6px #0000004d;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          padding: 10px;
          overflow: hidden;
          height: 68px;
          margin-bottom: 10px;
        }
        .newvdwdgt-story ul li:nth-child(1) {
          width: 430px;
          height: 290px;
          overflow-hidden;
        }
        .newvdwdgt-story ul li:nth-child(1) a figure {
          width: 430px;
          height: 290px;
        }
        .newvdwdgt-story ul li:nth-child(1) a figure img {
          width: 430px;
          height: 290px;
        }

        .newvdwdgt-story ul li:nth-child(1) a figure:before {
          transform: scale(1.5);
        }
        .newvdwdgt-story ul li:nth-child(1) a h2 {
          font-size: 20px;
          line-height: 28px;
          position: absolute;
          bottom: 0;
          background: transparent
            linear-gradient(180deg, #00000000 0%, #000000 100%) 0% 0% no-repeat
            padding-box;
          left: 0;
          right: 0;
          padding: 200px 10px 10px 10px;
          height: auto;
          margin-bottom: 0;
        }
        .newvdwdgt-story ul li:nth-child(4) {
          width: 430px;
          height: 140px;
          margin-bottom: 0px;
        }
        .newvdwdgt-story ul li:nth-child(4) a {
          display: flex;
        }
        .newvdwdgt-story ul li:nth-child(4) a figure {
          width: 210px;
          height: 140px;
          flex-shrink: 0;
          margin-right: 10px;
        }
        .newvdwdgt-story ul li:nth-child(4) a figure img {
          width: 210px;
          height: 140px;
        }


        .newvdwdgt-story ul li:nth-child(5),
        .newvdwdgt-story ul li:nth-child(6) {
          margin-top: -76px;
          margin-bottom: 0px;
        }
        .newvdwdgtbtn {
          background: #e1261d;
          box-shadow: 0px 3px 6px #00000029;
          border: 1px solid #ffffff;
          border-radius: 15px;
          height: 30px;
          line-height: 30px;
          font-weight: bold;
          color: #fff;
          font-size: 14px;
          display: table;
          margin: 20px auto 10px auto;
          padding: 0px 15px;
        }
        .newvdwdgtbtn:hover {
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default HomeVideogalleryNews;
