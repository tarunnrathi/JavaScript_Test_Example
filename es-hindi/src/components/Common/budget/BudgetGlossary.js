import React, { useState } from "react";
import SITE_CONfIG from "config/site.config";
import { logEvent } from "includes/googleAnalytic";

const BudgetGlossary = ({
  glossary,
  budgetYear = "2024",
  isMobile = false,
}) => {
  const [searchItems, setSearchItems] = useState([]);

  const handleGlossarySearch = (e) => {
    const searchWord = e.target.value.trim().toLowerCase();
    const filteredItems = glossary.filter((item) =>
      item.headline.toLowerCase().includes(searchWord)
    );
    setSearchItems(filteredItems);
  };

  const handleSearchItemClick = (event, headline) => {
    event.stopPropagation();
    setTimeout(() => {
      const clickedElement = document.getElementById(headline);
      setSearchItems([]);
      clickedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
  };

  const formShareUrlSlug = (str) => {
    if (!str) return "";
    const slug = str
      .replace(/[^a-zA-Z0-9]/g, " ")
      .trim()
      .toLowerCase()
      .replace(/ /g, "-");
    return slug ? slug : str;
  };

  return (
    <>
      <div className="glossary_search">
        <p>
          <span>LOOKING FOR</span> बजट ग्लॉसरी
        </p>
        <div className="search_bar" onMouseLeave={() => setSearchItems([])}>
          <div className="form_fil_d">
            <input
              type="text"
              className="srch_fld"
              placeholder="Search Budget Glossary"
              onChange={handleGlossarySearch}
            />
            <button></button>
            <ul>
              {searchItems &&
                searchItems.length !== 0 &&
                searchItems.map((item, index) => (
                  <li
                    key={index + 1}
                    onClick={(event) =>
                      handleSearchItemClick(event, item?.headline)
                    }
                  >
                    {" "}
                    {item?.headline}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      {glossary &&
        glossary.length !== 0 &&
        glossary.map((item, index) => (
          <div
            className="glossary_box us-div show"
            title={item.headline}
            key={index}
            id={item.headline}
          >
            <h3 className="glossary_box_title">{item.headline}</h3>
            <p>{item.description}</p>
            <div className="share-row">
              {isMobile ? (
                <a
                  className="arr_redirect"
                  href="javascript:void(0)"
                  onClick={async () => {
                    const shareData = {
                      title: "",
                      text: `Budget Glossary ${budgetYear} - ${formShareUrlSlug(
                        item.headline
                      )}`,
                      url: `${SITE_CONfIG.mainUrl}budget/glossary/`,
                    };
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      //resultPara.textContent = `Error: ${err}`;
                    }
                    logEvent("ss_wapi", "tap", "budget-glossary_page");
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
                    href={`https://www.facebook.com/sharer.php?u=${SITE_CONfIG.mainUrl}budget/glossary/?t=Budget Glossary ${budgetYear} - ${item.headline}`}
                    target="_blank"
                  >
                    <img
                      src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                      width="8"
                      height="16"
                      alt="fb_alt"
                    />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?hashtags=Budget Glossary ${budgetYear} - ${formShareUrlSlug(
                      item.headline
                    )}&url=${SITE_CONfIG.mainUrl}budget/glossary/`}
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
                  alt="twitter_alt"
                /> */}
                  </a>
                  <a
                    href={`https://wa.me/?text=Budget Glossary ${budgetYear} - ${formShareUrlSlug(
                      item.headline
                    )} - ${SITE_CONfIG.mainUrl}budget/glossary/`}
                    target="_blank"
                  >
                    <img
                      src="https://images.news18.com/ibnlive/uploads/2019/06/budget_whatsapp.png"
                      width="16"
                      height="16"
                      alt="whatsapp_alt"
                    />
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      <style>{`
      .glossary_search {
        background: #f1f1f1;
        height: 104px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 5px solid #e1261c;
        margin-bottom: 10px;
        padding: 0 30px;
      }
      .glossary_search p span {
        font-weight: 300;
      }
      .glossary_search p {
        color: #464646;
        font-style: italic;
        font-size: 35px;
        opacity: 0.3;
        font-weight: 900;
      }
      .glossary_search .search_bar input {
        height: 40px;
        background: no-repeat padding-box #fff;
        border: 1px solid #ddd;
        padding: 0 10px;
        width: 100%;
      }
      .glossary_search .search_bar {
        width: 415px;
        position: relative;
      }
      .glossary_search .search_bar button {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 0;
        border: 0;
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/search_icon_1609752046.png)
          center no-repeat #e1261c;
        outline: 0;
        cursor: pointer;
      }
      .form_fil_d ul {
        border: 1px solid #ddd;
        position: absolute;
        top: 39px;
        background: #fff;
        left: 0;
        width: 100%;
        max-height: 160px;
        overflow-y: scroll;
        list-style-type: none;
        z-index: 5;
      }
      .form_fil_d ul li {
        position: relative;
        border-bottom: 1px solid #ddd;
        padding: 0 10px;
        color: #858585;
        font: 14px/36px Lato, sans-serif;
        list-style-type: none;
      }
      .glossary_box_title {
        height: 36px;
        background: no-repeat padding-box #001d42;
        border-radius: 0 5px 5px 0;
        display: inline-block;
        color: #ffeb00;
        text-transform: uppercase;
        line-height: 36px;
        font-size: 22px;
        font-style: italic;
        padding: 5px 20px;
        margin-top: 15px;
      }
      .glossary_box {
        width: 100%;
        background: no-repeat padding-box #f1f1f1;
        border-top: 6px solid #001d42;
        margin-bottom: 35px;
        padding-bottom: 20px;
        border-bottom: 1px solid #c4c4c4;
      }
      .glossary_box p {
        font-size: 20px;
        line-height: 34px;
        font-style: italic;
        color: #000;
        padding: 15px 20px;
      }
      .share-row {
        display: flex;
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
      
      @media screen and (max-width: 700px) {
        .glossary_search {
          background: #f1f1f1;
          height: auto;
          display: block;
          justify-content: space-between;
          border-top: 5px solid #e1261c;
          margin: auto auto 10px;
          padding: 12px 15px;
        }
        .glossary_search p {
          font-size: 31px;
          padding-bottom: 4px;
          line-height: 1.3;
        }
        .glossary_search .search_bar {
          width: 100%;
          position: relative;
          display: block;
          top: 0;
          height: auto;
          background: #d6d6d6;
          padding: 15px;
          box-sizing: border-box;
          right: 0;
          z-index: 1;
        }
        
       .glossary_search .search_bar button {
          right: 10px;
        }
        .glossary_box {
          margin-bottom: 20px;
          padding-bottom: 2px;
        }
        .glossary_box_title {
          height: auto;
          line-height: 28px;
          font-size: 18px;
          font-weight:400;
        }
        .glossary_box p {
          font-size: 18px;
          line-height: 26px;
          padding: 10px;
        }
        .share-row {
          padding-left: 10px;
        }
        .share-row a {
          margin-right: 25px;
        }
        
        .form_fil_d ul {
          top:56px;
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

export default BudgetGlossary;
