import { getArticleList } from "api/global/Common";

export const getTagResult = async (
  {
    count = 10,
    offset = 0,
    fields = "",
    filter = {},
    sortOrder = "desc",
    sortBy = "created_at",
  },
  isCSR = false
) => {
  return getArticleList(
    {
      count: count,
      offset: offset,
      fields: fields,
      filter: filter,
      sortOrder: sortOrder,
      sortBy: sortBy,
    },
    isCSR
  );
};
