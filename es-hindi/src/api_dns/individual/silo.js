import { URL, REDIS_KEYS } from "api/Constant";
import fetchUtility from "../sFetchUtility";

export const getSiloById = async (id) => {
  const baseURL = URL.getURL(URL.GET_SILO_ID);
  return await fetchUtility(`${baseURL}?id=${id}`);
};

export const getSiloList = async (id) => {
  const categoryList = await fetchUtility(
    URL.GET_REDIS + "?allow_prefix=false&key=" + REDIS_KEYS.SILO_CATEGORY,
  );
  if (
    categoryList &&
    categoryList["silo-categories"] &&
    categoryList["silo-categories"].length
  ) {
    const siloListing = {};
    const baseUrl = URL.getURL(URL.GET_SILO_LIST);
    for (var i of categoryList["silo-categories"]) {
      const catData = await fetchUtility(
        `${baseUrl}?filter={"categories.slug":"${i.slug}"}&fields=meta_description,meta_headline,meta_keyword,meta_titile,title,weburl,children`,
      );
      if (catData?.length > 0) siloListing[i.name] = catData;
    }
    return siloListing;
  }
  // const baseURL = URL.getURL(URL.GET_SILO_LIST);
  return [];
};
