import { URL } from "api/Constant";
import fetchUtility from "../sFetchUtility";

export const getWebstoryData = async () => {
    const baseURL = URL.getURL(URL.GET_WEBSTORY_CATEGORY);
    // console.log(`${baseURL}?count=10&offset=0&fields=*`);
    return await fetchUtility(
        `${baseURL}?count=10&offset=0&fields=*`
    );
};

export const getWebstoryDataByCategory = async (filter= {}, offset = 0, count = 12, isCSR=false) => {
    const baseURL = URL.getURL(URL.GET_WEBSTORY, isCSR);
    //console.log(`${baseURL}?count=${count}&offset=${offset}&fields=*&filter=`+JSON.stringify(filter));
    return await fetchUtility(`${baseURL}?count=${count}&offset=${offset}&fields=*&filter=`+JSON.stringify(filter));
};
