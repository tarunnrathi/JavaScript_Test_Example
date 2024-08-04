import { DOMAIN_URL, IPL_AUCTION_TEAMS_META } from "constant/global/Constant";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const getCompleteURL = (relativePath, completePath, isAmp = false) =>  {
    const amp = isAmp ? 'amp/' : '';
    return relativePath ? publicRuntimeConfig.siteUrl+amp+relativePath.replace(/^\//g, '') : completePath;
}

export const getRelativeURL = (isAmp = false, url) => url?.replace(DOMAIN_URL, publicRuntimeConfig.siteUrl + `${isAmp ? "amp/" : ""}`);

export const getCategoryExist = (availableCat, catForFloating) =>  {
    return availableCat?.filter(item => catForFloating.find(cI => cI === item.slug)).length
}

export const getFilterMenu = (data, isMobile, isAMP) =>  {
    let filteredData = [];
    if(isMobile) {
        filteredData = data?.filter(item => item.mobile === 1);
    }
    if(isAMP) {
        filteredData = data?.filter(item => item.amp === 1);
    }
    return filteredData || [];
}

export const getMeta = (item) => {
    const data = item ? IPL_AUCTION_TEAMS_META[item] : IPL_AUCTION_TEAMS_META['home'];
    if(data) {
        return data;
    } else {
        return IPL_AUCTION_TEAMS_META['home'];
    }
}

export const getNumberFormatter = (value) => {
    let result = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return result;
}