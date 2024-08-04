Will List Down here all the points on how to integrate ads js and ad loading component and also how to integrate 3rd party js.
Return ads_config json from site.config.js of your project like this:
ads_config: {
    load: true,
    adTimeout: 1000,
    meta: {
        gpt: true, 
        pwt: true, 
        pwtid: '2060', 
        apstag: true, 
        adpushup: true, 
        adpushupid: '43401',
        stopBidding: false,
        customRefresh: false, // optional, use in case adpushup is not included and ads need to refresh by custom code
        refresh_time: 30, // optional
    }
}
1. Use adScriptHelper fn to load ad related js:
    // import loadAds fn like this
    import { loadAds } from "../../../common_react/CommonHelper/adScriptHelper";

    // add below line in scriptManager where pageads is available
    let adsConfig = {...publicRuntimeConfig.ads_config, ...pageAds};

    // call load ads and replace loader(pageAds, false) with below code:
    loadAds(adsConfig);

    // also comment old functions like loadPubmatic or loadAds inside your scriptManager

2. Use SiteAd.js component to render any ad unit

    import getConfig from "next/config";
    const { publicRuntimeConfig } = getConfig();
    import NewSiteAd from "../../../../common_react/CommonSrc/CommonComponents/siteAds/SiteAd";

    const SiteAd = (props) => {
        return (
            <NewSiteAd {...props} extra={publicRuntimeConfig?.ads_config?.meta} language={"punjabi"} />
        )
    }
    export default SiteAd;