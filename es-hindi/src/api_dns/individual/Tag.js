import { getArticleList } from "api_dns/global/Common";

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

export const getTopPriorityStories = async ({
  count = 10,
  offset = 0,
  fields = "*",
  filter = {},
  sortOrder = "desc",
  sortBy = "created_at",
}) => {
  return getArticleList({
    count: count,
    offset: offset,
    fields: fields,
    filter: filter,
    sortOrder: sortOrder,
    sortBy: sortBy,
  });
};

export const getTopStories = async ({
  count = 10,
  offset = 0,
  fields = "*",
  filter = {},
  sortOrder = "desc",
  sortBy = "created_at",
}) => {
  return getArticleList({
    count: count,
    offset: offset,
    fields: fields,
    filter: filter,
    sortOrder: sortOrder,
    sortBy: sortBy,
  });
};

export const getPhotoStories = async ({
  count = 10,
  offset = 0,
  fields = "*",
  filter = {},
  sortOrder = "desc",
  sortBy = "created_at",
}) => {
  return getArticleList({
    count: count,
    offset: offset,
    fields: fields,
    filter: filter,
    sortOrder: sortOrder,
    sortBy: sortBy,
  });
};
