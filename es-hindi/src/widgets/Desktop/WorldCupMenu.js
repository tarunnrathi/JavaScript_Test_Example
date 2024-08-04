const WorldCupMenu = ({ activeId, isWorldCup, mostRunsData, mostWickets, pointsTableData, isT20 = false }) => {
  const url = isWorldCup ? "/world-cup/" : "/cricket/icc-t20-world-cup/";
  return (
    <div className="CN-menu2-wrapper">
      <div className="CN-menu2-inner">
        <a href={url} className="series-navBtn">
          {isWorldCup ? "WORLD CUP" : "T20 WORLD CUP"}
        </a>
        <ul className="CN-menu2">
          <li className={activeId === 2 ? "active" : ""}>
            <a
              href={url + "schedule/"}
              onClick={() =>
                ga("send", "event", "Navigation", "Click", "Top Nav - शेड्यूल")
              }
            >
              शेड्यूल
            </a>
          </li>
          <li className={activeId === 3 ? "active" : ""}>
            <a
              href={url + "results/"}
              onClick={() =>
                ga("send", "event", "Navigation", "Click", "Top Nav - नतीजे")
              }
            >
              नतीजे
            </a>
          </li>
          <li className={activeId === 4 ? "active" : ""}>
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
          <li className={activeId === 5 ? "active" : ""}>
            <a
              href={url + "news/"}
              onClick={() =>
                ga("send", "event", "Navigation", "Click", "Top Nav - न्यूज")
              }
            >
              न्यूज
            </a>
          </li>
          <li className={activeId === 6 ? "active" : ""}>
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
            <li className={activeId === 7 ? "active" : ""}>
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
              ? <li className={activeId === 7 ? "active" : ""}>
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
              : null
          }
          {(isT20 && mostRunsData?.leaderboard?.length > 0)
            ?
            <li className={activeId === 8 ? "active" : ""}>
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
              ?
              <li className={activeId === 8 ? "active" : ""}>
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
              : null
          }
        </ul>
      </div>
    </div>
  );
};

export default WorldCupMenu;
