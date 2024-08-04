import React from "react";
// import { get_static_img } from "includes/helper";
// import siteConfig from "config/site.config";
import LazyLoadImage from "components/Common/CustomImage";
import { getRelativeURL } from "util/global/Helper";

const PhotoListing = (props) => {
  const photoData = props.initialData;
  return (
    <>
      {/* News Listing start here */}
      {photoData && photoData.length
        ? Object.keys(photoData).map((key, index) => {
          return (
            <React.Fragment key={key + "fragment"}>
              {/* {index == 12 ? (
                <div className="page_outbrain">
                  <Outbrain widgetId="AR_6" widgetSrc={props.outBrainUrl} />
                </div>
                <div style={{width:"100%",height:"540px"}}>
                  <Taboola mode={TaboolaList.photoPage.center.mode}
                  id ={TaboolaList.photoPage.center.id}
                  container={TaboolaList.photoPage.center.container}
                  placement = {TaboolaList.photoPage.center.placement}
                  />
                </div>
              ) : (
                ""
              )} */}
              <div key={key} className={"blog_list_row blog_photo"}>
                <a href={photoData[key]?.weburl ? getRelativeURL(false,photoData[key]?.weburl) :''}>
                  <figure>
                    <div className="blog_img">
                    <LazyLoadImage
                        src={photoData[key]?.images?.url}                                         
                        alt={photoData[key]?.headline}
                        title={photoData[key]?.headline}
                        className="lazyload"
                        width={281}
                        height={187}                       
                    />
                      {/* <img
                        src={get_static_img(
                          photoData[key]?.images?.url || siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                          281,
                          187
                        )}
                        data-src={get_static_img(
                          photoData[key]?.images?.url,
                          281,
                          187
                        )}
                        alt={photoData[key]?.headline}
                        title={photoData[key]?.headline}
                        className="lazyload"
                      /> */}
                    </div>
                    <figcaption>
                      <div className="blog_title">
                        {photoData[key]?.headline
                          ? photoData[key].headline
                          : photoData[key].display_headline}
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            </React.Fragment>
          );
        })
        : ""}
      <style jsx global>{`
        .pht-sld {
            position: relative;
            overflow: hidden;
            padding-bottom: 10px;
            margin-top: 10px;
        }
        .pht-sld ul {
            display: flex;
        }
        .pht-sld li .imgtext figure {
            line-height: 0;
            width: 100%;
            overflow: hidden;
        }
        .pht-sld li .imgtext figure img {
            width: 100%;
        }
        .pht-sld li .imgtext h5 {
            padding: 10px 12px;
            font-size: 16px;
            line-height: 22px;
            font-weight: 400;
            color: #252525;
        }
        .blog_list_row {
          width: 32%;
          position: relative;
          margin: 0;
          margin-bottom: 20px;
        }
        .blog_img {
          font-size: 0;
          background-color: #dbdbdb;
      }
        .blog_img img { 
          width: 100%;
          display: block;
          height: 196px;
        } 
        .blog_title {
            font-size: 16px;
            line-height: 24px;
            height: 70px;
            overflow: hidden;
            margin: 5px 0;
            padding: 0 0 8px; 
        }
        .blog_list_row a {
            text-decoration: none;
            color: #000;
        }   
        .blog_list_row:nth-child(3n+1) {
            margin-left: 0; 
        }
        .blog_list_row:nth-child(3n+3) {
            margin-right: 0; 
        } 
        .blog_list_row:after {
            content: "";
            height: 43px;
            width: 42px;
            top: 15px;
            left: 15px;
            position: absolute;border-radius: 100px;
        } 
        .blog_photo:after 
        {
            display:none;position: absolute;
            background: url(https://images.news18.com/ibnkhabar/uploads/assests/img/photoB.png) 0 0 no-repeat;
            width: 42px;
            height: 44px;
            top: 40%;
            left: 50%;
            margin: -21px 0 0 -21px;
        } 
        .blog_photo:hover:after {
            background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/photo-iconh.png) no-repeat; 
        } 
        .blog_video:hover:after{
            background: url(https://static.hindi.news18.com/ibnkhabar/uploads/assests/img/video-iconh.png) no-repeat;
        } 
        .blog_video:after{
            background: url(/images/siteimages/video-iconnew.png) no-repeat;
        }
        .page_outbrain {
            margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};
export default PhotoListing;
