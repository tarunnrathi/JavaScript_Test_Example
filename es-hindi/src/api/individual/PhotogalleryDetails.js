import { getArticleList } from "api/global/Common";

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
