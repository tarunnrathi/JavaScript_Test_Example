import React from "react";
// import LazyImage from "components/Common/LazyImage";
// import { get_static_img } from 'includes/helper';
import { getCompleteURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";
import { getRelativeURL } from "util/global/Helper";

const RhsTopStoryPhotoGallery = (props) => {
  const latestNewsStories = props?.latestNews || [];
  return (
    <>
      <div className="vsp10"></div>
      <span className="ph_heading">
          <a href="/news/">लेटेस्ट न्यूज़ </a>
      </span>
      <div className="blogs-box clearfix">
        <ul>
          {
            latestNewsStories?.length >0 && (
              latestNewsStories.map((item) => (
                <li key={item?.story_id}>
                  <div className="blogers-box">
                    <a href={item?.weburl ? getRelativeURL(false,item?.weburl):''}>
                      {/* <LazyImage
                        width={70}
                        height={47}
                        src={get_static_img(item.images.url, 70, 47)}
                        alt={item.display_headline || ''}
                        title={item.display_headline || ''}
                        page="photogallery" /> */}
                        <LazyLoadImage
                          src={item.images.url}
                          alt={item.display_headline || ''}
                          title={item.display_headline || ''}
                          width={70}
                          height={47}                                                     
                        />
                    </a>
                    <a href={item.weburl_r || item.weburl || ''}>
                      {item.display_headline || ''}
                    </a>
                  </div>
                </li>
              ))
            )}
        </ul>
      </div>
      <div className="vsp10"></div>
      <style jsx global>{`
      .ph_heading {
        color: #000;
        font-size: 22px;
        line-height: 36px;
        font-weight: bold;
        font-family: "Mukta",sans-serif!important;
        position: relative;
        border-bottom: 2px solid#111
      }
      .ph_heading::before {
        content: "";
        height: 5px;
        width: 25px;
        background: #f4342f;
        position: absolute;
        left: 0;
        bottom: -3px;
    }
    .ph_heading a {
      color: #000000;
      text-decoration: none;
    }
        .blogers-box a img {
          width: 70px;
          margin-right: 10px;
          float: left;
          height: 52px;
        }
        .blogs-box {
          border: 1px solid #eee;
        }
        .blogers-box {
          font-size: 14px;
          line-height: 18px;
        }
        .blogs-box li {
          border-bottom: 1px solid #eee;
          width: 100%;
          float: left;
          box-sizing: border-box;
          padding: 10px;
        }
      `}</style>
    </>
  );
};
export default RhsTopStoryPhotoGallery;
