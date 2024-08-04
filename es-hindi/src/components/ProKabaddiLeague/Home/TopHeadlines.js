import React from "react";
const TopHeadlines = (props) => {
  const { headlines } = props;
  return (
    <>
      <div className="widget-top-stories">
        <h3 className="widget-title">टॉप हेडलाइंस</h3>
        <div className="top-story-div">
          <ul className="top-story-list">
            {headlines?.map((item, index) =>
              <li key={`headline${index}`}>
                <a
                  href={item.weburl_r}
                  title={item?.display_headline}
                >
                  <span className="arrow-svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="#001d42"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      <path fill="none" d="M0 0h24v24H0V0z" />
                    </svg>
                  </span>
                  <span className="list-txt">
                    {item?.display_headline}
                  </span>
                </a>
              </li>
            )}
          </ul>

        </div>
      </div>
    </>
  );
};
export default TopHeadlines;
