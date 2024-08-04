import { updateUrl, firePV } from "includes/article.util";
import { logPageViewLiveScore } from "includes/googleAnalytic";
import { useState } from "react";

const Tabs = ({
  options = [],
  active = 0,
  updateConfig,
  upcoming,
  titles = [],
  isAmp
}) => {
  const [opt, setOpt] = useState(options);

  const handleClick = (e, dex, item) => {
    if(item.release) {
      return true;
    }

    if (!item.dontPrevent) {
      e.preventDefault();
    }

    updateUrl(item.url, titles[dex]);

    if (!item.fired) {
      setTimeout(() => logPageViewLiveScore(titles[dex]), 500);
      self.COMSCORE && COMSCORE.beacon({ c1: "2", c2: "6683813" });
      if (typeof OBR !== "undefined") {
        OBR.extern.researchWidget();
      }

      firePV();
      setOpt((prev) => {
        return prev.map((i) => {
          if (i.name == item.name) {
            return {
              ...i,
              fired: true,
            };
          }
          return i;
        });
      });
    }

    updateConfig(dex, item.apiUrl);
  };

  return (
    <>
      <ul className="scoreCard-tabs">
        {(opt || options).map((item, dex) => (
          <li
            className={`${
              active == dex
                ? "active"
                : item.hide
                ? "hide"
                : upcoming && !item.always
                ? "hide"
                : ""
            }`}
            key={dex}
          >
            <a href={item.url} onClick={(e) => handleClick(e, dex, item)}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <style jsx global>{`
            .hide {
              display: none ${isAmp ? '' : '!important'};
            }
            .scoreCard-tabs {
                display: flex;
                background: #F5F5F5;
                font-family: 'Mukta',sans-serif ${isAmp ? '' : '!important'};
                font-size: 18px;
                text-transform: uppercase;
                border-top: 1px solid #D8D8D8;
                border-bottom: 1px solid #D8D8D8;
                margin-top: 20px;
                margin-bottom: 10px;
            }
            .scoreCard-tabs li {
                position: relative;
                cursor: pointer;
            }
            .scoreCard-tabs li a {
              padding: 10px 0;
            }
            .scoreCard-tabs li.active::before {
                content: '';
                width: 100%;
                background: #FF0000;
                height: 3px;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .scoreCard-tabs li.active a {
                color: #E1261D;
                font-family: 'Mukta',sans-serif ${isAmp ? '' : '!important'};
                font-weight: bold;
            }
            .scoreCard-tabs li a:hover {
                color: black;
            }
            .scoreCard-tabs li.active a:hover {
                color: #E1261D;
            }
            .scoreCard-tabs li {
                padding: 13px 15px;
                display: block;
            }
            
            .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-tabs {
                margin-top: 10px;
                margin-bottom: 0;
                overflow-x: auto;
                white-space: nowrap;
                margin-left: -10px;
                margin-right: -10px;
                font-size: 15px;
            }
            .CN-PageWrap.CN-Mobile-PageWrap .scoreCard-tabs li {
                padding: 8px 10px;
            }
        `}</style>
    </>
  );
};

export default Tabs;
