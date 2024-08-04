import { CONST_CAT_PAGE } from "api/Constant";
import { getArticleList, getPriorityData } from "api_dns/global/Common";

export const getTopPriorityData = async (section, subSection, count ,isMobile=false) => {
  section = section && section !== "undefined" ? section : "";
  subSection = subSection && subSection !== "undefined" ? subSection : "";
  
  const filter =
    !section && !subSection
      ? { post_type: "photogallery" }
      : section && !subSection
      ? { "categories.slug": section, post_type: "photogallery" }
      : {
          "categories.slug": section ? section : "category",
          "subsection.slug": subSection ? subSection : "photogallery",
          post_type: "photogallery",
        };
  const data = await getPriorityData({
    filter,
    count,
    section: section ? section : "category",
    subSection: subSection ? subSection : "photogallery",
    fields: "headline,images,display_headline,weburl_r,weburl,categories",
  });
  data.map((element) => {
    return Object.assign(element, {
      section: section
        ? CONST_CAT_PAGE.SECTION_LIST_TR[section] || ""
        : element?.categories?.[0]?.name || "",
    });
  });
  const topRecord = data.slice(0, isMobile?5:4);
  const bottomRecord = data.slice(isMobile?5:4, 10);
  return { topRecord, bottomRecord } || {};
};

export const getBottomStoriesList = async (
  section = "",
  offset = 0,
  pageLimit,
  isCSR = false
) => {
  const data = await getArticleList(
    {
      filter: section
        ? { "categories.slug": section, post_type: "photogallery" }
        : { post_type: "photogallery" },
      fields: "headline,images,display_headline,weburl,weburl_r",
      offset,
      pageLimit,
    },
    isCSR
  );
  return data || [];
};
