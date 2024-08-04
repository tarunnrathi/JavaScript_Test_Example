import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";
import News18Viral from "./News18Viral";

const RhsCommon = ({ pageAds, RhsBiharNews, RhsRajasthanNews }) => {
  return (
    <div className="vdcnsmpn-right">
      {(true || pageAds?.ATF_300_id) && (
        <>
          <SiteAd
            adUnit={
              pageAds?.ATF_300_id ? pageAds.ATF_300_id : pageAds.ATF_300_id
            }
            lazyload={true}
            sizes={[[300, 250]]}
            width={300}
            height={250}
            removeAdSpan={true}
          />
        </>
      )}

      {/* news18-viral bihar */}
      {RhsBiharNews?.length && <News18Viral data={RhsBiharNews} title={'News18 Virals: Bihar'} readMore={'/news/bihar'} />}

      {/* minuetly video */}
      {/* <h3 style={{ color:'white', padding:'10px 0px' }}>minutely video</h3> */}

      {/* news18-viral rajasthan */}
      {RhsRajasthanNews?.length && <News18Viral data={RhsRajasthanNews} title={'News18 Virals: Rajasthan'} readMore={'/news/rajasthan'}/>}

      {/* BTF_300 adcode */}
      <div className="sideMiddle">
          {pageAds?.BTF_300_id && (
            <>
              <SiteAd
                adUnit={pageAds?.BTF_300_id}
                sizes={[
                  [300, 250],
                  [300, 600],
                ]}
                width={300}
                height={250}
                removeAdSpan={true}
                lazyload={true}
              />
            </>
          )}
        </div>
    </div>
  );
};

export default RhsCommon;
