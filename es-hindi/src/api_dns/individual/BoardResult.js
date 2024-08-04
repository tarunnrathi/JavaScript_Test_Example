import { URL } from "api/Constant";
import fetchUtility from "api_dns/sFetchUtility";
export const getBoardResults = async (urlParam) => {
  if (urlParam !== undefined && urlParam?.board !== "") {
    if (
      urlParam?.board?.includes("10") ||
      urlParam?.board?.includes("12") ||
      urlParam?.board?.includes("11") ||
      urlParam?.board?.includes("SSC") ||
      urlParam?.board?.includes("HSC") ||
      urlParam?.board?.includes("Plus Two") ||
      urlParam?.board?.includes("Inter 1st Year") ||
      urlParam?.board?.includes("Inter 2nd Year") 
    ) {
      // individual class data for a board
      const baseURL = URL.getURL(URL.GET_BOARD_DATA);
      const data = await fetchUtility(
        `${baseURL}?id=${urlParam?.board}&optionFilter={"source":"questionnaire","filter":{"type_id":"${urlParam?.board}"},"fields":"*"}`
      );
      return data;
    } else {
      // individual Board data
      const baseURL = URL.getURL(URL.GET_BOARD_DATA);
      const data = await fetchUtility(
        `${baseURL}?id=${urlParam?.board}&optionFilter={"source":"questionnaire","filter":{"type_id":"${urlParam?.board}"},"fields":"*"}`
      );
      return data;
    }
  } else {
    const baseURL = URL.getURL(URL.GET_BOARD_LIST);
    const data = await fetchUtility(`${baseURL}?fields=*&filter={"parent":""}`);
    return data;
  }
};