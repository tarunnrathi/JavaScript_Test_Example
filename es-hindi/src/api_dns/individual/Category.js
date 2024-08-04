const pages = [
  "knowledge",
  "auto",
  "entertainment",
  "business",
  "tech",
  "states",
  "world",
  "lifestyle",
  "recipe",
  "bollywood",
  "cricket",
  "film-review",
  "bollywood",
  "hollywood",
  "human-stories",
];

export const getSliderforPriority = async (key = "") => {
  const pageFound = pages.find((page) => page == key);
  return pageFound ? true : false;
};

export const storyDivider = async (
  sliderNeed,
  stories = [],
  isMobile = false,
) => {
  let leftCatIndex = 3;
  let rightCatIndex = 7;

  if (isMobile) {
    leftCatIndex = 1;
    rightCatIndex = 9;
  }

  return {
    leftCat: stories.slice(0, leftCatIndex),
    rightCat: stories.slice(leftCatIndex, leftCatIndex + rightCatIndex),
  };
};
