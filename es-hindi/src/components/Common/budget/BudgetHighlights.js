import React from "react";
import siteConfig from "config/site.config";
import { logEvent } from "includes/googleAnalytic";

const BudgetHighlights = ({
  highlights,
  filter,
  isMobile = false,
  eventSwitches = {},
  hasLayout = true,
}) => {
  const { budget_microsite_live = false } = eventSwitches || {};
  const set_filtertag_hightlight_type =
    filter && filter === "cheaper"
      ? "down"
      : filter && filter === "dearer"
      ? "up"
      : "";
  const set_filter_cd =
    filter && filter === "cheaper"
      ? true
      : filter && filter === "dearer"
      ? true
      : false;
  const set_filtertag = filter && set_filter_cd ? false : filter ? true : false;
  const set_filtertag_industry_type = set_filtertag ? filter.toLowerCase() : "";

  let AllFilterActiveClass,
    cheaperFilterActiveClass,
    dearerFilterActiveClass = "";
  cheaperFilterActiveClass =
    filter && filter === "cheaper" ? "cheaper_active" : "";
  dearerFilterActiveClass =
    filter && filter === "dearer" ? "cheaper_active" : "";
  AllFilterActiveClass =
    filter && filter === "dearer"
      ? ""
      : filter && filter === "cheaper"
      ? ""
      : "cheaper_active";

  const filteredData = highlights.filter(function (currentElement) {
    return set_filtertag_hightlight_type
      ? currentElement.highlightstypes === set_filtertag_hightlight_type
      : set_filtertag_industry_type
      ? currentElement.industry_eng === set_filtertag_industry_type
      : currentElement;
  });

  const tagKeys = [];
  highlights.forEach((element) => {
    if (!tagKeys.find((data) => data.industry_eng === element.industry_eng)) {
      tagKeys.push(element);
    }
  });

  return (
    <>
      <div className="hightlights_page">
        {filteredData.map((item, index) => {
          let ClassName = "";
          let budgetTypeImage =
            "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/cheaper_dearer_1609614115.png";
          if (item["highlightstypes"] === "up") {
            if (item["image_url"] && item["imagetype"] === "small") {
              ClassName = "high_price";
            } else if (item["image_url"] && item["imagetype"] === "big") {
              ClassName = "high_price largephoto";
            } else {
              ClassName = "high_price";
            }
          } else if (item["highlightstypes"] === "down") {
            if (item["image_url"] && item["imagetype"] === "small") {
              ClassName = "low_price";
            } else if (item["image_url"] && item["imagetype"] === "big") {
              ClassName = "low_price largephoto";
            } else {
              ClassName = "low_price";
            }
          } else {
            if (item["image_url"] && item["imagetype"] === "big") {
              ClassName = "largephoto";
            }
            budgetTypeImage =
              "https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/budget_highlight_1609613731.png";
          }

          return set_filter_cd &&
            set_filtertag_hightlight_type === item.highlightstypes ? (
            <div
              className={`hight-light-row ${ClassName} budget-div show`}
              rell={item.industry}
              id={"budget-" + index}
              rel={`/budget/highlights/`}
              title={item.headline}
            >
              <div className="top_row">
                <h3 className="box_title">{item.industry}</h3>
                <div className="share-row">
                  {isMobile ? (
                    <a
                      className="arr_redirect"
                      href="javascript:void(0)"
                      onClick={async () => {
                        const shareData = {
                          title: "",
                          text: `Budget Highlights - ${item.headline}`,
                          url: `${siteConfig.mainUrl}budget/highlights/`,
                        };
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          //resultPara.textContent = `Error: ${err}`;
                        }
                        logEvent("ss_wapi", "tap", "budget-highlights_page");
                      }}
                    >
                      <svg
                        id=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                      </svg>
                    </a>
                  ) : (
                    <>
                      <a
                        href={`https://www.facebook.com/sharer.php?u=${siteConfig.mainUrl}budget/highlights/&t=${item.headline}`}
                        target="_blank"
                      >
                        <img
                          src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                          width="8"
                          height="16"
                        />
                      </a>
                      <a
                        href={`http://twitter.com/share?text=${item.headline}&url=${siteConfig.mainUrl}budget/highlights/&t=${item.headline}`}
                        target="_blank"
                      >
                        <svg
                          id=""
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13.087"
                          viewBox="0 0 13 13.087"
                        >
                          <path
                            id="Path_1"
                            data-name="Path 1"
                            d="M11.413,27.247,16.267,21.7H15.14l-4.247,4.853-3.38-4.767H3.7L8.813,28.98,3.7,34.787H4.827l4.42-5.027L12.8,34.787h3.9M5.26,22.567H6.993L15.14,33.92H13.407"
                            transform="translate(-3.7 -21.7)"
                          />
                        </svg>

                        {/* <img
                      src="https://images.news18.com/ibnlive/uploads/2019/06/budget_twitter.png"
                      width="16"
                      height="14"
                    /> */}
                      </a>
                      <a
                        href={`https://wa.me/?text=${item.headline}-${siteConfig.mainUrl}budget/highlights/`}
                        target="_blank"
                      >
                        <img
                          src="https://images.news18.com/ibnlive/uploads/2019/06/budget_whatsapp.png"
                          width="16"
                          height="16"
                        />
                      </a>
                    </>
                  )}
                </div>
              </div>
              <h3 className="high_title">
                <a href={item.story_url} target="_blank">
                  {item.headline}
                </a>
              </h3>
              <div className="img_content">
                {item.image_url ? (
                  <div className="hight_img">
                    <img
                      src={item.image_url}
                      alt={item.headline}
                      title={item.title}
                      max-width={"760px"}
                      max-height={"auto"}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="hight_content">
                  <p>
                    <a href={`${item.story_url}?hasLayout=${hasLayout}`}>
                      {item.description}
                    </a>
                  </p>
                </div>
                <i className="high_sign">
                  <img src={budgetTypeImage} alt="Budget Highlight" />
                </i>
              </div>
              {hasLayout && (
                <div className="filter_by">
                  <div className="filter_by_top">
                    <p className="filter_title">फिल्टर करें</p>
                    <a href="/budget/highlights/">
                      <i className="clear_filter">क्लियर ऑल फिल्टर</i>
                    </a>
                  </div>
                  <div className="filter_option">
                    <p className="filter_left">हाइलाइट्स</p>
                    <div className="filter_right">
                      <ul className="filter_click">
                        <li id="ALL" className={filter ? "" : "active"}>
                          <a href="/budget/highlights/">हाइलाइट्स</a>
                        </li>
                        {tagKeys.map((itm) => {
                          return (
                            <li
                              key={itm.industry_eng}
                              id={itm.industry_eng}
                              className={
                                filter === itm.industry_eng ? "active" : ""
                              }
                            >
                              <a
                                href={`/budget/highlights/${itm.industry_eng}/`}
                              >
                                {" "}
                                {itm.industry}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="filter_option">
                    <p className="filter_left">सस्ता/महंगा</p>
                    <div className="filter_right">
                      <ul className="filter_click">
                        <li className={AllFilterActiveClass}>
                          <a href="/budget/highlights/">सस्ता/महंगा</a>
                        </li>
                        <li className={cheaperFilterActiveClass}>
                          <a href="/budget/highlights/cheaper/">सस्ता</a>
                        </li>
                        <li className={dearerFilterActiveClass}>
                          <a href="/budget/highlights/dearer/">महंगा</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`hight-light-row ${ClassName} budget-div show`}
              rell={item.industry}
              id={"budget-" + index}
              rel={`/budget/highlights/`}
              title={item.headline}
            >
              <div className="top_row">
                <h3 className="box_title">{item.industry}</h3>
                <div className="share-row">
                  {isMobile ? (
                    <a
                      className="arr_redirect"
                      href="javascript:void(0)"
                      onClick={async () => {
                        const shareData = {
                          title: "",
                          text: `Budget Highlights - ${item.headline}`,
                          url: `${siteConfig.mainUrl}budget/highlights/`,
                        };
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          //resultPara.textContent = `Error: ${err}`;
                        }
                        logEvent("ss_wapi", "tap", "budget-highlights_page");
                      }}
                    >
                      <svg
                        id=""
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="25"
                        viewBox="0 0 32 32"
                      >
                        <path d="M31.766 12.463c-1.256 1.022-2.516 2.037-3.772 3.063-3.606 2.947-7.212 5.894-10.819 8.844-0.047 0.038-0.094 0.072-0.147 0.109-0.081-0.1-0.041-0.206-0.041-0.3-0.003-2.278-0.003-4.556 0-6.838 0-0.203-0.003-0.303-0.272-0.278-6.334 0.6-11.053 3.663-14.022 9.297-0.859 1.634-1.484 3.391-2.225 5.088-0.037 0.087-0.003 0.256-0.188 0.241 0-0.041 0-0.081 0-0.122 0.103-0.091 0.059-0.209 0.059-0.319 0.003-2.059 0.003-4.119 0.003-6.178 0-0.097 0.044-0.209-0.063-0.284 0-0.247 0-0.494 0-0.741 0.1-0.031 0.059-0.119 0.069-0.181 0.066-0.497 0.1-1.003 0.197-1.494 1.066-5.541 4.069-9.697 8.984-12.453 2.219-1.244 4.622-1.922 7.166-2.088 0.15-0.009 0.291 0.016 0.291-0.234-0.012-2.422-0.009-4.847-0.012-7.269 0.022 0 0.041 0 0.063 0 0.006 0.097 0.1 0.119 0.156 0.166 4.803 3.916 9.606 7.825 14.409 11.741 0.072 0.056 0.2 0.091 0.163 0.231z"></path>
                      </svg>
                    </a>
                  ) : (
                    <>
                      <a
                        href={`https://www.facebook.com/sharer.php?u=${siteConfig.mainUrl}budget/highlights/&t=${item.headline}`}
                        target="_blank"
                      >
                        <img
                          src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                          width="8"
                          height="16"
                        />
                      </a>
                      <a
                        href={`http://twitter.com/share?text=${item.headline}&url=${siteConfig.mainUrl}budget/highlights/&t=${item.headline}`}
                        target="_blank"
                      >
                        <svg
                          id=""
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13.087"
                          viewBox="0 0 13 13.087"
                        >
                          <path
                            id="Path_1"
                            data-name="Path 1"
                            d="M11.413,27.247,16.267,21.7H15.14l-4.247,4.853-3.38-4.767H3.7L8.813,28.98,3.7,34.787H4.827l4.42-5.027L12.8,34.787h3.9M5.26,22.567H6.993L15.14,33.92H13.407"
                            transform="translate(-3.7 -21.7)"
                          />
                        </svg>

                        {/* <img
                      src="https://images.news18.com/ibnlive/uploads/2019/06/budget_twitter.png"
                      width="16"
                      height="14"
                    /> */}
                      </a>
                      <a
                        href={`https://wa.me/?text=${item.headline}-${siteConfig.mainUrl}budget/highlights/`}
                        target="_blank"
                      >
                        <img
                          src="https://images.news18.com/ibnlive/uploads/2019/06/budget_whatsapp.png"
                          width="16"
                          height="16"
                        />
                      </a>
                    </>
                  )}
                </div>
              </div>
              <h3 className="high_title">
                <a href={item.story_url} target="_blank">
                  {item.headline}
                </a>
              </h3>
              <div className="img_content">
                {item.image_url ? (
                  <div className="hight_img">
                    <img
                      src={item.image_url}
                      alt={item.headline}
                      title={item.title}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="hight_content">
                  <p>
                    <a href={`${item.story_url}?hasLayout=${hasLayout}`}>
                      {item.description}
                    </a>
                  </p>
                </div>
                <i className="high_sign">
                  <img src={budgetTypeImage} alt="Budget Highlight" />
                </i>
              </div>
              {hasLayout && (
                <div className="filter_by">
                  <div className="filter_by_top">
                    <p className="filter_title">फिल्टर करें</p>
                    <a href="/budget/highlights/">
                      <i className="clear_filter">क्लियर ऑल फिल्टर</i>
                    </a>
                  </div>
                  <div className="filter_option">
                    <p className="filter_left">हाइलाइट्स</p>
                    <div className="filter_right">
                      <ul className="filter_click">
                        <li id="ALL" className={filter ? "" : "active"}>
                          <a href="/budget/highlights/">हाइलाइट्स</a>
                        </li>
                        {tagKeys.map((itm) => {
                          return (
                            <li
                              key={itm.industry_eng}
                              id={itm.industry_eng}
                              className={
                                filter === itm.industry_eng ? "active" : ""
                              }
                            >
                              <a
                                href={`/budget/highlights/${itm.industry_eng}/`}
                              >
                                {" "}
                                {itm.industry}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="filter_option">
                    <p className="filter_left">सस्ता/महंगा</p>
                    <div className="filter_right">
                      <ul className="filter_click">
                        <li className={AllFilterActiveClass}>
                          <a href="/budget/highlights/">सस्ता/महंगा</a>
                        </li>
                        <li className={cheaperFilterActiveClass}>
                          <a href="/budget/highlights/cheaper/">सस्ता</a>
                        </li>
                        <li className={dearerFilterActiveClass}>
                          <a href="/budget/highlights/dearer/">महंगा</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        .hight-light-row,
        .img_content {
          border-bottom: 1px solid #c4c4c4;
          position: relative;
        }
        .box_title,
        .clear_filter,
        .filter_left,
        .filter_title {
          text-transform: uppercase;
        }
        .clear_filter,
        .filter_left,
        .high_title,
        .hight-light-row,
        .img_content {
          position: relative;
        }
        .hight-light-row {
          width: 100%;
          background: no-repeat padding-box #f1f1f1;
          border-top: 6px solid #001d42;
          padding-top: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
        }
        .box_title,
        ul.filter_click li.active {
          background: no-repeat padding-box #001d42;
          color: #fff;
        }
        .hight-light-row.low_price .box_title {
          background: #037500;
        }
        .hight-light-row.low_price .high_title {
          color: #037500;
          padding: 6px 20px 15px 70px;
        }
        .hight-light-row.low_price .high_title a {
          color: #037500;
        }
        i.high_sign {
          position: absolute;
          right: 20px;
          bottom: -9px;
        }
        .high_title {
          font-size: 24px;
          line-height: 36px;
          font-weight: 700;
          padding: 6px 0 15px 20px;
          margin-top: 10px;
        }
        .high_title a {
          color: #111;
        }
        .hight-light-row.low_price .high_title:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/rupee_cheaper_1609605316.png);
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          left: 20px;
          top: 2px;
        }
        .hight-light-row.high_price .high_title {
          color: #e1261c;
          padding: 6px 0 15px 70px;
        }
        .hight-light-row.high_price .high_title a {
          color: #e1261c;
        }
        .hight-light-row.high_price .box_title {
          background: #e1261c;
        }
        .hight-light-row.high_price .high_title:after {
          background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/rupee_dearer_1609605603.png);
          content: "";
          width: 40px;
          height: 40px;
          position: absolute;
          left: 20px;
          top: 2px;
        }
        .hight-light-row .img_content .hight_img {
          text-align: center;
          height: auto;
          max-width: 100%;
          margin-bottom: 20px;
        }
        .hight-light-row.largephoto .img_content .hight_img img, .hight-light-row .img_content .hight_img img{max-width: 100%; max-height: 100%;}
        .top_row {
          display: flex;
          justify-content: space-between;
        }
        .box_title {
          height: 32px;
          overflow: hidden;
          border-radius: 0 5px 5px 0;
          display: inline-block;
          line-height: 36px;
          padding: 0 20px;
          font-size: 16px;
        }
        .share-row {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          padding-left: 20px;
          padding-top: 10px;
        }
        .share-row a {
          margin-right: 35px;
        }
        .share-row a:last-child {
          margin-right: 20px;
        }
        .img_content {
          align-items: end;
          padding: 0 20px 20px;
          margin-bottom: 20px;
        }
        .hight_content {
          color: #464646;
          font-size: 15px;
          line-height: 28px;
          width: 100%;
          margin-top: -5px;
        }
        .clear_filter,
        .filter_title,
        ul.filter_click li {
          letter-spacing: 0;
          font-size: 13px;
        }
        .filter_by {
          width: 100%;
        }
        .filter_by_top {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed #c4c4c4;
          width: calc(100% - 40px);
          margin: auto auto 15px;
          padding: 5px 0;
        }
        .filter_title {
          color: #e1261c;
          font-weight: 700;
          line-height: 18px;
        }
        .clear_filter {
          color: #565656;
          font-style: normal;
          cursor: pointer;
        }
        .clear_filter:before {
          transform: rotate(45deg);
        }
        .clear_filter:after,
        .clear_filter:before {
          position: absolute;
          left: -10px;
          content: " ";
          height: 13px;
          width: 1px;
          background-color: #565656;
          top: 3px;
        }
        .filter_left:after,
        .filter_left:before {
          content: "";
          position: absolute;
          display: block;
        }
        .clear_filter:after {
          transform: rotate(-45deg);
        }
        .filter_option {
          display: flex;
          align-items: baseline;
          padding: 0 20px;
        }
        .filter_left {
          letter-spacing: 0;
          color: #464646;
          font-size: 14px;
          width: 170px;
          padding-left: 19px;
          font-weight: 700;
        }
        .filter_left:before {
          width: 7px;
          height: 2px;
          background: #464646;
          left: 3px;
          top: 7px;
        }
        .filter_left:after {
          border-right: 2px solid #464646;
          border-top: 2px solid #464646;
          width: 4px;
          height: 4px;
          transform: rotate(45deg);
          top: 5px;
          left: 6px;
        }
        .filter_right {
          width: calc(100% - 140px);
        }
        ul.filter_click {
          display: flex;
          flex-wrap: wrap;
          list-style-type: none;
        }
        ul.filter_click li.active {
          border: 1px solid #001d42;
          border-radius: 14px;
          font-weight: 700;
        }
        ul.filter_click li.active a {
          color: #fff;
        }
        ul.filter_click li {
          background: no-repeat padding-box #fff;
          border: 1px solid #ddd;
          border-radius: 14px;
          color: #e1261c;
          line-height: 25px;
          padding: 0 15px;
          margin-bottom: 15px;
          margin-right: 10px;
        }
        ul.filter_click li.cheaper_active {
          background: #e1261c;
          border-radius: 14px;
          color: #fff;
          border: 1px solid #e1261c;
          font-weight: 700;
        }
        ul.filter_click li.cheaper_active a {
          color: #fff;
        }

        @media screen and (max-width: 700px) {
          .hight-light-row {
            margin-bottom: 20px;
            padding-bottom: 0;
          }
          .box_title {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: 14px;
          }
          .share-row a {
            margin: 0 15px;
          }
          .high_title {
            font-size: 18px;
            color: #333;
            line-height: 26px;
            padding: 6px 10px;
            padding-left: 10px;
          }
          .img_content {
            padding: 0;
            margin-bottom: 0;
            border: 0;
          }
          .hight_content {
            font-size: 14px;
            line-height: 22px;
            padding-bottom: 10px;
            margin: unset;
          }
          .hight_content p {
            color: #464646;
            padding: 5px 10px;
          }
          i.high_sign {
            text-align: right;
            width: 100%;
            display: block;
            bottom: -11px;
            right: 10px;
          }
          i.high_sign img {
            width: 175px;
          }
          .filter_by {
            ${budget_microsite_live === "1" ? "" : "display: none;"}
          }
        }
        .arr_redirect {
          background: #ffffff;
          border: 1px solid #c7c7c7;
          border-radius: 24px;
          color: #343a40;
          display: flex;
          float: left;
          line-height: 16px;
          margin: 0;
          position: relative;
          padding: 0;
          text-transform: capitalize;
          text-align: center;
          align-items: center;
          height: 35px;
          min-width: 35px;
          justify-content: center;
          flex-direction: row;
        }
      `}</style>
    </>
  );
};

export default BudgetHighlights;
