import { useState } from "react";
import { getArticleList } from "api/global/Common";

const useLoadMore = (
  latestNewsData,
  pageLimit,
  dataLength,
  queryArr,
  // isIPL = false,
  page = 1,
  pageName = "",
  ignoreArray = [],
) => {
  const fields =
    "story_id,categories,subsection,display_headline,headline,post_type,images,images_all_sizes,movie_rating,youtubeid,local18_video,external_video,weburl,weburl_r,ff_source,gallery,gallery_count,intro,created_at";

  const [firstHit, setFirstHit] = useState(true);  
  const [categoryData, setCategoryData] = useState(latestNewsData);
  const [catPageLimit, setCatPageLimit] = useState(10);
  const hasMoreItems = categoryData.length <= dataLength;
  const [hasMoreData, setHasMoreData] = useState(hasMoreItems);
  // adding 10 for cat page because top priority count
  const catPageOffset =catPageLimit;

  const loadMore = async () => {
    const categoryResult = await getArticleList({
      count: firstHit ? 34 : pageLimit,
      offset: firstHit ? 0 : catPageOffset,
      fields: fields,
      filter: queryArr,
    }, true);
    let newData = categoryResult || [];
    newData = newData.filter(
      (story) => !(ignoreArray || []).includes(story.story_id),
    );
    const newCatData = [...categoryData, ...newData];
    setCategoryData(() => newCatData);
    setHasMoreData(newData?.length >= dataLength);
    setCatPageLimit((prev) => prev + pageLimit);
    setFirstHit(false);
  };

  return { categoryData, hasMoreData, loadMore };
};

export default useLoadMore;
