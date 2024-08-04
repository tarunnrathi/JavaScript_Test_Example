import React, { useState } from "react";
import { getAuthorName } from "api/global/Common";
const AuthorListComponent = ({
  authorList = [],
  tab = "a",
  isMobile = false,
}) => {
  const [visible, setVisible] = useState(48);
  const [newAuthList, setAuthorList] = useState(authorList);
  const authorValidation =
    newAuthList?.slice(0, visible).length < newAuthList.length ? true : false;
  const [isData, setIsData] = useState(authorValidation);
  const [tabId, setTabId] = useState(tab);

  const loadMore = () => {
    setVisible((prev) => prev + 52);
    loadMoreData();
  };

  const tabChangeHandler = async (tabId) => {
    const authorData = await getAuthorName({
      count: 50,
      filter: { starts_with: tabId },
    }, true);
    const authorsListData = authorData || [];
    setTabId(tabId);
    let tabAuthList;
    setAuthorList(() => {
      tabAuthList = [...authorsListData];
      return tabAuthList;
    });
    setVisible(() => 48);
    setIsData(authorsListData?.length < 48 ? false : true);
  };

  const loadMoreData = async () => {
    const result = await getAuthorName({
      count: 50,
      offset: visible + 1,
      filter: { starts_with: tabId },
    }, true);
    setAuthorList((authorlist) => [...authorlist, ...result]);
    setIsData(result.length < 48 ? false : true);
  };

  const tabData = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  return (
    <>
      <div className="sorting">
        {tabData?.map((el) => (
          <React.Fragment key={el}>
            <span
              role="button"
              data-tab={`${el.toLocaleLowerCase()}-tab`}
              className={el === tabId ? "tablinks active" : "tablinks"}
              id="defaultOpen"
              onClick={() => tabChangeHandler(el)}
            >
              {el}
            </span>
          </React.Fragment>
        ))}
      </div>
      {newAuthList && newAuthList.length > 0 ? (
        <ul
          className="topic_listing tabcontent author-list"
          id={`${tab.toLowerCase()}-tab`}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {newAuthList.slice(0, visible).map((data) => {
            const engName = data.english_name;
            const hinName = data.hindi_name ? data.hindi_name : engName;
            const ID = data.id;
            return (
              <li key={data.slug}>
                <a href={`/byline/${data.slug}-${ID}.html`}>{hinName}</a>
              </li>
            );
          })}
        </ul>
      ) : (
        <h4 style={{ textAlign: "center" }}> लेखक नहीं मिला </h4>
      )}
      {isData && (
        <button onClick={loadMore} className="load-more">
          {" "}
          Load More{" "}
        </button>
      )}
      <style jsx global>
        {`
          .sorting {
            display: flex;
            margin-bottom: 20px;
            flex-wrap: wrap;
            position: relative;
          }
          .sorting > span {
            background: #eee;
            border: 1px solid#ccc;
            margin: 2px;
            color: #222;
            text-transform: uppercase;
            display: inline-block;
            text-align: center;
            font-weight: 600;
            box-sizing: border-box;
            cursor: pointer;
            font-size: 14px;
            width: 25px;
            height: 25px;
            line-height: 25px;
          }
          .sorting span.active,
          .sorting span:hover {
            background: #343333;
            color: #fff;
            border: 1px solid #222;
          }
          .topic_listing li a {
            letter-spacing: 0px;
            color: #212121;
            text-decoration: none;
            font-size: 16px;
            display: block;
            font-weight: 500;
          }
          ${!isMobile
            ? `.topic_listing li {border-bottom: 1px dashed #C4C4C4; width: calc(25% - 20px); margin: 0px 20px; padding: 12px 0px; position: relative; }`
            : `li {border-bottom: 1px dashed #C4C4C4; width: calc(50% - 20px); margin: 0px 20px 0px 0px; padding: 12px 0px; position: relative; text-align: left;padding-right: 5px;}`}
          ${!isMobile
            ? `.topic_listing {display: flex; flex-wrap: wrap;margin-bottom: 30px; }`
            : `.topic_listing {display: flex; flex-wrap: wrap;margin-bottom: 30px; padding: 0 10px; }`}
        ${!isMobile
            ? `.topic_listing li:after {content: "";position: absolute;border-right: 1px dashed #C4C4C4;right: 5px;height: 100%;top: 0;}`
            : `li:after {content: "";position: absolute;border-right: 1px dashed #C4C4C4;right: -8px;height: 100%;top: 0;}`}
        li:nth-child(4n+4) {
            margin-right: 0;
          }
          ${!isMobile
            ? `.topic_listing li:nth-child(4n+4):after {display: none; }`
            : `.topic_listing li:nth-child(even):after {display: none; }`}
          ${!isMobile
            ? `.topic_listing li:nth-child(4n+1) {margin-left: 0; }`
            : `.topic_listing li:nth-child(4n+1) {margin-left: 0; }`}
        li a:hover {
            color: #e1261c;
          }
          .load-more {
            width: 130px;
            height: 38px;
            background: #ed1c24;
            border-radius: 19px;
            font-size: 17px;
            color: #ffffff;
            line-height: 38px;
            border: none;
            display: table;
            margin: auto;
            cursor: pointer;
            margin-top: 15px;
          }
        `}
      </style>
    </>
  );
};

export default React.memo(AuthorListComponent);
