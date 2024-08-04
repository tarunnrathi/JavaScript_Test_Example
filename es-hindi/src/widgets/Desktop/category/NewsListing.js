import React, { useEffect, useState } from "react";
// import "lazysizes";
import { get_static_img } from "includes/helper";
import siteConfig from "config/site.config";
import Taboola from "widgets/Common/Responsive/Taboola";
import { TaboolaList } from "includes/Tabola.helper";
import LazyLoadImage from "components/Common/CustomImage";
const NewsListing = (props) => {
  const [NewsData, setNewsData] = useState(props.initialData);
  console.log(props)
  useEffect(() => {
    setNewsData(props.initialData)
  }, [props.initialData])
  return (
    <>
      {/* News Listing start here */}
      {NewsData.map((item, index) => {
        // console.log(item)
        if (index == 12) {
          return (
            <React.Fragment key={index + "fragment"}>
              <div className="taboola_setting">
                <Taboola
                  mode={TaboolaList.category.center.mode}
                  id={TaboolaList.category.center.id}
                  container={TaboolaList.category.center.container}
                  placement={TaboolaList.category.center.placement}
                />
              </div>
              <div
                key={'k'+index}
                className={
                  "blog_list_row " +
                  (item.post_type == "videos"
                    ? "blog_video"
                    : item.post_type == "photogallery"
                    ? "blog_photo"
                    : item.ff_source == "Hyperlocal" &&
                    item.local18_video != ""
                    ? "blog_video"
                    : "")
                }
              >
                <a href={item.weburl || item.weburl_r || 'No Link'}>
                  <figure>
                    <div className="blog_img">
                      <img
                        src={get_static_img(
                          siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                          355,
                          187
                        )}
                        data-src={get_static_img(
                          item.images.url ||'',
                          355,
                          187
                        )}
                        alt={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        title={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                        }}
                      />
                    </div>
                    <figcaption>
                      <div className="blog_title">
                        {item.display_headline ||
                          item.headline ||
                          "News18 Hindi"}
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index + "fragment"}>
              <div
                key={'T'+index}
                className={
                  "blog_list_row " +
                  (item.post_type == "videos"
                    ? "blog_video"
                    : item.post_type == "photogallery"
                    ? "blog_photo"
                    : item.ff_source == "Hyperlocal" &&
                      item.local18_video != ""
                    ? "blog_video"
                    : "")
                }
              >
                <a href={item.weburl || item.weburl_r || 'No Link'}>
                  <figure>                    
                    <div className="blog_img">
                      <LazyLoadImage
                        src={item?.images?.url}
                        width={355}
                        height={187}
                        alt={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        title={
                          item.display_headline ||
                          item.headline ||
                          "News18 Hindi"
                        }
                        className="lazyload"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.news18.com/ibnkhabar/uploads/assests/images/placeholder.jpg?impolicy=website&width=561&height=374";
                        }}
                      />                      
                    </div>
                    <figcaption>
                      <div className="blog_title">
                        {item.display_headline ||
                          item.headline ||
                          "News18 Hindi"}
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            </React.Fragment>
          );
        }
      })}
      {/* </div> */}
      {/* News Listing end here */}
      <style jsx global>{`
        .blog_list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .blog_list_row {
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          width: 32%;
          position: relative;
          margin: 0px;
          margin-bottom: 20px;
        }
        .blog_img img {
          width: 100%;
          display: block;
          height: 185px;
        }
        .blog_title {
          font-size: 16px;
          line-height: 24px;
          height: 70px;
          overflow: hidden;
          margin: 5px 0;
          padding: 0 0 8px;
          font-weight: bold;
        }
        .blog_list_row a {
          text-decoration: none;
          color: #000;
        }
        .blog_list_row:nth-child(3n + 1) {
          margin-left: 0;
        }
        .blog_list_row:nth-child(3n + 3) {
          margin-right: 0;
        }
        .blog_list_row:after {
          content: "";
          height: 43px;
          width: 42px;
          top: 15px;
          left: 15px;
          position: absolute;
          border-radius: 100px;
        }
        .blog_photo:after {
          position: absolute;
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/photoB.png)
            0 0 no-repeat;
          width: 42px;
          height: 44px;
          top: 40%;
          left: 50%;
          margin: -21px 0 0 -21px;
        }
        .blog_photo:hover:after {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/photo-iconh.png)
            no-repeat;
        }
        .blog_video:hover:after {
          background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/video-iconh.png)
            no-repeat;
        }
        .blog_video:after {
          background: url(/images/siteimages/video-iconnew.png)
            no-repeat;
          width: 42px;
          height: 44px;
          top: 30%;
          left: 50%;
          margin: -21px 0 0 -21px;
        }
        .page_outbrain {
          margin-bottom: 20px;
        }
        .photoicon {
          position: absolute;
          background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/photoB.png)
            0 0 no-repeat;
          width: 42px;
          height: 43px;
          top: 50%;
          left: 50%;
          margin: -21px 0 0 -21px;
        }
        .taboola_setting {
          width: 100%;
          height: 540px;
        }
        @media (max-width:768px){
          .blog_list {
            margin-top:25px;
          }
          .blog_list_row {
              border-bottom: 1px solid#eee;
              padding-bottom: 0px;
              width: 100%;
              position: relative;
              margin: 0px;
              /* margin-bottom: 20px; */
          }
          .blog_title {
            font-size: 17px;
            height: auto;
            margin: 13px 4px;
            margin-bottom: 10px;
          }    
        }
      `}</style>
    </>
  );
};
export default NewsListing;