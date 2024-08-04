import React from "react";
import SingleMobileListingH from "./SingleMobileListingH";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const MobileListingH = ({ data = {}, pageAds }) => {
  return (
    <div>
      <div>
        {data &&
          data.length &&
          data?.map((mobileData, key) => {
            return (
              <div>
                <SingleMobileListingH mobileData={mobileData} />
                {key === 0 ? (
                  pageAds?.BTF_728 ? (
                    <div className="ad-container">
                      <SiteAd
                        width={728}
                        height={90}
                        slotId={`commentary-ad-0`}
                        adUnit={pageAds?.BTF_728}
                        sizes={[
                          [728, 90],
                          [1, 1],
                        ]}
                        removeAdSpan={true}
                        loadonScroll={true}
                      ></SiteAd>
                    </div>
                  ) : null
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
      <style>{`
        .light{
          opacity: 0.5;
         }

         .icon_deactive_brandPage{position: relative;}
            .icon_deactive_brandPage svg, .icon_deactive_brandPage div{opacity: 0.3;}
            .icon_deactive_brandPage:before{content: '';width: 1px;background-color: #ff0000;position: absolute;top: -3px;bottom: -2px;transform: rotate(45deg);left:16px}
       
       `}</style>
    </div>
  );
};

export default MobileListingH;
