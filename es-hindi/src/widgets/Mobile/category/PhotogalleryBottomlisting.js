import React, { memo } from "react";
import { imageLoader } from "includes/article.util";
//import SiteAd from "widgets/Common/Responsive/SiteAd";
import LazyLoadImage from "components/Common/LazyLoadImage";
import NewSiteAd from "widgets/Common/Responsive/NewSiteAd";

// const MemoSiteAd = memo(SiteAd);
// const MemoLazyLoadImage = memo(LazyLoadImage);

const PhotogalleryBottomlisting = (props) => {
  const pageNo = props?.pageNo || 0;
  const setGalleryAd = (adType = "", ad = "", slotId = "") => {
    const sizes = [
      [300, 250],
      [336, 280],
    ];
    return (
      <>
        <li className="clearfix vsp16 add add-li">
          <div className="addinner-box">
            {/* <MemoSiteAd
              slotId={slotId}
              adUnit={ad}
              sizes={sizes}
              width={300}
              height={280}
              lazyload={true}
              style={{ padding: "16px" }}
            /> */}
            <NewSiteAd
              slotId={slotId}
              adUnit={ad}
              sizes={sizes}
              width={300}
              height={280}
              lazyLoad={true}
              style={{ padding: "16px" }}
            />
          </div>
        </li>
      </>
    );
  };
  return (
    <React.Fragment>
      {props.showAnyaText && props.data.length > 8 && (
        <div className="glblbghd-sts">
          <h2 className="hd"> अन्य फोटो </h2>
          <a
            title="Link"
            href="/photogallery/page-1/"
            className="rdmr glblbghd-sts-mrnav"
          >
            और भी देखें ...
          </a>
        </div>
      )}
      {props.data && props.data.length > 0
        ? props.data.map((eachNews, key) => {
            const Src = eachNews.images?.url
              ? imageLoader(eachNews.images?.url, 120, 180)
              : "";
            return (
              <React.Fragment key={`page_no_` + pageNo + `_key_` + key}>
                {props?.isAjax && (key == 0 || key % 16 == 0)
                  ? setGalleryAd(
                      "btf",
                      props.pageAds.BTF_300,
                      "mobile_btf_page_" + pageNo + "_" + key
                    )
                  : ""}
                <li key={`page_no_` + pageNo + `_key_` + key}>
                  <a title="Link" href={eachNews.weburl || ""}>
                    <figure>
                      <div className="tgtm-shr">
                        <span className="tpc fl">
                          {eachNews.sub_category || ""}
                        </span>
                      </div>
                      <span className="sprite phticns"></span>
                      <LazyLoadImage
                        height={120}
                        width={180}
                        src={Src}
                        alt={eachNews.display_headline || eachNews.headline}
                        title={eachNews.display_headline || eachNews.headline}
                        isRes="mobile"
                      />
                    </figure>
                  </a>
                  <div className="lstintro">
                    <h2>
                      <a title="Link" href={eachNews.weburl || ""}>
                        {eachNews.display_headline || eachNews.headline}
                      </a>
                    </h2>
                  </div>
                </li>
                {(pageNo == 0 && key == 3) || key % 16 == 3
                  ? setGalleryAd(
                      "atf",
                      props.pageAds.ATF_300,
                      "mobile_atf_page_" + pageNo + "_" + key
                    )
                  : ""}
                {((pageNo == 0 && key == 7) || key % 16 == 7) &&
                props.data.length > 8
                  ? setGalleryAd(
                      "btf",
                      props.pageAds.BTF_300,
                      "mobile_btf_page_" + pageNo + "_" + key
                    )
                  : ""}
              </React.Fragment>
            );
          })
        : ""}
    </React.Fragment>
  );
};
export default PhotogalleryBottomlisting;
