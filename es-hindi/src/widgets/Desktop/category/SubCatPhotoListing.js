import React from "react";
// import { get_static_img } from "includes/helper";
// import siteConfig from "config/site.config";
import { getRelativeURL } from "util/global/Helper";
import LazyLoadImage from "components/Common/CustomImage";

const SubCatPhotoListing = (props) => {
  const photoData = props.initialData;
  return (
    <>
      {
        photoData && photoData?.length > 0 &&
          (Object.keys(photoData).map((key, index) => {
            return (
              <React.Fragment key={key + "fragment"}>
                <li>
                  <div className="imgtext">
                    <figure>
                      <a href={photoData[key]?.weburl ? getRelativeURL(false, photoData[key]?.weburl):''}>
                        {/* <img
                          src={get_static_img(
                            photoData[key]?.images?.url || siteConfig.THUMBNAIL_IMAGE_PLACEHOLDER_PATH,
                            218,
                            145
                          )}
                          data-src={get_static_img(
                            photoData[key]?.images?.url,
                            218,
                            145
                          )}
                          alt={photoData[key]?.headline}
                          title={photoData[key]?.headline}
                          className="lazyload"
                        /> */}
                        <LazyLoadImage
                          src={photoData[key]?.images?.url}                                         
                          alt={photoData[key]?.headline}
                          title={photoData[key]?.headline}
                          className="lazyload"
                          width={218}
                          height={145}                       
                        />
                      </a>
                    </figure>
                    <h5><a href={photoData[key]?.weburl_r|| photoData[key]?.weburl}>{photoData[key]?.display_headline ? photoData[key].display_headline : photoData[key].headline}</a></h5>
                  </div>
                </li>
              </React.Fragment>
            );
          }))}
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
        .pht-sld-list2 {
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 5px;
        }
        .pht-sld-list2 li {
            width: 24%;
            box-shadow: 0 1px 3px #b2b2b2;
            margin: 0 0 20px 0;
        }
        .pht-sld-list2 li .tpshr-uponpht {
            display: none!important;
        }
        .pht-sld-list2 li .imgtext {
            box-shadow: none !important;
            margin: 0!important;
        }
      `}</style>
    </>
  );
};

export default SubCatPhotoListing;
