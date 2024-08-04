import { URL } from "api/Constant";
import fetchUtility from "includes/sFetchUtility";

export const getWebstoryDataByCategory = async (
  filter = {},
  offset = 0,
  count = 12,
  isCSR = false
) => {
  const baseURL = URL.getURL(URL.GET_WEBSTORY, isCSR);
  console.log(
    `${baseURL}?count=${count}&offset=${offset}&fields=*&filter=` +
      JSON.stringify(filter)
  );
  return await fetchUtility(
    `${baseURL}?count=${count}&offset=${offset}&fields=*&filter=` +
      JSON.stringify(filter)
  );
};

export const getWebstoryData = async (isCsr = false) => {
  const baseURL = URL.getURL(URL.GET_WEBSTORY_CATEGORY, isCsr);
  return await fetchUtility(
      `${baseURL}?count=10&offset=0&fields=menuArr`
  );
};