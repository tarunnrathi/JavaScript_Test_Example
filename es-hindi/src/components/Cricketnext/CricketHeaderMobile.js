import { useEffect } from "react";
import { IPL_YEAR } from "includes/ipl.helper";

const CricketHeaderMobile = ({
  isIpl,
  crMenu = [],
  isT20,
  isWorldCup,
  pageType,
  isAmp = false,
  activeId,
  mostRunsData,
  mostWickets,
  pointsTableData
}) => {
  const url = isWorldCup ? "/world-cup/" : "/cricket/icc-t20-world-cup/";
  let isDropDown = false;
  if (typeof activeId === "string") isDropDown = true;
  const iplMenuArray = [
    {
      id: 1,
      url: "/cricket/ipl/",
      title: `आईपीएल ${IPL_YEAR}`,
    },
    {
      id: 2,
      url: "/cricket/ipl/match-schedule/",
      title: "मैच शेड्यूल",
    },
    {
      id: 3,
      url: "/cricket/ipl/result/",
      title: "नतीजे",
    },
    {
      id: 4,
      url: "/cricket/ipl/news/",
      title: "न्यूज",
    },
    {
      id: 5,
      url: "/cricket/ipl/photos/",
      title: "फोटो",
    },
    {
      id: 6,
      url: "/cricket/ipl/videos/",
      title: "वीडियो",
    },
    {
      id: 7,
      url: "",
      title: "टीमें",
      teams: [
        {
          id: "team_1",
          url: "/cricket/ipl/royal-challengers-bengaluru-rcb/",
          title: "बैंगलोर",
        },
        {
          id: "team_2",
          url: "/cricket/ipl/kolkata-knight-riders-kkr/",
          title: "कोलकाता",
        },
        {
          id: "team_3",
          url: "/cricket/ipl/punjab-kings-pbks/",
          title: "पंजाब",
        },
        {
          id: "team_4",
          url: "/cricket/ipl/delhi-capitals-dc/",
          title: "दिल्ली",
        },
        {
          id: "team_5",
          url: "/cricket/ipl/mumbai-indians-mi/",
          title: "मुंबई",
        },
        {
          id: "team_6",
          url: "/cricket/ipl/sunrisers-hyderabad-srh/",
          title: "हैदराबाद",
        },
        {
          id: "team_7",
          url: "/cricket/ipl/rajasthan-royals-rr/",
          title: "राजस्थान",
        },
        {
          id: "team_8",
          url: "/cricket/ipl/chennai-super-kings-csk/",
          title: "चेन्नई",
        },
        {
          id: "team_9",
          url: "/cricket/ipl/gujarat-titans-gt/",
          title: "गुजरात",
        },
        {
          id: "team_10",
          url: "/cricket/ipl/lucknow-super-giants-lsg/",
          title: "लखनऊ",
        },
      ],
    },
    {
      id: 8,
      url: "/cricket/ipl/points-table/",
      title: "अंक तालिका",
    },
    {
      id: 9,
      url: "/cricket/ipl/purple-cap-holder/",
      title: "सर्वाधिक विकेट",
    },
    {
      id: 10,
      url: "/cricket/ipl/orange-cap-holder/",
      title: "सर्वाधिक रन",
    },
    {
      id: 11,
      url: "/cricket/ipl/most-sixes/",
      title: "पावरप्ले",
    },
  ];
  useEffect(() => {
    const dropDowns = document.querySelectorAll(".cn-dropdown");
    if (dropDowns) {
      dropDowns.forEach((el) => {
        el.children[0].addEventListener("click", (event) => {
          const sib = event.target.nextElementSibling;
          if (
            !el?.classList.contains("current") &&
            !sib?.classList.contains("current")
          ) {
            event.preventDefault();
            el.classList.add("current");
            sib.classList.add("current");
          } else if (el?.classList.contains("current")) {
            event.preventDefault();
            el.classList.remove("current");
            sib.classList.remove("current");
          }
        });
      });
    }
  }, []);

  return (
    <>
      <div className="CNL1MenuNew" id="CNL1Menu">
        {isT20 || isWorldCup ? (
          <ul>
            <li className="series-navBtn">
              <a href={url}>{isWorldCup ? "WORLD CUP" : "T20 WORLD CUP"}</a>
            </li>
            <li className={activeId === 2 ? "current" : ""}>
              <a
                href={url + "schedule/"}
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Navigation",
                    "Click",
                    "Top Nav - शेड्यूल",
                  )
                }
              >
                शेड्यूल
              </a>
            </li>
            <li className={activeId === 3 ? "current" : ""}>
              <a
                href={url + "results/"}
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - नतीजे")
                }
              >
                नतीजे
              </a>
            </li>
            <li className={activeId === 4 ? "current" : ""}>
              <a
                href={url + "points-table/"}
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Navigation",
                    "Click",
                    "Top Nav - अंक तालिका",
                  )
                }
              >
                अंक तालिका
              </a>
            </li>
            <li className={activeId === 5 ? "current" : ""}>
              <a
                href={url + "news/"}
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - न्यूज")
                }
              >
                न्यूज
              </a>
            </li>
            <li className={activeId === 6 ? "current" : ""}>
              <a
                href={url + "photos/"}
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - फोटो")
                }
              >
                फोटो
              </a>
            </li>
            {(isT20 && mostWickets?.leaderboard?.length > 0)
              ?
              <li className={activeId === 7 ? "current" : ""}>
                <a
                  href={url + "most-wickets/"}
                  onClick={() =>
                    ga(
                      "send",
                      "event",
                      "Navigation",
                      "Click",
                      "Top Nav - सर्वाधिक विकेट",
                    )
                  }
                >
                  सर्वाधिक विकेट
                </a>
              </li>
              : isWorldCup
                ? <li className={activeId === 7 ? "current" : ""}>
                  <a
                    href={url + "most-wickets/"}
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Navigation",
                        "Click",
                        "Top Nav - सर्वाधिक विकेट",
                      )
                    }
                  >
                    सर्वाधिक विकेट
                  </a>
                </li>
                : null}
            {(isT20 && mostRunsData?.leaderboard?.length > 0)
              ?
              <li className={activeId === 8 ? "current" : ""}>
                <a
                  href={url + "most-runs/"}
                  onClick={() =>
                    ga(
                      "send",
                      "event",
                      "Navigation",
                      "Click",
                      "Top Nav - सर्वाधिक रन",
                    )
                  }
                >
                  सर्वाधिक रन
                </a>
              </li>
              : isWorldCup
                ? <li className={activeId === 8 ? "current" : ""}>
                  <a
                    href={url + "most-runs/"}
                    onClick={() =>
                      ga(
                        "send",
                        "event",
                        "Navigation",
                        "Click",
                        "Top Nav - सर्वाधिक रन",
                      )
                    }
                  >
                    सर्वाधिक रन
                  </a>
                </li>
                : null}
          </ul>
        ) : isIpl ? (
          <ul>
            {iplMenuArray.map((menu) => {
              if (menu.teams) {
                return (
                  <li key={menu.id} className="cn-dropdown">
                    <a href="#" className={isDropDown ? "active" : ""}>
                      {menu.title}
                    </a>
                    <div className="drop-inner" style={{ width: "125px" }}>
                      <div className="dropdown-sec" style={{ width: "100%" }}>
                        <ul className="droplist-2">
                          {menu.teams.map((team) => (
                            <li key={team.id}>
                              <a href={team.url}>{team.title}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li
                  key={menu.id}
                  className={activeId === menu.id ? "series-navBtn" : ""}
                >
                  <a href={menu.url}>{menu.title}</a>
                </li>
              );
            })}
          </ul>
        ) : isWorldCup && (
          <ul>
            <li>
              <a
                href="/cricket/match-schedule/"
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Navigation",
                    "Click",
                    "Top Nav - शेड्यूल",
                  )
                }
              >
                शेड्यूल
              </a>
            </li>
            <li>
              <a
                href="/cricket/live-score/"
                onClick={() =>
                  ga(
                    "send",
                    "event",
                    "Navigation",
                    "Click",
                    "Top Nav - लाइव स्कोर",
                  )
                }
              >
                लाइव स्कोर
              </a>
            </li>
            <li>
              <a
                href="/cricket/result/"
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - नतीजे")
                }
              >
                नतीजे
              </a>
            </li>
            {!isAmp && (
              <li className="cn-dropdown ">
                <a
                  onClick={() =>
                    ga(
                      "send",
                      "event",
                      "Navigation",
                      "Click",
                      "Top Nav - रैंकिंग",
                    )
                  }
                >
                  रैंकिंग
                </a>
                <div id="rankingBtn" className="drop-inner">
                  <div className="dropdown-sec">
                    <ul className="droplist-2 cnTabContent RankingInternational">
                      <li>
                        <a href="/cricket/test-ranking.html">टेस्ट</a>
                      </li>
                      <li className="active2">
                        <a href="/cricket/odi-ranking.html">वनडे</a>
                      </li>
                      <li>
                        <a href="/cricket/t20-ranking.html">टी20</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            )}
            <li className={pageType == "news" ? "CNL1Menu_active" : ""}>
              <a
                href="/cricket/news/"
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - न्यूज")
                }
              >
                न्यूज
              </a>
            </li>
            <li className={pageType == "photo" ? "CNL1Menu_active" : ""}>
              <a
                href="/cricket/photos/"
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - फोटो")
                }
              >
                फोटो
              </a>
            </li>
            <li className={pageType == "video" ? "CNL1Menu_active" : ""}>
              <a
                href="/cricket/videos/"
                onClick={() =>
                  ga("send", "event", "Navigation", "Click", "Top Nav - India")
                }
              >
                वीडियो
              </a>
            </li>
            {!isAmp && (
              <li className="cn-dropdown ">
                <a
                  onClick={() =>
                    ga(
                      "send",
                      "event",
                      "Navigation",
                      "Click",
                      "Top Nav - टीमें",
                    )
                  }
                >
                  टीमें
                </a>
                <div id="teamsBtn" className="drop-inner">
                  <div className="dropdown-sec">
                    <ul className="droplist-2 cnTabContent TeamInternational">
                      <li>
                        <a href="/cricket/teams/australia-squad-1.html">
                          ऑस्ट्रेलिया
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/bangladesh-squad-2.html">
                          बांग्लादेश
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/england-squad-3.html">
                          इंग्लैंड
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/india-squad-4.html">भारत</a>
                      </li>
                      <li>
                        <a href="/cricket/teams/new-zealand-squad-5.html">
                          न्यूजीलैंड
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/pakistan-squad-6.html">
                          पाकिस्तान
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/south-africa-squad-7.html">
                          दक्षिण अफ्रीका
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/sri-lanka-squad-8.html">
                          श्रीलंका
                        </a>
                      </li>
                      {/* <li>
                        <a href="/cricket/teams/west-indies-squad-9.html">
                          वेस्टइंडीज
                        </a>
                      </li> */}
                      <li>
                        <a href="/cricket/teams/netherlands-squad-15.html">
                          नीदरलैंड
                        </a>
                      </li>
                      <li>
                        <a href="/cricket/teams/afghanistan-squad-1188.html">
                          अफ़ग़ानिस्तान
                        </a>
                      </li>
                      {/* <li>
                      <a href="/cricket/teams/zimbabwe-squad-10.html">
                        जिम्बाब्वे
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/bermuda-squad-11.html">
                        बरमूडा
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/canada-squad-12.html">
                        कनाडा
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/ireland-squad-13.html">
                        आयरलैंड
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/kenya-squad-14.html">
                        केन्या
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/netherlands-squad-15.html">
                        नीदरलैंड
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/scotland-squad-16.html">
                        स्कॉटलैंड
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/hong-kong-squad-19.html">
                        हॉन्गकॉन्ग
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/namibia-squad-20.html">
                        नामीबिया
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/united-arab-emirates-squad-21.html">
                        यूएई
                      </a>
                    </li>
                    <li>
                      <a href="/cricket/teams/usa-squad-22.html">
                        अमेरिका
                      </a>
                    </li> */}
                    </ul>
                  </div>
                </div>
              </li>
            )}
            {crMenu.map((item, key) => {
              return (
                <li className="series-btn" key={key}>
                  <a
                    href={item.link}
                    target={item.target == 1 ? "_blank" : "_self"}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <style jsx global>{`
        .top_links_cont {
          padding-top: 6px ${isAmp ? "" : "!important"};
          padding-bottom: inherit ${isAmp ? "" : "!important"};
        }
        .home-icon {
          height: 30px ${isAmp ? "" : "!important"};
        }
        .home-icon::after {
          content: "";
          background: #e1261c;
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: 0;
        }
        .CNL1MenuNew > ul > li.series-navBtn > a {
          text-transform: uppercase;
          font-family:
            "Mukta",
            sans-serif ${isAmp ? "" : "!important"};
          padding: 6px 5px 3px 5px;
          background: #e1261d;
          color: #fff;
          display: flex;
          font-size: ${isIpl ? "17px" : "12px"};
          border-radius: 5px;
          margin-right: 10px;
          align-self: center;
          margin-left: 5px;
          margin-top: 1px;
        }
        .CNL1MenuNew {
          display: flex;
          justify-content: space-between;
          // box-shadow: 0 0 10px #b6b6b6;
          font-family:
            "Mukta",
            sans-serif ${isAmp ? "" : "!important"};
          overflow-y: hidden;
        }
        .CNL1MenuNew > ul {
          font-size: 13px;
          overflow: auto;
          white-space: nowrap;
          display: flex;
          line-height: 1.3;
        }
        .CNL1MenuNew > ul > li {
          display: inline-block;
          color: #fff;
          text-align: center;
          text-decoration: none;
          // padding-top: 7px;
        }
        .CNL1MenuNew > ul > li > a {
          color: #001d42;
          text-transform: uppercase;
          padding: 6px 10px;
          display: block;
          position: relative;
          font-size: 16px;
          line-height: 22px;
        }

        .CNL1Menu_active {
          border-bottom: #e1261c solid 2px;
          color: #e1261c;
        }
        a.active {
          background: #e1261d;
          color: #fff ${isAmp ? "" : "!important"};
          border-radius: 5px;
        }
        .cn-dropdown .drop-inner {
          display: none;
          position: absolute;
          z-index: 100;
          background: #fff;
          width: 252px;
          padding: 5px;
          box-sizing: border-box;
          font-size: 12px;
          font-family:
            "Mukta",
            sans-serif ${isAmp ? "" : "!important"};
          box-shadow: 0 0 10px #00000066;
          line-height: initial;
          font-weight: 400;
          right: 0px;
          top: 39px;
          text-align: left;
        }
        .cn-dropdown .drop-inner .dropdown-sec:last-child {
          border: 0;
          width: 55%;
        }
        .cn-dropdown .drop-inner .dropdown-sec {
          max-height: 330px;
          overflow-y: auto;
        }
        .cn-dropdown > a::before {
          content: "";
          position: absolute;
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 4px dashed;
          border-right: 4px solid transparent;
          border-left: 4px solid transparent;
          left: 50%;
          bottom: 5%;
          transform: translateX(-50%);
          color: ${isDropDown ? `white ${isAmp ? "" : "!important"}` : "black"};
        }
        .cn-dropdown .drop-inner .dropdown-sec .droplist-2 > li > a {
          display: block;
          padding: 6px 7px;
        }
        .cn-dropdown .drop-inner .dropdown-sec li {
          padding-left: 2px;
          font-size: 15px;
          color: #606060;
          line-height: 1.3;
        }
        .cn-dropdown .drop-inner .dropdown-sec li a {
          color: #606060;
        }
        .cn-dropdown .drop-inner.current {
          display: flex;
        }
        .cn-dropdown.current > a::before {
          color: #e1261d;
        }
        .cn-dropdown {
          position: initial ${isAmp ? "" : "!important"};
          cursor: pointer;
        }
        li.cn-dropdown:hover .drop-inner {
          width: 140px;
        }
        li.cn-dropdown:hover .drop-inner .dropdown-sec {
          width: 100%;
        }
        .CNL1MenuNew > ul > li.current > a {
          color: #e1261c;
        }
        .CNL1MenuNew > ul > li.current > a:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          bottom: 0;
        }
        .CNL1MenuNew > ul > li.series-btn > a {
          color: #c6080f;
        }
        .cn-dropdown .drop-inner .dropdown-sec .droplist-2 > li.active2 > a {
          border: 1px solid #d8d8d8;
          background: #f5f5f5;
          color: #e1261d;
        }
      `}</style>
    </>
  );
};

export default CricketHeaderMobile;
