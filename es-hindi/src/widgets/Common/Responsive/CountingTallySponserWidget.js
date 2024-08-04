import React from "react";
import SiteAd from "widgets/Common/Responsive/SiteAd";

const CountingTallySponserWidget = (props) => {
    const width = props.isMobile ? 360 : 1244;
    const height = props.isMobile ? 50 : 60;
    const adUnit = props.isMobile ? 'NW18_HIND_PWA/NW18_HIND_Election_PWA/NW18_HIND_Election_EXITPOLL_PWA/NW18_HIND_ELECT_PWA_SPONSOR_TOP_STRIP_360x50' : 'NW18_HIND_Desktop/NW18_HIND_Election/NW18_HIND_Election_EXITPOLL/NW18_HIND_ELECT_SPONSOR_TOP_STRIP_1244x60';
    const slotId = props.isMobile ? 'NW18_HIND_ELECT_EXTPOL_PWA_ROS_ATF_LOGO' : 'NW18_HIND_ELECT_HOM_ATF_LOGO';
    return (
        <>
            <div className="home_strip_ad counting_tally">
                <SiteAd
                    slotId={slotId}
                    adUnit={adUnit}
                    sizes={[[width, height]]}
                    width={width}
                    height={height}
                    removeAdSpan={true}lazyload={true}

                />
            </div>
            <style jsx global>
            {
               `.home_strip_ad {
                    background: #e5e3e3;
                    max-width: 1244px;
                    height: 60px;
                    margin-bottom: 1px;
                    margin: auto;
                    margin-top: 10px;
                    text-align: center;
                }`
            }
            </style>
        </>
    );
};
export default CountingTallySponserWidget;
