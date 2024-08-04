import categoryHelper from "includes/category.helper";
import React, { useMemo } from "react";

const SubMenus = (props) => {
  const { getSectionName, isAmp, category, subCategory } = useMemo(
    () => props,
    [props],
  );
  let data = [];
  if (category === "entertainment") {
    data = categoryHelper.manoranjanTopUrlArray();
  } else {
    const getCategoryTopSliderAndBottomBoxList = subCategory
      ? categoryHelper.getCategoryTopSliderAndBottomBoxList(subCategory)
      : categoryHelper.getCategoryTopSliderAndBottomBoxList(category);
    if (getCategoryTopSliderAndBottomBoxList !== undefined) {
      data = getCategoryTopSliderAndBottomBoxList.topSliderUrl;
    }
  }

  const getURL = (slug) =>
    isAmp && !(slug.indexOf("photogallery") > -1 || slug.indexOf("videos") > -1 || slug.indexOf("cricketnext") > -1 || slug.indexOf("web-stories") > -1)
      ? "/amp" + slug
      : slug;

  return (
    <>
      {data?.length > 0 && (
        <div className="subSection">
          <h2 className="subSection_heading">{getSectionName}</h2>
          <ul className="list">
            {data.map((topNews, key) => (
              <li key={key}>
                <a href={getURL(topNews.slug)}>{topNews.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx global>{`
            .subSection {
                position: relative;
                clear: both;
                height: 38px;
              }
              .subSection .subSection_heading {
                background: #828282;
              }
              .subSection .subSection_heading {
                  height: 38px;
                  line-height: 38px;
                  display: block;
                  padding: 0 16px;
                  margin-right: 16px;
                  font-size: 12px;
                  color: #fff;
                  font-weight: 700;
                  float: left;
                  position: relative;
              }
              .subSection .list {
                overflow: scroll;
                display: flex;
                -webkit-box-pack: start;
                justify-content: flex-start;
              }
              .subSection .list li a {
                height: 36px;
                line-height: 35px;
                display: block;
                padding: 0 4px;
                margin: 0 4px;
                font-size: 14px;
                color: #757575;
              }
              .subSection .list li {
                -webkit-flex-shrink: 0;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                subSection}
          `}</style>
    </>
  );
};

export default SubMenus;
