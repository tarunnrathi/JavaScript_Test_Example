import React, { useState } from "react";
import siteConfig from "config/site.config";
import { logEvent } from "includes/googleAnalytic";

const BudgetTimeline = ({ timeline, isMobile = false }) => {
  const [jumpToYears, setJumpToYears] = useState(false);

  const timelineYears = [];
  for (let i = 1991; i <= 2022; i++) {
    timelineYears.push(i);
  }

  const handleYearClick = (year) => {
    setJumpToYears(false);
    const clickedElement = document.getElementById(year);
    clickedElement.scrollIntoView({ behavior: "smooth", block: isMobile ? 'center' : 'start' });
  };

  return (
    <>
      <div className="timeline_page">
        <div className="timeline_filter">
          <span
            className="jump_year"
            onClick={() => setJumpToYears((prevState) => !prevState)}
          >
            Jump to Year
          </span>
          <ul className={`jump_year_list ${jumpToYears ? "jump_year_list--open" : ""}`}>
            {timelineYears.map((year) => (
              <li>
                <span className="yr" onClick={() => handleYearClick(year)}>
                  {year}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="tlinelisting">
          {timeline.map((item) => (
            <li id={item.years}>
              <span>{item.years}</span>
              <div className="tlcbox">
                <h3>{item.name}</h3>
                <div className="tlcbox__mobile">
                  <p>{item.description}</p>
                  <div className="share-row">
                    {isMobile
                    ?
                    <a
                      className="arr_redirect"
                      href="javascript:void(0)"
                      onClick={async () => {             
                        const shareData = {
                          title: "",
                          text: `Budget Timeline - ${item?.description}`,
                          url: `${siteConfig.mainUrl}budget/timeline/`,
                        };
                        try {
                          await navigator.share(shareData);
                        } catch (err) {
                          //resultPara.textContent = `Error: ${err}`;
                        }
                        logEvent("ss_wapi","tap","budget-timeline_page");
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
                    :
                    <>
                      <a href={`https://www.facebook.com/sharer.php?u=${siteConfig.mainUrl}budget/timeline/?t=Budget Timeline - ${item?.description}`} target="_blank">
                        <img
                          src="https://static.hindi.news18.com/ibnkhabar/uploads/2020/02/blogs-facebook.png"
                          width="8"
                          height="16"
                        />
                      </a>
                      <a href={`https://twitter.com/intent/tweet?hashtags=Budget Timeline - ${item?.description} &url=${siteConfig.mainUrl}budget/timeline/`} target="_blank">
                        
                        <svg
                          id=""
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13.087"
                          viewBox="0 0 13 13.087">
                            <path id="Path_1" data-name="Path 1" d="M11.413,27.247,16.267,21.7H15.14l-4.247,4.853-3.38-4.767H3.7L8.813,28.98,3.7,34.787H4.827l4.42-5.027L12.8,34.787h3.9M5.26,22.567H6.993L15.14,33.92H13.407" transform="translate(-3.7 -21.7)"/>
                        </svg>

                        
                        {/* <img
                          src="https://images.news18.com/ibnlive/uploads/2019/06/budget_twitter.png"
                          width="16"
                          height="14"
                        /> */}
                      </a>
                      <a href={`https://wa.me/?text=Budget Timeline - ${item?.description}  ${siteConfig.mainUrl}budget/timeline/`} target="_blank">
                        <img
                          src="https://images.news18.com/ibnlive/uploads/2019/06/budget_whatsapp.png"
                          width="16"
                          height="16"
                        />
                      </a>
                    </>
                  }
                  </div>
                </div>
              </div>
              <figure>
                <img
                  src={item.image_url}
                  alt={item.name}
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
      .timeline_filter {
        width: 100%;
        background: #f1f1f1;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 5px #e1261c solid;
        position: relative;
      }
      .jump_year {
        width: 190px;
        height: 36px;
        background: #001d42 0% 0% no-repeat padding-box;
        border-radius: 18px;
        text-align: left;
        color: #ffffff;
        text-transform: uppercase;
        font-size: 13px;
        padding: 0 20px;
        outline: none;
        border: 0;
        background-image: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/dropdown_arrow_1609752439.png);
        background-position: 90%;
        line-height: 36px;
        text-decoration: none;
        cursor:pointer;
      }
      .jump_year_list {
        position: absolute;
        top: 49px;
        background: #001d42 0% 0% no-repeat padding-box;
        width: 190px;
        list-style-type: none;
        border-radius: 5px;
        z-index: 1;
        display: none;
        overflow: auto;
        height: 250px;
      }
      .jump_year_list--open {
        display:block;
      }
      ul.jump_year_list li span {
        color: #fff;
        cursor:pointer;
        display:block;
      }
      .jump_year_list li {
        padding: 7px 10px;
        display: block;
        border-bottom: 1px rgb(255 255 255 / 18%) solid;
      }
      .tlinelisting li .tlcbox .share-row {
        padding-left: 0;
      }
      .tlinelisting {
        border-left: 1px dashed #c4c4c4;
        padding-left: 24px;
        margin-left: 10px;
      }
      .tlinelisting li {
        border-bottom: 1px solid #c4c4c4;
        padding: 30px 0;
        display: flex;
        font-style: italic;
        position: relative;
        margin-left: 70px;
      }
      .tlinelisting li span {
        position: absolute;
        left: -110px;
        width: 90px;
        height: 49px;
        background: url(https://images.news18.com/ibnkhabar/uploads/assets/event/common/images/year_bg_1609602933.png);
        line-height: 32px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        font-style: normal;
        background-size: cover;
      }
      .tlinelisting li figure {
        flex-basis: 160px;
        flex-shrink: 0;
        height: 160px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        padding: 5px;
      }
      .tlinelisting li figure img {
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 0px 2px 5px 0px rgb(0 0 0 / 8%);
        -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
        border-radius: 100%;
        width: 100%;
        border: 1px solid #eee;
        height: 100%;
        display: block;
      }
      .tlinelisting li .tlcbox {
        font-size: 16px;
        color: #464646;
        line-height: 26px;
        padding-right: 30px;
      }
      .tlinelisting li .tlcbox h3 {
        font-size: 22px;
        color: #001d42;
        padding-bottom: 10px;
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
        .timeline_page {
          width: 100%;
          padding: 0 10px;
        }

        .timeline_filter {
          height: 52px;
        }

        .tlinelisting {
          padding-left: 34px;
          margin-left: 5px;
        }

        .tlinelisting li {
          padding: 15px 0;
          margin-left: 18px;
        }

        .tlinelisting li span {
          left: -62px;
          width: 55px;
          height: 31px;
          line-height: 20px;
          font-size: 12px;
        }

        .tlinelisting li figure {
          border: 1px solid #eee;
          width: 80px;
          position: absolute;
          right: 0px;
          top: 16px;
          height: 80px;
          margin-right: unset;
          padding: unset;
        }
        
        .tlinelisting li figure img {
          width: 80px;
        }

        .tlinelisting li .tlcbox {
          font-size: 14px;
          line-height: 22px;
          padding-right: unset;
        }

        .tlinelisting li .tlcbox h3 {
          color: #001d42;
          padding-bottom: unset;
        }
        
        .tlinelisting li .tlcbox .share-row {
          padding-left: 0;
          padding-bottom: 20px;
          padding-top: 20px;
        }
        .share-row {
          padding-left: 10px;
        }
        .share-row a {
          margin-right: 25px;
        }
        .share-row a:last-child {
          margin-right: unset;
        }
        .tlcbox__mobile{
          display: flex;
          flex-direction: column-reverse;
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

export default BudgetTimeline;
